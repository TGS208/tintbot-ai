/**  
 * Subscribe page for Tintbot.ai  
 * Uses Netlify Function `/.netlify/functions/subscribe` to add an email to the newsletter.  
 */  
  
import { Link } from 'react-router'  
import { useState } from 'react'  
  
/**  
 * Subscribe page component  
 */  
export default function Subscribe() {  
  const [email, setEmail] = useState('')  
  const [loading, setLoading] = useState(false)  
  const [message, setMessage] = useState<string | null>(null)  
  
  /**  
   * Submit email to Netlify function  
   */  
  const handleSubmit = async (e: React.FormEvent) => {  
    e.preventDefault()  
    setLoading(true)  
    setMessage(null)  
    try {  
      const res = await fetch('/.netlify/functions/subscribe', {  
        method: 'POST',  
        headers: { 'Content-Type': 'application/json' },  
        body: JSON.stringify({ email, source: 'newsletter' })  
      })  
      const data = await res.json()  
      if (data.success) {  
        setMessage('Subscribed! Please check your inbox.')  
        setEmail('')  
      } else {  
        setMessage(data.error || 'Subscription failed. Please try again.')  
      }  
    } catch (err: any) {  
      setMessage('Subscription failed. Please try again.')  
    } finally {  
      setLoading(false)  
    }  
  }  
  
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
  
      <main className="max-w-md mx-auto px-4 py-16">  
        <h1 className="text-3xl font-bold text-white mb-4">Subscribe</h1>  
        <p className="text-gray-300 mb-6">Get product updates and growth tips for tint shops.</p>  
        <form onSubmit={handleSubmit} className="space-y-4 bg-slate-800/50 p-6 rounded-lg border border-slate-700">  
          <div>  
            <label className="block text-gray-300 mb-2">Email</label>  
            <input  
              type="email"  
              value={email}  
              onChange={(e) => setEmail(e.target.value)}  
              required  
              className="w-full px-4 py-3 rounded-lg bg-slate-700 border border-slate-600 text-white"  
              placeholder="you@example.com"  
            />  
          </div>  
          <button  
            type="submit"  
            disabled={loading}  
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg disabled:opacity-60"  
          >  
            {loading ? 'Subscribing…' : 'Subscribe'}  
          </button>  
          {message && <div className="text-sm text-gray-300">{message}</div>}  
        </form>  
      </main>  
    </div>  
  )  
}  
