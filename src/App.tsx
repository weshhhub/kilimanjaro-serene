import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SectionHeading from './components/SectionHeading';
import RoomCard from './components/RoomCard';
import RoomDetailsModal from './components/RoomDetailsModal';
import ActivityCard from './components/ActivityCard';
import ActivityDetailsModal from './components/ActivityDetailsModal';
import DiningCard from './components/DiningCard';
import AdminDashboard from './components/AdminDashboard';
import BookingBillingForm from './components/BookingBillingForm';
import Footer from './components/Footer';
import Button from './components/ui/Button';
import FloatingCTA from './components/FloatingCTA';
import { ROOMS, ACTIVITIES, EXPERIENCES, DINING } from './constants';
import { Page, Room, AddOn, Booking, PaymentStatus, Activity, ActivityCategory } from './types';
import { Trees, Waves, Mountain, Camera, Heart, Users, ArrowRight, Phone, Utensils, Calendar, MapPin, LayoutDashboard, Clock, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [currentActivityCategory, setCurrentActivityCategory] = useState<ActivityCategory>('All');
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [bookingData, setBookingData] = useState<{ room: Room; addOns: AddOn[]; activities: Activity[] } | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [activeStay, setActiveStay] = useState<Booking | null>(null);

  const currentStayContext: any = activeStay || (bookingData ? { roomTitle: bookingData.room.title, isLive: false } : null);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage, currentActivityCategory]);

  const handleViewDetails = (room: Room) => {
    setSelectedRoom(room);
  };

  const handleViewActivityDetails = (activity: Activity) => {
    setSelectedActivity(activity);
  };

  const handleReserve = (roomId: string, selectedAddOns: AddOn[]) => {
    const room = ROOMS.find(r => r.id === roomId);
    if (room) {
      setBookingData({ room, addOns: selectedAddOns, activities: [] });
      setSelectedRoom(null);
      setCurrentPage('booking');
    }
  };

  const handleAddActivityToStay = (activity: Activity) => {
    if (bookingData) {
      // Adding to upcoming booking
      setBookingData(prev => prev ? { ...prev, activities: [...prev.activities, activity] } : null);
      alert(`${activity.title} added to your upcoming ${bookingData.room.title} stay!`);
    } else if (activeStay) {
      // Adding to active stay
      setBookings(prev => prev.map(b => b.id === activeStay.id ? { 
        ...b, 
        selectedActivities: [...b.selectedActivities, activity],
        totalAmount: b.totalAmount + activity.price
      } : b));
      alert(`${activity.title} charged to your live ${activeStay.roomTitle} bill.`);
    } else {
      // Standalone
      alert(`Booking ${activity.title} as a standalone experience.`);
      // In a real app, this would go to a separate checkout
    }
    setSelectedActivity(null);
  };

  const handleCompleteBooking = (booking: Booking) => {
    setBookings(prev => [booking, ...prev]);
    setBookingData(null);
    // For demo purposes, we'll set this as the active stay if it starts today
    const today = new Date().toISOString().split('T')[0];
    if (booking.arrivalDate === today) {
      setActiveStay({ ...booking, isLive: true });
    }
    alert(`Booking Confirmed! Your ID is ${booking.id}. You can view it in the Admin Dashboard.`);
    setCurrentPage('home');
  };

  const handleUpdateBookingStatus = (bookingId: string, status: PaymentStatus) => {
    setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status } : b));
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'accommodation':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-20">
            {/* Accommodation Hero */}
            <div className="relative h-[60vh] flex items-center justify-center overflow-hidden">
              <img 
                src="https://picsum.photos/seed/stays/1920/1080" 
                className="absolute inset-0 w-full h-full object-cover" 
                referrerPolicy="no-referrer" 
              />
              <div className="absolute inset-0 bg-primary/40 backdrop-blur-[2px]" />
              <div className="relative z-10 text-center px-6">
                <span className="text-accent uppercase tracking-[0.3em] text-xs font-bold mb-4 block">Our Sanctuaries</span>
                <h2 className="text-4xl md:text-6xl font-display text-background mb-6">Architectural Harmony <br/> <span className="italic">With Nature</span></h2>
                <p className="text-background/80 max-w-xl mx-auto mb-8">Choose from our curated selection of luxury stays, each designed to offer a unique perspective of the Amboseli wilderness.</p>
                <Button variant="accent" icon={ArrowRight} onClick={() => document.getElementById('room-grid')?.scrollIntoView({ behavior: 'smooth' })}>
                  Explore Stays
                </Button>
              </div>
            </div>

            <div id="room-grid" className="py-24 px-6 max-w-7xl mx-auto">
              <SectionHeading subtitle="Where You Stay" title="Curated Luxury Stays" />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {ROOMS.map((room) => (
                  <RoomCard 
                    key={room.id} 
                    room={room} 
                    onViewDetails={handleViewDetails}
                    onReserve={(id) => handleReserve(id, [])}
                  />
                ))}
              </div>
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
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-20">
            {/* Activities Hero */}
            <div className="relative h-[50vh] flex items-center justify-center overflow-hidden">
              <img 
                src="https://picsum.photos/seed/activities/1920/1080" 
                className="absolute inset-0 w-full h-full object-cover" 
                referrerPolicy="no-referrer" 
              />
              <div className="absolute inset-0 bg-primary/40 backdrop-blur-[2px]" />
              <div className="relative z-10 text-center px-6">
                <span className="text-accent uppercase tracking-[0.3em] text-xs font-bold mb-4 block">Our Experiences</span>
                <h2 className="text-4xl md:text-6xl font-display text-background mb-6">Curated For <br/> <span className="italic">Every Explorer</span></h2>
                
                {/* Category Hub */}
                <div className="flex flex-wrap justify-center gap-4 mt-8">
                  {['All', 'Family', 'Corporate', 'Tourist'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setCurrentActivityCategory(cat as ActivityCategory)}
                      className={`px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all border ${
                        currentActivityCategory === cat 
                          ? 'bg-accent border-accent text-primary' 
                          : 'bg-background/20 border-white/30 text-white hover:bg-background/40'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="py-24 px-6 max-w-7xl mx-auto">
              <SectionHeading 
                subtitle={currentActivityCategory === 'All' ? "What You Do" : `${currentActivityCategory} Experiences`} 
                title={currentActivityCategory === 'All' ? "Curated Adventures" : `Discover ${currentActivityCategory} Life`} 
              />
              
              {/* Recommendations based on stay */}
              {bookingData && currentActivityCategory === 'All' && (
                <div className="mb-16 p-8 bg-accent/5 rounded-[2.5rem] border border-accent/20">
                  <div className="flex items-center gap-3 mb-6">
                    <Heart className="text-accent" />
                    <h3 className="text-xl font-display">Recommended for your {bookingData.room.title} Stay</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {ACTIVITIES.filter(a => a.recommendedFor?.includes(bookingData.room.id)).map((activity) => (
                      <ActivityCard 
                        key={activity.id} 
                        activity={activity} 
                        activeStay={currentStayContext}
                        onViewDetails={handleViewDetails as any}
                        onAddToStay={handleAddActivityToStay}
                        onBookStandalone={() => alert('Booking standalone')}
                      />
                    ))}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {ACTIVITIES
                  .filter(a => currentActivityCategory === 'All' || a.category === currentActivityCategory)
                  .map((activity) => (
                    <ActivityCard 
                      key={activity.id} 
                      activity={activity} 
                      activeStay={currentStayContext}
                      onViewDetails={handleViewActivityDetails}
                      onAddToStay={handleAddActivityToStay}
                      onBookStandalone={() => alert('Booking standalone')}
                    />
                  ))}
              </div>
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
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
            <SectionHeading subtitle="Secure Your Stay" title="Begin Your Journey" />
            {bookingData ? (
              <BookingBillingForm 
                room={bookingData.room} 
                selectedAddOns={bookingData.addOns} 
                selectedActivities={bookingData.activities}
                onComplete={handleCompleteBooking}
              />
            ) : (
              <div className="bg-surface p-12 rounded-[3rem] shadow-xl text-center max-w-2xl mx-auto border border-primary/5">
                <Calendar className="mx-auto mb-6 text-accent" size={48} />
                <h3 className="text-2xl font-display mb-4">No Room Selected</h3>
                <p className="text-secondary mb-8">Please select a room from our accommodation page to begin your booking process.</p>
                <Button variant="primary" onClick={() => setCurrentPage('accommodation')}>Browse Stays</Button>
              </div>
            )}
          </motion.div>
        );
      case 'admin':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <AdminDashboard 
              bookings={bookings} 
              onUpdateStatus={handleUpdateBookingStatus} 
            />
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

      <RoomDetailsModal 
        room={selectedRoom} 
        onClose={() => setSelectedRoom(null)} 
        onBook={handleReserve} 
      />

      <ActivityDetailsModal
        activity={selectedActivity}
        activeStay={currentStayContext}
        onClose={() => setSelectedActivity(null)}
        onBook={handleAddActivityToStay}
      />
    </div>
  );
}
