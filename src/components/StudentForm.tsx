import { useState } from "react";
import { motion } from "framer-motion";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { StudentData } from "@/lib/prediction-models";

interface Props {
  onPredict: (data: StudentData) => void;
  isLoading: boolean;
}

const fields: { key: keyof StudentData; label: string; icon: string; max: number; unit: string }[] = [
  { key: "studyHours", label: "Daily Study Hours", icon: "📚", max: 12, unit: "hrs" },
  { key: "attendance", label: "Attendance Rate", icon: "✅", max: 100, unit: "%" },
  { key: "previousGrade", label: "Previous Grade", icon: "📝", max: 100, unit: "%" },
  { key: "assignments", label: "Assignment Completion", icon: "📋", max: 100, unit: "%" },
  { key: "extracurricular", label: "Extracurricular Activities", icon: "🏆", max: 10, unit: "" },
  { key: "sleepHours", label: "Sleep Hours", icon: "😴", max: 12, unit: "hrs" },
  { key: "parentEducation", label: "Parent Education Level", icon: "🎓", max: 10, unit: "/10" },
];

const defaults: StudentData = {
  studyHours: 5,
  attendance: 80,
  previousGrade: 72,
  assignments: 75,
  extracurricular: 3,
  sleepHours: 7,
  parentEducation: 6,
};

export default function StudentForm({ onPredict, isLoading }: Props) {
  const [data, setData] = useState<StudentData>(defaults);

  const update = (key: keyof StudentData, val: number) =>
    setData((prev) => ({ ...prev, [key]: val }));

  return (
    <Card className="shadow-card border-border/50">
      <CardContent className="p-6 space-y-5">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center text-sm">📊</div>
          <h2 className="text-lg font-semibold text-foreground font-[Space_Grotesk]">Student Input Data</h2>
        </div>

        {fields.map((f, i) => (
          <motion.div
            key={f.key}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className="space-y-2"
          >
            <div className="flex justify-between items-center">
              <label className="text-sm text-muted-foreground flex items-center gap-1.5">
                <span>{f.icon}</span> {f.label}
              </label>
              <span className="text-sm font-semibold text-foreground tabular-nums">
                {data[f.key]}{f.unit}
              </span>
            </div>
            <Slider
              value={[data[f.key]]}
              max={f.max}
              step={f.max > 12 ? 1 : 0.5}
              onValueChange={([v]) => update(f.key, v)}
              className="cursor-pointer"
            />
          </motion.div>
        ))}

        <Button
          onClick={() => onPredict(data)}
          disabled={isLoading}
          className="w-full gradient-primary text-primary-foreground hover:opacity-90 transition-opacity font-semibold h-11 mt-2"
        >
          {isLoading ? "Analyzing..." : "🔮 Run Prediction Models"}
        </Button>
      </CardContent>
    </Card>
  );
}
