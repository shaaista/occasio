import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import InfiniteGallery from '@/components/ui/3d-gallery-photography';

const heroGalleryImages = [
  { src: 'https://images.pexels.com/photos/1484988/pexels-photo-1484988.jpeg?auto=compress&cs=tinysrgb&w=960&fit=crop&h=640', alt: 'Vibrant Indian bride with colorful smoke' },
  { src: 'https://images.pexels.com/photos/3447328/pexels-photo-3447328.jpeg?auto=compress&cs=tinysrgb&w=960&fit=crop&h=640', alt: 'Holi celebration with colorful powders' },
  { src: 'https://images.pexels.com/photos/725458/pexels-photo-725458.jpeg?auto=compress&cs=tinysrgb&w=960&fit=crop&h=640', alt: 'South Asian bride in traditional attire' },
  { src: 'https://images.pexels.com/photos/7686379/pexels-photo-7686379.jpeg?auto=compress&cs=tinysrgb&w=960&fit=crop&h=640', alt: 'Diwali celebration with sparklers' },
  { src: 'https://images.pexels.com/photos/2060240/pexels-photo-2060240.jpeg?auto=compress&cs=tinysrgb&w=960&fit=crop&h=640', alt: 'Colorful Indian wedding ceremony at night' },
  { src: 'https://images.pexels.com/photos/974320/pexels-photo-974320.jpeg?auto=compress&cs=tinysrgb&w=960&fit=crop&h=640', alt: 'Joyful Holi festival crowd' },
  { src: 'https://images.pexels.com/photos/5759215/pexels-photo-5759215.jpeg?auto=compress&cs=tinysrgb&w=960&fit=crop&h=640', alt: 'Indian couple at wedding ceremony' },
  { src: 'https://images.pexels.com/photos/1707446/pexels-photo-1707446.jpeg?auto=compress&cs=tinysrgb&w=960&fit=crop&h=640', alt: 'Couple in colorful traditional attire' },
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
              Moments & Memories
            </span>
          </h1>
        </div>
      </div>
    </section>
  );
}
