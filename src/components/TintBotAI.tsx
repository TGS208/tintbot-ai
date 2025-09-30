/**
 * TintBotAI Chat Component - Interactive AI Demo
 * Simulates real AI chat interactions for demonstration
 */

import { useState, useRef, useEffect } from 'react'
import { Bot, User, Send, Loader } from 'lucide-react'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

interface ChatMessage {
  id: string
  type: 'user' | 'bot'
  content: string
  timestamp: Date
  leadScore?: number
}

export default function TintBotAI() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'bot',
      content: "Hi! I'm your AI assistant for tint services. I can help you find the perfect window tint for your vehicle. What type of car do you drive?",
      timestamp: new Date(),
      leadScore: 0
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [currentLeadScore, setCurrentLeadScore] = useState(0)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const simulateBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase()
    let score = currentLeadScore
    
    // Simulate intelligent responses based on user input
    if (message.includes('tesla') || message.includes('bmw') || message.includes('mercedes') || message.includes('audi')) {
      score += 25
      return "Great choice! Premium vehicles deserve premium tint. For luxury cars like yours, I'd recommend our ceramic tint - it offers superior heat rejection and won't interfere with electronics. What's your main goal: heat reduction, privacy, or UV protection?"
    }
    
    if (message.includes('ceramic') || message.includes('premium') || message.includes('best')) {
      score += 20
      return "Ceramic tint is our most popular premium option! It blocks 99% of UV rays and reduces heat by up to 60%. For your vehicle, we offer 70%, 50%, 35%, and 20% options. What level of privacy are you looking for?"
    }
    
    if (message.includes('price') || message.includes('cost') || message.includes('how much')) {
      score += 15
      return "I'd be happy to provide pricing! For ceramic tint on a sedan, we typically range from $299-599 depending on the package. Can you tell me your vehicle's year and model so I can give you an exact quote?"
    }
    
    if (message.includes('book') || message.includes('schedule') || message.includes('appointment')) {
      score += 30
      return "Perfect! I can help you schedule right now. We have availability this week. What day works best for you? I'll also need your contact information to confirm the appointment."
    }
    
    if (message.includes('heat') || message.includes('hot') || message.includes('sun')) {
      score += 15
      return "Heat rejection is where ceramic tint really shines! It can reduce interior temperature by 15-20 degrees. Especially important for leather seats and electronics. Are you in a particularly sunny climate?"
    }
    
    if (message.includes('legal') || message.includes('law') || message.includes('limit')) {
      score += 10
      return "Great question! Tint laws vary by state. Most allow 70% on the windshield and 35% on front windows, with rear windows having more flexibility. What state are you in? I can tell you the exact legal limits."
    }

    // Default responses
    const responses = [
      "That's helpful information! Can you tell me more about what you're looking for in window tint?",
      "I understand. Let me help you find the best solution for your needs. What's most important to you: heat reduction, privacy, or UV protection?",
      "Thanks for sharing that! Based on what you've told me, I can recommend some great options. Would you like to hear about our ceramic or carbon tint packages?"
    ]
    
    score += 5 // Base score for engagement
    setCurrentLeadScore(Math.min(score, 100))
    
    return responses[Math.floor(Math.random() * responses.length)]
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    // Simulate typing delay
    setTimeout(() => {
      const botResponse = simulateBotResponse(inputValue)
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: botResponse,
        timestamp: new Date(),
        leadScore: currentLeadScore
      }

      setMessages(prev => [...prev, botMessage])
      setIsTyping(false)
    }, 1500)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const quickReplies = [
    "I drive a Tesla Model 3",
    "What's your best ceramic tint?",
    "How much does it cost?",
    "I want to book an appointment"
  ]

  return (
    <Card className="max-w-4xl mx-auto bg-slate-800/50 border-slate-700">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-white flex items-center">
            <Bot className="w-6 h-6 text-orange-400 mr-2" />
            Live AI Demo - Try It Now!
          </CardTitle>
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-400">Lead Score:</div>
            <div className="flex items-center">
              <div className="w-20 h-2 bg-slate-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 transition-all duration-500"
                  style={{ width: `${currentLeadScore}%` }}
                />
              </div>
              <span className="ml-2 text-sm font-semibold text-white">{currentLeadScore}/100</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Chat Messages */}
        <div className="h-96 overflow-y-auto bg-slate-900/50 rounded-lg p-4 mb-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-start space-x-2 max-w-xs lg:max-w-md ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                  message.type === 'user' ? 'bg-blue-500' : 'bg-orange-500'
                }`}>
                  {message.type === 'user' ? (
                    <User className="w-4 h-4 text-white" />
                  ) : (
                    <Bot className="w-4 h-4 text-white" />
                  )}
                </div>
                <div className={`px-4 py-2 rounded-lg ${
                  message.type === 'user' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-slate-700 text-gray-100'
                }`}>
                  <p className="text-sm">{message.content}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex items-start space-x-2">
                <div className="flex-shrink-0 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="px-4 py-2 bg-slate-700 rounded-lg">
                  <div className="flex items-center space-x-1">
                    <Loader className="w-4 h-4 animate-spin text-gray-400" />
                    <p className="text-sm text-gray-300">AI is typing...</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Reply Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
          {quickReplies.map((reply, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              onClick={() => setInputValue(reply)}
              className="text-xs border-slate-600 text-slate-300 hover:bg-slate-700"
            >
              {reply}
            </Button>
          ))}
        </div>

        {/* Input Area */}
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message here..."
            className="flex-1 px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
            disabled={isTyping}
          />
          <Button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isTyping}
            className="bg-orange-500 hover:bg-orange-600 text-white"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>

        <p className="text-xs text-gray-400 mt-2 text-center">
          💡 Try asking about Tesla ceramic tint, pricing, or booking an appointment to see the lead score increase!
        </p>
      </CardContent>
    </Card>
  )
}
