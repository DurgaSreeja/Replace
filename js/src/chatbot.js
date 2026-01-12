// src/chatbot.js

// PWA Install Prompt Variables
let deferredPrompt;

// Listen for the beforeinstallprompt event
window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent the mini-infobar from appearing on mobile
    e.preventDefault();
    // Stash the event so it can be triggered later
    deferredPrompt = e;
    // Update UI to notify the user they can install the PWA
    showInstallPromotion();
});

// Function to show install promotion (you can customize this)
function showInstallPromotion() {
    // Create install button dynamically
    const installButton = document.createElement('button');
    installButton.id = 'install-pwa';
    installButton.textContent = 'Install App';
    installButton.className = 'fixed bottom-24 right-6 bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-2 px-4 rounded-lg shadow-lg z-50';
    
    // Add click event to trigger install prompt
    installButton.addEventListener('click', async () => {
        if (!deferredPrompt) return;
        
        // Show the install prompt
        deferredPrompt.prompt();
        
        // Wait for the user to respond to the prompt
        const { outcome } = await deferredPrompt.userChoice;
        
        // We've used the prompt, and can't use it again, throw it away
        deferredPrompt = null;
        
        // Hide the install button
        installButton.remove();
    });
    
    // Add button to the DOM
    document.body.appendChild(installButton);
}

// Listen for appinstalled event
window.addEventListener('appinstalled', () => {
    // Clear the deferredPrompt variable
    deferredPrompt = null;
    // Hide the install promotion
    const installButton = document.getElementById('install-pwa');
    if (installButton) {
        installButton.remove();
    }
    console.log('PWA was installed');
});

// Get DOM elements
const chatbotToggle = document.getElementById('chatbot-toggle');
const chatbotWindow = document.getElementById('chatbot-window');
const chatbotClose = document.getElementById('chatbot-close');
const chatInput = document.getElementById('chat-input');
const chatSend = document.getElementById('chat-send');
const chatMessages = document.getElementById('chat-messages');
const chatLoader = document.getElementById('chat-loader');

// Toggle chatbot window
chatbotToggle.addEventListener('click', () => {
    chatbotWindow.classList.toggle('hidden');
    chatbotWindow.classList.toggle('opacity-0');
    chatbotWindow.classList.toggle('translate-y-2');
    
    // Focus on input when chat opens
    if (!chatbotWindow.classList.contains('hidden')) {
        setTimeout(() => {
            chatInput.focus();
        }, 300);
    }
});

// Close chatbot window
chatbotClose.addEventListener('click', () => {
    chatbotWindow.classList.add('hidden');
    chatbotWindow.classList.add('opacity-0');
    chatbotWindow.classList.add('translate-y-2');
});

// Close chatbot when clicking outside
document.addEventListener('click', (e) => {
    const chatbotContainer = document.getElementById('chatbot-container');
    if (chatbotContainer && !chatbotContainer.contains(e.target) && !chatbotWindow.classList.contains('hidden')) {
        chatbotWindow.classList.add('hidden');
        chatbotWindow.classList.add('opacity-0');
        chatbotWindow.classList.add('translate-y-2');
    }
});

// Function to add message to chat
function addMessageToChat(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `mb-4 flex ${sender === 'user' ? 'justify-end' : 'justify-start'}`;
    
    const messageContent = document.createElement('div');
    messageContent.className = `rounded-lg p-3 max-w-xs ${sender === 'user' ? 'bg-yellow-500 text-gray-900' : 'bg-white text-gray-700 shadow'}`;
    messageContent.textContent = text;
    
    messageDiv.appendChild(messageContent);
    chatMessages.appendChild(messageDiv);
    
    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Function to show loader
function showLoader() {
    chatLoader.classList.remove('hidden');
    chatInput.disabled = true;
    chatSend.disabled = true;
}

// Function to hide loader
function hideLoader() {
    chatLoader.classList.add('hidden');
    chatInput.disabled = false;
    chatSend.disabled = false;
    chatInput.focus();
}

// Function to get AI response from backend
async function getAIResponse(userMessage) {
    try {
        const response = await fetch('http://localhost:3000/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: userMessage })
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return data.response;
    } catch (error) {
        console.error('Error getting AI response:', error);
        throw error;
    }
}

// Handle chat query submission
async function handleChatQuery() {
    const message = chatInput.value.trim();
    
    if (!message) return;
    
    // Add user message to chat
    addMessageToChat(message, 'user');
    chatInput.value = '';
    
    // Show loader
    showLoader();
    
    try {
        // Get AI response
        const response = await getAIResponse(message);
        
        // Add AI message to chat
        addMessageToChat(response, 'ai');
    } catch (error) {
        // Show error message
        addMessageToChat('Sorry, I encountered an error. Please try again.', 'ai');
    } finally {
        // Hide loader
        hideLoader();
    }
}

// Event listener for send button
chatSend.addEventListener('click', handleChatQuery);

// Event listener for Enter key
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleChatQuery();
    }
});

// Initialize chatbot
document.addEventListener('DOMContentLoaded', () => {
    // Enable chat input
    chatInput.disabled = false;
    chatSend.disabled = false;
    
    console.log('Chatbot initialized');
});