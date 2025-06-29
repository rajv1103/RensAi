"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { generateQuiz, saveQuizResult } from "@/actions/interview";
import QuizResult from "./quiz-result";
import useFetch from "@/hooks/use-fetch";
import { BarLoader } from "react-spinners";

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showExplanation, setShowExplanation] = useState(false);

  const {
    loading: generatingQuiz,
    fn: generateQuizFn,
    data: quizData,
  } = useFetch(generateQuiz);

  const {
    loading: savingResult,
    fn: saveQuizResultFn,
    data: resultData,
    setData: setResultData,
  } = useFetch(saveQuizResult);

  useEffect(() => {
    if (quizData) {
      setAnswers(new Array(quizData.length).fill(null));
    }
  }, [quizData]);

  const handleAnswer = (answer) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answer;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setShowExplanation(false);
    } else {
      finishQuiz();
    }
  };

  const calculateScore = () => {
    const correct = answers.filter(
      (answer, idx) => answer === quizData[idx].correctAnswer
    ).length;
    return (correct / quizData.length) * 100;
  };

  const finishQuiz = async () => {
    const score = calculateScore();
    try {
      await saveQuizResultFn(quizData, answers, score);
      toast.success("Quiz completed!");
    } catch (error) {
      toast.error(error.message || "Failed to save quiz results");
    }
  };

  const startNewQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowExplanation(false);
    generateQuizFn();
    setResultData(null);
  };

  if (generatingQuiz) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <BarLoader width={"100%"} color="gray" />
      </div>
    );
  }

  if (resultData) {
    return (
      <div className="mx-2">
        <QuizResult result={resultData} onStartNew={startNewQuiz} />
      </div>
    );
  }

  if (!quizData) {
    return (
      <Card className="mx-2 bg-gradient-to-br from-background via-slate-900/10 to-background border border-white/5 shadow">
        <CardHeader>
          <CardTitle className="text-3xl bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent font-bold">
            Ready to test your knowledge?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm leading-relaxed">
            This quiz includes 10 questions tailored to your skillset. Take your
            time and choose the best answer.
          </p>
        </CardContent>
        <CardFooter>
          <Button
            onClick={generateQuizFn}
            className=" bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-md hover:brightness-110 transition-all"
          >
            Start Quiz
          </Button>
        </CardFooter>
      </Card>
    );
  }

  const question = quizData[currentQuestion];

  return (
    <Card className="mx-2 bg-muted/5 border border-white/10 backdrop-blur shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl md:text-2xl tracking-tight text-white">
          Question {currentQuestion + 1} of {quizData.length}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="text-lg font-medium text-white">{question.question}</p>
        <RadioGroup
          onValueChange={handleAnswer}
          value={answers[currentQuestion]}
          className="space-y-3"
        >
          {question.options.map((option, index) => (
            <div
              key={index}
              className="flex items-center space-x-3 p-2 rounded-lg bg-white/5 hover:bg-white/10 transition"
            >
              <RadioGroupItem value={option} id={`option-${index}`} />
              <Label
                htmlFor={`option-${index}`}
                className="text-white text-sm cursor-pointer"
              >
                {option}
              </Label>
            </div>
          ))}
        </RadioGroup>

        {showExplanation && (
          <div className="mt-4 p-4 rounded-lg bg-muted/20 border border-white/10 text-sm text-gray-300">
            <p className="font-medium text-indigo-300 mb-1">Explanation:</p>
            <p>{question.explanation}</p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between pt-6">
        {!showExplanation && (
          <Button
            onClick={() => setShowExplanation(true)}
            variant="outline"
            disabled={!answers[currentQuestion]}
            className="border-white/20 hover:border-indigo-500"
          >
            Show Explanation
          </Button>
        )}
        <Button
          onClick={handleNext}
          disabled={!answers[currentQuestion] || savingResult}
          className="ml-auto bg-gradient-to-r from-purple-500 to-indigo-600 hover:brightness-110"
        >
          {savingResult ? (
            <BarLoader width={80} height={4} color="white" />
          ) : currentQuestion < quizData.length - 1 ? (
            "Next Question"
          ) : (
            "Finish Quiz"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
