// components/HeroSection.jsx
"use client";

import React, { useRef, useCallback } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import { Button } from "./ui/button";
import Link from "next/link";
import Image from "next/image";

export default function HeroSection() {
  const imageRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ["start end", "end start"],
  });
  const yTransform = useTransform(scrollYProgress, [0, 1], [0, 80]);

  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <section className="relative w-full pt-30 md:pt-48 pb-5 overflow-hidden">
      {/* Particle background */}
      <Particles
        id="hero_particles"
        init={particlesInit}
        options={{
          fullScreen: { enable: true },
          particles: {
            number: { value: 50, density: { enable: true, area: 800 } },
            size: { value: { min: 1, max: 3 } },
            links: { enable: true, color: "#aaa", distance: 120 },
            move: { speed: 1, enable: true },
          },
          interactivity: {
            events: { onHover: { enable: true, mode: "repulse" } },
          },
        }}
        className="absolute inset-0 z-0"
      />

      <div className="relative z-10 space-y-6 text-center">
        <motion.h1
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-center font-bold mb-8 bg-gradient-to-r from-indigo-400 to-pink-600 bg-clip-text text-transparent animate-fade-in-up"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.5 }}
        >
          Your AI-Powered Coach for
        </motion.h1>

        <motion.h1
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-center font-bold mb-8 bg-gradient-to-r from-indigo-400 to-pink-600 bg-clip-text text-transparent animate-fade-in-up"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          Unstoppable Success!
        </motion.h1>

        <motion.p
          className="mx-auto max-w-[600px] text-muted-foreground md:text-xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          Accelerate your career with tailored guidance, expert interview prep,
          and AI tools designed for your job success.
        </motion.p>

        <motion.div
          className="flex justify-center space-x-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Link href="/dashboard">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                className="px-8 text-white shadow-md border-3 border-purple-500 hover:bg-purple-500 hover:shadow-purple-500/40 transition-all duration-300 rounded-xl"
              >
                Get Started
              </Button>
            </motion.div>
          </Link>
        </motion.div>

        <motion.div
          ref={imageRef}
          className="hero-image-wrapper mt-5 md:mt-0 relative mx-auto"
          style={{ y: yTransform }}
        >
          <motion.div
            className="hero-image rounded-2xl"
            style={{ perspective: 1000, transformStyle: "preserve-3d" }}
            whileHover={{
              scale: 1.05,
              rotateX: 6,
              rotateY: 6,
            }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 15,
            }}
          >
            {/* <Image
              src="/banner12.png"
              alt="Banner-Rensai"
              width={1000}
              height={600}
              className="w-[1200] h-[600px] object-auto rounded-lg shadow-2xl border mx-auto"
              priority
            /> */}
            <div className="flex justify-center items-center h-screen">
              <video
                className="w-[1000px] h-[600px] rounded-xl shadow-lg"
                autoPlay
                loop
                muted
                preload="auto"
                playsInline
              >
                <source src="/AI.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
