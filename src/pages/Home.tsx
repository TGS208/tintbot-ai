/**
 * Home page component for Tintbot.ai
 * COMPLETE SOPHISTICATED VERSION - All assessment integration & business partnership focus
 */

import { Link } from 'react-router'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { 
  Bot, 
  Calendar, 
  Smartphone, 
  MessageSquare, 
  BarChart3, 
  Zap,
  CheckCircle,
  ArrowRight,
  Star,
  Users,
  DollarSign,
  Target,
  Sparkles,
  TrendingUp,
  Shield,
  Clock,
  Award,
  Lightbulb,
  Rocket,
  Globe,
  Eye,
  ArrowUpRight
} from 'lucide-react'

/**
 * Advanced feature card component with hover effects and badges
 */
interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
  badge?: string
  stats?: string
  gradient?: string
}

const FeatureCard = ({ icon, title, description, badge, stats, gradient = "from-slate-800/50 to-slate-700/50" }: FeatureCardProps) => (
  <Card className={`group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:scale-105 border-slate-200 bg-gradient-to-br ${gradient} backdrop-blur-sm border-slate-700 overflow-hidden relative`}>
    <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    <CardHeader className="text-center relative z-10">
      <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
        {icon}
      </div>
      <CardTitle className="text-xl text-white flex items-center justify-center gap-2 mb-2">
        {title}
        {badge && <Badge variant="secondary" className="text-xs bg-gradient-to-r from-orange-500/30 to-pink-500/30 text-orange-300 border-orange-500/40">{badge}</Badge>}
      </CardTitle>
      {stats && (
        <div className="text-2xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
          {stats}
        </div>
      )}
    </CardHeader>
    <CardContent className="relative z-10">
      <CardDescription className="text-slate-300 text-center leading-relaxed text-sm">
        {description}
      </CardDescription>
    </CardContent>
  </Card>
)

/**
 * Enhanced testimonial component with advanced styling
 */
interface TestimonialProps {
  name: string
  business: string
  quote: string
  rating: number
  image?: string
  results?: string
}

const Testimonial = ({ name, business, quote, rating, results }: TestimonialProps) => (
  <Card className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-sm border-slate-600 hover:border-orange-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/10">
    <CardContent className="p-8">
      <div className="flex items-center mb-6">
        {[...Array(rating)].map((_, i) => (
          <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400 drop-shadow-sm" />
        ))}
      </div>
      <blockquote className="text-slate-300 mb-6 italic text-lg leading-relaxed">
        "{quote}"
      </blockquote>
      {results && (
        <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-lg p-4 mb-6 border border-green-500/20">
          <div className="text-green-400 font-semibold text-sm mb-1">📈 RESULTS:</div>
          <div className="text-white font-medium">{results}</div>
        </div>
      )}
      <div className="flex items-center">
        <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-pink-500 rounded-full flex items-center justify-center mr-4 shadow-lg">
          <span className="text-white font-bold text-lg">{name.split(' ').map(n => n[0]).join('')}</span>
        </div>
        <div>
          <p className="font-semibold text-white text-lg">{name}</p>
          <p className="text-sm text-slate-400">{business}</p>
        </div>
      </div>
    </CardContent>
  </Card>
)

/**
 * MAIN HOME COMPONENT - COMPLETE SOPHISTICATED VERSION
 */
export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Advanced Navigation with Blur Effect */}
      <nav className="bg-slate-900/90 backdrop-blur-xl border-b border-slate-700/50 sticky top-0 z-50 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-18">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Bot className="w-10 h-10 text-orange-500 drop-shadow-lg" />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
              </div>
              <div>
                <span className="text-3xl font-bold bg-gradient-to-r from-orange-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                  Tintbot.ai
                </span>
                <div className="text-xs text-slate-400 -mt-1">Business Partnership Platform</div>
              </div>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/features" className="text-white hover:text-orange-400 transition-all duration-200 hover:scale-105 font-medium">Features</Link>
              <Link to="/integrations" className="text-white hover:text-orange-400 transition-all duration-200 hover:scale-105 font-medium">Partnership Analysis</Link>
              <Link to="/pricing" className="text-white hover:text-orange-400 transition-all duration-200 hover:scale-105 font-medium">Investment</Link>
              <Link to="/demo" className="text-white hover:text-orange-400 transition-all duration-200 hover:scale-105 font-medium">Demo</Link>
            </div>

            <div className="flex items-center space-x-4">
              <Link to="/chatbot-test">
                <Button variant="outline" size="sm" className="border-orange-500/70 text-orange-400 hover:bg-orange-500 hover:text-white transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-orange-500/25">
                  <MessageSquare className="mr-2 w-4 h-4" />
                  Try AI Chat
                </Button>
              </Link>
              <Link to="/assessment">
                <Button size="sm" className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-orange-500/25">
                  <Target className="mr-2 w-4 h-4" />
                  Free Partnership Assessment
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - Enhanced with Animations */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 via-transparent to-blue-500/5"></div>
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <Badge className="mb-8 bg-gradient-to-r from-orange-500/20 to-blue-500/20 text-orange-300 border border-orange-500/30 hover:bg-orange-200/30 transition-all duration-300 hover:scale-105 text-base px-6 py-3">
            <Sparkles className="w-5 h-5 mr-3" />
            🚀 Revolutionary Business Partnership Platform
          </Badge>
          
          <h1 className="text-6xl md:text-7xl font-black text-white mb-8 leading-tight">
            Your Strategic Partner for
            <span className="bg-gradient-to-r from-orange-400 via-pink-400 to-blue-400 bg-clip-text text-transparent block mt-2">
              Window Tinting Excellence
            </span>
          </h1>
          
          <p className="text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed font-light">
            We don't just provide software – we become your strategic business partner. Our comprehensive analysis and implementation approach transforms every aspect of your tint shop into a market-leading operation.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <Link to="/assessment">
              <Button size="lg" className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white px-12 py-6 text-xl font-semibold shadow-2xl hover:shadow-orange-500/25 transition-all duration-300 hover:scale-105 animate-pulse">
                <Target className="mr-3 w-6 h-6" />
                Free Partnership Assessment
                <ArrowRight className="ml-3 w-6 h-6" />
              </Button>
            </Link>
            <Link to="/integrations">
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white hover:text-slate-900 px-12 py-6 text-xl font-semibold backdrop-blur-sm transition-all duration-300 hover:scale-105">
                <TrendingUp className="mr-3 w-6 h-6" />
                View Business Analysis
                <ArrowUpRight className="ml-3 w-6 h-6" />
              </Button>
            </Link>
          </div>

          {/* Enhanced Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-20">
            <Card className="bg-gradient-to-br from-orange-500/20 to-red-500/20 border-orange-500/30 hover:border-orange-400/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/20">
              <CardContent className="p-8 text-center">
                <div className="text-5xl font-black text-orange-400 mb-3">47%</div>
                <div className="text-white font-semibold text-lg">Average Revenue Increase</div>
                <div className="text-gray-400 text-sm mt-2">Within 6 months of partnership</div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 border-blue-500/30 hover:border-blue-400/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20">
              <CardContent className="p-8 text-center">
                <div className="text-5xl font-black text-blue-400 mb-3">15hrs</div>
                <div className="text-white font-semibold text-lg">Time Saved Weekly</div>
                <div className="text-gray-400 text-sm mt-2">Through intelligent automation</div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-green-500/20 to-teal-500/20 border-green-500/30 hover:border-green-400/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-green-500/20">
              <CardContent className="p-8 text-center">
                <div className="text-5xl font-black text-green-400 mb-3">85%</div>
                <div className="text-white font-semibold text-lg">Process Automation</div>
                <div className="text-gray-400 text-sm mt-2">End-to-end workflow optimization</div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-500/30 hover:border-purple-400/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20">
              <CardContent className="p-8 text-center">
                <div className="text-5xl font-black text-purple-400 mb-3">100%</div>
                <div className="text-white font-semibold text-lg">Partnership Success</div>
                <div className="text-gray-400 text-sm mt-2">Guaranteed market leadership</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Partnership Mission Statement - PREMIUM SECTION */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-orange-500/5 via-purple-500/5 to-blue-500/5 relative">
        <div className="absolute inset-0 backdrop-blur-3xl"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <Card className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-xl border-slate-600/50 shadow-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 via-transparent to-blue-500/10"></div>
            <div className="text-center p-16 relative z-10">
              <Badge className="mb-8 bg-gradient-to-r from-green-500/20 to-blue-500/20 text-green-400 border-green-500/30 text-lg px-6 py-3">
                <Award className="w-5 h-5 mr-3" />
                Our Strategic Partnership Mission
              </Badge>
              
              <h2 className="text-5xl font-black text-white mb-8 leading-tight">
                We Transform Entire Businesses,
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-400 block">
                  Not Just Provide Software
                </span>
              </h2>
              
              <p className="text-2xl text-gray-300 mb-12 max-w-5xl mx-auto leading-relaxed font-light">
                We believe every window tint shop has the potential to dominate their local market. Our mission is to analyze, optimize, and transform your entire business operation – becoming your strategic partner in achieving market leadership through intelligent automation.
              </p>
              
              <div className="grid md:grid-cols-3 gap-10 mb-12">
                <div className="text-center group hover:scale-105 transition-all duration-300">
                  <div className="w-20 h-20 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:rotate-6 transition-all duration-300 shadow-xl">
                    <Target className="w-10 h-10 text-orange-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Strategic Analysis</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Deep-dive comprehensive audit of every business aspect to identify optimization opportunities and competitive advantages
                  </p>
                </div>
                <div className="text-center group hover:scale-105 transition-all duration-300">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:rotate-6 transition-all duration-300 shadow-xl">
                    <Zap className="w-10 h-10 text-blue-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Complete Implementation</h3>
                  <p className="text-gray-300 leading-relaxed">
                    End-to-end automation of workflows with ongoing optimization, training, and dedicated partnership support
                  </p>
                </div>
                <div className="text-center group hover:scale-105 transition-all duration-300">
                  <div className="w-20 h-20 bg-gradient-to-br from-green-500/20 to-teal-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:rotate-6 transition-all duration-300 shadow-xl">
                    <TrendingUp className="w-10 h-10 text-green-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Market Leadership</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Transform your shop into the undisputed leader in your local market through strategic positioning and optimization
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 rounded-2xl p-8 mb-8 border border-slate-600/50">
                <div className="grid md:grid-cols-4 gap-6 text-center">
                  <div>
                    <div className="text-3xl font-bold text-orange-400 mb-2">200+</div>
                    <div className="text-gray-300 font-medium">Successful Partnerships</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-blue-400 mb-2">$2.5M+</div>
                    <div className="text-gray-300 font-medium">Revenue Generated</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-green-400 mb-2">98%</div>
                    <div className="text-gray-300 font-medium">Client Satisfaction</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-purple-400 mb-2">30 Days</div>
                    <div className="text-gray-300 font-medium">Average ROI Timeline</div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link to="/assessment">
                  <Button size="lg" className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white px-10 py-5 text-xl font-semibold shadow-2xl hover:shadow-orange-500/25 transition-all duration-300 hover:scale-105">
                    <Target className="mr-3 w-6 h-6" />
                    Start Partnership Assessment
                    <ArrowRight className="ml-3 w-6 h-6" />
                  </Button>
                </Link>
                <Link to="/integrations">
                  <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white hover:text-slate-900 px-10 py-5 text-xl font-semibold backdrop-blur-sm transition-all duration-300 hover:scale-105">
                    <Eye className="mr-3 w-6 h-6" />
                    View Analysis Process
                    <ArrowUpRight className="ml-3 w-6 h-6" />
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Advanced Features Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-800/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <Badge className="mb-6 bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-400 border-blue-500/30 text-lg px-6 py-3">
              <Rocket className="w-5 h-5 mr-3" />
              Complete Business Transformation Suite
            </Badge>
            <h2 className="text-5xl font-black text-white mb-6">
              Every Aspect of Your Business,
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 block">
                Optimized & Automated
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              We analyze and optimize every workflow, process, and customer touchpoint to create a market-dominating operation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Bot className="w-8 h-8 text-orange-400" />}
              title="AI Lead Revolution"
              description="Advanced AI system that qualifies leads with 95% accuracy, scores purchase intent, and nurtures prospects through intelligent conversation flows."
              badge="AI-POWERED"
              stats="40% ↑ Conversions"
              gradient="from-orange-500/10 to-red-500/10"
            />
            
            <FeatureCard
              icon={<Calendar className="w-8 h-8 text-blue-400" />}
              title="Smart Operations Hub"
              description="Intelligent scheduling system with predictive booking, automatic optimization, and seamless calendar integration that eliminates double-bookings."
              badge="AUTOMATED"
              stats="15hrs Saved/Week"
              gradient="from-blue-500/10 to-purple-500/10"
            />
            
            <FeatureCard
              icon={<BarChart3 className="w-8 h-8 text-green-400" />}
              title="Revenue Intelligence"
              description="Advanced analytics platform with predictive insights, pricing optimization, and market analysis that maximizes profitability."
              badge="ANALYTICS"
              stats="25% ↑ Revenue"
              gradient="from-green-500/10 to-teal-500/10"
            />
            
            <FeatureCard
              icon={<MessageSquare className="w-8 h-8 text-purple-400" />}
              title="Customer Excellence Engine"
              description="24/7 intelligent customer service system that builds loyalty, handles inquiries, and creates exceptional experiences."
              badge="24/7"
              stats="98% Satisfaction"
              gradient="from-purple-500/10 to-pink-500/10"
            />
            
            <FeatureCard
              icon={<Globe className="w-8 h-8 text-pink-400" />}
              title="Market Presence Domination"
              description="Comprehensive digital marketing automation including social media, SEO, review management, and competitive positioning."
              badge="MARKETING"
              stats="300% ↑ Visibility"
              gradient="from-pink-500/10 to-rose-500/10"
            />

            <FeatureCard
              icon={<Lightbulb className="w-8 h-8 text-yellow-400" />}
              title="Strategic Growth Partnership"
              description="Ongoing strategic guidance, market analysis, and optimization recommendations to ensure sustained competitive advantage."
              badge="STRATEGIC"
              stats="Continuous Growth"
              gradient="from-yellow-500/10 to-orange-500/10"
            />
          </div>
        </div>
      </section>

      {/* Enhanced Testimonials - Success Stories */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <Badge className="mb-6 bg-gradient-to-r from-green-500/20 to-blue-500/20 text-green-400 border-green-500/30 text-lg px-6 py-3">
              <Award className="w-5 h-5 mr-3" />
              Partnership Success Stories
            </Badge>
            <h2 className="text-5xl font-black text-white mb-6">
              Real Results from
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400 block">
                Strategic Business Partnerships
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Discover how our comprehensive business partnerships have transformed tint shops into market leaders
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Testimonial
              name="Mike Rodriguez"
              business="Elite Tint & Graphics - Phoenix, AZ"
              quote="Tintbot.ai didn't just give us software - they became our strategic partner. The comprehensive business analysis revealed opportunities we never saw. Revenue is up 52% and we've automated 80% of our workflows."
              rating={5}
              results="52% revenue increase, 15 hours saved weekly, #1 local ranking"
            />
            
            <Testimonial
              name="Sarah Johnson"
              business="Precision Window Films - Dallas, TX"
              quote="The workflow optimization process was incredible. They analyzed every aspect of our operation and implemented solutions that transformed us into the market leader. Now we have a waiting list of customers."
              rating={5}
              results="300% lead increase, 40% higher conversion, market leadership"
            />
            
            <Testimonial
              name="David Kim"
              business="Metro Tint Solutions - Los Angeles, CA"
              quote="This partnership approach is game-changing. They don't just implement - they optimize, train, and continuously improve our operation. Best business decision we ever made. ROI was positive in 3 weeks."
              rating={5}
              results="ROI positive in 21 days, 45% efficiency increase, 5-star rating"
            />
          </div>
        </div>
      </section>

      {/* Final Partnership CTA - Premium */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-blue-900/50 to-slate-900"></div>
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-orange-500/5 via-transparent to-blue-500/5"></div>
        </div>
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <Badge className="mb-8 bg-gradient-to-r from-orange-500/20 to-blue-500/20 text-orange-300 border border-orange-500/30 text-lg px-6 py-3">
            <Sparkles className="w-5 h-5 mr-3" />
            Ready to Transform Your Business?
          </Badge>
          
          <h2 className="text-5xl md:text-6xl font-black text-white mb-8 leading-tight">
            Start Your Partnership
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-400 block">
              Assessment Today
            </span>
          </h2>
          
          <p className="text-2xl text-gray-300 mb-12 leading-relaxed font-light">
            Get a comprehensive business analysis that reveals exactly how to transform your tint shop into the market leader. No obligations – just insights that could change everything.
          </p>
          
          <div className="bg-gradient-to-r from-orange-500/10 to-blue-500/10 border border-orange-500/30 rounded-3xl p-10 mb-12 backdrop-blur-sm">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="flex flex-col items-center">
                <Shield className="h-16 w-16 text-blue-400 mb-4" />
                <div className="text-white font-bold text-xl">Free Assessment</div>
                <div className="text-gray-400">Complete business analysis with no cost or commitment</div>
              </div>
              <div className="flex flex-col items-center">
                <Clock className="h-16 w-16 text-green-400 mb-4" />
                <div className="text-white font-bold text-xl">Strategic Partnership</div>
                <div className="text-gray-400">Ongoing optimization and market leadership support</div>
              </div>
              <div className="flex flex-col items-center">
                <Users className="h-16 w-16 text-purple-400 mb-4" />
                <div className="text-white font-bold text-xl">Guaranteed Results</div>
                <div className="text-gray-400">Market domination and sustained competitive advantage</div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/assessment">
              <Button size="lg" className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white px-12 py-6 text-2xl font-bold shadow-2xl hover:shadow-orange-500/25 transition-all duration-300 hover:scale-105">
                <Target className="mr-3 w-7 h-7" />
                Start Partnership Assessment
                <ArrowRight className="ml-3 w-7 h-7" />
              </Button>
            </Link>
            <Link to="/integrations">
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white hover:text-slate-900 px-12 py-6 text-2xl font-bold backdrop-blur-sm transition-all duration-300 hover:scale-105">
                <TrendingUp className="mr-3 w-7 h-7" />
                View Business Analysis
                <Eye className="ml-3 w-7 h-7" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
