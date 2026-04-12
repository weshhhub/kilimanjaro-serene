import { motion } from 'motion/react';
import { MessageCircle } from 'lucide-react';

export default function FloatingCTA() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, x: 100 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      transition={{ delay: 2, duration: 0.5 }}
      className="fixed bottom-8 right-8 z-[100]"
    >
      <motion.a
        href="https://wa.me/1234567890"
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="flex items-center gap-3 bg-[#25D366] text-white px-6 py-4 rounded-full shadow-2xl hover:shadow-green-500/20 transition-all group"
      >
        <MessageCircle size={24} className="group-hover:rotate-12 transition-transform" />
        <span className="font-bold text-sm uppercase tracking-widest hidden md:block">
          Chat With Concierge
        </span>
      </motion.a>
    </motion.div>
  );
}
