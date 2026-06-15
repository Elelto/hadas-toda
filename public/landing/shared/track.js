// Conversion Tracking & Interactive Page Logic for A/B Testing Landing Pages
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
            'send_to': `${GADS_TRACKING_ID}/conversion_click`,
            'value': 1.0,
            'currency': 'ILS'
          });
        }
      }
    });

    // ==========================================
    // INTERACTIVE MULTI-STEP FORM LOGIC
    // ==========================================
    const form = document.querySelector('.lead-form');
    const steps = document.querySelectorAll('.form-step');
    const progressFill = document.querySelector('.progress-fill');
    const indicators = document.querySelectorAll('.step-indicator');
    let currentStep = 1;

    function updateFormSteps() {
      // Hide all steps, show current
      steps.forEach(step => {
        step.classList.remove('active');
        if (parseInt(step.getAttribute('data-step')) === currentStep) {
          step.classList.add('active');
        }
      });

      // Update progress bar fill
      if (progressFill) {
        const percent = ((currentStep - 1) / (steps.length - 1)) * 100;
        progressFill.style.width = `${percent === 0 ? 33.33 : percent}%`;
      }

      // Update indicators active classes
      indicators.forEach(indicator => {
        const stepNum = parseInt(indicator.getAttribute('data-step'));
        if (stepNum <= currentStep) {
          indicator.classList.add('active');
        } else {
          indicator.classList.remove('active');
        }
      });

      // Track step transition
      gtag('event', 'lp_form_step_view', {
        'page_type': pageType,
        'variant': variant,
        'step_number': currentStep
      });
    }

    // Step 1: Radio selection with premium auto-advance
    const optionCards = document.querySelectorAll('.option-card');
    optionCards.forEach(card => {
      card.addEventListener('click', () => {
        // Clear selection
        optionCards.forEach(c => c.classList.remove('selected'));
        // Select this one
        card.classList.add('selected');
        const radio = card.querySelector('input[type="radio"]');
        if (radio) radio.checked = true;

        // Visual auto-advance feedback delay
        setTimeout(() => {
          if (currentStep === 1) {
            currentStep = 2;
            updateFormSteps();
          }
        }, 380);
      });
    });

    // Step 2: Checkbox card selection highlight
    const checkboxCards = document.querySelectorAll('.checkbox-card');
    checkboxCards.forEach(card => {
      const checkbox = card.querySelector('input[type="checkbox"]');
      
      card.addEventListener('click', (e) => {
        if (e.target !== checkbox) {
          checkbox.checked = !checkbox.checked;
        }
        if (checkbox.checked) {
          card.classList.add('selected');
        } else {
          card.classList.remove('selected');
        }
      });

      // Handle direct checkbox clicks
      if (checkbox) {
        checkbox.addEventListener('change', () => {
          if (checkbox.checked) {
            card.classList.add('selected');
          } else {
            card.classList.remove('selected');
          }
        });
      }
    });

    // Next button clicks
    const nextButtons = document.querySelectorAll('.btn-next');
    nextButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        // Validation per step
        if (currentStep === 1) {
          const selectedRadio = form.querySelector('input[name="targetAge"]:checked');
          if (!selectedRadio) {
            alert('אנא בחרו עבור מי הטיפול כדי להמשיך');
            return;
          }
        } else if (currentStep === 2) {
          // Checkbox is optional, but we can advance
        }
        
        if (currentStep < steps.length) {
          currentStep++;
          updateFormSteps();
        }
      });
    });

    // Previous button clicks
    const prevButtons = document.querySelectorAll('.btn-prev');
    prevButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        if (currentStep > 1) {
          currentStep--;
          updateFormSteps();
        }
      });
    });

    // Handle Form Submission with Netlify Form and Tracking
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Final validation
        const nameInput = document.getElementById('fullName');
        const phoneInput = document.getElementById('phone');

        if (!nameInput.value.trim() || !phoneInput.value.trim()) {
          alert('אנא מלאו שם ומספר טלפון כדי לשלוח את הפנייה');
          return;
        }
        
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

        // Gather checked difficulties as a comma-separated string for Netlify Form submission
        const checkedDifficulties = [];
        form.querySelectorAll('input[name="difficulties"]:checked').forEach(cb => {
          checkedDifficulties.push(cb.value);
        });
        formData.set('difficulties', checkedDifficulties.join(', '));

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
              'variant': variant,
              'target_age': formData.get('targetAge') || 'not_specified'
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
            currentStep = 1;
            updateFormSteps();
            // Reset option card selections
            optionCards.forEach(c => c.classList.remove('selected'));
            checkboxCards.forEach(c => {
              c.classList.remove('selected');
              const cb = c.querySelector('input[type="checkbox"]');
              if (cb) cb.checked = false;
            });
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

    // ==========================================
    // FAQ ACCORDION LOGIC
    // ==========================================
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
      const trigger = item.querySelector('.faq-trigger');
      
      trigger.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close all other FAQ items first
        faqItems.forEach(i => i.classList.remove('active'));
        
        if (!isActive) {
          item.classList.add('active');
          // Track FAQ view
          gtag('event', 'lp_faq_click', {
            'page_type': pageType,
            'variant': variant,
            'question': trigger.innerText.trim()
          });
        }
      });
    });

    // ==========================================
    // STICKY MOBILE CONVERSION BAR
    // ==========================================
    const stickyBar = document.querySelector('.sticky-mobile-bar');
    if (stickyBar) {
      window.addEventListener('scroll', () => {
        if (window.scrollY > 350) {
          stickyBar.classList.add('visible');
        } else {
          stickyBar.classList.remove('visible');
        }
      });

      // Track sticky button clicks specifically
      const stickyPhone = stickyBar.querySelector('.sticky-btn-phone');
      const stickyWa = stickyBar.querySelector('.sticky-btn-whatsapp');

      if (stickyPhone) {
        stickyPhone.addEventListener('click', () => {
          gtag('event', 'lp_sticky_phone_click', {
            'page_type': pageType,
            'variant': variant
          });
        });
      }

      if (stickyWa) {
        stickyWa.addEventListener('click', () => {
          gtag('event', 'lp_sticky_whatsapp_click', {
            'page_type': pageType,
            'variant': variant
          });
        });
      }
    }
  });
})();
