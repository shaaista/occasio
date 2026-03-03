import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const timelineSteps = [
  {
    id: 1,
    number: '01',
    title: 'DESIGN',
    heading: 'Craft an invitation.',
    description: 'Begin with the first impression. Texture, type, and tone combined into a singular vision.',
    textGridClass: 'col-start-1 row-start-1 flex items-center justify-end pr-8 h-full',
    textAlign: 'right' as const,
    imageGridClass: 'col-start-3 row-start-1 flex items-center justify-start pl-8 h-full',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBcEl9QsyKt8mEn8JpedwmD7eIkUFvJ3e3D07Lraxa1PjJTpFJMos-b-7wvGNPzHjFVIC9LORk4tM3XOeHN2pmnuVPwlOsqRPk_x9BXBtPt8SkQicBUiTRB3WeWRvGMbqDgm2Zi4yilrJD58k3ej5Ft_6eGwzYOx70bdlfKKJH1KqtNMpzyu1BfuCCFdyq3nnAIVAQjcGG_6EW5mIXbXKmDumh2YxrAUq3uCJMC8ddX2_qRR4_GGgc2VnvXUAzCc4eKDLTanZLuRlVy',
    imageBorderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%',
    imageFilter: 'contrast(1.1) saturate(0.8)',
    imageOverlayClass: 'bg-[#EADDD7]/10 mix-blend-multiply',
    floatClass: 'animate-float-slow',
    alt: 'Macro shot of hand-pressed linen card with gold lettering',
  },
  {
    id: 2,
    number: '02',
    title: 'SHARE',
    heading: 'Gather with ease.',
    description: 'Digital delivery or physical post. Track every RSVP in real-time as the guest list grows.',
    textGridClass: 'col-start-3 row-start-2 flex items-center justify-start pl-8 h-full',
    textAlign: 'left' as const,
    imageGridClass: 'col-start-1 row-start-2 flex items-center justify-end pr-8 h-full',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA1jA-tNW-bUEQImB7DQFuoICMsmzsoLJit1sjHnyPHHT3r9x7V8hWkNVxt_fyqzmy1lE5s-eU4Qf3iKqUoOUtDXVbyXDTS6oRvTgu2JYfkod-t4mueCLZ9YUfWgR31_psNJvRzjZhHX-x8TtrkcVwB0dXAODln9-X3Gk5_qsSIXMePVliYywnkPtLbG5cxfK5mF714ek9zIZDGDjszy9vX4PPzN2IER82Y_8sj00v1vBqGQDyhN-hsrWbawnopZ2pHM_Ij90ojDr65',
    imageBorderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
    imageFilter: 'contrast(1.1) brightness(1.05) saturate(0.7) sepia(0.2)',
    imageOverlayClass: 'bg-primary/10 mix-blend-overlay',
    floatClass: 'animate-float-medium',
    alt: 'Soft cinematic shot of person smiling at phone in sun',
  },
  {
    id: 3,
    number: '03',
    title: 'CURATE',
    heading: 'Shape the space.',
    description: 'From table linens to ambient lighting. Select details that define the mood and atmosphere.',
    textGridClass: 'col-start-1 row-start-3 flex items-center justify-end pr-8 h-full',
    textAlign: 'right' as const,
    imageGridClass: 'col-start-3 row-start-3 flex items-center justify-start pl-8 h-full',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCSpjMjhHrvGRBuR-1VDS5mKeqoUOoFPauxb7WnDfU3LE11NyD_IB_4ps3LoHcBUKGmeZ8nI9nIKTnS1nyADSQdmjRHpZYg3FKdCUQbYyMhKNoKhM1l2vBtebABmqx4VLnDEAFpPP0aO1SVrDLw3pe25LmOvOTqJ6iCkUyXz68bgVHYihUGRGjszGri-jNePm3m4OIS8MfK_VABtGUI2Phl84G_biI2ZtlOUOiXAz3Hj88JuXGRuw7HFueiXEd_u4AJpFxfVdzZhr9N',
    imageBorderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
    imageFilter: 'saturate(0.6) contrast(1) brightness(1.05) sepia(0.1)',
    imageOverlayClass: 'bg-[#211119]/5 mix-blend-multiply',
    floatClass: 'animate-float-fast',
    alt: 'Crystal glass and lavender on textured stone table',
  },
  {
    id: 4,
    number: '04',
    title: 'CELEBRATE',
    heading: 'Seamless moments.',
    description: 'The moment arrives. The details disappear into the experience, leaving only memories.',
    textGridClass: 'col-start-3 row-start-4 flex items-center justify-start pl-8 h-full',
    textAlign: 'left' as const,
    imageGridClass: 'col-start-1 row-start-4 flex items-center justify-end pr-8 h-full',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCAwWAGllnK8ovKIwuVxuoog-UjBEJiH79tDG8kZ9Mk_SGt4OwciMLsgcxClKHs0ic5hatqBShXGTCj0WWfgGkhm0qGGoTaYZbk9Zigj7t694u39w7rRIg88uA3sGSFfy_fQ4pXMM6ho05tvvwieCu8Lolpzp99-0-6TBpwN2JZAcFQL1DIs0eqSd9Xn9AVzdhtOvFCFimmG1PMRI3USLY-kQ_bjsKP1Q26H16FtLCY6QukBgkh8BlFhXy_xwtiFiKuNj6XNYIHj37B',
    imageBorderRadius: '50% 50% 20% 80% / 25% 80% 20% 75%',
    imageFilter: 'contrast(1.1) saturate(0.6) sepia(0.2)',
    imageOverlayClass: 'bg-primary/5 mix-blend-multiply',
    floatClass: 'animate-float-slow',
    alt: 'Cinematic shot of guests laughing at candlelit table',
  },
];

const dots = [
  { cx: 60, cy: 100 },
  { cx: 20, cy: 300 },
  { cx: 100, cy: 500 },
  { cx: 60, cy: 700 },
];

export default function Timeline() {
  const sectionRef  = useRef<HTMLElement>(null);
  const headingRef  = useRef<HTMLDivElement>(null);
  const pathRef     = useRef<SVGPathElement>(null);
  const stepsRef    = useRef<(HTMLDivElement | null)[]>([]);
  const imagesRef   = useRef<(HTMLDivElement | null)[]>([]);
  const circlesRef  = useRef<(SVGCircleElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {

      // ── Section entrance: scale up, rotate in, fade from below ────────
      gsap.fromTo(
        section,
        { scale: 0.85, rotate: 5, opacity: 0 },
        {
          scale: 1,
          rotate: 0,
          opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'top 20%',
            scrub: true,
          },
        }
      );

      // ── Set all initial hidden states ─────────────────────────────────

      gsap.set(headingRef.current, { opacity: 0, y: 30 });

      // Dots: collapsed to a point

      circlesRef.current.forEach((dot) => {
        if (dot) gsap.set(dot, { scale: 0, opacity: 0, transformOrigin: 'center center' });
      });

      // Images: collapsed to a point, nudged toward the centre column so the
      // grow direction visually matches the dot they emerge from
      imagesRef.current.forEach((img, i) => {
        if (!img) return;
        // Steps 0,2 → right column (col-3); Steps 1,3 → left column (col-1)
        const isRightCol = i % 2 === 0;
        gsap.set(img, {
          scale: 0,
          opacity: 0,
          x: isRightCol ? -24 : 24,          // start nudged toward centre line
          transformOrigin: isRightCol ? 'left center' : 'right center',
        });
      });

      // Text: invisible + blurred ("invisibility cloak")
      stepsRef.current.forEach((step) => {
        if (step) gsap.set(step, { opacity: 0, filter: 'blur(14px)' });
      });

      // Path: fully hidden
      if (pathRef.current) {
        const len = pathRef.current.getTotalLength();
        gsap.set(pathRef.current, { strokeDasharray: len, strokeDashoffset: len });
      }

      // ── Heading fades in ────────────────────────────────────────────────
      gsap.to(headingRef.current, {
        opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      });

      // ── Path draws tied to section scroll ───────────────────────────────
      if (pathRef.current) {
        gsap.to(pathRef.current, {
          strokeDashoffset: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top 50%',
            end: 'bottom top',
            scrub: 1,
          },
        });
      }

      // ── Per-step trigger: fires when that step's centre hits viewport centre ──
      // Each step is independent so timing is always correct regardless of DOM layout.
      // scrub: 1 means scrolling up automatically reverses the animation.
      stepsRef.current.forEach((step, i) => {
        if (!step) return;

        const dot = circlesRef.current[i];
        const img = imagesRef.current[i];

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: step,
            start: 'center 75%',
            end: 'center 50%',
            scrub: 1,
          },
        });

        // 1. Dot snaps in
        if (dot) {
          tl.to(dot, { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(3)' }, 0);
        }

        // 2. Image blooms outward from the dot's direction
        if (img) {
          tl.to(img, {
            scale: 1, opacity: 1, x: 0,
            duration: 1.1,
            ease: 'back.out(1.5)',
          }, 0.05);
        }

        // 3. Text removes its invisibility cloak
        tl.to(step, {
          opacity: 1,
          filter: 'blur(0px)',
          duration: 0.8,
          ease: 'power2.out',
        }, 0.4);
      });

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-32 bg-[#EADDD7] text-background-dark overflow-hidden flex flex-col justify-start items-center"
    >
      {/* Stone texture overlay — matches DecorGifts section */}
      <div
        className="absolute inset-0 z-0 opacity-30 mix-blend-multiply pointer-events-none"
        style={{
          backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuD0yNSOWSBJLsv1-47TiuxQ15AFQ4nsrk2tyl20R-zvNNsiDXBNDhZVYz1yHqSCTtqtGcVjl35j2rrDIrA-d5xW6tM2FPDinMxC7wGNXKzBCT0JhfwdSkLFQPVqU1yfc1GtqRHSfxSmlitg3lWmrbcCqzLdzR4XsiD9nN9-_O7fp4ViDdX7MFMvLLa9exuWvETBq8HCVRb7NcpP7tWvqDoEWCeegHipJmlKBCM4gpRO9AROi6bPaa2gmQvHKabiYnelhLueCkgQ9QIe')`,
        }}
      />

      <div className="container mx-auto px-6 relative z-10 max-w-6xl">

        {/* Heading */}
        <div ref={headingRef} className="text-center mb-16 relative z-20">
          <span className="text-xs tracking-[0.2em] font-bold text-primary mb-4 uppercase block">
            THE JOURNEY
          </span>
          <h2 className="text-5xl md:text-6xl font-serif-exp mb-8 leading-tight">
            From Invitation <br /> to Atmosphere.
          </h2>
          <p className="text-lg opacity-70 font-display leading-relaxed max-w-md mx-auto">
            Every celebration unfolds in stages. Each step builds toward the experience.
          </p>
        </div>

        {/* Timeline Grid */}
        <div className="relative w-full max-w-5xl mx-auto min-h-[900px] grid grid-cols-[1fr_120px_1fr] grid-rows-4 items-center gap-y-12">

          {/* SVG path + dots — centre column */}
          <div className="col-start-2 col-end-3 row-start-1 row-end-5 h-full relative flex justify-center pointer-events-none">
            <svg
              className="absolute top-0 h-full w-[120px]"
              preserveAspectRatio="none"
              viewBox="0 0 120 800"
            >
              <path
                ref={pathRef}
                d="M60,0
                   C60,100 60,100 60,100
                   C60,200 20,200 20,300
                   C20,400 100,400 100,500
                   C100,600 60,600 60,700
                   S 60,800 60,800"
                fill="none"
                stroke="#211119"
                strokeLinecap="round"
                strokeOpacity="0.2"
                strokeWidth="1.5"
              />
              {dots.map((d, i) => (
                <circle
                  key={i}
                  ref={(el) => { circlesRef.current[i] = el; }}
                  cx={d.cx}
                  cy={d.cy}
                  r="6"
                  fill="#211119"
                />
              ))}
            </svg>
          </div>

          {/* Text + Image cells per row */}
          {timelineSteps.map((step, index) => (
            <>
              {/* Text cell */}
              <div
                key={`text-${step.id}`}
                ref={(el) => { stepsRef.current[index] = el; }}
                className={step.textGridClass}
              >
                <div className={step.textAlign === 'right' ? 'text-right max-w-xs' : 'text-left max-w-xs'}>
                  <span className="text-sm font-bold tracking-widest mb-2 opacity-50 font-mono text-primary block">
                    {step.number} — {step.title}
                  </span>
                  <h3 className="text-3xl font-serif-exp mb-3">{step.heading}</h3>
                  <p className="opacity-60 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>

              {/* Image cell */}
              <div
                key={`img-${step.id}`}
                className={step.imageGridClass}
              >
                <div
                  ref={(el) => { imagesRef.current[index] = el; }}
                  className="w-48 h-64 overflow-hidden relative shadow-xl parallax-wrapper"
                  style={{ borderRadius: step.imageBorderRadius }}
                >
                  <img
                    className="w-full h-full object-cover"
                    style={{ filter: step.imageFilter }}
                    src={step.image}
                    alt={step.alt}
                  />
                  <div className={`absolute inset-0 ${step.imageOverlayClass}`} />
                </div>
              </div>
            </>
          ))}

        </div>
      </div>
    </section>
  );
}
