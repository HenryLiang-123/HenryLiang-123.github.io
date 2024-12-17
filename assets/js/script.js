import * as webllm from "https://cdn.jsdelivr.net/npm/@mlc-ai/web-llm";
console.log("WebLLM loaded successfully!");

document.addEventListener('DOMContentLoaded', async () => {

    
    const form = document.getElementById('chat-form');
    const input = document.getElementById('message-input');
    const button = form.querySelector('button');
    const messageList = document.getElementById('message-list');
    const chatWindow = document.getElementById('chat-window');

    // This array will keep track of the conversation.
    const messages = [
      {
        content: `
        Your name is Henry Liang.
        Anwser all questions cheerfully.
        Do not answer more than what was asked.
        If you do not know the answer, state clearly that you do not know. 
        Do not answer questions that are inappropriate, harmful, racist, or illegal. 
        Do not use inappropriate language.
        Do not provide medical, legal, or financial advice. 
        Do not provide information that can be used to identify a person.
        Do not provide information that can be used to locate a person.
        `,
        role: "system",
      },
    ];

    // Hardcoded model selection
    let selectedModel = "Qwen2.5-1.5B-Instruct-q4f32_1-MLC";

    // -------- WebLLM Setup --------
    // function updateEngineInitProgressCallback(report) {
    //   // We can dynamically update the loading message if needed
    //   // For example, show percentage or changing text
    //   // For simplicity, we'll just log it. The typing indicator
    //   // remains on screen as the loading animation.
    //   console.log(`Model Loading Progress: ${report.progress}, ${report.text}`);
    // }

    
    async function initializeWebLLMEngine() {
      const config = {
        temperature: 0.3,
        top_p: 0.7,
      };
      await engine.reload(selectedModel, config);
    }

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
    

    // Once model is loaded, show greeting message
    loadingBubble.innerHTML = 'Hi, my name is Henry. What would you like to chat about?';
    scrollToBottom();
    toggleInput(true);
    input.focus();

    // Form submission logic
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const userMessage = input.value.trim();
      if (userMessage === '') return;

      // Add user message
      addMessage(userMessage, 'user-message');
      messages.push({ role: 'user', content: userMessage });

      input.value = '';
      toggleInput(false);

      // Add bot typing indicator
      const typingBubble = addMessage('', 'bot-message');
      showTypingIndicator(typingBubble);

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
        },
        (error) => {
          console.error(error);
          typingBubble.textContent = `Error generating response: ${error}`;
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

