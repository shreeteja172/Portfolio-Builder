"use client";

import { useParams } from "next/navigation";
import { downloadPortfolio } from "@/utils/download";
import { motion } from "framer-motion";

// Define the type for portfolio templates
interface PortfolioTemplate {
  name: string;
  component: React.FC; // Function component returning JSX
}

// Portfolio templates object with proper types
const portfolioTemplates: Record<string, PortfolioTemplate> = {
  "1": {
    name: "Minimalist Portfolio",
    component: () => (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 p-10 rounded-lg shadow-xl text-center"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">John Doe</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">Software Engineer | Web Developer</p>
          <div className="mt-4">
            <p className="text-gray-700 dark:text-gray-300">Skills: React, Next.js, Tailwind CSS</p>
          </div>
        </motion.div>
      </div>
    ),
  },
  "2": {
    name: "Creative Portfolio",
    component: () => (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-800 text-white">
        {/* Header */}
        <motion.header 
          className="py-12 px-6 md:px-12 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-2">Jane Smith</h1>
          <p className="text-xl text-purple-200">Full-Stack Developer & UX Designer</p>
        </motion.header>
        
        {/* About */}
        <motion.section 
          className="max-w-4xl mx-auto px-6 py-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-6 text-purple-200">About Me</h2>
          <p className="text-lg">
            Passionate about creating beautiful, functional, and user-friendly applications.
            With expertise in modern web technologies and a keen eye for design, I build
            digital experiences that delight users and solve real problems.
          </p>
        </motion.section>
        
        {/* Projects */}
        <motion.section 
          className="max-w-4xl mx-auto px-6 py-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-6 text-purple-200">Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
              <h3 className="text-xl font-bold">E-commerce Platform</h3>
              <p className="mt-2">A full-featured online store with React, Next.js and Stripe integration.</p>
            </div>
            <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
              <h3 className="text-xl font-bold">Task Management App</h3>
              <p className="mt-2">A productivity tool built with React and Firebase.</p>
            </div>
          </div>
        </motion.section>
        
        {/* Contact */}
        <motion.section 
          className="max-w-4xl mx-auto px-6 py-12 mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-6 text-purple-200">Contact</h2>
          <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
            <div className="flex justify-center space-x-6">
              <a href="#" className="hover:text-purple-300 transition">GitHub</a>
              <a href="#" className="hover:text-purple-300 transition">LinkedIn</a>
              <a href="#" className="hover:text-purple-300 transition">Email</a>
              <a href="#" className="hover:text-purple-300 transition">Twitter</a>
            </div>
          </div>
        </motion.section>
      </div>
    ),
  },
};

export default function PortfolioPage() {
  const params = useParams();
  const id = params?.id as string;

  // If the portfolio ID doesn't exist, show an error message
  if (!id || !portfolioTemplates[id]) {
    return <p className="text-center text-red-500">Portfolio Not Found</p>;
  }

  // Get the correct portfolio component
  const PortfolioComponent = portfolioTemplates[id].component;

  const handleDownload = () => {
    if (typeof window !== "undefined") {
      const htmlContent = document.documentElement.outerHTML;
      downloadPortfolio(htmlContent, `portfolio_${id}`);
    }
  };

  return (
    <div>
      <PortfolioComponent />
      <button
        onClick={handleDownload}
        className="fixed bottom-5 right-5 bg-blue-500 text-white px-4 py-2 rounded-md shadow-lg hover:bg-blue-600 transition"
      >
        Download Portfolio
      </button>
    </div>
  );
}