import { motion } from 'motion/react';
import { Menu, X, Phone } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'Accommodation', href: '#accommodation' },
    { name: 'Experiences', href: '#experiences' },
    { name: 'Activities', href: '#activities' },
    { name: 'Dining', href: '#dining' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-primary/10">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
            <span className="text-background font-display font-bold text-xl">K</span>
          </div>
          <span className="font-display text-xl font-semibold tracking-tight hidden sm:block">
            Kilimanjaro Serene
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium hover:text-accent transition-colors uppercase tracking-widest"
            >
              {link.name}
            </a>
          ))}
          <button className="bg-primary text-background px-6 py-2 rounded-full text-sm font-medium hover:bg-primary/90 transition-all flex items-center gap-2">
            <Phone size={16} />
            Book Now
          </button>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-primary" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-background border-b border-primary/10 px-6 py-8 flex flex-col gap-6"
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-lg font-serif hover:text-accent transition-colors"
            >
              {link.name}
            </a>
          ))}
          <button className="bg-primary text-background px-6 py-3 rounded-full text-lg font-medium w-full">
            Book Your Stay
          </button>
        </motion.div>
      )}
    </nav>
  );
}
