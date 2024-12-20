import * as webllm from "https://cdn.jsdelivr.net/npm/@mlc-ai/web-llm";
import * as jsyaml from "https://cdn.skypack.dev/js-yaml";
// import { pipeline } from 'https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.2.1';
// Allocate a pipeline for sentiment-analysis

console.log("WebLLM loaded successfully!");

document.addEventListener('DOMContentLoaded', async () => {



    
    const form = document.getElementById('chat-form');
    const input = document.getElementById('message-input');
    const button = form.querySelector('button');
    const messageList = document.getElementById('message-list');
    const chatWindow = document.getElementById('chat-window');

    // This array will keep track of the conversation.

    // const pipe = await pipeline('sentiment-analysis');

    // const out = await pipe('I love transformers!');
    // console.log(out);
    

    // Hardcoded model selection
    let selectedModel = "Qwen2.5-3B-Instruct-q4f32_1-MLC";

    // -------- WebLLM Setup --------
    // function updateEngineInitProgressCallback(report) {
    //   // We can dynamically update the loading message if needed
    //   // For example, show percentage or changing text
    //   // For simplicity, we'll just log it. The typing indicator
    //   // remains on screen as the loading animation.
    //   console.log(`Model Loading Progress: ${report.progress}, ${report.text}`);
    // }

    // Load in data about me
    let data;

    try {
      // Fetch the YAML file
      const response = await fetch("/assets/data/me.yaml");
      if (!response.ok) {
        throw new Error("Failed to load YAML data");
      }
  
      // Get the raw YAML text
      const yamlText = await response.text();
  
      // Parse YAML into a JavaScript object using js-yaml
      data = jsyaml.load(yamlText);
  
      // Display the parsed data
      console.log(data);
    } catch (error) {
      console.error("Error:", error);
      document.getElementById("output").textContent = "Failed to load data.";
    }

    let education;
    let work;
    let skills;

    if (data){
      education = data.education;
      work = data.work_experience;
      skills = data.skills;
    }

    // Format education, work experience, and skills into readable text
    const educationText = education
      .map(
        (entry) =>
          `- Degree: ${entry.degree}, Institution: ${entry.institution}, Graduation Date: ${entry.graduation_date}`
      )
      .join("\n");

    const workText = work
      .map(
        (job) =>
          `- Role: ${job.title}, Company: ${job.company}, Start Date: ${job.start_date}, End Date: ${job.end_date || "Present"}, Work Description: ${job.achievements}`
      )
      .join("\n");

    const skillsText = `Programming: ${skills.programming_languages}, Tools: ${skills.tools}, Languages: ${skills.languages}`;
    
    
    async function initializeWebLLMEngine() {
      const config = {
        temperature: 0.3,
        top_p: 0.7,
      };
      await engine.reload(selectedModel, config);
    }

    let total_tokens = 0;

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

    function updateEngineInitProgressCallback(report) {
      const percentage = Math.round(report.progress * 100); // Convert to percentage
      const loadingText = `<div class="typing-dots">
                              <span></span><span></span><span></span>
                           </div> This takes a while when you first visit this page. Loading model... ${percentage}% `;

      loadingBubble.innerHTML = loadingText; // Update loading bubble content
      console.log(`Model Loading Progress: ${percentage}%, ${report.text}`);
    }

    const engine = new webllm.MLCEngine();
    engine.setInitProgressCallback(updateEngineInitProgressCallback);


    // Initial loading message (typing bubble as a loading animation)
    const loadingBubble = addMessage('', 'bot-message');
    showTypingIndicator(loadingBubble);
    loadingBubble.textContent = ""; // Clear dots, if you want just the dots you can remove this line.
    loadingBubble.innerHTML = `<div class="typing-dots"><span></span><span></span><span></span></div> Loading model...`;    

    // Initialize model on startup
    
    toggleInput(false);

    if (!navigator.gpu) {
      console.error("WebGPU is not supported in this environment.");
      const errorMessage = "I need WebGPU to talk to you, but it is not supported in your browser or environment.";
      loadingBubble.innerHTML = errorMessage;
      return;
    }
    
    try{
      await initializeWebLLMEngine();
    } catch (error) {
      console.error("Error initializing model:", error);
      loadingBubble.innerHTML = `${error}.`;
      return;
    }

    let messages = [
      {
        content: `
        You are the AI counterpart of Henry Liang.
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
        Follow these guidelines strictly, and always prioritize clarity, accuracy, and adherence to the scope of your role.
  
        `,
        role: "system",
      },
      ];
    

    // Once model is loaded, show greeting message
    loadingBubble.innerHTML = 'I\'m here to help answer any questions you have about Henry Liang. What would you like to know?';
    scrollToBottom();
    toggleInput(true);
    input.focus();



    // Form submission logic
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const userMessage = input.value.trim();
      if (userMessage === '') return;
      // Construct the system message

      

      // Add user message
      addMessage(userMessage, 'user-message');
      messages.push({ role: 'user', content: 
        `The following is data about Henry Liang:
      
        **Education:**
        ${educationText}
        
        **Work Experience:**
        ${workText}

        **Skills:**
        ${skillsText}
        
        If it is a question about Henry Liang, use the above information to answer the following question about Henry Liang.

        ${userMessage}
        `});

      input.value = '';
      toggleInput(false);

      console.log(messages);


      // Add bot typing indicator
      const typingBubble = addMessage('', 'bot-message');
      showTypingIndicator(typingBubble);

      console.log(messages);

      // Use WebLLM to generate a response
      streamingGenerating(
        messages,
        (partialContent) => {
          // Update the typing bubble with partial content
          typingBubble.textContent = partialContent;
          scrollToBottom();
        },
        (finalMessage, usage) => {
          // Update the typing bubble with the final message
          typingBubble.textContent = finalMessage;
          messages.push({ role: 'assistant', content: finalMessage });
          scrollToBottom();

          toggleInput(true);
          input.focus();

          // If you want to show usage stats or remove this
          console.log("Usage:", usage);

          let baseline = 850;
          if (messages.length === 3) {
            baseline = usage.total_tokens;
          }

          total_tokens += usage.total_tokens;

          console.log("Total tokens:", total_tokens);

          if (total_tokens > 3000) {
            console.log('Deleted messages');
            const systemPrompt = messages[0]; // System prompt at [0]
            const userQuestion = messages[messages.length - 2]; // Most recent user question at [-2]
            const assistantResponse = messages[messages.length - 1]; // Most recent assistant response at [-1]
            total_tokens = baseline;
            // Keep only these messages
            messages = [systemPrompt, userQuestion, assistantResponse];
          }


        },
        (error) => {
          if (error.name === 'ContextWindowSizeExceededError') {
            console.log('Deleted messages');
            typingBubble.textContent = `I'm limited by the technology of my time. I can't remember everything. Please ask your question again.`;
            messages.splice(1, messages.length - 1);

          } else {
            console.error(error);
            typingBubble.textContent = `Error generating response: ${error}`;
          }
          toggleInput(true);
          input.focus();
        }
      );
    });

    // -------- Utility Functions --------
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

