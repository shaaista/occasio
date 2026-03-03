import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Tilt } from '@/components/ui/tilt';
import { Spotlight } from '@/components/ui/spotlight';

gsap.registerPlugin(ScrollTrigger);

const invitationCards = [
  {
    id: 1,
    title: 'The Wedding Suite',
    subtitle: 'DIGITAL ONLY',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBHUVjNIb2L_BZwEul4KsoV7Z7NgS7SS_bJTaEkUar6gdCojVUuEq4_yRz0dq-ZOHTQ52v116AzFmMM_AtD2YsKVRyQM9NNBgW-95L1jejtWP3UcvfV7M-Uea0Rtat1tzciAEmV5j5e6AVaUB0FfapGqagA2wX_N4-9wO9Av4MXBqwyD3oPlhGzwNUB4ZdzlYhg61FAOfGr_qYCbO97K1Fd0urrv1urrOR9WI0dz13SeeWrMSGaK8cIR-ZN5TCv9d2l6t2BXiccOuoX',
    borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%',
    offset: 'mt-12',
  },
  {
    id: 2,
    title: 'Birthday Glow',
    subtitle: 'HYBRID SUITE',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA7pZ2qyMnKbcW2nl-i3a9x9e7Br7eAMzcAEbIMOXNvaaIcOukOGA9YZiD1ZHgdS6-2mtL317u0lZh0-W-5aDI-ErBuTCxaoA_zRv8z-V9ViHqeDTvQrCFRN95Lt-Vgmb805VvqJrwVYfzE7EjUYmntL5_pHA_gUfdqJbFD5yUTu2MG-Wu1saiAJCtoFfdwBMADH5QN8tUiMylQ9pCr1GRtNoePHY64eZLnQYTiEigr1JJneadi_TmZ5kOt0wKPZOESvZey-_ohH_Sr',
    borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
    offset: '-mt-12 md:-mt-24',
  },
  {
    id: 3,
    title: 'Baby Shower Bloom',
    subtitle: 'PRINT & DIGITAL',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDqfCXMpLOjKK1JgPdCa7-RJpNLQ_52mfy0md2RO836WiymsojqoQ2QaEuBJDRUM-ofV4QgHTwlU-8h0SjDiSaxFmjQnaUXzoDEZomSrMsU_Kp9YSaxpItd1cI7M0Lz3biNX7fYZKGqqhEIOZaTbRvB276khMmd9hOMcO75G2CbGuAHsD8VzdMiwCcm_tVYyKQYDBJqAUqqVIQ3y1vb0jLTZox2Cx80AHrMO_7JlRBenZuHOD6Tcu1MqZrvtqiuBsynoKh5FcfvQ5fM',
    borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
    offset: 'mt-8',
  },
];

export default function Invitations() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Cards staggered entrance — single batch trigger
      gsap.fromTo(
        cardsRef.current.filter(Boolean),
        { opacity: 0, y: 80, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardsRef.current[0],
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Parallax — one single ScrollTrigger for all cards
      gsap.to(cardsRef.current.filter(Boolean), {
        y: (i: number) => (i % 2 === 0 ? -30 : -50),
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-32 overflow-hidden"
    >

      <div className="container mx-auto px-6 relative z-10">
        {/* Heading */}
        <div ref={headingRef} className="flex flex-col md:flex-row items-start justify-between mb-24">
          <div className="md:w-1/2">
            <h2 className="text-4xl md:text-5xl font-serif-exp italic mb-6 text-white leading-tight">
              Design Invitations That Move <br />
              <span className="text-primary not-italic font-agatho">With Your Celebration.</span>
            </h2>
            <p className="text-gray-400 font-display text-lg leading-relaxed max-w-md">
              Our invitations aren't static cards. They're living canvases that carry the emotion of your moment.
            </p>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 min-h-[60vh]">
          {invitationCards.map((card, index) => (
            <div
              key={card.id}
              ref={(el) => { cardsRef.current[index] = el; }}
              className={`relative group flex flex-col items-center ${card.offset}`}
              style={{ willChange: 'transform' }}
            >
              {/* Blob Card */}
              <Tilt
                className="w-2/3 md:w-[58%] aspect-[4/5] blob-shape glass-panel overflow-hidden relative"
                style={{
                  borderRadius: card.borderRadius,
                  animation: `morph 8s ease-in-out infinite`,
                  animationDelay: `${index * 2}s`,
                } as React.CSSProperties}
                rotationFactor={6}
                isRevese
                springOptions={{ stiffness: 26.7, damping: 4.1, mass: 0.2 }}
              >
                <Spotlight
                  className="z-10 from-white/50 via-white/20 to-white/5 blur-2xl"
                  size={220}
                  springOptions={{ stiffness: 26.7, damping: 4.1, mass: 0.2 }}
                />
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700"
                />
              </Tilt>

              {/* Card Info */}
              <div className="mt-6 text-center w-full">
                <h3 className="text-xl font-serif-exp">
                  {card.title}
                </h3>
                <p className="text-xs tracking-widest text-primary mt-2">
                  {card.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
