import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import InfiniteGallery from '@/components/ui/3d-gallery-photography';

const heroGalleryImages = [
  { src: 'https://static.wixstatic.com/media/e64ad3_954de0a962584b549ace8ee22d8555cb~mv2.jpeg/v1/fit/w_960,h_962,q_90,enc_avif,quality_auto/e64ad3_954de0a962584b549ace8ee22d8555cb~mv2.jpeg', alt: 'Reception Decor 1' },
  { src: 'https://static.wixstatic.com/media/e64ad3_e49609a6b68b4a718eb9009baca15c26~mv2.jpeg/v1/fit/w_960,h_634,q_90,enc_avif,quality_auto/e64ad3_e49609a6b68b4a718eb9009baca15c26~mv2.jpeg', alt: 'Reception Decor 2' },
  { src: 'https://static.wixstatic.com/media/e64ad3_7868060089754a74b7376491c2cb8592~mv2.jpg/v1/fit/w_960,h_540,q_90,enc_avif,quality_auto/e64ad3_7868060089754a74b7376491c2cb8592~mv2.jpg', alt: 'Reception Decor 3' },
  { src: 'https://static.wixstatic.com/media/e64ad3_dacab933ca7647b6b866212ae4fe0f39~mv2.jpg/v1/fit/w_960,h_640,q_90,enc_avif,quality_auto/e64ad3_dacab933ca7647b6b866212ae4fe0f39~mv2.jpg', alt: 'Wedding Decor 1' },
  { src: 'https://static.wixstatic.com/media/e64ad3_c5e860385c6f48818d64275f032fc122~mv2.jpeg/v1/fit/w_960,h_960,q_90,enc_avif,quality_auto/e64ad3_c5e860385c6f48818d64275f032fc122~mv2.jpeg', alt: 'Event Decor 1' },
  { src: 'https://static.wixstatic.com/media/e64ad3_e549610bf87b44e1acfb05813943e87f~mv2.jpg/v1/fit/w_960,h_635,q_90,enc_avif,quality_auto/e64ad3_e549610bf87b44e1acfb05813943e87f~mv2.jpg', alt: 'Reception Decor 4' },
  { src: 'https://static.wixstatic.com/media/e64ad3_eac1534f86034ece95a8a26a504220ed~mv2.jpg/v1/fit/w_960,h_636,q_90,enc_avif,quality_auto/e64ad3_eac1534f86034ece95a8a26a504220ed~mv2.jpg', alt: 'Wedding Decor 2' },
  { src: 'https://static.wixstatic.com/media/e64ad3_336a8ba0af1a40db92edf9d5c016d952~mv2.jpeg/v1/fit/w_960,h_724,q_90,enc_avif,quality_auto/e64ad3_336a8ba0af1a40db92edf9d5c016d952~mv2.jpeg', alt: 'Event Decor 2' },
];

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const outerRef = useRef<HTMLElement>(null);  // scroll buffer — 300vh, no bg
  const innerRef = useRef<HTMLDivElement>(null); // sticky viewport layer — has the bg
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' }
      );

      // Zoom scrubbed over 200vh. The hero overlay is position:fixed so it
      // never moves — the page scrolls silently underneath it.
      // Timeline (in normal flow at 200vh) rides up invisibly behind the hero.
      gsap.to(titleRef.current, {
        scale: 22,
        ease: 'power2.in',
        scrollTrigger: {
          trigger: outerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.8,
        },
      });

      // Exact moment the outer spacer exits the viewport top = Timeline is now
      // sitting right at the viewport top behind the hero. Instantly remove hero,
      // then fire an event so App.tsx can freeze scroll for 2 seconds.
      ScrollTrigger.create({
        trigger: outerRef.current,
        start: 'bottom top',
        onEnter: () => {
          gsap.set(innerRef.current, { display: 'none' });
          window.dispatchEvent(new CustomEvent('hero-exit'));
        },
        onLeaveBack: () => gsap.set(innerRef.current, { display: 'block' }),
      });
    }, outerRef);

    return () => ctx.revert();
  }, []);

  return (
    // Outer: 200vh scroll buffer. bg-[#EADDD7] matches Timeline so when hero
    // fades the cut is invisible — same color shows through, then Timeline appears.
    <section ref={outerRef} className="relative h-[200vh] w-full bg-[#EADDD7]">
      {/* Inner: fixed — stays locked to viewport top while page scrolls underneath */}
      <div
        ref={innerRef}
        className="fixed top-0 left-0 h-screen w-full liquid-bg z-10 overflow-hidden"
      >
        {/* Animated glow */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-20 animate-pulse pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(230,25,128,0.9) 0%, transparent 70%)' }} />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent pointer-events-none" />

        {/* 3D Gallery */}
        <div className="absolute inset-0 z-[35] pointer-events-none">
          <InfiniteGallery
            images={heroGalleryImages}
            visibleCount={12}
            className="h-full w-full"
            fadeSettings={{
              fadeIn:  { start: 0.05, end: 0.2  },
              fadeOut: { start: 0.28, end: 0.35 },
            }}
            blurSettings={{
              blurIn:  { start: 0.0,  end: 0.1  },
              blurOut: { start: 0.28, end: 0.35 },
              maxBlur: 6.0,
            }}
          />
        </div>

        {/* Title */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-40 mix-blend-difference">
          <h1
            ref={titleRef}
            className="font-serif-exp text-[8vw] leading-none tracking-tighter text-center"
          >
            <span className="block italic text-white/80">
              Occasio
            </span>
          </h1>
        </div>
      </div>
    </section>
  );
}
