import { useState, FormEvent } from 'react';
import { motion } from 'motion/react';
import { ExperienceBooking, Activity, DiningExperience } from '../types';
import { ArrowRight, CreditCard, User, Mail, Calendar, Users, ShieldCheck, Phone, MessageSquare, Clock } from 'lucide-react';
import Button from './ui/Button';

interface ExperienceReservationFormProps {
  item: Activity | DiningExperience;
  type: 'Activity' | 'Dining';
  onComplete: (booking: ExperienceBooking) => void;
}

export default function ExperienceReservationForm({ item, type, onComplete }: ExperienceReservationFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: 1,
    specialRequests: ''
  });

  const price = 'price' in item ? item.price : (item.type === 'Special' ? 75 : 50);
  const totalAmount = price * formData.guests;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const newBooking: ExperienceBooking = {
      id: `EXP-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      experienceId: item.id,
      experienceTitle: item.title,
      experienceType: type,
      customerName: formData.name,
      customerEmail: formData.email,
      customerPhone: formData.phone,
      date: formData.date,
      time: formData.time,
      guests: formData.guests,
      totalAmount: totalAmount,
      status: 'Pending',
      specialRequests: formData.specialRequests,
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-secondary">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/30" size={18} />
                  <input 
                    required
                    type="tel" 
                    placeholder="+254 700 000 000"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full bg-background border border-primary/10 rounded-xl p-4 pl-12 focus:outline-none focus:border-accent" 
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-secondary">Preferred Date</label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/30" size={18} />
                  <input 
                    required
                    type="date" 
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    className="w-full bg-background border border-primary/10 rounded-xl p-4 pl-12 focus:outline-none focus:border-accent" 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-secondary">Preferred Time</label>
                <div className="relative">
                  <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/30" size={18} />
                  <input 
                    type="time" 
                    value={formData.time}
                    onChange={(e) => setFormData({...formData, time: e.target.value})}
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
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
                    <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-secondary">Special Requests</label>
              <div className="relative">
                <MessageSquare className="absolute left-4 top-4 text-primary/30" size={18} />
                <textarea 
                  placeholder="Dietary requirements, accessibility needs, etc."
                  value={formData.specialRequests}
                  onChange={(e) => setFormData({...formData, specialRequests: e.target.value})}
                  rows={4}
                  className="w-full bg-background border border-primary/10 rounded-xl p-4 pl-12 focus:outline-none focus:border-accent" 
                />
              </div>
            </div>

            <div className="pt-6">
              <Button variant="primary" fullWidth className="py-6 text-lg" icon={ArrowRight} type="submit">
                Reserve Experience
              </Button>
              <p className="text-center text-xs text-secondary mt-4 flex items-center justify-center gap-2">
                <ShieldCheck size={14} className="text-green-500" />
                Your reservation is secure and protected.
              </p>
            </div>
          </form>
        </div>
      </div>

      {/* Summary Side */}
      <div className="lg:col-span-5">
        <div className="bg-primary text-background p-8 md:p-12 rounded-[3rem] sticky top-32">
          <h3 className="text-2xl font-display mb-8">Experience Reservation</h3>
          
          <div className="space-y-6 mb-8">
            <div className="flex gap-6 items-start">
              <img src={item.image} className="w-24 h-24 rounded-2xl object-cover" referrerPolicy="no-referrer" />
              <div>
                <h4 className="font-display text-lg">{item.title}</h4>
                <p className="text-background/60 text-sm capitalize">{type} Experience</p>
                <p className="text-background/60 text-sm mt-1">
                  {formData.date ? new Date(formData.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }) : 'Date not selected'}
                  {formData.time && ` at ${formData.time}`}
                </p>
              </div>
            </div>

            <div className="pt-6 border-t border-background/10 space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-background/80">Price per Guest</span>
                <span className="font-medium">${price}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-background/80">Number of Guests</span>
                <span className="font-medium">{formData.guests}</span>
              </div>
            </div>
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
