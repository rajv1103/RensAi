"use client";

import { Trophy, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export default function QuizResult({
  result,
  hideStartNew = false,
  onStartNew,
}) {
  if (!result) return null;

  return (
    <div className="mx-auto space-y-6">
      {/* Title */}
      <h1 className="flex items-center gap-2 text-3xl md:text-4xl bg-gradient-to-r from-yellow-400 via-amber-300 to-orange-500 bg-clip-text text-transparent font-bold tracking-tight">
        <Trophy className="h-6 w-6 text-yellow-400" />
        Quiz Results
      </h1>

      <CardContent className="space-y-8">
        {/* Score Overview */}
        <div className="text-center space-y-4">
          <h3 className="text-2xl font-bold text-indigo-300">
            {result.quizScore.toFixed(1)}%
          </h3>
          <Progress
            value={result.quizScore}
            className="h-3 rounded-full bg-muted/40"
          />
        </div>

        {/* Improvement Tip */}
        {result.improvementTip && (
          <div className="bg-white/5 border border-white/10 p-4 rounded-lg shadow-sm">
            <p className="font-semibold text-indigo-300">Improvement Tip:</p>
            <p className="text-sm text-muted-foreground mt-1">
              {result.improvementTip}
            </p>
          </div>
        )}

        {/* Questions Review */}
        <div className="space-y-6">
          <h3 className="font-medium text-lg text-white/90">
            Question Review
          </h3>
          {result.questions.map((q, index) => (
            <div
              key={index}
              className="border border-white/10 rounded-lg p-4 space-y-2 bg-muted/10 hover:shadow transition-all"
            >
              <div className="flex items-start justify-between gap-2">
                <p className="font-medium text-white">{q.question}</p>
                {q.isCorrect ? (
                  <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                )}
              </div>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>
                  <span className="font-medium">Your answer:</span>{" "}
                  {q.userAnswer}
                </p>
                {!q.isCorrect && (
                  <p>
                    <span className="font-medium">Correct answer:</span>{" "}
                    {q.answer}
                  </p>
                )}
              </div>
              <div className="text-sm bg-muted p-3 rounded-md border border-white/10">
                <p className="font-medium text-indigo-300">Explanation:</p>
                <p>{q.explanation}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>

      {!hideStartNew && (
        <CardFooter>
          <Button
            onClick={onStartNew}
            className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 hover:brightness-110 transition"
          >
            Start New Quiz
          </Button>
        </CardFooter>
      )}
    </div>
  );
}
