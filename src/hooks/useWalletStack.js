import { useEffect } from 'react';

export const useWalletStack = () => {
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateWalletStack();
          ticking = false;
        });
        ticking = true;
      }
    };

    const updateWalletStack = () => {
      if (window.innerWidth > 768) {
        document.querySelectorAll('.sticky-stack-card').forEach(card => {
          card.style.transform = 'none';
          card.style.opacity = '1';
          card.style.filter = 'none';
        });
        return;
      }

      const containers = document.querySelectorAll('.sticky-stack-container');
      
      containers.forEach(container => {
        const cards = container.querySelectorAll('.sticky-stack-card');
        if (!cards.length) return;

        const STICKY_BASE_TOP = 100;
        
        cards.forEach((card, index) => {
          const cardStickyTop = STICKY_BASE_TOP + (index * 12);
          const containerRect = container.getBoundingClientRect();
          
          // Calculate where the card WOULD be if it wasn't sticky
          // card.offsetTop gives the position relative to the nearest positioned ancestor (the container)
          const naturalCardTop = containerRect.top + card.offsetTop;
          
          const distancePastSticky = cardStickyTop - naturalCardTop;
          
          if (distancePastSticky > 0) {
            // Card is sticky. Apply wallet stack 3D effect.
            // Shrink up to 0.92, fade to 0.7, darken slightly
            const scale = Math.max(0.92, 1 - (distancePastSticky / 1000));
            const opacity = Math.max(0.7, 1 - (distancePastSticky / 600));
            const brightness = Math.max(0.85, 1 - (distancePastSticky / 500));
            
            // Push it slightly down so it compresses into the stack behind the newer cards
            const translateY = (distancePastSticky * 0.03);
            
            card.style.transform = `translateY(${translateY}px) scale(${scale})`;
            card.style.opacity = opacity.toString();
            card.style.filter = `brightness(${brightness})`;
          } else {
            card.style.transform = 'translateY(0) scale(1)';
            card.style.opacity = '1';
            card.style.filter = 'brightness(1)';
          }
        });
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    
    // Initial call
    setTimeout(updateWalletStack, 100);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);
};
