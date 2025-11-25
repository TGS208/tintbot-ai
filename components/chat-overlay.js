/**
 * Tintbot AI Chat Overlay - Strategic Chat-First Experience
 *
 * This component forces visitors to interact with AI chat before accessing site content.
 * Use this on your homepage, pricing page, or any high-value pages.
 *
 * Features:
 * - Full-screen welcome chat on first visit
 * - Lead qualification through conversation
 * - Seamless handoff to quote system
 * - Persistent chat access throughout site
 * - Mobile-optimized
 *
 * Usage:
 * Add to any page:
 * <script src="/components/chat-overlay.js"></script>
 * <script>TintbotChat.init({ required: true });</script>
 */

const TintbotChat = (function() {
    'use strict';

    let config = {
        required: true,  // If true, blocks content until user engages
        apiEndpoint: '/.netlify/functions/chat-ai',  // Your AI backend
        sessionDuration: 30 * 60 * 1000,  // 30 minutes
        minimumInteraction: 1,  // Number of messages before allowing to browse
        autoGreet: true,
        greetingDelay: 1000
    };

    let state = {
        isMinimized: false,
        hasInteracted: false,
        messageCount: 0,
        leadData: {},
        sessionId: null
    };

    // Initialize chat overlay
    function init(options = {}) {
        config = { ...config, ...options };

        // Check if user has recent session
        const session = getSession();
        if (session && !config.required) {
            // User has interacted recently, don't block
            renderMinimized();
            return;
        }

        // First-time visitor or required mode
        if (config.required) {
            renderFullScreen();
            blockContent();
        } else {
            renderMinimized();
        }

        // Create session ID
        state.sessionId = generateSessionId();

        attachEventListeners();
    }

    // Render full-screen chat welcome
    function renderFullScreen() {
        const overlay = document.createElement('div');
        overlay.id = 'tintbot-chat-overlay';
        overlay.className = 'fixed inset-0 z-50 flex items-center justify-center p-4';
        overlay.style.background = 'linear-gradient(-45deg, #0f172a, #1e3a8a, #0f172a, #312e81, #1e1b4b)';
        overlay.style.backgroundSize = '400% 400%';
        overlay.style.animation = 'gradientShift 15s ease infinite';

        overlay.innerHTML = `
            <div class="w-full max-w-2xl">
                <!-- Chat Window -->
                <div class="bg-slate-900/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 overflow-hidden">
                    <!-- Header -->
                    <div class="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
                        <div class="flex items-center justify-between">
                            <div class="flex items-center space-x-3">
                                <div class="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                                    <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                                    </svg>
                                </div>
                                <div>
                                    <h2 class="text-xl font-bold text-white">Tintbot AI</h2>
                                    <p class="text-sm text-blue-100">Your Personal Tint Assistant</p>
                                </div>
                            </div>
                            <div class="flex items-center space-x-1 text-green-300 text-sm">
                                <div class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                <span>Online</span>
                            </div>
                        </div>
                    </div>

                    <!-- Messages -->
                    <div id="tintbot-messages" class="p-6 space-y-4 h-96 overflow-y-auto bg-slate-800/50">
                        <!-- Initial greeting added via JS -->
                    </div>

                    <!-- Input -->
                    <div class="p-4 bg-slate-900/50 border-t border-white/10">
                        <div class="flex space-x-3">
                            <input
                                type="text"
                                id="tintbot-input"
                                placeholder="Type your message..."
                                class="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                            />
                            <button id="tintbot-send" class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                                </svg>
                            </button>
                        </div>
                        <p class="text-xs text-gray-500 mt-2 text-center">
                            <svg class="w-3 h-3 inline mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd"></path>
                            </svg>
                            Secure & Private
                        </p>
                    </div>

                    <!-- Footer -->
                    <div class="px-6 py-3 bg-slate-900/30 border-t border-white/10 flex items-center justify-between text-xs text-gray-400">
                        <span>⚡ Powered by AI</span>
                        <button id="tintbot-minimize" class="hover:text-white transition ${config.required && !state.hasInteracted ? 'opacity-50 cursor-not-allowed' : ''}">
                            ${config.required && !state.hasInteracted ? '🔒 Chat required to proceed' : 'Minimize →'}
                        </button>
                    </div>
                </div>

                <!-- Progress indicator (if required) -->
                ${config.required ? `
                <div class="mt-4 text-center text-sm text-white/60">
                    <p>💬 Please chat with our AI to continue browsing</p>
                    <p class="text-xs mt-1">This takes about 30 seconds and helps us serve you better</p>
                </div>
                ` : ''}
            </div>

            <style>
                @keyframes gradientShift {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
            </style>
        `;

        document.body.appendChild(overlay);

        // Add initial greeting
        if (config.autoGreet) {
            setTimeout(() => {
                addBotMessage("👋 Welcome! I'm Tintbot, your AI assistant. I can help you get instant quotes, compare tint options, or answer any questions. What brings you here today?");
                showQuickOptions();
            }, config.greetingDelay);
        }
    }

    // Block page content until chat interaction
    function blockContent() {
        const style = document.createElement('style');
        style.id = 'tintbot-content-block';
        style.textContent = `
            body > *:not(#tintbot-chat-overlay):not(script):not(style) {
                filter: blur(10px);
                pointer-events: none;
                user-select: none;
            }
        `;
        document.head.appendChild(style);
    }

    // Unblock page content
    function unblockContent() {
        const style = document.getElementById('tintbot-content-block');
        if (style) {
            style.remove();
        }
    }

    // Render minimized chat button
    function renderMinimized() {
        const button = document.createElement('div');
        button.id = 'tintbot-minimized';
        button.className = 'fixed bottom-6 right-6 z-40';
        button.innerHTML = `
            <button class="relative bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-full w-16 h-16 shadow-2xl hover:scale-110 transition-transform group">
                <svg class="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
                </svg>
                <span class="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold animate-pulse">
                    AI
                </span>
                <div class="absolute bottom-full right-0 mb-2 px-3 py-2 bg-slate-900 text-white text-sm rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    Chat with AI Assistant
                    <div class="absolute top-full right-4 -mt-1 border-4 border-transparent border-t-slate-900"></div>
                </div>
            </button>
        `;

        document.body.appendChild(button);

        button.addEventListener('click', () => {
            button.remove();
            renderFullScreen();
        });

        state.isMinimized = true;
    }

    // Show quick action buttons
    function showQuickOptions() {
        const options = [
            { icon: '📸', text: 'Get Instant Quote', action: 'quote' },
            { icon: '📊', text: 'Compare Tints', action: 'compare' },
            { icon: '❓', text: 'Ask a Question', action: 'question' },
            { icon: '👀', text: 'Just Browsing', action: 'browse' }
        ];

        const container = document.createElement('div');
        container.className = 'space-y-2';
        container.id = 'quick-options';

        options.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'w-full text-left bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 rounded-lg p-3 text-white transition group';
            btn.innerHTML = `
                <div class="flex items-center justify-between">
                    <span class="flex items-center space-x-2">
                        <span class="text-lg">${opt.icon}</span>
                        <span class="text-sm">${opt.text}</span>
                    </span>
                    <svg class="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                </div>
            `;
            btn.onclick = () => handleQuickAction(opt.action);
            container.appendChild(btn);
        });

        const messagesDiv = document.getElementById('tintbot-messages');
        messagesDiv.appendChild(container);
        scrollToBottom();
    }

    // Handle quick action selection
    function handleQuickAction(action) {
        // Remove quick options
        const options = document.getElementById('quick-options');
        if (options) options.remove();

        state.hasInteracted = true;
        state.messageCount++;

        // Add user message
        const actionTexts = {
            quote: '📸 Get Instant Quote',
            compare: '📊 Compare Tints',
            question: '❓ Ask a Question',
            browse: '👀 Just Browsing'
        };
        addUserMessage(actionTexts[action]);

        // Handle action
        setTimeout(() => {
            switch(action) {
                case 'quote':
                    addBotMessage("Perfect! I'll redirect you to our AI-powered instant quote system. You can upload a photo, scan your VIN, or enter details manually.");
                    setTimeout(() => {
                        saveSession();
                        window.location.href = '/quote.html';
                    }, 2000);
                    break;

                case 'compare':
                    addBotMessage("Great! Here's a comparison of our three tint types:");
                    setTimeout(() => showTintComparison(), 500);
                    break;

                case 'question':
                    addBotMessage("I'm here to help! What would you like to know about window tinting?");
                    enableInput();
                    break;

                case 'browse':
                    addBotMessage("No problem! Before you explore, can I ask what type of vehicle you have? This helps us show relevant examples.");
                    enableInput();
                    checkIfCanMinimize();
                    break;
            }
        }, 500);
    }

    // Show tint comparison
    function showTintComparison() {
        const comparison = document.createElement('div');
        comparison.className = 'space-y-3 text-sm';
        comparison.innerHTML = `
            <div class="bg-slate-700/50 rounded-lg p-3 border border-purple-500/30">
                <div class="flex items-center justify-between mb-2">
                    <h4 class="font-bold text-purple-300">💎 Ceramic</h4>
                    <span class="text-xs bg-purple-600/30 px-2 py-1 rounded">Premium</span>
                </div>
                <ul class="text-xs text-gray-300 space-y-1">
                    <li>• 65% heat rejection</li>
                    <li>• Lifetime warranty</li>
                    <li>• Best for luxury cars</li>
                </ul>
            </div>
            <div class="bg-slate-700/50 rounded-lg p-3 border border-green-500/30">
                <div class="flex items-center justify-between mb-2">
                    <h4 class="font-bold text-green-300">⭐ Carbon</h4>
                    <span class="text-xs bg-green-600/30 px-2 py-1 rounded">Best Value</span>
                </div>
                <ul class="text-xs text-gray-300 space-y-1">
                    <li>• 45% heat rejection</li>
                    <li>• 5-year warranty</li>
                    <li>• Most popular choice</li>
                </ul>
            </div>
            <div class="bg-slate-700/50 rounded-lg p-3 border border-orange-500/30">
                <div class="flex items-center justify-between mb-2">
                    <h4 class="font-bold text-orange-300">💰 Dyed</h4>
                    <span class="text-xs bg-orange-600/30 px-2 py-1 rounded">Budget</span>
                </div>
                <ul class="text-xs text-gray-300 space-y-1">
                    <li>• 30% heat rejection</li>
                    <li>• 2-year warranty</li>
                    <li>• Great for privacy</li>
                </ul>
            </div>
        `;

        const wrapper = document.createElement('div');
        wrapper.className = 'flex items-start space-x-3';
        wrapper.innerHTML = `
            <div class="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z"></path>
                </svg>
            </div>
            <div class="flex-1 bg-blue-600/10 backdrop-blur-sm rounded-2xl rounded-tl-none p-4 border border-blue-500/20">
                ${comparison.outerHTML}
            </div>
        `;

        document.getElementById('tintbot-messages').appendChild(wrapper);
        scrollToBottom();

        setTimeout(() => {
            addBotMessage("Would you like to get a quote for any of these options?");
            showYesNoButtons();
        }, 1000);
    }

    // Show yes/no buttons
    function showYesNoButtons() {
        const container = document.createElement('div');
        container.className = 'flex space-x-3';
        container.id = 'yes-no-buttons';

        ['Yes, get quote', 'No, thanks'].forEach((text, idx) => {
            const btn = document.createElement('button');
            btn.className = idx === 0
                ? 'flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm transition'
                : 'flex-1 bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg text-sm transition';
            btn.textContent = text;
            btn.onclick = () => {
                container.remove();
                addUserMessage(text);
                if (idx === 0) {
                    handleQuickAction('quote');
                } else {
                    handleQuickAction('browse');
                }
            };
            container.appendChild(btn);
        });

        document.getElementById('tintbot-messages').appendChild(container);
        scrollToBottom();
    }

    // Enable text input
    function enableInput() {
        const input = document.getElementById('tintbot-input');
        const send = document.getElementById('tintbot-send');

        input.disabled = false;
        input.focus();

        send.onclick = sendMessage;
        input.onkeypress = (e) => {
            if (e.key === 'Enter') sendMessage();
        };
    }

    // Send user message
    function sendMessage() {
        const input = document.getElementById('tintbot-input');
        const message = input.value.trim();

        if (!message) return;

        addUserMessage(message);
        input.value = '';

        state.hasInteracted = true;
        state.messageCount++;
        checkIfCanMinimize();

        // Send to AI backend
        handleAIResponse(message);
    }

    // Handle AI response (would connect to your backend)
    async function handleAIResponse(userMessage) {
        // Show typing indicator
        showTyping();

        try {
            // Call your AI backend
            const response = await fetch(config.apiEndpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: userMessage,
                    sessionId: state.sessionId,
                    context: state.leadData
                })
            });

            const data = await response.json();

            hideTyping();
            addBotMessage(data.response);

            // Update lead data if provided
            if (data.leadData) {
                state.leadData = { ...state.leadData, ...data.leadData };
            }

        } catch (error) {
            console.error('AI response error:', error);
            hideTyping();

            // Fallback to simple keyword matching
            addBotMessage(getFallbackResponse(userMessage));
        }
    }

    // Simple fallback responses
    function getFallbackResponse(message) {
        const lower = message.toLowerCase();

        if (lower.includes('price') || lower.includes('cost')) {
            return "I can get you an instant quote! Would you like me to direct you to our AI quote system?";
        }
        if (lower.includes('ceramic') || lower.includes('carbon') || lower.includes('dyed')) {
            return "Great question about our tint options! Let me show you a comparison.";
        }
        return "That's a great question! I can help you with quotes, comparisons, or connect you with our team. What would be most helpful?";
    }

    // Add bot message
    function addBotMessage(text) {
        const msg = document.createElement('div');
        msg.className = 'flex items-start space-x-3 animate-fade-in';
        msg.innerHTML = `
            <div class="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z"></path>
                </svg>
            </div>
            <div class="flex-1 bg-blue-600/10 backdrop-blur-sm rounded-2xl rounded-tl-none p-3 border border-blue-500/20">
                <p class="text-sm text-white">${text}</p>
            </div>
        `;

        document.getElementById('tintbot-messages').appendChild(msg);
        scrollToBottom();
    }

    // Add user message
    function addUserMessage(text) {
        const msg = document.createElement('div');
        msg.className = 'flex items-end space-x-3 justify-end animate-fade-in';
        msg.innerHTML = `
            <div class="flex-1 bg-blue-600 rounded-2xl rounded-tr-none p-3 max-w-xs ml-auto">
                <p class="text-sm text-white">${text}</p>
            </div>
            <div class="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
                <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path>
                </svg>
            </div>
        `;

        document.getElementById('tintbot-messages').appendChild(msg);
        scrollToBottom();
    }

    // Show typing indicator
    function showTyping() {
        const typing = document.createElement('div');
        typing.id = 'typing-indicator';
        typing.className = 'flex items-start space-x-3';
        typing.innerHTML = `
            <div class="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z"></path>
                </svg>
            </div>
            <div class="bg-blue-600/10 backdrop-blur-sm rounded-2xl rounded-tl-none p-3 border border-blue-500/20">
                <div class="flex space-x-1">
                    <div class="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                    <div class="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style="animation-delay: 0.1s"></div>
                    <div class="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
                </div>
            </div>
        `;

        document.getElementById('tintbot-messages').appendChild(typing);
        scrollToBottom();
    }

    function hideTyping() {
        const typing = document.getElementById('typing-indicator');
        if (typing) typing.remove();
    }

    // Check if user can minimize
    function checkIfCanMinimize() {
        if (config.required && state.messageCount >= config.minimumInteraction) {
            // User has met minimum interaction requirement
            unblockContent();

            const minimizeBtn = document.getElementById('tintbot-minimize');
            if (minimizeBtn) {
                minimizeBtn.textContent = 'Minimize →';
                minimizeBtn.classList.remove('opacity-50', 'cursor-not-allowed');
                minimizeBtn.onclick = minimize;
            }

            // Show success message
            addBotMessage("Great! You can now browse the site, or I can continue helping you. I'll be in the corner if you need me! 👋");
        }
    }

    // Minimize chat
    function minimize() {
        const overlay = document.getElementById('tintbot-chat-overlay');
        if (overlay) overlay.remove();

        renderMinimized();
        saveSession();
    }

    // Session management
    function saveSession() {
        const session = {
            timestamp: Date.now(),
            hasInteracted: state.hasInteracted,
            leadData: state.leadData
        };
        sessionStorage.setItem('tintbot_session', JSON.stringify(session));
    }

    function getSession() {
        const session = sessionStorage.getItem('tintbot_session');
        if (!session) return null;

        const data = JSON.parse(session);
        const isExpired = (Date.now() - data.timestamp) > config.sessionDuration;

        return isExpired ? null : data;
    }

    function generateSessionId() {
        return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    function scrollToBottom() {
        const messages = document.getElementById('tintbot-messages');
        if (messages) {
            messages.scrollTop = messages.scrollHeight;
        }
    }

    function attachEventListeners() {
        // Handle minimize button
        const minimizeBtn = document.getElementById('tintbot-minimize');
        if (minimizeBtn && !config.required) {
            minimizeBtn.onclick = minimize;
        }
    }

    // Public API
    return {
        init,
        minimize,
        addMessage: addBotMessage,
        updateLeadData: (data) => {
            state.leadData = { ...state.leadData, ...data };
        }
    };
})();

// Export for use in modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TintbotChat;
}
