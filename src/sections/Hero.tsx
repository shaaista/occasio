import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import InfiniteGallery from '@/components/ui/3d-gallery-photography';

const heroGalleryImages = [
  { src: 'https://images.unsplash.com/photo-1741332966416-414d8a5b8887?w=600&auto=format&fit=crop&q=60', alt: 'Gallery 1' },
  { src: 'https://images.unsplash.com/photo-1754769440490-2eb64d715775?q=80&w=1113&auto=format&fit=crop', alt: 'Gallery 2' },
  { src: 'https://images.unsplash.com/photo-1758640920659-0bb864175983?w=600&auto=format&fit=crop&q=60', alt: 'Gallery 3' },
  { src: 'https://plus.unsplash.com/premium_photo-1758367454070-731d3cc11774?w=600&auto=format&fit=crop&q=60', alt: 'Gallery 4' },
  { src: 'https://images.unsplash.com/photo-1746023841657-e5cd7cc90d2c?w=600&auto=format&fit=crop&q=60', alt: 'Gallery 5' },
  { src: 'https://images.unsplash.com/photo-1741715661559-6149723ea89a?w=600&auto=format&fit=crop&q=60', alt: 'Gallery 6' },
  { src: 'https://images.unsplash.com/photo-1725878746053-407492aa4034?w=600&auto=format&fit=crop&q=60', alt: 'Gallery 7' },
  { src: 'https://images.unsplash.com/photo-1752588975168-d2d7965a6d64?w=600&auto=format&fit=crop&q=60', alt: 'Gallery 8' },
];

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial entrance animation
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' }
      );

      // Title fade out on scroll
      gsap.fromTo(
        titleRef.current,
        { opacity: 1, y: 0 },
        {
          opacity: 0,
          y: -50,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: '30% top',
            end: '60% top',
            scrub: true,
          },
        }
      );

      // Section exit: scale down, rotate, fade out as Hero scrolls away
      gsap.to(sectionRef.current, {
        scale: 0.85,
        rotate: -5,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'bottom 80%',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full liquid-bg z-10 overflow-hidden"
    >
      {/* Animated glow */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-20 animate-pulse pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(230,25,128,0.9) 0%, transparent 70%)' }} />
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent pointer-events-none" />

      {/* 3D Gallery — pops through behind Occasio title */}
      <div className="absolute inset-0 z-[35] pointer-events-none">
        <InfiniteGallery
          images={heroGalleryImages}
          visibleCount={12}
          className="h-full w-full"
          fadeSettings={{
            fadeIn: { start: 0.05, end: 0.25 },
            fadeOut: { start: 0.4, end: 0.43 },
          }}
          blurSettings={{
            blurIn: { start: 0.0, end: 0.1 },
            blurOut: { start: 0.4, end: 0.43 },
            maxBlur: 6.0,
          }}
        />
      </div>

      {/* Center Content - Overlay */}
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
    </section>
  );
}
