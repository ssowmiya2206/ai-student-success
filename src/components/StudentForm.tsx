import { useState } from "react";
import { motion } from "framer-motion";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SUBJECTS, type StudentData, type SubjectMarks } from "@/lib/prediction-models";

interface Props {
  onPredict: (data: StudentData) => void;
  isLoading: boolean;
}

const defaultMarks: SubjectMarks = { cat1: 30, cat2: 28, fat: 60, assignments: 70 };

const defaultData: StudentData = {
  subjects: Object.fromEntries(SUBJECTS.map((s) => [s.key, { ...defaultMarks }])),
  attendance: 80,
  extracurricular: 3,
  sleepHours: 7,
  studyHours: 5,
  previousGrade: 72,
};

const markFields: { key: keyof SubjectMarks; label: string; max: number; weight: string }[] = [
  { key: "cat1", label: "CAT-1", max: 50, weight: "15%" },
  { key: "cat2", label: "CAT-2", max: 50, weight: "15%" },
  { key: "fat", label: "FAT", max: 100, weight: "40%" },
  { key: "assignments", label: "Assignments", max: 100, weight: "30%" },
];

const factorFields = [
  { key: "attendance" as const, label: "Attendance Rate", icon: "✅", max: 100, unit: "%" },
  { key: "studyHours" as const, label: "Daily Study Hours", icon: "📚", max: 12, unit: "hrs" },
  { key: "sleepHours" as const, label: "Sleep Hours", icon: "😴", max: 12, unit: "hrs" },
  { key: "extracurricular" as const, label: "Extracurricular", icon: "🏆", max: 10, unit: "" },
  { key: "previousGrade" as const, label: "Previous Grade", icon: "📝", max: 100, unit: "%" },
];

export default function StudentForm({ onPredict, isLoading }: Props) {
  const [data, setData] = useState<StudentData>(defaultData);

  const updateSubject = (subKey: string, field: keyof SubjectMarks, val: number) => {
    setData((prev) => ({
      ...prev,
      subjects: {
        ...prev.subjects,
        [subKey]: { ...prev.subjects[subKey], [field]: val },
      },
    }));
  };

  const updateFactor = (key: keyof Omit<StudentData, "subjects">, val: number) => {
    setData((prev) => ({ ...prev, [key]: val }));
  };

  return (
    <Card className="shadow-card border-border/50">
      <CardContent className="p-5 space-y-4">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center text-sm">📊</div>
          <h2 className="text-lg font-semibold text-foreground font-[Space_Grotesk]">Student Data Entry</h2>
        </div>

        {/* Subject Marks Tabs */}
        <Tabs defaultValue={SUBJECTS[0].key} className="w-full">
          <TabsList className="w-full flex h-auto flex-wrap gap-1 bg-muted/50 p-1">
            {SUBJECTS.map((s) => (
              <TabsTrigger key={s.key} value={s.key} className="flex-1 min-w-0 text-xs px-2 py-1.5 data-[state=active]:gradient-primary data-[state=active]:text-primary-foreground">
                <span className="mr-1">{s.icon}</span>
                <span className="hidden sm:inline">{s.name.split(" ")[0]}</span>
                <span className="sm:hidden">{s.key.toUpperCase()}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {SUBJECTS.map((sub) => (
            <TabsContent key={sub.key} value={sub.key} className="mt-3 space-y-3">
              <p className="text-xs text-muted-foreground font-medium">{sub.icon} {sub.name} — Enter marks</p>
              {markFields.map((f) => (
                <div key={f.key} className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <label className="text-xs text-muted-foreground">
                      {f.label} <span className="text-[10px] opacity-60">(max {f.max}, wt: {f.weight})</span>
                    </label>
                    <span className="text-sm font-semibold text-foreground tabular-nums">
                      {data.subjects[sub.key][f.key]}/{f.max}
                    </span>
                  </div>
                  <Slider
                    value={[data.subjects[sub.key][f.key]]}
                    max={f.max}
                    step={1}
                    onValueChange={([v]) => updateSubject(sub.key, f.key, v)}
                    className="cursor-pointer"
                  />
                </div>
              ))}
            </TabsContent>
          ))}
        </Tabs>

        {/* Student Factors */}
        <div className="pt-2 border-t border-border/50 space-y-3">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Student Factors</p>
          {factorFields.map((f, i) => (
            <motion.div
              key={f.key}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.03 }}
              className="space-y-1.5"
            >
              <div className="flex justify-between items-center">
                <label className="text-xs text-muted-foreground flex items-center gap-1">
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
                onValueChange={([v]) => updateFactor(f.key, v)}
                className="cursor-pointer"
              />
            </motion.div>
          ))}
        </div>

        <Button
          onClick={() => onPredict(data)}
          disabled={isLoading}
          className="w-full gradient-primary text-primary-foreground hover:opacity-90 transition-opacity font-semibold h-11 mt-2"
        >
          {isLoading ? "Analyzing..." : "🔮 Predict Performance"}
        </Button>
      </CardContent>
    </Card>
  );
}
