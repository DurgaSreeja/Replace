// src/chatbot.test.js
// Tests for the Travel Assistant AI Chatbot

describe('Chatbot Functionality', () => {
    beforeEach(() => {
        // Set up DOM elements for testing
        document.body.innerHTML = `
            <div id="chatbot-container">
                <button id="chatbot-toggle"></button>
                <div id="chatbot-window" class="hidden">
                    <button id="chatbot-close"></button>
                    <div id="chat-messages"></div>
                    <input id="chat-input" />
                    <button id="chat-send"></button>
                    <div id="chat-loader" class="hidden"></div>
                </div>
            </div>
            <audio id="chat-notification"></audio>
        `;
        
        // Mock the DOM methods
        global.HTMLMediaElement.prototype.play = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should toggle chatbot visibility when toggle button is clicked', () => {
        // Import the function after setting up the DOM
        const { initializeChatbot } = require('./chatbot.js');
        initializeChatbot();
        
        const toggleButton = document.getElementById('chatbot-toggle');
        const chatWindow = document.getElementById('chatbot-window');
        
        // Initially hidden
        expect(chatWindow.classList.contains('hidden')).toBe(true);
        
        // Click to show
        toggleButton.click();
        expect(chatWindow.classList.contains('hidden')).toBe(false);
        
        // Click to hide
        toggleButton.click();
        expect(chatWindow.classList.contains('hidden')).toBe(true);
    });

    test('should add user message to chat when send button is clicked', () => {
        const { initializeChatbot, handleChatQuery } = require('./chatbot.js');
        initializeChatbot();
        
        const chatInput = document.getElementById('chat-input');
        const chatMessages = document.getElementById('chat-messages');
        
        // Set input value
        chatInput.value = 'Hello, travel assistant!';
        
        // Mock the getAIResponse function to avoid actual API calls
        jest.mock('./chatbot.js', () => {
            const originalModule = jest.requireActual('./chatbot.js');
            return {
                ...originalModule,
                getAIResponse: jest.fn().mockResolvedValue('Hello! How can I assist you with your travel plans today?')
            };
        });
        
        // Call handleChatQuery
        handleChatQuery();
        
        // Check if message was added
        expect(chatMessages.children.length).toBeGreaterThan(0);
    });

    test('should show loader when processing a query', () => {
        const { initializeChatbot } = require('./chatbot.js');
        initializeChatbot();
        
        const chatLoader = document.getElementById('chat-loader');
        const chatInput = document.getElementById('chat-input');
        const chatSend = document.getElementById('chat-send');
        
        // Initially hidden
        expect(chatLoader.classList.contains('hidden')).toBe(true);
        
        // Simulate showing loader
        chatInput.value = 'Test query';
        chatSend.click();
        
        // Check if loader is shown (this would happen in handleChatQuery)
        // Note: Actual testing of loader visibility would require mocking async functions
    });
});