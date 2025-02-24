"use client";

import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";

const Featured = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 20 }
    }
  };

  return (
    <motion.div 
      initial="hidden" 
      animate="visible" 
      variants={containerVariants}
      className="bg-gradient-to-br from-blue-700 via-blue-600 to-blue-500 min-h-screen flex items-center justify-center px-4 py-8"
    >
      <div className="max-w-5xl w-full grid md:grid-cols-2 gap-8 items-center">
        {/* Text Section */}
        <motion.div variants={itemVariants} className="space-y-6">
          <motion.h1 
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold text-white"
          >
            Premium Software Hub:
          </motion.h1>
          <motion.p 
            variants={itemVariants}
            className="text-lg text-white/90 leading-relaxed"
          >
            Welcome to Premium Software Hub, your ultimate destination for top-tier professional software solutions. Enjoy secure transactions, instant downloads, and exceptional support—all designed to elevate your productivity.
          </motion.p>
          <motion.div variants={itemVariants}>
            <Link 
              href="/AllProducts"
              className="inline-block px-8 py-3 bg-white text-blue-700 font-semibold rounded-full shadow-lg hover:bg-blue-50 transition-colors"
            >
              Read More
            </Link>
          </motion.div>
        </motion.div>

        {/* Image Section */}
        <motion.div variants={itemVariants} className="flex justify-center items-center">
          <motion.img 
            whileHover={{ scale: 1.05 }}
            src="/software.jpg"
            alt="Software"
            className="rounded-xl shadow-2xl max-w-full"
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Featured;
