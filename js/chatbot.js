document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const chatbotWidget = document.querySelector('.chatbot-widget');
    const chatbotToggle = document.querySelector('.chatbot-toggle');
    const chatbotClose = document.querySelector('.chatbot-close');
    const chatInput = document.getElementById('userMessage');
    const sendButton = document.getElementById('sendMessage');
    const chatMessages = document.querySelector('.chatbot-messages');

    // Toggle chat widget
    chatbotToggle.addEventListener('click', function() {
        chatbotWidget.classList.toggle('active');
        chatbotToggle.classList.toggle('active');
        if (chatbotWidget.classList.contains('active')) {
            chatInput.focus();
        }
    });

    // Close chat widget
    chatbotClose.addEventListener('click', function() {
        chatbotWidget.classList.remove('active');
        chatbotToggle.classList.remove('active');
    });

    // Function to get response from Python backend
    async function getResponseFromBackend(message) {
        try {
            const response = await fetch('http://127.0.0.1:5000/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                mode: 'cors',
                body: JSON.stringify({ msg: message })
            });
            
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            return data.response || "I didn't get a valid response from the server.";
        } catch (error) {
            console.error('Error:', error);
            return `I'm having trouble connecting to the server. Please ensure the Python server is running. (${error.message})`;
        }
    }

    // Send message function
    async function sendMessage() {
        const message = chatInput.value.trim();
        if (message === '') return;

        // Add user message to chat
        addMessage(message, 'user');
        chatInput.value = '';

        try {
            // Show typing indicator
            const typingIndicator = document.createElement('div');
            typingIndicator.className = 'message bot-message typing-indicator';
            typingIndicator.innerHTML = '<div class="message-avatar"><i class="fas fa-robot"></i></div><div class="message-content"><div class="typing"><span></span><span></span><span></span></div></div>';
            chatMessages.appendChild(typingIndicator);
            scrollToBottom();
            
            // Get response from backend
            const botResponse = await getResponseFromBackend(message);
            
            // Remove typing indicator
            chatMessages.removeChild(typingIndicator);
            
            // Add bot response
            addMessage(botResponse, 'bot');
            scrollToBottom();
        } catch (error) {
            console.error('Error:', error);
            addMessage("I'm sorry, something went wrong. Please try again.", 'bot');
            scrollToBottom();
        }
    }

    // Add message to chat
    function addMessage(message, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', `${sender}-message`);
        
        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        
        const icon = document.createElement('i');
        icon.className = sender === 'bot' ? 'fas fa-robot' : 'fas fa-user';
        
        avatar.appendChild(icon);
        
        const content = document.createElement('div');
        content.className = 'message-content';
        content.innerHTML = `<p>${message}</p>`;
        
        messageDiv.appendChild(avatar);
        messageDiv.appendChild(content);
        
        chatMessages.appendChild(messageDiv);
        scrollToBottom();
    }

    // Scroll to bottom of chat
    function scrollToBottom() {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Get bot response (fallback function if needed)
    function getBotResponse(userMessage) {
        return "I'm here to help! Please wait while I connect to the server...";
    }

    // Event listeners for sending messages
    sendButton.addEventListener('click', sendMessage);
    
    chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // Auto-focus input when chat is opened
    document.addEventListener('click', function(e) {
        if (chatbotWidget.contains(e.target) || chatbotToggle.contains(e.target)) {
            chatInput.focus();
        }
    });

    // Add initial bot greeting if chat is empty
    if (chatMessages.children.length === 0) {
        addMessage("Hello! I'm your sweets assistant. How can I help you today? 😊", 'bot');
    }
});
