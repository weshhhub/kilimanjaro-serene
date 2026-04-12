import { motion } from 'motion/react';
import { Room } from '../types';
import { Users, Wifi, Coffee, Maximize } from 'lucide-react';

interface RoomCardProps {
  room: Room;
  key?: string | number;
}

export default function RoomCard({ room }: RoomCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group bg-surface rounded-3xl overflow-hidden border border-primary/5 hover:shadow-2xl transition-all duration-500"
    >
      <div className="relative h-80 overflow-hidden">
        <img
          src={room.image}
          alt={room.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-bold text-primary">
          {room.price}
        </div>
      </div>
      
      <div className="p-8">
        <div className="flex items-center gap-2 mb-4">
          <Users size={16} className="text-accent" />
          <span className="text-xs font-medium uppercase tracking-wider text-secondary">
            {room.capacity}
          </span>
        </div>
        
        <h3 className="text-2xl font-display mb-3 group-hover:text-accent transition-colors">
          {room.title}
        </h3>
        
        <p className="text-secondary text-sm mb-6 line-clamp-2">
          {room.description}
        </p>
        
        <div className="flex flex-wrap gap-4 mb-8">
          {room.amenities.slice(0, 3).map((amenity) => (
            <div key={amenity} className="flex items-center gap-1 text-xs text-primary/70">
              {amenity.includes('WiFi') && <Wifi size={12} />}
              {amenity.includes('Coffee') && <Coffee size={12} />}
              {amenity.includes('Deck') && <Maximize size={12} />}
              <span>{amenity}</span>
            </div>
          ))}
        </div>
        
        <button className="w-full py-4 border border-primary/20 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-primary hover:text-background transition-all">
          View Details
        </button>
      </div>
    </motion.div>
  );
}
