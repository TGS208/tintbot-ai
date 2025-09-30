/**
 * Chatbot Integration Testing Component
 * Test your purchased chatbot before full deployment
 */

import { useState, useEffect } from 'react'
import { Bot, Settings, TestTube, CheckCircle, AlertCircle, Play } from 'lucide-react'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

interface ChatbotTestConfig {
  provider: string
  apiKey: string
  embedCode: string
  testMessages: string[]
  integrationMethod: 'embed' | 'api' | 'widget'
}

export default function ChatbotIntegrationTest() {
  const [testConfig, setTestConfig] = useState<ChatbotTestConfig>({
    provider: '',
    apiKey: '',
    embedCode: '',
    testMessages: [
      'Hello, I need a quote for window tinting',
      'What are your prices for a Honda Civic?',
      'Can I schedule an appointment?',
      'Do you offer ceramic tint?'
    ],
    integrationMethod: 'embed'
  })
  
  const [testResults, setTestResults] = useState<any[]>([])
  const [isTestingActive, setIsTestingActive] = useState(false)
  const [currentClient, setCurrentClient] = useState('elite-tint')

  // Simulate different client configurations
  const testClients = {
    'elite-tint': {
      name: 'Elite Tint & Graphics',
      subdomain: 'elite.tintbot.ai',
      branding: { primaryColor: '#FF6B35', logo: 'https://pub-cdn.sider.ai/u/U03VH4NA1X6/web-coder/68679b630385cdf9806597d2/resource/c4e3e821-e677-4822-b1a0-ab4fe0b16ec8.jpg' },
      services: ['Automotive Tint', 'Residential', 'Commercial'],
      pricing: { basic: 299, ceramic: 599, premium: 899 }
    },
    'precision-auto': {
      name: 'Precision Auto Tint',
      subdomain: 'precision.tintbot.ai', 
      branding: { primaryColor: '#0066CC', logo: 'https://pub-cdn.sider.ai/u/U03VH4NA1X6/web-coder/68679b630385cdf9806597d2/resource/4e1e1d10-f1f7-4662-904f-36efe0bb18cb.jpg' },
      services: ['Automotive Tint', 'Paint Protection', 'Ceramic Coating'],
      pricing: { basic: 399, ceramic: 699, premium: 999 }
    }
  }

  const runChatbotTest = async () => {
    setIsTestingActive(true)
    setTestResults([])
    
    // Simulate testing your purchased chatbot
    for (let i = 0; i < testConfig.testMessages.length; i++) {
      const message = testConfig.testMessages[i]
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Mock chatbot response based on message
      const response = generateMockResponse(message, testClients[currentClient])
      
      setTestResults(prev => [...prev, {
        id: i,
        message,
        response,
        status: 'success',
        processingTime: Math.floor(Math.random() * 500) + 200
      }])
    }
    
    setIsTestingActive(false)
  }

  const generateMockResponse = (message: string, client: any) => {
    if (message.includes('quote') || message.includes('price')) {
      return `Hi! I'd be happy to help you with a quote. For a ${client.name} installation, our ceramic tint starts at $${client.pricing.ceramic}. What type of vehicle do you have?`
    } else if (message.includes('schedule') || message.includes('appointment')) {
      return `Great! I can help you schedule an appointment at ${client.name}. We have availability this week. What day works best for you?`
    } else if (message.includes('ceramic')) {
      return `Yes! ${client.name} offers premium ceramic window tint. Our ceramic options provide superior heat rejection and UV protection. Would you like pricing details?`
    } else {
      return `Hello! Welcome to ${client.name}. I'm here to help you with all your window tinting needs. How can I assist you today?`
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            🧪 Chatbot Integration Testing Lab
          </h1>
          <p className="text-gray-400">
            Test your purchased chatbot integration before DNS/server setup
          </p>
        </div>

        {/* Client Selector */}
        <div className="mb-6">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Settings className="w-5 h-5 mr-2" />
                Test Client Configuration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                {Object.entries(testClients).map(([key, client]) => (
                  <div
                    key={key}
                    onClick={() => setCurrentClient(key)}
                    className={`p-4 rounded-lg cursor-pointer border-2 transition-all ${
                      currentClient === key
                        ? 'border-orange-500 bg-orange-500/10'
                        : 'border-slate-600 bg-slate-700/50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <img
                        src={client.branding.logo}
                        alt={client.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="text-white font-semibold">{client.name}</h3>
                        <p className="text-gray-400 text-sm">{client.subdomain}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Chatbot Configuration */}
        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Your Chatbot Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-gray-300 mb-2">Chatbot Provider</label>
                <select
                  value={testConfig.provider}
                  onChange={(e) => setTestConfig({...testConfig, provider: e.target.value})}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded text-white"
                >
                  <option value="">Select your provider...</option>
                  <option value="chatfuel">Chatfuel</option>
                  <option value="manychat">ManyChat</option>
                  <option value="dialogflow">Dialogflow</option>
                  <option value="botpress">Botpress</option>
                  <option value="custom">Custom API</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div>
                <label className="block text-gray-300 mb-2">API Key / Token</label>
                <input
                  type="password"
                  value={testConfig.apiKey}
                  onChange={(e) => setTestConfig({...testConfig, apiKey: e.target.value})}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded text-white"
                  placeholder="Enter your API key..."
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Integration Method</label>
                <div className="flex space-x-4">
                  {['embed', 'api', 'widget'].map((method) => (
                    <label key={method} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="integrationMethod"
                        value={method}
                        checked={testConfig.integrationMethod === method}
                        onChange={(e) => setTestConfig({...testConfig, integrationMethod: e.target.value as any})}
                      />
                      <span className="text-gray-300 capitalize">{method}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Embed Code (if applicable)</label>
                <textarea
                  value={testConfig.embedCode}
                  onChange={(e) => setTestConfig({...testConfig, embedCode: e.target.value})}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded text-white h-24"
                  placeholder="Paste your chatbot embed code here..."
                />
              </div>
            </CardContent>
          </Card>

          {/* Live Preview */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Live Client Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-slate-900 rounded-lg p-4 min-h-[300px]">
                <div 
                  className="border-b border-slate-700 pb-3 mb-4"
                  style={{ borderColor: testClients[currentClient].branding.primaryColor }}
                >
                  <div className="flex items-center space-x-3">
                    <img
                      src={testClients[currentClient].branding.logo}
                      className="w-8 h-8 rounded-full"
                      alt="Client logo"
                    />
                    <h3 className="text-white font-semibold">
                      {testClients[currentClient].name}
                    </h3>
                  </div>
                  <p className="text-gray-400 text-sm mt-1">
                    {testClients[currentClient].subdomain}
                  </p>
                </div>
                
                {/* Simulated Chat Interface */}
                <div className="space-y-3">
                  <div className="bg-slate-700 rounded-lg p-3">
                    <div className="flex items-center space-x-2 mb-2">
                      <Bot 
                        className="w-4 h-4" 
                        style={{ color: testClients[currentClient].branding.primaryColor }}
                      />
                      <span className="text-sm text-gray-300">TintBot AI</span>
                    </div>
                    <p className="text-white text-sm">
                      Hi! Welcome to {testClients[currentClient].name}. I can help you get a quote for window tinting, schedule an appointment, or answer questions about our services. How can I help?
                    </p>
                  </div>
                  
                  {/* Show test results */}
                  {testResults.map((result) => (
                    <div key={result.id} className="space-y-2">
                      <div className="bg-blue-600 rounded-lg p-2 ml-8">
                        <p className="text-white text-sm">{result.message}</p>
                      </div>
                      <div className="bg-slate-700 rounded-lg p-3">
                        <div className="flex items-center space-x-2 mb-2">
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          <span className="text-sm text-gray-300">
                            Responded in {result.processingTime}ms
                          </span>
                        </div>
                        <p className="text-white text-sm">{result.response}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Test Controls */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <TestTube className="w-5 h-5 mr-2" />
              Automated Testing
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-white font-semibold">Test Conversation Flow</h3>
                <p className="text-gray-400 text-sm">
                  Simulate customer interactions with your chatbot
                </p>
              </div>
              <Button
                onClick={runChatbotTest}
                disabled={isTestingActive}
                className="bg-orange-500 hover:bg-orange-600 text-white"
              >
                {isTestingActive ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Testing...
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 mr-2" />
                    Run Test
                  </>
                )}
              </Button>
            </div>

            {/* Test Messages */}
            <div className="space-y-2">
              <h4 className="text-gray-300 font-medium">Test Messages:</h4>
              {testConfig.testMessages.map((message, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <span className="text-gray-500 text-sm">{index + 1}.</span>
                  <span className="text-gray-300 text-sm">{message}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card className="bg-green-500/10 border-green-500/30 mt-6">
          <CardContent className="p-6">
            <h3 className="text-green-400 font-semibold mb-3">
              ✅ Ready for Production Deployment?
            </h3>
            <div className="space-y-2 text-green-300 text-sm">
              <p>• Test your chatbot thoroughly in this environment</p>
              <p>• Verify all integrations work as expected</p>
              <p>• Try different client configurations</p>
              <p>• Once satisfied, we'll set up your DNS and server</p>
            </div>
            <Button className="bg-green-500 hover:bg-green-600 text-white mt-4">
              Ready to Deploy to Production
            </Button>
          </CardContent>
        </Card>

      </div>
    </div>
  )
}
