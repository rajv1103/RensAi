"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import useFetch from "@/hooks/use-fetch";
import { generateCoverLetter } from "@/actions/cover-letter";
import { coverLetterSchema } from "@/app/lib/schema";

export default function CoverLetterGenerator() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(coverLetterSchema),
  });

  const {
    loading: generating,
    fn: generateLetterFn,
    data: generatedLetter,
  } = useFetch(generateCoverLetter);

  useEffect(() => {
    if (generatedLetter) {
      toast.success("Cover letter generated successfully!");
      router.push(`/ai-cover-letter/${generatedLetter.id}`);
      reset();
    }
  }, [generatedLetter]);

  const onSubmit = async (data) => {
    try {
      await generateLetterFn(data);
    } catch (error) {
      toast.error(error.message || "Failed to generate cover letter");
    }
  };

  return (
    <div className="space-y-8 px-4 py-8 max-w-3xl mx-auto">
      <Card className="bg-muted/5 border border-white/10 shadow-md backdrop-blur">
        <CardHeader>
          <CardTitle className="text-3xl bg-gradient-to-r from-indigo-400 via-pink-400 to-purple-500 bg-clip-text text-transparent font-bold tracking-tight">
            Job Details
          </CardTitle>
          <CardDescription className="text-muted-foreground mt-2 text-sm">
            Provide context about the position you're applying for
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="companyName" className="text-white">
                  Company Name
                </Label>
                <Input
                  id="companyName"
                  placeholder="e.g., OpenAI"
                  {...register("companyName")}
                  className="bg-white/5 border-white/10 text-white"
                />
                {errors.companyName && (
                  <p className="text-sm text-red-500">
                    {errors.companyName.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="jobTitle" className="text-white">
                  Job Title
                </Label>
                <Input
                  id="jobTitle"
                  placeholder="e.g., Frontend Developer"
                  {...register("jobTitle")}
                  className="bg-white/5 border-white/10 text-white"
                />
                {errors.jobTitle && (
                  <p className="text-sm text-red-500">
                    {errors.jobTitle.message}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="jobDescription" className="text-white">
                Job Description
              </Label>
              <Textarea
                id="jobDescription"
                placeholder="Paste the job description here"
                className="h-40 bg-white/5 border-white/10 text-white"
                {...register("jobDescription")}
              />
              {errors.jobDescription && (
                <p className="text-sm text-red-500">
                  {errors.jobDescription.message}
                </p>
              )}
            </div>

            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={generating}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:brightness-110"
              >
                {generating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  "Generate Cover Letter"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
