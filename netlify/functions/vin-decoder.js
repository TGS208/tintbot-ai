/**
 * VIN Decoder Function
 * Extracts VIN from image using OCR and decodes vehicle information
 * Uses NHTSA vPIC API (free government database)
 */

exports.handler = async (event, context) => {
  // Handle CORS
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
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
    const { vin, image } = JSON.parse(event.body)

    let vinNumber = vin

    // If VIN not provided, extract from image
    if (!vinNumber && image) {
      vinNumber = await extractVINFromImage(image)
    }

    if (!vinNumber) {
      return {
        statusCode: 400,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          error: 'VIN required',
          message: 'Please provide either a VIN number or an image containing a VIN'
        })
      }
    }

    // Validate VIN format (17 characters, alphanumeric except I, O, Q)
    const cleanVIN = vinNumber.toUpperCase().replace(/[^A-HJ-NPR-Z0-9]/g, '')

    if (cleanVIN.length !== 17) {
      return {
        statusCode: 400,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          error: 'Invalid VIN',
          message: 'VIN must be exactly 17 characters'
        })
      }
    }

    // Decode VIN using NHTSA API
    const vehicleData = await decodeVIN(cleanVIN)

    // Calculate window surface area and pricing
    const quotingData = calculateQuote(vehicleData)

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        success: true,
        vin: cleanVIN,
        vehicle: vehicleData,
        quote: quotingData,
        timestamp: new Date().toISOString()
      })
    }

  } catch (error) {
    console.error('VIN decoder error:', error)

    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        error: 'Failed to decode VIN',
        message: error.message
      })
    }
  }
}

/**
 * Extract VIN from image using OCR
 */
async function extractVINFromImage(base64Image) {
  try {
    // Use OCR.space free API (1000 requests/month free tier)
    const OCR_API_KEY = process.env.OCR_SPACE_API_KEY || 'K87899142388957'

    const formData = new FormData()
    formData.append('base64Image', base64Image)
    formData.append('isOverlayRequired', 'false')
    formData.append('OCREngine', '2') // Engine 2 is better for VINs

    const response = await fetch('https://api.ocr.space/parse/image', {
      method: 'POST',
      headers: {
        'apikey': OCR_API_KEY
      },
      body: formData
    })

    const result = await response.json()

    if (!result.IsErroredOnProcessing && result.ParsedResults?.[0]) {
      const text = result.ParsedResults[0].ParsedText

      // Extract VIN pattern (17 alphanumeric characters)
      const vinPattern = /[A-HJ-NPR-Z0-9]{17}/gi
      const matches = text.match(vinPattern)

      if (matches && matches.length > 0) {
        return matches[0]
      }
    }

    throw new Error('Could not extract VIN from image')

  } catch (error) {
    console.error('OCR extraction failed:', error)
    throw new Error('Failed to read VIN from image. Please try entering it manually.')
  }
}

/**
 * Decode VIN using NHTSA vPIC API
 */
async function decodeVIN(vin) {
  try {
    const response = await fetch(
      `https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVin/${vin}?format=json`
    )

    const data = await response.json()

    if (!data.Results) {
      throw new Error('Invalid response from NHTSA')
    }

    // Extract relevant fields
    const getValue = (variableName) => {
      const item = data.Results.find(r => r.Variable === variableName)
      return item?.Value || 'Unknown'
    }

    return {
      year: getValue('Model Year'),
      make: getValue('Make'),
      model: getValue('Model'),
      trim: getValue('Trim'),
      bodyClass: getValue('Body Class'),
      vehicleType: getValue('Vehicle Type'),
      doors: getValue('Doors'),
      driveType: getValue('Drive Type'),
      fuelType: getValue('Fuel Type - Primary'),
      engineCylinders: getValue('Engine Number of Cylinders'),
      manufacturer: getValue('Manufacturer Name'),
      plantCountry: getValue('Plant Country'),
      raw: data.Results
    }

  } catch (error) {
    console.error('NHTSA decode failed:', error)
    throw new Error('Failed to decode VIN')
  }
}

/**
 * Calculate quote based on vehicle data
 */
function calculateQuote(vehicle) {
  // Window tint pricing logic based on vehicle type
  const bodyClass = vehicle.bodyClass?.toLowerCase() || ''
  const vehicleType = vehicle.vehicleType?.toLowerCase() || ''
  const doors = parseInt(vehicle.doors) || 4

  let basePrice = 0
  let windowCount = 0
  let surfaceArea = 0
  let vehicleCategory = 'sedan'

  // Categorize vehicle and calculate windows
  if (bodyClass.includes('suv') || bodyClass.includes('sport utility')) {
    vehicleCategory = 'suv'
    windowCount = doors + 2 // doors + rear + back window
    basePrice = 350
    surfaceArea = 35 // sq ft estimate
  } else if (bodyClass.includes('truck') || bodyClass.includes('pickup')) {
    vehicleCategory = 'truck'
    windowCount = doors + 2
    basePrice = 300
    surfaceArea = 28
  } else if (bodyClass.includes('coupe') || doors === 2) {
    vehicleCategory = 'coupe'
    windowCount = 4 // 2 doors + windshield + rear
    basePrice = 250
    surfaceArea = 20
  } else if (bodyClass.includes('van') || bodyClass.includes('minivan')) {
    vehicleCategory = 'van'
    windowCount = 8 // Multiple windows
    basePrice = 400
    surfaceArea = 45
  } else {
    // Default sedan/4-door
    vehicleCategory = 'sedan'
    windowCount = 6 // 4 doors + windshield + rear
    basePrice = 275
    surfaceArea = 25
  }

  // Premium vehicle adjustment
  const premiumMakes = ['tesla', 'bmw', 'mercedes', 'audi', 'lexus', 'porsche', 'maserati', 'ferrari', 'lamborghini']
  const isPremium = premiumMakes.some(make => vehicle.make?.toLowerCase().includes(make))

  if (isPremium) {
    basePrice += 50
  }

  // Calculate pricing tiers
  const pricing = {
    dyed: {
      price: Math.round(basePrice * 0.7),
      warranty: '2 years',
      heatRejection: '30%',
      uvProtection: '99%'
    },
    carbon: {
      price: basePrice,
      warranty: '5 years',
      heatRejection: '45%',
      uvProtection: '99%'
    },
    ceramic: {
      price: Math.round(basePrice * 1.4),
      warranty: 'Lifetime',
      heatRejection: '65%',
      uvProtection: '99.9%'
    }
  }

  return {
    vehicleCategory,
    windowCount,
    surfaceArea,
    isPremium,
    pricing,
    recommended: isPremium ? 'ceramic' : 'carbon',
    estimatedTime: calculateInstallTime(vehicleCategory)
  }
}

/**
 * Calculate installation time based on vehicle type
 */
function calculateInstallTime(category) {
  const times = {
    coupe: '2-3 hours',
    sedan: '3-4 hours',
    suv: '4-5 hours',
    truck: '3-4 hours',
    van: '5-6 hours'
  }

  return times[category] || '3-4 hours'
}
