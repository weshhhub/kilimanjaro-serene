import { Instagram, Facebook, Twitter, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-primary text-background pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        <div>
          <div className="flex items-center gap-2 mb-6">
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
            <li><a href="#" className="hover:text-accent transition-colors">Home</a></li>
            <li><a href="#accommodation" className="hover:text-accent transition-colors">Accommodation</a></li>
            <li><a href="#experiences" className="hover:text-accent transition-colors">Experiences</a></li>
            <li><a href="#activities" className="hover:text-accent transition-colors">Activities</a></li>
            <li><a href="#dining" className="hover:text-accent transition-colors">Dining</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-xl mb-6">Experiences</h4>
          <ul className="space-y-4 text-sm text-background/70">
            <li><a href="#" className="hover:text-accent transition-colors">Wildlife Safaris</a></li>
            <li><a href="#" className="hover:text-accent transition-colors">Nature Walks</a></li>
            <li><a href="#" className="hover:text-accent transition-colors">Lakeside Dining</a></li>
            <li><a href="#" className="hover:text-accent transition-colors">Corporate Retreats</a></li>
            <li><a href="#" className="hover:text-accent transition-colors">Family Getaways</a></li>
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
        <p>© 2024 Kilimanjaro Serene Retreat. All Rights Reserved.</p>
        <div className="flex gap-8">
          <a href="#" className="hover:text-accent transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-accent transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
