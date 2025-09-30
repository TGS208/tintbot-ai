/**
 * Elasticsearch Service for Tintbot.ai
 * Handles search, analytics, and data indexing for business intelligence
 */

interface ElasticsearchConfig {
  endpoint: string
  apiKey: string
  indices: {
    leads: string
    conversations: string
    clients: string
    analytics: string
  }
}

interface LeadDocument {
  id: string
  clientId: string
  name: string
  email: string
  phone?: string
  business: string
  leadScore: number
  source: string
  status: 'new' | 'qualified' | 'converted' | 'lost'
  createdAt: string
  updatedAt: string
  metadata: {
    vehicleType?: string
    serviceInterest?: string[]
    budget?: string
    timeline?: string
    location?: string
  }
}

interface ConversationDocument {
  id: string
  clientId: string
  leadId?: string
  sessionId: string
  messages: Array<{
    timestamp: string
    sender: 'user' | 'bot'
    content: string
    intent?: string
    confidence?: number
  }>
  outcome: 'lead_qualified' | 'information_provided' | 'booking_scheduled' | 'abandoned'
  duration: number
  createdAt: string
}

interface ClientDocument {
  id: string
  businessName: string
  domain: string
  subdomain: string
  status: 'active' | 'setup' | 'paused'
  subscription: 'starter' | 'pro' | 'enterprise'
  deployedAt: string
  settings: {
    chatbotId: string
    branding: {
      primaryColor: string
      logo?: string
    }
    services: string[]
    pricing: Record<string, number>
  }
  metrics: {
    monthlyLeads: number
    conversionRate: number
    averageResponseTime: number
    customerSatisfaction: number
  }
}

interface AnalyticsDocument {
  id: string
  clientId: string
  date: string
  metrics: {
    leads: {
      total: number
      qualified: number
      converted: number
      sources: Record<string, number>
    }
    conversations: {
      total: number
      averageDuration: number
      completionRate: number
      satisfactionScore: number
    }
    revenue: {
      generated: number
      pipeline: number
      averageJobValue: number
    }
    performance: {
      responseTime: number
      resolutionRate: number
      escalationRate: number
    }
  }
}

class ElasticsearchService {
  private config: ElasticsearchConfig
  private baseHeaders: Record<string, string>

  constructor(config: ElasticsearchConfig) {
    this.config = config
    this.baseHeaders = {
      'Authorization': `ApiKey ${config.apiKey}`,
      'Content-Type': 'application/json'
    }
  }

  /**
   * Index a new lead document
   */
  async indexLead(lead: LeadDocument): Promise<boolean> {
    try {
      const response = await fetch(`${this.config.endpoint}/${this.config.indices.leads}/_doc/${lead.id}`, {
        method: 'PUT',
        headers: this.baseHeaders,
        body: JSON.stringify({
          ...lead,
          '@timestamp': new Date().toISOString()
        })
      })
      return response.ok
    } catch (error) {
      console.error('Failed to index lead:', error)
      return false
    }
  }

  /**
   * Search leads with advanced filtering
   */
  async searchLeads(query: {
    clientId?: string
    status?: string[]
    source?: string[]
    leadScoreMin?: number
    dateRange?: { from: string; to: string }
    searchTerm?: string
    size?: number
    from?: number
  }): Promise<{ hits: LeadDocument[]; total: number }> {
    try {
      const searchBody = {
        query: {
          bool: {
            must: [] as any[],
            filter: [] as any[]
          }
        },
        sort: [{ createdAt: { order: 'desc' } }],
        size: query.size || 50,
        from: query.from || 0
      }

      // Add filters
      if (query.clientId) {
        searchBody.query.bool.filter.push({ term: { clientId: query.clientId } })
      }
      
      if (query.status?.length) {
        searchBody.query.bool.filter.push({ terms: { status: query.status } })
      }
      
      if (query.source?.length) {
        searchBody.query.bool.filter.push({ terms: { source: query.source } })
      }
      
      if (query.leadScoreMin) {
        searchBody.query.bool.filter.push({ range: { leadScore: { gte: query.leadScoreMin } } })
      }
      
      if (query.dateRange) {
        searchBody.query.bool.filter.push({
          range: {
            createdAt: {
              gte: query.dateRange.from,
              lte: query.dateRange.to
            }
          }
        })
      }
      
      if (query.searchTerm) {
        searchBody.query.bool.must.push({
          multi_match: {
            query: query.searchTerm,
            fields: ['name^2', 'email^2', 'business^1.5', 'metadata.*']
          }
        })
      }

      const response = await fetch(`${this.config.endpoint}/${this.config.indices.leads}/_search`, {
        method: 'POST',
        headers: this.baseHeaders,
        body: JSON.stringify(searchBody)
      })

      if (!response.ok) throw new Error(`Search failed: ${response.statusText}`)

      const result = await response.json()
      
      return {
        hits: result.hits.hits.map((hit: any) => hit._source),
        total: result.hits.total.value
      }
    } catch (error) {
      console.error('Lead search failed:', error)
      return { hits: [], total: 0 }
    }
  }

  /**
   * Index conversation data
   */
  async indexConversation(conversation: ConversationDocument): Promise<boolean> {
    try {
      const response = await fetch(`${this.config.endpoint}/${this.config.indices.conversations}/_doc/${conversation.id}`, {
        method: 'PUT',
        headers: this.baseHeaders,
        body: JSON.stringify({
          ...conversation,
          '@timestamp': new Date().toISOString()
        })
      })
      return response.ok
    } catch (error) {
      console.error('Failed to index conversation:', error)
      return false
    }
  }

  /**
   * Get analytics aggregations
   */
  async getAnalytics(clientId: string, dateRange: { from: string; to: string }): Promise<{
    leadStats: any
    conversationStats: any
    performanceStats: any
  }> {
    try {
      const aggregationQuery = {
        query: {
          bool: {
            filter: [
              { term: { clientId } },
              { range: { createdAt: { gte: dateRange.from, lte: dateRange.to } } }
            ]
          }
        },
        size: 0,
        aggs: {
          lead_stats: {
            terms: { field: 'status' },
            aggs: {
              avg_score: { avg: { field: 'leadScore' } }
            }
          },
          source_breakdown: {
            terms: { field: 'source' }
          },
          daily_leads: {
            date_histogram: {
              field: 'createdAt',
              calendar_interval: 'day'
            }
          },
          conversion_rate: {
            filter: { term: { status: 'converted' } }
          }
        }
      }

      const response = await fetch(`${this.config.endpoint}/${this.config.indices.leads}/_search`, {
        method: 'POST',
        headers: this.baseHeaders,
        body: JSON.stringify(aggregationQuery)
      })

      if (!response.ok) throw new Error(`Analytics query failed: ${response.statusText}`)

      const result = await response.json()
      
      return {
        leadStats: result.aggregations.lead_stats,
        conversationStats: result.aggregations.daily_leads,
        performanceStats: {
          conversionRate: result.aggregations.conversion_rate.doc_count,
          sourceBreakdown: result.aggregations.source_breakdown
        }
      }
    } catch (error) {
      console.error('Analytics query failed:', error)
      return { leadStats: {}, conversationStats: {}, performanceStats: {} }
    }
  }

  /**
   * Update client metrics
   */
  async updateClientMetrics(clientId: string, metrics: Partial<ClientDocument['metrics']>): Promise<boolean> {
    try {
      const response = await fetch(`${this.config.endpoint}/${this.config.indices.clients}/_update/${clientId}`, {
        method: 'POST',
        headers: this.baseHeaders,
        body: JSON.stringify({
          doc: {
            metrics,
            updatedAt: new Date().toISOString()
          }
        })
      })
      return response.ok
    } catch (error) {
      console.error('Failed to update client metrics:', error)
      return false
    }
  }

  /**
   * Search conversations by content
   */
  async searchConversations(query: {
    clientId?: string
    searchTerm?: string
    outcome?: string[]
    dateRange?: { from: string; to: string }
    size?: number
  }): Promise<{ hits: ConversationDocument[]; total: number }> {
    try {
      const searchBody = {
        query: {
          bool: {
            must: [] as any[],
            filter: [] as any[]
          }
        },
        sort: [{ createdAt: { order: 'desc' } }],
        size: query.size || 50
      }

      if (query.clientId) {
        searchBody.query.bool.filter.push({ term: { clientId: query.clientId } })
      }
      
      if (query.outcome?.length) {
        searchBody.query.bool.filter.push({ terms: { outcome: query.outcome } })
      }
      
      if (query.dateRange) {
        searchBody.query.bool.filter.push({
          range: {
            createdAt: {
              gte: query.dateRange.from,
              lte: query.dateRange.to
            }
          }
        })
      }
      
      if (query.searchTerm) {
        searchBody.query.bool.must.push({
          nested: {
            path: 'messages',
            query: {
              match: {
                'messages.content': query.searchTerm
              }
            }
          }
        })
      }

      const response = await fetch(`${this.config.endpoint}/${this.config.indices.conversations}/_search`, {
        method: 'POST',
        headers: this.baseHeaders,
        body: JSON.stringify(searchBody)
      })

      if (!response.ok) throw new Error(`Conversation search failed: ${response.statusText}`)

      const result = await response.json()
      
      return {
        hits: result.hits.hits.map((hit: any) => hit._source),
        total: result.hits.total.value
      }
    } catch (error) {
      console.error('Conversation search failed:', error)
      return { hits: [], total: 0 }
    }
  }
}

// Export configured service instance
export const elasticsearchService = new ElasticsearchService({
  endpoint: process.env.REACT_APP_ELASTICSEARCH_ENDPOINT || 'https://tintbot-search.es.us-east-1.aws.found.io:9243',
  apiKey: process.env.REACT_APP_ELASTICSEARCH_API_KEY || '',
  indices: {
    leads: 'tintbot-leads',
    conversations: 'tintbot-conversations', 
    clients: 'tintbot-clients',
    analytics: 'tintbot-analytics'
  }
})

export type { LeadDocument, ConversationDocument, ClientDocument, AnalyticsDocument }
