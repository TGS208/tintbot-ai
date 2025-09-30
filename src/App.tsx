import { HashRouter, Route, Routes } from 'react-router'
import Home from './pages/Home'
import Features from './pages/Features'
import Integrations from './pages/Integrations'
import Demo from './pages/Demo'
import Pricing from './pages/Pricing'
import WhiteLabel from './pages/WhiteLabel'
import ChatbotTest from './pages/ChatbotTest'
import Assessment from './pages/Assessment'
import About from './pages/About'
import Contact from './pages/Contact'
import Support from './pages/Support'
import Subscribe from './pages/Subscribe'

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/features" element={<Features />} />
        <Route path="/integrations" element={<Integrations />} />
        <Route path="/demo" element={<Demo />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/whitelabel" element={<WhiteLabel />} />
        <Route path="/chatbot-test" element={<ChatbotTest />} />
        <Route path="/assessment" element={<Assessment />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/support" element={<Support />} />
        <Route path="/subscribe" element={<Subscribe />} />
      </Routes>
    </HashRouter>
  )
}