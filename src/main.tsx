/**
 * Main entry point for Tintbot.ai React application
 * Initializes React app with routing and global styles
 */

import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './shadcn.css'

/**
 * Initialize and render the React application
 */
const container = document.getElementById('app')
if (!container) {
  throw new Error('Failed to find app container element')
}

const root = createRoot(container)
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
