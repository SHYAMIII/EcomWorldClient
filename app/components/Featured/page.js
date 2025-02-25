"use client";

import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";

const Featured = () => {
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { staggerChildren: 0.3, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 80, damping: 20 },
    },
  };

  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 p-8"
    >
      <div className="bg-white/80 backdrop-blur-lg shadow-2xl rounded-2xl overflow-hidden flex flex-col md:flex-row max-w-5xl w-full">
        {/* Image Section */}
        <motion.div variants={itemVariants} className="md:w-1/2">
          <motion.img
            whileHover={{ scale: 1.05 }}
            src="/software.jpg"
            alt="Software"
            className="w-full h-full object-cover"
          />
        </motion.div>
        {/* Content Section */}
        <motion.div
          variants={itemVariants}
          className="p-10 flex flex-col justify-center md:w-1/2"
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-800 to-blue-400 mb-6"
          >
            Premium Software Hub
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-lg text-blue-900 mb-8 leading-relaxed"
          >
            Discover top-tier professional software solutions with a focus on
            innovation and quality. Enjoy secure transactions, instant downloads,
            and exceptional support to boost your productivity.
          </motion.p>
          <motion.div variants={itemVariants}>
            <Link
              href="/AllProducts"
              className="inline-block px-8 py-3 bg-blue-800 text-white font-semibold rounded-full shadow-lg hover:bg-blue-900 transition-all"
            >
              Explore Now
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Featured;
