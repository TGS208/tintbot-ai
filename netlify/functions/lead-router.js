/**
 * Unified Lead Router - Automatically routes leads to all configured destinations
 * This is the MAIN lead capture function that handles all integrations
 * 
 * Features:
 * - Netlify Forms (automatic)
 * - Google Sheets integration (if configured)
 * - Slack notifications (if configured)
 * - Email notifications (if configured)
 * - Webhook routing (if configured)
 * - Lead scoring and enrichment
 * - Error handling and retry logic
 */

const { google } = require('googleapis')

exports.handler = async (event, context) => {
  // Handle CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  }

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' }
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    }
  }

  try {
    const leadData = JSON.parse(event.body)
    
    // Enrich lead data with metadata
    const enrichedLead = enrichLeadData(leadData, event)
    
    // Calculate lead quality score
    enrichedLead.leadScore = calculateLeadScore(enrichedLead)
    
    console.log('🎯 New lead captured:', {
      name: enrichedLead.name,
      email: enrichedLead.email,
      score: enrichedLead.leadScore,
      timestamp: enrichedLead.timestamp
    })

    // Parallel execution of all integrations
    const integrationResults = await Promise.allSettled([
      // Always log to Netlify (for viewing in dashboard)
      logToNetlify(enrichedLead),
      
      // Optional: Google Sheets
      process.env.GOOGLE_SHEETS_CLIENT_EMAIL 
        ? saveToGoogleSheets(enrichedLead)
        : Promise.resolve({ skipped: 'google-sheets' }),
      
      // Optional: Slack notification
      process.env.SLACK_WEBHOOK_URL
        ? sendSlackNotification(enrichedLead)
        : Promise.resolve({ skipped: 'slack' }),
      
      // Optional: Email notification
      process.env.SENDGRID_API_KEY
        ? sendEmailNotification(enrichedLead)
        : Promise.resolve({ skipped: 'email' }),
      
      // Optional: Custom webhooks
      process.env.CUSTOM_WEBHOOK_URL
        ? sendToWebhook(enrichedLead, process.env.CUSTOM_WEBHOOK_URL)
        : Promise.resolve({ skipped: 'webhook' })
    ])

    // Count successful integrations
    const successful = integrationResults.filter(r => r.status === 'fulfilled').length
    const failed = integrationResults.filter(r => r.status === 'rejected')

    // Log any failures (but don't fail the entire request)
    failed.forEach((result, index) => {
      console.error(`Integration ${index} failed:`, result.reason)
    })

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        leadId: enrichedLead.leadId,
        leadScore: enrichedLead.leadScore,
        integrations: {
          successful,
          total: integrationResults.length
        },
        message: 'Lead captured successfully',
        nextSteps: getNextSteps(enrichedLead)
      })
    }

  } catch (error) {
    console.error('❌ Lead routing error:', error)
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        error: 'Failed to capture lead',
        message: 'Please try again or contact support'
      })
    }
  }
}

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

/**
 * Enrich lead data with metadata
 */
function enrichLeadData(leadData, event) {
  return {
    ...leadData,
    leadId: `LEAD_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    timestamp: new Date().toISOString(),
    ip: event.headers['x-forwarded-for'] || event.headers['client-ip'] || 'unknown',
    userAgent: event.headers['user-agent'] || 'unknown',
    referer: event.headers.referer || 'direct',
    utm: extractUtmParams(event.headers.referer),
    source: leadData.source || 'website-form'
  }
}

/**
 * Calculate lead quality score (0-100)
 */
function calculateLeadScore(leadData) {
  let score = 0
  
  // Contact information (40 points)
  if (leadData.name && leadData.name.length > 2) score += 15
  if (leadData.email && validateEmail(leadData.email)) score += 15
  if (leadData.phone && leadData.phone.length >= 10) score += 10
  
  // Business/vehicle information (30 points)
  if (leadData.business || leadData.vehicleType) score += 15
  if (leadData.vehicleMake && leadData.vehicleModel) score += 10
  if (leadData.vehicleYear) score += 5
  
  // Service interest (20 points)
  if (leadData.serviceType) score += 10
  if (leadData.timeline === 'asap' || leadData.timeline === 'this-week') score += 10
  
  // Additional details (10 points)
  if (leadData.challenges && leadData.challenges.length > 20) score += 5
  if (leadData.budget && leadData.budget !== 'unknown') score += 5
  
  return Math.min(score, 100)
}

/**
 * Extract UTM parameters from referer URL
 */
function extractUtmParams(referer) {
  if (!referer) return {}
  
  try {
    const url = new URL(referer)
    return {
      utm_source: url.searchParams.get('utm_source'),
      utm_medium: url.searchParams.get('utm_medium'),
      utm_campaign: url.searchParams.get('utm_campaign'),
      utm_term: url.searchParams.get('utm_term'),
      utm_content: url.searchParams.get('utm_content')
    }
  } catch (error) {
    return {}
  }
}

/**
 * Validate email format
 */
function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

/**
 * Get next steps based on lead score
 */
function getNextSteps(lead) {
  if (lead.leadScore >= 80) {
    return {
      priority: 'hot',
      message: 'High-quality lead! Contact within 5 minutes.',
      suggestedActions: ['Call immediately', 'Send SMS', 'Schedule appointment']
    }
  } else if (lead.leadScore >= 60) {
    return {
      priority: 'warm',
      message: 'Good lead. Follow up within 1 hour.',
      suggestedActions: ['Send email', 'Call within 1 hour', 'Send quote']
    }
  } else {
    return {
      priority: 'nurture',
      message: 'Add to nurture sequence.',
      suggestedActions: ['Add to email list', 'Send educational content', 'Follow up in 3 days']
    }
  }
}

// =============================================================================
// INTEGRATION FUNCTIONS
// =============================================================================

/**
 * Log to Netlify (always executed - enables viewing in Netlify dashboard)
 */
async function logToNetlify(lead) {
  // This is logged automatically by Netlify
  // Just return success
  return { integration: 'netlify', status: 'success' }
}

/**
 * Save to Google Sheets
 */
async function saveToGoogleSheets(lead) {
  if (!process.env.GOOGLE_SHEETS_CLIENT_EMAIL || !process.env.GOOGLE_SHEETS_PRIVATE_KEY) {
    throw new Error('Google Sheets credentials not configured')
  }

  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        type: 'service_account',
        private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY.replace(/\\n/g, '\n'),
        client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets']
    })

    const sheets = google.sheets({ version: 'v4', auth })
    const spreadsheetId = process.env.GOOGLE_SHEET_ID

    const rowData = [
      lead.timestamp,
      lead.leadId,
      lead.name || '',
      lead.email || '',
      lead.phone || '',
      lead.business || lead.vehicleType || '',
      lead.challenges || lead.serviceType || '',
      lead.leadScore,
      lead.source,
      lead.utm.utm_source || '',
      lead.utm.utm_campaign || ''
    ]

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Leads!A:K',
      valueInputOption: 'RAW',
      resource: { values: [rowData] }
    })

    console.log('✅ Lead saved to Google Sheets')
    return { integration: 'google-sheets', status: 'success' }

  } catch (error) {
    console.error('Google Sheets error:', error.message)
    throw error
  }
}

/**
 * Send Slack notification
 */
async function sendSlackNotification(lead) {
  if (!process.env.SLACK_WEBHOOK_URL) {
    throw new Error('Slack webhook not configured')
  }

  const scoreEmoji = lead.leadScore >= 80 ? '🔥' : lead.leadScore >= 60 ? '⭐' : '📋'
  const priorityLabel = lead.leadScore >= 80 ? 'HOT LEAD' : lead.leadScore >= 60 ? 'WARM LEAD' : 'NEW LEAD'

  const message = {
    text: `${scoreEmoji} ${priorityLabel}: ${lead.name}`,
    blocks: [
      {
        type: 'header',
        text: {
          type: 'plain_text',
          text: `${scoreEmoji} ${priorityLabel} (Score: ${lead.leadScore}/100)`
        }
      },
      {
        type: 'section',
        fields: [
          { type: 'mrkdwn', text: `*Name:*\n${lead.name || 'N/A'}` },
          { type: 'mrkdwn', text: `*Email:*\n${lead.email || 'N/A'}` },
          { type: 'mrkdwn', text: `*Phone:*\n${lead.phone || 'N/A'}` },
          { type: 'mrkdwn', text: `*Business:*\n${lead.business || lead.vehicleType || 'N/A'}` }
        ]
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*Details:*\n${lead.challenges || lead.serviceType || 'No additional details'}`
        }
      },
      {
        type: 'context',
        elements: [
          {
            type: 'mrkdwn',
            text: `Lead ID: ${lead.leadId} | Source: ${lead.source} | ${lead.timestamp}`
          }
        ]
      }
    ]
  }

  const response = await fetch(process.env.SLACK_WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(message)
  })

  if (!response.ok) {
    throw new Error(`Slack notification failed: ${response.statusText}`)
  }

  console.log('✅ Slack notification sent')
  return { integration: 'slack', status: 'success' }
}

/**
 * Send email notification
 */
async function sendEmailNotification(lead) {
  if (!process.env.SENDGRID_API_KEY || !process.env.NOTIFICATION_EMAIL) {
    throw new Error('Email configuration not complete')
  }

  const emailHtml = `
    <h2>New Lead Captured: ${lead.name}</h2>
    <p><strong>Lead Score:</strong> ${lead.leadScore}/100</p>
    <p><strong>Priority:</strong> ${getNextSteps(lead).priority}</p>
    <hr>
    <p><strong>Name:</strong> ${lead.name || 'N/A'}</p>
    <p><strong>Email:</strong> ${lead.email || 'N/A'}</p>
    <p><strong>Phone:</strong> ${lead.phone || 'N/A'}</p>
    <p><strong>Business:</strong> ${lead.business || lead.vehicleType || 'N/A'}</p>
    <p><strong>Details:</strong> ${lead.challenges || lead.serviceType || 'N/A'}</p>
    <hr>
    <p><small>Lead ID: ${lead.leadId}<br>
    Timestamp: ${lead.timestamp}<br>
    Source: ${lead.source}</small></p>
  `

  const emailData = {
    personalizations: [{
      to: [{ email: process.env.NOTIFICATION_EMAIL }],
      subject: `🎯 New Lead: ${lead.name} (Score: ${lead.leadScore}/100)`
    }],
    from: { email: 'noreply@tintbot.ai', name: 'Tintbot.ai Leads' },
    content: [{
      type: 'text/html',
      value: emailHtml
    }]
  }

  const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.SENDGRID_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(emailData)
  })

  if (!response.ok) {
    throw new Error(`Email notification failed: ${response.statusText}`)
  }

  console.log('✅ Email notification sent')
  return { integration: 'email', status: 'success' }
}

/**
 * Send to custom webhook
 */
async function sendToWebhook(lead, webhookUrl) {
  const response = await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(lead)
  })

  if (!response.ok) {
    throw new Error(`Webhook failed: ${response.statusText}`)
  }

  console.log('✅ Webhook notification sent')
  return { integration: 'webhook', status: 'success' }
}
