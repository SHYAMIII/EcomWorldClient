"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Header from "../components/Header/page";
import Footer from "../components/Footer/page";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
    },
  },
};

export default function About() {
  const content = {
    title: "About Us",
    paragraphs: [
      "We are a team of passionate developers dedicated to providing the best software solutions to our customers. Based in India, our journey is driven by creativity, innovation, and an unwavering commitment to quality.",
      "Our mission is to deliver high-quality, customized software solutions that meet the unique needs of our clients. We focus on excellence in every project, ensuring cutting-edge technology and customer satisfaction.",
      "Our offerings include web development, mobile app development, and comprehensive software testing services.",
    ],
    button: {
      text: "Back to Home",
      href: "/",
    },
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-100 flex items-center justify-center px-4">
        <motion.div
          className="max-w-3xl w-full p-6 md:p-10 bg-white/90 backdrop-blur-sm rounded-xl shadow-xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            className="text-4xl md:text-5xl font-bold text-sky-800 text-center mb-8"
            variants={itemVariants}
          >
            {content.title}
          </motion.h1>

          {content.paragraphs.map((paragraph, index) => (
            <motion.p
              key={index}
              className="mt-6 text-lg text-slate-700 leading-relaxed"
              variants={itemVariants}
            >
              {paragraph}
            </motion.p>
          ))}

          <motion.div className="mt-8 text-center" variants={itemVariants}>
            <Link
              href={content.button.href}
              className="inline-block px-8 py-3 bg-sky-600 hover:bg-sky-700 text-white font-medium rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              {content.button.text}
            </Link>
          </motion.div>
        </motion.div>
      </main>
      <Footer />
    </>
  );
}
