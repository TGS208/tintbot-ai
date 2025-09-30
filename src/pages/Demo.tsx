/**
 * Demo page showcasing Tintbot.ai platform capabilities
 * Features live AI chat, automation workflows, and ROI calculator
 */

import { useState } from 'react'
import { Link } from 'react-router'
import { ArrowLeft, Bot, Zap, Calculator, TrendingUp, MessageCircle, Calendar, Share2, DollarSign, Clock, Users, Star } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import TintBotAI from '../components/TintBotAI'
import AutomationWorkflows from '../components/AutomationWorkflows'
import PricingCalculator from '../components/PricingCalculator'

export default function Demo() {
  const [activeDemo, setActiveDemo] = useState<'ai-chat' | 'automation' | 'calculator'>('ai-chat')

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Navigation */}
      <nav className="bg-slate-900/80 backdrop-blur-md border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center">
              <ArrowLeft className="h-5 w-5 text-orange-400 mr-2" />
              <span className="text-white">Back to Home</span>
            </Link>
            <div className="flex items-center">
              <Bot className="h-8 w-8 text-orange-500 mr-2" />
              <span className="text-white text-xl font-bold">Tintbot.ai Demo</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/features">
                <Button variant="outline" className="border-orange-500 text-orange-400">
                  See All Features
                </Button>
              </Link>
              <Link to="/pricing">
                <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Experience Tintbot.ai
            <span className="text-orange-400"> Live Demo</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            See how our AI qualifies leads, automates follow-ups, and saves tint shops 12+ hours per week
          </p>
          
          {/* Demo Selector */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              onClick={() => setActiveDemo('ai-chat')}
              className={activeDemo === 'ai-chat' ? 'bg-orange-500 hover:bg-orange-600' : 'bg-slate-700 hover:bg-slate-600'}
            >
              <Bot className="w-5 h-5 mr-2" />
              AI Chat Demo
            </Button>
            <Button 
              size="lg"
              onClick={() => setActiveDemo('automation')}
              className={activeDemo === 'automation' ? 'bg-orange-500 hover:bg-orange-600' : 'bg-slate-700 hover:bg-slate-600'}
            >
              <Zap className="w-5 h-5 mr-2" />
              Automation Demo
            </Button>
            <Button 
              size="lg"
              onClick={() => setActiveDemo('calculator')}
              className={activeDemo === 'calculator' ? 'bg-orange-500 hover:bg-orange-600' : 'bg-slate-700 hover:bg-slate-600'}
            >
              <Calculator className="w-5 h-5 mr-2" />
              ROI Calculator
            </Button>
          </div>
        </div>
      </section>

      {/* Main Demo Content */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          
          {/* AI Chat Demo */}
          {activeDemo === 'ai-chat' && (
            <div className="space-y-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-white mb-4">Try the Live AI Assistant</h2>
                <p className="text-gray-300 text-lg mb-8">
                  Chat with our AI like a real customer would. Watch how it qualifies leads and provides instant quotes.
                </p>
                
                {/* Quick Test Scenarios */}
                <div className="grid md:grid-cols-3 gap-4 mb-8">
                  <Card className="bg-slate-800/50 border-slate-700">
                    <CardContent className="p-4 text-center">
                      <MessageCircle className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                      <h3 className="text-white font-semibold mb-1">Tesla Owner</h3>
                      <p className="text-gray-400 text-sm">Ask about ceramic tint for a Tesla Model 3</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-slate-800/50 border-slate-700">
                    <CardContent className="p-4 text-center">
                      <DollarSign className="w-6 h-6 text-green-400 mx-auto mb-2" />
                      <h3 className="text-white font-semibold mb-1">Budget Shopper</h3>
                      <p className="text-gray-400 text-sm">Ask about affordable tint options</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-slate-800/50 border-slate-700">
                    <CardContent className="p-4 text-center">
                      <Calendar className="w-6 h-6 text-orange-400 mx-auto mb-2" />
                      <h3 className="text-white font-semibold mb-1">Ready to Book</h3>
                      <p className="text-gray-400 text-sm">Say you want to schedule an appointment</p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <TintBotAI />
              
              {/* AI Features Highlight */}
              <div className="grid md:grid-cols-3 gap-6 mt-12">
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <TrendingUp className="w-5 h-5 text-green-400 mr-2" />
                      Lead Scoring
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300">
                      Watch the lead quality score increase as the AI gathers more information about the customer's needs and budget.
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Bot className="w-5 h-5 text-orange-400 mr-2" />
                      Smart Responses
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300">
                      The AI understands tint terminology, legal limits, and pricing to provide accurate, helpful responses.
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Calendar className="w-5 h-5 text-blue-400 mr-2" />
                      Booking Ready
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300">
                      When a lead is qualified, the AI seamlessly transitions to booking, capturing contact information.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Automation Demo */}
          {activeDemo === 'automation' && (
            <div className="space-y-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-white mb-4">Automation Workflows</h2>
                <p className="text-gray-300 text-lg mb-8">
                  See how Tintbot.ai automatically follows up with leads, requests reviews, and generates social content.
                </p>
              </div>

              <AutomationWorkflows />
              
              {/* Automation Benefits */}
              <div className="grid md:grid-cols-4 gap-4 mt-12">
                <Card className="bg-gradient-to-r from-orange-500/20 to-red-500/20 border-orange-500/30">
                  <CardContent className="p-6 text-center">
                    <Clock className="w-8 h-8 text-orange-400 mx-auto mb-3" />
                    <div className="text-2xl font-bold text-white">12hrs</div>
                    <div className="text-sm text-gray-300">Saved Per Week</div>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-blue-500/30">
                  <CardContent className="p-6 text-center">
                    <TrendingUp className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                    <div className="text-2xl font-bold text-white">36%</div>
                    <div className="text-sm text-gray-300">Higher Conversion</div>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-r from-green-500/20 to-teal-500/20 border-green-500/30">
                  <CardContent className="p-6 text-center">
                    <Share2 className="w-8 h-8 text-green-400 mx-auto mb-3" />
                    <div className="text-2xl font-bold text-white">4x</div>
                    <div className="text-sm text-gray-300">More Social Content</div>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-500/30">
                  <CardContent className="p-6 text-center">
                    <Users className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                    <div className="text-2xl font-bold text-white">89%</div>
                    <div className="text-sm text-gray-300">Customer Satisfaction</div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* ROI Calculator */}
          {activeDemo === 'calculator' && (
            <div className="space-y-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-white mb-4">ROI Calculator</h2>
                <p className="text-gray-300 text-lg mb-8">
                  Calculate your potential savings and revenue increase with Tintbot.ai
                </p>
              </div>

              <PricingCalculator />
            </div>
          )}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">What Shop Owners Say</h2>
            <p className="text-gray-300 text-lg">Real results from real tint shops</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 mb-4">
                  "The AI chat has completely transformed our lead qualification. We went from 3 hours daily on phone calls to focusing on actual installations."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white font-bold">MR</span>
                  </div>
                  <div>
                    <div className="text-white font-semibold">Mike Rodriguez</div>
                    <div className="text-gray-400 text-sm">Elite Tint & Graphics</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 mb-4">
                  "The automation workflows have boosted our booking rate by 40%. The follow-up sequences are incredibly effective."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white font-bold">SJ</span>
                  </div>
                  <div>
                    <div className="text-white font-semibold">Sarah Johnson</div>
                    <div className="text-gray-400 text-sm">Precision Tints</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 mb-4">
                  "ROI was positive within the first month. The AI handles night and weekend inquiries that we used to miss completely."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white font-bold">DK</span>
                  </div>
                  <div>
                    <div className="text-white font-semibold">David Kim</div>
                    <div className="text-gray-400 text-sm">Metro Tint Solutions</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Tint Shop?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join 200+ shops using Tintbot.ai to qualify leads, automate follow-ups, and increase revenue.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/pricing">
              <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg">
                Start Free 30-Day Trial
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-slate-900 px-8 py-4 text-lg">
              Schedule Demo Call
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
