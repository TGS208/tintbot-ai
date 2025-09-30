/**
 * White Label Client Management Dashboard
 * Handles client onboarding, customization, and deployment
 */

import { useState } from 'react'
import { Users, Settings, BarChart3, Plus, Eye, Edit, Trash2 } from 'lucide-react'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

interface WhiteLabelClient {
  id: string
  businessName: string
  domain: string
  status: 'active' | 'setup' | 'paused'
  subscription: 'starter' | 'pro' | 'enterprise'
  deployedAt: string
  monthlyRevenue: number
  leadsProcessed: number
  conversionRate: number
  features: string[]
}

export default function WhiteLabelDashboard() {
  const [clients] = useState<WhiteLabelClient[]>([
    {
      id: '1',
      businessName: 'Elite Tint & Graphics',
      domain: 'elitetint.tintbot.ai',
      status: 'active',
      subscription: 'pro',
      deployedAt: '2024-01-15',
      monthlyRevenue: 4200,
      leadsProcessed: 156,
      conversionRate: 34,
      features: ['AI Chat', 'Scheduling', 'Social Media', 'Analytics']
    },
    {
      id: '2',
      businessName: 'Precision Auto Tint',
      domain: 'precision.tintbot.ai',
      status: 'active',
      subscription: 'enterprise',
      deployedAt: '2024-02-01',
      monthlyRevenue: 7800,
      leadsProcessed: 289,
      conversionRate: 42,
      features: ['AI Chat', 'Scheduling', 'Social Media', 'Analytics', 'Multi-location', 'API Access']
    },
    {
      id: '3',
      businessName: 'Metro Tint Solutions',
      domain: 'metro.tintbot.ai',
      status: 'setup',
      subscription: 'starter',
      deployedAt: '2024-03-10',
      monthlyRevenue: 0,
      leadsProcessed: 0,
      conversionRate: 0,
      features: ['AI Chat', 'Basic Analytics']
    }
  ])

  const [activeTab, setActiveTab] = useState<'overview' | 'clients' | 'deployments'>('overview')

  const totalRevenue = clients.reduce((sum, client) => sum + client.monthlyRevenue, 0)
  const activeClients = clients.filter(c => c.status === 'active').length
  const totalLeads = clients.reduce((sum, client) => sum + client.leadsProcessed, 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Tintbot.ai White Label Platform</h1>
            <p className="text-gray-400">Manage client deployments and automation systems</p>
          </div>
          <Button className="bg-orange-500 hover:bg-orange-600 text-white">
            <Plus className="w-4 h-4 mr-2" />
            New Client Deployment
          </Button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 mb-6">
          {[
            { id: 'overview', label: 'Overview', icon: BarChart3 },
            { id: 'clients', label: 'Client Management', icon: Users },
            { id: 'deployments', label: 'Deployments', icon: Settings }
          ].map((tab) => {
            const Icon = tab.icon
            return (
              <Button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 ${
                  activeTab === tab.id
                    ? 'bg-orange-500 text-white'
                    : 'bg-slate-800 text-gray-400 hover:bg-slate-700'
                }`}
              >
                <Icon className="w-4 h-4 mr-2" />
                {tab.label}
              </Button>
            )
          })}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Monthly Revenue</p>
                      <p className="text-2xl font-bold text-green-400">${totalRevenue.toLocaleString()}</p>
                    </div>
                    <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
                      <BarChart3 className="w-6 h-6 text-green-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Active Clients</p>
                      <p className="text-2xl font-bold text-blue-400">{activeClients}</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center">
                      <Users className="w-6 h-6 text-blue-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Leads Processed</p>
                      <p className="text-2xl font-bold text-orange-400">{totalLeads.toLocaleString()}</p>
                    </div>
                    <div className="w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center">
                      <BarChart3 className="w-6 h-6 text-orange-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Avg Conversion</p>
                      <p className="text-2xl font-bold text-purple-400">38%</p>
                    </div>
                    <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center">
                      <BarChart3 className="w-6 h-6 text-purple-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Recent Client Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {clients.slice(0, 5).map((client) => (
                    <div key={client.id} className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${
                          client.status === 'active' ? 'bg-green-400' : 
                          client.status === 'setup' ? 'bg-yellow-400' : 'bg-gray-400'
                        }`}></div>
                        <div>
                          <p className="text-white font-medium">{client.businessName}</p>
                          <p className="text-gray-400 text-sm">{client.domain}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-green-400 font-semibold">${client.monthlyRevenue.toLocaleString()}/mo</p>
                        <p className="text-gray-400 text-sm">{client.leadsProcessed} leads</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Clients Tab */}
        {activeTab === 'clients' && (
          <div className="space-y-6">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Client Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-700">
                        <th className="text-left py-3 text-gray-400">Business</th>
                        <th className="text-left py-3 text-gray-400">Domain</th>
                        <th className="text-left py-3 text-gray-400">Status</th>
                        <th className="text-left py-3 text-gray-400">Subscription</th>
                        <th className="text-left py-3 text-gray-400">Revenue</th>
                        <th className="text-left py-3 text-gray-400">Conversion</th>
                        <th className="text-left py-3 text-gray-400">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {clients.map((client) => (
                        <tr key={client.id} className="border-b border-slate-700/50">
                          <td className="py-3">
                            <div>
                              <p className="text-white font-medium">{client.businessName}</p>
                              <p className="text-gray-400 text-sm">Deployed {client.deployedAt}</p>
                            </div>
                          </td>
                          <td className="py-3 text-gray-300">{client.domain}</td>
                          <td className="py-3">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              client.status === 'active' ? 'bg-green-500/20 text-green-400' :
                              client.status === 'setup' ? 'bg-yellow-500/20 text-yellow-400' :
                              'bg-gray-500/20 text-gray-400'
                            }`}>
                              {client.status}
                            </span>
                          </td>
                          <td className="py-3 text-gray-300 capitalize">{client.subscription}</td>
                          <td className="py-3 text-green-400 font-semibold">${client.monthlyRevenue.toLocaleString()}</td>
                          <td className="py-3 text-orange-400 font-semibold">{client.conversionRate}%</td>
                          <td className="py-3">
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline" className="border-blue-500 text-blue-400">
                                <Eye className="w-3 h-3" />
                              </Button>
                              <Button size="sm" variant="outline" className="border-orange-500 text-orange-400">
                                <Edit className="w-3 h-3" />
                              </Button>
                              <Button size="sm" variant="outline" className="border-red-500 text-red-400">
                                <Trash2 className="w-3 h-3" />
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
          </div>
        )}

        {/* Deployments Tab */}
        {activeTab === 'deployments' && (
          <div className="space-y-6">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Deployment Configuration</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">Configure white-label deployment settings and automation features.</p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-white font-semibold mb-3">Default Features</h3>
                    <div className="space-y-2">
                      {[
                        'AI Lead Qualification',
                        'Appointment Scheduling',
                        'Price Quote System',
                        'Social Media Automation',
                        'Email/SMS Follow-ups',
                        'Analytics Dashboard'
                      ].map((feature) => (
                        <label key={feature} className="flex items-center space-x-2">
                          <input type="checkbox" defaultChecked className="rounded" />
                          <span className="text-gray-300">{feature}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-3">Deployment Options</h3>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-gray-400 mb-1">Default Subdomain Pattern</label>
                        <input 
                          type="text" 
                          defaultValue="[businessname].tintbot.ai"
                          className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-400 mb-1">Auto-deployment</label>
                        <select className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded text-white">
                          <option>Immediate after setup</option>
                          <option>Manual approval required</option>
                          <option>Scheduled deployment</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

      </div>
    </div>
  )
}
