import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SectionHeading from './components/SectionHeading';
import RoomCard from './components/RoomCard';
import ActivityCard from './components/ActivityCard';
import DiningCard from './components/DiningCard';
import Footer from './components/Footer';
import Button from './components/ui/Button';
import FloatingCTA from './components/FloatingCTA';
import { ROOMS, ACTIVITIES, EXPERIENCES, DINING } from './constants';
import { Page } from './types';
import { Trees, Waves, Mountain, Camera, Heart, Users, ArrowRight, Phone, Utensils, Calendar, MapPin } from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case 'accommodation':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
            <SectionHeading subtitle="Where You Stay" title="Architectural Harmony with Nature" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {ROOMS.map((room) => (
                <RoomCard key={room.id} room={room} />
              ))}
            </div>
          </motion.div>
        );
      case 'experiences':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
            <SectionHeading subtitle="What You Feel" title="Moments That Last a Lifetime" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {EXPERIENCES.map((exp) => (
                <div key={exp.id} className="relative h-[500px] rounded-3xl overflow-hidden group">
                  <img src={exp.image} alt={exp.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-black/30" />
                  <div className="absolute bottom-12 left-12 right-12">
                    <h3 className="text-4xl font-display text-white mb-4">{exp.title}</h3>
                    <p className="text-white/80 max-w-md mb-6">{exp.description}</p>
                    <Button variant="outline" className="border-white/30 text-white hover:bg-white hover:text-primary">Explore {exp.title}</Button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        );
      case 'activities':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
            <SectionHeading subtitle="What You Do" title="Curated for Every Explorer" />
            
            <div className="space-y-24">
              {['Family', 'Corporate', 'Tourist'].map((category) => (
                <div key={category}>
                  <h3 className="text-3xl font-display mb-8 border-b border-primary/10 pb-4">{category} Experiences</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {ACTIVITIES.filter(a => a.category === category).map((activity) => (
                      <ActivityCard key={activity.id} activity={activity} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        );
      case 'dining':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
            <SectionHeading subtitle="Where & What You Eat" title="A Culinary Journey in the Wild" />
            
            <div className="space-y-24">
              {/* Dining Experiences */}
              <div>
                <h3 className="text-3xl font-display mb-8 border-b border-primary/10 pb-4">Dining Experiences</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {DINING.filter(d => d.type === 'Location').map((item) => (
                    <DiningCard key={item.id} item={item} />
                  ))}
                </div>
              </div>

              {/* Meals Offered */}
              <div>
                <h3 className="text-3xl font-display mb-8 border-b border-primary/10 pb-4">Meals Offered</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {DINING.filter(d => d.type === 'Meal').map((item) => (
                    <div key={item.id} className="flex gap-6 items-center bg-surface p-6 rounded-3xl">
                      <img src={item.image} className="w-32 h-32 rounded-2xl object-cover" referrerPolicy="no-referrer" />
                      <div>
                        <h4 className="text-xl font-display mb-2">{item.title}</h4>
                        <p className="text-sm text-secondary mb-4">{item.description}</p>
                        <button className="text-xs font-bold uppercase tracking-widest text-accent hover:underline">View Menu</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Special Dining */}
              <div>
                <h3 className="text-3xl font-display mb-8 border-b border-primary/10 pb-4">Special Dining Experiences</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {DINING.filter(d => d.type === 'Special').map((item) => (
                    <DiningCard key={item.id} item={item} />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        );
      case 'booking':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-32 pb-24 px-6 max-w-3xl mx-auto">
            <SectionHeading subtitle="Secure Your Stay" title="Begin Your Journey" />
            <div className="bg-surface p-12 rounded-[3rem] shadow-xl">
              <form className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-secondary">Arrival</label>
                    <input type="date" className="w-full bg-background border border-primary/10 rounded-xl p-4 focus:outline-none focus:border-accent" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-secondary">Departure</label>
                    <input type="date" className="w-full bg-background border border-primary/10 rounded-xl p-4 focus:outline-none focus:border-accent" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-secondary">Guests</label>
                    <select className="w-full bg-background border border-primary/10 rounded-xl p-4 focus:outline-none focus:border-accent">
                      <option>1 Guest</option>
                      <option>2 Guests</option>
                      <option>3 Guests</option>
                      <option>4+ Guests</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-secondary">Accommodation</label>
                    <select className="w-full bg-background border border-primary/10 rounded-xl p-4 focus:outline-none focus:border-accent">
                      {ROOMS.map(r => <option key={r.id}>{r.title}</option>)}
                    </select>
                  </div>
                </div>
                <Button variant="primary" fullWidth className="py-6 text-lg" icon={ArrowRight}>Confirm Booking</Button>
              </form>
            </div>
          </motion.div>
        );
      case 'contact':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
             <SectionHeading subtitle="Get In Touch" title="We Are Here For You" />
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="bg-surface p-12 rounded-[3rem]">
                  <h3 className="text-2xl font-display mb-8">Send Us a Message</h3>
                  <form className="space-y-6">
                    <input placeholder="Your Name" className="w-full bg-background border border-primary/10 rounded-xl p-4" />
                    <input placeholder="Your Email" className="w-full bg-background border border-primary/10 rounded-xl p-4" />
                    <textarea placeholder="How can we help?" rows={4} className="w-full bg-background border border-primary/10 rounded-xl p-4" />
                    <Button variant="primary" fullWidth>Send Message</Button>
                  </form>
                </div>
                <div className="space-y-8">
                  <div className="flex gap-4 items-start">
                    <MapPin className="text-accent shrink-0" />
                    <div>
                      <h4 className="font-display text-xl mb-2">Location</h4>
                      <p className="text-secondary">Amboseli Region, Kenya. 50+ Acres Forest Sanctuary.</p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start">
                    <Phone className="text-accent shrink-0" />
                    <div>
                      <h4 className="font-display text-xl mb-2">Phone</h4>
                      <p className="text-secondary">+254 700 000 000</p>
                    </div>
                  </div>
                  <Button variant="outline" icon={Phone} className="w-full" onClick={() => window.open('https://wa.me/1234567890')}>Chat With Concierge</Button>
                </div>
             </div>
          </motion.div>
        );
      default:
        return (
          <>
            <Hero onBook={() => setCurrentPage('booking')} onExplore={() => setCurrentPage('experiences')} />

            {/* About Section */}
            <section id="about" className="py-24 px-6 max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative">
                  <div className="aspect-[4/5] rounded-3xl overflow-hidden">
                    <img src="https://picsum.photos/seed/forest/800/1000" alt="Forest Sanctuary" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <div className="absolute -bottom-10 -right-10 w-64 h-64 rounded-3xl overflow-hidden border-8 border-background hidden md:block">
                    <img src="https://picsum.photos/seed/wildlife2/400/400" alt="Wildlife" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                </motion.div>

                <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                  <span className="text-accent uppercase tracking-[0.2em] text-xs font-bold mb-4 block">Our Story</span>
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-display text-primary mb-8 leading-tight">A 50-Acre Sanctuary of <span className="italic">Pure Nature</span></h2>
                  <p className="text-secondary text-lg mb-8 leading-relaxed">Nestled in the heart of the Amboseli ecosystem, Kilimanjaro Serene Retreat is more than a hotel—it's a commitment to the wild.</p>
                  
                  <div className="grid grid-cols-2 gap-8 mb-10">
                    <div className="flex flex-col gap-2">
                      <Trees className="text-accent" size={32} />
                      <h4 className="font-display text-xl">Private Forest</h4>
                      <p className="text-sm text-secondary">50+ acres of protected indigenous woodland.</p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Waves className="text-accent" size={32} />
                      <h4 className="font-display text-xl">Man-made Lake</h4>
                      <p className="text-sm text-secondary">A serene aquatic ecosystem for relaxation.</p>
                    </div>
                  </div>

                  <Button variant="ghost" className="px-0" icon={ArrowRight} onClick={() => setCurrentPage('experiences')}>Learn More About Our Mission</Button>
                </motion.div>
              </div>
            </section>

            {/* Gateway Grid */}
            <section className="py-24 px-6 bg-surface">
              <div className="max-w-7xl mx-auto">
                <SectionHeading subtitle="Explore the Retreat" title="Your Gateway to the Wild" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {[
                    { title: 'Accommodation', icon: Mountain, page: 'accommodation', desc: 'Luxury stays in harmony with nature.' },
                    { title: 'Experiences', icon: Camera, page: 'experiences', desc: 'Moments that last a lifetime.' },
                    { title: 'Activities', icon: Heart, page: 'activities', desc: 'Curated for every explorer.' },
                    { title: 'Dining', icon: Utensils, page: 'dining', desc: 'A culinary journey in the wild.' }
                  ].map((item) => (
                    <motion.div 
                      key={item.title} 
                      whileHover={{ y: -10 }}
                      onClick={() => setCurrentPage(item.page as Page)}
                      className="bg-background p-10 rounded-[2.5rem] cursor-pointer border border-primary/5 hover:border-accent/20 transition-all text-center"
                    >
                      <item.icon className="text-accent mx-auto mb-6" size={40} />
                      <h4 className="font-display text-2xl mb-4">{item.title}</h4>
                      <p className="text-sm text-secondary mb-6">{item.desc}</p>
                      <span className="text-xs font-bold uppercase tracking-widest text-primary group-hover:text-accent">Explore More</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 px-6">
              <div className="max-w-7xl mx-auto relative rounded-[3rem] overflow-hidden h-[500px] flex items-center justify-center text-center">
                <img src="https://picsum.photos/seed/cta/1920/800" alt="Call to action" className="absolute inset-0 w-full h-full object-cover" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-primary/60" />
                <div className="relative z-10 px-6">
                  <h2 className="text-4xl md:text-6xl font-display text-background mb-8 leading-tight">Ready to Start Your <span className="italic">Safari Experience?</span></h2>
                  <p className="text-background/80 text-lg mb-10 max-w-2xl mx-auto">Join us for an unforgettable journey where luxury meets the wild.</p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Button variant="accent" className="px-10 py-4" icon={ArrowRight} onClick={() => setCurrentPage('booking')}>Check Availability</Button>
                    <Button variant="outline" className="px-10 py-4 border-white/30 text-white hover:bg-white hover:text-primary" icon={Phone} onClick={() => setCurrentPage('booking')}>Confirm Booking</Button>
                  </div>
                </div>
              </div>
            </section>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar onPageChange={setCurrentPage} currentPage={currentPage} />
      
      <main>
        <AnimatePresence mode="wait">
          {renderPage()}
        </AnimatePresence>
      </main>

      <Footer onPageChange={setCurrentPage} />
      <FloatingCTA />
    </div>
  );
}
