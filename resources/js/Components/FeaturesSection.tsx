"use client"

import React, { forwardRef } from 'react';
import { motion, Variants } from 'framer-motion';
import { Truck, Shield, Clock, Users } from 'lucide-react';

interface Feature {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  color: string;
  bgColor: string;
  gradient: string;
}

interface FeaturesSectionProps {
  features?: Feature[];
  isInView?: boolean;
  variants?: Variants;
}

const defaultFeatures: Feature[] = [
  { 
    icon: Truck, 
    title: "Free Delivery", 
    description: "On orders over TSh 250,000", 
    color: "text-purple-600", 
    bgColor: "bg-purple-100", 
    gradient: "from-purple-500 to-pink-500" 
  },
  { 
    icon: Shield, 
    title: "Quality Guarantee", 
    description: "100% authentic products", 
    color: "text-blue-700", 
    bgColor: "bg-blue-100", 
    gradient: "from-blue-500 to-cyan-500" 
  },
  { 
    icon: Clock, 
    title: "Fast Service", 
    description: "Quick turnaround times", 
    color: "text-green-600", 
    bgColor: "bg-green-100", 
    gradient: "from-green-500 to-emerald-500" 
  },
  { 
    icon: Users, 
    title: "Expert Support", 
    description: "Professional assistance", 
    color: "text-orange-600", 
    bgColor: "bg-orange-100", 
    gradient: "from-orange-500 to-red-500" 
  },
];

const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const slideUp: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] },
  },
};

const featureVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8, rotateY: 90 },
  visible: {
    opacity: 1,
    scale: 1,
    rotateY: 0,
    transition: { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] },
  },
};

const FeaturesSection = forwardRef<HTMLDivElement, FeaturesSectionProps>(
  ({ features = defaultFeatures, isInView = false, variants = staggerContainer }, ref) => {
    return (
      <div ref={ref} className="py-24 bg-white relative overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={variants}
            className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={featureVariants}
                className="group text-center relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl border border-gray-100"
                whileHover={{ y: -10 }}
              >
                <motion.div 
                  className={`${feature.bgColor} w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:shadow-2xl transition-all duration-300 relative overflow-hidden`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <feature.icon className={`h-10 w-10 ${feature.color} z-10 relative`} />
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}></div>
                </motion.div>
                <h3 className="text-xl font-bold mb-3 text-gray-800 group-hover:text-purple-600 transition-colors">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                
                {/* Hover Effect Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    );
  }
);

FeaturesSection.displayName = 'FeaturesSection';

export default FeaturesSection;