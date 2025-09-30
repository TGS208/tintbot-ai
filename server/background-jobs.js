/**
 * Render Background Jobs for Automation
 * Handles HubSpot, Zapier, Calendly integrations
 */

const { Pool } = require('pg')
const fetch = require('node-fetch')

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
})

/**
 * Process automation queue
 * Runs every 30 seconds via Render Cron Jobs
 */
async function processAutomationQueue() {
  try {
    console.log('🔄 Processing automation queue...')
    
    // Get unprocessed high-score leads
    const query = `
      SELECT l.*, c.integrations, c.business_name
      FROM leads l
      JOIN clients c ON l.client_id = c.client_id
      WHERE l.automation_triggered = false 
        AND l.lead_score >= 70
        AND l.created_at > NOW() - INTERVAL '1 hour'
      ORDER BY l.created_at ASC
      LIMIT 10
    `
    
    const result = await pool.query(query)
    const leads = result.rows
    
    console.log(`Found ${leads.length} leads to process`)
    
    for (const lead of leads) {
      await processLeadAutomation(lead)
    }
    
  } catch (error) {
    console.error('❌ Automation queue error:', error)
  }
}

/**
 * Process individual lead automation
 */
async function processLeadAutomation(lead) {
  const integrations = lead.integrations || {}
  const automationResults = []
  
  try {
    console.log(`🚀 Processing automation for lead: ${lead.lead_id}`)
    
    // 1. HubSpot Integration
    if (integrations.hubspot?.apiKey) {
      const hubspotResult = await createHubSpotContact(lead, integrations.hubspot)
      automationResults.push({ type: 'hubspot', result: hubspotResult })
    }
    
    // 2. Zapier Webhook
    if (integrations.zapier?.webhookUrl) {
      const zapierResult = await triggerZapierWebhook(lead, integrations.zapier)
      automationResults.push({ type: 'zapier', result: zapierResult })
    }
    
    // 3. Calendly Link Generation
    if (integrations.calendly?.username) {
      const calendlyResult = await generateCalendlyLink(lead, integrations.calendly)
      automationResults.push({ type: 'calendly', result: calendlyResult })
    }
    
    // 4. SMS Notifications
    if (integrations.notifications?.businessPhone) {
      const smsResult = await sendBusinessNotification(lead, integrations.notifications)
      automationResults.push({ type: 'sms', result: smsResult })
    }
    
    // Mark as processed
    await pool.query(
      'UPDATE leads SET automation_triggered = true, updated_at = CURRENT_TIMESTAMP WHERE lead_id = $1',
      [lead.lead_id]
    )
    
    // Log automation results
    for (const result of automationResults) {
      await pool.query(
        'INSERT INTO automation_logs (lead_id, automation_type, status, response_data) VALUES ($1, $2, $3, $4)',
        [lead.lead_id, result.type, 'success', JSON.stringify(result.result)]
      )
    }
    
    console.log(`✅ Automation completed for lead: ${lead.lead_id}`)
    
  } catch (error) {
    console.error(`❌ Automation failed for lead ${lead.lead_id}:`, error)
    
    // Log error
    await pool.query(
      'INSERT INTO automation_logs (lead_id, automation_type, status, error_message) VALUES ($1, $2, $3, $4)',
      [lead.lead_id, 'general', 'error', error.message]
    )
  }
}

// Integration functions (same as before but with database logging)
async function createHubSpotContact(lead, hubspotConfig) {
  const contactData = {
    properties: {
      firstname: lead.name?.split(' ')[0] || '',
      lastname: lead.name?.split(' ').slice(1).join(' ') || '',
      email: lead.email || '',
      phone: lead.phone || '',
      vehicle_info: JSON.stringify(lead.vehicle_info),
      service_preferences: JSON.stringify(lead.service_preferences),
      lead_score: lead.lead_score,
      hs_lead_status: 'NEW',
      lead_source: 'Tintbot AI Chat'
    }
  }

  const response = await fetch('https://api.hubapi.com/crm/v3/objects/contacts', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${hubspotConfig.apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(contactData)
  })

  if (!response.ok) {
    throw new Error(`HubSpot API error: ${response.statusText}`)
  }

  return await response.json()
}

async function triggerZapierWebhook(lead, zapierConfig) {
  const webhookData = {
    name: lead.name || '',
    email: lead.email || '',
    phone: lead.phone || '',
    vehicle_info: lead.vehicle_info,
    service_preferences: lead.service_preferences,
    lead_score: lead.lead_score,
    timestamp: new Date().toISOString(),
    source: 'Tintbot AI'
  }

  const response = await fetch(zapierConfig.webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(webhookData)
  })

  if (!response.ok) {
    throw new Error(`Zapier webhook error: ${response.statusText}`)
  }

  return { success: true, timestamp: new Date().toISOString() }
}

async function generateCalendlyLink(lead, calendlyConfig) {
  const calendlyBase = `https://calendly.com/${calendlyConfig.username}/tint-consultation`
  
  const params = new URLSearchParams({
    name: lead.name || '',
    email: lead.email || '',
    a1: `Vehicle: ${JSON.stringify(lead.vehicle_info)}`,
    a2: `Services: ${JSON.stringify(lead.service_preferences)}`,
    a3: `Lead Score: ${lead.lead_score}`
  })

  return {
    calendlyLink: `${calendlyBase}?${params.toString()}`,
    generatedAt: new Date().toISOString()
  }
}

async function sendBusinessNotification(lead, notifications) {
  // In production, integrate with Twilio or similar
  const message = `🚗 High-score lead (${lead.lead_score}/100): ${lead.name} - ${lead.email}`
  
  console.log(`📱 SMS Notification: ${message}`)
  
  return {
    message: 'SMS notification sent',
    recipient: notifications.businessPhone,
    timestamp: new Date().toISOString()
  }
}

// Run if called directly (for Render Cron Jobs)
if (require.main === module) {
  processAutomationQueue()
    .then(() => {
      console.log('✅ Automation queue processing completed')
      process.exit(0)
    })
    .catch((error) => {
      console.error('❌ Automation queue processing failed:', error)
      process.exit(1)
    })
}

module.exports = { processAutomationQueue }
