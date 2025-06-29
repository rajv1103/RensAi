"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import { format } from "date-fns";

export default function PerformanceChart({ assessments }) {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (assessments) {
      const formattedData = assessments.map((assessment) => ({
        date: format(new Date(assessment.createdAt), "MMM dd"),
        score: assessment.quizScore,
      }));
      setChartData(formattedData);
    }
  }, [assessments]);

  return (
    <Card className="bg-gradient-to-br from-background via-slate-950/20 to-background border border-white/5 shadow-xl shadow-black/10 backdrop-blur-md">
      <CardHeader>
        <CardTitle className="text-3xl md:text-4xl bg-gradient-to-r from-indigo-400 via-pink-400 to-purple-500 bg-clip-text text-transparent tracking-tight">
          Performance Trend
        </CardTitle>
        <CardDescription className="text-gray-400">
          Your quiz scores over time
        </CardDescription>
      </CardHeader>
      <CardContent className="relative">
        <div className="h-[300px] rounded-xl overflow-hidden ring-1 ring-white/10 shadow-inner">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="4 4" stroke="rgba(255,255,255,0.05)" />
              <XAxis
                dataKey="date"
                tick={{ fill: "#cbd5e1", fontSize: 12 }}
                axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
                tickLine={false}
              />
              <YAxis
                domain={[0, 100]}
                tick={{ fill: "#cbd5e1", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload?.length) {
                    return (
                      <div className="bg-slate-800/80 text-white border border-slate-700 rounded-lg p-2 shadow-lg backdrop-blur-md">
                        <p className="text-sm font-medium">
                          Score: {payload[0].value}%
                        </p>
                        <p className="text-xs opacity-75">
                          {payload[0].payload.date}
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Line
                type="monotone"
                dataKey="score"
                stroke="#a78bfa"
                strokeWidth={3}
                dot={{ stroke: "#a78bfa", strokeWidth: 2, r: 3 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
