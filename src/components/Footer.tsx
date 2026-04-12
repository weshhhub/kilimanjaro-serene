import { Instagram, Facebook, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import { Page } from '../types';

interface FooterProps {
  onPageChange: (page: Page) => void;
}

export default function Footer({ onPageChange }: FooterProps) {
  return (
    <footer className="bg-primary text-background pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        <div>
          <div className="flex items-center gap-2 mb-6 cursor-pointer" onClick={() => onPageChange('home')}>
            <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center">
              <span className="text-primary font-display font-bold text-xl">K</span>
            </div>
            <span className="font-display text-2xl font-semibold tracking-tight">
              Kilimanjaro Serene
            </span>
          </div>
          <p className="text-background/70 text-sm leading-relaxed mb-8">
            A luxury eco-lodge experience where nature, wildlife, and comfort converge under the shadow of Africa's highest peak.
          </p>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full border border-background/20 flex items-center justify-center hover:bg-accent hover:border-accent transition-all">
              <Instagram size={18} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full border border-background/20 flex items-center justify-center hover:bg-accent hover:border-accent transition-all">
              <Facebook size={18} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full border border-background/20 flex items-center justify-center hover:bg-accent hover:border-accent transition-all">
              <Twitter size={18} />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-display text-xl mb-6">Quick Links</h4>
          <ul className="space-y-4 text-sm text-background/70">
            <li><button onClick={() => onPageChange('home')} className="hover:text-accent transition-colors">Home</button></li>
            <li><button onClick={() => onPageChange('accommodation')} className="hover:text-accent transition-colors">Accommodation</button></li>
            <li><button onClick={() => onPageChange('experiences')} className="hover:text-accent transition-colors">Experiences</button></li>
            <li><button onClick={() => onPageChange('activities')} className="hover:text-accent transition-colors">Activities</button></li>
            <li><button onClick={() => onPageChange('dining')} className="hover:text-accent transition-colors">Dining</button></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-xl mb-6">Experiences</h4>
          <ul className="space-y-4 text-sm text-background/70">
            <li><button onClick={() => onPageChange('experiences')} className="hover:text-accent transition-colors">Wildlife Safaris</button></li>
            <li><button onClick={() => onPageChange('experiences')} className="hover:text-accent transition-colors">Nature Walks</button></li>
            <li><button onClick={() => onPageChange('dining')} className="hover:text-accent transition-colors">Lakeside Dining</button></li>
            <li><button onClick={() => onPageChange('activities')} className="hover:text-accent transition-colors">Corporate Retreats</button></li>
            <li><button onClick={() => onPageChange('activities')} className="hover:text-accent transition-colors">Family Getaways</button></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-xl mb-6">Contact Us</h4>
          <ul className="space-y-4 text-sm text-background/70">
            <li className="flex items-start gap-3">
              <MapPin size={18} className="text-accent shrink-0" />
              <span>Amboseli Region, Kenya<br />50+ Acres Forest Sanctuary</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={18} className="text-accent shrink-0" />
              <span>+254 700 000 000</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={18} className="text-accent shrink-0" />
              <span>info@kilimanjaroserene.com</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-12 border-t border-background/10 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-background/40 uppercase tracking-widest">
        <p>Crafted for Timeless Experiences — 2026</p>
        <div className="flex gap-8">
          <button onClick={() => onPageChange('contact')} className="hover:text-accent transition-colors">Privacy Policy</button>
          <button onClick={() => onPageChange('contact')} className="hover:text-accent transition-colors">Terms of Service</button>
        </div>
      </div>
    </footer>
  );
}
