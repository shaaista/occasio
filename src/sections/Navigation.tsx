import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Navigation() {
  const navRef = useRef<HTMLElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        navRef.current,
        { opacity: 0, y: -20 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.5,
          ease: 'power3.out',
        }
      );
    }, navRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <>
      {/* Main Navigation */}
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 w-full z-50 px-8 py-6 flex justify-between items-center transition-all duration-500 ${
          isScrolled
            ? 'bg-background-dark/80 backdrop-blur-md border-b border-white/5'
            : 'bg-transparent'
        }`}
      >
        {/* Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="pointer-events-auto cursor-pointer group flex flex-col items-start"
        >
          <span className="block text-xs tracking-[0.3em] font-bold mb-1 opacity-70 group-hover:opacity-100 transition-opacity">
            {isMenuOpen ? 'CLOSE' : 'MENU'}
          </span>
          <div className="h-[1px] w-8 bg-white group-hover:w-16 transition-all duration-300" />
        </button>

        {/* Center OCCASIO logo — appears when scrolled */}
        <div
          className={`absolute left-1/2 -translate-x-1/2 transition-all duration-500 ${
            isScrolled ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <span className="font-ciguatera text-xl tracking-wider">OCCASIO</span>
        </div>
      </nav>

      {/* Shopping Bag — Fixed Bottom Right (code.html position) */}
      <div className="fixed bottom-8 right-8 z-50">
        <button className="bg-primary/20 hover:bg-primary text-white p-4 rounded-full backdrop-blur-md transition-all duration-500 border border-white/10 group">
          <span className="material-icons text-xl group-hover:rotate-12 transition-transform">shopping_bag</span>
        </button>
      </div>

      {/* Full Screen Menu */}
      <div
        className={`fixed inset-0 z-40 bg-background-dark/95 backdrop-blur-xl transition-all duration-700 ${
          isMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="container mx-auto px-6 h-full flex flex-col justify-center">
          <nav className="space-y-8">
            {[
              { label: 'Home', id: 'hero' },
              { label: 'Invitations', id: 'invitations' },
              { label: 'Décor & Gifts', id: 'decor' },
              { label: 'The Journey', id: 'timeline' },
              { label: 'Contact', id: 'footer' },
            ].map((item, index) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`block text-4xl md:text-6xl font-serif-exp text-white hover:text-primary transition-all duration-300 transform ${
                  isMenuOpen
                    ? 'translate-x-0 opacity-100'
                    : '-translate-x-10 opacity-0'
                }`}
                style={{
                  transitionDelay: isMenuOpen ? `${index * 100}ms` : '0ms',
                }}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Menu Footer */}
          <div
            className={`absolute bottom-12 left-6 right-6 flex justify-between items-end transition-all duration-500 ${
              isMenuOpen ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ transitionDelay: isMenuOpen ? '500ms' : '0ms' }}
          >
            <div className="text-sm text-white/50">
              <p>Every Occasion Begins</p>
              <p>With a Moment</p>
            </div>
            <div className="text-right text-sm text-white/50">
              <p>The Art of</p>
              <p>Celebration</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
