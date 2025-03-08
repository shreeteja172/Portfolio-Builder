"use client";

import { toast } from "react-hot-toast";
import {
  generatePortfolios,
  UserData,
  GeneratedPortfolio,
} from "@/services/api";
import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Github, Linkedin } from "lucide-react";
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
    description: "Clean, modern design with focus on content",
  },
  {
    id: "2",
    name: "Creative Portfolio",
    image: "/thumbnails/creative.jpg",
    description: "Bold, colorful design for creative professionals",
  },
  {
    id: "3",
    name: "Developer Portfolio",
    image: "/thumbnails/developer.jpg",
    description: "Technical focus with code snippets and project showcases",
  },
];

// Animation variants
// Around line 48, update from:

export default function Home() {
  // Move all useState declarations here
  const [generatedPortfolios, setGeneratedPortfolios] = useState<
    GeneratedPortfolio[]
  >([]);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(1);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });
  // Animation variants - keep these outside the component
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  // export default function Home() {
  //   // Component code...
  // }
  //   // Rest of your component...
  // }

  // const [generatedPortfolios, setGeneratedPortfolios] = useState<string[]>([])
  // const [currentStep, setCurrentStep] = useState(1)

  const featuredRef = useRef(null);
  const featuredInView = useInView(featuredRef, {
    once: true,
    margin: "-100px",
  });

  const onSubmit = async (data: UserData) => {
    try {
      setIsGenerating(true);
      setError(null);

      // Call your API to generate portfolios
      const portfolios = await generatePortfolios(data);

      // Update state with the returned portfolios
      setGeneratedPortfolios(portfolios);
      setCurrentStep(2);

      // Show success message
      toast.success("Successfully generated 3 portfolio designs!");
    } catch (err) {
      console.error("Error generating portfolios:", err);
      setError("Failed to generate portfolios. Please try again.");
      toast.error("Failed to generate portfolios");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <motion.div
              initial={{ rotate: -10, scale: 0.9 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg"></div>
            </motion.div>
            <span className="font-bold text-xl">PortfolioBuilder</span>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="#features"
              className="text-sm opacity-80 hover:opacity-100 transition-opacity"
            >
              Features
            </Link>
            <Link
              href="#templates"
              className="text-sm opacity-80 hover:opacity-100 transition-opacity"
            >
              Templates
            </Link>
            <Link
              href="#testimonials"
              className="text-sm opacity-80 hover:opacity-100 transition-opacity"
            >
              Testimonials
            </Link>
            <Link
              href="#team"
              className="text-sm opacity-80 hover:opacity-100 transition-opacity"
            >
              Our Team
            </Link>
          </nav>

          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
                Sign In
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md glass-effect border border-white/20">
              <DialogHeader>
                <DialogTitle className="text-center text-xl font-bold mb-2">
                  Welcome Back
                </DialogTitle>
              </DialogHeader>
              <Tabs defaultValue="signin" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-4">
                  <TabsTrigger value="signin">Sign In</TabsTrigger>
                  <TabsTrigger value="signup">Sign Up</TabsTrigger>
                </TabsList>
                <TabsContent value="signin" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      placeholder="your@email.com"
                      className="bg-white/5"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      className="bg-white/5"
                    />
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center">
                      <input type="checkbox" id="remember" className="mr-2" />
                      <label htmlFor="remember">Remember me</label>
                    </div>
                    <Link
                      href="#"
                      className="text-blue-400 hover:text-blue-300"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
                    Sign In
                  </Button>
                  <div className="relative my-4">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-white/10"></div>
                    </div>
                    <div className="relative flex justify-center text-xs">
                      <span className="px-2 bg-black text-white/60">
                        Or continue with
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Button className="border-white/20 hover:bg-white/5">
                      {/* <Github className="mr-2 h-4 w-4" /> */}
                      GitHub
                    </Button>
                    <Button className="border-white/20 hover:bg-white/5">
                      <svg
                        className="mr-2 h-4 w-4"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                          fill="#4285F4"
                        />
                        <path
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                          fill="#34A853"
                        />
                        <path
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                          fill="#FBBC05"
                        />
                        <path
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                          fill="#EA4335"
                        />
                      </svg>
                      Google
                    </Button>
                  </div>
                </TabsContent>
                <TabsContent value="signup" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-name">Full Name</Label>
                    <Input
                      id="signup-name"
                      placeholder="John Doe"
                      className="bg-white/5"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input
                      id="signup-email"
                      placeholder="your@email.com"
                      className="bg-white/5"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <Input
                      id="signup-password"
                      type="password"
                      placeholder="••••••••"
                      className="bg-white/5"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      placeholder="••••••••"
                      className="bg-white/5"
                    />
                  </div>
                  <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
                    Create Account
                  </Button>
                  <div className="relative my-4">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-white/10"></div>
                    </div>
                    <div className="relative flex justify-center text-xs">
                      <span className="px-2 bg-black text-white/60">
                        Or sign up with
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Button className="border-white/20 hover:bg-white/5">
                      {/* <Github className="mr-2 h-4 w-4" /> */}
                      GitHub
                    </Button>
                    <Button className="border-white/20 hover:bg-white/5">
                      <svg
                        className="mr-2 h-4 w-4"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                          fill="#4285F4"
                        />
                        <path
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                          fill="#34A853"
                        />
                        <path
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                          fill="#FBBC05"
                        />
                        <path
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                          fill="#EA4335"
                        />
                      </svg>
                      Google
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </DialogContent>
          </Dialog>
          <div className="hidden md:flex items-center gap-2 mr-4">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            {/* <span className="text-xs text-white/70">1,234 users online</span> */}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
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
              Stand out from the crowd with stunning, interactive portfolios. No
              coding required.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, type: "spring" }}
            >
              <Button
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-lg px-8 py-6"
                onClick={() =>
                  document
                    .getElementById("builder")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
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
                  <h3 className="text-xl font-medium mb-6">
                    Enter Your Information
                  </h3>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Name
                        </label>
                        <Input
                          placeholder="Your full name"
                          className="w-full p-3 bg-white/5 border border-white/10 rounded-md focus:ring-blue-500"
                          {...register("name")}
                        />
                        {errors.name && (
                          <p className="text-red-500 text-sm mt-1">
                            {String(errors.name.message)}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Skills
                        </label>
                        <Input
                          placeholder="React, Next.js, UI/UX Design..."
                          className="w-full p-3 bg-white/5 border border-white/10 rounded-md focus:ring-blue-500"
                          {...register("skills")}
                        />
                        {errors.skills && (
                          <p className="text-red-500 text-sm mt-1">
                            {String(errors.skills.message)}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Professional Bio
                      </label>
                      <Textarea
                        placeholder="Tell us about yourself and your experience..."
                        className="w-full p-3 bg-white/5 border border-white/10 rounded-md h-32 focus:ring-blue-500"
                        {...register("bio")}
                      />
                      {errors.bio && (
                        <p className="text-red-500 text-sm mt-1">
                          {String(errors.bio.message)}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Resume (Optional)
                      </label>
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
                          <svg
                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
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
                    <h3 className="text-xl font-medium">
                      Choose Your Portfolio Design
                    </h3>
                    <button
                      onClick={() => setCurrentStep(1)}
                      className="text-sm text-blue-400 hover:text-blue-300"
                    >
                      ← Back to Editor
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    {isGenerating ? (
                      // Loading state - shows 3 skeleton cards
                      Array(3)
                        .fill(0)
                        .map((_, index) => (
                          <motion.div
                            key={`loading-${index}`}
                            className="glass-effect rounded-lg overflow-hidden"
                          >
                            <div className="h-40 bg-gradient-to-br from-blue-600/30 to-purple-600/30 flex items-center justify-center">
                              <svg
                                className="animate-spin h-10 w-10 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <circle
                                  className="opacity-25"
                                  cx="12"
                                  cy="12"
                                  r="10"
                                  stroke="currentColor"
                                  strokeWidth="4"
                                ></circle>
                                <path
                                  className="opacity-75"
                                  fill="currentColor"
                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                              </svg>
                            </div>
                            <div className="p-4 animate-pulse">
                              <div className="h-4 bg-white/10 rounded w-3/4 mb-2"></div>
                              <div className="h-3 bg-white/10 rounded w-full mb-4"></div>
                              <div className="h-8 bg-white/10 rounded w-full"></div>
                            </div>
                          </motion.div>
                        ))
                    ) : error ? (
                      // Error state
                      <div className="col-span-3 text-center p-6 glass-effect">
                        <p className="text-red-400 mb-4">{error}</p>
                        <Button
                          onClick={() => setCurrentStep(1)}
                          className="bg-white/10 hover:bg-white/20"
                        >
                          Try Again
                        </Button>
                      </div>
                    ) : generatedPortfolios.length > 0 ? (
                      // Display generated portfolios from API
                      generatedPortfolios.map((portfolio) => (
                        <motion.div
                          key={portfolio.id}
                          whileHover={{ scale: 1.03 }}
                          className="glass-effect rounded-lg overflow-hidden"
                        >
                          <div className="h-40 bg-gradient-to-br from-blue-600 to-purple-600 relative">
                            {portfolio.previewImage ? (
                              <img
                                src={portfolio.previewImage}
                                alt={portfolio.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="absolute inset-0 flex items-center justify-center text-lg font-bold">
                                {portfolio.name}
                              </div>
                            )}
                          </div>
                          <div className="p-4">
                            <h4 className="font-medium mb-1">
                              {portfolio.name}
                            </h4>
                            <p className="text-sm opacity-70 mb-4">
                              {portfolio.description}
                            </p>
                            <Link
                              href={`/portfolio/${portfolio.id}`}
                              className="block w-full py-2 bg-white/10 hover:bg-white/20 rounded text-center transition-colors"
                            >
                              View Portfolio
                            </Link>
                          </div>
                        </motion.div>
                      ))
                    ) : (
                      // Fallback to show template options if no generated portfolios yet
                      portfolioOptions.map((portfolio) => (
                        <motion.div
                          key={portfolio.id}
                          whileHover={{ scale: 1.03 }}
                          className="glass-effect rounded-lg overflow-hidden"
                        >
                          <div className="h-40 bg-gradient-to-br from-blue-600 to-purple-600 relative">
                            <div className="absolute inset-0 flex items-center justify-center text-lg font-bold">
                              {portfolio.name}
                            </div>
                          </div>
                          <div className="p-4">
                            <h4 className="font-medium mb-1">
                              {portfolio.name}
                            </h4>
                            <p className="text-sm opacity-70 mb-4">
                              {portfolio.description}
                            </p>
                            <Link
                              href={`/portfolio/${portfolio.id}`}
                              className="block w-full py-2 bg-white/10 hover:bg-white/20 rounded text-center transition-colors"
                            >
                              View Portfolio
                            </Link>
                          </div>
                        </motion.div>
                      ))
                    )}
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
              transition: "all 0.7s cubic-bezier(0.17, 0.55, 0.55, 1) 0.2s",
            }}
          >
            Featured Portfolios
          </motion.h2>

          <motion.p
            className="text-center max-w-2xl mx-auto mb-12 opacity-80"
            style={{
              opacity: featuredInView ? 1 : 0,
              transform: featuredInView ? "none" : "translateY(20px)",
              transition: "all 0.7s cubic-bezier(0.17, 0.55, 0.55, 1) 0.4s",
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
                  <h3 className="text-xl font-semibold mb-2">
                    John's UX Portfolio
                  </h3>
                  <p className="text-sm opacity-70 mb-4">
                    A professional showcase of design work with case studies and
                    process insights.
                  </p>
                  <Link
                    href={`/portfolio/${id}`}
                    className="inline-flex items-center text-blue-400 hover:text-blue-300"
                  >
                    View Portfolio
                    <svg
                      className="w-4 h-4 ml-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      ></path>
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
            <motion.div
              variants={itemVariants}
              className="glass-effect p-6 rounded-xl"
            >
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-500/30 mr-3"></div>
                <div>
                  <h4 className="font-medium">Alex Johnson</h4>
                  <p className="text-sm opacity-70">UX Designer</p>
                </div>
              </div>
              <p className="italic opacity-90">
                "I landed three interviews within a week of sharing my new
                portfolio. The templates are professional and easy to
                customize."
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="glass-effect p-6 rounded-xl"
            >
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-purple-500/30 mr-3"></div>
                <div>
                  <h4 className="font-medium">Maria Garcia</h4>
                  <p className="text-sm opacity-70">Web Developer</p>
                </div>
              </div>
              <p className="italic opacity-90">
                "As a developer, I was skeptical about a no-code portfolio
                builder, but the clean code and performance impressed me. My
                clients love it!"
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="glass-effect p-6 rounded-xl"
            >
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-teal-500/30 mr-3"></div>
                <div>
                  <h4 className="font-medium">Ryan Wilson</h4>
                  <p className="text-sm opacity-70">Freelance Designer</p>
                </div>
              </div>
              <p className="italic opacity-90">
                "The animated elements and responsive design make my work stand
                out. I've received so many compliments on my new portfolio."
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Team Members Section */}
      <section id="team" className="py-16 md:py-24 border-t border-white/10">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-center mb-4 glow-text"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Meet Our Team
          </motion.h2>

          <motion.p
            className="text-center max-w-2xl mx-auto mb-12 opacity-80"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            The brilliant minds behind this portfolio builder platform
          </motion.p>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
          >
            {[
              {
                name: "Shreeteja",
                role: "Full Stack Developer",
                color: "from-blue-500/30 to-cyan-500/30",
                linkedinId: "https://linkedin.com/in/shreeteja172",
                githubId: "https://github.com/shreeteja172",
                image: "https://avatars.githubusercontent.com/u/176574652?v=4",
              },
              {
                name: "Akash",
                role: "UI/UX Designer",
                color: "from-purple-500/30 to-pink-500/30",
                linkedinId: "/",
                githubId: "/",
                image: "",
              },
              {
                name: "Dhanush",
                role: "Backend Engineer",
                color: "from-green-500/30 to-teal-500/30",
                linkedinId: "/",
                githubId: "/",
                image: "",
              },
              {
                name: "Sreeja",
                role: "Project Manager",
                color: "from-orange-500/30 to-red-500/30",
                linkedinId: "/",
                githubId: "/",
                image: "",
              },
            ].map((member, index) => (
              <motion.div
                key={member.name}
                variants={itemVariants}
                className="glass-effect rounded-xl overflow-hidden"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div
                  className={`h-48 bg-gradient-to-br ${member.color} flex items-center justify-center`}
                >
                  <div className="w-24 h-24 rounded-full bg-white/10 flex items-center justify-center text-3xl font-bold">
                    <Image
                      src={member.image}
                      height="200"
                      width="200"
                      alt="image"
                      className="rounded-full"
                    />
                  </div>
                </div>
                <div className="p-5 text-center">
                  <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                  <p className="text-sm opacity-70 mb-3">{member.role}</p>

                  {/* Display GitHub and LinkedIn IDs */}
                  {/* <div className="mb-4 text-xs">
                    <p className="opacity-70 flex items-center justify-center gap-1 mb-1">
                      <Github size={12} /> {member.githubId}
                    </p>
                    <p className="opacity-70 flex items-center justify-center gap-1">
                      <Linkedin size={12} /> {member.linkedinId}
                    </p>
                  </div> */}

                  <div className="flex justify-center gap-4">
                    <a
                      href={member.githubId}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/70 hover:text-white transition-colors"
                    >
                      <img
                        src="/github.png"
                        alt="GitHub"
                        className="w-14 h-8"
                      />
                    </a>
                    <a
                      href={member.linkedinId}
                      rel="noopener noreferrer"
                      className="text-white/70 hover:text-white transition-colors"
                    >
                      <img
                        src="/linkedinnew.png"
                        alt="LinkedIn"
                        className="w-8 h-8"
                      />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4 glow-text">
              Ready to Showcase Your Work?
            </h2>
            <p className="text-lg mb-8 opacity-90">
              Create your professional portfolio in minutes and share it with
              the world
            </p>
            <Button
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-lg px-8 py-5"
              onClick={() =>
                document
                  .getElementById("builder")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Build Your Portfolio
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
