
/**
 * Netlify Function for Email Subscription
 * Handles newsletter signups with validation and third-party integration
 */

exports.handler = async (event, context) => {
  // Only allow POST requests
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
    const { email, source } = JSON.parse(event.body)

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email || !emailRegex.test(email)) {
      return {
        statusCode: 400,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          error: 'Valid email address required',
          success: false 
        })
      }
    }

    // Log subscription attempt
    console.log(`New subscription attempt: ${email} from ${source || 'unknown'}`)

    // Here you would integrate with your email service
    // Examples: Mailchimp, ConvertKit, Klaviyo, etc.
    
    // For now, simulate success
    const subscriptionData = {
      email,
      source: source || 'website',
      timestamp: new Date().toISOString(),
      ip: event.headers['x-forwarded-for'] || event.headers['client-ip'],
      userAgent: event.headers['user-agent']
    }

    // TODO: Replace with actual email service integration
    // await addToMailingList(subscriptionData)

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        success: true,
        message: 'Successfully subscribed to updates!',
        email: email
      })
    }

  } catch (error) {
    console.error('Subscription error:', error)
    
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        error: 'Failed to process subscription',
        success: false 
      })
    }
  }
}
