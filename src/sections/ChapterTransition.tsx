import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

const TITLE_WORDS = 'Once the invite is sent, the scene comes next.'.split(' ');
const DESC_WORDS  = 'Now the space takes shape — décor, gifts, and details that make it feel intentional. Everything stays cohesive. Everything stays easy.'.split(' ');

function RevealWord({
  word,
  progress,
  range,
}: {
  word: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0, 1]);
  return (
    <span className="relative inline-block mx-[0.18em]">
      <span className="absolute opacity-30">{word}</span>
      <motion.span style={{ opacity }}>{word}</motion.span>
    </span>
  );
}

export default function ChapterTransition() {
  const sectionRef    = useRef<HTMLElement>(null);
  const lineTopRef    = useRef<HTMLDivElement>(null);
  const lineBottomRef = useRef<HTMLDivElement>(null);
  const chapterRef    = useRef<HTMLSpanElement>(null);

  // Scroll progress over the whole section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 40%', 'end 60%'],
  });

  const titleCount = TITLE_WORDS.length;
  // Give title 50% of the scroll range regardless of word count,
  // so heading reveals noticeably before the description starts.
  const TITLE_SHARE = 0.5;

  useEffect(() => {
    gsap.set([lineTopRef.current, lineBottomRef.current], { scaleY: 0 });
    gsap.set(chapterRef.current, { opacity: 0, y: 20 });

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 88%',
        end: 'bottom 5%',

        onEnter: () => {
          gsap.to([lineTopRef.current, lineBottomRef.current], {
            scaleY: 1, duration: 0.9, ease: 'power3.out',
          });
          gsap.to(chapterRef.current, {
            opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
          });
        },

        onLeave: () => {
          gsap.to([lineTopRef.current, lineBottomRef.current], {
            scaleY: 0, duration: 0.5, ease: 'power3.in',
          });
          gsap.to(chapterRef.current, {
            opacity: 0, y: -16, duration: 0.4, ease: 'power3.in',
          });
        },

        onEnterBack: () => {
          gsap.to([lineTopRef.current, lineBottomRef.current], {
            scaleY: 1, duration: 0.9, ease: 'power3.out',
          });
          gsap.to(chapterRef.current, {
            opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
          });
        },

        onLeaveBack: () => {
          gsap.to([lineTopRef.current, lineBottomRef.current], {
            scaleY: 0, duration: 0.5, ease: 'power3.in',
          });
          gsap.to(chapterRef.current, {
            opacity: 0, y: 20, duration: 0.4, ease: 'power3.in',
          });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    // No border, no separate bg — flows directly from Invitations as one surface
    <section
      ref={sectionRef}
      className="relative w-full py-20 overflow-hidden"
    >

      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center justify-center text-center">

        {/* Top line */}
        <div
          ref={lineTopRef}
          className="w-px h-16 bg-gradient-to-b from-transparent to-primary/50 mb-8 origin-top"
        />

        {/* Chapter label */}
        <span
          ref={chapterRef}
          className="text-xs tracking-[0.3em] font-bold text-primary mb-6"
        >
          CHAPTER II
        </span>

        {/* Title — scroll-driven word reveal, same font/size as before */}
        <div className="mb-8 max-w-4xl">
          <h2 className="text-3xl md:text-5xl font-serif-exp text-white leading-tight flex flex-wrap justify-center">
            {TITLE_WORDS.map((word, i) => {
              const start = (i / titleCount) * TITLE_SHARE;
              const end   = ((i + 1) / titleCount) * TITLE_SHARE;
              return (
                <RevealWord
                  key={i}
                  word={word}
                  progress={scrollYProgress}
                  range={[start, end]}
                />
              );
            })}
          </h2>
        </div>

        {/* Description — scroll-driven word reveal, same font/size as before */}
        <div>
          <p className="text-gray-400 font-display text-lg leading-relaxed max-w-xl flex flex-wrap justify-center">
            {DESC_WORDS.map((word, i) => {
              const descCount = DESC_WORDS.length;
              const start = TITLE_SHARE + (i / descCount) * (1 - TITLE_SHARE);
              const end   = TITLE_SHARE + ((i + 1) / descCount) * (1 - TITLE_SHARE);
              return (
                <RevealWord
                  key={i}
                  word={word}
                  progress={scrollYProgress}
                  range={[start, end]}
                />
              );
            })}
          </p>
        </div>

        {/* Bottom line */}
        <div
          ref={lineBottomRef}
          className="w-px h-16 bg-gradient-to-t from-transparent to-primary/50 mt-8 origin-bottom"
        />
      </div>
    </section>
  );
}
