import { motion } from 'motion/react';
import { LucideIcon } from 'lucide-react';
import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'outline' | 'ghost' | 'accent';
  icon?: LucideIcon;
  className?: string;
  onClick?: () => void;
  fullWidth?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export default function Button({
  children,
  variant = 'primary',
  icon: Icon,
  className = '',
  onClick,
  fullWidth = false,
  type = 'button',
}: ButtonProps) {
  const variants = {
    primary: 'bg-primary text-background border-primary hover:bg-transparent hover:text-primary',
    outline: 'bg-transparent text-primary border-primary/20 hover:border-primary hover:bg-primary hover:text-background',
    ghost: 'bg-transparent text-primary border-transparent hover:bg-primary/5',
    accent: 'bg-accent text-primary border-accent hover:bg-transparent hover:text-accent',
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      type={type}
      className={`
        relative overflow-hidden px-8 py-4 rounded-full font-bold text-sm uppercase tracking-widest 
        border transition-all duration-300 flex items-center justify-center gap-2
        ${variants[variant]}
        ${fullWidth ? 'w-full' : 'w-auto'}
        ${className}
      `}
    >
      <span className="relative z-10 flex items-center gap-2">
        {children}
        {Icon && (
          <motion.span
            initial={{ x: 0 }}
            whileHover={{ x: 5 }}
            transition={{ type: 'spring', stiffness: 400 }}
          >
            <Icon size={18} />
          </motion.span>
        )}
      </span>
    </motion.button>
  );
}
