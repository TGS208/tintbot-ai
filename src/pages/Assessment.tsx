/**
 * Business Assessment page with embedded Canva assessment
 * COMPLETE SOPHISTICATED VERSION - Advanced lead capture and premium presentation
 */

import { useState } from 'react'
import { Link } from 'react-router'
import { Bot, ArrowLeft, CheckCircle, Clock, Users, Target, ArrowRight, Sparkles, Shield, Award, TrendingUp, Zap, Eye, Star } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'

export default function Assessment() {
  const [showAssessment, setShowAssessment] = useState(false)
  const [leadCaptured, setLeadCaptured] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleStartAssessment = () => {
    setShowAssessment(true)
  }

  const handleLeadCapture = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    const formData = new FormData(e.target as HTMLFormElement)
    const leadData = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      business: formData.get('business'),
      challenges: formData.get('challenges'),
      timestamp: new Date().toISOString(),
      source: 'business-assessment'
    }

    try {
      // Primary: Submit to Netlify Forms
      const netlifyResponse = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          'form-name': 'business-assessment-leads',
          ...Object.fromEntries(Object.entries(leadData).map(([k, v]) => [k, String(v)]))
        }).toString()
      })

      // Secondary: Try custom function if available
      try {
        await fetch('/.netlify/functions/capture-lead', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(leadData)
        })
      } catch (funcError) {
        console.log('Function capture optional - using forms fallback')
      }
      
      setLeadCaptured(true)
      setShowAssessment(true)
      
      // Track conversion event
      if (typeof gtag !== 'undefined') {
        gtag('event', 'conversion', {
          event_category: 'lead_capture',
          event_label: 'business_assessment'
        })
      }
      
    } catch (error) {
      console.error('Lead capture failed:', error)
      // Still show assessment even if capture fails
      setLeadCaptured(true)
      setShowAssessment(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Premium Navigation */}
      <nav className="bg-slate-900/90 backdrop-blur-xl border-b border-slate-700/50 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-18">
            <Link to="/" className="flex items-center group">
              <ArrowLeft className="h-6 w-6 text-orange-400 mr-3 group-hover:scale-110 transition-transform" />
              <span className="text-white font-medium group-hover:text-orange-400 transition-colors">Back to Home</span>
            </Link>
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Bot className="h-10 w-10 text-orange-500 drop-shadow-lg" />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
              </div>
              <div>
                <span className="text-white text-2xl font-bold">Tintbot.ai</span>
                <div className="text-xs text-slate-400 -mt-1">Partnership Assessment</div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/demo">
                <Button variant="outline" className="border-orange-500/70 text-orange-400 hover:bg-orange-500 hover:text-white transition-all duration-200">
                  <Eye className="mr-2 w-4 h-4" />
                  See Demo
                </Button>
              </Link>
              <Link to="/pricing">
                <Button className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white">
                  <Award className="mr-2 w-4 h-4" />
                  Partnership Plans
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {!showAssessment ? (
        /* Pre-Assessment Setup - PREMIUM VERSION */
        <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 via-transparent to-blue-500/5"></div>
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          </div>
          
          <div className="max-w-5xl mx-auto relative z-10">
            <div className="text-center mb-16">
              <Badge className="mb-8 bg-gradient-to-r from-orange-500/20 to-blue-500/20 text-orange-300 border border-orange-500/30 text-lg px-6 py-3 hover:scale-105 transition-transform">
                <Target className="w-5 h-5 mr-3" />
                🎯 Free Strategic Business Assessment
              </Badge>
              
              <h1 className="text-5xl md:text-6xl font-black text-white mb-8 leading-tight">
                Discover Your Business
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-400 block">
                  Growth Potential
                </span>
              </h1>
              
              <p className="text-2xl text-gray-300 max-w-4xl mx-auto mb-12 leading-relaxed font-light">
                Get a comprehensive strategic analysis of your tint shop's current workflows and discover exactly how much time and revenue you could save with intelligent automation and business optimization.
              </p>

              <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/30 rounded-3xl p-8 mb-12">
                <h3 className="text-2xl font-bold text-white mb-6">What You'll Discover in Your Assessment</h3>
                <div className="grid md:grid-cols-2 gap-8 text-left">
                  <div>
                    <h4 className="text-orange-400 font-bold mb-4 text-lg">📊 Current State Analysis</h4>
                    <ul className="text-gray-300 space-y-2">
                      <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-400 mr-2" /> Time spent on manual processes</li>
                      <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-400 mr-2" /> Lead conversion efficiency gaps</li>
                      <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-400 mr-2" /> Customer communication bottlenecks</li>
                      <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-400 mr-2" /> Revenue optimization opportunities</li>
                      <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-400 mr-2" /> Competitive positioning analysis</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-blue-400 font-bold mb-4 text-lg">🚀 Strategic Growth Roadmap</h4>
                    <ul className="text-gray-300 space-y-2">
                      <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-400 mr-2" /> Automation ROI projections</li>
                      <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-400 mr-2" /> Market domination strategies</li>
                      <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-400 mr-2" /> Competitive advantage development</li>
                      <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-400 mr-2" /> Implementation timeline & priorities</li>
                      <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-400 mr-2" /> Partnership success metrics</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Premium Benefits Grid */}
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <Card className="bg-gradient-to-br from-green-500/10 to-teal-500/10 border-green-500/30 hover:border-green-400/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-green-500/20">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500/20 to-teal-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="h-10 w-10 text-green-400" />
                  </div>
                  <CardTitle className="text-white text-xl">Comprehensive Workflow Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 text-center leading-relaxed">
                    Deep-dive analysis of every business process to identify inefficiencies and discover automation opportunities that could save hours weekly and increase revenue significantly.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-500/30 hover:border-blue-400/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Clock className="h-10 w-10 text-blue-400" />
                  </div>
                  <CardTitle className="text-white text-xl">ROI & Savings Calculator</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 text-center leading-relaxed">
                    Precise calculations showing exactly how much time you spend on manual tasks, what that time is worth to your business, and projected savings with automation.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/30 hover:border-purple-400/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Users className="h-10 w-10 text-purple-400" />
                  </div>
                  <CardTitle className="text-white text-xl">Strategic Growth Roadmap</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 text-center leading-relaxed">
                    Personalized strategic roadmap showing exactly how to scale your tint shop using proven automation and optimization strategies for market leadership.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Assessment Value Proposition */}
            <Card className="bg-gradient-to-r from-orange-500/10 to-blue-500/10 border border-orange-500/30 mb-12 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 via-transparent to-blue-500/5"></div>
              <CardContent className="p-12 relative z-10">
                <div className="text-center">
                  <h3 className="text-3xl font-bold text-white mb-8">Why This Assessment is Revolutionary</h3>
                  <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-8 h-8 bg-orange-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                          <span className="text-orange-400 font-bold">1</span>
                        </div>
                        <div>
                          <h4 className="text-white font-semibold mb-2">Industry-Specific Analysis</h4>
                          <p className="text-gray-300 text-sm">Designed specifically for window tinting businesses with deep understanding of industry challenges and opportunities.</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-4">
                        <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                          <span className="text-blue-400 font-bold">2</span>
                        </div>
                        <div>
                          <h4 className="text-white font-semibold mb-2">AI-Powered Insights</h4>
                          <p className="text-gray-300 text-sm">Advanced algorithms analyze your responses against 200+ successful tint shop partnerships to provide precise recommendations.</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-4">
                        <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                          <span className="text-green-400 font-bold">3</span>
                        </div>
                        <div>
                          <h4 className="text-white font-semibold mb-2">Actionable Roadmap</h4>
                          <p className="text-gray-300 text-sm">Not just analysis - you get a step-by-step implementation plan with timeline and expected ROI for each phase.</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-slate-900/50 rounded-2xl p-6">
                      <h4 className="text-xl font-bold text-white mb-4">Assessment Guarantees</h4>
                      <div className="space-y-3">
                        <div className="flex items-center text-green-400">
                          <Shield className="w-5 h-5 mr-3" />
                          <span className="text-sm">100% Free - No hidden costs</span>
                        </div>
                        <div className="flex items-center text-blue-400">
                          <Clock className="w-5 h-5 mr-3" />
                          <span className="text-sm">Results within 24 hours</span>
                        </div>
                        <div className="flex items-center text-purple-400">
                          <Award className="w-5 h-5 mr-3" />
                          <span className="text-sm">Custom strategic recommendations</span>
                        </div>
                        <div className="flex items-center text-orange-400">
                          <Users className="w-5 h-5 mr-3" />
                          <span className="text-sm">Optional strategy consultation</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {!leadCaptured ? (
              /* Premium Lead Capture Form */
              <Card className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-xl border-slate-600/50 shadow-2xl max-w-2xl mx-auto">
                <CardHeader className="text-center pb-6">
                  <Badge className="mb-4 bg-gradient-to-r from-green-500/20 to-blue-500/20 text-green-400 border-green-500/30">
                    <Sparkles className="w-4 h-4 mr-2" />
                    Start Your Strategic Assessment
                  </Badge>
                  <CardTitle className="text-white text-2xl">Begin Your Business Transformation</CardTitle>
                  <p className="text-gray-400">Takes 5-7 minutes • Results delivered instantly • 100% confidential</p>
                </CardHeader>
                <CardContent className="pb-8">
                  <form 
                    name="business-assessment-leads" 
                    method="POST" 
                    data-netlify="true" 
                    netlify-honeypot="bot-field"
                    onSubmit={handleLeadCapture} 
                    className="space-y-6"
                  >
                    {/* Hidden form fields for Netlify */}
                    <input type="hidden" name="form-name" value="business-assessment-leads" />
                    <input type="hidden" name="bot-field" />
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Full Name *</label>
                        <input
                          type="text"
                          name="name"
                          placeholder="Your full name"
                          required
                          className="w-full px-4 py-3 rounded-xl bg-slate-700/50 border border-slate-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Business Email *</label>
                        <input
                          type="email"
                          name="email"
                          placeholder="your@business.com"
                          required
                          className="w-full px-4 py-3 rounded-xl bg-slate-700/50 border border-slate-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                        />
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number</label>
                        <input
                          type="tel"
                          name="phone"
                          placeholder="(555) 123-4567"
                          className="w-full px-4 py-3 rounded-xl bg-slate-700/50 border border-slate-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Tint Shop Name *</label>
                        <input
                          type="text"
                          name="business"
                          placeholder="Your business name"
                          required
                          className="w-full px-4 py-3 rounded-xl bg-slate-700/50 border border-slate-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Biggest Business Challenge (Optional)</label>
                      <textarea
                        name="challenges"
                        placeholder="What's your biggest challenge in growing your tint shop? (This helps us provide more targeted recommendations)"
                        rows={4}
                        className="w-full px-4 py-3 rounded-xl bg-slate-700/50 border border-slate-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all resize-none"
                      />
                    </div>
                    <div className="text-center">
                      <Button 
                        type="submit" 
                        size="lg" 
                        className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white px-10 py-4 text-lg font-semibold shadow-2xl hover:shadow-orange-500/25 transition-all duration-300 hover:scale-105"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                            Processing Assessment...
                          </>
                        ) : (
                          <>
                            <Target className="mr-3 w-5 h-5" />
                            Start Strategic Assessment
                            <Sparkles className="ml-3 w-5 h-5" />
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                  <div className="mt-6 text-center">
                    <p className="text-xs text-gray-400 leading-relaxed">
                      🔒 Your information is completely secure and confidential. We use it solely to provide your personalized business assessment and strategic recommendations. No spam, ever.
                    </p>
                  </div>
                </CardContent>
              </Card>
            ) : (
              /* Assessment Ready */
              <div className="text-center">
                <Card className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/30 p-8 mb-8 max-w-2xl mx-auto">
                  <div className="flex items-center justify-center mb-4">
                    <CheckCircle className="w-16 h-16 text-green-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Assessment Form Submitted!</h3>
                  <p className="text-gray-300 mb-6">Your strategic business assessment is ready to begin. Click below to start the comprehensive analysis.</p>
                </Card>
                <Button 
                  onClick={handleStartAssessment}
                  size="lg" 
                  className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white px-10 py-5 text-xl font-bold shadow-2xl hover:shadow-orange-500/25 transition-all duration-300 hover:scale-105"
                >
                  <Target className="mr-3 w-6 h-6" />
                  Begin Strategic Assessment
                  <ArrowRight className="ml-3 w-6 h-6" />
                </Button>
              </div>
            )}
          </div>
        </section>
      ) : (
        /* Assessment View with Premium Canva Integration */
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="mb-6 bg-gradient-to-r from-green-500/20 to-blue-500/20 text-green-400 border-green-500/30 text-lg px-6 py-3">
                <Award className="w-5 h-5 mr-3" />
                Your Strategic Business Assessment
              </Badge>
              <h2 className="text-4xl font-bold text-white mb-4">Complete Your Business Transformation Analysis</h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                This comprehensive assessment will analyze every aspect of your tint shop operation and provide strategic recommendations for market leadership.
              </p>
            </div>

            {/* Premium Canva Embed with Enhanced Styling */}
            <Card className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-xl border-slate-600/50 shadow-2xl mb-12">
              <CardContent className="p-4">
                <div className="relative w-full rounded-2xl overflow-hidden" style={{ paddingBottom: '75%' }}>
                  <iframe
                    src="https://www.canva.com/design/DAGtZ8m0trI/htE9O_TuQKJhyOG31Hnpsg/view?embed"
                    allowFullScreen
                    className="absolute top-0 left-0 w-full h-full"
                    style={{ border: 'none' }}
                    title="Tintbot.ai Strategic Business Assessment"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Post-Assessment Premium Actions */}
            <div className="text-center">
              <Card className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/30 p-10 mb-12 max-w-5xl mx-auto">
                <h3 className="text-3xl font-bold text-white mb-8">What Happens After Your Assessment?</h3>
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="text-center group hover:scale-105 transition-all duration-300">
                    <div className="w-20 h-20 bg-gradient-to-br from-green-500/20 to-teal-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:rotate-6 transition-all duration-300">
                      <CheckCircle className="w-10 h-10 text-green-400" />
                    </div>
                    <div className="text-white font-bold text-xl mb-2">Assessment Review</div>
                    <div className="text-gray-300">Our experts analyze your responses within 24 hours using AI-powered insights and industry best practices</div>
                  </div>
                  <div className="text-center group hover:scale-105 transition-all duration-300">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:rotate-6 transition-all duration-300">
                      <Users className="w-10 h-10 text-blue-400" />
                    </div>
                    <div className="text-white font-bold text-xl mb-2">Strategic Consultation</div>
                    <div className="text-gray-300">Optional free consultation call to discuss your personalized results and strategic recommendations</div>
                  </div>
                  <div className="text-center group hover:scale-105 transition-all duration-300">
                    <div className="w-20 h-20 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:rotate-6 transition-all duration-300">
                      <Target className="w-10 h-10 text-purple-400" />
                    </div>
                    <div className="text-white font-bold text-xl mb-2">Implementation Plan</div>
                    <div className="text-gray-300">Custom roadmap with timeline, priorities, and expected ROI for transforming your business</div>
                  </div>
                </div>
              </Card>

              {/* Success Stories Preview */}
              <Card className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-xl border-slate-600/50 p-8 mb-12 max-w-4xl mx-auto">
                <h3 className="text-2xl font-bold text-white mb-6">Assessment Success Stories</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-slate-900/50 rounded-xl p-6">
                    <div className="flex items-center mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-300 italic mb-4">"The assessment revealed $15,000 in missed revenue opportunities. Within 60 days of implementing the recommendations, we hit those numbers."</p>
                    <div className="text-white font-semibold">Mike R. - Elite Tint Phoenix</div>
                  </div>
                  <div className="bg-slate-900/50 rounded-xl p-6">
                    <div className="flex items-center mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-300 italic mb-4">"I was spending 20 hours a week on tasks that could be automated. The assessment showed me exactly how to get my life back."</p>
                    <div className="text-white font-semibold">Sarah J. - Precision Films Dallas</div>
                  </div>
                </div>
              </Card>

              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link to="/demo">
                  <Button size="lg" className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white px-10 py-5 text-xl font-semibold shadow-2xl hover:shadow-orange-500/25 transition-all duration-300 hover:scale-105">
                    <Eye className="mr-3 w-6 h-6" />
                    See Platform Demo
                    <ArrowRight className="ml-3 w-6 h-6" />
                  </Button>
                </Link>
                <Link to="/pricing">
                  <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white hover:text-slate-900 px-10 py-5 text-xl font-semibold backdrop-blur-sm transition-all duration-300 hover:scale-105">
                    <Award className="mr-3 w-6 h-6" />
                    View Partnership Plans
                    <TrendingUp className="ml-3 w-6 h-6" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
