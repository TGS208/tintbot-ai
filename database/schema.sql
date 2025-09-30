-- Tintbot.ai Database Schema for Render PostgreSQL

-- Clients table (white-label customers)
CREATE TABLE clients (
    id SERIAL PRIMARY KEY,
    client_id VARCHAR(50) UNIQUE NOT NULL,
    business_name VARCHAR(200) NOT NULL,
    domain VARCHAR(100),
    subdomain VARCHAR(100) UNIQUE NOT NULL,
    status VARCHAR(20) DEFAULT 'active',
    subscription_plan VARCHAR(20) DEFAULT 'pro',
    deployed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    branding JSONB,
    services JSONB,
    integrations JSONB,
    settings JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Leads table (captured from chatbot)
CREATE TABLE leads (
    id SERIAL PRIMARY KEY,
    lead_id VARCHAR(50) UNIQUE NOT NULL,
    client_id VARCHAR(50) REFERENCES clients(client_id),
    name VARCHAR(200),
    email VARCHAR(200),
    phone VARCHAR(50),
    business VARCHAR(200),
    vehicle_info JSONB,
    service_preferences JSONB,
    lead_score INTEGER DEFAULT 0,
    status VARCHAR(20) DEFAULT 'new',
    source VARCHAR(50) DEFAULT 'chatbot',
    conversation_data JSONB,
    automation_triggered BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Conversations table (chatbot interactions)
CREATE TABLE conversations (
    id SERIAL PRIMARY KEY,
    conversation_id VARCHAR(50) UNIQUE NOT NULL,
    client_id VARCHAR(50) REFERENCES clients(client_id),
    lead_id VARCHAR(50) REFERENCES leads(lead_id),
    session_id VARCHAR(100),
    messages JSONB,
    outcome VARCHAR(50),
    duration INTEGER,
    lead_qualified BOOLEAN DEFAULT false,
    booking_requested BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP
);

-- Analytics table (performance tracking)
CREATE TABLE analytics (
    id SERIAL PRIMARY KEY,
    client_id VARCHAR(50) REFERENCES clients(client_id),
    date DATE NOT NULL,
    metrics JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(client_id, date)
);

-- Automation logs table (track integrations)
CREATE TABLE automation_logs (
    id SERIAL PRIMARY KEY,
    lead_id VARCHAR(50) REFERENCES leads(lead_id),
    automation_type VARCHAR(50),
    status VARCHAR(20),
    response_data JSONB,
    error_message TEXT,
    executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX idx_leads_client_id ON leads(client_id);
CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_leads_created_at ON leads(created_at);
CREATE INDEX idx_conversations_client_id ON conversations(client_id);
CREATE INDEX idx_analytics_client_date ON analytics(client_id, date);
