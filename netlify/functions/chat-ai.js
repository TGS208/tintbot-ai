/**
 * AI Chat Backend for Tintbot
 * Handles conversational AI using OpenAI or Claude API
 *
 * This is YOUR business logic - competitors can't see this!
 *
 * Features:
 * - Lead qualification through natural conversation
 * - Product knowledge (ceramic, carbon, dyed tints)
 * - Pricing guidance
 * - Appointment booking assistance
 * - Seamless handoff to quote system
 */

exports.handler = async (event, context) => {
  // CORS handling
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: ''
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { message, sessionId, context: chatContext } = JSON.parse(event.body);

    console.log('💬 Chat request:', { sessionId, message });

    // Check if we should use AI or rule-based responses
    const useAI = process.env.OPENAI_API_KEY || process.env.ANTHROPIC_API_KEY;

    let response;
    let updatedLeadData = {};

    if (useAI) {
      // Use actual AI (OpenAI or Claude)
      const aiResult = await getAIResponse(message, chatContext, sessionId);
      response = aiResult.response;
      updatedLeadData = aiResult.leadData;
    } else {
      // Fallback to intelligent rule-based responses
      const ruleResult = getRuleBasedResponse(message, chatContext);
      response = ruleResult.response;
      updatedLeadData = ruleResult.leadData;
    }

    // Track conversation for analytics
    await logConversation(sessionId, message, response, updatedLeadData);

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        response,
        leadData: updatedLeadData,
        timestamp: new Date().toISOString()
      })
    };

  } catch (error) {
    console.error('❌ Chat error:', error);

    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        error: 'Chat service temporarily unavailable',
        response: "I apologize, but I'm having trouble processing that right now. Can I connect you with our team instead?"
      })
    };
  }
};

/**
 * Get AI-powered response using OpenAI or Claude
 */
async function getAIResponse(message, context, sessionId) {
  const OPENAI_KEY = process.env.OPENAI_API_KEY;
  const CLAUDE_KEY = process.env.ANTHROPIC_API_KEY;

  // System prompt that defines Tintbot's personality and knowledge
  const systemPrompt = `You are Tintbot, an AI assistant for a premium window tinting business.

YOUR ROLE:
- Help customers get instant quotes
- Answer questions about window tint products
- Qualify leads and gather vehicle information
- Guide customers to booking appointments

YOUR KNOWLEDGE:
Products we offer:
1. CERAMIC TINT (Premium) - $$$
   - 65% heat rejection (best in class)
   - 99.9% UV protection
   - Lifetime warranty
   - No signal interference
   - Best for: Tesla, BMW, Mercedes, luxury vehicles

2. CARBON TINT (Best Value) - $$
   - 45% heat rejection
   - 99% UV protection
   - 5-year warranty
   - Won't fade or turn purple
   - Best for: Most daily drivers
   - MOST POPULAR CHOICE

3. DYED TINT (Budget) - $
   - 30% heat rejection
   - 99% UV protection
   - 2-year warranty
   - Great for privacy
   - Best for: Budget-conscious customers

PRICING GUIDANCE:
- Sedan: $275-385 (carbon)
- SUV: $350-490 (carbon)
- Truck: $300-420 (carbon)
- Coupe: $250-350 (carbon)
- Premium vehicles add ~$50

SPECIAL FEATURE:
We have AI vehicle recognition! Customers can:
1. Upload a photo of their car → AI identifies it → Instant quote
2. Scan their VIN → 100% accurate data → Instant quote
3. Enter details manually → Quick quote

YOUR PERSONALITY:
- Friendly but professional
- Concise (2-3 sentences max)
- Focus on benefits, not just features
- Always guide toward action (quote, booking, or browsing)
- Use emojis sparingly (1 per message max)

LEAD QUALIFICATION:
Try to learn:
- Vehicle type (for accurate quotes)
- Budget range (guide to right product)
- Timeline (urgent vs. researching)
- Main concern (heat, privacy, UV, appearance)

RULES:
- NEVER make up pricing - always say "let me get you an instant quote"
- NEVER promise things you can't deliver
- If you don't know something, say so and offer to connect with team
- Keep responses under 60 words
- Guide to our instant quote system when discussing pricing

Current context: ${JSON.stringify(context)}`;

  try {
    if (OPENAI_KEY) {
      // Use OpenAI (GPT-4 or GPT-3.5-turbo)
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_KEY}`
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini', // or 'gpt-4' for better quality
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: message }
          ],
          max_tokens: 150,
          temperature: 0.7
        })
      });

      const data = await response.json();
      const aiResponse = data.choices[0].message.content;

      // Extract lead data from conversation
      const leadData = extractLeadData(message, aiResponse, context);

      return { response: aiResponse, leadData };

    } else if (CLAUDE_KEY) {
      // Use Claude (Anthropic)
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': CLAUDE_KEY,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: 'claude-3-haiku-20240307', // Fast and cost-effective
          max_tokens: 150,
          system: systemPrompt,
          messages: [
            { role: 'user', content: message }
          ]
        })
      });

      const data = await response.json();
      const aiResponse = data.content[0].text;

      const leadData = extractLeadData(message, aiResponse, context);

      return { response: aiResponse, leadData };
    }

  } catch (error) {
    console.error('AI API error:', error);
    // Fall back to rule-based if AI fails
    return getRuleBasedResponse(message, context);
  }
}

/**
 * Intelligent rule-based responses (fallback when no AI API configured)
 */
function getRuleBasedResponse(message, context = {}) {
  const lower = message.toLowerCase();
  let response = '';
  let leadData = {};

  // Intent detection
  if (lower.match(/quote|price|cost|how much/)) {
    response = "I can get you an instant quote right now! We have three ways: upload a photo of your car (AI recognition), enter your VIN, or type your vehicle details. Which works best for you?";
    leadData.intent = 'quote';
    leadData.leadScore = (context.leadScore || 0) + 15;

  } else if (lower.match(/ceramic|carbon|dyed|type|difference|compare|which/)) {
    response = "Great question! We offer Ceramic (premium, lifetime warranty), Carbon (best value, most popular), and Dyed (budget-friendly). The main differences are heat rejection and warranty length. Want me to show you a detailed comparison?";
    leadData.intent = 'compare';
    leadData.leadScore = (context.leadScore || 0) + 10;

  } else if (lower.match(/tesla|bmw|mercedes|audi|lexus|porsche|maserati/)) {
    // Premium vehicle detected
    const vehicle = lower.match(/(tesla|bmw|mercedes|audi|lexus|porsche|maserati)/)[0];
    response = `Nice! ${capitalizeFirst(vehicle)} owners typically choose our Ceramic tint for maximum heat rejection and clarity. Want an instant quote for your ${capitalizeFirst(vehicle)}?`;
    leadData.vehicle = { make: capitalizeFirst(vehicle), isPremium: true };
    leadData.recommendedTint = 'ceramic';
    leadData.leadScore = (context.leadScore || 0) + 20;

  } else if (lower.match(/honda|toyota|ford|chevy|nissan|mazda|hyundai|kia/)) {
    // Standard vehicle detected
    const vehicle = lower.match(/(honda|toyota|ford|chevy|nissan|mazda|hyundai|kia)/)[0];
    response = `Perfect! For ${capitalizeFirst(vehicle)} vehicles, our Carbon tint is the most popular choice - best balance of performance and price. Ready for a quick quote?`;
    leadData.vehicle = { make: capitalizeFirst(vehicle), isPremium: false };
    leadData.recommendedTint = 'carbon';
    leadData.leadScore = (context.leadScore || 0) + 15;

  } else if (lower.match(/appointment|book|schedule|when/)) {
    response = "I can help you book! First, let's get you a quick quote so you know which tint you want. Takes about 30 seconds - upload a photo or enter your vehicle info?";
    leadData.intent = 'booking';
    leadData.leadScore = (context.leadScore || 0) + 25; // High intent!

  } else if (lower.match(/legal|law|illegal|allowed|percent|dark/)) {
    response = "Smart question! Tint laws vary by state and window position. Our instant quote system can check your state's legal limits. What state are you in?";
    leadData.intent = 'legal_question';
    leadData.needsState = true;
    leadData.leadScore = (context.leadScore || 0) + 8;

  } else if (lower.match(/heat|hot|cool|temperature|sun/)) {
    response = "Heat rejection is where quality tint really shines! Ceramic blocks 65%, Carbon blocks 45%, Dyed blocks 30%. What type of vehicle do you have? I can show you exact pricing.";
    leadData.mainConcern = 'heat_rejection';
    leadData.leadScore = (context.leadScore || 0) + 12;

  } else if (lower.match(/warranty|guarantee|last|fade/)) {
    response = "Great question about durability! Ceramic has lifetime warranty, Carbon has 5 years, Dyed has 2 years. Carbon won't fade or turn purple like cheaper tints. Want to see pricing for your vehicle?";
    leadData.mainConcern = 'warranty';
    leadData.leadScore = (context.leadScore || 0) + 10;

  } else if (lower.match(/suv|truck|sedan|coupe|van|minivan/)) {
    const vehicleType = lower.match(/(suv|truck|sedan|coupe|van|minivan)/)[0];
    response = `Perfect! I can get you an instant quote for your ${vehicleType}. Our AI can identify it from a photo, or you can enter the make/model. Which would you prefer?`;
    leadData.vehicle = { type: vehicleType };
    leadData.leadScore = (context.leadScore || 0) + 15;

  } else if (lower.match(/budget|cheap|affordable|expensive/)) {
    response = "I understand budget matters! Our Dyed tint starts around $200, Carbon (most popular) is mid-range, and Ceramic is premium. Want exact pricing for your specific vehicle?";
    leadData.budgetSensitive = true;
    leadData.leadScore = (context.leadScore || 0) + 8;

  } else if (lower.match(/how long|install|time|wait/)) {
    response = "Installation typically takes 2-4 hours depending on vehicle size. You can drop it off or wait. Want to check availability and get a quote?";
    leadData.mainConcern = 'installation_time';
    leadData.leadScore = (context.leadScore || 0) + 12;

  } else if (lower.match(/thank|thanks|appreciate/)) {
    response = "You're welcome! Anything else I can help with? I can get you a quote, compare options, or answer more questions. 😊";
    leadData.leadScore = (context.leadScore || 0) + 2;

  } else {
    // Generic helpful response
    response = "I can help you with that! Would you like to: 1) Get an instant quote (takes 30 sec), 2) Compare our three tint types, or 3) Ask me specific questions?";
    leadData.leadScore = (context.leadScore || 0) + 3;
  }

  return { response, leadData };
}

/**
 * Extract lead data from conversation
 */
function extractLeadData(userMessage, aiResponse, currentContext) {
  const leadData = { ...currentContext };
  const lower = userMessage.toLowerCase();

  // Vehicle detection
  const vehicles = ['tesla', 'bmw', 'mercedes', 'audi', 'toyota', 'honda', 'ford', 'chevy'];
  vehicles.forEach(make => {
    if (lower.includes(make)) {
      leadData.vehicle = leadData.vehicle || {};
      leadData.vehicle.make = capitalizeFirst(make);
    }
  });

  // Vehicle type
  const types = ['suv', 'truck', 'sedan', 'coupe', 'van'];
  types.forEach(type => {
    if (lower.includes(type)) {
      leadData.vehicle = leadData.vehicle || {};
      leadData.vehicle.type = type;
    }
  });

  // Intent detection
  if (lower.match(/quote|price/)) leadData.intent = 'quote';
  if (lower.match(/book|appointment/)) leadData.intent = 'booking';
  if (lower.match(/compare/)) leadData.intent = 'compare';

  // Update lead score
  leadData.leadScore = (leadData.leadScore || 0) + 5;

  return leadData;
}

/**
 * Log conversation for analytics and training
 */
async function logConversation(sessionId, userMessage, botResponse, leadData) {
  // Log to console (Netlify captures these)
  console.log('📊 Conversation log:', {
    sessionId,
    user: userMessage,
    bot: botResponse,
    leadScore: leadData.leadScore || 0,
    intent: leadData.intent || 'unknown',
    timestamp: new Date().toISOString()
  });

  // TODO: Send to your analytics platform
  // Examples:
  // - Google Analytics event
  // - Mixpanel
  // - Segment
  // - Your own database

  // TODO: Store in database for AI training
  // You can use this data to fine-tune your AI model later
}

/**
 * Helper: Capitalize first letter
 */
function capitalizeFirst(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
