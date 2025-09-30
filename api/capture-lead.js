/**
 * Vercel API Route for Lead Capture
 * Migrated from Netlify Functions
 */

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const leadData = req.body
    
    // Enhanced lead data with metadata
    const enrichedLead = {
      ...leadData,
      ip: req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || 'unknown',
      userAgent: req.headers['user-agent'] || 'unknown',
      referer: req.headers.referer || 'direct',
      timestamp: new Date().toISOString(),
      leadScore: calculateLeadScore(leadData),
      utm: extractUtmParams(req.headers.referer)
    }
    
    // Log the lead
    console.log('🎯 New Business Assessment Lead:', {
      name: enrichedLead.name,
      email: enrichedLead.email,
      business: enrichedLead.business,
      leadScore: enrichedLead.leadScore,
      timestamp: enrichedLead.timestamp
    })

    // Optional: Send notifications
    if (process.env.SLACK_WEBHOOK_URL) {
      await sendSlackNotification(enrichedLead)
    }
    
    return res.status(200).json({ 
      success: true,
      message: 'Lead captured successfully',
      leadId: `LEAD_${Date.now()}`,
      leadScore: enrichedLead.leadScore
    })

  } catch (error) {
    console.error('❌ Lead capture error:', error)
    
    return res.status(500).json({ 
      error: 'Failed to capture lead',
      success: false,
      details: error.message
    })
  }
}

// Helper functions (same as before)
function calculateLeadScore(leadData) {
  let score = 0
  
  if (leadData.name) score += 20
  if (leadData.email) score += 20
  if (leadData.phone) score += 15
  if (leadData.business) score += 20
  
  if (leadData.challenges) {
    const challengeLength = leadData.challenges.length
    if (challengeLength > 10) score += 10
    if (challengeLength > 50) score += 10
    if (challengeLength > 100) score += 5
  }
  
  return Math.min(score, 100)
}

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
