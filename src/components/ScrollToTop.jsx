import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import AOS from 'aos';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // חזרה לראש העמוד בכל מעבר בין עמודים
    window.scrollTo(0, 0);
    
    // רענון AOS אחרי מעבר בין דפים
    setTimeout(() => {
      AOS.refresh();
    }, 100);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
