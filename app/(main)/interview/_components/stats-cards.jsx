import { Brain, Target, Trophy } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function StatsCards({ assessments }) {
  const getAverageScore = () => {
    if (!assessments?.length) return 0;
    const total = assessments.reduce((sum, a) => sum + a.quizScore, 0);
    return (total / assessments.length).toFixed(1);
  };

  const getLatestAssessment = () => assessments?.[0] || null;

  const getTotalQuestions = () =>
    assessments?.reduce((sum, a) => sum + a.questions.length, 0) || 0;

  const statCards = [
    {
      title: "Average Score",
      value: `${getAverageScore()}%`,
      icon: <Trophy className="h-5 w-5 text-yellow-400" />,
      subtitle: "Across all assessments",
      gradient: "from-yellow-400/10 to-amber-500/10",
    },
    {
      title: "Questions Practiced",
      value: getTotalQuestions(),
      icon: <Brain className="h-5 w-5 text-sky-400" />,
      subtitle: "Total questions",
      gradient: "from-sky-400/10 to-cyan-600/10",
    },
    {
      title: "Latest Score",
      value: `${getLatestAssessment()?.quizScore.toFixed(1) || 0}%`,
      icon: <Target className="h-5 w-5 text-emerald-400" />,
      subtitle: "Most recent quiz",
      gradient: "from-emerald-400/10 to-lime-500/10",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {statCards.map((card, idx) => (
        <Card
          key={idx}
          className={`bg-gradient-to-br ${card.gradient} border border-white/5 shadow-sm hover:shadow-lg transition duration-300`}
        >
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-white/90">
              {card.title}
            </CardTitle>
            {card.icon}
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">{card.value}</div>
            <p className="text-xs text-gray-400 mt-1">{card.subtitle}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
