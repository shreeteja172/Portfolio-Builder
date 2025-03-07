"use client";

import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import Image from "next/image";

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  bio: z.string().min(10, "Bio should be at least 10 characters"),
  skills: z.string().min(5, "Enter at least one skill"),
  resume: z.any().optional(),
});

// Portfolio template thumbnails and info
const portfolioOptions = [
  { 
    id: "1", 
    name: "Minimalist Portfolio", 
    image: "/thumbnails/minimal.jpg", 
    description: "Clean, modern design with focus on content" 
  },
  { 
    id: "2", 
    name: "Creative Portfolio", 
    image: "/thumbnails/creative.jpg", 
    description: "Bold, colorful design for creative professionals" 
  },
  { 
    id: "3", 
    name: "Developer Portfolio", 
    image: "/thumbnails/developer.jpg", 
    description: "Technical focus with code snippets and project showcases" 
  },
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function Home() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(schema),
  });

  const [generatedPortfolios, setGeneratedPortfolios] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState(1);
  
  const featuredRef = useRef(null);
  const featuredInView = useInView(featuredRef, { once: true, margin: "-100px" });
  
  const onSubmit = async (data: any) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log("Generating portfolios for:", data);
    
    // Use portfolio template IDs
    setGeneratedPortfolios(["1", "2", "3"]);
    setCurrentStep(2);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 0.8 }}
            className="absolute inset-0 pointer-events-none"
          >
            <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-blue-500/20 rounded-full filter blur-3xl"></div>
            <div className="absolute bottom-1/3 left-1/3 w-72 h-72 bg-purple-500/20 rounded-full filter blur-3xl"></div>
          </motion.div>
          
          <motion.div 
            className="max-w-3xl mx-auto text-center relative z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1 
              className="text-5xl md:text-6xl font-bold mb-6 glow-text"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 1 }}
            >
              Create Your Professional Portfolio in Minutes
            </motion.h1>
            <motion.p 
              className="text-lg md:text-xl mb-8 opacity-90"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 1 }}
            >
              Stand out from the crowd with stunning, interactive portfolios. No coding required.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, type: "spring" }}
            >
              <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-lg px-8 py-6" onClick={() => document.getElementById('builder')?.scrollIntoView({ behavior: 'smooth' })}>
                Start Building Now
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-t border-white/10">
        <div className="container mx-auto px-4">
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div variants={itemVariants} className="glass-effect p-6">
              <h3 className="text-3xl font-bold mb-2">500+</h3>
              <p className="opacity-70">Portfolios Created</p>
            </motion.div>
            <motion.div variants={itemVariants} className="glass-effect p-6">
              <h3 className="text-3xl font-bold mb-2">15+</h3>
              <p className="opacity-70">Templates</p>
            </motion.div>
            <motion.div variants={itemVariants} className="glass-effect p-6">
              <h3 className="text-3xl font-bold mb-2">98%</h3>
              <p className="opacity-70">Satisfaction Rate</p>
            </motion.div>
            <motion.div variants={itemVariants} className="glass-effect p-6">
              <h3 className="text-3xl font-bold mb-2">24/7</h3>
              <p className="opacity-70">Support Available</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Portfolio Builder Section */}
      <section id="builder" className="py-16 md:py-24 relative">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-center mb-12 glow-text"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Build Your Portfolio
          </motion.h2>
          
          <motion.div 
            className="max-w-3xl mx-auto glass-effect p-8 rounded-xl shadow-2xl relative z-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <AnimatePresence mode="wait">
              {currentStep === 1 ? (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <h3 className="text-xl font-medium mb-6">Enter Your Information</h3>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium mb-1">Name</label>
                        <Input
                          placeholder="Your full name"
                          className="w-full p-3 bg-white/5 border border-white/10 rounded-md focus:ring-blue-500"
                          {...register("name")}
                        />
                        {errors.name && (
                          <p className="text-red-500 text-sm mt-1">{String(errors.name.message)}</p>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-1">Skills</label>
                        <Input
                          placeholder="React, Next.js, UI/UX Design..."
                          className="w-full p-3 bg-white/5 border border-white/10 rounded-md focus:ring-blue-500"
                          {...register("skills")}
                        />
                        {errors.skills && (
                          <p className="text-red-500 text-sm mt-1">{String(errors.skills.message)}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">Professional Bio</label>
                      <Textarea
                        placeholder="Tell us about yourself and your experience..."
                        className="w-full p-3 bg-white/5 border border-white/10 rounded-md h-32 focus:ring-blue-500"
                        {...register("bio")}
                      />
                      {errors.bio && (
                        <p className="text-red-500 text-sm mt-1">{String(errors.bio.message)}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">Resume (Optional)</label>
                      <Input
                        type="file"
                        className="w-full p-3 bg-white/5 border border-white/10 rounded-md focus:ring-blue-500"
                        {...register("resume")}
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 rounded-md text-white font-medium"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing...
                        </span>
                      ) : (
                        "Generate Your Portfolio"
                      )}
                    </Button>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-medium">Choose Your Portfolio Design</h3>
                    <button 
                      onClick={() => setCurrentStep(1)} 
                      className="text-sm text-blue-400 hover:text-blue-300"
                    >
                      ← Back to Editor
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    {portfolioOptions.map((portfolio) => (
                      <motion.div
                        key={portfolio.id}
                        whileHover={{ scale: 1.03 }}
                        className="glass-effect rounded-lg overflow-hidden"
                      >
                        <div className="h-40 bg-gradient-to-br from-blue-600 to-purple-600 relative">
                          {/* This would be an actual image in production */}
                          <div className="absolute inset-0 flex items-center justify-center text-lg font-bold">
                            {portfolio.name}
                          </div>
                        </div>
                        <div className="p-4">
                          <h4 className="font-medium mb-1">{portfolio.name}</h4>
                          <p className="text-sm opacity-70 mb-4">{portfolio.description}</p>
                          <Link 
                            href={`/portfolio/${portfolio.id}`} 
                            className="block w-full py-2 bg-white/10 hover:bg-white/20 rounded text-center transition-colors"
                          >
                            View Portfolio
                          </Link>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Featured Portfolios */}
      <section className="py-16 md:py-24" ref={featuredRef}>
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-center mb-4 glow-text"
            style={{
              opacity: featuredInView ? 1 : 0,
              transform: featuredInView ? "none" : "translateY(20px)",
              transition: "all 0.7s cubic-bezier(0.17, 0.55, 0.55, 1) 0.2s"
            }}
          >
            Featured Portfolios
          </motion.h2>
          
          <motion.p 
            className="text-center max-w-2xl mx-auto mb-12 opacity-80"
            style={{
              opacity: featuredInView ? 1 : 0,
              transform: featuredInView ? "none" : "translateY(20px)",
              transition: "all 0.7s cubic-bezier(0.17, 0.55, 0.55, 1) 0.4s"
            }}
          >
            Get inspired by these professionally designed portfolio examples
          </motion.p>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate={featuredInView ? "show" : "hidden"}
          >
            {[1, 2, 3].map((id) => (
              <motion.div 
                key={id}
                variants={itemVariants} 
                className="glass-effect rounded-xl overflow-hidden"
              >
                <div className="h-64 bg-gradient-to-br from-indigo-600/30 to-purple-600/30 flex items-center justify-center">
                  Featured Portfolio {id}
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-semibold mb-2">John's UX Portfolio</h3>
                  <p className="text-sm opacity-70 mb-4">A professional showcase of design work with case studies and process insights.</p>
                  <Link 
                    href={`/portfolio/${id}`} 
                    className="inline-flex items-center text-blue-400 hover:text-blue-300"
                  >
                    View Portfolio
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24 border-t border-white/10">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-center mb-12 glow-text"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            What Our Users Say
          </motion.h2>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div variants={itemVariants} className="glass-effect p-6 rounded-xl">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-500/30 mr-3"></div>
                <div>
                  <h4 className="font-medium">Alex Johnson</h4>
                  <p className="text-sm opacity-70">UX Designer</p>
                </div>
              </div>
              <p className="italic opacity-90">"I landed three interviews within a week of sharing my new portfolio. The templates are professional and easy to customize."</p>
            </motion.div>
            
            <motion.div variants={itemVariants} className="glass-effect p-6 rounded-xl">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-purple-500/30 mr-3"></div>
                <div>
                  <h4 className="font-medium">Maria Garcia</h4>
                  <p className="text-sm opacity-70">Web Developer</p>
                </div>
              </div>
              <p className="italic opacity-90">"As a developer, I was skeptical about a no-code portfolio builder, but the clean code and performance impressed me. My clients love it!"</p>
            </motion.div>
            
            <motion.div variants={itemVariants} className="glass-effect p-6 rounded-xl">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-teal-500/30 mr-3"></div>
                <div>
                  <h4 className="font-medium">Ryan Wilson</h4>
                  <p className="text-sm opacity-70">Freelance Designer</p>
                </div>
              </div>
              <p className="italic opacity-90">"The animated elements and responsive design make my work stand out. I've received so many compliments on my new portfolio."</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-4xl mx-auto glass-effect p-12 rounded-2xl text-center bg-gradient-to-br from-blue-500/20 to-purple-500/20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 glow-text">Ready to Showcase Your Work?</h2>
            <p className="text-lg mb-8 opacity-90">Create your professional portfolio in minutes and share it with the world</p>
            <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-lg px-8 py-5" onClick={() => document.getElementById('builder')?.scrollIntoView({ behavior: 'smooth' })}>
              Build Your Portfolio
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}