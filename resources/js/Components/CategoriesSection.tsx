"use client";

import React, { forwardRef } from "react";
import { motion, Variants } from "framer-motion";
import { Zap, Hammer, Wrench, Building2, Shield, ArrowRight } from "lucide-react";

interface Category {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  image: string;
}

interface CategoriesSectionProps {
  categories?: Category[];
  isInView?: boolean;
  variants?: Variants;
}

const defaultCategories: Category[] = [
  {
    name: "Power Tools",
    icon: Zap,
    image:
      "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
  },
  {
    name: "Hand Tools",
    icon: Hammer,
    image:
      "https://plus.unsplash.com/premium_photo-1683140705462-11ed388653cf?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8U2NyZXdkcml2ZXIlMjBzZXR8ZW58MHx8MHx8fDA%3D",
  },
  {
    name: "Plumbing",
    icon: Wrench,
    image:
      "https://plus.unsplash.com/premium_photo-1661577094877-725f859aff3e?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8UFZDJTIwUGlwZXxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    name: "Electrical",
    icon: Zap,
    image:
      "https://images.unsplash.com/photo-1621905251918-48416bd8575a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
  },
  {
    name: "Building Materials",
    icon: Building2,
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
  },
  {
    name: "Safety Equipment",
    icon: Shield,
    image:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&auto=format&fit=crop&q=60",
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

const categoryVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8, rotateY: 90 },
  visible: {
    opacity: 1,
    scale: 1,
    rotateY: 0,
    transition: { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] },
  },
};

const CategoriesSection = forwardRef<HTMLDivElement, CategoriesSectionProps>(
  ({ categories = defaultCategories }, ref) => {
    return (
      <div
        ref={ref}
        className="py-24 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.div
              variants={slideUp}
              className="flex items-center justify-center mb-6"
            >
              <Building2 className="h-8 w-8 text-purple-300 mr-3" />
              <span className="text-purple-300 font-semibold text-lg">
                Product Categories
              </span>
            </motion.div>
            <motion.h2
              variants={slideUp}
              className="text-4xl md:text-6xl font-bold text-white mb-6"
            >
              Shop by{" "}
              <span className="bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent">
                Category
              </span>
            </motion.h2>
            <motion.p
              variants={slideUp}
              className="text-xl text-gray-300 max-w-3xl mx-auto"
            >
              Find exactly what you need from our extensive product range
            </motion.p>
          </motion.div>

          {/* Categories Grid */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10"
          >
            {categories.map((category, index) => (
              <motion.div
                key={index}
                variants={categoryVariants}
                className="group cursor-pointer bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 relative"
                whileHover={{ y: -10 }}
              >
                <div className="relative overflow-hidden rounded-2xl h-64">
                  <motion.img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    whileHover={{ scale: 1.1 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                  <div className="absolute inset-0 bg-purple-600/0 group-hover:bg-purple-600/20 transition-colors duration-500"></div>

                  {/* Icon Overlay */}
                  <motion.div
                    className="absolute top-6 right-6 w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center"
                    whileHover={{ scale: 1.2, rotate: 15 }}
                  >
                    <category.icon className="h-6 w-6 text-white" />
                  </motion.div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                    {category.name}
                  </h3>
                </div>

                {/* Hover Effect Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-purple-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </motion.div>
            ))}
          </motion.div>

          {/* Shop by Category Button */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={slideUp}
            className="text-center mt-12"
          >
            <a href="/Products">
              <motion.button
                className="group bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-4 px-10 rounded-full shadow-2xl relative overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10 flex items-center justify-center">
                  Shop by Category
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              </motion.button>
            </a>
          </motion.div>
        </div>

        {/* Background Animation */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white/20 rounded-full"
              style={{
                left: `${10 + i * 15}%`,
                top: `${20 + i * 10}%`,
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

CategoriesSection.displayName = "CategoriesSection";

export default CategoriesSection;