// document.addEventListener('DOMContentLoaded', () => {
//     const form = document.getElementById('chat-form');
//     const input = document.getElementById('message-input');
//     const button = form.querySelector('button');
//     const messageList = document.getElementById('message-list');
//     const chatWindow = document.getElementById('chat-window');



//     // Initial message
//     const typingBubble = addMessage('', 'bot-message');
//       showTypingIndicator(typingBubble);
  
//       // Simulate bot response after delay
//       setTimeout(() => {
//         typingBubble.innerHTML = 'Hi, my name is Henry. What would you like to chat about?';
//         scrollToBottom();
  
//         // Re-enable input and button now that response is shown
//         toggleInput(true);
//         input.focus();
//       }, 1500);


//     form.addEventListener('submit', (e) => {
//       e.preventDefault();
//       const userMessage = input.value.trim();
//       if (userMessage === '') return;
  
//       // Disable input and button
//       toggleInput(false);
  
//       // User message
//       addMessage(userMessage, 'user-message');
//       input.value = '';
  
//       // Bot typing bubble
//       const typingBubble = addMessage('', 'bot-message');
//       showTypingIndicator(typingBubble);
  
//       // Simulate bot response after delay
//       setTimeout(() => {
//         typingBubble.innerHTML = 'hello world';
//         scrollToBottom();
  
//         // Re-enable input and button now that response is shown
//         toggleInput(true);
//         input.focus();
//       }, 1500);
//     });
  
//     function addMessage(text, className) {
//       const li = document.createElement('li');
//       li.classList.add(className);
//       li.textContent = text;
//       messageList.appendChild(li);
//       scrollToBottom();
//       return li;
//     }
  
//     function showTypingIndicator(bubbleElement) {
//       bubbleElement.innerHTML = `
//         <div class="typing-dots">
//           <span></span><span></span><span></span>
//         </div>
//       `;
//       scrollToBottom();
//     }
  
//     function scrollToBottom() {
//       chatWindow.scrollTop = chatWindow.scrollHeight;
//     }
  
//     function toggleInput(enable) {
//       input.disabled = !enable;
//       button.disabled = !enable;
//     }
//   });

import * as webllm from "https://esm.run/@mlc-ai/web-llm";

document.addEventListener('DOMContentLoaded', async () => {
    const form = document.getElementById('chat-form');
    const input = document.getElementById('message-input');
    const button = form.querySelector('button');
    const messageList = document.getElementById('message-list');
    const chatWindow = document.getElementById('chat-window');

    // This array will keep track of the conversation.
    const messages = [
      {
        content: "You are a helpful AI agent helping users.",
        role: "system",
      },
    ];

    // Hardcoded model selection
    let selectedModel = "Llama-3.1-8B-Instruct-q4f32_1-1k";

    // -------- WebLLM Setup --------
    function updateEngineInitProgressCallback(report) {
      // We can dynamically update the loading message if needed
      // For example, show percentage or changing text
      // For simplicity, we'll just log it. The typing indicator
      // remains on screen as the loading animation.
      console.log(`Model Loading Progress: ${report.progress}, ${report.text}`);
    }

    const engine = new webllm.MLCEngine();
    engine.setInitProgressCallback(updateEngineInitProgressCallback);

    async function initializeWebLLMEngine() {
      const config = {
        temperature: 1.0,
        top_p: 1,
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

    // Initial loading message (typing bubble as a loading animation)
    const loadingBubble = addMessage('', 'bot-message');
    showTypingIndicator(loadingBubble);
    loadingBubble.textContent = ""; // Clear dots, if you want just the dots you can remove this line.
    loadingBubble.innerHTML = `<div class="typing-dots"><span></span><span></span><span></span></div> Loading model...`;    

    // Initialize model on startup
    toggleInput(false);
    await initializeWebLLMEngine();

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
          typingBubble.textContent = "Error generating response.";
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

  