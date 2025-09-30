/**
 * White Label Client Onboarding Component
 * Handles new client setup and configuration
 */

import { useState } from 'react'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

interface OnboardingStep {
  id: string
  title: string
  description: string
  component: React.ComponentType
}

export default function WhiteLabelOnboarding() {
  const [currentStep, setCurrentStep] = useState(0)
  const [clientData, setClientData] = useState({
    businessName: '',
    domain: '',
    branding: {
      primaryColor: '#FF6B35',
      logo: '',
      font: 'Inter'
    },
    services: [],
    pricing: [],
    location: {
      state: '',
      city: '',
      timezone: ''
    }
  })

  const onboardingSteps: OnboardingStep[] = [
    {
      id: 'business-info',
      title: 'Business Information',
      description: 'Tell us about your tint shop',
      component: BusinessInfoStep
    },
    {
      id: 'branding',
      title: 'Branding & Design',
      description: 'Customize your AI assistant appearance',
      component: BrandingStep
    },
    {
      id: 'services-pricing',
      title: 'Services & Pricing',
      description: 'Configure your tint services and pricing',
      component: ServicesPricingStep
    },
    {
      id: 'ai-training',
      title: 'AI Training',
      description: 'Train your AI with specific business knowledge',
      component: AITrainingStep
    },
    {
      id: 'integration',
      title: 'Website Integration',
      description: 'Connect to your existing website',
      component: IntegrationStep
    }
  ]

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const CurrentStepComponent = onboardingSteps[currentStep].component

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-6">
      <div className="max-w-4xl mx-auto">
        
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-2xl font-bold text-white">Setup Your Tintbot.ai</h1>
            <span className="text-gray-400">
              Step {currentStep + 1} of {onboardingSteps.length}
            </span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-2">
            <div 
              className="bg-orange-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / onboardingSteps.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Current Step */}
        <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">
              {onboardingSteps[currentStep].title}
            </CardTitle>
            <p className="text-gray-300">
              {onboardingSteps[currentStep].description}
            </p>
          </CardHeader>
          <CardContent>
            <CurrentStepComponent 
              data={clientData}
              onChange={setClientData}
            />
            
            {/* Navigation */}
            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 0}
                className="border-slate-600 text-white"
              >
                Previous
              </Button>
              <Button
                onClick={handleNext}
                className="bg-orange-500 hover:bg-orange-600 text-white"
                disabled={currentStep === onboardingSteps.length - 1}
              >
                {currentStep === onboardingSteps.length - 1 ? 'Launch' : 'Next'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// Step Components (you'll need to implement these)
function BusinessInfoStep({ data, onChange }: any) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-white font-medium mb-2">Business Name</label>
        <input
          type="text"
          value={data.businessName}
          onChange={(e) => onChange({ ...data, businessName: e.target.value })}
          className="w-full px-4 py-3 rounded-lg bg-slate-700 border border-slate-600 text-white"
          placeholder="Elite Tint & Graphics"
        />
      </div>
      <div>
        <label className="block text-white font-medium mb-2">Preferred Domain</label>
        <input
          type="text"
          value={data.domain}
          onChange={(e) => onChange({ ...data, domain: e.target.value })}
          className="w-full px-4 py-3 rounded-lg bg-slate-700 border border-slate-600 text-white"
          placeholder="elitetint"
        />
        <p className="text-gray-400 text-sm mt-1">
          Your AI will be available at: {data.domain || 'yourname'}.tintbot.ai
        </p>
      </div>
    </div>
  )
}

function BrandingStep({ data, onChange }: any) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-white font-medium mb-2">Primary Color</label>
        <input
          type="color"
          value={data.branding.primaryColor}
          onChange={(e) => onChange({ 
            ...data, 
            branding: { ...data.branding, primaryColor: e.target.value }
          })}
          className="w-20 h-10 rounded border border-slate-600"
        />
      </div>
      <div>
        <label className="block text-white font-medium mb-2">Logo Upload</label>
        <input
          type="file"
          accept="image/*"
          className="w-full px-4 py-3 rounded-lg bg-slate-700 border border-slate-600 text-white"
        />
      </div>
    </div>
  )
}

function ServicesPricingStep({ data, onChange }: any) {
  return (
    <div className="space-y-4">
      <p className="text-gray-300">Configure your tint services and pricing structure</p>
      {/* Add service/pricing configuration UI */}
    </div>
  )
}

function AITrainingStep({ data, onChange }: any) {
  return (
    <div className="space-y-4">
      <p className="text-gray-300">Customize AI responses for your specific business</p>
      {/* Add AI training interface */}
    </div>
  )
}

function IntegrationStep({ data, onChange }: any) {
  return (
    <div className="space-y-4">
      <p className="text-gray-300">Connect Tintbot.ai to your existing website</p>
      {/* Add integration options */}
    </div>
  )
}