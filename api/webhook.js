/**
 * Vercel API Route for Chatbot Webhooks
 * Migrated from Netlify Functions
 */

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const webhookData = req.body
    const clientId = req.query.client || 'default'
    
    // Log incoming webhook
    console.log(`Webhook received for client: ${clientId}`, {
      timestamp: new Date().toISOString(),
      source: req.headers['user-agent'],
      data: webhookData
    })

    // Process webhook based on type
    const response = await processWebhook(webhookData, clientId)

    return res.status(200).json(response)

  } catch (error) {
    console.error('Webhook processing error:', error)
    
    return res.status(500).json({ 
      error: 'Webhook processing failed',
      success: false 
    })
  }
}

async function processWebhook(data, clientId) {
  // Process different types of webhook events
  switch (data.event_type) {
    case 'message_received':
      return await handleMessageReceived(data, clientId)
    case 'conversation_ended':
      return await handleConversationEnded(data, clientId)
    case 'lead_qualified':
      return await handleLeadQualified(data, clientId)
    default:
      console.log('Unknown webhook event type:', data.event_type)
      return { success: true, message: 'Event logged' }
  }
}

async function handleMessageReceived(data, clientId) {
  // Handle incoming chat messages
  return { success: true, action: 'message_logged' }
}

async function handleConversationEnded(data, clientId) {
  // Handle conversation completion
  return { success: true, action: 'conversation_completed' }
}

async function handleLeadQualified(data, clientId) {
  // Handle qualified leads
  return { success: true, action: 'lead_processed' }
}
