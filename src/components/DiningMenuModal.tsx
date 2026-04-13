import { motion, AnimatePresence } from 'motion/react';
import { X, Utensils, Clock } from 'lucide-react';
import { MenuItem } from '../types';

interface DiningMenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  menu: MenuItem[];
  servingTimes?: string;
}

export default function DiningMenuModal({ 
  isOpen, 
  onClose, 
  title, 
  description, 
  menu,
  servingTimes 
}: DiningMenuModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
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
            className="relative w-full max-w-2xl bg-background rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
          >
            <button
              onClick={onClose}
              className="absolute top-6 right-6 z-10 text-primary/40 hover:text-primary transition-colors bg-background/80 backdrop-blur-sm p-2 rounded-full"
            >
              <X size={20} />
            </button>

            <div className="p-8 md:p-12 overflow-y-auto">
              <div className="flex items-center gap-3 text-accent mb-4">
                <Utensils size={20} />
                <span className="text-xs font-bold uppercase tracking-[0.3em]">Menu Selection</span>
              </div>
              
              <h2 className="text-4xl font-display text-primary mb-4">{title}</h2>
              <p className="text-secondary mb-8 leading-relaxed">
                {description}
              </p>

              {servingTimes && (
                <div className="flex items-center gap-2 text-accent mb-8 bg-accent/5 p-4 rounded-2xl w-fit">
                  <Clock size={16} />
                  <span className="text-sm font-medium">{servingTimes}</span>
                </div>
              )}

              <div className="space-y-8">
                {menu.map((item, index) => (
                  <div key={index} className="group">
                    <div className="flex justify-between items-baseline mb-2">
                      <h4 className="text-xl font-display text-primary group-hover:text-accent transition-colors">
                        {item.name}
                      </h4>
                      {item.price && (
                        <span className="text-accent font-bold">${item.price}</span>
                      )}
                    </div>
                    {item.description && (
                      <p className="text-secondary text-sm leading-relaxed">
                        {item.description}
                      </p>
                    )}
                    <div className="mt-4 border-b border-primary/5" />
                  </div>
                ))}
              </div>

              <div className="mt-12 text-center">
                <p className="text-xs text-primary/40 italic">
                  * All ingredients are locally sourced and subject to seasonal availability.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
