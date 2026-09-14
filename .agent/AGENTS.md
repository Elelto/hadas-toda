# Workspace Guidelines

## Mandatory Expert Consultations
- **CRITICAL:** The user explicitly demands that for every major architectural, UI/UX, or complex debugging problem, you MUST first invoke an expert subagent (e.g., using the `pro` model, simulated as "Elite UX Architect" or "Claude Opus Thinking") to analyze the problem and propose a solution BEFORE you execute the change. "This is the method" according to the user. Do not skip this step.

## Mobile-First Design
- **CRITICAL:** Most users arrive via mobile devices. Always prioritize mobile layout, tap targets (padding/margins for fingers), readable font sizes, and optimized performance for mobile screens. Any UI/UX changes or new components must be designed and reviewed for mobile *first* before desktop.

## Location-Based Copywriting (Bnei Brak vs. Online)
- **General/Online Pages:** Do NOT mention "Bnei Brak" or any specific location to avoid sounding sectarian or exclusionary to audiences from other areas. Keep the tone universal and national (e.g. "קליניקה לטיפול באונליין").
- **Local/Bnei Brak Specific Pages:** Only mention "Bnei Brak" when the page is explicitly targeted at the local population seeking in-person treatment in Bnei Brak.

## Professional Aesthetics (No Emojis)
- **Clinical Credibility:** Avoid using playful emojis (💼, 🎒, 🧸) in UI elements. Always use clean, professional SVG icons (like Lucide) to maintain a high-trust, medical aesthetic.

## Clinical Authority vs. Sales Copy
- **Trust Badges:** Avoid cliché sales phrases (e.g., '100% יחס אישי'). Prioritize clinical authority and measurable data (e.g., 'טיפול מבוסס מחקר', '7+ שנות ניסיון קליני').

## CTA Strategy
- **Button Placement:** Do not spam the page with CTA buttons. Place them strategically (Hero, after Testimonials, end of FAQ). Keep the text soft (e.g., 'לשיחת התאמה קצרה') rather than aggressive.

## Smart Lead Forms
- **Dynamic Logic:** Forms should adapt based on user input (e.g., show adult difficulties vs. child difficulties). Always include a "Fast Track" checkbox to reduce friction for users in a hurry.

## Mobile Layouts
- **Carousels:** Use horizontal swipe carousels for long lists (like Testimonials) on mobile to prevent scroll fatigue.

## CSS Layout & Scroll Trapping (Mobile)
- **Scroll Trapping:** NEVER use `overflow-x: hidden` on main layout containers (e.g. `body`, `main`, page wrappers). Doing so forces an implicit `overflow-y: auto`, converting the page into an inner scroll container and trapping touch inputs on mobile (the "dead scroll zones" bug). Always use `overflow-x: clip` instead.
- **Pointer Events:** Always ensure large decorative background elements (blobs, aurora shapes, massive quotes) have `pointer-events: none` so they don't block mobile touch and scroll interactions.

## 3D Cinematic Scrollytelling Architecture
- **Solution Name:** **State-Based Scroll Stepping** (combined with **Lerp Interpolation** for 3D physics).
- **Why:** Tying animations directly 1:1 to the user's scroll position (Scroll Scrubbing) or using CSS `scroll-snap-type` causes severe jittering on mobile Safari (due to dynamic address bars), creates "dead zones" where touch inputs get trapped, and results in overlapping "blurs" of text if the user scrolls quickly.
- **Implementation Rules:**
  1. Use a standard `250vh` (or similar) scrolling wrapper to provide native scroll distance.
  2. Inside, use a `position: sticky; height: 100vh; overflow: hidden;` container.
  3. Map the raw scroll progress (`useScroll`) to discrete **States/Steps** (e.g., Step 0, 1, 2) rather than continuous values.
  4. Animate text based on the active State using fixed transitions (e.g., `transition={{ duration: 0.8 }}`).
  5. Emit the discrete state to the Three.js Canvas, and use `THREE.MathUtils.lerp()` in the `useFrame` loop to physically smooth the particle movements (e.g., the Heart assembly) so they never teleport, gracefully bridging the gap between discrete steps.

## Logo Sizing & Quality
- **High-Res PNGs:** The main logo is an AI-upscaled and auto-cropped PNG (`logo-trimmed.png`) with no transparent padding. Do NOT use CSS `transform: scale()` to enlarge it, as it causes layout breakout. Instead, use explicit heights (`110px` desktop, `90px` tablet, `80px` mobile) to maintain maximum legible sharpness without hacks.

## Project Architecture & Structure
- **Tech Stack:** React 19, Vite, React Router DOM, Custom Firebase CMS, Firebase Firestore & Storage.
- **Styling & Animations:** Vanilla CSS (`src/styles`), Framer Motion, AOS (Animate on Scroll), Swiper (for carousels).
- **Directory Structure:**
  - `src/pages`: Home, About, Services, Contact, Blog, BlogPost, BneiBrak (Local Landing), OnlineTherapy (National Landing), AIAssessment, Admin, Testimonials.
  - `src/components`: UI (Header, Footer), Visuals (AuroraBackground, OrganicShapes, SoundWaves), Widgets (SmartLeadForm, AccessibilityWidget, FloatingWhatsApp), SEO (SEOHead, StructuredData).
  - `src/content & src/data`: Static data and CMS-driven content.
  - `scripts/`: Custom Node.js scripts for SEO, sitemap generation, content sync, and build optimization.

## Project Goal, Style, and Character
- **Goal:** A professional, lead-generating website for "Hadas Toda" (הדס תודה), a certified speech therapist (M.A.). Dual purpose: attracting local patients in Bnei Brak for in-person treatment, and a broader national audience for online therapy.
- **Target Audience:** Parents of children with speech/language difficulties, and adults needing voice therapy, stuttering treatment, or articulation improvement.
- **Character & Tone:** Clinical authority mixed with accessibility. Trustworthy, empathetic, professional, and research-based. Copywriting avoids aggressive sales pitches in favor of soft, inviting CTAs ("לשיחת התאמה קצרה"). 
- **Style & Aesthetics:** "Premium, Dynamic, Medical". Clean layout without playful emojis, using high-quality SVG icons (Lucide). Employs modern micro-animations, subtle background effects (aurora shapes, sound waves), and horizontal carousels to create a dynamic, highly responsive mobile-first experience.
