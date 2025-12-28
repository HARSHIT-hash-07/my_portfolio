import { motion } from "framer-motion";
import { Award, Briefcase, GraduationCap } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen pt-32 pb-20 px-6 md:px-12 text-foreground transition-colors duration-500">
      <div className="max-w-6xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-serif mb-12 text-center md:text-left"
        >
          About Me
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-3xl mb-20"
        >
          <p className="text-xl md:text-2xl font-light leading-relaxed text-muted-foreground">
            I am a student pursuing Computer Science Engineering at{" "}
            <span className="text-primary font-medium">IIT BHU, Varanasi</span>.
            My work sits at the intersection of rigorous research and practical
            application, focusing on
            <span className="text-foreground"> Visual computing</span>,{" "}
            <span className="text-foreground">AI/ML</span>, and{" "}
            <span className="text-foreground">Webdev</span>.
          </p>
        </motion.div>

        {/* Combined Side-by-Side Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Education Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center gap-4 mb-8">
              <GraduationCap className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-serif">Education</h2>
            </div>
            <div className="space-y-10 pl-10 border-l border-border/50">
              {/* IIT BHU */}
              <div className="relative">
                <div className="absolute -left-[45px] top-2 w-3 h-3 rounded-full bg-primary" />
                <h3 className="text-xl font-medium">IIT (BHU), Varanasi</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  B.Tech in Computer Science & Engineering • 2024 - 2028
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Focusing on Data Structures, Programming Languages, AI/ML and
                  much more..
                </p>
              </div>

              {/* Phoenix Institute */}
              <div className="relative">
                <div className="absolute -left-[45px] top-2 w-3 h-3 rounded-full bg-card border border-border/50" />
                <h3 className="text-xl font-medium">
                  Phoenix Institute, Vadodara
                </h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Higher Secondary Education • 2020 - 2024
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Developed a strong foundation in Mathematics and Physics,
                  leading to successful JEE qualifications.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Academic Milestones Section: Formatted in 2x2 Grid */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center gap-4 mb-8">
              <Briefcase className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-serif">Academic Milestones</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10 pl-10 border-l border-border/50">
              <div className="relative">
                <div className="absolute -left-[45px] top-2 w-3 h-3 rounded-full bg-card border border-primary/50" />
                <h3 className="text-lg font-medium mb-1">JEE Advanced</h3>
                <p className="text-muted-foreground text-base leading-tight">
                  All India Rank 1886
                </p>
              </div>

              <div className="relative">
                <div className="absolute -left-[45px] sm:hidden top-2 w-3 h-3 rounded-full bg-card border border-border/50" />
                <h3 className="text-lg font-medium mb-1">Class XII</h3>
                <p className="text-muted-foreground text-base leading-tight">
                  99.20 PR (Distinction)
                </p>
              </div>

              <div className="relative">
                <div className="absolute -left-[45px] top-2 w-3 h-3 rounded-full bg-card border border-border/50" />
                <h3 className="text-lg font-medium mb-1">JEE Mains</h3>
                <p className="text-muted-foreground text-base leading-tight">
                  99.73 Percentile
                </p>
              </div>

              <div className="relative">
                <div className="absolute -left-[45px] sm:hidden top-2 w-3 h-3 rounded-full bg-card border border-border/50" />
                <h3 className="text-lg font-medium mb-1">Class X</h3>
                <p className="text-muted-foreground text-base leading-tight">
                  99.92 PR (State Rank 8)
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Technical Milestones Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-24"
        >
          <div className="flex items-center gap-4 mb-8">
            <Award className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-serif">Technical Milestones</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-8 border border-border/40 bg-card/20 backdrop-blur-md rounded-2xl hover:border-primary/50 transition-all duration-500 shadow-sm">
              <h3 className="text-lg font-medium mb-3">
                AI Agents Course by GOOGLE
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Completed 5-day Intensive AI Agents course by Google , based on
                Google ADK
              </p>
            </div>
            <div className="p-8 border border-border/40 bg-card/20 backdrop-blur-md rounded-2xl hover:border-primary/50 transition-all duration-500 shadow-sm">
              <h3 className="text-lg font-medium mb-3">
                Full Stack Web Development 
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Learnt Full Stack WebDev from Hitesh Choudhary's - Udemy course 
              </p>
            </div>
            <div className="p-8 border border-border/40 bg-card/20 backdrop-blur-md rounded-2xl hover:border-primary/50 transition-all duration-500 shadow-sm">
              <h3 className="text-lg font-medium mb-3">
                ORACLE Cloud AI Foundations Associate
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Completed AI Foundations Associate course in "Race to Certification" program by ORACLE
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
