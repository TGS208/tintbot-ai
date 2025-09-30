/**
 * Pricing page for Tintbot.ai Platform
 * Displays pricing plans and ROI comparison
 */

import { useState } from 'react'
import { Link } from 'react-router'
import { Bot, Check, Phone, Mail, MapPin, ArrowRight } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'

export default function Pricing() {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly')

  const plans = [
    {
      name: 'Revenue Starter',
      description: 'Essential automation to boost lead conversion',
      monthlyPrice: 97,
      yearlyPrice: 970,
      features: [
        'AI Lead Qualification Bot',
        'Basic Calendar Integration',
        'FAQ Knowledge Base',
        'Email Support',
        'Up to 100 leads/month',
        'Basic Analytics Dashboard'
      ],
      popular: false
    },
    {
      name: 'Growth Accelerator',
      description: 'Complete solution for scaling your business',
      monthlyPrice: 249,
      yearlyPrice: 2490,
      features: [
        'Everything in Revenue Starter',
        'Virtual Tint Preview Tool',
        'Social Media Automation',
        'Advanced Analytics Dashboard',
        'Up to 500 leads/month',
        'Priority Support',
        'Custom Branding',
        'SMS Notifications'
      ],
      popular: true
    },
    {
      name: 'Market Dominator',
      description: 'Enterprise-grade platform for market leaders',
      monthlyPrice: 399,
      yearlyPrice: 3990,
      features: [
        'Everything in Growth Accelerator',
        'Multi-location Management',
        'Advanced Analytics & Reporting',
        'Custom Integrations',
        'Unlimited leads',
        'Dedicated Account Manager',
        'White-label Solution',
        'API Access'
      ],
      popular: false
    }
  ]

  const getPrice = (plan: typeof plans[0]) => {
    return billingPeriod === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice
  }

  const getSavings = (plan: typeof plans[0]) => {
    if (billingPeriod === 'yearly') {
      const yearlySavings = (plan.monthlyPrice * 12) - plan.yearlyPrice
      return `Save $${yearlySavings}`
    }
    return null
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
              <Link to="/" className="text-white hover:text-orange-400 transition-colors">
                Home
              </Link>
              <Link to="/features" className="text-white hover:text-orange-400 transition-colors">
                Features
              </Link>
              <Link to="/demo" className="text-white hover:text-orange-400 transition-colors">
                Demo
              </Link>
              <Link to="/pricing" className="text-orange-400 font-semibold">
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
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Business Solutions That Drive Results
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Choose the Tintbot.ai solution that matches your business goals. All plans include setup, training, and ongoing support to maximize your ROI.
          </p>
        </div>
      </section>

      {/* Billing Toggle */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center mb-8">
            <div className="bg-slate-800 rounded-lg p-1 flex">
              <button
                onClick={() => setBillingPeriod('monthly')}
                className={`px-4 py-2 rounded-md transition-colors ${
                  billingPeriod === 'monthly'
                    ? 'bg-orange-500 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingPeriod('yearly')}
                className={`px-4 py-2 rounded-md transition-colors ${
                  billingPeriod === 'yearly'
                    ? 'bg-orange-500 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Yearly
              </button>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <Card
                key={plan.name}
                className={`relative bg-slate-800/50 backdrop-blur-sm border-slate-700 ${
                  plan.popular ? 'border-orange-500 border-2' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </div>
                  </div>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-white text-2xl">{plan.name}</CardTitle>
                  <p className="text-gray-400">{plan.description}</p>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-white">
                      ${getPrice(plan)}
                    </span>
                    <span className="text-gray-400">
                      /{billingPeriod === 'monthly' ? 'month' : 'year'}
                    </span>
                    {getSavings(plan) && (
                      <div className="text-green-400 text-sm mt-1">
                        {getSavings(plan)}
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-300 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={`w-full ${
                      plan.popular
                        ? 'bg-orange-500 hover:bg-orange-600 text-white'
                        : 'bg-slate-700 hover:bg-slate-600 text-white'
                    }`}
                  >
                    Start Free Trial
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ROI Table */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              See Your Return on Investment
            </h2>
            <p className="text-xl text-gray-300">
              Tintbot.ai pays for itself by saving time and increasing conversions
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left py-4 px-6 text-white font-semibold">Business Metric</th>
                  <th className="text-center py-4 px-6 text-white font-semibold">Revenue Starter</th>
                  <th className="text-center py-4 px-6 text-white font-semibold">Growth Accelerator</th>
                  <th className="text-center py-4 px-6 text-white font-semibold">Market Dominator</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-700">
                  <td className="py-4 px-6 text-gray-300">Monthly Leads Processed</td>
                  <td className="py-4 px-6 text-center text-white">100</td>
                  <td className="py-4 px-6 text-center text-white">500</td>
                  <td className="py-4 px-6 text-center text-white">1,000+</td>
                </tr>
                <tr className="border-b border-slate-700">
                  <td className="py-4 px-6 text-gray-300">Time Saved (hrs/week)</td>
                  <td className="py-4 px-6 text-center text-blue-400 font-semibold">8</td>
                  <td className="py-4 px-6 text-center text-blue-400 font-semibold">15</td>
                  <td className="py-4 px-6 text-center text-blue-400 font-semibold">30+</td>
                </tr>
                <tr className="border-b border-slate-700">
                  <td className="py-4 px-6 text-gray-300">Additional Revenue/Month</td>
                  <td className="py-4 px-6 text-center text-green-400 font-semibold">$2,200</td>
                  <td className="py-4 px-6 text-center text-green-400 font-semibold">$4,800</td>
                  <td className="py-4 px-6 text-center text-green-400 font-semibold">$8,500+</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 text-gray-300">ROI</td>
                  <td className="py-4 px-6 text-center text-orange-400 font-bold">2,168%</td>
                  <td className="py-4 px-6 text-center text-orange-400 font-bold">1,828%</td>
                  <td className="py-4 px-6 text-center text-orange-400 font-bold">2,030%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-300">
              Get answers to common questions about Tintbot.ai business solutions
            </p>
          </div>

          <div className="space-y-8">
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-6">
              <h3 className="text-white font-semibold mb-2">
                How quickly will I see results with Revenue Starter?
              </h3>
              <p className="text-gray-300">
                Most shops see immediate improvements in lead qualification within 24 hours. Full ROI typically realized within 30 days with proper implementation.
              </p>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-6">
              <h3 className="text-white font-semibold mb-2">
                What makes Growth Accelerator worth the investment?
              </h3>
              <p className="text-gray-300">
                The virtual tint preview tool alone increases conversion rates by 35%. Combined with social media automation, most shops see 3-5x ROI within 60 days.
              </p>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-6">
              <h3 className="text-white font-semibold mb-2">
                Do I need technical expertise to implement these solutions?
              </h3>
              <p className="text-gray-300">
                No! We provide complete setup, training, and ongoing support. Our solutions integrate seamlessly with your existing website and tools.
              </p>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-6">
              <h3 className="text-white font-semibold mb-2">
                Can I upgrade my business solution as I grow?
              </h3>
              <p className="text-gray-300">
                Absolutely! Upgrade anytime to access advanced features. Changes take effect immediately, and we'll help migrate your data and settings.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Scale Your Business?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join hundreds of successful tint shops using Tintbot.ai business solutions to automate operations and drive growth.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg">
              Start Free 30-Day Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Link to="/demo">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-slate-900 px-8 py-4 text-lg">
                See Business Solutions Demo
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
                AI-powered business solutions built specifically for window tint professionals.
              </p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Solutions</h3>
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
