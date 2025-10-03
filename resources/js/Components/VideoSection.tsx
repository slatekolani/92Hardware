"use client"

import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { Eye, PlayCircle, ArrowRight } from 'lucide-react';

interface VideoSectionProps {
  isVideoPlaying?: boolean;
  setIsVideoPlaying?: (playing: boolean) => void;
}

const VideoSection = forwardRef<HTMLDivElement, VideoSectionProps>(
  ({ isVideoPlaying = false, setIsVideoPlaying }, ref) => {
    return (
      <div ref={ref} className="py-24 bg-gradient-to-r from-gray-900 via-purple-900 to-blue-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Video Content */}
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="relative">
                <motion.div 
                  className="bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden border border-white/20"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="aspect-video relative overflow-hidden">
                    {!isVideoPlaying ? (
                      <motion.button
                        onClick={() => setIsVideoPlaying && setIsVideoPlaying(true)}
                        className="group flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-md rounded-full border border-white/30 hover:bg-white/30 transition-all absolute inset-0 m-auto z-10"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <PlayCircle className="h-10 w-10 text-white group-hover:text-purple-300 transition-colors" />
                      </motion.button>
                    ) : (
                      <iframe
                        width="100%"
                        height="100%"
                        src="https://www.youtube.com/embed/IDf4lRkShRU"
                        title="Bomba la SATO ni biashara maridadi: Hadithi ya 92 Hardware!"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                      />
                    )}
                    
                    {/* Animated Background Elements */}
                    <div className="absolute inset-0 opacity-20 pointer-events-none">
                      {[...Array(8)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-2 h-2 bg-white rounded-full"
                          style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                          }}
                          animate={{
                            y: [-10, 10, -10],
                            opacity: [0.3, 1, 0.3],
                          }}
                          transition={{
                            duration: 2 + Math.random() * 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-white"
            >
              <motion.div 
                className="flex items-center mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                viewport={{ once: true }}
              >
                <Eye className="h-6 w-6 text-purple-300 mr-3" />
                <span className="text-purple-300 font-semibold">Behind the Scenes</span>
              </motion.div>
              
              <motion.h2 
                className="text-4xl md:text-5xl font-bold mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                viewport={{ once: true }}
              >
                See How We <span className="bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent">Craft Quality</span>
              </motion.h2>
              
              <motion.p 
                className="text-xl text-gray-300 mb-8 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                viewport={{ once: true }}
              >
                Take a virtual tour of our manufacturing facility and witness our commitment to quality. 
                From raw materials to finished products, every step is carefully monitored to ensure 
                we deliver nothing but the best to our customers.
              </motion.p>

              <motion.div 
                className="grid grid-cols-2 gap-6 mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                viewport={{ once: true }}
              >
                {[
                  { number: "50+", label: "Quality Checks" },
                  { number: "100%", label: "Satisfaction Rate" },
                  { number: "24/7", label: "Production" },
                  { number: "ISO", label: "Certified" }
                ].map((item, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl font-bold text-purple-300">{item.number}</div>
                    <div className="text-gray-400 text-sm">{item.label}</div>
                  </div>
                ))}
              </motion.div>

             
            </motion.div>
          </div>
        </div>

        {/* Background Decorations */}
        <div className="absolute top-20 left-20 w-40 h-40 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-60 h-60 bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-full blur-3xl"></div>
      </div>
    );
  }
);

VideoSection.displayName = 'VideoSection';

export default VideoSection;