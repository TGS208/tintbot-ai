
/**
 * Netlify Function for Chatbot Webhooks
 * Handles incoming webhooks from Aminos and other chatbot providers
 */

exports.handler = async (event, context) => {
  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS'
      },
      body: ''
    }
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ error: 'Method not allowed' })
    }
  }

  try {
    const webhookData = JSON.parse(event.body)
    const clientId = event.queryStringParameters?.client || 'default'
    
    // Log incoming webhook
    console.log(`Webhook received for client: ${clientId}`, {
      timestamp: new Date().toISOString(),
      source: event.headers['user-agent'],
      data: webhookData
    })

    // Process webhook based on type
    const response = await processWebhook(webhookData, clientId)

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(response)
    }

  } catch (error) {
    console.error('Webhook processing error:', error)
    
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        error: 'Webhook processing failed',
        success: false 
      })
    }
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
  // TODO: Integrate with analytics/CRM
  return { success: true, action: 'message_logged' }
}

async function handleConversationEnded(data, clientId) {
  // Handle conversation completion
  // TODO: Trigger follow-up sequences
  return { success: true, action: 'conversation_completed' }
}

async function handleLeadQualified(data, clientId) {
  // Handle qualified leads
  // TODO: Send to CRM, notify client, etc.
  return { success: true, action: 'lead_processed' }
}
