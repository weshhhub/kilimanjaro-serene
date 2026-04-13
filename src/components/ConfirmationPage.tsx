import { motion } from 'motion/react';
import { CheckCircle2, Calendar, MapPin, ArrowRight, Download, Mail } from 'lucide-react';
import Button from './ui/Button';
import { Booking, ExperienceBooking } from '../types';

interface ConfirmationPageProps {
  booking: Booking | ExperienceBooking;
  type: 'Stay' | 'Experience';
  onBackHome: () => void;
  onDownloadInvoice: () => void;
}

export default function ConfirmationPage({ booking, type, onBackHome, onDownloadInvoice }: ConfirmationPageProps) {
  const isStay = type === 'Stay';
  const stayBooking = booking as Booking;
  const expBooking = booking as ExperienceBooking;

  return (
    <div className="pt-32 pb-24 px-6 max-w-4xl mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-surface p-12 md:p-20 rounded-[3rem] shadow-2xl border border-primary/5 relative overflow-hidden"
      >
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
        
        <div className="relative z-10">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 className="text-green-600" size={40} />
          </div>

          <span className="text-accent uppercase tracking-[0.3em] text-xs font-bold mb-4 block">Reservation Confirmed</span>
          <h2 className="text-4xl md:text-5xl font-display text-primary mb-6">
            {isStay ? "Your Sanctuary Awaits" : "Your Experience is Set"}
          </h2>
          <p className="text-secondary text-lg mb-12 max-w-xl mx-auto">
            Thank you for choosing Kilimanjaro Serene Retreat. A confirmation email has been sent to <span className="text-primary font-medium">{booking.customerEmail}</span>.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 text-left">
            <div className="bg-background/50 p-8 rounded-3xl border border-primary/5">
              <h3 className="text-sm font-bold uppercase tracking-widest text-primary/40 mb-6">Reservation Details</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Calendar className="text-accent" size={18} />
                  <span className="text-primary font-medium">
                    {isStay 
                      ? `${new Date(stayBooking.arrivalDate).toLocaleDateString()} - ${new Date(stayBooking.departureDate).toLocaleDateString()}`
                      : `${new Date(expBooking.date).toLocaleDateString()} ${expBooking.time ? `@ ${expBooking.time}` : ''}`
                    }
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="text-accent" size={18} />
                  <span className="text-primary font-medium">
                    {isStay ? stayBooking.roomTitle : expBooking.experienceTitle}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-[18px] flex justify-center">
                    <span className="text-accent font-bold text-xs">ID</span>
                  </div>
                  <span className="font-mono text-xs text-secondary">{booking.id}</span>
                </div>
              </div>
            </div>

            <div className="bg-background/50 p-8 rounded-3xl border border-primary/5">
              <h3 className="text-sm font-bold uppercase tracking-widest text-primary/40 mb-6">Guest Summary</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-secondary">Primary Guest</span>
                  <span className="text-primary font-medium">{booking.customerName}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-secondary">Total Guests</span>
                  <span className="text-primary font-medium">{booking.guests}</span>
                </div>
                <div className="pt-4 border-t border-primary/5 flex justify-between items-center">
                  <span className="text-primary font-bold">Total Amount</span>
                  <span className="text-accent font-bold text-xl">${booking.totalAmount}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="primary" icon={ArrowRight} onClick={onBackHome}>
              Back to Home
            </Button>
            <Button variant="outline" icon={Download} onClick={onDownloadInvoice}>
              Download Invoice
            </Button>
          </div>
          
          <div className="mt-12 flex items-center justify-center gap-2 text-secondary text-sm">
            <Mail size={16} />
            <span>Need help? Contact our concierge at +254 700 000 000</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
