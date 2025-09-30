-- Tintbot.ai Database Schema for Render PostgreSQL
-- Complete schema for white-label SaaS platform

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Clients table (white-label customers)
CREATE TABLE clients (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    client_id VARCHAR(50) UNIQUE NOT NULL,
    business_name VARCHAR(255) NOT NULL,
    subdomain VARCHAR(100) UNIQUE NOT NULL,
    custom_domain VARCHAR(255),
    
    -- Branding
    primary_color VARCHAR(7) DEFAULT '#FF6B35',
    logo_url TEXT,
    chatbot_name VARCHAR(100) DEFAULT 'TintBot',
    
    -- Business details
    phone VARCHAR(20),
    email VARCHAR(255),
    address TEXT,
    timezone VARCHAR(50) DEFAULT 'America/Boise',
    
    -- Configuration
    services JSONB DEFAULT '[]',
    pricing JSONB DEFAULT '{}',
    integrations JSONB DEFAULT '{}',
    features JSONB DEFAULT '{}',
    
    -- Subscription
    subscription_plan VARCHAR(50) DEFAULT 'pro',
    subscription_status VARCHAR(20) DEFAULT 'active',
    billing_date DATE,
    
    -- Metadata
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20) DEFAULT 'active'
);

-- Leads table (captured from chatbots)
CREATE TABLE leads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    lead_id VARCHAR(50) UNIQUE NOT NULL,
    client_id VARCHAR(50) REFERENCES clients(client_id),
    
    -- Contact information
    name VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(20),
    business VARCHAR(255),
    
    -- Vehicle information
    vehicle_info JSONB DEFAULT '{}',
    
    -- Service preferences
    service_preferences JSONB DEFAULT '{}',
    
    -- Lead scoring
    lead_score INTEGER DEFAULT 0,
    status VARCHAR(50) DEFAULT 'new',
    
    -- Conversation data
    conversation_data JSONB DEFAULT '{}',
    
    -- Source tracking
    source VARCHAR(100) DEFAULT 'chatbot',
    utm_source VARCHAR(100),
    utm_medium VARCHAR(100),
    utm_campaign VARCHAR(100),
    ip_address VARCHAR(45),
    user_agent TEXT,
    
    -- Automation
    automation_triggered BOOLEAN DEFAULT FALSE,
    hubspot_contact_id VARCHAR(100),
    calendly_link TEXT,
    
    -- Metadata
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Conversations table (chatbot interactions)
CREATE TABLE conversations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id VARCHAR(100) NOT NULL,
    client_id VARCHAR(50) REFERENCES clients(client_id),
    lead_id VARCHAR(50),
    
    -- Conversation details
    messages JSONB DEFAULT '[]',
    duration INTEGER DEFAULT 0,
    outcome VARCHAR(100),
    satisfaction_score INTEGER,
    
    -- Metadata
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Automation logs (tracking integrations)
CREATE TABLE automation_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    lead_id VARCHAR(50) REFERENCES leads(lead_id),
    automation_type VARCHAR(100) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    response_data JSONB,
    error_message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Subscriptions table (email signups)
CREATE TABLE subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    source VARCHAR(100) DEFAULT 'website',
    status VARCHAR(20) DEFAULT 'active',
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for performance
CREATE INDEX idx_leads_client_id ON leads(client_id);
CREATE INDEX idx_leads_created_at ON leads(created_at);
CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_leads_score ON leads(lead_score);
CREATE INDEX idx_conversations_client_id ON conversations(client_id);
CREATE INDEX idx_conversations_session_id ON conversations(session_id);
CREATE INDEX idx_automation_logs_lead_id ON automation_logs(lead_id);

-- Insert sample client data
INSERT INTO clients (
    client_id, business_name, subdomain, phone, email,
    primary_color, chatbot_name, services, pricing
) VALUES 
(
    'elite-tint-001',
    'Elite Tint & Graphics',
    'elitetint',
    '(208) 555-0123',
    'info@elitetint.com',
    '#FF6B35',
    'TintBot',
    '[
        {"name": "Basic Tint", "basePrice": 299, "description": "Standard dyed film"},
        {"name": "Carbon Tint", "basePrice": 399, "description": "Carbon film with heat rejection"},
        {"name": "Ceramic Tint", "basePrice": 599, "description": "Premium ceramic with lifetime warranty"}
    ]',
    '{"basic": 299, "carbon": 399, "ceramic": 599}'
),
(
    'precision-auto-002',
    'Precision Auto Tint',
    'precision',
    '(208) 555-0456',
    'contact@precisionauto.com',
    '#0066CC',
    'PrecisionBot',
    '[
        {"name": "Standard Tint", "basePrice": 349, "description": "Quality dyed film"},
        {"name": "Premium Carbon", "basePrice": 449, "description": "High-performance carbon"},
        {"name": "Ceramic Pro", "basePrice": 699, "description": "Top-tier ceramic technology"}
    ]',
    '{"standard": 349, "carbon": 449, "ceramic": 699}'
);
