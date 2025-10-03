"use client"

import React, { forwardRef } from 'react';
import { motion, Variants } from 'framer-motion';
import { Award, ThumbsUp, TrendingUp, Truck, Users, Shield, Target, Heart } from 'lucide-react';

interface WhyChooseFeature {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  color: string;
}

interface WhyChooseUsSectionProps {
  features?: WhyChooseFeature[];
  isInView?: boolean;
  variants?: Variants;
}

const defaultFeatures: WhyChooseFeature[] = [
  {
    icon: Award,
    title: "Industry Leader",
    description: "25+ years of excellence in hardware supply and manufacturing",
    color: "from-purple-500 to-pink-500"
  },
  {
    icon: ThumbsUp,
    title: "Quality Guaranteed",
    description: "100% authentic products from trusted manufacturers worldwide",
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: TrendingUp,
    title: "Competitive Pricing",
    description: "Best prices in Tanzania with flexible payment options",
    color: "from-green-500 to-emerald-500"
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "Same-day delivery in Dar es Salaam, nationwide shipping available",
    color: "from-orange-500 to-red-500"
  },
  {
    icon: Users,
    title: "Expert Support",
    description: "Professional consultation and technical support for all projects",
    color: "from-violet-500 to-purple-500"
  },
  {
    icon: Shield,
    title: "Warranty Protection",
    description: "Comprehensive warranty coverage on all products and services",
    color: "from-teal-500 to-blue-500"
  }
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

const WhyChooseUsSection = forwardRef<HTMLDivElement, WhyChooseUsSectionProps>(
  ({ features = defaultFeatures, isInView = false, variants = staggerContainer }, ref) => {
    return (
      <div ref={ref} className="py-24 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.div variants={slideUp} className="flex items-center justify-center mb-6">
              <Target className="h-8 w-8 text-purple-300 mr-3" />
              <span className="text-purple-300 font-semibold text-lg">Why Choose Us</span>
            </motion.div>
            <motion.h2 variants={slideUp} className="text-4xl md:text-6xl font-bold text-white mb-6">
              Built for <span className="bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent">Excellence</span>
            </motion.h2>
            <motion.p variants={slideUp} className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              With over 25 years of experience, we've become Tanzania's most trusted hardware partner. 
              Here's what makes us different.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={featureVariants}
                className="group relative"
                whileHover={{ y: -8 }}
              >
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden relative">
                  {/* Background Gradient on Hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                  
                  {/* Icon */}
                  <motion.div 
                    className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br ${feature.color} text-white mb-6 shadow-lg`}
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.8 }}
                  >
                    <feature.icon className="h-8 w-8" />
                  </motion.div>

                  <h3 className="text-xl font-bold text-white mb-4 group-hover:text-purple-300 transition-colors relative z-10">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed relative z-10">
                    {feature.description}
                  </p>

                  {/* Decorative Elements */}
                  <div className="absolute -top-2 -right-2 w-20 h-20 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
                  <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
                </div>
              </motion.div>
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

WhyChooseUsSection.displayName = 'WhyChooseUsSection';

export default WhyChooseUsSection;