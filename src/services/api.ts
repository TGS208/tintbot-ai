/**
 * API Service using Axios for Tintbot.ai
 * Handles all HTTP requests with proper error handling
 */

import axios, { AxiosInstance, AxiosResponse } from 'axios'

/**
 * Lead capture data interface
 */
interface LeadData {
  name: string
  email: string
  phone?: string
  business?: string
  vehicleInfo?: {
    year?: string
    make?: string
    model?: string
    type?: 'sedan' | 'suv' | 'truck' | 'coupe'
  }
  servicePreferences?: {
    tintType?: 'ceramic' | 'carbon' | 'basic'
    budget?: string
    timeline?: string
  }
  leadScore?: number
  conversationData?: any
}

/**
 * Client configuration interface
 */
interface ClientConfig {
  clientId: string
  businessName: string
  branding: {
    primaryColor: string
    chatbotName: string
  }
  services: Array<{
    name: string
    basePrice: number
  }>
  integrations: {
    hubspot?: { apiKey: string }
    calendly?: { username: string }
    zapier?: { webhookUrl: string }
  }
}

/**
 * API response interfaces
 */
interface ApiResponse<T = any> {
  success: boolean
  data?: T
  message?: string
  error?: string
}

/**
 * Tintbot.ai API Service Class
 */
class TintbotApiService {
  private api: AxiosInstance

  constructor() {
    this.api = axios.create({
      baseURL: this.getBaseUrl(),
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    })

    // Request interceptor for debugging
    this.api.interceptors.request.use(
      (config) => {
        console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`)
        return config
      },
      (error) => {
        console.error('❌ Request Error:', error)
        return Promise.reject(error)
      }
    )

    // Response interceptor for error handling
    this.api.interceptors.response.use(
      (response: AxiosResponse) => {
        console.log(`✅ API Response: ${response.status} ${response.config.url}`)
        return response
      },
      (error) => {
        console.error('❌ API Error:', {
          status: error.response?.status,
          message: error.response?.data?.message || error.message,
          url: error.config?.url
        })
        return Promise.reject(error)
      }
    )
  }

  /**
   * Get base URL based on environment
   */
  private getBaseUrl(): string {
    if (process.env.NODE_ENV === 'production') {
      return 'https://your-app.onrender.com/api'
    }
    return '/api'
  }

  /**
   * Capture lead from chatbot
   */
  async captureLead(leadData: LeadData): Promise<ApiResponse> {
    try {
      const response = await this.api.post('/capture-lead', leadData)
      return response.data
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to capture lead')
    }
  }

  /**
   * Subscribe to newsletter
   */
  async subscribe(email: string, source?: string): Promise<ApiResponse> {
    try {
      const response = await this.api.post('/subscribe', { email, source })
      return response.data
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to subscribe')
    }
  }

  /**
   * Trigger automation workflows
   */
  async triggerAutomation(clientId: string, leadData: LeadData, integrations: any): Promise<ApiResponse> {
    try {
      const response = await this.api.post('/trigger-automation', {
        clientId,
        leadData,
        integrations
      })
      return response.data
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to trigger automation')
    }
  }

  /**
   * Get client configuration
   */
  async getClientConfig(clientId: string): Promise<ClientConfig> {
    try {
      const response = await this.api.get(`/client/${clientId}`)
      return response.data
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to get client config')
    }
  }

  /**
   * Get analytics data
   */
  async getAnalytics(clientId: string, startDate: string, endDate: string): Promise<ApiResponse> {
    try {
      const response = await this.api.get(`/analytics/${clientId}`, {
        params: { startDate, endDate }
      })
      return response.data
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to get analytics')
    }
  }

  /**
   * Send webhook
   */
  async sendWebhook(clientId: string, webhookData: any): Promise<ApiResponse> {
    try {
      const response = await this.api.post(`/webhook/${clientId}`, webhookData)
      return response.data
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to send webhook')
    }
  }
}

// Export singleton instance
export const apiService = new TintbotApiService()

// Export types for use in components
export type { LeadData, ClientConfig, ApiResponse }
