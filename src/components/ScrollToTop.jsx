import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import AOS from 'aos';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // חזרה לראש העמוד בכל מעבר בין עמודים - מיידי ללא אנימציה
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

    // רענון AOS אחרי מעבר בין דפים
    setTimeout(() => {
      AOS.refresh();
    }, 100);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
