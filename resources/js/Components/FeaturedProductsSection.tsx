"use client"

import React, { forwardRef } from 'react';
import { motion, Variants } from 'framer-motion';
import { Star, ArrowRight } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  price: string;
  rating: number;
  image: string;
  category: string;
}

interface AddToCart {
  (product: Product): void;
}

interface FeaturedProductsSectionProps {
  products?: Product[];
  addToCart?: AddToCart;
  isInView?: boolean;
  variants?: Variants;
}

const defaultProducts: Product[] = [
  { id: 1, name: "Professional Drill Set", price: "TSh 350,000", rating: 4.8, image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80", category: "Power Tools" },
  { id: 2, name: "Heavy Duty Hammer", price: "TSh 50,000", rating: 4.9, image: "https://images.unsplash.com/photo-1607870411590-d5e9e06da09a?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", category: "Hand Tools" },
  { id: 3, name: "Wire Stripper Tool", price: "TSh 30,000", rating: 4.7, image: "https://images.unsplash.com/photo-1726084396629-2175d5810dad?q=80&w=928&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", category: "Electrical" },
  { id: 4, name: "Adjustable Wrench Set", price: "TSh 70,000", rating: 4.6, image: "https://plus.unsplash.com/premium_photo-1723874673961-a099a9ec566d?q=80&w=868&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", category: "Hand Tools" },
  { id: 5, name: "Concrete Block Standard", price: "TSh 5,000", rating: 4.5, image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80", category: "Building Materials" },
  { id: 6, name: "PVC Pipe 2 inch", price: "TSh 25,000", rating: 4.4, image: "https://plus.unsplash.com/premium_photo-1661577094877-725f859aff3e?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8UFZDJTIwUGlwZXxlbnwwfHwwfHx8MA%3D%3D", category: "Plumbing" },
  { id: 7, name: "Power Saw", price: "TSh 200,000", rating: 4.7, image: "https://plus.unsplash.com/premium_photo-1677480019971-80d7fbb25b7e?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8UG93ZXIlMjBzYXd8ZW58MHx8MHx8fDA%3D", category: "Power Tools" },
  { id: 8, name: "Screwdriver Set", price: "TSh 40,000", rating: 4.6, image: "https://plus.unsplash.com/premium_photo-1683140705462-11ed388653cf?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8U2NyZXdkcml2ZXIlMjBzZXR8ZW58MHx8MHx8fDA%3D", category: "Hand Tools" }
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

const productVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8, rotateY: 90 },
  visible: {
    opacity: 1,
    scale: 1,
    rotateY: 0,
    transition: { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] },
  },
};

const FeaturedProductsSection = forwardRef<HTMLDivElement, FeaturedProductsSectionProps>(
  ({ products = defaultProducts, addToCart, isInView = false, variants = staggerContainer }, ref) => {
    return (
      <div ref={ref} className="py-24 bg-white relative overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.div variants={slideUp} className="flex items-center justify-center mb-6">
              <Star className="h-8 w-8 text-purple-600 mr-3" />
              <span className="text-purple-600 font-semibold text-lg">Featured Products</span>
            </motion.div>
            <motion.h2 variants={slideUp} className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Our Top <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Picks</span>
            </motion.h2>
            <motion.p variants={slideUp} className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover our top picks for your projects - handpicked for quality and performance
            </motion.p>
          </motion.div>

          {/* Products Grid */}
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {products.map((product) => (
              <motion.div
                key={product.id}
                variants={productVariants}
                className="group bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-500 relative overflow-hidden"
                whileHover={{ y: -8 }}
              >
                {/* Product Image */}
                <div className="relative overflow-hidden rounded-xl mb-6">
                  <motion.img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    whileHover={{ scale: 1.05 }}
                  />
                  <div className="absolute top-3 right-3">
                    <div className="bg-purple-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                      Top Rated
                    </div>
                  </div>
                </div>

                {/* Product Info */}
                <div className="space-y-3">
                  <p className="text-sm text-purple-600 font-medium">{product.category}</p>
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                    {product.name}
                  </h3>
                  
                  {/* Rating */}
                  <div className="flex items-center space-x-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`h-4 w-4 ${i < Math.round(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600 font-medium">{product.rating}</span>
                  </div>

                  <p className="text-2xl font-bold text-purple-600">{product.price}</p>

                  <motion.button 
                    onClick={() => addToCart && addToCart(product)}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 relative overflow-hidden group-hover:shadow-lg"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="relative z-10 flex items-center justify-center">
                      Add to Cart
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </motion.button>
                </div>

                {/* Hover Background Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 rounded-2xl"></div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    );
  }
);

FeaturedProductsSection.displayName = 'FeaturedProductsSection';

export default FeaturedProductsSection;