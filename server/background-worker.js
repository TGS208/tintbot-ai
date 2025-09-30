/**
 * Background Worker for Render
 * Processes automation workflows and integrations
 */

const { Pool } = require('pg')

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
})

/**
 * Process automation queue
 * Runs continuously as Render background service
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
        AND l.created_at > NOW() - INTERVAL '24 hours'
      ORDER BY l.created_at ASC
      LIMIT 10
    `
    
    const result = await pool.query(query)
    const leads = result.rows
    
    if (leads.length === 0) {
      console.log('📭 No leads to process')
      return
    }
    
    console.log(`📨 Found ${leads.length} leads to process`)
    
    for (const lead of leads) {
      await processLeadAutomation(lead)
      
      // Mark as processed
      await pool.query(
        'UPDATE leads SET automation_triggered = true, updated_at = CURRENT_TIMESTAMP WHERE lead_id = $1',
        [lead.lead_id]
      )
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
  
  try {
    console.log(`🚀 Processing automation for lead: ${lead.lead_id}`)
    
    // HubSpot Integration
    if (integrations.hubspot?.apiKey) {
      await createHubSpotContact(lead, integrations.hubspot)
    }
    
    // Calendly Integration
    if (integrations.calendly?.username) {
      await generateCalendlyLink(lead, integrations.calendly)
    }
    
    // Zapier Integration
    if (integrations.zapier?.webhookUrl) {
      await triggerZapierWebhook(lead, integrations.zapier)
    }
    
    // SMS Notification
    if (integrations.notifications?.enabled) {
      await sendNotifications(lead, integrations.notifications)
    }
    
    console.log(`✅ Automation completed for lead: ${lead.lead_id}`)
    
  } catch (error) {
    console.error(`❌ Automation failed for lead ${lead.lead_id}:`, error)
    
    // Log error
    await pool.query(
      'INSERT INTO automation_logs (lead_id, automation_type, status, error_message) VALUES ($1, $2, $3, $4)',
      [lead.lead_id, 'automation_error', 'failed', error.message]
    )
  }
}

// Integration Functions
async function createHubSpotContact(lead, hubspotConfig) {
  console.log(`📊 Creating HubSpot contact for ${lead.name}`)
  
  const contactData = {
    properties: {
      firstname: lead.name?.split(' ')[0] || '',
      lastname: lead.name?.split(' ').slice(1).join(' ') || '',
      email: lead.email || '',
      phone: lead.phone || '',
      company: lead.business || '',
      
      // Custom properties
      vehicle_info: JSON.stringify(lead.vehicle_info),
      service_preferences: JSON.stringify(lead.service_preferences),
      lead_score: lead.lead_score,
      tintbot_lead_id: lead.lead_id,
      
      // Lead tracking
      hs_lead_status: 'NEW',
      lead_source: 'Tintbot AI Chat'
    }
  }

  if (hubspotConfig.apiKey && hubspotConfig.apiKey !== 'demo') {
    try {
      const response = await fetch('https://api.hubapi.com/crm/v3/objects/contacts', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${hubspotConfig.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(contactData)
      })

      if (response.ok) {
        const contact = await response.json()
        console.log('✅ HubSpot contact created:', contact.id)
        
        // Update lead with HubSpot ID
        await pool.query(
          'UPDATE leads SET hubspot_contact_id = $1 WHERE lead_id = $2',
          [contact.id, lead.lead_id]
        )
        
        return contact
      } else {
        throw new Error(`HubSpot API error: ${response.statusText}`)
      }
    } catch (error) {
      console.error('❌ HubSpot integration failed:', error)
      throw error
    }
  } else {
    console.log('📊 HubSpot demo mode - contact would be created')
    return { id: 'demo_contact_' + Date.now() }
  }
}

async function generateCalendlyLink(lead, calendlyConfig) {
  console.log(`📅 Generating Calendly link for ${lead.name}`)
  
  const calendlyBase = `https://calendly.com/${calendlyConfig.username}/tint-consultation`
  
  const params = new URLSearchParams({
    name: lead.name || '',
    email: lead.email || '',
    a1: `Vehicle: ${JSON.stringify(lead.vehicle_info)}`,
    a2: `Services: ${JSON.stringify(lead.service_preferences)}`,
    a3: `Lead Score: ${lead.lead_score}`,
    a4: `Phone: ${lead.phone || 'Not provided'}`
  })

  const calendlyLink = `${calendlyBase}?${params.toString()}`
  
  // Store link in lead record
  await pool.query(
    'UPDATE leads SET calendly_link = $1 WHERE lead_id = $2',
    [calendlyLink, lead.lead_id]
  )
  
  console.log('✅ Calendly link generated and stored')
  return { calendlyLink }
}

async function triggerZapierWebhook(lead, zapierConfig) {
  console.log(`⚡ Triggering Zapier webhook for ${lead.name}`)
  
  const webhookData = {
    // Flattened data for Zapier
    lead_id: lead.lead_id,
    name: lead.name || '',
    email: lead.email || '',
    phone: lead.phone || '',
    business: lead.business || '',
    
    // Vehicle info (flattened)
    vehicle_year: lead.vehicle_info?.year || '',
    vehicle_make: lead.vehicle_info?.make || '',
    vehicle_model: lead.vehicle_info?.model || '',
    vehicle_type: lead.vehicle_info?.type || '',
    
    // Service preferences (flattened)
    tint_type: lead.service_preferences?.tintType || '',
    tint_darkness: lead.service_preferences?.darkness || '',
    coverage: lead.service_preferences?.coverage || '',
    budget: lead.service_preferences?.budget || '',
    timeline: lead.service_preferences?.timeline || '',
    
    // Metadata
    lead_score: lead.lead_score,
    source: lead.source,
    created_at: lead.created_at,
    timestamp: new Date().toISOString()
  }

  if (zapierConfig.webhookUrl && zapierConfig.webhookUrl !== 'demo') {
    try {
      const response = await fetch(zapierConfig.webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(webhookData)
      })

      if (response.ok) {
        console.log('✅ Zapier webhook triggered successfully')
        return { success: true, timestamp: new Date().toISOString() }
      } else {
        throw new Error(`Zapier webhook error: ${response.statusText}`)
      }
    } catch (error) {
      console.error('❌ Zapier webhook failed:', error)
      throw error
    }
  } else {
    console.log('⚡ Zapier demo mode - webhook would be triggered')
    return { success: true, demo: true }
  }
}

async function sendNotifications(lead, notificationConfig) {
  console.log(`📱 Sending notifications for ${lead.name}`)
  
  // Business notification
  const businessMessage = `🚗 New qualified lead: ${lead.name} - ${lead.email} - Score: ${lead.lead_score}/100`
  
  // Customer follow-up message
  const customerMessage = `Hi ${lead.name}! Thanks for your interest in window tinting. We'll contact you within 15 minutes with pricing and availability.`
  
  // In production, integrate with Twilio, SendGrid, etc.
  console.log('📱 Business SMS:', businessMessage)
  console.log('📧 Customer Email:', customerMessage)
  
  // Log notifications
  await pool.query(
    'INSERT INTO automation_logs (lead_id, automation_type, status, response_data) VALUES ($1, $2, $3, $4)',
    [lead.lead_id, 'notifications', 'sent', JSON.stringify({ businessMessage, customerMessage })]
  )
  
  return { 
    businessNotification: 'sent',
    customerNotification: 'sent',
    timestamp: new Date().toISOString()
  }
}

// Main worker loop
async function startWorker() {
  console.log('🚀 Starting Tintbot.ai background worker...')
  
  // Process queue every 30 seconds
  setInterval(async () => {
    await processAutomationQueue()
  }, 30000)
  
  // Initial run
  await processAutomationQueue()
}

// Start worker if run directly
if (require.main === module) {
  startWorker()
    .then(() => {
      console.log('✅ Background worker started successfully')
    })
    .catch((error) => {
      console.error('❌ Background worker failed to start:', error)
      process.exit(1)
    })
}

module.exports = { processAutomationQueue, startWorker }
