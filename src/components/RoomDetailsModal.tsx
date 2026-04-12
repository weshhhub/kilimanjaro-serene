import { motion, AnimatePresence } from 'motion/react';
import { X, Check, ArrowRight, Plus, Minus } from 'lucide-react';
import { Room, AddOn } from '../types';
import Button from './ui/Button';
import { useState } from 'react';

interface RoomDetailsModalProps {
  room: Room | null;
  onClose: () => void;
  onBook: (roomId: string, selectedAddOns: AddOn[]) => void;
}

export default function RoomDetailsModal({ room, onClose, onBook }: RoomDetailsModalProps) {
  const [selectedAddOns, setSelectedAddOns] = useState<AddOn[]>([]);

  if (!room) return null;

  const toggleAddOn = (addon: AddOn) => {
    setSelectedAddOns(prev => 
      prev.find(a => a.id === addon.id) 
        ? prev.filter(a => a.id !== addon.id)
        : [...prev, addon]
    );
  };

  const handleBooking = () => {
    onBook(room.id, selectedAddOns);
    setSelectedAddOns([]);
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
          className="relative w-full max-w-5xl max-h-[90vh] bg-background rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col lg:flex-row"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-20 w-10 h-10 bg-background/80 backdrop-blur-md rounded-full flex items-center justify-center text-primary hover:bg-accent hover:text-background transition-all"
          >
            <X size={20} />
          </button>

          {/* Left Side: Image & Basic Info */}
          <div className="lg:w-2/5 relative h-64 lg:h-auto">
            <img
              src={room.image}
              alt={room.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent lg:hidden" />
            <div className="absolute bottom-6 left-6 right-6 lg:hidden">
              <h2 className="text-3xl font-display text-white">{room.title}</h2>
            </div>
          </div>

          {/* Right Side: Details, Packages, Upsells */}
          <div className="lg:w-3/5 overflow-y-auto p-8 md:p-12">
            <div className="hidden lg:block mb-8">
              <span className="text-accent uppercase tracking-[0.2em] text-xs font-bold mb-2 block">
                {room.position}
              </span>
              <h2 className="text-4xl font-display text-primary mb-4">{room.title}</h2>
              <p className="text-secondary leading-relaxed">{room.description}</p>
            </div>

            {/* Amenities */}
            <div className="mb-10">
              <h3 className="text-xs font-bold uppercase tracking-widest text-primary/40 mb-4">Room Amenities</h3>
              <div className="grid grid-cols-2 gap-3">
                {room.amenities.map((amenity) => (
                  <div key={amenity} className="flex items-center gap-2 text-sm text-secondary">
                    <Check size={14} className="text-accent" />
                    {amenity}
                  </div>
                ))}
              </div>
            </div>

            {/* Packages */}
            <div className="mb-10">
              <h3 className="text-xs font-bold uppercase tracking-widest text-primary/40 mb-6">Exclusive Packages</h3>
              <div className="space-y-6">
                {room.packages.map((pkg) => (
                  <div key={pkg.id} className="bg-surface p-6 rounded-3xl border border-primary/5 hover:border-accent/20 transition-all">
                    <h4 className="text-xl font-display mb-3">{pkg.title}</h4>
                    <ul className="space-y-2 mb-6">
                      {pkg.description.map((item, idx) => (
                        <li key={idx} className="text-sm text-secondary flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <Button
                      variant="outline"
                      fullWidth
                      className="text-xs py-3"
                      onClick={handleBooking}
                    >
                      {pkg.buttonText}
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Upsells */}
            <div className="mb-10">
              <h3 className="text-xs font-bold uppercase tracking-widest text-primary/40 mb-6">Enhance Your Stay</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {room.addOns.map((addon) => {
                  const isSelected = selectedAddOns.find(a => a.id === addon.id);
                  return (
                    <button
                      key={addon.id}
                      onClick={() => toggleAddOn(addon)}
                      className={`flex items-center justify-between p-4 border rounded-2xl text-sm font-medium transition-all group ${
                        isSelected 
                          ? 'bg-accent/10 border-accent text-accent' 
                          : 'bg-background border-primary/10 hover:border-accent hover:bg-accent/5'
                      }`}
                    >
                      <span>{addon.title}</span>
                      {isSelected ? <Minus size={16} /> : <Plus size={16} className="text-accent group-hover:scale-110 transition-transform" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Final CTA */}
            <div className="pt-8 border-t border-primary/10 flex items-center justify-between gap-6">
              <div>
                <span className="text-xs text-secondary block mb-1">Starting from</span>
                <span className="text-2xl font-display text-primary">{room.price}</span>
                <span className="text-xs text-secondary ml-1">/ night</span>
              </div>
              <Button variant="primary" className="px-8" icon={ArrowRight} onClick={handleBooking}>
                Reserve Now
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
