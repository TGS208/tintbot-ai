/**
 * Vercel API Route for Email Subscription
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
    const { email, source } = req.body

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email || !emailRegex.test(email)) {
      return res.status(400).json({ 
        error: 'Valid email address required',
        success: false 
      })
    }

    // Log subscription attempt
    console.log(`New subscription attempt: ${email} from ${source || 'unknown'}`)

    // Create subscription data
    const subscriptionData = {
      email,
      source: source || 'website',
      timestamp: new Date().toISOString(),
      ip: req.headers['x-forwarded-for'] || req.headers['x-real-ip'],
      userAgent: req.headers['user-agent']
    }

    // TODO: Replace with actual email service integration
    // await addToMailingList(subscriptionData)

    return res.status(200).json({ 
      success: true,
      message: 'Successfully subscribed to updates!',
      email: email
    })

  } catch (error) {
    console.error('Subscription error:', error)
    
    return res.status(500).json({ 
      error: 'Failed to process subscription',
      success: false 
    })
  }
}
