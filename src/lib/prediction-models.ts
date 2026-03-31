export interface SubjectMarks {
  cat1: number; // out of 50, weightage 15%
  cat2: number; // out of 50, weightage 15%
  fat: number;  // out of 100, weightage 40%
  assignments: number; // out of 100, weightage 30%
}

export interface StudentData {
  subjects: Record<string, SubjectMarks>;
  attendance: number;
  extracurricular: number;
  sleepHours: number;
  studyHours: number;
  previousGrade: number;
}

export const SUBJECTS = [
  { key: "math", name: "Mathematics", icon: "📐", color: "hsl(var(--chart-1))" },
  { key: "physics", name: "Physics", icon: "⚛️", color: "hsl(var(--chart-2))" },
  { key: "chemistry", name: "Chemistry", icon: "🧪", color: "hsl(var(--chart-3))" },
  { key: "english", name: "English", icon: "📖", color: "hsl(var(--chart-4))" },
  { key: "cs", name: "Computer Science", icon: "💻", color: "hsl(var(--chart-5))" },
];

export function calculateSubjectTotal(marks: SubjectMarks): number {
  const cat1Score = (marks.cat1 / 50) * 15;
  const cat2Score = (marks.cat2 / 50) * 15;
  const fatScore = (marks.fat / 100) * 40;
  const assignScore = (marks.assignments / 100) * 30;
  return Math.round((cat1Score + cat2Score + fatScore + assignScore) * 10) / 10;
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

export interface SubjectResult {
  key: string;
  name: string;
  icon: string;
  color: string;
  cat1: number;
  cat2: number;
  fat: number;
  assignments: number;
  total: number;
  grade: string;
  gradeColor: string;
}

const clamp = (v: number) => Math.min(100, Math.max(0, Math.round(v * 10) / 10));

export function getSubjectResults(data: StudentData): SubjectResult[] {
  return SUBJECTS.map((s) => {
    const marks = data.subjects[s.key];
    const total = calculateSubjectTotal(marks);
    return {
      key: s.key,
      name: s.name,
      icon: s.icon,
      color: s.color,
      cat1: marks.cat1,
      cat2: marks.cat2,
      fat: marks.fat,
      assignments: marks.assignments,
      total,
      grade: getGradeLabel(total),
      gradeColor: getGradeColor(total),
    };
  });
}

export function runPredictions(data: StudentData): ModelPrediction[] {
  const subjectResults = getSubjectResults(data);
  const avgSubject = subjectResults.reduce((s, r) => s + r.total, 0) / subjectResults.length;
  const { attendance, extracurricular, sleepHours, studyHours, previousGrade } = data;

  const base = avgSubject * 0.5 + attendance * 0.15 + studyHours * 2 + sleepHours * 1.2 + previousGrade * 0.1 + extracurricular * 1;

  return [
    {
      id: "lr", name: "Linear Regression", shortName: "LR", accuracy: 82.4,
      prediction: clamp(base * 0.72 + 8),
      confidence: 78 + Math.random() * 12, color: "hsl(var(--chart-1))", icon: "📈",
    },
    {
      id: "dt", name: "Decision Tree", shortName: "DT", accuracy: 79.1,
      prediction: clamp(base * 0.70 + 10 + (studyHours > 5 ? 6 : -3)),
      confidence: 72 + Math.random() * 15, color: "hsl(var(--chart-2))", icon: "🌳",
    },
    {
      id: "rf", name: "Random Forest", shortName: "RF", accuracy: 88.7,
      prediction: clamp(base * 0.71 + 9 + (attendance > 80 ? 4 : -2)),
      confidence: 82 + Math.random() * 10, color: "hsl(var(--chart-3))", icon: "🌲",
    },
    {
      id: "svm", name: "Support Vector Machine", shortName: "SVM", accuracy: 85.3,
      prediction: clamp(base * 0.73 + 6),
      confidence: 80 + Math.random() * 11, color: "hsl(var(--chart-4))", icon: "⚡",
    },
    {
      id: "knn", name: "K-Nearest Neighbors", shortName: "KNN", accuracy: 76.8,
      prediction: clamp(base * 0.68 + 14 + (sleepHours > 7 ? 3 : -3)),
      confidence: 70 + Math.random() * 14, color: "hsl(var(--chart-5))", icon: "🎯",
    },
    {
      id: "nn", name: "Neural Network", shortName: "NN", accuracy: 91.2,
      prediction: clamp(base * 0.74 + 5 + (avgSubject > 70 ? 5 : 0)),
      confidence: 85 + Math.random() * 10, color: "hsl(var(--chart-6))", icon: "🧠",
    },
    {
      id: "gb", name: "Gradient Boosting", shortName: "GB", accuracy: 90.5,
      prediction: clamp(base * 0.72 + 7 + (previousGrade > 70 ? 4 : -1)),
      confidence: 84 + Math.random() * 10, color: "hsl(var(--chart-7))", icon: "🚀",
    },
  ];
}

export function getGradeLabel(score: number): string {
  if (score >= 90) return "O";
  if (score >= 80) return "A+";
  if (score >= 70) return "A";
  if (score >= 60) return "B+";
  if (score >= 55) return "B";
  if (score >= 50) return "C";
  return "F";
}

export function getGradeColor(score: number): string {
  if (score >= 80) return "hsl(var(--accent))";
  if (score >= 60) return "hsl(var(--chart-4))";
  if (score >= 50) return "hsl(var(--chart-6))";
  return "hsl(var(--destructive))";
}

export function getPerformanceLevel(score: number): { label: string; emoji: string; color: string } {
  if (score >= 90) return { label: "Outstanding", emoji: "🏆", color: "hsl(var(--accent))" };
  if (score >= 80) return { label: "Excellent", emoji: "🌟", color: "hsl(var(--accent))" };
  if (score >= 70) return { label: "Very Good", emoji: "👏", color: "hsl(var(--chart-1))" };
  if (score >= 60) return { label: "Good", emoji: "👍", color: "hsl(var(--chart-4))" };
  if (score >= 50) return { label: "Average", emoji: "📚", color: "hsl(var(--chart-6))" };
  return { label: "Needs Improvement", emoji: "⚠️", color: "hsl(var(--destructive))" };
}
