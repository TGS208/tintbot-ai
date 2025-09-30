/**
 * Business Automation Engine for Window Tint Industry
 * Handles quotes, scheduling, social media, and industry-specific automation
 */

import { useState } from 'react'
import { Car, Calculator, Calendar, Share2, Mail, Phone, TrendingUp, MapPin } from 'lucide-react'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

interface VehicleInfo {
  year: string
  make: string
  model: string
  type: 'sedan' | 'suv' | 'truck' | 'coupe' | 'van'
  windows: number
}

interface TintService {
  filmType: 'ceramic' | 'carbon' | 'dyed' | 'crystalline'
  darkness: '20%' | '35%' | '50%' | '70%'
  coverage: 'full' | 'rear-only' | 'sides-rear' | 'custom'
  warranty: '5-year' | '10-year' | 'lifetime'
}

interface QuoteRequest {
  vehicle: VehicleInfo
  service: TintService
  location: string
  timeline: 'asap' | 'this-week' | 'next-week' | 'flexible'
  budget: 'under-300' | '300-500' | '500-800' | 'premium'
  contact: {
    name: string
    phone: string
    email: string
  }
}

export default function BusinessAutomationEngine() {
  const [activeModule, setActiveModule] = useState<'quotes' | 'scheduling' | 'social' | 'analytics'>('quotes')

  // Industry-specific data
  const vehicleDatabase = {
    sedan: { baseWindows: 4, multiplier: 1.0, examples: ['Toyota Camry', 'Honda Accord', 'BMW 3 Series'] },
    suv: { baseWindows: 6, multiplier: 1.3, examples: ['Toyota Highlander', 'Honda Pilot', 'Ford Explorer'] },
    truck: { baseWindows: 4, multiplier: 1.2, examples: ['Ford F-150', 'Chevy Silverado', 'Ram 1500'] },
    coupe: { baseWindows: 4, multiplier: 0.9, examples: ['Honda Civic Coupe', 'BMW 4 Series'] },
    van: { baseWindows: 8, multiplier: 1.5, examples: ['Honda Odyssey', 'Toyota Sienna'] }
  }

  const filmDatabase = {
    ceramic: {
      name: 'Premium Ceramic',
      basePrice: 450,
      multiplier: 1.5,
      benefits: ['99% UV protection', 'Superior heat rejection', 'No signal interference'],
      warranty: 'Lifetime'
    },
    carbon: {
      name: 'Carbon Film',
      basePrice: 350,
      multiplier: 1.2,
      benefits: ['Excellent heat rejection', 'Matte finish', 'Fade resistant'],
      warranty: '10-year'
    },
    dyed: {
      name: 'Dyed Film',
      basePrice: 250,
      multiplier: 1.0,
      benefits: ['Good privacy', 'Basic UV protection', 'Budget friendly'],
      warranty: '5-year'
    },
    crystalline: {
      name: 'Crystalline (Premium)',
      basePrice: 650,
      multiplier: 2.0,
      benefits: ['Maximum heat rejection', 'Crystal clarity', 'Nano-technology'],
      warranty: 'Lifetime'
    }
  }

  const legalLimits = {
    'Idaho': { front: '35%', side: '35%', rear: 'Any' },
    'California': { front: '70%', side: '70%', rear: 'Any' },
    'Texas': { front: '25%', side: '25%', rear: 'Any' },
    'Florida': { front: '28%', side: '15%', rear: 'Any' },
    'New York': { front: '70%', side: '70%', rear: 'Any' }
  }

  // Quote calculation engine
  const calculateQuote = (request: Partial<QuoteRequest>) => {
    if (!request.vehicle || !request.service) return null

    const vehicleData = vehicleDatabase[request.vehicle.type]
    const filmData = filmDatabase[request.service.filmType]

    let basePrice = filmData.basePrice
    let vehicleMultiplier = vehicleData.multiplier

    // Coverage adjustments
    const coverageMultiplier = {
      'full': 1.0,
      'rear-only': 0.4,
      'sides-rear': 0.7,
      'custom': 0.8
    }[request.service.coverage] || 1.0

    // Calculate final price
    const totalPrice = Math.round(basePrice * vehicleMultiplier * coverageMultiplier)
    const priceRange = {
      low: Math.round(totalPrice * 0.9),
      high: Math.round(totalPrice * 1.1)
    }

    return {
      basePrice: totalPrice,
      priceRange,
      filmType: filmData.name,
      warranty: filmData.warranty,
      benefits: filmData.benefits,
      installTime: `${vehicleData.baseWindows * 45} minutes`,
      legalCompliance: request.location ? legalLimits[request.location as keyof typeof legalLimits] : null
    }
  }

  // Social media content generator
  const generateSocialContent = (completedJob: any) => {
    const templates = [
      {
        platform: 'Instagram',
        content: `Another beautiful ${completedJob.vehicle} with our premium ${completedJob.filmType} tint! 🚗✨\n\n✅ ${completedJob.coverage} coverage\n✅ ${completedJob.warranty} warranty\n✅ Professional installation\n\n#WindowTint #${completedJob.location}Tint #CarCare #TintLife`,
        hashtags: ['#WindowTint', '#CarCare', '#TintLife', `#${completedJob.location}Tint`]
      },
      {
        platform: 'Facebook',
        content: `🎉 Just completed another satisfied customer's ${completedJob.vehicle}!\n\nOur ${completedJob.filmType} provides excellent heat rejection and UV protection. Book your appointment today and see the difference professional tinting makes!\n\n📞 Call us or visit our website to schedule.\n\n#QualityTinting #${completedJob.location}Business`
      },
      {
        platform: 'Google My Business',
        content: `Professional window tinting service completed on ${completedJob.vehicle}. ${completedJob.filmType} with ${completedJob.warranty} warranty. Quality installation guaranteed.`
      }
    ]
    return templates
  }

  const renderQuoteModule = () => (
    <div className="space-y-6">
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Calculator className="w-5 h-5 mr-2" />
            Intelligent Quote Generator
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            
            {/* Vehicle Selection */}
            <div>
              <h3 className="text-white font-semibold mb-3">Vehicle Information</h3>
              <div className="space-y-3">
                <select className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded text-white">
                  <option value="">Select Vehicle Type</option>
                  {Object.entries(vehicleDatabase).map(([type, data]) => (
                    <option key={type} value={type}>
                      {type.charAt(0).toUpperCase() + type.slice(1)} ({data.baseWindows} windows)
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  placeholder="Year Make Model (e.g., 2023 Toyota Camry)"
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded text-white"
                />
              </div>
            </div>

            {/* Service Selection */}
            <div>
              <h3 className="text-white font-semibold mb-3">Tint Service</h3>
              <div className="space-y-3">
                <select className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded text-white">
                  <option value="">Select Film Type</option>
                  {Object.entries(filmDatabase).map(([type, data]) => (
                    <option key={type} value={type}>
                      {data.name} - Starting at ${data.basePrice}
                    </option>
                  ))}
                </select>
                <select className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded text-white">
                  <option value="">Coverage Area</option>
                  <option value="full">All Windows</option>
                  <option value="rear-only">Rear Windows Only</option>
                  <option value="sides-rear">Sides + Rear</option>
                  <option value="custom">Custom Selection</option>
                </select>
              </div>
            </div>
          </div>

          {/* Sample Quote Display */}
          <div className="mt-6 p-4 bg-slate-700/50 rounded-lg">
            <h4 className="text-orange-400 font-semibold mb-3">Sample Quote - 2023 Toyota Camry</h4>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <span className="text-gray-400 block">Premium Ceramic Tint</span>
                <span className="text-2xl font-bold text-green-400">$525 - $575</span>
              </div>
              <div>
                <span className="text-gray-400 block">Installation Time</span>
                <span className="text-white font-semibold">3 hours</span>
              </div>
              <div>
                <span className="text-gray-400 block">Warranty</span>
                <span className="text-white font-semibold">Lifetime</span>
              </div>
            </div>
            <div className="mt-3 text-sm text-gray-400">
              Includes: 99% UV protection, superior heat rejection, no signal interference
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Legal Compliance Checker */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <MapPin className="w-5 h-5 mr-2" />
            Legal Compliance Checker
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <select className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded text-white">
                <option value="">Select State</option>
                {Object.keys(legalLimits).map((state) => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>
            <div className="bg-blue-500/10 border border-blue-500/30 p-3 rounded">
              <div className="text-blue-400 font-semibold mb-1">Idaho Tint Laws</div>
              <div className="text-sm text-blue-300">
                Front: 35% minimum • Side: 35% minimum • Rear: Any darkness
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderSchedulingModule = () => (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <Calendar className="w-5 h-5 mr-2" />
          Smart Scheduling System
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-white font-semibold mb-3">Booking Automation</h3>
            <div className="space-y-3">
              <div className="p-3 bg-slate-700/50 rounded-lg">
                <div className="text-green-400 font-semibold">✅ Calendar Integration</div>
                <div className="text-sm text-gray-400">Sync with Google Calendar, Outlook, or Calendly</div>
              </div>
              <div className="p-3 bg-slate-700/50 rounded-lg">
                <div className="text-green-400 font-semibold">✅ Smart Scheduling</div>
                <div className="text-sm text-gray-400">Auto-block time based on vehicle type and service</div>
              </div>
              <div className="p-3 bg-slate-700/50 rounded-lg">
                <div className="text-green-400 font-semibold">✅ Reminder System</div>
                <div className="text-sm text-gray-400">Automated SMS/email reminders</div>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-3">Appointment Types</h3>
            <div className="space-y-2">
              {[
                { type: 'Sedan Tint', duration: '3 hours', color: 'blue' },
                { type: 'SUV Tint', duration: '4 hours', color: 'green' },
                { type: 'Truck Tint', duration: '3.5 hours', color: 'orange' },
                { type: 'Consultation', duration: '30 min', color: 'purple' }
              ].map((apt) => (
                <div key={apt.type} className="flex items-center justify-between p-2 bg-slate-700/50 rounded">
                  <span className="text-white">{apt.type}</span>
                  <span className={`px-2 py-1 rounded text-xs text-${apt.color}-400 bg-${apt.color}-500/20`}>
                    {apt.duration}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  const renderSocialModule = () => (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <Share2 className="w-5 h-5 mr-2" />
          Social Media Automation
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
              <div className="text-blue-400 font-semibold mb-2">Facebook Posts</div>
              <div className="text-sm text-gray-300">Auto-generate posts with before/after photos</div>
            </div>
            <div className="p-4 bg-pink-500/10 border border-pink-500/30 rounded-lg">
              <div className="text-pink-400 font-semibold mb-2">Instagram Stories</div>
              <div className="text-sm text-gray-300">Create engaging stories and reels</div>
            </div>
            <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
              <div className="text-red-400 font-semibold mb-2">Google My Business</div>
              <div className="text-sm text-gray-300">Update business posts and photos</div>
            </div>
          </div>

          <div className="bg-slate-700/50 p-4 rounded-lg">
            <h4 className="text-white font-semibold mb-3">Sample Generated Post</h4>
            <div className="border-l-4 border-orange-500 pl-4">
              <div className="text-gray-300 text-sm italic mb-2">
                "🎉 Just completed another satisfied customer's 2023 Tesla Model 3!<br/><br/>
                Our Premium Ceramic provides excellent heat rejection and UV protection. Book your appointment today and see the difference professional tinting makes!<br/><br/>
                📞 Call us or visit our website to schedule.<br/><br/>
                #QualityTinting #BoiseBusiness #TeslaOwners"
              </div>
              <div className="flex space-x-2 text-xs">
                <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded">#WindowTint</span>
                <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded">#TeslaOwners</span>
                <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded">#BoiseTint</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  const renderAnalyticsModule = () => (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <TrendingUp className="w-5 h-5 mr-2" />
          Business Analytics Dashboard
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Monthly Revenue', value: '$12,450', change: '+23%', color: 'green' },
            { label: 'Leads Processed', value: '234', change: '+12%', color: 'blue' },
            { label: 'Conversion Rate', value: '34%', change: '+8%', color: 'orange' },
            { label: 'Avg Job Value', value: '$485', change: '+5%', color: 'purple' }
          ].map((metric) => (
            <div key={metric.label} className="p-4 bg-slate-700/50 rounded-lg">
              <div className="text-gray-400 text-sm">{metric.label}</div>
              <div className="text-xl font-bold text-white">{metric.value}</div>
              <div className={`text-sm text-${metric.color}-400`}>{metric.change} this month</div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-white font-semibold mb-3">Top Services</h4>
            <div className="space-y-2">
              {[
                { service: 'Full Ceramic Tint', jobs: 45, revenue: '$23,400' },
                { service: 'Rear-only Carbon', jobs: 32, revenue: '$8,960' },
                { service: 'SUV Premium Package', jobs: 28, revenue: '$18,200' }
              ].map((item) => (
                <div key={item.service} className="flex justify-between items-center p-2 bg-slate-700/50 rounded">
                  <div>
                    <div className="text-white font-medium">{item.service}</div>
                    <div className="text-gray-400 text-sm">{item.jobs} jobs</div>
                  </div>
                  <div className="text-green-400 font-semibold">{item.revenue}</div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Lead Sources</h4>
            <div className="space-y-2">
              {[
                { source: 'AI Chatbot', percentage: 45, leads: 105 },
                { source: 'Google Search', percentage: 30, leads: 70 },
                { source: 'Social Media', percentage: 15, leads: 35 },
                { source: 'Referrals', percentage: 10, leads: 24 }
              ].map((source) => (
                <div key={source.source} className="flex justify-between items-center p-2 bg-slate-700/50 rounded">
                  <div className="text-white">{source.source}</div>
                  <div className="flex items-center space-x-2">
                    <div className="text-gray-400 text-sm">{source.leads}</div>
                    <div className="text-orange-400 font-semibold">{source.percentage}%</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Business Automation Engine</h1>
          <p className="text-gray-400">Industry-specific automation tools for window tint businesses</p>
        </div>

        {/* Module Navigation */}
        <div className="flex space-x-1 mb-6 overflow-x-auto">
          {[
            { id: 'quotes', label: 'Quote Generator', icon: Calculator },
            { id: 'scheduling', label: 'Scheduling', icon: Calendar },
            { id: 'social', label: 'Social Media', icon: Share2 },
            { id: 'analytics', label: 'Analytics', icon: TrendingUp }
          ].map((module) => {
            const Icon = module.icon
            return (
              <Button
                key={module.id}
                onClick={() => setActiveModule(module.id as any)}
                className={`px-6 py-3 ${
                  activeModule === module.id
                    ? 'bg-orange-500 text-white'
                    : 'bg-slate-800 text-gray-400 hover:bg-slate-700'
                }`}
              >
                <Icon className="w-4 h-4 mr-2" />
                {module.label}
              </Button>
            )
          })}
        </div>

        {/* Module Content */}
        <div className="space-y-6">
          {activeModule === 'quotes' && renderQuoteModule()}
          {activeModule === 'scheduling' && renderSchedulingModule()}
          {activeModule === 'social' && renderSocialModule()}
          {activeModule === 'analytics' && renderAnalyticsModule()}
        </div>

      </div>
    </div>
  )
}
