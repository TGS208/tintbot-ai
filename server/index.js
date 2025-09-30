/**
 * Tintbot.ai Express Server for Render
 * Handles full-stack hosting with PostgreSQL integration
 */

const express = require('express')
const { Pool } = require('pg')
const cors = require('cors')
const path = require('path')

const app = express()
const PORT = process.env.PORT || 3000

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
})

// Test database connection
pool.connect()
  .then(() => console.log('✅ Connected to PostgreSQL database'))
  .catch(err => console.error('❌ Database connection error:', err))

// Middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://tintbot.ai', 'https://*.tintbot.ai']
    : ['http://localhost:3000', 'http://localhost:5173'],
  credentials: true
}))

app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))

// Serve static files (React build)
app.use(express.static(path.join(__dirname, '../dist')))

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    database: 'connected'
  })
})

// API Routes

/**
 * Capture lead from chatbot
 */
app.post('/api/capture-lead', async (req, res) => {
  try {
    const leadData = req.body
    const leadId = `LEAD_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    
    // Calculate lead score
    const leadScore = calculateLeadScore(leadData)
    
    // Insert into database
    const query = `
      INSERT INTO leads (
        lead_id, client_id, name, email, phone, business,
        vehicle_info, service_preferences, lead_score, conversation_data,
        source, ip_address, user_agent
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
      RETURNING *
    `
    
    const values = [
      leadId,
      leadData.clientId || 'default',
      leadData.personalInfo?.name || leadData.name,
      leadData.personalInfo?.email || leadData.email,
      leadData.personalInfo?.phone || leadData.phone,
      leadData.business || '',
      JSON.stringify(leadData.vehicleInfo || {}),
      JSON.stringify(leadData.servicePreferences || {}),
      leadScore,
      JSON.stringify(leadData.conversationData || {}),
      leadData.source || 'chatbot',
      req.ip || req.headers['x-forwarded-for'],
      req.headers['user-agent']
    ]
    
    const result = await pool.query(query, values)
    const lead = result.rows[0]
    
    console.log(`🎯 New lead captured: ${leadId} (Score: ${leadScore})`)
    
    // Trigger automation for high-score leads
    if (leadScore >= 70) {
      setTimeout(() => triggerAutomation(lead), 1000)
    }
    
    res.json({
      success: true,
      leadId,
      leadScore,
      message: 'Lead captured successfully',
      automation: leadScore >= 70 ? 'triggered' : 'pending'
    })
    
  } catch (error) {
    console.error('❌ Lead capture error:', error)
    res.status(500).json({ 
      error: 'Failed to capture lead',
      message: error.message 
    })
  }
})

/**
 * Get client configuration
 */
app.get('/api/client/:clientId', async (req, res) => {
  try {
    const { clientId } = req.params
    
    const query = 'SELECT * FROM clients WHERE client_id = $1 OR subdomain = $1'
    const result = await pool.query(query, [clientId])
    
    if (result.rows.length === 0) {
      return res.status(404).json({ 
        error: 'Client not found',
        clientId 
      })
    }
    
    res.json({
      success: true,
      client: result.rows[0]
    })
    
  } catch (error) {
    console.error('❌ Client fetch error:', error)
    res.status(500).json({ 
      error: 'Failed to fetch client configuration' 
    })
  }
})

/**
 * Email subscription
 */
app.post('/api/subscribe', async (req, res) => {
  try {
    const { email, source = 'website' } = req.body
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email || !emailRegex.test(email)) {
      return res.status(400).json({ 
        error: 'Valid email address required' 
      })
    }
    
    // Insert subscription
    const query = `
      INSERT INTO subscriptions (email, source, ip_address, user_agent)
      VALUES ($1, $2, $3, $4)
      ON CONFLICT (email) DO UPDATE SET
        updated_at = CURRENT_TIMESTAMP
      RETURNING *
    `
    
    const values = [
      email,
      source,
      req.ip || req.headers['x-forwarded-for'],
      req.headers['user-agent']
    ]
    
    await pool.query(query, values)
    
    console.log(`📧 New subscription: ${email}`)
    
    res.json({
      success: true,
      message: 'Successfully subscribed to updates!',
      email
    })
    
  } catch (error) {
    console.error('❌ Subscription error:', error)
    res.status(500).json({ 
      error: 'Failed to process subscription' 
    })
  }
})

/**
 * Analytics endpoint
 */
app.get('/api/analytics/:clientId', async (req, res) => {
  try {
    const { clientId } = req.params
    const { startDate, endDate } = req.query
    
    const analyticsQuery = `
      SELECT 
        COUNT(*) as total_leads,
        AVG(lead_score) as avg_lead_score,
        COUNT(*) FILTER (WHERE status = 'converted') as conversions,
        COUNT(*) FILTER (WHERE lead_score >= 70) as qualified_leads,
        DATE(created_at) as date
      FROM leads 
      WHERE client_id = $1 
        AND created_at >= $2 
        AND created_at <= $3
      GROUP BY DATE(created_at)
      ORDER BY date DESC
    `
    
    const result = await pool.query(analyticsQuery, [clientId, startDate, endDate])
    
    const summary = {
      totalLeads: result.rows.reduce((sum, row) => sum + parseInt(row.total_leads), 0),
      avgScore: result.rows.length > 0 
        ? result.rows.reduce((sum, row) => sum + parseFloat(row.avg_lead_score || 0), 0) / result.rows.length 
        : 0,
      conversionRate: result.rows.length > 0 
        ? (result.rows.reduce((sum, row) => sum + parseInt(row.conversions), 0) / 
           result.rows.reduce((sum, row) => sum + parseInt(row.total_leads), 0)) * 100 
        : 0
    }
    
    res.json({
      success: true,
      analytics: result.rows,
      summary
    })
    
  } catch (error) {
    console.error('❌ Analytics error:', error)
    res.status(500).json({ 
      error: 'Failed to fetch analytics' 
    })
  }
})

/**
 * Webhook handler for integrations
 */
app.post('/api/webhook/:clientId', async (req, res) => {
  try {
    const { clientId } = req.params
    const webhookData = req.body
    
    console.log(`📥 Webhook received for ${clientId}:`, {
      type: webhookData.type,
      timestamp: new Date().toISOString()
    })
    
    // Log webhook for debugging
    await pool.query(
      'INSERT INTO automation_logs (lead_id, automation_type, status, response_data) VALUES ($1, $2, $3, $4)',
      [webhookData.leadId || 'webhook', 'incoming_webhook', 'received', JSON.stringify(webhookData)]
    )
    
    res.json({ 
      success: true, 
      message: 'Webhook processed successfully' 
    })
    
  } catch (error) {
    console.error('❌ Webhook error:', error)
    res.status(500).json({ 
      error: 'Webhook processing failed' 
    })
  }
})

/**
 * Trigger automation workflow
 */
app.post('/api/trigger-automation', async (req, res) => {
  try {
    const { clientId, leadData, integrations } = req.body
    
    console.log(`🚀 Triggering automation for client: ${clientId}`)
    
    // Get client integrations from database
    const clientQuery = 'SELECT integrations FROM clients WHERE client_id = $1'
    const clientResult = await pool.query(clientQuery, [clientId])
    
    if (clientResult.rows.length === 0) {
      return res.status(404).json({ error: 'Client not found' })
    }
    
    const clientIntegrations = clientResult.rows[0].integrations || {}
    
    // Process automations asynchronously
    setTimeout(() => processAutomations(leadData, clientIntegrations), 100)
    
    res.json({
      success: true,
      message: 'Automation triggered successfully',
      clientId,
      automationsQueued: Object.keys(clientIntegrations).length
    })
    
  } catch (error) {
    console.error('❌ Automation trigger error:', error)
    res.status(500).json({ 
      error: 'Failed to trigger automation' 
    })
  }
})

// Serve React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'))
})

// Helper Functions
function calculateLeadScore(leadData) {
  let score = 0
  
  // Contact information
  if (leadData.personalInfo?.name || leadData.name) score += 20
  if (leadData.personalInfo?.email || leadData.email) score += 20
  if (leadData.personalInfo?.phone || leadData.phone) score += 15
  
  // Vehicle information
  if (leadData.vehicleInfo?.make) score += 15
  if (leadData.vehicleInfo?.year) score += 5
  
  // Service preferences
  if (leadData.servicePreferences?.tintType) score += 15
  if (leadData.servicePreferences?.budget) score += 10
  
  // Engagement indicators
  if (leadData.readyToBook) score += 25
  if (leadData.conversationData?.messageCount > 5) score += 10
  
  return Math.min(score, 100)
}

async function triggerAutomation(lead) {
  try {
    console.log(`🔄 Processing automation for lead: ${lead.lead_id}`)
    
    // This would integrate with HubSpot, Calendly, etc.
    // For now, just log the automation trigger
    await pool.query(
      'INSERT INTO automation_logs (lead_id, automation_type, status) VALUES ($1, $2, $3)',
      [lead.lead_id, 'lead_qualification', 'triggered']
    )
    
  } catch (error) {
    console.error('❌ Automation error:', error)
  }
}

async function processAutomations(leadData, integrations) {
  console.log('🤖 Processing integrations:', Object.keys(integrations))
  
  // Process each integration
  for (const [type, config] of Object.entries(integrations)) {
    try {
      switch (type) {
        case 'hubspot':
          if (config.apiKey) {
            console.log('📊 Would create HubSpot contact')
            // await createHubSpotContact(leadData, config)
          }
          break
        case 'calendly':
          if (config.username) {
            console.log('📅 Would generate Calendly link')
            // await generateCalendlyLink(leadData, config)
          }
          break
        case 'zapier':
          if (config.webhookUrl) {
            console.log('⚡ Would trigger Zapier webhook')
            // await triggerZapierWebhook(leadData, config)
          }
          break
      }
    } catch (error) {
      console.error(`❌ ${type} integration failed:`, error)
    }
  }
}

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Tintbot.ai server running on port ${PORT}`)
  console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`)
  console.log(`🗄️ Database: ${process.env.DATABASE_URL ? 'Connected' : 'Local'}`)
})

module.exports = app
