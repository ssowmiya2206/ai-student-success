import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import type { ModelPrediction, SubjectResult } from "@/lib/prediction-models";
import { getGradeLabel, getPerformanceLevel } from "@/lib/prediction-models";

interface Props {
  predictions: ModelPrediction[];
  subjectResults: SubjectResult[];
}

export default function AverageResult({ predictions, subjectResults }: Props) {
  const avgPrediction = predictions.reduce((s, m) => s + m.prediction, 0) / predictions.length;
  const avgSubject = subjectResults.reduce((s, r) => s + r.total, 0) / subjectResults.length;
  const best = predictions.reduce((a, b) => (a.accuracy > b.accuracy ? a : b));
  const perf = getPerformanceLevel(avgPrediction);

  return (
    <Card className="shadow-elevated border-border/50 overflow-hidden">
      <div className="h-2 gradient-primary" />
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Predicted Performance */}
          <div className="text-center space-y-2">
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">AI Predicted Score</p>
            <motion.p
              className="text-5xl font-bold text-foreground font-[Space_Grotesk]"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 180, delay: 0.2 }}
            >
              {avgPrediction.toFixed(1)}%
            </motion.p>
            <p className="text-lg font-semibold text-primary">
              Grade: {getGradeLabel(avgPrediction)}
            </p>
          </div>

          {/* Performance Level */}
          <div className="text-center space-y-2 flex flex-col items-center justify-center">
            <motion.span
              className="text-5xl"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 150, delay: 0.4 }}
            >
              {perf.emoji}
            </motion.span>
            <p className="text-lg font-bold font-[Space_Grotesk]" style={{ color: perf.color }}>
              {perf.label}
            </p>
            <p className="text-[11px] text-muted-foreground">
              Best model: <span className="font-semibold text-foreground">{best.name}</span> ({best.accuracy}%)
            </p>
          </div>

          {/* Current Subject Average */}
          <div className="text-center space-y-2">
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Current Average</p>
            <motion.p
              className="text-5xl font-bold font-[Space_Grotesk]"
              style={{ color: perf.color }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 180, delay: 0.3 }}
            >
              {avgSubject.toFixed(1)}%
            </motion.p>
            <p className="text-lg font-semibold" style={{ color: perf.color }}>
              Grade: {getGradeLabel(avgSubject)}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
