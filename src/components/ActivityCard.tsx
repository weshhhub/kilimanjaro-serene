import { motion } from 'motion/react';
import { Activity } from '../types';
import { ArrowRight } from 'lucide-react';

interface ActivityCardProps {
  activity: Activity;
  key?: string | number;
}

export default function ActivityCard({ activity }: ActivityCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="relative group h-[500px] rounded-3xl overflow-hidden cursor-pointer"
    >
      <img
        src={activity.image}
        alt={activity.title}
        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      
      <div className="absolute bottom-0 left-0 w-full p-8">
        <span className="inline-block px-3 py-1 bg-accent text-primary text-[10px] font-bold uppercase tracking-widest rounded-full mb-4">
          {activity.category}
        </span>
        <h3 className="text-3xl font-display text-white mb-3">
          {activity.title}
        </h3>
        <p className="text-white/70 text-sm mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 max-w-xs">
          {activity.description}
        </p>
        <div className="flex items-center gap-2 text-accent font-bold text-sm uppercase tracking-widest">
          Explore Activities <ArrowRight size={16} />
        </div>
      </div>
    </motion.div>
  );
}
