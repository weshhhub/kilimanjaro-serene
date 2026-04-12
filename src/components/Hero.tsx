import { motion } from 'motion/react';
import { ChevronDown, ArrowRight } from 'lucide-react';
import Button from './ui/Button';

interface HeroProps {
  onBook: () => void;
  onExplore: () => void;
}

export default function Hero({ onBook, onExplore }: HeroProps) {
  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center pt-20">
      {/* Background Image with Parallax-like feel */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://picsum.photos/seed/kilimanjaro/1920/1080"
          alt="Mount Kilimanjaro View"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="text-white/80 uppercase tracking-[0.3em] text-sm font-medium mb-4 block">
            Welcome to the Peak of Serenity
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl text-white font-display mb-8 leading-[1.1] text-balance">
            A Serene Escape Beneath <span className="italic">Kilimanjaro</span>
          </h1>
          <p className="text-white/90 text-lg md:text-xl font-light mb-10 max-w-2xl mx-auto text-balance">
            Luxury, nature, and unforgettable experiences near Amboseli. Set on 50+ acres of private forest and wildlife sanctuary.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="accent" className="px-10 py-4" icon={ArrowRight} onClick={onBook}>
              Book Your Stay
            </Button>
            <Button variant="outline" className="px-10 py-4 border-white/30 text-white hover:bg-white hover:text-primary" onClick={onExplore}>
              Explore Experiences
            </Button>
          </div>
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/60 flex flex-col items-center gap-2 cursor-pointer"
        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <span className="text-xs uppercase tracking-widest">Scroll to explore</span>
        <ChevronDown size={20} />
      </motion.div>
    </section>
  );
}
