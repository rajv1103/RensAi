import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Quiz from "../_components/quiz";

export default function MockInterviewPage() {
  return (
    <div className="container mx-auto space-y-4 py-6">
      <div className="flex flex-col space-y-2 mx-2">
        <Link href="/interview">
          <Button
            variant="ghost"
            className="p-0 gap-2 text-indigo-400 hover:text-indigo-300"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Interview Prep
          </Button>
        </Link>

        <div>
          <h1 className="text-6xl sm:text-5xl font-bold bg-gradient-to-r from-indigo-400 via-pink-400 to-purple-500 bg-clip-text text-transparent tracking-tight">
            Mock Interview
          </h1>
          <p className="text-muted-foreground mt-2 text-sm md:text-base">
            Test your knowledge with industry-specific questions and insights
          </p>
        </div>
      </div>

      <Quiz />
    </div>
  );
}
