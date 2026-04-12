import { useState, useMemo, FormEvent } from 'react';
import { motion } from 'motion/react';
import { Room, AddOn, Booking, Activity } from '../types';
import { ArrowRight, CreditCard, User, Mail, Calendar, Users, ShieldCheck } from 'lucide-react';
import Button from './ui/Button';

interface BookingBillingFormProps {
  room: Room;
  selectedAddOns: AddOn[];
  selectedActivities: Activity[];
  onComplete: (booking: Booking) => void;
}

export default function BookingBillingForm({ room, selectedAddOns, selectedActivities, onComplete }: BookingBillingFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    arrival: '',
    departure: '',
    guests: 1
  });

  const basePrice = parseInt(room.price.replace(/[^0-9]/g, '')) || 0;
  const addOnPrice = selectedAddOns.length * 50; // Simplified fixed price for demo
  const activityPrice = selectedActivities.reduce((sum, a) => sum + a.price, 0);
  
  const nights = useMemo(() => {
    if (!formData.arrival || !formData.departure) return 1;
    const start = new Date(formData.arrival);
    const end = new Date(formData.departure);
    const diff = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 1;
  }, [formData.arrival, formData.departure]);

  const totalAmount = (basePrice * nights) + addOnPrice + activityPrice;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const newBooking: Booking = {
      id: Math.random().toString(36).substr(2, 9).toUpperCase(),
      roomId: room.id,
      roomTitle: room.title,
      customerName: formData.name,
      customerEmail: formData.email,
      arrivalDate: formData.arrival,
      departureDate: formData.departure,
      guests: formData.guests,
      selectedAddOns: selectedAddOns,
      selectedActivities: selectedActivities,
      totalAmount: totalAmount,
      status: 'Pending',
      createdAt: new Date().toISOString()
    };
    onComplete(newBooking);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
      {/* Form Side */}
      <div className="lg:col-span-7 space-y-8">
        <div className="bg-surface p-8 md:p-12 rounded-[3rem] shadow-xl border border-primary/5">
          <h3 className="text-2xl font-display mb-8 flex items-center gap-3">
            <User className="text-accent" />
            Guest Information
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-secondary">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/30" size={18} />
                <input 
                  required
                  type="text" 
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-background border border-primary/10 rounded-xl p-4 pl-12 focus:outline-none focus:border-accent" 
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-secondary">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/30" size={18} />
                <input 
                  required
                  type="email" 
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-background border border-primary/10 rounded-xl p-4 pl-12 focus:outline-none focus:border-accent" 
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-secondary">Arrival Date</label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/30" size={18} />
                  <input 
                    required
                    type="date" 
                    value={formData.arrival}
                    onChange={(e) => setFormData({...formData, arrival: e.target.value})}
                    className="w-full bg-background border border-primary/10 rounded-xl p-4 pl-12 focus:outline-none focus:border-accent" 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-secondary">Departure Date</label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/30" size={18} />
                  <input 
                    required
                    type="date" 
                    value={formData.departure}
                    onChange={(e) => setFormData({...formData, departure: e.target.value})}
                    className="w-full bg-background border border-primary/10 rounded-xl p-4 pl-12 focus:outline-none focus:border-accent" 
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-secondary">Number of Guests</label>
              <div className="relative">
                <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/30" size={18} />
                <select 
                  value={formData.guests}
                  onChange={(e) => setFormData({...formData, guests: parseInt(e.target.value)})}
                  className="w-full bg-background border border-primary/10 rounded-xl p-4 pl-12 focus:outline-none focus:border-accent appearance-none"
                >
                  <option value={1}>1 Guest</option>
                  <option value={2}>2 Guests</option>
                  <option value={3}>3 Guests</option>
                  <option value={4}>4+ Guests</option>
                </select>
              </div>
            </div>

            <div className="pt-6">
              <Button variant="primary" fullWidth className="py-6 text-lg" icon={ArrowRight} type="submit">
                Complete Reservation
              </Button>
              <p className="text-center text-xs text-secondary mt-4 flex items-center justify-center gap-2">
                <ShieldCheck size={14} className="text-green-500" />
                Your booking is secure and protected.
              </p>
            </div>
          </form>
        </div>
      </div>

      {/* Summary Side */}
      <div className="lg:col-span-5">
        <div className="bg-primary text-background p-8 md:p-12 rounded-[3rem] sticky top-32">
          <h3 className="text-2xl font-display mb-8">Booking Summary</h3>
          
          <div className="space-y-6 mb-8">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-display text-lg">{room.title}</h4>
                <p className="text-background/60 text-sm">{nights} night(s) stay</p>
              </div>
              <span className="font-bold">${basePrice * nights}</span>
            </div>

            {selectedAddOns.length > 0 && (
              <div className="pt-6 border-t border-background/10">
                <h4 className="text-xs font-bold uppercase tracking-widest text-background/40 mb-4">Selected Add-ons</h4>
                <div className="space-y-3">
                  {selectedAddOns.map(addon => (
                    <div key={addon.id} className="flex justify-between text-sm">
                      <span className="text-background/80">{addon.title}</span>
                      <span className="font-medium">$50</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedActivities.length > 0 && (
              <div className="pt-6 border-t border-background/10">
                <h4 className="text-xs font-bold uppercase tracking-widest text-background/40 mb-4">Selected Activities</h4>
                <div className="space-y-3">
                  {selectedActivities.map(activity => (
                    <div key={activity.id} className="flex justify-between text-sm">
                      <span className="text-background/80">{activity.title}</span>
                      <span className="font-medium">${activity.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="pt-8 border-t border-background/20 space-y-4">
            <div className="flex justify-between text-background/60 text-sm">
              <span>Subtotal</span>
              <span>${totalAmount}</span>
            </div>
            <div className="flex justify-between text-background/60 text-sm">
              <span>Taxes & Fees</span>
              <span>Included</span>
            </div>
            <div className="flex justify-between items-end pt-4">
              <span className="text-xl font-display">Total Amount</span>
              <span className="text-3xl font-display text-accent">${totalAmount}</span>
            </div>
          </div>

          <div className="mt-12 p-6 bg-background/5 rounded-2xl border border-background/10">
            <div className="flex gap-4 items-center">
              <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center">
                <CreditCard className="text-accent" />
              </div>
              <div>
                <h4 className="text-sm font-bold">Payment Method</h4>
                <p className="text-xs text-background/60">Pay securely at the retreat or via bank transfer.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
