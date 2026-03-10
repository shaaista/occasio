import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ReactLenis } from 'lenis/react';
import type { LenisRef } from 'lenis/react';
import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import Invitations from './sections/Invitations';
import ChapterTransition from './sections/ChapterTransition';
import DecorGifts from './sections/DecorGifts';
import Timeline from './sections/Timeline';
import Footer from './sections/Footer';
import './App.css';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);
// Promote all GSAP-animated elements to GPU layers
gsap.config({ force3D: true });

function App() {
  const lenisRef = useRef<LenisRef | null>(null);

  useEffect(() => {
    ScrollTrigger.defaults({
      toggleActions: 'play none none reverse',
      fastScrollEnd: true,
    });

    // Sync Lenis smooth scroll with GSAP ScrollTrigger
    const lenis = lenisRef.current?.lenis;
    if (lenis) {
      lenis.on('scroll', ScrollTrigger.update);
    }

    ScrollTrigger.refresh();

    // Freeze scroll for 2 s after hero exits so Timeline stays static on reveal
    const handleHeroExit = () => {
      const l = lenisRef.current?.lenis;
      if (!l) return;
      l.stop();
      setTimeout(() => l.start(), 500);
    };
    window.addEventListener('hero-exit', handleHeroExit);

    return () => {
      if (lenis) lenis.off('scroll', ScrollTrigger.update);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      window.removeEventListener('hero-exit', handleHeroExit);
    };
  }, []);

  return (
    <ReactLenis root ref={lenisRef} options={{ lerp: 0.1 }}>
      <div className="relative min-h-screen bg-background-dark">
        <Navigation />

        <main className="relative w-full">
          <Hero />

          <div id="timeline">
            <Timeline />
          </div>

          {/* Shared dark bg — Invitations + ChapterTransition as one continuous surface */}
          <div className="relative bg-background-dark">
            <div className="absolute inset-0 liquid-bg opacity-30 pointer-events-none" />
            <Invitations />
            <ChapterTransition />
          </div>

          {/* Décor & Gifts — slides up as a card over the zoom section */}
          <div
            id="decor"
            className="relative z-10 -mt-8 rounded-tl-[2rem] rounded-tr-[2rem] overflow-hidden"
          >
            <DecorGifts />
          </div>

          <div id="footer">
            <Footer />
          </div>
        </main>
      </div>
    </ReactLenis>
  );
}

export default App;
