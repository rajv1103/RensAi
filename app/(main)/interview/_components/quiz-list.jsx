"use client";

import { useState } from "react";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import QuizResult from "./quiz-result";

export default function QuizList({ assessments }) {
  const router = useRouter();
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  return (
    <>
      <Card className="bg-gradient-to-br from-background via-slate-950/10 to-background border border-white/5 shadow-md shadow-black/10 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <CardTitle className="text-3xl md:text-4xl bg-gradient-to-r from-indigo-400 via-pink-400 to-purple-500 bg-clip-text text-transparent tracking-tight">
                Recent Quizzes
              </CardTitle>
              <CardDescription className="text-gray-400">
                Review your past quiz performance
              </CardDescription>
            </div>
            <Button
              onClick={() => router.push("/interview/mock")}
              className="bg-indigo-500 hover:bg-indigo-600 transition-colors"
            >
              Start New Quiz
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {assessments?.map((assessment, i) => (
              <Card
                key={assessment.id}
                onClick={() => setSelectedQuiz(assessment)}
                className="cursor-pointer bg-white/5 border border-white/10 hover:border-indigo-400 hover:bg-white/10 transition-all duration-300 rounded-xl"
              >
                <CardHeader className="space-y-2">
                  <CardTitle className="text-2xl bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500">
                    Quiz {i + 1}
                  </CardTitle>
                  <CardDescription className="flex justify-between text-sm text-gray-300">
                    <span>Score: {assessment.quizScore.toFixed(1)}%</span>
                    <span>
                      {format(
                        new Date(assessment.createdAt),
                        "MMMM dd, yyyy HH:mm"
                      )}
                    </span>
                  </CardDescription>
                </CardHeader>
                {assessment.improvementTip && (
                  <CardContent className="pt-0">
                    <p className="text-sm text-muted-foreground italic">
                      {assessment.improvementTip}
                    </p>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Dialog open={!!selectedQuiz} onOpenChange={() => setSelectedQuiz(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-background/90 backdrop-blur border border-white/10 shadow-xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-indigo-300">
              Quiz Details
            </DialogTitle>
          </DialogHeader>
          <QuizResult
            result={selectedQuiz}
            hideStartNew
            onStartNew={() => router.push("/interview/mock")}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
