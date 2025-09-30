/**
 * Automation Trigger for Client Integrations
 * Handles HubSpot, Calendly, and Zapier workflows
 */

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { clientId, leadData, integrations } = req.body

  try {
    console.log(`🚀 Triggering automation for client: ${clientId}`)
    
    // Parallel automation triggers
    const automationPromises = []

    // 1. HubSpot Contact Creation
    if (integrations.hubspot?.apiKey) {
      automationPromises.push(createHubSpotContact(leadData, integrations.hubspot))
    }

    // 2. Zapier Webhook Trigger
    if (integrations.zapier?.webhookUrl) {
      automationPromises.push(triggerZapierWebhook(leadData, integrations.zapier))
    }

    // 3. Calendly Integration
    if (integrations.calendly?.username) {
      automationPromises.push(generateCalendlyLink(leadData, integrations.calendly))
    }

    // 4. SMS/Email Notifications
    automationPromises.push(sendImmediateNotifications(leadData, clientId))

    // Execute all automations
    const results = await Promise.allSettled(automationPromises)
    
    // Log results
    results.forEach((result, index) => {
      if (result.status === 'rejected') {
        console.error(`Automation ${index} failed:`, result.reason)
      }
    })

    return res.status(200).json({
      success: true,
      leadId: `LEAD_${Date.now()}`,
      automationsTriggered: results.filter(r => r.status === 'fulfilled').length,
      message: 'Automation sequence initiated'
    })

  } catch (error) {
    console.error('Automation trigger failed:', error)
    return res.status(500).json({ error: 'Automation failed' })
  }
}

// HubSpot Integration
async function createHubSpotContact(leadData, hubspotConfig) {
  const contactData = {
    properties: {
      firstname: leadData.personalInfo?.name?.split(' ')[0] || '',
      lastname: leadData.personalInfo?.name?.split(' ').slice(1).join(' ') || '',
      email: leadData.personalInfo?.email || '',
      phone: leadData.personalInfo?.phone || '',
      
      // Custom properties for tint business
      vehicle_year: leadData.vehicleInfo?.year || '',
      vehicle_make: leadData.vehicleInfo?.make || '',
      vehicle_model: leadData.vehicleInfo?.model || '',
      tint_preference: leadData.servicePreferences?.tintType || '',
      budget_range: leadData.servicePreferences?.budget || '',
      lead_score: leadData.leadScore || 0,
      
      // Lead source
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

  const contact = await response.json()
  console.log('✅ HubSpot contact created:', contact.id)
  
  return contact
}

// Zapier Webhook Trigger
async function triggerZapierWebhook(leadData, zapierConfig) {
  const webhookData = {
    // Flatten data for Zapier
    name: leadData.personalInfo?.name || '',
    email: leadData.personalInfo?.email || '',
    phone: leadData.personalInfo?.phone || '',
    vehicle: `${leadData.vehicleInfo?.year || ''} ${leadData.vehicleInfo?.make || ''} ${leadData.vehicleInfo?.model || ''}`.trim(),
    tint_type: leadData.servicePreferences?.tintType || '',
    budget: leadData.servicePreferences?.budget || '',
    timeline: leadData.servicePreferences?.timeline || '',
    lead_score: leadData.leadScore || 0,
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

  console.log('✅ Zapier webhook triggered')
  return { success: true }
}

// Generate Calendly Link
async function generateCalendlyLink(leadData, calendlyConfig) {
  // Create a personalized Calendly link with pre-filled information
  const calendlyBase = `https://calendly.com/${calendlyConfig.username}/tint-consultation`
  
  const params = new URLSearchParams({
    name: leadData.personalInfo?.name || '',
    email: leadData.personalInfo?.email || '',
    a1: `Vehicle: ${leadData.vehicleInfo?.year || ''} ${leadData.vehicleInfo?.make || ''} ${leadData.vehicleInfo?.model || ''}`,
    a2: `Tint Preference: ${leadData.servicePreferences?.tintType || ''}`,
    a3: `Budget: ${leadData.servicePreferences?.budget || ''}`,
    a4: `Timeline: ${leadData.servicePreferences?.timeline || ''}`
  })

  const personalizedLink = `${calendlyBase}?${params.toString()}`
  
  console.log('✅ Calendly link generated:', personalizedLink)
  return { calendlyLink: personalizedLink }
}

// Immediate Notifications
async function sendImmediateNotifications(leadData, clientId) {
  // Send SMS to customer (using Twilio/similar)
  const customerMessage = `Hi ${leadData.personalInfo?.name}! Thanks for your interest in window tinting. We'll text you with available appointment times within 5 minutes. Reply STOP to opt out.`
  
  // Send notification to business owner
  const businessMessage = `🚗 New lead: ${leadData.personalInfo?.name} - ${leadData.vehicleInfo?.year} ${leadData.vehicleInfo?.make} - Score: ${leadData.leadScore}/100`
  
  // In production, integrate with SMS service
  console.log('📱 Customer SMS:', customerMessage)
  console.log('📱 Business SMS:', businessMessage)
  
  return { smssSent: 2 }
}
