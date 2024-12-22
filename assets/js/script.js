import * as webllm from "https://cdn.jsdelivr.net/npm/@mlc-ai/web-llm";
import * as jsyaml from "https://cdn.skypack.dev/js-yaml";

document.addEventListener('DOMContentLoaded', async () => {
  const form = document.getElementById('chat-form');
  const input = document.getElementById('message-input');
  const button = form.querySelector('button');
  const messageList = document.getElementById('message-list');
  const chatWindow = document.getElementById('chat-window');

  // ----- CREATE MODEL DROPDOWN ----- //
  const selectBox = document.createElement('select');
  const options = ['Qwen2.5 3B', 'Qwen2.5 0.5B', 'Llama3.2 1B'];

  const modelMapping = {
    'qwen2.5-3b': 'Qwen2.5-3B-Instruct-q4f32_1-MLC',
    'qwen2.5-0.5b': 'Qwen2.5-0.5B-Instruct-q4f32_1-MLC',
    'llama3.2-1b': 'Llama-3.2-1B-Instruct-q4f32_1-MLC',
  };

  options.forEach(optionText => {
    const option = document.createElement('option');
    option.value = optionText.toLowerCase().replace(/\s+/g, '-');
    option.textContent = optionText;
    selectBox.appendChild(option);
  });

  selectBox.classList.add('custom-select');
  document.getElementById('dropdown-container').appendChild(selectBox);

  // ----- LOAD YAML DATA ABOUT HENRY ----- //
  let data;
  try {
    const response = await fetch("/assets/data/me.yaml");
    if (!response.ok) {
      throw new Error("Failed to load YAML data");
    }
    const yamlText = await response.text();
    data = jsyaml.load(yamlText);
    console.log(data);
  } catch (error) {
    console.error("Error:", error);
    document.getElementById("output").textContent = "Failed to load data.";
  }

  let education = data?.education || [];
  let work = data?.work_experience || [];
  let skills = data?.skills || {};

  const educationText = education
    .map(e => `- Degree: ${e.degree}, Institution: ${e.institution}, Graduation Date: ${e.graduation_date}`)
    .join("\n");
  
  const workText = work
    .map(w => `- Role: ${w.title}, Company: ${w.company}, Start Date: ${w.start_date}, End Date: ${w.end_date || "Present"}, Work Description: ${w.achievements}`)
    .join("\n");

  const skillsText = `Programming: ${skills.programming_languages}, Tools: ${skills.tools}, Languages: ${skills.languages}`;

  // ---- ENGINE & MODEL SELECTION ---- //
  let engine = null;
  let selectedModel = null; 

  // ----- CREATE A SINGLE STATUS BUBBLE ----- //
  // We'll reuse this bubble to display:
  // 1) "Please select a model"
  // 2) Loading progress
  // 3) Final greeting after load
  const statusBubble = addMessage('', 'bot-message');
  statusBubble.textContent = "Please select a model from the dropdown above to get started.";

  // Disable input until a model is loaded
  toggleInput(false);

  // Check WebGPU support
  if (!navigator.gpu) {
    console.error("WebGPU is not supported in this environment.");
    statusBubble.textContent = "I need WebGPU to talk to you, but it is not supported in your browser or environment.";
    return; // Stop here
  }

  // PROGRESS CALLBACK: update the same status bubble
  function updateEngineInitProgressCallback(report) {
    const percentage = Math.round(report.progress * 100); 
    statusBubble.innerHTML = `
      <div class="typing-dots">
        <span></span><span></span><span></span>
      </div>
      This takes a while when you first visit this page. Loading model... ${percentage}%
    `;
    console.log(`Model Loading Progress: ${percentage}%, ${report.text}`);
  }

  // Actual function to load the model into the engine
  async function initializeWebLLMEngine(modelName) {
    const config = {
      temperature: 0.1,
      top_p: 0.6,
    };
    await engine.reload(modelName, config);
  }

  // Reusable function to initialize or re-initialize model
  async function initializeModel(modelName) {
    console.log(`Initializing model: ${modelName}`);
    
    // Switch status to "loading..."
    statusBubble.textContent = "Loading...";

    // Disable the dropdown & user input
    selectBox.disabled = true;
    toggleInput(false);

    try {
      // If there's a previous engine, unload it to clear memory
      if (engine && engine.unload) {
        await engine.unload();
      }
      // Create a fresh engine
      engine = new webllm.MLCEngine();
      engine.setInitProgressCallback(updateEngineInitProgressCallback);

      // Load the new model
      await initializeWebLLMEngine(modelName);

      // Once loaded, show greeting in the same bubble
      statusBubble.textContent = "I'm here to help answer any questions you have about Henry Liang. What would you like to know?";
      
      console.log(`Model ${modelName} initialized successfully.`);

      // Re-enable user input
      toggleInput(true);
      input.focus();

    } catch (error) {
      console.error("Error initializing model:", error);
      statusBubble.textContent = String(error);
    } finally {
      // Re-enable the dropdown
      selectBox.disabled = false;
    }
  }

  // ----- On dropdown change, start loading ----- //
  selectBox.addEventListener('change', async (event) => {
    const selectedValue = event.target.value;
    const newModel = modelMapping[selectedValue];
    if (!newModel) return;

    if (!selectedModel) {
      console.log('User selected a model for the first time.');
    } else {
      console.log(`Switching to a new model: ${newModel}`);
    }
    selectedModel = newModel;
    await initializeModel(selectedModel);
  });

  // ----- MESSAGES & STREAMING LOGIC ----- //
  let total_tokens = 0;
  let messages = [
    {
      content: 

        `You are an AI assistant of Henry Liang.
        You are designed to assist users with questions about Henry Liang, his work, and his experience.

        **Tone and Scope:**
        Answer all questions cheerfully, but do not provide more information than what is explicitly asked.

        **Uncertainty:**
        If you do not know the answer, state clearly, "I do not know." Avoid guessing or fabricating information.

        **Restrictions:**
        Do not answer questions that are inappropriate, harmful, racist, or illegal.
        Avoid using inappropriate language under any circumstance.
        Do not provide medical, legal, or financial advice.
        Do not share any information that can identify or locate a person.
        Follow these guidelines strictly, and always prioritize clarity, accuracy, and adherence to the scope of your role.`,
      role: "system",
    },
  ];

  async function streamingGenerating(messages, onUpdate, onFinish, onError) {
    try {
      let curMessage = "";
      let usage;
      const completion = await engine.chat.completions.create({
        stream: true,
        messages,
        stream_options: { include_usage: true },
      });

      for await (const chunk of completion) {
        const curDelta = chunk.choices[0]?.delta.content;
        if (curDelta) {
          curMessage += curDelta;
        }
        if (chunk.usage) {
          usage = chunk.usage;
        }
        onUpdate(curMessage);
      }
      const finalMessage = await engine.getMessage();
      onFinish(finalMessage, usage);
    } catch (err) {
      onError(err);
    }
  }

  // ----- FORM SUBMIT: USER MESSAGE ----- //
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const userMessage = input.value.trim();
    if (userMessage === '') return;

    addMessage(userMessage, 'user-message');
    messages.push({
      role: 'user',
      content: 
        `The following is data about Henry Liang:

        **Education:**
        ${educationText}

        **Work Experience:**
        ${workText}

        **Skills:**
        ${skillsText}

        If it is a question about Henry Liang, use the above information to answer the following question about Henry Liang.

        ${userMessage}`
    });

    input.value = '';
    toggleInput(false);

    console.log(messages)

    // Add bot typing indicator
    const typingBubble = addMessage('', 'bot-message');
    showTypingIndicator(typingBubble);

    streamingGenerating(
      messages,
      (partialContent) => {
        typingBubble.textContent = partialContent;
        scrollToBottom();
      },
      (finalMessage, usage) => {
        typingBubble.textContent = finalMessage;
        messages.push({ role: 'assistant', content: finalMessage });
        scrollToBottom();

        toggleInput(true);
        input.focus();

        console.log("Usage:", usage);
        let baseline = 850;
        if (messages.length === 3) {
          baseline = usage.total_tokens;
        }
        total_tokens += usage.total_tokens;
        console.log("Total tokens:", total_tokens);

        // Basic “forget older messages” approach
        if (total_tokens > 3000) {
          console.log('Deleted old messages to reduce token usage');
          const systemPrompt = messages[0];
          const userQuestion = messages[messages.length - 2];
          const assistantResponse = messages[messages.length - 1];
          total_tokens = baseline;
          messages = [systemPrompt, userQuestion, assistantResponse];
        }
      },
      (error) => {
        if (error.name === 'ContextWindowSizeExceededError') {
          console.log('Context window exceeded. Deleting older messages...');
          typingBubble.textContent = `I'm limited by the technology of my time. Please ask your question again.`;
          messages.splice(1, messages.length - 1);
        } else {
          console.error("Error generating response:", error);
          typingBubble.textContent = `Error generating response: ${error}`;
        }
        toggleInput(true);
        input.focus();
      }
    );
  });

  // ----------------- HELPER FUNCTIONS ----------------- //
  function addMessage(text, className) {
    const li = document.createElement('li');
    li.classList.add(className);
    li.textContent = text;
    messageList.appendChild(li);
    scrollToBottom();
    return li;
  }

  function showTypingIndicator(bubbleElement) {
    bubbleElement.innerHTML = `
      <div class="typing-dots">
        <span></span><span></span><span></span>
      </div>
    `;
    scrollToBottom();
  }

  function scrollToBottom() {
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }

  function toggleInput(enable) {
    input.disabled = !enable;
    button.disabled = !enable;
  }
});
