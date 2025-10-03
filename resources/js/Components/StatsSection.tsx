"use client"

import React, { useEffect, forwardRef } from 'react';
import { motion, Variants, useMotionValue, useTransform, animate } from 'framer-motion';

interface Stat {
  number: string;
  label: string;
  suffix: string;
}

interface StatsSectionProps {
  stats?: Stat[];
  isInView?: boolean;
}

const defaultStats: Stat[] = [
  { number: "25", label: "Years Experience", suffix: "+" },
  { number: "5000", label: "Happy Customers", suffix: "+" },
  { number: "10000", label: "Products Available", suffix: "+" },
  { number: "24", label: "Hour Support", suffix: "/7" }
];

const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const countUpVariants: Variants = {
  hidden: { opacity: 0, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const statVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8, rotateY: 90 },
  visible: {
    opacity: 1,
    scale: 1,
    rotateY: 0,
    transition: { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] },
  },
};

function StatItem({ stat, index, isInView }: { stat: Stat; index: number; isInView: boolean }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    if (isInView) {
      animate(count, parseInt(stat.number), {
        duration: 2.5,
        ease: [0.25, 0.46, 0.45, 0.94],
      });
    } else {
      count.set(0);
    }
  }, [isInView, count, stat.number]);

  return (
    <motion.div
      variants={statVariants}
      className="text-center text-white"
    >
      <motion.div
        className="text-4xl md:text-6xl font-bold mb-2 flex items-center justify-center"
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : { scale: 0 }}
        transition={{ duration: 0.8, delay: index * 0.1 }}
      >
        <motion.span
          className="inline-block mx-1"
          style={{ display: 'inline-block' }}
        >
          <motion.span className="text-white">
            {rounded}
          </motion.span>
        </motion.span>
        <motion.span
          className="inline-block"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
        >
          <span className="text-purple-300">{stat.suffix}</span>
        </motion.span>
      </motion.div>
      <div className="text-gray-300 text-sm md:text-base">{stat.label}</div>
    </motion.div>
  );
}

const StatsSection = forwardRef<HTMLDivElement, StatsSectionProps>(
  ({ stats = defaultStats, isInView = false }, ref) => {
    return (
      <div ref={ref} className="py-16 bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 relative z-10"
          >
            {stats.map((stat, index) => (
              <StatItem
                key={index}
                stat={stat}
                index={index}
                isInView={isInView}
              />
            ))}
          </motion.div>
        </div>
        
        {/* Background Animation */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white/20 rounded-full"
              style={{
                left: `${10 + (i * 15)}%`,
                top: `${20 + (i * 10)}%`,
              }}
              animate={{
                y: [-20, 20, -20],
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                duration: 3 + i,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </div>
    );
  }
);

StatsSection.displayName = 'StatsSection';

export default StatsSection;