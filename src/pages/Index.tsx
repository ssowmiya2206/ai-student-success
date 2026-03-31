import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import StudentForm from "@/components/StudentForm";
import ModelCard from "@/components/ModelCard";
import PredictionChart from "@/components/PredictionChart";
import AverageResult from "@/components/AverageResult";
import SubjectResults from "@/components/SubjectResults";
import { runPredictions, getSubjectResults, type StudentData, type ModelPrediction, type SubjectResult } from "@/lib/prediction-models";

export default function Index() {
  const [predictions, setPredictions] = useState<ModelPrediction[] | null>(null);
  const [subjectResults, setSubjectResults] = useState<SubjectResult[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handlePredict = (data: StudentData) => {
    setIsLoading(true);
    setPredictions(null);
    setSubjectResults(null);
    setTimeout(() => {
      setPredictions(runPredictions(data));
      setSubjectResults(getSubjectResults(data));
      setIsLoading(false);
    }, 1200);
  };

  const bestIdx = predictions
    ? predictions.reduce((bi, m, i, arr) => (m.accuracy > arr[bi].accuracy ? i : bi), 0)
    : -1;

  return (
    <div className="min-h-screen bg-background">
      <header className="gradient-primary py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.h1
            className="text-3xl md:text-4xl font-bold text-primary-foreground font-[Space_Grotesk]"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            🎓 Student Performance Predictor
          </motion.h1>
          <motion.p
            className="text-primary-foreground/80 mt-2 text-sm md:text-base"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
          >
            5 Subjects × 4 Components (CAT1, CAT2, FAT, Assignments) → 7 AI Models
          </motion.p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-[380px_1fr] gap-6">
          <div>
            <StudentForm onPredict={handlePredict} isLoading={isLoading} />
          </div>

          <div className="space-y-6">
            <AnimatePresence mode="wait">
              {isLoading && (
                <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center justify-center py-20">
                  <div className="text-center space-y-3">
                    <motion.div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent mx-auto" animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }} />
                    <p className="text-muted-foreground text-sm">Running 7 AI models across 5 subjects...</p>
                  </div>
                </motion.div>
              )}

              {!isLoading && predictions && subjectResults && (
                <motion.div key="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                  <AverageResult predictions={predictions} subjectResults={subjectResults} />
                  <SubjectResults results={subjectResults} />

                  <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">
                    {predictions.map((m, i) => (
                      <ModelCard key={m.id} model={m} index={i} isBest={i === bestIdx} />
                    ))}
                  </div>

                  <PredictionChart predictions={predictions} subjectResults={subjectResults} />
                </motion.div>
              )}

              {!isLoading && !predictions && (
                <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center justify-center py-20">
                  <div className="text-center space-y-2">
                    <p className="text-4xl">🔮</p>
                    <p className="text-muted-foreground">Enter marks for 5 subjects and click predict</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  );
}
