"use client";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import HeroSection from "@/components/hero";
import { features } from "@/data/features";
import { howItWorks } from "@/data/howItWorks";
import { testimonial } from "@/data/testimonial";
import { faqs } from "@/data/faqs";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { motion, useAnimation } from "framer-motion";
import CountUp from "react-countup";
import { ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const stats = [
  { label: "Industries Covered", value: 50, suffix: "+" },
  { label: "Interview Questions", value: 1000, suffix: "+" },
  { label: "Success Rate", value: 95, suffix: "%" },
  { label: "AI Support", value: 24, suffix: "/7" },
];

const animateVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function LandingPage() {
  return (
    <>
      <div className="grid-background" />
      <HeroSection />

      {/* Features Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
        <div className="container mx-auto px-4 md:px-6">
           <h2 className="text-4xl text-center font-bold mb-8 bg-gradient-to-r from-indigo-400 to-pink-600 bg-clip-text text-transparent animate-fade-in-up">
            Supercharge Your Career with Smart Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {features.map((feat, i) => (
              <motion.div
                key={i}
                variants={animateVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.4 }}
                whileHover={{ scale: 1.05, rotateX: 5, rotateY: 5 }}
              >
                <Card className="border-2 hover:border-primary transition-colors duration-300">
                  <CardContent className="pt-2 text-center flex flex-col items-center">
                    {feat.icon}
                    <h3 className="text-xl font-bold mb-2">{feat.title}</h3>
                    <p className="text-muted-foreground">{feat.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="w-full py-8 md:py-10 bg-muted/50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto text-center">
            {stats.map((s, i) => (
              <motion.div
                key={i}
                variants={animateVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.4 }}
                className="flex flex-col items-center justify-center space-y-2"
              >
                <h3 className="text-4xl font-bold">
                  <CountUp end={s.value} duration={4} suffix={s.suffix} />
                </h3>
                <p className="text-muted-foreground">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="w-full py-12 md:py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
             <h2 className="text-4xl text-center font-bold mb-4 bg-gradient-to-r from-indigo-400 to-pink-600 bg-clip-text text-transparent animate-fade-in-up">How It Works</h2>
            <p className="text-muted-foreground">
              Four simple steps to accelerate your career growth
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {howItWorks.map((step, i) => (
              <motion.div
                key={i}
                variants={animateVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.4 }}
                className="flex flex-col items-center text-center space-y-4"
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  {step.icon}
                </div>
                <h3 className="font-semibold text-xl">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="w-full py-12 md:py-20 bg-muted/50">
        <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-4xl text-center font-bold mb-4 bg-gradient-to-r from-indigo-400 to-pink-600 bg-clip-text text-transparent animate-fade-in-up">
          User Spotlights
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonial.map((t, i) => (
              <motion.div
                key={i}
                variants={animateVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.4 }}
              >
                <Card className="bg-background shadow-xl">
                  <CardContent className="pt-6">
                    <div className="flex flex-col space-y-4">
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="relative h-12 w-12 rounded-full overflow-hidden">
                          <img
                            src={t.image}
                            alt={t.author}
                            className="object-cover w-full h-full border border-primary/30 shadow-sm"
                          />
                        </div>
                        <div>
                          <p className="font-semibold">{t.author}</p>
                          <p className="text-sm text-muted-foreground">
                            {t.role}
                          </p>
                          <p className="text-sm text-primary">{t.company}</p>
                        </div>
                      </div>
                      <blockquote className="relative text-muted-foreground italic">
                        <span className="text-3xl text-primary absolute -top-4 -left-2">
                          “
                        </span>
                        {t.quote}
                        <span className="text-3xl text-primary absolute -bottom-4">
                          ”
                        </span>
                      </blockquote>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full py-16 md:py-28 bg-gradient-to-b from-black via-zinc-900 to-background text-white">
  <div className="container mx-auto px-4 md:px-6">
    <div className="text-center max-w-3xl mx-auto mb-14">
      <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-indigo-400 to-pink-600 bg-clip-text text-transparent animate-fade-in-up">
        Frequently Asked Questions
      </h2>
      <p className="text-zinc-400 text-lg">
        Find answers to common questions about our platform
      </p>
    </div>
    <div className="max-w-3xl mx-auto space-y-4">
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((f, i) => (
          <AccordionItem
            key={i}
            value={`item-${i}`}
            className="rounded-xl bg-zinc-900/40 backdrop-blur-md shadow-md hover:shadow-lg transition-all"
          >
            <AccordionTrigger className="text-left px-4 py-4 text-lg font-medium hover:text-blue-400 transition-colors duration-300">
              {f.question}
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4 text-zinc-300">
              {f.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  </div>
</section>

      {/* CTA */}
      <section className="w-full relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 w-[800px] h-[800px] bg-purple-700/20 blur-2xl rounded-full z-0" />

      <div className="relative z-10 mx-auto py-28 px-4 md:px-8 bg-gradient-to-br from-background via-zinc-900 to-black rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] ring-1 ring-white/10 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="flex flex-col items-center justify-center space-y-6 text-center"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-white via-indigo-400 to-purple-500 text-transparent bg-clip-text">
            Ready to Accelerate Your Career?
          </h2>

          <p className="max-w-xl text-zinc-300 text-base md:text-lg">
            Advance your career with the AI tools trusted by thousands of professionals.
          </p>

          <Link href="/dashboard" passHref>
            <Button
              size="lg"
              className="h-12 mt-6 px-6 text-white font-semibold bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 hover:scale-105 shadow-md animate-bounce"
            >
              Start Your Journey Today
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
    </>
  );
}