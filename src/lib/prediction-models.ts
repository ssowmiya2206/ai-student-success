export interface StudentData {
  studyHours: number;
  attendance: number;
  previousGrade: number;
  assignments: number;
  extracurricular: number;
  sleepHours: number;
  parentEducation: number;
}

export interface ModelPrediction {
  id: string;
  name: string;
  shortName: string;
  accuracy: number;
  prediction: number;
  confidence: number;
  color: string;
  icon: string;
}

const clamp = (v: number) => Math.min(100, Math.max(0, Math.round(v * 10) / 10));

// Simulated ML models with different prediction strategies
export function runPredictions(data: StudentData): ModelPrediction[] {
  const { studyHours, attendance, previousGrade, assignments, extracurricular, sleepHours, parentEducation } = data;

  const base = (studyHours * 3.2 + attendance * 0.35 + previousGrade * 0.4 + assignments * 0.25 + extracurricular * 1.5 + sleepHours * 1.8 + parentEducation * 2);

  return [
    {
      id: "lr",
      name: "Linear Regression",
      shortName: "LR",
      accuracy: 82.4,
      prediction: clamp(base * 0.38 + 12),
      confidence: 78 + Math.random() * 12,
      color: "hsl(var(--chart-1))",
      icon: "📈",
    },
    {
      id: "dt",
      name: "Decision Tree",
      shortName: "DT",
      accuracy: 79.1,
      prediction: clamp(base * 0.36 + 15 + (studyHours > 5 ? 8 : -3)),
      confidence: 72 + Math.random() * 15,
      color: "hsl(var(--chart-2))",
      icon: "🌳",
    },
    {
      id: "rf",
      name: "Random Forest",
      shortName: "RF",
      accuracy: 88.7,
      prediction: clamp(base * 0.37 + 14 + (attendance > 80 ? 5 : -2)),
      confidence: 82 + Math.random() * 10,
      color: "hsl(var(--chart-3))",
      icon: "🌲",
    },
    {
      id: "svm",
      name: "Support Vector Machine",
      shortName: "SVM",
      accuracy: 85.3,
      prediction: clamp(base * 0.39 + 10),
      confidence: 80 + Math.random() * 11,
      color: "hsl(var(--chart-4))",
      icon: "⚡",
    },
    {
      id: "knn",
      name: "K-Nearest Neighbors",
      shortName: "KNN",
      accuracy: 76.8,
      prediction: clamp(base * 0.35 + 18 + (sleepHours > 7 ? 4 : -4)),
      confidence: 70 + Math.random() * 14,
      color: "hsl(var(--chart-5))",
      icon: "🎯",
    },
    {
      id: "nn",
      name: "Neural Network",
      shortName: "NN",
      accuracy: 91.2,
      prediction: clamp(base * 0.40 + 8 + (assignments > 80 ? 6 : 0)),
      confidence: 85 + Math.random() * 10,
      color: "hsl(var(--chart-6))",
      icon: "🧠",
    },
    {
      id: "gb",
      name: "Gradient Boosting",
      shortName: "GB",
      accuracy: 90.5,
      prediction: clamp(base * 0.385 + 11 + (previousGrade > 70 ? 5 : -1)),
      confidence: 84 + Math.random() * 10,
      color: "hsl(var(--chart-7))",
      icon: "🚀",
    },
  ];
}

export function getGradeLabel(score: number): string {
  if (score >= 90) return "A+";
  if (score >= 80) return "A";
  if (score >= 70) return "B";
  if (score >= 60) return "C";
  if (score >= 50) return "D";
  return "F";
}

export function getGradeColor(score: number): string {
  if (score >= 80) return "hsl(var(--accent))";
  if (score >= 60) return "hsl(var(--chart-4))";
  return "hsl(var(--destructive))";
}
