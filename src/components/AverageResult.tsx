import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import type { ModelPrediction } from "@/lib/prediction-models";
import { getGradeLabel } from "@/lib/prediction-models";

interface Props {
  predictions: ModelPrediction[];
}

export default function AverageResult({ predictions }: Props) {
  const avg = predictions.reduce((s, m) => s + m.prediction, 0) / predictions.length;
  const best = predictions.reduce((a, b) => (a.accuracy > b.accuracy ? a : b));

  return (
    <Card className="shadow-elevated border-border/50 overflow-hidden">
      <div className="h-1.5 gradient-primary" />
      <CardContent className="p-6 text-center space-y-3">
        <p className="text-sm text-muted-foreground font-medium">Ensemble Average Prediction</p>
        <motion.p
          className="text-5xl font-bold text-foreground font-[Space_Grotesk]"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 180, delay: 0.2 }}
        >
          {avg.toFixed(1)}%
        </motion.p>
        <p className="text-lg font-semibold text-primary">
          Expected Grade: {getGradeLabel(avg)}
        </p>
        <p className="text-xs text-muted-foreground">
          Most reliable model: <span className="font-semibold text-foreground">{best.name}</span> ({best.accuracy}% accuracy)
        </p>
      </CardContent>
    </Card>
  );
}
