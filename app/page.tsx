"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  bio: z.string().min(10, "Bio should be at least 10 characters"),
  skills: z.string().min(5, "Enter at least one skill"),
  resume: z.any().optional(),
});

export default function Home() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  const [generatedPortfolios, setGeneratedPortfolios] = useState<string[]>([]);

  const onSubmit = (data: any) => {
    console.log("Generating portfolios for:", data);
    
    // Use portfolio template IDs instead of names
    setGeneratedPortfolios(["1", "2", "3"]); 
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-100 dark:bg-gray-900">
      <motion.div 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="w-full max-w-2xl bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
      >
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Personal Portfolio Generator</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input label="Name" {...register("name")} error={errors.name?.message} />
          <Textarea label="Bio" {...register("bio")} error={errors.bio?.message} />
          <Input label="Skills (comma separated)" {...register("skills")} error={errors.skills?.message} />
          <Input type="file" label="Upload Resume (Optional)" {...register("resume")} />
          <Button type="submit" className="w-full">Generate Portfolio</Button>
        </form>

        {generatedPortfolios.length > 0 && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Select a Portfolio</h2>
            <div className="grid grid-cols-2 gap-4 mt-4">
              {generatedPortfolios.map((id) => (
                <a 
                  key={id} 
                  href={`/portfolio/${id}`} 
                  className="p-4 bg-gray-200 dark:bg-gray-700 rounded-lg text-center block"
                >
                  View Portfolio {id}
                </a>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
