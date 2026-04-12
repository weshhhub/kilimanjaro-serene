import { motion, AnimatePresence } from 'motion/react';
import { X, Clock, Users, CheckCircle2, ArrowRight } from 'lucide-react';
import { Activity, Booking } from '../types';
import Button from './ui/Button';

interface ActivityDetailsModalProps {
  activity: Activity | null;
  activeStay: Booking | null;
  onClose: () => void;
  onBook: (activity: Activity) => void;
}

export default function ActivityDetailsModal({ activity, activeStay, onClose, onBook }: ActivityDetailsModalProps) {
  if (!activity) return null;

  const getButtonText = () => {
    if (!activeStay) return 'Book Standalone Experience';
    if (activeStay.isLive) return 'Charge to My Stay';
    return `Add to ${activeStay.roomTitle} Stay`;
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-primary/60 backdrop-blur-sm"
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-4xl max-h-[90vh] bg-background rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col md:flex-row"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-20 w-10 h-10 bg-background/80 backdrop-blur-md rounded-full flex items-center justify-center text-primary hover:bg-accent hover:text-background transition-all"
          >
            <X size={20} />
          </button>

          {/* Image Section */}
          <div className="md:w-1/2 relative h-64 md:h-auto">
            <img
              src={activity.image}
              alt={activity.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent md:hidden" />
          </div>

          {/* Content Section */}
          <div className="md:w-1/2 overflow-y-auto p-8 md:p-12">
            <span className="text-accent uppercase tracking-[0.2em] text-[10px] font-bold mb-2 block">
              {activity.category} Activity
            </span>
            <h2 className="text-4xl font-display text-primary mb-6">{activity.title}</h2>
            
            <div className="flex flex-wrap gap-6 mb-8">
              <div className="flex items-center gap-2">
                <Clock size={18} className="text-accent" />
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-primary/40 block">Duration</span>
                  <span className="text-sm font-medium text-secondary">{activity.duration}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Users size={18} className="text-accent" />
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-primary/40 block">Group</span>
                  <span className="text-sm font-medium text-secondary">{activity.group}</span>
                </div>
              </div>
            </div>

            <p className="text-secondary leading-relaxed mb-8">
              {activity.description}
            </p>

            <div className="mb-10">
              <h3 className="text-xs font-bold uppercase tracking-widest text-primary/40 mb-4">What's Included</h3>
              <div className="grid grid-cols-1 gap-3">
                {activity.includes.map((item) => (
                  <div key={item} className="flex items-center gap-3 text-sm text-secondary">
                    <CheckCircle2 size={16} className="text-accent" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Pricing & CTA */}
            <div className="pt-8 border-t border-primary/10 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <span className="text-xs text-secondary block mb-1">Price per person</span>
                <span className="text-3xl font-display text-primary">${activity.price}</span>
              </div>
              <Button variant="primary" className="px-8" icon={ArrowRight} onClick={() => onBook(activity)}>
                {getButtonText()}
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
