/**  
 * Support page for Tintbot.ai  
 * Simple help content + CTA to contact form  
 */  
  
import { Link } from 'react-router'  
  
/**  
 * Support page component  
 */  
export default function Support() {  
  return (  
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">  
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
  
      <main className="max-w-4xl mx-auto px-4 py-16 space-y-6">  
        <h1 className="text-4xl font-bold text-white">Support</h1>  
        <p className="text-gray-300">  
          Need help with onboarding, account changes, or a technical question? We’re here for you.  
        </p>  
        <Link to="/contact" className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg">  
          Contact Support  
        </Link>  
      </main>  
    </div>  
  )  
}  
