import { motion } from 'motion/react';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
}

export default function SectionHeading({ title, subtitle, centered = true }: SectionHeadingProps) {
  return (
    <div className={`mb-16 ${centered ? 'text-center' : 'text-left'}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {subtitle && (
          <span className="text-accent uppercase tracking-[0.2em] text-xs font-bold mb-3 block">
            {subtitle}
          </span>
        )}
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-display text-primary leading-tight">
          {title}
        </h2>
        <div className={`h-1 w-20 bg-accent mt-6 ${centered ? 'mx-auto' : ''}`} />
      </motion.div>
    </div>
  );
}
