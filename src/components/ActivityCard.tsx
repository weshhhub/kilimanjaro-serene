import { motion } from 'motion/react';
import { Activity, Booking } from '../types';
import { Clock, Users, CheckCircle2, ArrowRight } from 'lucide-react';
import Button from './ui/Button';

interface ActivityCardProps {
  activity: Activity;
  activeStay: Booking | null;
  onViewDetails: (activity: Activity) => void;
  onAddToStay: (activity: Activity) => void;
  onBookStandalone: (activity: Activity) => void;
  key?: string | number;
}

export default function ActivityCard({ 
  activity, 
  activeStay, 
  onViewDetails, 
  onAddToStay, 
  onBookStandalone 
}: ActivityCardProps) {
  
  const getButtonText = () => {
    if (!activeStay) return 'Book Experience';
    if (activeStay.isLive) return 'Charge to My Stay';
    return `Add to ${activeStay.roomTitle} Stay`;
  };

  const handleAction = () => {
    if (activeStay) {
      onAddToStay(activity);
    } else {
      onBookStandalone(activity);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group bg-surface rounded-3xl overflow-hidden border border-primary/5 hover:shadow-2xl transition-all duration-500"
    >
      <div className="relative h-64 overflow-hidden">
        <img
          src={activity.image}
          alt={activity.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-bold text-primary">
          ${activity.price}
        </div>
      </div>
      
      <div className="p-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-1">
            <Clock size={14} className="text-accent" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-secondary">
              {activity.duration}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Users size={14} className="text-accent" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-secondary">
              {activity.group}
            </span>
          </div>
        </div>
        
        <h3 className="text-2xl font-display mb-3 group-hover:text-accent transition-colors">
          {activity.title}
        </h3>
        
        <p className="text-secondary text-sm mb-6 line-clamp-2">
          {activity.description}
        </p>
        
        <div className="space-y-2 mb-8">
          {activity.includes.slice(0, 2).map((item) => (
            <div key={item} className="flex items-center gap-2 text-xs text-primary/70">
              <CheckCircle2 size={12} className="text-accent" />
              <span>{item}</span>
            </div>
          ))}
        </div>
        
        <div className="flex gap-4">
          <Button 
            variant="outline" 
            fullWidth 
            className="text-[10px] px-4"
            onClick={() => onViewDetails(activity)}
          >
            View Details
          </Button>
          <Button 
            variant="primary" 
            fullWidth 
            className="text-[10px] px-4"
            onClick={handleAction}
          >
            {getButtonText()}
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
