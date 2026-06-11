// Conversion Tracking for A/B Testing Landing Pages
(function() {
  const GA_TRACKING_ID = 'G-CGWRG6HMY6';
  const GADS_TRACKING_ID = 'AW-18195144777';

  // 1. Dynamically load Google Tag Manager script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
  document.head.appendChild(script);

  // 2. Initialize tracking dataLayer
  window.dataLayer = window.dataLayer || [];
  window.gtag = function() { dataLayer.push(arguments); };
  gtag('js', new Date());
  
  // Configure GA4 and Google Ads
  gtag('config', GA_TRACKING_ID, { 'anonymize_ip': true });
  gtag('config', GADS_TRACKING_ID);

  document.addEventListener('DOMContentLoaded', () => {
    const pageType = document.body.getAttribute('data-page') || 'unknown';
    const variant = document.body.getAttribute('data-variant') || 'unknown';

    // 3. Track impression of specific variant
    gtag('event', 'lp_variant_view', {
      'page_type': pageType,
      'variant': variant,
      'non_interaction': true
    });

    // 4. Global Click Event Listener (for CTAs, Phone calls, WhatsApp)
    document.addEventListener('click', (e) => {
      const target = e.target.closest('a, button');
      if (!target) return;

      const href = target.getAttribute('href') || '';
      const hrefLower = href.toLowerCase().trim();
      const ctaText = target.innerText.trim() || target.getAttribute('data-cta-name') || 'unknown';

      // Identify event type
      let eventName = null;
      let eventParams = {
        'page_type': pageType,
        'variant': variant,
        'cta_text': ctaText
      };

      if (hrefLower.startsWith('tel:')) {
        eventName = 'lp_phone_click';
        eventParams['phone_number'] = href.substring(4);
      } else if (hrefLower.includes('wa.me') || hrefLower.includes('whatsapp.com')) {
        eventName = 'lp_whatsapp_click';
      } else if (target.hasAttribute('data-cta')) {
        eventName = 'lp_cta_click';
      }

      if (eventName) {
        gtag('event', eventName, eventParams);
        
        // Fire Google Ads Conversion Event
        if (typeof gtag === 'function') {
          gtag('event', 'conversion', {
            'send_to': `${GADS_TRACKING_ID}/conversion_click`, // Standard format
            'value': 1.0,
            'currency': 'ILS'
          });
        }
      }
    });

    // 5. Handle Form Submission with Netlify Form and Tracking
    const form = document.querySelector('.lead-form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn ? submitBtn.innerText : 'שליחה';
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.innerText = 'שולח...';
        }

        // Get form data
        const formData = new FormData(form);
        formData.append('form-name', form.getAttribute('name'));
        formData.append('page_type', pageType);
        formData.append('variant', variant);

        // Submit to Netlify
        fetch('/', {
          method: 'POST',
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams(formData).toString()
        })
        .then(response => {
          if (response.ok) {
            // Track Form Submit in GA4
            gtag('event', 'lp_form_submit', {
              'page_type': pageType,
              'variant': variant
            });

            // Track GAds Form Conversion
            gtag('event', 'conversion', {
              'send_to': `${GADS_TRACKING_ID}/form_submission`,
              'value': 10.0,
              'currency': 'ILS'
            });

            // Show Custom Success Modal
            const successOverlay = document.getElementById('successOverlay');
            if (successOverlay) {
              successOverlay.style.display = 'flex';
            } else {
              alert('הפרטים נשלחו בהצלחה! נחזור אליכם בהקדם.');
            }
            form.reset();
          } else {
            alert('אירעה שגיאה בשליחת הטופס. אנא נסו שנית.');
          }
        })
        .catch(error => {
          console.error('Error submitting form:', error);
          alert('אירעה שגיאה בשליחת הטופס. אנא נסו שנית.');
        })
        .finally(() => {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerText = originalBtnText;
          }
        });
      });
    }

    // Success modal close handler
    const closeBtn = document.getElementById('closeSuccessBtn');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        const successOverlay = document.getElementById('successOverlay');
        if (successOverlay) {
          successOverlay.style.display = 'none';
        }
      });
    }
  });
})();
