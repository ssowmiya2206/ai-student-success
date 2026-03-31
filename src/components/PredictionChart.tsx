import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import type { ModelPrediction } from "@/lib/prediction-models";

const CHART_COLORS = [
  "hsl(200, 80%, 45%)",
  "hsl(260, 60%, 55%)",
  "hsl(165, 60%, 45%)",
  "hsl(35, 90%, 55%)",
  "hsl(340, 65%, 55%)",
  "hsl(45, 85%, 50%)",
  "hsl(280, 55%, 50%)",
];

interface Props {
  predictions: ModelPrediction[];
}

export default function PredictionChart({ predictions }: Props) {
  const data = predictions.map((m) => ({
    name: m.shortName,
    prediction: m.prediction,
    accuracy: m.accuracy,
  }));

  return (
    <Card className="shadow-card border-border/50">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 font-[Space_Grotesk]">📊 Model Comparison</h3>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={data} margin={{ top: 5, right: 5, bottom: 5, left: -10 }}>
            <XAxis dataKey="name" tick={{ fontSize: 12, fill: "hsl(215, 15%, 50%)" }} />
            <YAxis domain={[0, 100]} tick={{ fontSize: 12, fill: "hsl(215, 15%, 50%)" }} />
            <Tooltip
              contentStyle={{
                background: "hsl(0, 0%, 100%)",
                border: "1px solid hsl(210, 20%, 90%)",
                borderRadius: "8px",
                fontSize: "13px",
              }}
            />
            <Bar dataKey="prediction" name="Predicted Score" radius={[6, 6, 0, 0]}>
              {data.map((_, i) => (
                <Cell key={i} fill={CHART_COLORS[i]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
