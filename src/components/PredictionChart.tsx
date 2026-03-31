import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { ModelPrediction, SubjectResult } from "@/lib/prediction-models";

const CHART_COLORS = [
  "hsl(200, 80%, 45%)", "hsl(260, 60%, 55%)", "hsl(165, 60%, 45%)",
  "hsl(35, 90%, 55%)", "hsl(340, 65%, 55%)", "hsl(45, 85%, 50%)", "hsl(280, 55%, 50%)",
];

interface Props {
  predictions: ModelPrediction[];
  subjectResults: SubjectResult[];
}

export default function PredictionChart({ predictions, subjectResults }: Props) {
  const modelData = predictions.map((m) => ({
    name: m.shortName,
    prediction: m.prediction,
    accuracy: m.accuracy,
  }));

  const radarData = subjectResults.map((r) => ({
    subject: r.name.split(" ")[0],
    score: r.total,
    fullMark: 100,
  }));

  return (
    <Card className="shadow-card border-border/50">
      <CardContent className="p-5">
        <Tabs defaultValue="models">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground font-[Space_Grotesk]">📊 Analytics</h3>
            <TabsList className="bg-muted/50">
              <TabsTrigger value="models" className="text-xs">Models</TabsTrigger>
              <TabsTrigger value="subjects" className="text-xs">Subjects</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="models">
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={modelData} margin={{ top: 5, right: 5, bottom: 5, left: -10 }}>
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: "hsl(215, 15%, 50%)" }} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: "hsl(215, 15%, 50%)" }} />
                <Tooltip
                  contentStyle={{
                    background: "hsl(0, 0%, 100%)",
                    border: "1px solid hsl(210, 20%, 90%)",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                />
                <Bar dataKey="prediction" name="Predicted Score" radius={[6, 6, 0, 0]}>
                  {modelData.map((_, i) => (
                    <Cell key={i} fill={CHART_COLORS[i]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>

          <TabsContent value="subjects">
            <ResponsiveContainer width="100%" height={280}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="hsl(210, 20%, 90%)" />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fill: "hsl(215, 15%, 50%)" }} />
                <PolarRadiusAxis domain={[0, 100]} tick={{ fontSize: 10 }} />
                <Radar name="Score" dataKey="score" stroke="hsl(200, 80%, 45%)" fill="hsl(200, 80%, 45%)" fillOpacity={0.3} />
              </RadarChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
