import { useInsights } from "@/hooks/use-insights";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function Insights() {
  const { data: insights, isLoading } = useInsights();

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 md:px-12 bg-background">
      <div className="max-w-4xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-serif mb-6"
        >
          Insights
        </motion.h1>
        <p className="text-xl text-muted-foreground mb-20 max-w-2xl">
          Thoughts on AI, internships, and engineering experiences.
        </p>

        {isLoading ? (
          <div className="space-y-8">
            {[1, 2, 3].map(n => (
              <div key={n} className="h-40 bg-card/50 animate-pulse rounded-lg" />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {insights?.map((insight, i) => (
              <motion.div
                key={insight.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group p-8 border border-white/5 hover:border-primary/50 transition-all bg-card/20 hover:bg-card/40 rounded-lg cursor-pointer relative overflow-hidden"
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-primary/80">
                      <span>{new Date(insight.publishedAt || "").toLocaleDateString()}</span>
                      <span>•</span>
                      <span>{insight.readTime}</span>
                    </div>
                    <h2 className="text-3xl font-serif font-medium group-hover:text-primary transition-colors">
                      {insight.title}
                    </h2>
                    <p className="text-muted-foreground max-w-2xl leading-relaxed">
                      {insight.summary}
                    </p>
                  </div>
                  <div className="md:self-start opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-0 -translate-x-4">
                     <ArrowUpRight className="w-8 h-8" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
