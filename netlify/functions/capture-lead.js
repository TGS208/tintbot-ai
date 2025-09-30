/**
 * Netlify Function for Lead Capture
 * Saves assessment leads and sends notifications
 */

exports.handler = async (event, context) => {
  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: ''
    }
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: {
        'Allow': 'POST',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST'
      },
      body: JSON.stringify({ error: 'Method not allowed' })
    }
  }

  try {
    const leadData = JSON.parse(event.body)
    
    // Enhanced lead data with metadata
    const enrichedLead = {
      ...leadData,
      ip: event.headers['x-forwarded-for'] || event.headers['client-ip'] || 'unknown',
      userAgent: event.headers['user-agent'] || 'unknown',
      referer: event.headers.referer || 'direct',
      timestamp: new Date().toISOString(),
      leadScore: calculateLeadScore(leadData),
      utm: extractUtmParams(event.headers.referer)
    }
    
    // Log the lead (visible in Netlify Functions logs)
    console.log('🎯 New Business Assessment Lead:', {
      name: enrichedLead.name,
      email: enrichedLead.email,
      business: enrichedLead.business,
      leadScore: enrichedLead.leadScore,
      timestamp: enrichedLead.timestamp
    })

    // TODO: Integrate with your preferred service:
    // await sendToGoogleSheets(enrichedLead)
    // await sendToEmailService(enrichedLead)
    // await sendToCRM(enrichedLead)
    
    // Send immediate notification (you can add email service here)
    await sendSlackNotification(enrichedLead) // Optional Slack integration
    
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        success: true,
        message: 'Lead captured successfully',
        leadId: `LEAD_${Date.now()}`,
        leadScore: enrichedLead.leadScore
      })
    }

  } catch (error) {
    console.error('❌ Lead capture error:', error)
    
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        error: 'Failed to capture lead',
        success: false,
        details: error.message
      })
    }
  }
}

// Helper function to calculate lead quality score
function calculateLeadScore(leadData) {
  let score = 0
  
  // Basic info provided
  if (leadData.name) score += 20
  if (leadData.email) score += 20
  if (leadData.phone) score += 15
  if (leadData.business) score += 20
  
  // Challenge description quality
  if (leadData.challenges) {
    const challengeLength = leadData.challenges.length
    if (challengeLength > 10) score += 10
    if (challengeLength > 50) score += 10
    if (challengeLength > 100) score += 5
  }
  
  return Math.min(score, 100)
}

// Extract UTM parameters for tracking
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

// Optional: Send Slack notification
async function sendSlackNotification(leadData) {
  const SLACK_WEBHOOK = process.env.SLACK_WEBHOOK_URL
  if (!SLACK_WEBHOOK) return
  
  try {
    await fetch(SLACK_WEBHOOK, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: `🎯 New Business Assessment Lead!`,
        blocks: [
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: `*New Business Assessment Lead*\n*Name:* ${leadData.name}\n*Email:* ${leadData.email}\n*Business:* ${leadData.business}\n*Lead Score:* ${leadData.leadScore}/100`
            }
          }
        ]
      })
    })
  } catch (error) {
    console.error('Slack notification failed:', error)
  }
}
