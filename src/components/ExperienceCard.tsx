import { motion } from 'motion/react';
import { Experience, Booking } from '../types';
import { Clock, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';
import Button from './ui/Button';

interface ExperienceCardProps {
  experience: Experience;
  activeStay: Booking | null;
  bookingData: any | null;
  onViewDetails: (experience: Experience) => void;
  onBook: (experience: Experience) => void;
  key?: string | number;
}

export default function ExperienceCard({ 
  experience, 
  activeStay, 
  bookingData,
  onViewDetails, 
  onBook
}: ExperienceCardProps) {
  
  const getButtonText = () => {
    if (activeStay) {
      const isCompleted = !activeStay.isLive && new Date(activeStay.departureDate) < new Date();
      if (isCompleted) return 'Book Again';
      if (activeStay.isLive) return 'Charge to My Stay';
    }
    if (bookingData) return 'Add to My Stay';
    return 'Book Experience';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group bg-surface rounded-3xl overflow-hidden border border-primary/5 hover:shadow-2xl transition-all duration-500 flex flex-col h-full"
    >
      <div className="relative h-64 overflow-hidden">
        <img
          src={experience.image}
          alt={experience.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm px-4 py-2 rounded-full text-[10px] font-bold text-accent uppercase tracking-widest flex items-center gap-2">
          <Sparkles size={12} />
          {experience.category}
        </div>
        <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-bold text-primary">
          From ${experience.price}
        </div>
      </div>
      
      <div className="p-8 flex flex-col flex-grow">
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-1">
            <Clock size={14} className="text-accent" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-secondary">
              {experience.duration}
            </span>
          </div>
        </div>
        
        <h3 className="text-2xl font-display mb-3 group-hover:text-accent transition-colors">
          {experience.title}
        </h3>
        
        <p className="text-secondary text-sm mb-6 line-clamp-2 flex-grow">
          {experience.description}
        </p>
        
        {experience.includes && (
          <div className="space-y-2 mb-8">
            {experience.includes.slice(0, 2).map((item) => (
              <div key={item} className="flex items-center gap-2 text-xs text-primary/70">
                <CheckCircle2 size={12} className="text-accent" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        )}
        
        <div className="flex flex-col sm:flex-row gap-4 mt-auto">
          <Button 
            variant="outline" 
            fullWidth 
            className="text-[10px] px-4"
            onClick={() => onViewDetails(experience)}
          >
            View Details
          </Button>
          <Button 
            variant="primary" 
            fullWidth 
            className="text-[10px] px-4"
            onClick={() => onBook(experience)}
          >
            {getButtonText()}
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
