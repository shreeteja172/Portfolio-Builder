"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { getPortfolioById, GeneratedPortfolio } from "@/services/api";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import { toast } from "react-hot-toast";

export default function PortfolioPage() {
  const params = useParams();
  const id = params?.id as string;

  const [portfolio, setPortfolio] = useState<GeneratedPortfolio | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        setIsLoading(true);
        const data = await getPortfolioById(id);
        setPortfolio(data);
        toast.success("Portfolio loaded successfully!");
      } catch (err) {
        console.error("Error fetching portfolio:", err);
        setError("Failed to load portfolio. Please try again.");
        toast.error("Failed to load portfolio");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPortfolio();
  }, [id]);

  const handleDownload = () => {
    toast.success("Portfolio download started!");
    // In a real implementation, this would generate and download the portfolio
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4">
            <svg
              className="animate-spin w-full h-full text-blue-500"
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
          <p>Loading your portfolio...</p>
        </div>
      </div>
    );
  }

  if (error || !portfolio) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center glass-effect p-8 rounded-xl max-w-md">
          <h2 className="text-2xl font-bold mb-4">Error</h2>
          <p className="mb-6 text-red-400">{error || "Portfolio not found"}</p>
          <Link href="/">
            <Button>Return to Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  // For now, render a basic portfolio based on template ID
  return (
    <div className="min-h-screen">
      <main className="pt-24 pb-16 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-5xl mx-auto glass-effect p-8 rounded-xl"
        >
          <h1 className="text-4xl font-bold mb-6">{portfolio.name}</h1>
          <p className="mb-8 text-lg">{portfolio.description}</p>

          <div className="mb-8 p-6 bg-white/5 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Portfolio Details</h2>
            <p>Template ID: {portfolio.templateId}</p>
            <p>Portfolio ID: {portfolio.id}</p>
          </div>

          <div className="flex justify-end">
            <Button
              onClick={handleDownload}
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
            >
              Download Portfolio
            </Button>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
