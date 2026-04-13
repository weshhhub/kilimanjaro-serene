import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SectionHeading from './components/SectionHeading';
import RoomCard from './components/RoomCard';
import RoomDetailsModal from './components/RoomDetailsModal';
import ActivityCard from './components/ActivityCard';
import ActivityDetailsModal from './components/ActivityDetailsModal';
import ExperienceCard from './components/ExperienceCard';
import ExperienceDetailsModal from './components/ExperienceDetailsModal';
import ConciergeModal from './components/ConciergeModal';
import DiningCard from './components/DiningCard';
import AdminDashboard from './components/AdminDashboard';
import BookingBillingForm from './components/BookingBillingForm';
import ExperienceReservationForm from './components/ExperienceReservationForm';
import ConfirmationPage from './components/ConfirmationPage';
import Footer from './components/Footer';
import Button from './components/ui/Button';
import FloatingCTA from './components/FloatingCTA';
import DiningMenuModal from './components/DiningMenuModal';
import { ROOMS, ACTIVITIES, EXPERIENCES, DINING, CUISINE_REGIONS, INTERNATIONAL_CUISINE } from './constants';
import { Page, Room, AddOn, Booking, PaymentStatus, Activity, ActivityCategory, ExperienceBooking, Experience, ExperienceCategory } from './types';
import { Trees, Waves, Mountain, Camera, Heart, Users, ArrowRight, Phone, Utensils, Calendar, MapPin, LayoutDashboard, Clock, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [currentActivityCategory, setCurrentActivityCategory] = useState<ActivityCategory>('All');
  const [currentExperienceCategory, setCurrentExperienceCategory] = useState<ExperienceCategory>('All');
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null);
  const [selectedDiningMenu, setSelectedDiningMenu] = useState<{ title: string; description: string; menu: any[]; servingTimes?: string } | null>(null);
  const [conciergeItem, setConciergeItem] = useState<any>(null);
  const [isConciergeOpen, setIsConciergeOpen] = useState(false);
  const [bookingData, setBookingData] = useState<{ room: Room; addOns: AddOn[]; activities: Activity[] } | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [experienceBookings, setExperienceBookings] = useState<ExperienceBooking[]>([]);
  const [selectedExperienceForBooking, setSelectedExperienceForBooking] = useState<{ item: any; type: 'Activity' | 'Dining' } | null>(null);
  const [lastBooking, setLastBooking] = useState<Booking | ExperienceBooking | null>(null);
  const [lastBookingType, setLastBookingType] = useState<'Stay' | 'Experience' | null>(null);
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

  const handleViewExperienceDetails = (experience: Experience) => {
    setSelectedExperience(experience);
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
    setConciergeItem(activity);
    setIsConciergeOpen(true);
    setSelectedActivity(null);
  };

  const handleAddExperienceToStay = (experience: Experience) => {
    setConciergeItem(experience);
    setIsConciergeOpen(true);
    setSelectedExperience(null);
  };

  const handleConciergeAction = (action: 'add-to-stay' | 'standalone' | 'view-accommodation' | 'charge-to-stay') => {
    if (!conciergeItem) return;

    switch (action) {
      case 'add-to-stay':
        if (bookingData) {
          setBookingData(prev => prev ? { ...prev, activities: [...prev.activities, conciergeItem] } : null);
          alert(`${conciergeItem.title} added to your upcoming ${bookingData.room.title} stay!`);
        }
        break;
      case 'charge-to-stay':
        if (activeStay) {
          const updatedActivities = [...activeStay.selectedActivities, conciergeItem];
          const updatedTotal = activeStay.totalAmount + (conciergeItem.price || 50);
          
          setBookings(prev => prev.map(b => b.id === activeStay.id ? { 
            ...b, 
            selectedActivities: updatedActivities,
            totalAmount: updatedTotal
          } : b));
          
          setActiveStay(prev => prev ? {
            ...prev,
            selectedActivities: updatedActivities,
            totalAmount: updatedTotal
          } : null);
          
          alert(`${conciergeItem.title} charged to your live ${activeStay.roomTitle} bill.`);
        }
        break;
      case 'standalone':
        let expType: 'Activity' | 'Dining' | 'Experience' = 'Experience';
        if (conciergeItem.type) expType = 'Dining';
        else if (conciergeItem.group) expType = 'Activity';

        setSelectedExperienceForBooking({ 
          item: conciergeItem, 
          type: expType 
        });
        setCurrentPage('experience-booking');
        break;
      case 'view-accommodation':
        setCurrentPage('accommodation');
        break;
    }
    setIsConciergeOpen(false);
    setConciergeItem(null);
  };

  const handleCompleteBooking = (booking: Booking) => {
    setBookings(prev => [booking, ...prev]);
    setBookingData(null);
    // For demo purposes, we'll set this as the active stay if it starts today
    const today = new Date().toISOString().split('T')[0];
    if (booking.arrivalDate === today) {
      setActiveStay({ ...booking, isLive: true });
    }
    setLastBooking(booking);
    setLastBookingType('Stay');
    setCurrentPage('confirmation');
  };

  const handleCompleteExperienceBooking = (booking: ExperienceBooking) => {
    setExperienceBookings(prev => [booking, ...prev]);
    setSelectedExperienceForBooking(null);
    setLastBooking(booking);
    setLastBookingType('Experience');
    setCurrentPage('confirmation');
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
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-20">
            {/* Experiences Hero */}
            <div className="relative h-[60vh] flex items-center justify-center overflow-hidden">
              <img 
                src="https://picsum.photos/seed/experiences-hero/1920/1080" 
                className="absolute inset-0 w-full h-full object-cover" 
                referrerPolicy="no-referrer" 
              />
              <div className="absolute inset-0 bg-primary/50 backdrop-blur-[2px]" />
              <div className="relative z-10 text-center px-6 max-w-4xl">
                <span className="text-accent uppercase tracking-[0.3em] text-xs font-bold mb-4 block">Moments That Last a Lifetime</span>
                <h2 className="text-5xl md:text-7xl font-display text-background mb-8 leading-tight">
                  {currentExperienceCategory === 'All' ? (
                    <>Curated Luxury <br/> <span className="italic">Offerings</span></>
                  ) : (
                    <>{currentExperienceCategory}</>
                  )}
                </h2>
                
                {currentExperienceCategory !== 'All' && (
                  <button 
                    onClick={() => setCurrentExperienceCategory('All')}
                    className="text-white/60 hover:text-white text-xs font-bold uppercase tracking-widest flex items-center gap-2 mx-auto transition-colors"
                  >
                    <ArrowRight size={14} className="rotate-180" />
                    Back to All Experiences
                  </button>
                )}
              </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-24">
              {currentExperienceCategory === 'All' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  {[
                    { 
                      id: 'Wildlife Safaris', 
                      title: 'Wildlife Safaris', 
                      desc: 'Witness the majestic "Big Tuskers" and diverse wildlife of the Amboseli ecosystem.', 
                      img: 'https://picsum.photos/seed/safari-hub/1200/800',
                      btn: 'View Safari Experiences'
                    },
                    { 
                      id: 'Nature Walks', 
                      title: 'Nature Walks', 
                      desc: 'Reconnect with the earth through guided walks in our 50-acre indigenous forest.', 
                      img: 'https://picsum.photos/seed/walk-hub/1200/800',
                      btn: 'View Nature Walks'
                    },
                    { 
                      id: 'Scenic Views', 
                      title: 'Scenic Views', 
                      desc: 'Experience the awe-inspiring presence of Africa\'s highest peak from exclusive vantage points.', 
                      img: 'https://picsum.photos/seed/view-hub/1200/800',
                      btn: 'Explore Viewpoints'
                    },
                    { 
                      id: 'Relaxation & Retreat', 
                      title: 'Relaxation & Retreat', 
                      desc: 'Find your inner peace with lakeside meditation, spa treatments, and quiet forest retreats.', 
                      img: 'https://picsum.photos/seed/relax-hub/1200/800',
                      btn: 'Explore Wellness Experiences'
                    }
                  ].map((cat) => (
                    <div key={cat.id} className="relative h-[500px] rounded-[3rem] overflow-hidden group cursor-pointer" onClick={() => setCurrentExperienceCategory(cat.id as ExperienceCategory)}>
                      <img src={cat.img} alt={cat.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" referrerPolicy="no-referrer" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      <div className="absolute bottom-12 left-12 right-12">
                        <h3 className="text-4xl font-display text-white mb-4">{cat.title}</h3>
                        <p className="text-white/70 max-w-md mb-8 leading-relaxed">{cat.desc}</p>
                        <Button variant="outline" className="border-white/30 text-white hover:bg-white hover:text-primary px-8">
                          {cat.btn}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                  {EXPERIENCES
                    .filter(e => e.category === currentExperienceCategory)
                    .map((experience) => (
                      <ExperienceCard 
                        key={experience.id} 
                        experience={experience} 
                        activeStay={activeStay}
                        bookingData={bookingData}
                        onViewDetails={handleViewExperienceDetails}
                        onBook={handleAddExperienceToStay}
                      />
                    ))}
                </div>
              )}
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
                        activeStay={activeStay}
                        bookingData={bookingData}
                        onViewDetails={handleViewDetails as any}
                        onBook={handleAddActivityToStay}
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
                      activeStay={activeStay}
                      bookingData={bookingData}
                      onViewDetails={handleViewActivityDetails}
                      onBook={handleAddActivityToStay}
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
            
            {/* Dining Sub-nav */}
            <div className="flex justify-center gap-8 mb-20 border-b border-primary/10 pb-6 overflow-x-auto whitespace-nowrap">
              {[
                { name: 'Culinary Journey', id: 'local-cuisine' },
                { name: 'International', id: 'international-cuisine' },
                { name: 'Daily Rituals', id: 'rituals' },
                { name: 'Special Experiences', id: 'special' },
                { name: 'Venues', id: 'venues' }
              ].map((link) => (
                <button
                  key={link.id}
                  onClick={() => document.getElementById(link.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                  className="text-xs font-bold uppercase tracking-widest text-primary/60 hover:text-accent transition-colors"
                >
                  {link.name}
                </button>
              ))}
            </div>

            <div className="space-y-32">
              {/* Culinary Journey Across Kenya */}
              <div id="local-cuisine" className="scroll-mt-32">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                  <div className="max-w-2xl">
                    <div className="flex items-center gap-3 text-accent mb-4">
                      <Utensils size={20} />
                      <span className="text-xs font-bold uppercase tracking-[0.3em]">Menus & Cuisine</span>
                    </div>
                    <h3 className="text-4xl md:text-5xl font-display text-primary mb-6">Culinary Journey Across Kenya</h3>
                    <p className="text-secondary text-lg leading-relaxed">
                      Experience the diverse flavors of Kenya through our curated regional menus. Each dish tells a story of heritage, community, and the rich bounty of our land.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {CUISINE_REGIONS.map((region) => (
                    <motion.div 
                      key={region.id}
                      whileHover={{ y: -10 }}
                      className="bg-surface rounded-[2.5rem] overflow-hidden border border-primary/5 flex flex-col h-full"
                    >
                      <div className="relative h-64 overflow-hidden">
                        <img src={region.image} alt={region.title} className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" referrerPolicy="no-referrer" />
                        <div className="absolute top-6 left-6 bg-background/90 backdrop-blur-md px-4 py-2 rounded-full">
                          <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Regional Specialty</span>
                        </div>
                      </div>
                      <div className="p-8 flex flex-col flex-grow">
                        <h4 className="text-2xl font-display text-primary mb-4">{region.title}</h4>
                        <p className="text-secondary text-sm mb-6 leading-relaxed flex-grow">{region.description}</p>
                        
                        <div className="flex flex-wrap gap-2 mb-8">
                          {region.dishes.map((dish, i) => (
                            <span key={i} className="text-[10px] font-bold uppercase tracking-widest bg-primary/5 text-primary/60 px-3 py-1 rounded-full">
                              {dish}
                            </span>
                          ))}
                        </div>

                        <div className="space-y-3">
                          <Button 
                            variant="primary" 
                            fullWidth 
                            onClick={() => {
                              setSelectedDiningMenu({
                                title: region.title,
                                description: region.description,
                                menu: region.menu
                              });
                            }}
                          >
                            View Menu
                          </Button>
                          <Button 
                            variant="outline" 
                            fullWidth 
                            onClick={() => {
                              setConciergeItem({ 
                                id: region.id, 
                                title: `${region.title} Dining`, 
                                price: 45 
                              });
                              setIsConciergeOpen(true);
                            }}
                          >
                            Reserve Dining
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* International Cuisine */}
              <div id="international-cuisine" className="scroll-mt-32">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                  <div className="max-w-2xl">
                    <div className="flex items-center gap-3 text-accent mb-4">
                      <LayoutDashboard size={20} />
                      <span className="text-xs font-bold uppercase tracking-[0.3em]">Global Flavors</span>
                    </div>
                    <h3 className="text-4xl md:text-5xl font-display text-primary mb-6">International Cuisine</h3>
                    <p className="text-secondary text-lg leading-relaxed">
                      A world-class menu featuring global favorites prepared with a luxury twist, using the freshest local and imported ingredients.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  {INTERNATIONAL_CUISINE.map((item) => (
                    <div key={item.id} className="flex flex-col md:flex-row gap-8 bg-surface p-8 rounded-[3rem] border border-primary/5">
                      <div className="w-full md:w-1/2 h-72 rounded-[2rem] overflow-hidden">
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                      <div className="w-full md:w-1/2 flex flex-col justify-center">
                        <div className="flex items-center gap-2 text-accent mb-4">
                          <Clock size={14} />
                          <span className="text-[10px] font-bold uppercase tracking-widest">{item.servingTimes}</span>
                        </div>
                        <h4 className="text-2xl font-display text-primary mb-4">{item.title}</h4>
                        <p className="text-secondary text-sm mb-8 leading-relaxed">{item.description}</p>
                        
                        <div className="flex flex-col sm:flex-row gap-3">
                          <button 
                            onClick={() => setSelectedDiningMenu({
                              title: item.title,
                              description: item.description,
                              menu: item.menu,
                              servingTimes: item.servingTimes
                            })}
                            className="text-xs font-bold uppercase tracking-widest text-accent hover:underline text-left"
                          >
                            View Menu
                          </button>
                          <button 
                            onClick={() => {
                              setConciergeItem({ 
                                id: item.id, 
                                title: item.title, 
                                price: 65 
                              });
                              setIsConciergeOpen(true);
                            }}
                            className="text-xs font-bold uppercase tracking-widest text-primary hover:underline text-left"
                          >
                            Reserve Dining
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Premium Dining Experiences */}
              <div id="special" className="scroll-mt-32">
                <div className="text-center max-w-3xl mx-auto mb-16">
                  <h3 className="text-4xl font-display text-primary mb-6">Premium Dining Experiences</h3>
                  <p className="text-secondary leading-relaxed">
                    Elevate your stay with our bespoke culinary events, designed to immerse you in the culture and beauty of our surroundings.
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {DINING.filter(d => d.type === 'Special').map((item) => (
                    <DiningCard 
                      key={item.id} 
                      item={item} 
                      onReserve={(dining) => {
                        setConciergeItem({ ...dining });
                        setIsConciergeOpen(true);
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Daily Dining Rituals */}
              <div id="rituals" className="scroll-mt-32">
                <div className="text-center max-w-3xl mx-auto mb-16">
                  <h3 className="text-4xl font-display text-primary mb-6">Daily Dining Rituals</h3>
                  <p className="text-secondary leading-relaxed">
                    From the first light of dawn to the quiet of the night, our culinary team prepares a series of rituals to nourish your body and soul.
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                    { 
                      title: 'The Sunrise Breakfast', 
                      time: '06:30 - 10:00', 
                      desc: 'A vibrant spread of fresh tropical fruits, house-made pastries, and made-to-order Kenyan specialties.',
                      image: 'https://picsum.photos/seed/breakfast/800/600'
                    },
                    { 
                      title: 'The Midday Oasis', 
                      time: '12:30 - 15:00', 
                      desc: 'Light, refreshing lunches featuring garden-fresh salads, grilled proteins, and seasonal soups.',
                      image: 'https://picsum.photos/seed/lunch/800/600'
                    },
                    { 
                      title: 'The Starlit Dinner', 
                      time: '19:00 - 22:00', 
                      desc: 'An elegant multi-course experience celebrating the finest ingredients from our farm and local partners.',
                      image: 'https://picsum.photos/seed/dinner/800/600'
                    }
                  ].map((meal, idx) => (
                    <div key={idx} className="bg-surface rounded-[2.5rem] overflow-hidden border border-primary/5 group">
                      <div className="h-48 overflow-hidden">
                        <img src={meal.image} alt={meal.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" referrerPolicy="no-referrer" />
                      </div>
                      <div className="p-8">
                        <div className="flex items-center gap-2 text-accent mb-3">
                          <Clock size={14} />
                          <span className="text-[10px] font-bold uppercase tracking-widest">{meal.time}</span>
                        </div>
                        <h4 className="text-xl font-display text-primary mb-3">{meal.title}</h4>
                        <p className="text-secondary text-sm leading-relaxed">{meal.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Special Diet Options */}
              <div className="bg-accent/5 rounded-[3rem] p-12 md:p-20 text-center">
                <div className="max-w-3xl mx-auto">
                  <Heart className="text-accent mx-auto mb-6" size={40} />
                  <h3 className="text-3xl md:text-4xl font-display text-primary mb-6">Nourishing Every Guest</h3>
                  <p className="text-secondary text-lg mb-10 leading-relaxed">
                    We believe that luxury dining should be inclusive. Our chefs are experts in preparing delicious Vegan, Gluten-Free, and Halal options that never compromise on flavor or presentation.
                  </p>
                  <div className="flex flex-wrap justify-center gap-4">
                    {['Plant-Based', 'Gluten-Free', 'Halal Certified', 'Nut-Free', 'Dairy-Free'].map((diet, i) => (
                      <span key={i} className="px-6 py-2 bg-background rounded-full text-xs font-bold uppercase tracking-widest text-primary border border-primary/5">
                        {diet}
                      </span>
                    ))}
                  </div>
                  <p className="mt-10 text-sm text-primary/60 italic">
                    Please inform our concierge of any specific allergies or dietary requirements prior to your arrival.
                  </p>
                </div>
              </div>

              {/* Dining Locations */}
              <div id="venues" className="scroll-mt-32">
                <div className="text-center max-w-3xl mx-auto mb-16">
                  <h3 className="text-4xl font-display text-primary mb-6">Our Dining Venues</h3>
                  <p className="text-secondary leading-relaxed">
                    From the elegant main restaurant to intimate forest settings, discover the perfect backdrop for your culinary journey.
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {DINING.filter(d => d.type === 'Location').map((item) => (
                    <DiningCard 
                      key={item.id} 
                      item={item} 
                      onReserve={(dining) => {
                        setConciergeItem({ ...dining });
                        setIsConciergeOpen(true);
                      }}
                    />
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
      case 'experience-booking':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
            <SectionHeading subtitle="Experience Reservation" title="Book Independently" />
            {selectedExperienceForBooking ? (
              <ExperienceReservationForm 
                item={selectedExperienceForBooking.item} 
                type={selectedExperienceForBooking.type}
                onComplete={handleCompleteExperienceBooking}
              />
            ) : (
              <div className="bg-surface p-12 rounded-[3rem] shadow-xl text-center max-w-2xl mx-auto border border-primary/5">
                <Calendar className="mx-auto mb-6 text-accent" size={48} />
                <h3 className="text-2xl font-display mb-4">No Experience Selected</h3>
                <p className="text-secondary mb-8">Please select an activity or dining experience to begin your reservation process.</p>
                <Button variant="primary" onClick={() => setCurrentPage('activities')}>Browse Activities</Button>
              </div>
            )}
          </motion.div>
        );
      case 'confirmation':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {lastBooking && lastBookingType ? (
              <ConfirmationPage 
                booking={lastBooking} 
                type={lastBookingType} 
                onBackHome={() => setCurrentPage('home')}
                onDownloadInvoice={() => {
                  // This is handled in AdminDashboard usually, but we can trigger it here too if we want
                  alert('Invoice download started...');
                }}
              />
            ) : (
              <div className="pt-32 pb-24 px-6 text-center">
                <h2 className="text-2xl font-display mb-4">No Recent Reservation</h2>
                <Button variant="primary" onClick={() => setCurrentPage('home')}>Back to Home</Button>
              </div>
            )}
          </motion.div>
        );
      case 'admin':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <AdminDashboard 
              bookings={bookings} 
              experienceBookings={experienceBookings}
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
        activeStay={activeStay}
        bookingData={bookingData}
        onClose={() => setSelectedActivity(null)}
        onBook={handleAddActivityToStay}
      />

      <ExperienceDetailsModal
        experience={selectedExperience}
        activeStay={activeStay}
        bookingData={bookingData}
        onClose={() => setSelectedExperience(null)}
        onBook={handleAddExperienceToStay}
      />

      <ConciergeModal
        isOpen={isConciergeOpen}
        onClose={() => setIsConciergeOpen(false)}
        item={conciergeItem}
        activeStay={activeStay}
        bookingData={bookingData}
        onAction={handleConciergeAction}
      />

      <DiningMenuModal
        isOpen={!!selectedDiningMenu}
        onClose={() => setSelectedDiningMenu(null)}
        title={selectedDiningMenu?.title || ''}
        description={selectedDiningMenu?.description || ''}
        menu={selectedDiningMenu?.menu || []}
        servingTimes={selectedDiningMenu?.servingTimes}
      />
    </div>
  );
}
