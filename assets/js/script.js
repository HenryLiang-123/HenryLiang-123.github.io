document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('chat-form');
    const input = document.getElementById('message-input');
    const button = form.querySelector('button');
    const messageList = document.getElementById('message-list');
    const chatWindow = document.getElementById('chat-window');



    // Initial message
    const typingBubble = addMessage('', 'bot-message');
      showTypingIndicator(typingBubble);
  
      // Simulate bot response after delay
      setTimeout(() => {
        typingBubble.innerHTML = 'Hi, my name is Henry. What would you like to chat about?';
        scrollToBottom();
  
        // Re-enable input and button now that response is shown
        toggleInput(true);
        input.focus();
      }, 1500);


    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const userMessage = input.value.trim();
      if (userMessage === '') return;
  
      // Disable input and button
      toggleInput(false);
  
      // User message
      addMessage(userMessage, 'user-message');
      input.value = '';
  
      // Bot typing bubble
      const typingBubble = addMessage('', 'bot-message');
      showTypingIndicator(typingBubble);
  
      // Simulate bot response after delay
      setTimeout(() => {
        typingBubble.innerHTML = 'hello world';
        scrollToBottom();
  
        // Re-enable input and button now that response is shown
        toggleInput(true);
        input.focus();
      }, 1500);
    });
  
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
  