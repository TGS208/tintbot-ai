/**
 * Enhanced TintBot AI for Client Integration
 * Captures comprehensive lead data for automation
 */

import { useState, useRef, useEffect } from 'react'
import { Bot, User, Send, Car, Calendar, DollarSign } from 'lucide-react'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { apiService } from '../services/api'

interface LeadData {
  personalInfo: {
    name: string
    email: string
    phone: string
  }
  vehicleInfo: {
    year: string
    make: string
    model: string
    type: 'sedan' | 'suv' | 'truck' | 'coupe'
  }
  servicePreferences: {
    tintType: 'ceramic' | 'carbon' | 'basic'
    darkness: '20%' | '35%' | '50%' | '70%'
    coverage: 'full' | 'rear-only' | 'sides-rear'
    budget: 'under-300' | '300-500' | '500-800' | 'premium'
    timeline: 'asap' | 'this-week' | 'next-week' | 'flexible'
  }
  leadScore: number
  readyToBook: boolean
}

interface ChatMessage {
  id: string
  type: 'user' | 'bot'
  content: string
  timestamp: Date
  leadData?: Partial<LeadData>
}

export default function EnhancedTintBotAI({ clientConfig }: { clientConfig: any }) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'bot',
      content: `Hi! I'm ${clientConfig.branding.chatbotName} from ${clientConfig.businessName}. I can help you get a personalized quote for window tinting and schedule your appointment. What type of vehicle do you drive?`,
      timestamp: new Date()
    }
  ])
  
  const [currentLead, setCurrentLead] = useState<Partial<LeadData>>({
    personalInfo: {},
    vehicleInfo: {},
    servicePreferences: {},
    leadScore: 0,
    readyToBook: false
  })
  
  const [conversationStage, setConversationStage] = useState<'vehicle' | 'service' | 'contact' | 'booking'>('vehicle')
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  const processUserInput = async (userMessage: string) => {
    const message = userMessage.toLowerCase()
    let botResponse = ''
    let updatedLead = { ...currentLead }
    let score = currentLead.leadScore || 0

    switch (conversationStage) {
      case 'vehicle':
        // Extract vehicle information
        if (message.includes('tesla') || message.includes('model')) {
          updatedLead.vehicleInfo = {
            ...updatedLead.vehicleInfo,
            make: 'Tesla',
            type: 'sedan'
          }
          score += 25
          botResponse = `Great choice! Tesla vehicles look amazing with ceramic tint. For your Tesla, I'd recommend our premium ceramic tint - it won't interfere with electronics and provides excellent heat rejection. What's your main priority: heat reduction, privacy, or UV protection?`
          setConversationStage('service')
        } else if (extractVehicleInfo(message)) {
          const vehicleInfo = extractVehicleInfo(message)
          updatedLead.vehicleInfo = { ...updatedLead.vehicleInfo, ...vehicleInfo }
          score += 15
          botResponse = `Perfect! For your ${vehicleInfo.year} ${vehicleInfo.make} ${vehicleInfo.model}, we have several great tint options. What's most important to you: heat rejection, privacy, or staying within a specific budget?`
          setConversationStage('service')
        } else {
          botResponse = `I'd love to help! Could you tell me your vehicle's year, make, and model? For example: "2023 Honda Civic" or "2021 Ford F-150"`
        }
        break

      case 'service':
        // Service preference capture
        if (message.includes('ceramic') || message.includes('premium') || message.includes('best')) {
          updatedLead.servicePreferences = {
            ...updatedLead.servicePreferences,
            tintType: 'ceramic'
          }
          score += 20
          botResponse = `Excellent choice! Our ceramic tint is our most popular option. For your ${updatedLead.vehicleInfo?.make}, ceramic tint typically runs $${clientConfig.services.find(s => s.name.includes('Ceramic'))?.basePrice}. What darkness level interests you? We offer 35%, 50%, and 70% (lighter lets in more light).`
        } else if (message.includes('price') || message.includes('cost') || message.includes('budget')) {
          if (message.includes('under') || message.includes('cheap') || message.includes('budget')) {
            updatedLead.servicePreferences = { ...updatedLead.servicePreferences, budget: 'under-300' }
            botResponse = `I understand budget is important! Our carbon tint option provides great value at $${clientConfig.services.find(s => s.name.includes('Carbon'))?.basePrice}. It offers excellent heat rejection and a sleek appearance. Would you like me to prepare a detailed quote?`
          } else {
            botResponse = `Our pricing varies by tint type and vehicle:\n• Basic Tint: $${clientConfig.services.find(s => s.name.includes('Basic'))?.basePrice}\n• Carbon Tint: $${clientConfig.services.find(s => s.name.includes('Carbon'))?.basePrice}\n• Ceramic Tint: $${clientConfig.services.find(s => s.name.includes('Ceramic'))?.basePrice}\n\nWhich option interests you most?`
          }
          score += 15
          setConversationStage('contact')
        }
        break

      case 'contact':
        // Contact information capture
        if (extractContactInfo(message)) {
          const contactInfo = extractContactInfo(message)
          updatedLead.personalInfo = { ...updatedLead.personalInfo, ...contactInfo }
          score += 30
          botResponse = `Thank you ${contactInfo.name}! I have your information. Based on our conversation, I can offer you a personalized quote for your ${updatedLead.vehicleInfo?.year} ${updatedLead.vehicleInfo?.make}. Would you like me to check our calendar for available appointment times this week?`
          setConversationStage('booking')
          updatedLead.readyToBook = true
        } else {
          botResponse = `To prepare your personalized quote and check availability, I'll need your name and phone number. Could you share those with me?`
        }
        break

      case 'booking':
        // Booking intent
        if (message.includes('yes') || message.includes('book') || message.includes('schedule') || message.includes('appointment')) {
          score += 25
          botResponse = `Perfect! I'm connecting you with our booking system now. You'll receive a text message with available appointment times within the next few minutes. Is ${updatedLead.personalInfo?.phone} the best number to reach you?`
          
          // Trigger automation
          await triggerAutomation(updatedLead, clientConfig)
        }
        break
    }

    updatedLead.leadScore = Math.min(score, 100)
    setCurrentLead(updatedLead)
    return botResponse
  }

  const triggerAutomation = async (leadData: Partial<LeadData>, clientConfig: any) => {
    // Send to your automation endpoint
    try {
      await fetch('/api/trigger-automation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientId: clientConfig.clientId,
          leadData,
          integrations: clientConfig.integrations
        })
      })
    } catch (error) {
      console.error('Automation trigger failed:', error)
    }
  }

  // Helper functions
  const extractVehicleInfo = (message: string) => {
    // Simple extraction logic - in production, use NLP
    const yearMatch = message.match(/20\d{2}/)
    const commonMakes = ['honda', 'toyota', 'ford', 'chevy', 'bmw', 'audi', 'mercedes']
    const makeMatch = commonMakes.find(make => message.includes(make))
    
    if (yearMatch || makeMatch) {
      return {
        year: yearMatch?.[0] || '',
        make: makeMatch ? makeMatch.charAt(0).toUpperCase() + makeMatch.slice(1) : '',
        model: '', // Could extract this too
        type: 'sedan' as const // Default, could be smarter
      }
    }
    return null
  }

  const extractContactInfo = (message: string) => {
    const emailMatch = message.match(/[^\s@]+@[^\s@]+\.[^\s@]+/)
    const phoneMatch = message.match(/(\d{3}[-.\s]?\d{3}[-.\s]?\d{4})/)
    const nameMatch = message.match(/(?:i'm|my name is|name's)\s+([a-zA-Z\s]+)/i)
    
    return {
      email: emailMatch?.[0] || '',
      phone: phoneMatch?.[0] || '',
      name: nameMatch?.[1]?.trim() || ''
    }
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

    setTimeout(async () => {
      const botResponse = await processUserInput(inputValue)
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: botResponse,
        timestamp: new Date(),
        leadData: currentLead
      }

      setMessages(prev => [...prev, botMessage])
      setIsTyping(false)
    }, 1500)
  }

  return (
    <Card className="max-w-4xl mx-auto bg-slate-800/50 border-slate-700">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-white flex items-center">
            <Bot className="w-6 h-6 mr-2" style={{ color: clientConfig.branding.primaryColor }} />
            {clientConfig.branding.chatbotName}
          </CardTitle>
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-400">Lead Score:</div>
            <div className="flex items-center">
              <div className="w-20 h-2 bg-slate-700 rounded-full overflow-hidden">
                <div 
                  className="h-full transition-all duration-500"
                  style={{ 
                    width: `${currentLead.leadScore || 0}%`,
                    backgroundColor: clientConfig.branding.primaryColor
                  }}
                />
              </div>
              <span className="ml-2 text-sm font-semibold text-white">{currentLead.leadScore || 0}/100</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Chat interface similar to before but with enhanced lead capture */}
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
                  <p className="text-sm whitespace-pre-line">{message.content}</p>
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
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input area */}
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Type your message here..."
            className="flex-1 px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
            disabled={isTyping}
          />
          <Button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isTyping}
            className="text-white"
            style={{ backgroundColor: clientConfig.branding.primaryColor }}
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>

        {/* Lead Progress Indicator */}
        <div className="mt-4 grid grid-cols-4 gap-2">
          <div className={`text-center p-2 rounded ${currentLead.vehicleInfo?.make ? 'bg-green-500/20 text-green-400' : 'bg-slate-700 text-gray-400'}`}>
            <Car className="w-4 h-4 mx-auto mb-1" />
            <div className="text-xs">Vehicle</div>
          </div>
          <div className={`text-center p-2 rounded ${currentLead.servicePreferences?.tintType ? 'bg-green-500/20 text-green-400' : 'bg-slate-700 text-gray-400'}`}>
            <DollarSign className="w-4 h-4 mx-auto mb-1" />
            <div className="text-xs">Service</div>
          </div>
          <div className={`text-center p-2 rounded ${currentLead.personalInfo?.name ? 'bg-green-500/20 text-green-400' : 'bg-slate-700 text-gray-400'}`}>
            <User className="w-4 h-4 mx-auto mb-1" />
            <div className="text-xs">Contact</div>
          </div>
          <div className={`text-center p-2 rounded ${currentLead.readyToBook ? 'bg-green-500/20 text-green-400' : 'bg-slate-700 text-gray-400'}`}>
            <Calendar className="w-4 h-4 mx-auto mb-1" />
            <div className="text-xs">Booking</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
