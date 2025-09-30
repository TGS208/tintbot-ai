/**
 * Google Sheets Lead Capture Function
 * Automatically adds leads to your Google Sheet
 */

const { google } = require('googleapis')

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    }
  }

  try {
    const leadData = JSON.parse(event.body)
    
    // Google Sheets configuration
    const auth = new google.auth.GoogleAuth({
      credentials: {
        type: 'service_account',
        project_id: process.env.GOOGLE_PROJECT_ID,
        private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        client_id: process.env.GOOGLE_CLIENT_ID,
        auth_uri: 'https://accounts.google.com/o/oauth2/auth',
        token_uri: 'https://oauth2.googleapis.com/token',
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets']
    })

    const sheets = google.sheets({ version: 'v4', auth })
    const spreadsheetId = process.env.GOOGLE_SHEET_ID

    // Prepare row data
    const rowData = [
      new Date().toISOString(),
      leadData.name || '',
      leadData.email || '',
      leadData.phone || '',
      leadData.business || '',
      leadData.challenges || '',
      leadData.source || 'business-assessment'
    ]

    // Add to sheet
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Leads!A:G',
      valueInputOption: 'RAW',
      resource: {
        values: [rowData]
      }
    })

    console.log('✅ Lead added to Google Sheets:', leadData.email)

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        success: true,
        message: 'Lead saved to Google Sheets'
      })
    }

  } catch (error) {
    console.error('❌ Google Sheets error:', error)
    
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        error: 'Failed to save to Google Sheets',
        details: error.message
      })
    }
  }
}
