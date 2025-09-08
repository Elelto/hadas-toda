import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Testimonials from './pages/Testimonials';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Admin from './pages/Admin';
import AIAssessmentPage from './pages/AIAssessment';
import './styles/global.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

function App() {
  useEffect(() => {
    AOS.init({
      duration: 600,
      once: true,
      mirror: false,
      offset: 50, // Reduced from 120 to trigger earlier
      delay: 0,
      easing: 'ease-out-cubic',
      anchorPlacement: 'top-bottom',
      throttleDelay: 50, // Reduced from 200 for better performance
      debounceDelay: 50, // Reduced from 100 for better performance
      disable: function() {
        // Disable on very small screens or slow devices
        const maxWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        const isSlowDevice = navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4;
        return maxWidth < 480 || isSlowDevice;
      }
    });
    
    // רענון AOS כאשר החלון משנה גודל
    const handleResize = () => {
      AOS.refresh();
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <div className="app-container">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/ai-assessment" element={<AIAssessmentPage />} />
            <Route path="/dashboard" element={<Admin />} />
            {/* Redirect /admin/ to the Netlify CMS admin interface */}
            <Route path="/admin/*" element={<Navigate to="/admin/index.html" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
