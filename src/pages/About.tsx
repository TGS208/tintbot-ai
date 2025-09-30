/**  
 * About page for Tintbot.ai  
 * Provides company overview and CTA to contact.  
 */  
  
import { Link } from 'react-router'  
  
/**  
 * About page component  
 */  
export default function About() {  
  return (  
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">  
      {/* Header */}  
      <nav className="bg-slate-900/80 backdrop-blur-md border-b border-slate-700 sticky top-0 z-50">  
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">  
          <div className="flex justify-between items-center h-16">  
            <Link to="/" className="text-white text-xl font-bold">Tintbot.ai</Link>  
            <div className="hidden md:flex items-center space-x-8">  
              <Link to="/" className="text-white hover:text-orange-400 transition-colors">Home</Link>  
              <Link to="/features" className="text-white hover:text-orange-400 transition-colors">Features</Link>  
              <Link to="/demo" className="text-white hover:text-orange-400 transition-colors">Demo</Link>  
              <Link to="/pricing" className="text-white hover:text-orange-400 transition-colors">Pricing</Link>  
            </div>  
          </div>  
        </div>  
      </nav>  
  
      {/* Main */}  
      <main className="max-w-4xl mx-auto px-4 py-16 space-y-6">  
        <h1 className="text-4xl font-bold text-white">About Tintbot.ai</h1>  
        <p className="text-gray-300">  
          Tintbot.ai helps window tint shops automate lead qualification, scheduling, and marketing using intelligent chat and workflow optimization.  
        </p>  
        <p className="text-gray-300">  
          Our white-label Client Portal empowers your clients to control branding, flows, and integrations (FunnelJet, Zapier, OpenAI) on their own subdomain.  
        </p>  
        <div className="pt-4">  
          <Link to="/contact" className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg transition-colors">  
            Contact Us  
          </Link>  
        </div>  
      </main>  
  
      {/* Footer */}  
      <footer className="bg-slate-900 border-t border-slate-700 py-12 px-4 sm:px-6 lg:px-8">  
        <div className="max-w-7xl mx-auto">  
          <div className="grid md:grid-cols-4 gap-8">  
            <div>  
              <div className="flex items-center mb-4">  
                <span className="text-white text-xl font-bold">Tintbot.ai</span>  
              </div>  
              <p className="text-gray-400">  
                AI-powered platform built specifically for window tint professionals.  
              </p>  
            </div>  
            <div>  
              <h3 className="text-white font-semibold mb-4">Product</h3>  
              <ul className="space-y-2">  
                <li><Link to="/features" className="text-gray-400 hover:text-white">Features</Link></li>  
                <li><Link to="/demo" className="text-gray-400 hover:text-white">Demo</Link></li>  
                <li><Link to="/pricing" className="text-gray-400 hover:text-white">Pricing</Link></li>  
              </ul>  
            </div>  
            <div>  
              <h3 className="text-white font-semibold mb-4">Company</h3>  
              <ul className="space-y-2">  
                <li><Link to="/about" className="text-gray-400 hover:text-white">About Tintbot.ai</Link></li>  
                <li><Link to="/contact" className="text-gray-400 hover:text-white">Contact</Link></li>  
                <li><Link to="/support" className="text-gray-400 hover:text-white">Support</Link></li>  
              </ul>  
            </div>  
            <div>  
              <h3 className="text-white font-semibold mb-4">Contact</h3>  
              <ul className="space-y-2 text-gray-400">  
                <li>+1 (208) 555-TINT</li>  
                <li>hello@tintbot.ai</li>  
                <li>Boise, ID</li>  
              </ul>  
            </div>  
          </div>  
          <div className="border-t border-slate-700 mt-8 pt-8 text-center text-gray-400">  
            <p>&copy; 2024 TGS208 LLC. All rights reserved.</p>  
          </div>  
        </div>  
      </footer>  
    </div>  
  )  
}  
