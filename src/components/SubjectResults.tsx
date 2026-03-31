import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import type { SubjectResult } from "@/lib/prediction-models";

interface Props {
  results: SubjectResult[];
}

export default function SubjectResults({ results }: Props) {
  const avg = results.reduce((s, r) => s + r.total, 0) / results.length;

  return (
    <Card className="shadow-card border-border/50 overflow-hidden">
      <div className="h-1.5 gradient-accent" />
      <CardContent className="p-5">
        <h3 className="text-lg font-semibold text-foreground mb-4 font-[Space_Grotesk] flex items-center gap-2">
          📋 Subject-wise Results
          <span className="text-xs font-normal text-muted-foreground ml-auto">
            Avg: {avg.toFixed(1)}%
          </span>
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/50">
                <th className="text-left py-2 text-xs text-muted-foreground font-medium">Subject</th>
                <th className="text-center py-2 text-xs text-muted-foreground font-medium">CAT-1<br/><span className="text-[10px] opacity-60">/50 (15%)</span></th>
                <th className="text-center py-2 text-xs text-muted-foreground font-medium">CAT-2<br/><span className="text-[10px] opacity-60">/50 (15%)</span></th>
                <th className="text-center py-2 text-xs text-muted-foreground font-medium">FAT<br/><span className="text-[10px] opacity-60">/100 (40%)</span></th>
                <th className="text-center py-2 text-xs text-muted-foreground font-medium">Assign<br/><span className="text-[10px] opacity-60">/100 (30%)</span></th>
                <th className="text-center py-2 text-xs text-muted-foreground font-medium">Total</th>
                <th className="text-center py-2 text-xs text-muted-foreground font-medium">Grade</th>
              </tr>
            </thead>
            <tbody>
              {results.map((r, i) => (
                <motion.tr
                  key={r.key}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="border-b border-border/30 last:border-0"
                >
                  <td className="py-2.5">
                    <span className="flex items-center gap-1.5">
                      <span>{r.icon}</span>
                      <span className="font-medium text-foreground text-xs">{r.name}</span>
                    </span>
                  </td>
                  <td className="text-center text-foreground tabular-nums">{r.cat1}</td>
                  <td className="text-center text-foreground tabular-nums">{r.cat2}</td>
                  <td className="text-center text-foreground tabular-nums">{r.fat}</td>
                  <td className="text-center text-foreground tabular-nums">{r.assignments}</td>
                  <td className="text-center font-bold tabular-nums" style={{ color: r.gradeColor }}>
                    {r.total}%
                  </td>
                  <td className="text-center">
                    <span
                      className="inline-block px-2 py-0.5 rounded-full text-xs font-bold text-primary-foreground"
                      style={{ background: r.gradeColor }}
                    >
                      {r.grade}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Subject score bars */}
        <div className="mt-4 space-y-2">
          {results.map((r, i) => (
            <div key={r.key} className="flex items-center gap-2">
              <span className="text-xs w-8 text-right text-muted-foreground">{r.icon}</span>
              <div className="flex-1 h-3 rounded-full bg-muted overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: r.color }}
                  initial={{ width: 0 }}
                  animate={{ width: `${r.total}%` }}
                  transition={{ delay: i * 0.1 + 0.3, duration: 0.7 }}
                />
              </div>
              <span className="text-xs font-semibold text-foreground tabular-nums w-12">{r.total}%</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
