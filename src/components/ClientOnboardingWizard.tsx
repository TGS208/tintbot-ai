/**
 * Client Onboarding Wizard for White Label Platform
 * Handles website analysis, feature selection, and deployment
 */

import { useState } from 'react'
import { ArrowLeft, ArrowRight, Globe, Bot, Calendar, Share2, BarChart3, CheckCircle } from 'lucide-react'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

interface OnboardingData {
  businessInfo: {
    name: string
    website: string
    phone: string
    location: string
    businessType: string
  }
  websiteAnalysis: {
    hasContactForm: boolean
    hasScheduling: boolean
    hasSocialMedia: boolean
    hasReviews: boolean
    trafficSources: string[]
    currentConversion: number
  }
  desiredFeatures: {
    aiChat: boolean
    scheduling: boolean
    socialMedia: boolean
    analytics: boolean
    emailAutomation: boolean
    smsNotifications: boolean
    reviewRequests: boolean
    leadScoring: boolean
  }
  customization: {
    primaryColor: string
    logo: string
    chatbotName: string
    greeting: string
  }
  subscription: 'starter' | 'pro' | 'enterprise'
}

export default function ClientOnboardingWizard() {
  const [currentStep, setCurrentStep] = useState(1)
  const [onboardingData, setOnboardingData] = useState<OnboardingData>({
    businessInfo: {
      name: '',
      website: '',
      phone: '',
      location: '',
      businessType: 'window-tinting'
    },
    websiteAnalysis: {
      hasContactForm: false,
      hasScheduling: false,
      hasSocialMedia: false,
      hasReviews: false,
      trafficSources: [],
      currentConversion: 0
    },
    desiredFeatures: {
      aiChat: true,
      scheduling: true,
      socialMedia: false,
      analytics: true,
      emailAutomation: true,
      smsNotifications: false,
      reviewRequests: false,
      leadScoring: true
    },
    customization: {
      primaryColor: '#FF6B35',
      logo: '',
      chatbotName: 'TintBot',
      greeting: 'Hi! I can help you get a quote for window tinting.'
    },
    subscription: 'pro'
  })

  const steps = [
    { title: 'Business Information', icon: Globe },
    { title: 'Website Analysis', icon: BarChart3 },
    { title: 'Feature Selection', icon: Bot },
    { title: 'Customization', icon: Share2 },
    { title: 'Deployment', icon: CheckCircle }
  ]

  const updateData = (section: keyof OnboardingData, data: any) => {
    setOnboardingData(prev => ({
      ...prev,
      [section]: { ...prev[section], ...data }
    }))
  }

  const analyzeWebsite = async (url: string) => {
    // Simulate website analysis
    setTimeout(() => {
      updateData('websiteAnalysis', {
        hasContactForm: true,
        hasScheduling: false,
        hasSocialMedia: true,
        hasReviews: false,
        trafficSources: ['Google Search', 'Facebook', 'Direct'],
        currentConversion: 12
      })
    }, 2000)
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white font-medium mb-2">Business Name</label>
                <input
                  type="text"
                  value={onboardingData.businessInfo.name}
                  onChange={(e) => updateData('businessInfo', { name: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white"
                  placeholder="Elite Tint & Graphics"
                />
              </div>
              <div>
                <label className="block text-white font-medium mb-2">Website URL</label>
                <input
                  type="url"
                  value={onboardingData.businessInfo.website}
                  onChange={(e) => updateData('businessInfo', { website: e.target.value })}
                  onBlur={(e) => analyzeWebsite(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white"
                  placeholder="https://elitetint.com"
                />
              </div>
              <div>
                <label className="block text-white font-medium mb-2">Phone Number</label>
                <input
                  type="tel"
                  value={onboardingData.businessInfo.phone}
                  onChange={(e) => updateData('businessInfo', { phone: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white"
                  placeholder="(555) 123-4567"
                />
              </div>
              <div>
                <label className="block text-white font-medium mb-2">Location</label>
                <input
                  type="text"
                  value={onboardingData.businessInfo.location}
                  onChange={(e) => updateData('businessInfo', { location: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white"
                  placeholder="Boise, ID"
                />
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="bg-slate-700/50 p-6 rounded-lg">
              <h3 className="text-white font-semibold mb-4">Website Analysis Results</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Contact Form</span>
                    <span className={`px-2 py-1 rounded text-sm ${
                      onboardingData.websiteAnalysis.hasContactForm 
                        ? 'bg-green-500/20 text-green-400' 
                        : 'bg-red-500/20 text-red-400'
                    }`}>
                      {onboardingData.websiteAnalysis.hasContactForm ? 'Found' : 'Missing'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Online Scheduling</span>
                    <span className={`px-2 py-1 rounded text-sm ${
                      onboardingData.websiteAnalysis.hasScheduling 
                        ? 'bg-green-500/20 text-green-400' 
                        : 'bg-red-500/20 text-red-400'
                    }`}>
                      {onboardingData.websiteAnalysis.hasScheduling ? 'Found' : 'Missing'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Social Media Links</span>
                    <span className={`px-2 py-1 rounded text-sm ${
                      onboardingData.websiteAnalysis.hasSocialMedia 
                        ? 'bg-green-500/20 text-green-400' 
                        : 'bg-red-500/20 text-red-400'
                    }`}>
                      {onboardingData.websiteAnalysis.hasSocialMedia ? 'Found' : 'Missing'}
                    </span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <span className="text-gray-300 block mb-2">Traffic Sources</span>
                    <div className="flex flex-wrap gap-2">
                      {onboardingData.websiteAnalysis.trafficSources.map((source) => (
                        <span key={source} className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-sm">
                          {source}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-300 block">Current Conversion Rate</span>
                    <span className="text-2xl font-bold text-orange-400">
                      {onboardingData.websiteAnalysis.currentConversion}%
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
              <h4 className="text-blue-400 font-semibold mb-2">Optimization Recommendations</h4>
              <ul className="text-blue-300 space-y-1 text-sm">
                <li>• Replace generic contact form with AI qualification bot</li>
                <li>• Add automated scheduling integration</li>
                <li>• Implement lead nurturing workflows</li>
                <li>• Set up social media automation</li>
              </ul>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-white font-semibold mb-4">Core Features</h3>
                <div className="space-y-3">
                  {[
                    { key: 'aiChat', label: 'AI Lead Qualification Bot', desc: 'Replace forms with intelligent chat' },
                    { key: 'scheduling', label: 'Automated Scheduling', desc: 'Calendar integration and booking' },
                    { key: 'analytics', label: 'Analytics Dashboard', desc: 'Track performance and ROI' },
                    { key: 'leadScoring', label: 'Lead Scoring System', desc: 'Prioritize high-quality leads' }
                  ].map((feature) => (
                    <label key={feature.key} className="flex items-start space-x-3 p-3 bg-slate-700/50 rounded-lg cursor-pointer">
                      <input
                        type="checkbox"
                        checked={onboardingData.desiredFeatures[feature.key as keyof typeof onboardingData.desiredFeatures]}
                        onChange={(e) => updateData('desiredFeatures', { [feature.key]: e.target.checked })}
                        className="mt-1"
                      />
                      <div>
                        <div className="text-white font-medium">{feature.label}</div>
                        <div className="text-gray-400 text-sm">{feature.desc}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-4">Automation Features</h3>
                <div className="space-y-3">
                  {[
                    { key: 'emailAutomation', label: 'Email Follow-ups', desc: 'Automated email sequences' },
                    { key: 'smsNotifications', label: 'SMS Notifications', desc: 'Text message alerts and reminders' },
                    { key: 'socialMedia', label: 'Social Media Posting', desc: 'Auto-generate and schedule posts' },
                    { key: 'reviewRequests', label: 'Review Requests', desc: 'Automated review collection' }
                  ].map((feature) => (
                    <label key={feature.key} className="flex items-start space-x-3 p-3 bg-slate-700/50 rounded-lg cursor-pointer">
                      <input
                        type="checkbox"
                        checked={onboardingData.desiredFeatures[feature.key as keyof typeof onboardingData.desiredFeatures]}
                        onChange={(e) => updateData('desiredFeatures', { [feature.key]: e.target.checked })}
                        className="mt-1"
                      />
                      <div>
                        <div className="text-white font-medium">{feature.label}</div>
                        <div className="text-gray-400 text-sm">{feature.desc}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-white font-semibold mb-4">Branding</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-white font-medium mb-2">Primary Color</label>
                    <div className="flex items-center space-x-3">
                      <input
                        type="color"
                        value={onboardingData.customization.primaryColor}
                        onChange={(e) => updateData('customization', { primaryColor: e.target.value })}
                        className="w-12 h-10 rounded border border-slate-600"
                      />
                      <span className="text-gray-300">{onboardingData.customization.primaryColor}</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-white font-medium mb-2">Chatbot Name</label>
                    <input
                      type="text"
                      value={onboardingData.customization.chatbotName}
                      onChange={(e) => updateData('customization', { chatbotName: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white"
                      placeholder="TintBot"
                    />
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-4">Chat Configuration</h3>
                <div>
                  <label className="block text-white font-medium mb-2">Greeting Message</label>
                  <textarea
                    value={onboardingData.customization.greeting}
                    onChange={(e) => updateData('customization', { greeting: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white h-24"
                    placeholder="Hi! I can help you get a quote for window tinting."
                  />
                </div>
              </div>
            </div>
          </div>
        )

      case 5:
        return (
          <div className="space-y-6 text-center">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8 text-green-400" />
            </div>
            <h3 className="text-2xl font-bold text-white">Ready to Deploy!</h3>
            <p className="text-gray-300">
              Your Tintbot.ai system is configured and ready to launch for {onboardingData.businessInfo.name}.
            </p>
            <div className="bg-slate-700/50 p-6 rounded-lg text-left max-w-md mx-auto">
              <h4 className="text-white font-semibold mb-3">Deployment Summary</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Business:</span>
                  <span className="text-white">{onboardingData.businessInfo.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Domain:</span>
                  <span className="text-white">{onboardingData.businessInfo.name.toLowerCase().replace(/\s+/g, '')}.tintbot.ai</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Features:</span>
                  <span className="text-white">{Object.values(onboardingData.desiredFeatures).filter(Boolean).length} enabled</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Subscription:</span>
                  <span className="text-white capitalize">{onboardingData.subscription}</span>
                </div>
              </div>
            </div>
            <Button className="bg-green-500 hover:bg-green-600 text-white px-8 py-3">
              Deploy Now
            </Button>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-6">
      <div className="max-w-4xl mx-auto">
        
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-white">Client Onboarding</h1>
            <div className="flex items-center space-x-2">
              {steps.map((step, index) => {
                const Icon = step.icon
                return (
                  <div key={index} className="flex items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      index + 1 <= currentStep ? 'bg-orange-500' : 'bg-slate-700'
                    }`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    {index < steps.length - 1 && (
                      <div className={`w-8 h-0.5 ${
                        index + 1 < currentStep ? 'bg-orange-500' : 'bg-slate-700'
                      }`}></div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-2">
            <div 
              className="bg-orange-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / steps.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Step Content */}
        <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">
              {steps[currentStep - 1]?.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {renderStep()}

            {/* Navigation */}
            <div className="flex justify-between mt-8">
              <Button
                onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                disabled={currentStep === 1}
                variant="outline"
                className="border-slate-600 text-white"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>
              <Button
                onClick={() => setCurrentStep(Math.min(steps.length, currentStep + 1))}
                disabled={currentStep === steps.length}
                className="bg-orange-500 hover:bg-orange-600 text-white"
              >
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
