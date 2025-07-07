"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useFetch from "@/hooks/use-fetch";
import { onboardingSchema } from "@/app/lib/schema";
import { updateUser } from "@/actions/user";

const OnboardingForm = ({ industries }) => {
  const router = useRouter();
  const [selectedIndustry, setSelectedIndustry] = useState(null);

  const {
    loading: updateLoading,
    fn: updateUserFn,
    data: updateResult,
  } = useFetch(updateUser);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(onboardingSchema),
  });

  const onSubmit = async (values) => {
    const formattedIndustry = `${values.industry}-${values.subIndustry
      .toLowerCase()
      .replace(/ /g, "-")}`;
    try {
      await updateUserFn({ ...values, industry: formattedIndustry });
    } catch (error) {
      console.error("Onboarding error:", error);
    }
  };

  useEffect(() => {
    if (updateResult?.success && !updateLoading) {
      toast.success("Profile completed successfully!");
      router.push("/dashboard");
      router.refresh();
    }
  }, [updateResult, updateLoading]);

  const watchIndustry = watch("industry");

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-background via-slate-900/10 to-background px-4">
      <Card className="w-full max-w-xl border border-white/10 shadow-md backdrop-blur-sm bg-muted/5">
        <CardHeader className="pb-4">
          <CardTitle className="text-3xl md:text-4xl bg-gradient-to-r from-indigo-400 via-pink-400 to-purple-500 bg-clip-text text-transparent font-bold tracking-tight">
            Complete Your Profile
          </CardTitle>
          <CardDescription className="text-muted-foreground text-sm mt-2">
            Select your industry to receive tailored insights and career guidance.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
            {/* Industry Select */}
            <div className="space-y-2">
              <Label htmlFor="industry" className="text-black dark:text-white">Industry</Label>
              <Select
                onValueChange={(value) => {
                  setValue("industry", value);
                  setSelectedIndustry(industries.find((ind) => ind.id === value));
                  setValue("subIndustry", "");
                }}
              >
                <SelectTrigger
                  id="industry"
                  className="bg-white text-black border border-gray-300 rounded-md px-3 py-2
                             dark:bg-zinc-900 dark:text-white dark:border-zinc-700"
                >
                  <SelectValue placeholder="Select an industry" />
                </SelectTrigger>
                <SelectContent
                  className="bg-white text-black border border-gray-300 shadow-xl rounded-md
                             dark:bg-zinc-900 dark:text-white dark:border-zinc-700"
                >
                  <SelectGroup>
                    <SelectLabel className="text-gray-700 dark:text-gray-300">Industries</SelectLabel>
                    {industries.map((ind) => (
                      <SelectItem key={ind.id} value={ind.id}>
                        {ind.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {errors.industry && (
                <p className="text-sm text-red-500">{errors.industry.message}</p>
              )}
            </div>

            {/* Sub-Industry Select */}
            {watchIndustry && (
              <div className="space-y-2">
                <Label htmlFor="subIndustry" className="text-black dark:text-white">Specialization</Label>
                <Select onValueChange={(value) => setValue("subIndustry", value)}>
                  <SelectTrigger
                    id="subIndustry"
                    className="bg-white text-black border border-gray-300 rounded-md px-3 py-2
                               dark:bg-zinc-900 dark:text-white dark:border-zinc-700"
                  >
                    <SelectValue placeholder="Select your specialization" />
                  </SelectTrigger>
                  <SelectContent
                    className="bg-white text-black border border-gray-300 shadow-xl rounded-md
                               dark:bg-zinc-900 dark:text-white dark:border-zinc-700"
                  >
                    <SelectGroup>
                      <SelectLabel className="text-gray-700 dark:text-gray-300">Specializations</SelectLabel>
                      {selectedIndustry?.subIndustries.map((sub) => (
                        <SelectItem key={sub} value={sub}>
                          {sub}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {errors.subIndustry && (
                  <p className="text-sm text-red-500">{errors.subIndustry.message}</p>
                )}
              </div>
            )}

            {/* Experience Input */}
            <div className="space-y-2">
              <Label htmlFor="experience" className="text-black dark:text-white">Years of Experience</Label>
              <Input
                id="experience"
                type="number"
                min="0"
                max="50"
                placeholder="Enter number of years"
                {...register("experience")}
                className="bg-white text-black border border-gray-300
                           dark:bg-zinc-900 dark:text-white dark:border-zinc-700"
              />
              {errors.experience && (
                <p className="text-sm text-red-500">{errors.experience.message}</p>
              )}
            </div>

            {/* Skills Input */}
            <div className="space-y-2">
              <Label htmlFor="skills" className="text-black dark:text-white">Skills</Label>
              <Input
                id="skills"
                placeholder="e.g., TypeScript, UX Design, Leadership"
                {...register("skills")}
                className="bg-white text-black border border-gray-300
                           dark:bg-zinc-900 dark:text-white dark:border-zinc-700"
              />
              <p className="text-xs text-muted-foreground">
                Separate multiple skills with commas
              </p>
              {errors.skills && (
                <p className="text-sm text-red-500">{errors.skills.message}</p>
              )}
            </div>

            {/* Bio Input */}
            <div className="space-y-2">
              <Label htmlFor="bio" className="text-black dark:text-white">Professional Bio</Label>
              <Textarea
                id="bio"
                placeholder="Briefly describe your background, strengths, and goals..."
                className="h-32 bg-white text-black border border-gray-300
                           dark:bg-zinc-900 dark:text-white dark:border-zinc-700"
                {...register("bio")}
              />
              {errors.bio && (
                <p className="text-sm text-red-500">{errors.bio.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={updateLoading}
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:brightness-110 transition"
            >
              {updateLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Complete Profile"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default OnboardingForm;
