import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import type { ModelPrediction } from "@/lib/prediction-models";
import { getGradeLabel } from "@/lib/prediction-models";

interface Props {
  model: ModelPrediction;
  index: number;
  isBest: boolean;
}

export default function ModelCard({ model, index, isBest }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: index * 0.08, type: "spring", stiffness: 200 }}
    >
      <Card className={`relative overflow-hidden shadow-card hover:shadow-elevated transition-shadow border-border/50 ${isBest ? "ring-2 ring-accent" : ""}`}>
        {isBest && (
          <div className="absolute top-0 right-0 gradient-accent text-accent-foreground text-[10px] font-bold px-2 py-0.5 rounded-bl-lg">
            BEST
          </div>
        )}
        <CardContent className="p-4 space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-xl">{model.icon}</span>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-foreground truncate font-[Space_Grotesk]">{model.name}</p>
              <p className="text-[11px] text-muted-foreground">Accuracy: {model.accuracy}%</p>
            </div>
          </div>

          <div className="text-center py-2">
            <motion.p
              className="text-3xl font-bold font-[Space_Grotesk]"
              style={{ color: model.color }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.08 + 0.3, type: "spring" }}
            >
              {model.prediction}%
            </motion.p>
            <p className="text-xs text-muted-foreground mt-1">
              Grade: <span className="font-semibold text-foreground">{getGradeLabel(model.prediction)}</span>
            </p>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-[11px]">
              <span className="text-muted-foreground">Confidence</span>
              <span className="text-foreground font-medium">{Math.round(model.confidence)}%</span>
            </div>
            <div className="h-1.5 rounded-full bg-muted overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ background: model.color }}
                initial={{ width: 0 }}
                animate={{ width: `${model.confidence}%` }}
                transition={{ delay: index * 0.08 + 0.4, duration: 0.6 }}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
