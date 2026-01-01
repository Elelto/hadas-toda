import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import SiteNotice from './components/SiteNotice';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Testimonials from './pages/Testimonials';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Admin from './pages/Admin';
import AIAssessmentPage from './pages/AIAssessment';
import BneiBrak from './pages/BneiBrak';
import AccessibilityWidget from './components/AccessibilityWidget';
import './styles/global.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

function App() {
  useEffect(() => {
    // Initialize AOS with optimized settings
    AOS.init({
      duration: 800,
      once: true,
      mirror: false,
      offset: 100,
      delay: 0,
      easing: 'ease-out-quart',
      anchorPlacement: 'top-bottom',
      throttleDelay: 99,
      debounceDelay: 50,
      disable: window.document.body.classList.contains('stop-animations')
    });

    // Refresh AOS after a short delay to ensure proper initialization
    const refreshTimer = setTimeout(() => {
      AOS.refresh();
    }, 100);

    // Handle route changes - refresh AOS when content changes
    const handleRouteChange = () => {
      setTimeout(() => {
        AOS.refresh();
      }, 50);
    };

    // Listen for popstate events (back/forward navigation)
    window.addEventListener('popstate', handleRouteChange);

    return () => {
      clearTimeout(refreshTimer);
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, []);

  return (
    <HelmetProvider>
      <Router>
        <ScrollToTop />
        <SiteNotice />
        <AccessibilityWidget />
        <div className="app-container">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/testimonials" element={<Testimonials />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/bnei-brak" element={<BneiBrak />} />
              <Route path="/ai-assessment" element={<AIAssessmentPage />} />
              <Route path="/dashboard" element={<Admin />} />
              {/* Redirect /admin/ to the Netlify CMS admin interface */}
              <Route path="/admin/*" element={<Navigate to="/admin/index.html" replace />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;
