/**
 * Render Express Server for Tintbot.ai
 * Handles both frontend serving and API routes
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

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, '../dist')))

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() })
})

// API Routes

/**
 * Capture lead from chatbot
 */
app.post('/api/capture-lead', async (req, res) => {
  try {
    const leadData = req.body
    const leadId = `LEAD_${Date.now()}`
    
    // Calculate lead score
    const leadScore = calculateLeadScore(leadData)
    
    // Insert into database
    const query = `
      INSERT INTO leads (
        lead_id, client_id, name, email, phone, business,
        vehicle_info, service_preferences, lead_score, conversation_data
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING *
    `
    
    const values = [
      leadId,
      leadData.clientId || 'default',
      leadData.name,
      leadData.email,
      leadData.phone,
      leadData.business,
      JSON.stringify(leadData.vehicleInfo || {}),
      JSON.stringify(leadData.servicePreferences || {}),
      leadScore,
      JSON.stringify(leadData.conversationData || {})
    ]
    
    const result = await pool.query(query, values)
    const lead = result.rows[0]
    
    // Trigger automation if high score
    if (leadScore >= 70) {
      // Queue background job for automation
      await triggerAutomation(lead)
    }
    
    res.json({
      success: true,
      leadId,
      leadScore,
      message: 'Lead captured successfully'
    })
    
  } catch (error) {
    console.error('Lead capture error:', error)
    res.status(500).json({ error: 'Failed to capture lead' })
  }
})

/**
 * Get client configuration
 */
app.get('/api/client/:clientId', async (req, res) => {
  try {
    const { clientId } = req.params
    
    const query = 'SELECT * FROM clients WHERE client_id = $1'
    const result = await pool.query(query, [clientId])
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Client not found' })
    }
    
    res.json(result.rows[0])
    
  } catch (error) {
    console.error('Client fetch error:', error)
    res.status(500).json({ error: 'Failed to fetch client' })
  }
})

/**
 * Webhook handler for integrations
 */
app.post('/api/webhook/:clientId', async (req, res) => {
  try {
    const { clientId } = req.params
    const webhookData = req.body
    
    // Log webhook data
    console.log(`Webhook received for ${clientId}:`, webhookData)
    
    // Process based on webhook type
    await processWebhook(clientId, webhookData)
    
    res.json({ success: true, message: 'Webhook processed' })
    
  } catch (error) {
    console.error('Webhook error:', error)
    res.status(500).json({ error: 'Webhook processing failed' })
  }
})

/**
 * Analytics endpoint
 */
app.get('/api/analytics/:clientId', async (req, res) => {
  try {
    const { clientId } = req.params
    const { startDate, endDate } = req.query
    
    const query = `
      SELECT 
        COUNT(*) as total_leads,
        AVG(lead_score) as avg_lead_score,
        COUNT(*) FILTER (WHERE status = 'converted') as conversions,
        DATE(created_at) as date
      FROM leads 
      WHERE client_id = $1 
        AND created_at >= $2 
        AND created_at <= $3
      GROUP BY DATE(created_at)
      ORDER BY date DESC
    `
    
    const result = await pool.query(query, [clientId, startDate, endDate])
    
    res.json({
      analytics: result.rows,
      summary: {
        totalLeads: result.rows.reduce((sum, row) => sum + parseInt(row.total_leads), 0),
        avgScore: result.rows.reduce((sum, row) => sum + parseFloat(row.avg_lead_score), 0) / result.rows.length,
        conversionRate: result.rows.reduce((sum, row) => sum + parseInt(row.conversions), 0) / result.rows.reduce((sum, row) => sum + parseInt(row.total_leads), 0) * 100
      }
    })
    
  } catch (error) {
    console.error('Analytics error:', error)
    res.status(500).json({ error: 'Failed to fetch analytics' })
  }
})

// Serve React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'))
})

// Helper functions
function calculateLeadScore(leadData) {
  let score = 0
  
  if (leadData.name) score += 20
  if (leadData.email) score += 20
  if (leadData.phone) score += 15
  if (leadData.vehicleInfo?.make) score += 15
  if (leadData.servicePreferences?.tintType) score += 15
  if (leadData.servicePreferences?.budget) score += 10
  if (leadData.conversationData?.readyToBook) score += 25
  
  return Math.min(score, 100)
}

async function triggerAutomation(lead) {
  // Get client integrations
  const clientQuery = 'SELECT integrations FROM clients WHERE client_id = $1'
  const clientResult = await pool.query(clientQuery, [lead.client_id])
  
  if (clientResult.rows.length === 0) return
  
  const integrations = clientResult.rows[0].integrations
  
  // Trigger HubSpot, Zapier, etc. (implement as needed)
  console.log(`Triggering automation for lead ${lead.lead_id}`)
}

async function processWebhook(clientId, data) {
  // Process webhook data (implement as needed)
  console.log(`Processing webhook for ${clientId}`)
}

app.listen(PORT, () => {
  console.log(`🚀 Tintbot.ai server running on port ${PORT}`)
})
