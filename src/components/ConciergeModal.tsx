import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Home, CreditCard, ArrowRight, Sparkles } from 'lucide-react';
import { Activity, Booking, Experience } from '../types';
import Button from './ui/Button';

interface ConciergeModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: Activity | Experience | { title: string; price: number; id: string } | null;
  activeStay: Booking | null;
  bookingData: any | null;
  onAction: (action: 'add-to-stay' | 'standalone' | 'view-accommodation' | 'charge-to-stay') => void;
}

export default function ConciergeModal({ 
  isOpen, 
  onClose, 
  item, 
  activeStay, 
  bookingData, 
  onAction 
}: ConciergeModalProps) {
  if (!item) return null;

  const isUpcoming = !!bookingData;
  const isLive = activeStay?.isLive;
  const isCompleted = activeStay && !activeStay.isLive && new Date(activeStay.departureDate) < new Date();

  const getTitle = () => {
    if (isLive) return "Enhance Your Current Stay";
    if (isUpcoming) return "Personalize Your Upcoming Visit";
    return "Experience the Serene Retreat";
  };

  const getSubtitle = () => {
    if (isLive) return `Would you like to charge ${item.title} to your room folio?`;
    if (isUpcoming) return `Add ${item.title} to your ${bookingData.room.title} reservation?`;
    return `Discover ${item.title} as a standalone experience or as part of a stay.`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-primary/60 backdrop-blur-md"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-lg bg-background rounded-[2.5rem] overflow-hidden shadow-2xl p-8 md:p-12 text-center"
          >
            <button
              onClick={onClose}
              className="absolute top-6 right-6 text-primary/40 hover:text-primary transition-colors"
            >
              <X size={24} />
            </button>

            <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-8">
              <Sparkles className="text-accent" size={32} />
            </div>

            <h2 className="text-3xl font-display text-primary mb-4">{getTitle()}</h2>
            <p className="text-secondary mb-10 leading-relaxed">
              {getSubtitle()}
            </p>

            <div className="space-y-4">
              {/* Logic for different stay statuses */}
              {isLive ? (
                <>
                  <Button 
                    variant="primary" 
                    fullWidth 
                    icon={CreditCard}
                    onClick={() => onAction('charge-to-stay')}
                  >
                    Charge to My Stay
                  </Button>
                  <Button 
                    variant="outline" 
                    fullWidth 
                    onClick={() => onAction('standalone')}
                  >
                    Reserve as Separate Experience
                  </Button>
                </>
              ) : isUpcoming ? (
                <>
                  <Button 
                    variant="primary" 
                    fullWidth 
                    icon={Calendar}
                    onClick={() => onAction('add-to-stay')}
                  >
                    Add to My Stay
                  </Button>
                  <Button 
                    variant="outline" 
                    fullWidth 
                    onClick={() => onAction('standalone')}
                  >
                    Reserve as Separate Experience
                  </Button>
                </>
              ) : isCompleted ? (
                <Button 
                  variant="primary" 
                  fullWidth 
                  icon={ArrowRight}
                  onClick={() => onAction('standalone')}
                >
                  Reserve Experience
                </Button>
              ) : (
                <>
                  <Button 
                    variant="primary" 
                    fullWidth 
                    icon={ArrowRight}
                    onClick={() => onAction('standalone')}
                  >
                    Reserve Experience
                  </Button>
                  <Button 
                    variant="outline" 
                    fullWidth 
                    icon={Home}
                    onClick={() => onAction('view-accommodation')}
                  >
                    View Accommodation
                  </Button>
                </>
              )}
              
              <button 
                onClick={onClose}
                className="text-xs font-bold uppercase tracking-widest text-primary/40 hover:text-primary transition-colors pt-4"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
