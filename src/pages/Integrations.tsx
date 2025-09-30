/**
 * Workflow Analysis page showcasing comprehensive business solutions
 * Highlights how Tintbot.ai analyzes and optimizes existing business processes
 */

import { useState } from 'react'
import { Link } from 'react-router'
import { 
  Bot, ArrowRight, Calendar, MessageSquare, CreditCard, Share2, 
  Mail, Star, BarChart3, Smartphone, Calculator, Globe,
  Zap, CheckCircle, Clock, TrendingUp, Users, Search,
  ArrowUpRight, Sparkles, Target, Shield, Rocket, Workflow,
  LineChart, Award, Lightbulb, Activity, Trophy
} from 'lucide-react'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'

interface WorkflowSolution {
  id: string
  name: string
  category: string
  currentState: string
  analysisFindings: string
  optimizedSolution: string
  icon: React.ComponentType<any>
  color: string
  businessImpact: string
  roi: string
  features: string[]
  complexity: 'Simple' | 'Moderate' | 'Complex'
  timeToImplement: string
  marketAdvantage: string
}

export default function Integrations() {
  const [selectedSolution, setSelectedSolution] = useState<string | null>(null)
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  const workflowSolutions: WorkflowSolution[] = [
    {
      id: 'lead-management',
      name: 'Lead Management Optimization',
      category: 'Customer Acquisition',
      currentState: 'Manual lead qualification, missed opportunities, high time investment',
      analysisFindings: 'Average 3.2 hours daily spent on unqualified leads, 40% lead abandonment rate',
      optimizedSolution: 'AI-powered qualification system with intelligent routing and automated nurturing',
      icon: Users,
      color: 'orange',
      businessImpact: 'Market Leadership',
      roi: '340% ROI',
      timeToImplement: '7 days',
      complexity: 'Simple',
      features: ['Smart lead scoring', '24/7 qualification', 'Automated follow-ups', 'Conversion optimization'],
      marketAdvantage: 'First-to-respond advantage with intelligent pre-qualification'
    },
    {
      id: 'appointment-scheduling',
      name: 'Scheduling Workflow Revolution',
      category: 'Operations',
      currentState: 'Back-and-forth phone calls, double bookings, manual calendar management',
      analysisFindings: 'Average 23 minutes per booking, 15% no-show rate, scheduling conflicts',
      optimizedSolution: 'Intelligent scheduling with automatic optimization and customer journey integration',
      icon: Calendar,
      color: 'blue',
      businessImpact: 'Operational Excellence',
      roi: '280% ROI',
      timeToImplement: '5 days',
      complexity: 'Simple',
      features: ['Real-time availability', 'Smart time blocking', 'Automated reminders', 'Reschedule automation'],
      marketAdvantage: 'Professional booking experience that competitors cannot match'
    },
    {
      id: 'customer-communication',
      name: 'Communication Strategy Enhancement',
      category: 'Customer Experience',
      currentState: 'Reactive communication, missed follow-ups, generic messaging',
      analysisFindings: 'Low customer engagement, missed upsell opportunities, brand inconsistency',
      optimizedSolution: 'Proactive, personalized communication system with intelligent touchpoint optimization',
      icon: MessageSquare,
      color: 'green',
      businessImpact: 'Customer Loyalty',
      roi: '450% ROI',
      timeToImplement: '10 days',
      complexity: 'Moderate',
      features: ['Personalized messaging', 'Automated check-ins', 'Upsell optimization', 'Feedback loops'],
      marketAdvantage: 'Premium customer experience that builds long-term relationships'
    },
    {
      id: 'pricing-strategy',
      name: 'Dynamic Pricing Optimization',
      category: 'Revenue Management',
      currentState: 'Static pricing, manual quotes, inconsistent margins',
      analysisFindings: 'Underpricing premium services, missed revenue opportunities, quote abandonment',
      optimizedSolution: 'Intelligent pricing system with market analysis and value-based optimization',
      icon: Calculator,
      color: 'purple',
      businessImpact: 'Revenue Growth',
      roi: '520% ROI',
      timeToImplement: '14 days',
      complexity: 'Complex',
      features: ['Dynamic pricing', 'Competitive analysis', 'Value positioning', 'Margin optimization'],
      marketAdvantage: 'Competitive pricing strategy that maximizes profitability'
    },
    {
      id: 'digital-presence',
      name: 'Market Presence Amplification',
      category: 'Marketing & Brand',
      currentState: 'Limited online visibility, inconsistent branding, minimal social engagement',
      analysisFindings: 'Low search rankings, weak brand recognition, competitor dominance',
      optimizedSolution: 'Comprehensive digital presence strategy with automated content and engagement',
      icon: TrendingUp,
      color: 'pink',
      businessImpact: 'Market Dominance',
      roi: '380% ROI',
      timeToImplement: '21 days',
      complexity: 'Complex',
      features: ['SEO optimization', 'Content automation', 'Social engagement', 'Reputation management'],
      marketAdvantage: 'Dominant local market presence that drives organic growth'
    },
    {
      id: 'quality-control',
      name: 'Quality Assurance Automation',
      category: 'Service Excellence',
      currentState: 'Inconsistent quality checks, reactive problem solving, manual documentation',
      analysisFindings: 'Quality variations, customer complaints, rework costs, reputation risks',
      optimizedSolution: 'Automated quality control system with predictive issue prevention',
      icon: Award,
      color: 'yellow',
      businessImpact: 'Service Excellence',
      roi: '290% ROI',
      timeToImplement: '12 days',
      complexity: 'Moderate',
      features: ['Quality checklists', 'Photo documentation', 'Issue tracking', 'Performance analytics'],
      marketAdvantage: 'Consistent premium quality that builds trust and referrals'
    },
    {
      id: 'financial-optimization',
      name: 'Financial Process Streamlining',
      category: 'Business Intelligence',
      currentState: 'Manual invoicing, payment delays, limited financial visibility',
      analysisFindings: 'Cash flow issues, billing errors, lack of profitability insights',
      optimizedSolution: 'Automated financial system with real-time insights and optimization',
      icon: BarChart3,
      color: 'indigo',
      businessImpact: 'Financial Control',
      roi: '365% ROI',
      timeToImplement: '18 days',
      complexity: 'Complex',
      features: ['Automated invoicing', 'Payment processing', 'Financial analytics', 'Cash flow management'],
      marketAdvantage: 'Financial transparency and control that enables strategic growth'
    },
    {
      id: 'inventory-management',
      name: 'Inventory & Supply Chain Optimization',
      category: 'Operations',
      currentState: 'Manual inventory tracking, stockouts, over-ordering, supplier inefficiencies',
      analysisFindings: 'Inventory waste, lost sales, supplier relationship issues, cost overruns',
      optimizedSolution: 'Predictive inventory system with automated ordering and supplier optimization',
      icon: Activity,
      color: 'cyan',
      businessImpact: 'Cost Efficiency',
      roi: '220% ROI',
      timeToImplement: '16 days',
      complexity: 'Moderate',
      features: ['Predictive ordering', 'Supplier management', 'Cost optimization', 'Waste reduction'],
      marketAdvantage: 'Optimal inventory levels that reduce costs and ensure availability'
    },
    {
      id: 'employee-productivity',
      name: 'Team Productivity Enhancement',
      category: 'Human Resources',
      currentState: 'Manual task management, unclear priorities, inefficient workflows',
      analysisFindings: 'Low productivity, task confusion, missed deadlines, employee frustration',
      optimizedSolution: 'Intelligent task management with productivity optimization and training automation',
      icon: Users,
      color: 'emerald',
      businessImpact: 'Team Performance',
      roi: '310% ROI',
      timeToImplement: '9 days',
      complexity: 'Simple',
      features: ['Task automation', 'Performance tracking', 'Training systems', 'Goal alignment'],
      marketAdvantage: 'High-performance team that delivers exceptional results consistently'
    },
    {
      id: 'analytics-intelligence',
      name: 'Business Intelligence Revolution',
      category: 'Strategic Planning',
      currentState: 'Limited data insights, reactive decision making, guesswork strategies',
      analysisFindings: 'Missed opportunities, poor strategic decisions, competitive disadvantages',
      optimizedSolution: 'Comprehensive analytics platform with predictive insights and strategic guidance',
      icon: LineChart,
      color: 'slate',
      businessImpact: 'Strategic Advantage',
      roi: '440% ROI',
      timeToImplement: '25 days',
      complexity: 'Complex',
      features: ['Predictive analytics', 'Market insights', 'Performance forecasting', 'Strategic planning'],
      marketAdvantage: 'Data-driven decision making that consistently outperforms competition'
    }
  ]

  const getColorClasses = (color: string) => {
    const colorMap: Record<string, { bg: string, text: string, border: string, hover: string }> = {
      blue: { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/30', hover: 'hover:bg-blue-500/20' },
      orange: { bg: 'bg-orange-500/10', text: 'text-orange-400', border: 'border-orange-500/30', hover: 'hover:bg-orange-500/20' },
      green: { bg: 'bg-green-500/10', text: 'text-green-400', border: 'border-green-500/30', hover: 'hover:bg-green-500/20' },
      pink: { bg: 'bg-pink-500/10', text: 'text-pink-400', border: 'border-pink-500/30', hover: 'hover:bg-pink-500/20' },
      yellow: { bg: 'bg-yellow-500/10', text: 'text-yellow-400', border: 'border-yellow-500/30', hover: 'hover:bg-yellow-500/20' },
      purple: { bg: 'bg-purple-500/10', text: 'text-purple-400', border: 'border-purple-500/30', hover: 'hover:bg-purple-500/20' },
      indigo: { bg: 'bg-indigo-500/10', text: 'text-indigo-400', border: 'border-indigo-500/30', hover: 'hover:bg-indigo-500/20' },
      cyan: { bg: 'bg-cyan-500/10', text: 'text-cyan-400', border: 'border-cyan-500/30', hover: 'hover:bg-cyan-500/20' },
      emerald: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/30', hover: 'hover:bg-emerald-500/20' },
      slate: { bg: 'bg-slate-500/10', text: 'text-slate-400', border: 'border-slate-500/30', hover: 'hover:bg-slate-500/20' }
    }
    return colorMap[color] || colorMap.slate
  }

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
              <Link to="/" className="text-white hover:text-orange-400 transition-colors">Home</Link>
              <Link to="/features" className="text-white hover:text-orange-400 transition-colors">Solutions</Link>
              <Link to="/integrations" className="text-orange-400 font-semibold">Workflow Analysis</Link>
              <Link to="/demo" className="text-white hover:text-orange-400 transition-colors">Partnership Demo</Link>
              <Link to="/pricing" className="text-white hover:text-orange-400 transition-colors">Investment</Link>
            </div>
            <Link to="/assessment" className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md transition-colors">
              Free Analysis
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 via-transparent to-blue-500/5"></div>
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-orange-500/20 to-blue-500/20 text-orange-300 border border-orange-500/30 mb-8">
              <Search className="w-5 h-5 mr-2" />
              Comprehensive Workflow Analysis & Optimization
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Transform Every Aspect of 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-400"> Your Business</span>
            </h1>
            
            <p className="text-xl text-gray-300 max-w-4xl mx-auto mb-8">
              We don't just analyze your current workflows – we reimagine them. Our comprehensive business partnership approach identifies every optimization opportunity and implements AI-powered solutions that position your tint shop as the undisputed market leader.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link to="/assessment">
                <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg">
                  Get Free Workflow Analysis
                  <Search className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-slate-900 px-8 py-4 text-lg">
                View Success Stories
                <TrendingUp className="ml-2 h-5 w-5" />
              </Button>
            </div>

            {/* Analysis Results Preview */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-400">10+</div>
                <div className="text-gray-300 text-sm">Workflow Areas</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400">47%</div>
                <div className="text-gray-300 text-sm">Average ROI</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400">15hrs</div>
                <div className="text-gray-300 text-sm">Time Saved Weekly</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400">100%</div>
                <div className="text-gray-300 text-sm">Custom Solutions</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Analysis Process */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Our Comprehensive Analysis Process</h2>
            <p className="text-gray-300 text-lg">Deep-dive into every aspect of your business operations</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <Search className="h-12 w-12 text-blue-400 mb-4" />
                <CardTitle className="text-white">1. Current State Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">Comprehensive audit of existing workflows, pain points, and missed opportunities.</p>
                <ul className="text-sm text-gray-400 space-y-1">
                  <li>• Time & motion studies</li>
                  <li>• Process mapping</li>
                  <li>• Cost analysis</li>
                  <li>• Bottleneck identification</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <Lightbulb className="h-12 w-12 text-orange-400 mb-4" />
                <CardTitle className="text-white">2. Optimization Strategy</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">Custom automation and optimization plan tailored to your specific business goals.</p>
                <ul className="text-sm text-gray-400 space-y-1">
                  <li>• ROI projections</li>
                  <li>• Implementation roadmap</li>
                  <li>• Risk assessment</li>
                  <li>• Success metrics</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <Rocket className="h-12 w-12 text-green-400 mb-4" />
                <CardTitle className="text-white">3. Implementation & Growth</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">Seamless deployment with ongoing optimization and performance monitoring.</p>
                <ul className="text-sm text-gray-400 space-y-1">
                  <li>• Zero-disruption launch</li>
                  <li>• Team training</li>
                  <li>• Performance tracking</li>
                  <li>• Continuous improvement</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Top 10 Workflow Solutions */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Top 10 Business Transformation Areas
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Each area represents a complete business transformation opportunity with measurable ROI and competitive advantages.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workflowSolutions.map((solution, index) => {
              const colors = getColorClasses(solution.color)
              return (
                <Card 
                  key={solution.id}
                  className={`bg-slate-800/50 border-slate-700 hover:border-orange-500/50 transition-all duration-300 cursor-pointer transform hover:scale-105 ${ hoveredCard === solution.id ? 'shadow-2xl shadow-orange-500/20' : ''
                  }`}
                  onMouseEnter={() => setHoveredCard(solution.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  onClick={() => setSelectedSolution(selectedSolution === solution.id ? null : solution.id)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className={`w-12 h-12 ${colors.bg} rounded-lg flex items-center justify-center`}>
                        <solution.icon className={`h-6 w-6 ${colors.text}`} />
                      </div>
                      <div className="text-right">
                        <div className={`${colors.text} font-bold text-sm`}>{solution.roi}</div>
                        <div className="text-gray-400 text-xs">{solution.timeToImplement}</div>
                      </div>
                    </div>
                    <CardTitle className="text-white text-lg mt-3">{solution.name}</CardTitle>
                    <div className="text-gray-400 text-sm">{solution.category}</div>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <div className="text-red-400 text-xs font-semibold mb-1">🔍 CURRENT STATE:</div>
                        <div className="text-gray-400 text-xs">{solution.currentState}</div>
                      </div>
                      
                      <div>
                        <div className="text-orange-400 text-xs font-semibold mb-1">📊 ANALYSIS FINDINGS:</div>
                        <div className="text-gray-300 text-xs">{solution.analysisFindings}</div>
                      </div>

                      <div>
                        <div className="text-green-400 text-xs font-semibold mb-1">✅ OPTIMIZED SOLUTION:</div>
                        <div className="text-gray-300 text-xs">{solution.optimizedSolution}</div>
                      </div>
                    </div>

                    {selectedSolution === solution.id && (
                      <div className="mt-4 pt-4 border-t border-slate-600">
                        <div className="text-blue-400 text-xs font-semibold mb-2">🚀 KEY FEATURES:</div>
                        <div className="grid grid-cols-1 gap-1 mb-3">
                          {solution.features.map((feature, idx) => (
                            <div key={idx} className="flex items-center text-xs text-gray-300">
                              <CheckCircle className="h-3 w-3 text-green-400 mr-2 flex-shrink-0" />
                              {feature}
                            </div>
                          ))}
                        </div>
                        <div className="text-purple-400 text-xs font-semibold mb-1">🎯 MARKET ADVANTAGE:</div>
                        <div className="text-gray-300 text-xs">{solution.marketAdvantage}</div>
                      </div>
                    )}

                    <div className={`mt-4 p-3 ${colors.bg} ${colors.border} border rounded-lg`}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <Target className={`h-4 w-4 ${colors.text} mr-2`} />
                          <span className="text-white text-sm font-medium">{solution.businessImpact}</span>
                        </div>
                        <div className={`px-2 py-1 rounded text-xs font-medium ${
                          solution.complexity === 'Simple' ? 'bg-green-500/20 text-green-400' :
                          solution.complexity === 'Moderate' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-red-500/20 text-red-400'
                        }`}>
                          {solution.complexity}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Partnership Benefits */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-slate-800/50 to-blue-900/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Complete Business Transformation Partnership
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            More than software – we're your strategic partner for market leadership
          </p>

          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 mb-8">
            <div className="grid md:grid-cols-3 gap-8 text-center mb-8">
              <div>
                <Workflow className="h-12 w-12 text-orange-400 mx-auto mb-3" />
                <div className="text-white font-semibold">Complete Analysis</div>
                <div className="text-gray-400 text-sm">Every workflow optimized</div>
              </div>
              <div>
                <Rocket className="h-12 w-12 text-blue-400 mx-auto mb-3" />
                <div className="text-white font-semibold">Rapid Implementation</div>
                <div className="text-gray-400 text-sm">Live in days, not months</div>
              </div>
              <div>
                <Trophy className="h-12 w-12 text-green-400 mx-auto mb-3" />
                <div className="text-white font-semibold">Market Leadership</div>
                <div className="text-gray-400 text-sm">Dominate your local market</div>
              </div>
            </div>
            
            <div className="border-t border-slate-600 pt-8">
              <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-lg p-6">
                <div className="text-center">
                  <div className="text-green-400 text-3xl font-bold mb-2">Average Results</div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <div className="text-white font-semibold">+47% Revenue</div>
                      <div className="text-gray-300">Within 6 months</div>
                    </div>
                    <div>
                      <div className="text-white font-semibold">15hrs Saved</div>
                      <div className="text-gray-300">Per week</div>
                    </div>
                    <div>
                      <div className="text-white font-semibold">85% Automation</div>
                      <div className="text-gray-300">Of workflows</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/assessment">
              <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg">
                Start Partnership Analysis
                <Search className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-slate-900 px-8 py-4 text-lg">
              View Success Stories
              <ArrowUpRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Analyze Your Business Potential?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Get a comprehensive workflow analysis that reveals exactly how to transform your tint shop into the market leader. No obligations – just insights that could change everything.
          </p>
          
          <div className="bg-gradient-to-r from-orange-500/10 to-blue-500/10 border border-orange-500/30 rounded-2xl p-8 mb-8">
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="flex flex-col items-center">
                <Shield className="h-12 w-12 text-blue-400 mb-3" />
                <div className="text-white font-semibold">Free Analysis</div>
                <div className="text-gray-400 text-sm">No cost, no commitment</div>
              </div>
              <div className="flex flex-col items-center">
                <Clock className="h-12 w-12 text-green-400 mb-3" />
                <div className="text-white font-semibold">Quick Results</div>
                <div className="text-gray-400 text-sm">Insights in 24 hours</div>
              </div>
              <div className="flex flex-col items-center">
                <Users className="h-12 w-12 text-purple-400 mb-3" />
                <div className="text-white font-semibold">Expert Partnership</div>
                <div className="text-gray-400 text-sm">Tint industry specialists</div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/assessment">
              <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg">
                Get Free Workflow Analysis
                <Search className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/pricing">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-slate-900 px-8 py-4 text-lg">
                Partnership Investment
                <Calculator className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
