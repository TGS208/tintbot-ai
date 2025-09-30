/**
 * White Label Platform Page with Aminos Integration
 * Complete SaaS platform for white-label deployments
 */

import { useState } from 'react'
import { Link } from 'react-router'
import { Bot, Users, Settings, Plus, BarChart3, Zap, Globe, Code, Database } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import WhiteLabelDashboard from '../components/WhiteLabelDashboard'
import ClientOnboardingWizard from '../components/ClientOnboardingWizard'
import BusinessAutomationEngine from '../components/BusinessAutomationEngine'

export default function WhiteLabel() {
  const [activeView, setActiveView] = useState<'dashboard' | 'onboarding' | 'automation' | 'subdomains'>('dashboard')

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      
      {/* Navigation */}
      <nav className="bg-slate-900/80 backdrop-blur-md border-b border-slate-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <div className="flex items-center">
                <Bot className="h-8 w-8 text-orange-500 mr-2" />
                <span className="text-white text-xl font-bold">Tintbot.ai</span>
                <span className="ml-2 px-2 py-1 bg-orange-500/20 text-orange-400 text-xs rounded">
                  WHITE LABEL
                </span>
              </div>
              
              {/* Navigation Links */}
              <div className="hidden md:flex items-center space-x-6">
                <button
                  onClick={() => setActiveView('dashboard')}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                    activeView === 'dashboard' 
                      ? 'bg-orange-500/20 text-orange-400' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <BarChart3 className="w-4 h-4" />
                  <span>Dashboard</span>
                </button>
                <button
                  onClick={() => setActiveView('onboarding')}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                    activeView === 'onboarding' 
                      ? 'bg-orange-500/20 text-orange-400' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Users className="w-4 h-4" />
                  <span>Onboarding</span>
                </button>
                <button
                  onClick={() => setActiveView('subdomains')}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                    activeView === 'subdomains' 
                      ? 'bg-orange-500/20 text-orange-400' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Globe className="w-4 h-4" />
                  <span>Aminos Subdomains</span>
                </button>
                <button
                  onClick={() => setActiveView('automation')}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                    activeView === 'automation' 
                      ? 'bg-orange-500/20 text-orange-400' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Zap className="w-4 h-4" />
                  <span>Automation</span>
                </button>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link to="/" className="text-gray-400 hover:text-white">
                Public Site
              </Link>
              <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                <Plus className="w-4 h-4 mr-2" />
                New Client
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="p-6">
        {/* Live Aminos Demo banner */}
        <div className="max-w-7xl mx-auto mb-6">
          <div className="bg-gradient-to-r from-orange-500/10 to-blue-500/10 border border-orange-500/30 rounded-xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
            <div>
              <div className="text-white font-semibold">Live Aminos Demo</div>
              <div className="text-gray-300 text-sm">Open your white-label chatbot at client.tintbot.ai</div>
            </div>
            <a
              href="https://client.tintbot.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg"
            >
              Open Demo
            </a>
          </div>
        </div>

        {activeView === 'dashboard' && <WhiteLabelDashboard />}
        {activeView === 'onboarding' && <ClientOnboardingWizard />}
        {activeView === 'automation' && <BusinessAutomationEngine />}
        {activeView === 'subdomains' && <AminosSubdomainManager />}
      </div>
    </div>
  )
}

/**
 * Aminos Subdomain Management Component
 * Handles white-label subdomain deployments for chatbot clients
 */
function AminosSubdomainManager() {
  const [subdomains, setSubdomains] = useState([
    {
      id: '1',
      subdomain: 'elitetint.client.tintbot.ai',
      clientName: 'Elite Tint & Graphics',
      status: 'active',
      chatbotId: 'cb_elite_001',
      deployedAt: '2024-01-15',
      monthlyConversations: 2450,
      leadConversions: 185,
      customDomain: 'chat.elitetint.com'
    },
    {
      id: '2', 
      subdomain: 'precision.client.tintbot.ai',
      clientName: 'Precision Auto Tint',
      status: 'active',
      chatbotId: 'cb_precision_002',
      deployedAt: '2024-02-01',
      monthlyConversations: 1890,
      leadConversions: 142,
      customDomain: null
    },
    {
      id: '3',
      subdomain: 'metro.client.tintbot.ai', 
      clientName: 'Metro Tint Solutions',
      status: 'setup',
      chatbotId: 'cb_metro_003',
      deployedAt: '2024-03-10',
      monthlyConversations: 0,
      leadConversions: 0,
      customDomain: null
    }
  ])

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Aminos Subdomain Management</h1>
        <p className="text-gray-400">Manage white-label chatbot deployments and subdomain configurations</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Active Subdomains</p>
                <p className="text-2xl font-bold text-green-400">{subdomains.filter(s => s.status === 'active').length}</p>
              </div>
              <Globe className="w-8 h-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Conversations</p>
                <p className="text-2xl font-bold text-blue-400">
                  {subdomains.reduce((sum, s) => sum + s.monthlyConversations, 0).toLocaleString()}
                </p>
              </div>
              <BarChart3 className="w-8 h-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Lead Conversions</p>
                <p className="text-2xl font-bold text-orange-400">
                  {subdomains.reduce((sum, s) => sum + s.leadConversions, 0)}
                </p>
              </div>
              <Users className="w-8 h-8 text-orange-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Avg Conversion Rate</p>
                <p className="text-2xl font-bold text-purple-400">12.8%</p>
              </div>
              <Settings className="w-8 h-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Subdomain Management Table */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-white">Aminos Subdomain Deployments</CardTitle>
            <Button className="bg-orange-500 hover:bg-orange-600 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Deploy New Subdomain
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left py-3 text-gray-400">Subdomain</th>
                  <th className="text-left py-3 text-gray-400">Client</th>
                  <th className="text-left py-3 text-gray-400">Status</th>
                  <th className="text-left py-3 text-gray-400">Chatbot ID</th>
                  <th className="text-left py-3 text-gray-400">Conversations</th>
                  <th className="text-left py-3 text-gray-400">Conversions</th>
                  <th className="text-left py-3 text-gray-400">Custom Domain</th>
                  <th className="text-left py-3 text-gray-400">Actions</th>
                </tr>
              </thead>
              <tbody>
                {subdomains.map((subdomain) => (
                  <tr key={subdomain.id} className="border-b border-slate-700/50">
                    <td className="py-4">
                      <div>
                        <p className="text-white font-medium">{subdomain.subdomain}</p>
                        <p className="text-gray-400 text-sm">Deployed {subdomain.deployedAt}</p>
                      </div>
                    </td>
                    <td className="py-4 text-gray-300">{subdomain.clientName}</td>
                    <td className="py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        subdomain.status === 'active' ? 'bg-green-500/20 text-green-400' :
                        subdomain.status === 'setup' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-gray-500/20 text-gray-400'
                      }`}>
                        {subdomain.status}
                      </span>
                    </td>
                    <td className="py-4 text-gray-300 font-mono text-sm">{subdomain.chatbotId}</td>
                    <td className="py-4 text-blue-400 font-semibold">{subdomain.monthlyConversations.toLocaleString()}</td>
                    <td className="py-4 text-orange-400 font-semibold">{subdomain.leadConversions}</td>
                    <td className="py-4">
                      {subdomain.customDomain ? (
                        <span className="text-green-400 text-sm">{subdomain.customDomain}</span>
                      ) : (
                        <span className="text-gray-500 text-sm">None</span>
                      )}
                    </td>
                    <td className="py-4">
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" className="border-blue-500 text-blue-400">
                          <Code className="w-3 h-3" />
                        </Button>
                        <Button size="sm" variant="outline" className="border-orange-500 text-orange-400">
                          <Settings className="w-3 h-3" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Aminos Integration Configuration */}
      <Card className="bg-slate-800/50 border-slate-700 mt-8">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Database className="w-5 h-5 mr-2" />
            Aminos API Configuration
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-white font-semibold mb-3">API Settings</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-gray-400 mb-1">Aminos API Endpoint</label>
                  <input 
                    type="text" 
                    defaultValue="https://api.aminos.ai/v1/"
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded text-white"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-1">API Key</label>
                  <input 
                    type="password" 
                    defaultValue="aminos_live_key_••••••••••••••••"
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded text-white"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-1">Webhook Secret</label>
                  <input 
                    type="password" 
                    defaultValue="whsec_••••••••••••••••••••••••"
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded text-white"
                  />
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-3">Subdomain Configuration</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-gray-400 mb-1">Base Domain</label>
                  <input 
                    type="text" 
                    defaultValue="aminos.ai"
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded text-white"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-1">SSL Certificate</label>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    <span className="text-green-400 text-sm">Wildcard SSL Active</span>
                  </div>
                </div>
                <div>
                  <label className="block text-gray-400 mb-1">DNS Management</label>
                  <select className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded text-white">
                    <option>Cloudflare (Active)</option>
                    <option>AWS Route 53</option>
                    <option>Manual</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
