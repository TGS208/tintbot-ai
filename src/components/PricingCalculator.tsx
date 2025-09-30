/**
 * Advanced ROI Calculator component for Tintbot.ai
 * Calculates detailed ROI based on shop metrics
 */

import { useState } from 'react'
import { Calculator, TrendingUp, Clock, Users, DollarSign } from 'lucide-react'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

interface ROIData {
  timesSaved: number
  leadsFiltered: number
  bookingIncrease: number
  monthlySavings: number
  yearlyROI: number
}

export default function PricingCalculator() {
  const [formData, setFormData] = useState({
    shopName: '',
    monthlyLeads: '',
    avgJobValue: '',
    hourlyRate: '',
    bookingRate: '',
    employeeCount: ''
  })

  const [results, setResults] = useState<ROIData | null>(null)
  const [showResults, setShowResults] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const calculateROI = () => {
    const leads = parseInt(formData.monthlyLeads) || 0
    const jobValue = parseInt(formData.avgJobValue) || 0
    const hourlyRate = parseInt(formData.hourlyRate) || 0
    const bookingRate = parseInt(formData.bookingRate) || 0
    const employees = parseInt(formData.employeeCount) || 1

    if (!formData.shopName || !leads) {
      alert('Please fill in your shop name and monthly leads to continue.')
      return
    }

    // Advanced ROI calculations
    const timesSaved = Math.round((leads * 0.35) / 4) * employees // Time saved per week
    const leadsFiltered = Math.round(leads * 0.65) // Unqualified leads filtered out
    const bookingIncrease = Math.min(40, Math.round(bookingRate * 0.4)) // Max 40% increase
    const additionalJobs = Math.round(leads * (bookingIncrease / 100))
    
    // Calculate monthly savings
    const timeCostSavings = timesSaved * 4 * hourlyRate // Weekly time saved × 4 weeks
    const additionalRevenue = additionalJobs * jobValue * 0.8 // 80% of additional job value
    const monthlySavings = Math.round(timeCostSavings + additionalRevenue)
    
    // Calculate yearly ROI based on Growing Shop plan ($249/month)
    const yearlyCost = 249 * 12
    const yearlySavings = monthlySavings * 12
    const yearlyROI = Math.round(((yearlySavings - yearlyCost) / yearlyCost) * 100)

    const roiData: ROIData = {
      timesSaved,
      leadsFiltered,
      bookingIncrease,
      monthlySavings,
      yearlyROI
    }

    setResults(roiData)
    setShowResults(true)
  }

  const resetCalculator = () => {
    setFormData({
      shopName: '',
      monthlyLeads: '',
      avgJobValue: '',
      hourlyRate: '',
      bookingRate: '',
      employeeCount: ''
    })
    setResults(null)
    setShowResults(false)
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
        {!showResults ? (
          <>
            <CardHeader>
              <CardTitle className="text-white text-center flex items-center justify-center">
                <Calculator className="w-6 h-6 mr-2" />
                Calculate Your Tintbot.ai ROI
              </CardTitle>
              <p className="text-gray-300 text-center">
                Enter your shop details to see personalized savings projections
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white font-medium mb-2">Shop Name</label>
                  <input
                    type="text"
                    value={formData.shopName}
                    onChange={(e) => handleInputChange('shopName', e.target.value)}
                    placeholder="Elite Tint & Graphics"
                    className="w-full px-4 py-3 rounded-lg bg-slate-700 border border-slate-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-white font-medium mb-2">Monthly Leads</label>
                  <input
                    type="number"
                    value={formData.monthlyLeads}
                    onChange={(e) => handleInputChange('monthlyLeads', e.target.value)}
                    placeholder="150"
                    className="w-full px-4 py-3 rounded-lg bg-slate-700 border border-slate-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-white font-medium mb-2">Average Job Value ($)</label>
                  <input
                    type="number"
                    value={formData.avgJobValue}
                    onChange={(e) => handleInputChange('avgJobValue', e.target.value)}
                    placeholder="450"
                    className="w-full px-4 py-3 rounded-lg bg-slate-700 border border-slate-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-white font-medium mb-2">Staff Hourly Rate ($)</label>
                  <input
                    type="number"
                    value={formData.hourlyRate}
                    onChange={(e) => handleInputChange('hourlyRate', e.target.value)}
                    placeholder="25"
                    className="w-full px-4 py-3 rounded-lg bg-slate-700 border border-slate-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-white font-medium mb-2">Current Booking Rate (%)</label>
                  <select
                    value={formData.bookingRate}
                    onChange={(e) => handleInputChange('bookingRate', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-slate-700 border border-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="">Select booking rate</option>
                    <option value="15">15% - Struggling with lead quality</option>
                    <option value="25">25% - Average performance</option>
                    <option value="35">35% - Good conversion</option>
                    <option value="45">45% - Excellent performance</option>
                  </select>
                </div>
                <div>
                  <label className="block text-white font-medium mb-2">Number of Employees</label>
                  <input
                    type="number"
                    value={formData.employeeCount}
                    onChange={(e) => handleInputChange('employeeCount', e.target.value)}
                    placeholder="3"
                    className="w-full px-4 py-3 rounded-lg bg-slate-700 border border-slate-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>

              <Button 
                onClick={calculateROI}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 text-lg"
              >
                Calculate My ROI
                <TrendingUp className="ml-2 h-5 w-5" />
              </Button>
            </CardContent>
          </>
        ) : (
          <>
            <CardHeader>
              <div className="text-center">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-500/20 text-green-300 border border-green-500/30 mb-4">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  ROI Analysis Complete
                </div>
                <h3 className="text-3xl font-bold text-white mb-2">
                  {formData.shopName}'s Projected Savings
                </h3>
                <div className="text-4xl font-bold text-orange-400 mb-2">
                  ${results?.monthlySavings.toLocaleString()}/month
                </div>
                <p className="text-gray-300">
                  Here's what Tintbot.ai can do for your business:
                </p>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-slate-700/50 rounded-lg p-6 text-center">
                  <Clock className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                  <div className="text-2xl font-bold text-blue-400 mb-1">
                    {results?.timesSaved} hrs/week
                  </div>
                  <div className="text-sm text-gray-400">Time Saved</div>
                  <div className="text-xs text-gray-500 mt-1">
                    ${((results?.timesSaved || 0) * 4 * parseInt(formData.hourlyRate || '0')).toLocaleString()}/month value
                  </div>
                </div>

                <div className="bg-slate-700/50 rounded-lg p-6 text-center">
                  <Users className="w-8 h-8 text-green-400 mx-auto mb-3" />
                  <div className="text-2xl font-bold text-green-400 mb-1">
                    {results?.leadsFiltered}
                  </div>
                  <div className="text-sm text-gray-400">Bad Leads Filtered</div>
                  <div className="text-xs text-gray-500 mt-1">
                    65% of unqualified leads stopped
                  </div>
                </div>

                <div className="bg-slate-700/50 rounded-lg p-6 text-center">
                  <TrendingUp className="w-8 h-8 text-orange-400 mx-auto mb-3" />
                  <div className="text-2xl font-bold text-orange-400 mb-1">
                    +{results?.bookingIncrease}%
                  </div>
                  <div className="text-sm text-gray-400">Booking Rate</div>
                  <div className="text-xs text-gray-500 mt-1">
                    From {formData.bookingRate}% to {parseInt(formData.bookingRate || '0') + (results?.bookingIncrease || 0)}%
                  </div>
                </div>

                <div className="bg-slate-700/50 rounded-lg p-6 text-center">
                  <DollarSign className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                  <div className="text-2xl font-bold text-purple-400 mb-1">
                    {results?.yearlyROI}%
                  </div>
                  <div className="text-sm text-gray-400">Yearly ROI</div>
                  <div className="text-xs text-gray-500 mt-1">
                    Return on investment
                  </div>
                </div>
              </div>

              <div className="bg-slate-700/30 rounded-lg p-6 mb-6">
                <h4 className="text-white font-semibold mb-4">Detailed Breakdown:</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-gray-400">Monthly Time Savings Value:</div>
                    <div className="text-white font-semibold">
                      ${((results?.timesSaved || 0) * 4 * parseInt(formData.hourlyRate || '0')).toLocaleString()}
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-400">Additional Monthly Revenue:</div>
                    <div className="text-white font-semibold">
                      ${(results?.monthlySavings || 0) - ((results?.timesSaved || 0) * 4 * parseInt(formData.hourlyRate || '0'))}</div>
                  </div>
                  <div>
                    <div className="text-gray-400">Tintbot.ai Monthly Cost:</div>
                    <div className="text-white font-semibold">$249</div>
                  </div>
                  <div>
                    <div className="text-gray-400">Net Monthly Benefit:</div>
                    <div className="text-green-400 font-semibold">
                      ${((results?.monthlySavings || 0) - 249).toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center space-y-4">
                <h4 className="text-lg font-semibold text-white">Ready to Get Started?</h4>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3">
                    Start Free 30-Day Trial
                  </Button>
                  <Button 
                    onClick={resetCalculator}
                    variant="outline" 
                    className="border-white text-white hover:bg-white hover:text-slate-900 px-8 py-3"
                  >
                    Calculate Again
                  </Button>
                </div>
              </div>
            </CardContent>
          </>
        )}
      </Card>
    </div>
  )
}
