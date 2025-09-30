/**
 * Features page for Tintbot.ai Platform
 * Showcases all platform capabilities and benefits
 */

import { Link } from 'react-router'
import { Bot, Car, Calendar, MessageCircle, BarChart3, TrendingUp, Phone, Mail, MapPin, ArrowRight, Check } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'

export default function Features() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Navigation */}
      <nav className="bg-slate-900/80 backdrop-blur-md border-b border-slate-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Bot className="h-8 w-8 text-orange-500 mr-2" />
              <span className="text-white text-xl font-bold">Tintbot.ai</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-white hover:text-orange-400 transition-colors">
                Home
              </Link>
              <Link to="/features" className="text-orange-400 font-semibold">
                Features
              </Link>
              <Link to="/demo" className="text-white hover:text-orange-400 transition-colors">
                Demo
              </Link>
              <Link to="/pricing" className="text-white hover:text-orange-400 transition-colors">
                Pricing
              </Link>
            </div>
            <Link to="/demo">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                Try Demo
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-orange-500/20 text-orange-300 border border-orange-500/30 mb-6">
            <Bot className="w-4 h-4 mr-2" />
            Tintbot.ai Complete Platform
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Every Tool Your Tint Shop Needs
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            From lead qualification to social media automation - Tintbot.ai's AI platform handles everything so you can focus on what you do best: installing premium tints.
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Feature 1: AI Lead Qualification Bot */}
            <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700 hover:bg-slate-800/70 transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center mb-4">
                  <Bot className="h-6 w-6 text-orange-400" />
                </div>
                <CardTitle className="text-white">AI Lead Qualification Bot</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">
                  Smart chatbot that understands tint terminology and qualifies leads 24/7
                </p>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li className="flex items-start">
                    <Check className="h-4 w-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                    Asks about vehicle type, year, and specific tint needs
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 w-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                    Explains ceramic vs. carbon film differences
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 w-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                    Provides instant pricing estimates
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 w-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                    Collects contact information only from qualified leads
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 w-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                    Integrates with your existing website forms
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Feature 2: Virtual Tint Preview */}
            <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700 hover:bg-slate-800/70 transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
                  <Car className="h-6 w-6 text-blue-400" />
                </div>
                <CardTitle className="text-white">Virtual Tint Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">
                  AI-powered visual tool showing customers exactly how their car will look
                </p>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li className="flex items-start">
                    <Check className="h-4 w-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                    Upload any car photo for instant tint simulation
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 w-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                    Compare 20%, 35%, 50%, and 70% tint levels
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 w-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                    Show ceramic vs. standard film differences
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 w-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                    Generate before/after comparison images
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 w-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                    Create shareable social media content
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Feature 3: Smart Booking System */}
            <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700 hover:bg-slate-800/70 transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-4">
                  <Calendar className="h-6 w-6 text-green-400" />
                </div>
                <CardTitle className="text-white">Smart Booking System</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">
                  Automated appointment scheduling with calendar integration
                </p>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li className="flex items-start">
                    <Check className="h-4 w-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                    Real-time availability checking
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 w-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                    Automatic booking confirmations
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 w-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                    SMS and email reminders
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 w-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                    Reschedule/cancel automation
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 w-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                    Sync with Google Calendar, Outlook, or Calendly
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Feature 4: Follow-up Automation */}
            <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700 hover:bg-slate-800/70 transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
                  <MessageCircle className="h-6 w-6 text-purple-400" />
                </div>
                <CardTitle className="text-white">Follow-up Automation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">
                  Nurture leads and maintain customer relationships automatically
                </p>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li className="flex items-start">
                    <Check className="h-4 w-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                    Automatic follow-up sequences for quotes
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 w-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                    Post-service review requests
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 w-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                    Seasonal promotion campaigns
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 w-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                    Referral program automation
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 w-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                    Customer retention messaging
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Feature 5: Social Media Automation */}
            <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700 hover:bg-slate-800/70 transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-pink-500/20 rounded-lg flex items-center justify-center mb-4">
                  <BarChart3 className="h-6 w-6 text-pink-400" />
                </div>
                <CardTitle className="text-white">Social Media Automation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">
                  Turn every completed job into marketing content
                </p>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li className="flex items-start">
                    <Check className="h-4 w-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                    Auto-generate before/after posts
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 w-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                    Create customer testimonial graphics
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 w-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                    Schedule educational content about tinting
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 w-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                    Promote special offers and seasonal deals
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 w-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                    Cross-platform posting (Facebook, Instagram, Google)
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Feature 6: Analytics Dashboard */}
            <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700 hover:bg-slate-800/70 transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-yellow-400" />
                </div>
                <CardTitle className="text-white">Analytics Dashboard</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">
                  Track performance and optimize your tint business operations
                </p>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li className="flex items-start">
                    <Check className="h-4 w-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                    Lead source tracking and ROI analysis
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 w-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                    Conversion rate optimization insights
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 w-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                    Customer satisfaction metrics
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 w-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                    Booking trends and seasonal patterns
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 w-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                    Revenue impact reporting
                  </li>
                </ul>
              </CardContent>
            </Card>

          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Why Tintbot.ai Works for Tint Shops
            </h2>
            <p className="text-xl text-gray-300">
              Built specifically for window tint professionals, by professionals
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">
                Before Tintbot.ai
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start text-gray-300">
                  <div className="w-2 h-2 bg-red-500 rounded-full mr-3 mt-2"></div>
                  Spending 3+ hours daily on unqualified phone calls
                </li>
                <li className="flex items-start text-gray-300">
                  <div className="w-2 h-2 bg-red-500 rounded-full mr-3 mt-2"></div>
                  Explaining basic tint differences over and over
                </li>
                <li className="flex items-start text-gray-300">
                  <div className="w-2 h-2 bg-red-500 rounded-full mr-3 mt-2"></div>
                  Missing leads because you're in the bay working
                </li>
                <li className="flex items-start text-gray-300">
                  <div className="w-2 h-2 bg-red-500 rounded-full mr-3 mt-2"></div>
                  Manually scheduling appointments and sending reminders
                </li>
                <li className="flex items-start text-gray-300">
                  <div className="w-2 h-2 bg-red-500 rounded-full mr-3 mt-2"></div>
                  Struggling to keep up with social media marketing
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">
                With Tintbot.ai
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start text-gray-300">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2"></div>
                  AI handles 80% of lead qualification automatically
                </li>
                <li className="flex items-start text-gray-300">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2"></div>
                  Customers get instant answers about tint options
                </li>
                <li className="flex items-start text-gray-300">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2"></div>
                  Never miss a lead - AI works 24/7
                </li>
                <li className="flex items-start text-gray-300">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2"></div>
                  Automatic booking and follow-up sequences
                </li>
                <li className="flex items-start text-gray-300">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2"></div>
                  Social media runs itself with auto-generated content
                </li>
              </ul>
            </div>
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
            Join hundreds of tint shops using Tintbot.ai to automate lead qualification, booking, and marketing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/demo">
              <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg">
                Try Interactive Demo
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/pricing">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-slate-900 px-8 py-4 text-lg">
                See Pricing Plans
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-700 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Bot className="h-8 w-8 text-orange-500 mr-2" />
                <span className="text-white text-xl font-bold">Tintbot.ai</span>
              </div>
              <p className="text-gray-400">
                AI-powered platform built specifically for window tint professionals.
              </p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li><Link to="/features" className="text-gray-400 hover:text-white">Features</Link></li>
                <li><Link to="/demo" className="text-gray-400 hover:text-white">Demo</Link></li>
                <li><Link to="/pricing" className="text-gray-400 hover:text-white">Pricing</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><Link to="/about" className="text-gray-400 hover:text-white">About Tintbot.ai</Link></li>
                <li><Link to="/contact" className="text-gray-400 hover:text-white">Contact</Link></li>
                <li><Link to="/support" className="text-gray-400 hover:text-white">Support</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Contact</h3>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-400">
                  <Phone className="h-4 w-4 mr-2" />
                  <span>+1 (208) 555-TINT</span>
                </li>
                <li className="flex items-center text-gray-400">
                  <Mail className="h-4 w-4 mr-2" />
                  <span>hello@tintbot.ai</span>
                </li>
                <li className="flex items-center text-gray-400">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>Boise, ID</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-700 mt-8 pt-8 text-center text-gray-400">
            <p>© 2024 TGS208 LLC. Tintbot.ai is a product of TGS208 LLC. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
