/**
 * TintOS Embed Script (CDN Version)
 *
 * This is what gets loaded from: https://cdn.tintos.ai/chatbot.js
 * Clients embed this on their sites with just their shopId
 *
 * Usage:
 * <script src="https://cdn.tintos.ai/chatbot.js"></script>
 * <script>
 *   TintOS.init({ shopId: 'SHOP_12345' });
 * </script>
 */

(function(window) {
    'use strict';

    // TintOS Global Object
    const TintOS = {
        version: '1.0.0',
        config: {},
        shopData: null,
        chatWidget: null,

        /**
         * Initialize the chatbot
         * @param {Object} options - Configuration options
         */
        init: function(options) {
            // Validate required parameters
            if (!options.shopId) {
                console.error('TintOS Error: shopId is required');
                return;
            }

            // Merge default config with user options
            this.config = Object.assign({
                // Required
                shopId: null,

                // Branding
                primaryColor: '#3b82f6',
                secondaryColor: '#8b5cf6',
                logoUrl: null,
                businessName: 'Auto Tint Shop',

                // Positioning
                position: 'bottom-right', // bottom-right, bottom-left, top-right, top-left
                offset: { x: 24, y: 24 },

                // Behavior
                autoOpen: false,
                openDelay: 0,
                required: false, // Chat-gate mode
                minimumInteraction: 1,

                // Features
                features: {
                    vehicleRecognition: true,
                    instantQuotes: true,
                    appointmentBooking: true,
                    smsNotifications: true,
                    phoneIntegration: true
                },

                // Messages
                welcomeMessage: '👋 Hi! I can help you get an instant quote for window tinting. What brings you here today?',
                offlineMessage: 'We\'re currently offline, but leave a message and we\'ll get back to you!',

                // Integrations
                calendar: {
                    provider: null, // 'google', 'calendly', etc.
                    calendarId: null
                },

                // Custom pricing (optional - usually synced from dashboard)
                pricing: null,

                // Callbacks
                onChatOpen: null,
                onChatClose: null,
                onQuoteGenerated: null,
                onAppointmentBooked: null,
                onLeadCaptured: null,

                // API endpoints
                apiBase: 'https://api.tintos.ai/v1',
                cdnBase: 'https://cdn.tintos.ai'

            }, options);

            // Load shop configuration from API
            this.loadShopConfig()
                .then(() => this.injectChatWidget())
                .then(() => this.attachEventListeners())
                .then(() => this.handleAutoOpen())
                .catch(error => console.error('TintOS Init Error:', error));
        },

        /**
         * Load shop configuration from TintOS API
         */
        loadShopConfig: async function() {
            try {
                const response = await fetch(`${this.config.apiBase}/shops/${this.config.shopId}`);

                if (!response.ok) {
                    throw new Error('Shop not found');
                }

                this.shopData = await response.json();

                // Override config with shop settings
                if (this.shopData.settings) {
                    this.config = Object.assign(this.config, this.shopData.settings);
                }

                console.log('TintOS: Shop configuration loaded', this.shopData);

            } catch (error) {
                console.error('TintOS: Failed to load shop config', error);
                // Continue with defaults
            }
        },

        /**
         * Inject chat widget HTML into page
         */
        injectChatWidget: function() {
            // Create widget container
            const container = document.createElement('div');
            container.id = 'tintos-chat-widget';
            container.style.cssText = this.getPositionCSS();

            // Build widget HTML
            container.innerHTML = `
                <!-- Minimized Chat Button -->
                <div id="tintos-minimized" class="tintos-chat-button">
                    <div class="tintos-pulse-ring"></div>
                    <div class="tintos-button-inner">
                        <svg class="tintos-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/>
                        </svg>
                        <span class="tintos-badge">AI</span>
                    </div>
                </div>

                <!-- Expanded Chat Window (hidden by default) -->
                <div id="tintos-expanded" class="tintos-chat-window" style="display: none;">
                    <!-- Header -->
                    <div class="tintos-header">
                        <div class="tintos-header-info">
                            ${this.config.logoUrl ?
                                `<img src="${this.config.logoUrl}" alt="Logo" class="tintos-logo"/>` :
                                '<div class="tintos-avatar">🤖</div>'
                            }
                            <div>
                                <div class="tintos-business-name">${this.config.businessName}</div>
                                <div class="tintos-status">
                                    <span class="tintos-status-dot"></span>
                                    Online • Instant replies
                                </div>
                            </div>
                        </div>
                        <button id="tintos-minimize" class="tintos-minimize-btn">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                            </svg>
                        </button>
                    </div>

                    <!-- Messages Container -->
                    <div id="tintos-messages" class="tintos-messages">
                        <!-- Messages loaded here -->
                    </div>

                    <!-- Input Area -->
                    <div class="tintos-input-area">
                        <input type="text"
                               id="tintos-input"
                               placeholder="Type your message..."
                               autocomplete="off"/>
                        <button id="tintos-send" class="tintos-send-btn">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
                            </svg>
                        </button>
                    </div>

                    <!-- Powered By -->
                    <div class="tintos-footer">
                        <a href="https://tintos.ai" target="_blank" class="tintos-powered-by">
                            ⚡ Powered by TintOS
                        </a>
                    </div>
                </div>
            `;

            // Inject styles
            this.injectStyles();

            // Add to page
            document.body.appendChild(container);

            // Store reference
            this.chatWidget = container;

            // Load initial chat message
            this.addBotMessage(this.config.welcomeMessage);

            return Promise.resolve();
        },

        /**
         * Get position CSS based on config
         */
        getPositionCSS: function() {
            const positions = {
                'bottom-right': `position: fixed; bottom: ${this.config.offset.y}px; right: ${this.config.offset.x}px;`,
                'bottom-left': `position: fixed; bottom: ${this.config.offset.y}px; left: ${this.config.offset.x}px;`,
                'top-right': `position: fixed; top: ${this.config.offset.y}px; right: ${this.config.offset.x}px;`,
                'top-left': `position: fixed; top: ${this.config.offset.y}px; left: ${this.config.offset.x}px;`
            };

            return positions[this.config.position] + ' z-index: 999999;';
        },

        /**
         * Inject CSS styles
         */
        injectStyles: function() {
            const style = document.createElement('style');
            style.textContent = `
                /* TintOS Chatbot Styles */
                .tintos-chat-button {
                    position: relative;
                    width: 64px;
                    height: 64px;
                    cursor: pointer;
                    transition: transform 0.3s ease;
                }
                .tintos-chat-button:hover {
                    transform: scale(1.1);
                }
                .tintos-pulse-ring {
                    position: absolute;
                    inset: 0;
                    background: ${this.config.primaryColor};
                    border-radius: 50%;
                    animation: tintos-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
                    opacity: 0.75;
                }
                @keyframes tintos-pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.5; }
                }
                .tintos-button-inner {
                    position: relative;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(135deg, ${this.config.primaryColor}, ${this.config.secondaryColor});
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    box-shadow: 0 10px 40px rgba(0,0,0,0.3);
                }
                .tintos-icon {
                    width: 32px;
                    height: 32px;
                    color: white;
                }
                .tintos-badge {
                    position: absolute;
                    top: -4px;
                    right: -4px;
                    background: #ef4444;
                    color: white;
                    font-size: 10px;
                    font-weight: bold;
                    padding: 2px 6px;
                    border-radius: 10px;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.2);
                }
                .tintos-chat-window {
                    width: 380px;
                    max-width: calc(100vw - 48px);
                    height: 600px;
                    max-height: calc(100vh - 100px);
                    background: white;
                    border-radius: 16px;
                    box-shadow: 0 20px 60px rgba(0,0,0,0.3);
                    display: flex;
                    flex-direction: column;
                    overflow: hidden;
                }
                .tintos-header {
                    background: linear-gradient(135deg, ${this.config.primaryColor}, ${this.config.secondaryColor});
                    color: white;
                    padding: 16px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }
                .tintos-header-info {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }
                .tintos-logo {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    object-fit: cover;
                }
                .tintos-avatar {
                    width: 40px;
                    height: 40px;
                    background: rgba(255,255,255,0.2);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 20px;
                }
                .tintos-business-name {
                    font-weight: 600;
                    font-size: 16px;
                }
                .tintos-status {
                    font-size: 12px;
                    opacity: 0.9;
                    display: flex;
                    align-items: center;
                    gap: 6px;
                }
                .tintos-status-dot {
                    width: 8px;
                    height: 8px;
                    background: #10b981;
                    border-radius: 50%;
                    animation: tintos-pulse 2s ease-in-out infinite;
                }
                .tintos-minimize-btn {
                    background: rgba(255,255,255,0.2);
                    border: none;
                    width: 32px;
                    height: 32px;
                    border-radius: 50%;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: background 0.2s;
                }
                .tintos-minimize-btn:hover {
                    background: rgba(255,255,255,0.3);
                }
                .tintos-minimize-btn svg {
                    width: 20px;
                    height: 20px;
                    color: white;
                }
                .tintos-messages {
                    flex: 1;
                    padding: 16px;
                    overflow-y: auto;
                    background: #f9fafb;
                }
                .tintos-message {
                    display: flex;
                    margin-bottom: 16px;
                    animation: tintos-slideIn 0.3s ease-out;
                }
                @keyframes tintos-slideIn {
                    from {
                        opacity: 0;
                        transform: translateY(10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .tintos-message.user {
                    justify-content: flex-end;
                }
                .tintos-message-bubble {
                    max-width: 80%;
                    padding: 12px 16px;
                    border-radius: 16px;
                    font-size: 14px;
                    line-height: 1.5;
                }
                .tintos-message.bot .tintos-message-bubble {
                    background: white;
                    border: 1px solid #e5e7eb;
                    border-bottom-left-radius: 4px;
                }
                .tintos-message.user .tintos-message-bubble {
                    background: ${this.config.primaryColor};
                    color: white;
                    border-bottom-right-radius: 4px;
                }
                .tintos-input-area {
                    padding: 16px;
                    background: white;
                    border-top: 1px solid #e5e7eb;
                    display: flex;
                    gap: 8px;
                }
                .tintos-input-area input {
                    flex: 1;
                    padding: 12px 16px;
                    border: 1px solid #e5e7eb;
                    border-radius: 24px;
                    font-size: 14px;
                    outline: none;
                }
                .tintos-input-area input:focus {
                    border-color: ${this.config.primaryColor};
                }
                .tintos-send-btn {
                    width: 40px;
                    height: 40px;
                    background: ${this.config.primaryColor};
                    border: none;
                    border-radius: 50%;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: background 0.2s;
                }
                .tintos-send-btn:hover {
                    opacity: 0.9;
                }
                .tintos-send-btn svg {
                    width: 20px;
                    height: 20px;
                    color: white;
                }
                .tintos-footer {
                    padding: 8px 16px;
                    background: #f9fafb;
                    text-align: center;
                    border-top: 1px solid #e5e7eb;
                }
                .tintos-powered-by {
                    font-size: 11px;
                    color: #6b7280;
                    text-decoration: none;
                }
                .tintos-powered-by:hover {
                    color: ${this.config.primaryColor};
                }

                /* Mobile Responsive */
                @media (max-width: 480px) {
                    .tintos-chat-window {
                        position: fixed !important;
                        inset: 0 !important;
                        width: 100% !important;
                        height: 100% !important;
                        max-width: 100% !important;
                        max-height: 100% !important;
                        border-radius: 0 !important;
                    }
                }
            `;

            document.head.appendChild(style);
        },

        /**
         * Attach event listeners
         */
        attachEventListeners: function() {
            // Open chat
            document.getElementById('tintos-minimized').addEventListener('click', () => {
                this.openChat();
            });

            // Close chat
            document.getElementById('tintos-minimize').addEventListener('click', () => {
                this.closeChat();
            });

            // Send message
            document.getElementById('tintos-send').addEventListener('click', () => {
                this.sendMessage();
            });

            // Send on Enter key
            document.getElementById('tintos-input').addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.sendMessage();
                }
            });

            return Promise.resolve();
        },

        /**
         * Handle auto-open behavior
         */
        handleAutoOpen: function() {
            if (this.config.autoOpen) {
                setTimeout(() => {
                    this.openChat();
                }, this.config.openDelay);
            }
        },

        /**
         * Open chat window
         */
        openChat: function() {
            document.getElementById('tintos-minimized').style.display = 'none';
            document.getElementById('tintos-expanded').style.display = 'flex';

            // Focus input
            document.getElementById('tintos-input').focus();

            // Callback
            if (this.config.onChatOpen) {
                this.config.onChatOpen();
            }

            // Track event
            this.trackEvent('chat_opened');
        },

        /**
         * Close chat window
         */
        closeChat: function() {
            document.getElementById('tintos-expanded').style.display = 'none';
            document.getElementById('tintos-minimized').style.display = 'block';

            // Callback
            if (this.config.onChatClose) {
                this.config.onChatClose();
            }

            // Track event
            this.trackEvent('chat_closed');
        },

        /**
         * Send user message
         */
        sendMessage: async function() {
            const input = document.getElementById('tintos-input');
            const message = input.value.trim();

            if (!message) return;

            // Add user message to UI
            this.addUserMessage(message);

            // Clear input
            input.value = '';

            // Show typing indicator
            this.showTypingIndicator();

            // Send to TintOS API
            try {
                const response = await fetch(`${this.config.apiBase}/chat`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        shopId: this.config.shopId,
                        message: message,
                        sessionId: this.getSessionId()
                    })
                });

                const data = await response.json();

                // Hide typing indicator
                this.hideTypingIndicator();

                // Add bot response
                if (data.response) {
                    this.addBotMessage(data.response);
                }

                // Handle special actions (quote generated, appointment booked, etc.)
                if (data.action) {
                    this.handleAction(data.action, data.actionData);
                }

            } catch (error) {
                console.error('TintOS: Message send error', error);
                this.hideTypingIndicator();
                this.addBotMessage('Sorry, I had trouble processing that. Can you try again?');
            }
        },

        /**
         * Add user message to chat
         */
        addUserMessage: function(text) {
            const messagesDiv = document.getElementById('tintos-messages');
            const messageDiv = document.createElement('div');
            messageDiv.className = 'tintos-message user';
            messageDiv.innerHTML = `
                <div class="tintos-message-bubble">${this.escapeHtml(text)}</div>
            `;
            messagesDiv.appendChild(messageDiv);
            this.scrollToBottom();
        },

        /**
         * Add bot message to chat
         */
        addBotMessage: function(text) {
            const messagesDiv = document.getElementById('tintos-messages');
            const messageDiv = document.createElement('div');
            messageDiv.className = 'tintos-message bot';
            messageDiv.innerHTML = `
                <div class="tintos-message-bubble">${text}</div>
            `;
            messagesDiv.appendChild(messageDiv);
            this.scrollToBottom();
        },

        /**
         * Show typing indicator
         */
        showTypingIndicator: function() {
            const messagesDiv = document.getElementById('tintos-messages');
            const typingDiv = document.createElement('div');
            typingDiv.id = 'tintos-typing';
            typingDiv.className = 'tintos-message bot';
            typingDiv.innerHTML = `
                <div class="tintos-message-bubble">
                    <span style="display: inline-block; width: 8px; height: 8px; background: #9ca3af; border-radius: 50%; margin: 0 2px; animation: tintos-typing 1.4s infinite;"></span>
                    <span style="display: inline-block; width: 8px; height: 8px; background: #9ca3af; border-radius: 50%; margin: 0 2px; animation: tintos-typing 1.4s infinite; animation-delay: 0.2s;"></span>
                    <span style="display: inline-block; width: 8px; height: 8px; background: #9ca3af; border-radius: 50%; margin: 0 2px; animation: tintos-typing 1.4s infinite; animation-delay: 0.4s;"></span>
                </div>
            `;
            messagesDiv.appendChild(typingDiv);
            this.scrollToBottom();

            // Add animation
            const style = document.createElement('style');
            style.textContent = `
                @keyframes tintos-typing {
                    0%, 60%, 100% { opacity: 0.3; }
                    30% { opacity: 1; }
                }
            `;
            document.head.appendChild(style);
        },

        /**
         * Hide typing indicator
         */
        hideTypingIndicator: function() {
            const typing = document.getElementById('tintos-typing');
            if (typing) typing.remove();
        },

        /**
         * Handle special actions from API
         */
        handleAction: function(action, data) {
            switch(action) {
                case 'quote_generated':
                    if (this.config.onQuoteGenerated) {
                        this.config.onQuoteGenerated(data);
                    }
                    break;

                case 'appointment_booked':
                    if (this.config.onAppointmentBooked) {
                        this.config.onAppointmentBooked(data);
                    }
                    break;

                case 'lead_captured':
                    if (this.config.onLeadCaptured) {
                        this.config.onLeadCaptured(data);
                    }
                    break;
            }
        },

        /**
         * Get or create session ID
         */
        getSessionId: function() {
            let sessionId = sessionStorage.getItem('tintos_session_id');

            if (!sessionId) {
                sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
                sessionStorage.setItem('tintos_session_id', sessionId);
            }

            return sessionId;
        },

        /**
         * Track analytics event
         */
        trackEvent: function(eventName, data = {}) {
            // Send to TintOS analytics
            fetch(`${this.config.apiBase}/analytics/track`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    shopId: this.config.shopId,
                    event: eventName,
                    data: data,
                    timestamp: new Date().toISOString()
                })
            }).catch(err => console.error('Analytics error:', err));

            // Also trigger Google Analytics if available
            if (window.gtag) {
                window.gtag('event', eventName, data);
            }
        },

        /**
         * Scroll messages to bottom
         */
        scrollToBottom: function() {
            const messagesDiv = document.getElementById('tintos-messages');
            if (messagesDiv) {
                messagesDiv.scrollTop = messagesDiv.scrollHeight;
            }
        },

        /**
         * Escape HTML to prevent XSS
         */
        escapeHtml: function(text) {
            const div = document.createElement('div');
            div.textContent = text;
            return div.innerHTML;
        }
    };

    // Expose TintOS to global scope
    window.TintOS = TintOS;

})(window);
