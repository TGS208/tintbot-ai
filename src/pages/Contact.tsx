/**  
 * Contact page for Tintbot.ai  
 * Netlify Form: `contact` with honeypot and success redirect to /success.html  
 */  
  
import { Link } from 'react-router'  
import { useState } from 'react'  
  
/**  
 * Contact page component  
 */  
export default function Contact() {  
  const [submitting, setSubmitting] = useState(false)  
  
  /**  
   * Handle basic client-side validation and let Netlify handle submission  
   */  
  const onSubmit = () => {  
    setSubmitting(true)  
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
  
      <main className="max-w-3xl mx-auto px-4 py-16">  
        <h1 className="text-4xl font-bold text-white mb-6">Contact Us</h1>  
        <p className="text-gray-300 mb-8">We’ll get back to you within 1 business day.</p>  
  
        {/* Netlify Form: contact */}  
        <form  
          name="contact"  
          method="POST"  
          data-netlify="true"  
          netlify-honeypot="bot-field"  
          action="/success.html"  
          onSubmit={onSubmit}  
          className="space-y-6 bg-slate-800/50 p-6 rounded-lg border border-slate-700"  
        >  
          {/* Netlify form-name + honeypot fields */}  
          <input type="hidden" name="form-name" value="contact" />  
          <input type="hidden" name="bot-field" />  
  
          <div>  
            <label className="block mb-2 text-gray-300">Full Name *</label>  
            <input className="w-full px-4 py-3 rounded-lg bg-slate-700 border border-slate-600 text-white" type="text" name="name" required />  
          </div>  
          <div>  
            <label className="block mb-2 text-gray-300">Email *</label>  
            <input className="w-full px-4 py-3 rounded-lg bg-slate-700 border border-slate-600 text-white" type="email" name="email" required />  
          </div>  
          <div>  
            <label className="block mb-2 text-gray-300">Message</label>  
            <textarea className="w-full px-4 py-3 rounded-lg bg-slate-700 border border-slate-600 text-white" name="message" rows={5} />  
          </div>  
          <button  
            type="submit"  
            disabled={submitting}  
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg disabled:opacity-60"  
          >  
            {submitting ? 'Sending…' : 'Send'}  
          </button>  
        </form>  
      </main>  
    </div>  
  )  
}  
