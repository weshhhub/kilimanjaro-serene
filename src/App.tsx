import { motion } from 'motion/react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SectionHeading from './components/SectionHeading';
import RoomCard from './components/RoomCard';
import ActivityCard from './components/ActivityCard';
import Footer from './components/Footer';
import { ROOMS, ACTIVITIES, EXPERIENCES } from './constants';
import { Trees, Waves, Mountain, Camera, Heart, Users } from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main>
        <Hero />

        {/* About Section */}
        <section id="about" className="py-24 px-6 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-[4/5] rounded-3xl overflow-hidden">
                <img
                  src="https://picsum.photos/seed/forest/800/1000"
                  alt="Forest Sanctuary"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-10 -right-10 w-64 h-64 rounded-3xl overflow-hidden border-8 border-background hidden md:block">
                <img
                  src="https://picsum.photos/seed/wildlife2/400/400"
                  alt="Wildlife"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-accent uppercase tracking-[0.2em] text-xs font-bold mb-4 block">
                Our Story
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display text-primary mb-8 leading-tight">
                A 50-Acre Sanctuary of <span className="italic">Pure Nature</span>
              </h2>
              <p className="text-secondary text-lg mb-8 leading-relaxed">
                Nestled in the heart of the Amboseli ecosystem, Kilimanjaro Serene Retreat is more than a hotel—it's a commitment to the wild. Our property spans over 50 acres of indigenous forest, providing a safe haven for local wildlife and a peaceful escape for our guests.
              </p>
              
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

              <button className="text-primary font-bold uppercase tracking-widest text-sm flex items-center gap-2 group">
                Learn More About Our Mission
                <span className="w-10 h-[1px] bg-primary group-hover:w-16 transition-all" />
              </button>
            </motion.div>
          </div>
        </section>

        {/* Accommodation Section */}
        <section id="accommodation" className="py-24 px-6 bg-surface">
          <div className="max-w-7xl mx-auto">
            <SectionHeading
              subtitle="Luxury Stays"
              title="Architectural Harmony with Nature"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {ROOMS.map((room) => (
                <RoomCard key={room.id} room={room} />
              ))}
            </div>
          </div>
        </section>

        {/* Experiences Section */}
        <section id="experiences" className="py-24 px-6 max-w-7xl mx-auto">
          <SectionHeading
            subtitle="The Experience"
            title="Moments That Last a Lifetime"
          />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7">
              <div className="relative h-[600px] rounded-3xl overflow-hidden group">
                <img
                  src={EXPERIENCES[0].image}
                  alt={EXPERIENCES[0].title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute bottom-12 left-12 right-12">
                  <h3 className="text-4xl font-display text-white mb-4">{EXPERIENCES[0].title}</h3>
                  <p className="text-white/80 max-w-md">{EXPERIENCES[0].description}</p>
                </div>
              </div>
            </div>
            <div className="lg:col-span-5 flex flex-col gap-8">
              {EXPERIENCES.slice(1).map((exp) => (
                <div key={exp.id} className="relative h-[284px] rounded-3xl overflow-hidden group">
                  <img
                    src={exp.image}
                    alt={exp.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="absolute bottom-8 left-8 right-8">
                    <h3 className="text-2xl font-display text-white mb-2">{exp.title}</h3>
                    <p className="text-white/80 text-sm max-w-xs">{exp.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Activities Section */}
        <section id="activities" className="py-24 px-6 bg-primary text-background">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
              <div className="max-w-2xl">
                <span className="text-accent uppercase tracking-[0.2em] text-xs font-bold mb-4 block">
                  Endless Discovery
                </span>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-display leading-tight">
                  Curated Activities for <span className="italic text-accent">Every Explorer</span>
                </h2>
              </div>
              <div className="flex gap-4">
                <button className="px-6 py-2 border border-background/20 rounded-full text-xs uppercase tracking-widest hover:bg-background hover:text-primary transition-all">
                  Family
                </button>
                <button className="px-6 py-2 border border-background/20 rounded-full text-xs uppercase tracking-widest hover:bg-background hover:text-primary transition-all">
                  Corporate
                </button>
                <button className="px-6 py-2 border border-background/20 rounded-full text-xs uppercase tracking-widest hover:bg-background hover:text-primary transition-all">
                  Adventure
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {ACTIVITIES.map((activity) => (
                <ActivityCard key={activity.id} activity={activity} />
              ))}
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-24 px-6 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-surface rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Mountain className="text-accent" />
              </div>
              <h4 className="font-display text-xl mb-3">Kilimanjaro Views</h4>
              <p className="text-sm text-secondary">Unobstructed views of the world's highest free-standing mountain.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-surface rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Camera className="text-accent" />
              </div>
              <h4 className="font-display text-xl mb-3">Wildlife Sanctuary</h4>
              <p className="text-sm text-secondary">A private ecosystem teeming with local flora and fauna.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-surface rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Heart className="text-accent" />
              </div>
              <h4 className="font-display text-xl mb-3">Eco-Conscious</h4>
              <p className="text-sm text-secondary">Sustainable practices integrated into every aspect of your stay.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-surface rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Users className="text-accent" />
              </div>
              <h4 className="font-display text-xl mb-3">Bespoke Service</h4>
              <p className="text-sm text-secondary">Personalized experiences tailored to your unique preferences.</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-6">
          <div className="max-w-7xl mx-auto relative rounded-[3rem] overflow-hidden h-[500px] flex items-center justify-center text-center">
            <img
              src="https://picsum.photos/seed/cta/1920/800"
              alt="Call to action"
              className="absolute inset-0 w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-primary/60" />
            <div className="relative z-10 px-6">
              <h2 className="text-4xl md:text-6xl font-display text-background mb-8 leading-tight">
                Ready to Start Your <span className="italic">Safari Experience?</span>
              </h2>
              <p className="text-background/80 text-lg mb-10 max-w-2xl mx-auto">
                Join us for an unforgettable journey where luxury meets the wild. Book your stay today and wake up to the magic of Kilimanjaro.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button className="bg-accent text-primary px-10 py-4 rounded-full font-semibold text-lg hover:bg-accent/90 transition-all w-full sm:w-auto">
                  Check Availability
                </button>
                <button className="bg-white/10 backdrop-blur-md border border-white/30 text-white px-10 py-4 rounded-full font-semibold text-lg hover:bg-white/20 transition-all w-full sm:w-auto">
                  Contact Reservations
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
