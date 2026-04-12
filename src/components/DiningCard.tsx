import { motion } from 'motion/react';
import { DiningExperience } from '../types';
import Button from './ui/Button';

interface DiningCardProps {
  item: DiningExperience;
  onReserve?: (item: DiningExperience) => void;
  key?: string | number;
}

export default function DiningCard({ item, onReserve }: DiningCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative h-[400px] rounded-3xl overflow-hidden cursor-pointer"
      onClick={() => onReserve?.(item)}
    >
      <img
        src={item.image}
        alt={item.title}
        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      
      <div className="absolute bottom-0 left-0 w-full p-8">
        <h3 className="text-2xl font-display text-white mb-2">
          {item.title}
        </h3>
        <p className="text-white/70 text-sm mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 line-clamp-2">
          {item.description}
        </p>
        <Button 
          variant="outline" 
          className="text-[10px] px-4 border-white/30 text-white hover:bg-white hover:text-primary"
          onClick={(e) => {
            e.stopPropagation();
            onReserve?.(item);
          }}
        >
          {item.type === 'Special' ? 'Reserve Experience' : 'View Details'}
        </Button>
      </div>
    </motion.div>
  );
}
