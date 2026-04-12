import { motion } from 'motion/react';
import { Menu, X, Phone } from 'lucide-react';
import { useState } from 'react';
import Button from './ui/Button';
import { Page } from '../types';

interface NavbarProps {
  onPageChange: (page: Page) => void;
  currentPage: Page;
}

export default function Navbar({ onPageChange, currentPage }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks: { name: string; id: Page }[] = [
    { name: 'Home', id: 'home' },
    { name: 'Accommodation', id: 'accommodation' },
    { name: 'Experiences', id: 'experiences' },
    { name: 'Activities', id: 'activities' },
    { name: 'Dining', id: 'dining' },
    { name: 'Contact', id: 'contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-primary/10">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => onPageChange('home')}>
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
            <button
              key={link.name}
              onClick={() => onPageChange(link.id)}
              className={`text-sm font-medium transition-colors uppercase tracking-widest ${
                currentPage === link.id ? 'text-accent' : 'hover:text-accent'
              }`}
            >
              {link.name}
            </button>
          ))}
          <Button variant="primary" className="py-2 px-6" icon={Phone} onClick={() => onPageChange('booking')}>
            Book Your Stay
          </Button>
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
            <button
              key={link.name}
              onClick={() => {
                onPageChange(link.id);
                setIsOpen(false);
              }}
              className={`text-lg font-serif text-left ${
                currentPage === link.id ? 'text-accent' : 'hover:text-accent'
              }`}
            >
              {link.name}
            </button>
          ))}
          <Button variant="primary" fullWidth onClick={() => {
            onPageChange('booking');
            setIsOpen(false);
          }}>
            Book Your Stay
          </Button>
        </motion.div>
      )}
    </nav>
  );
}
