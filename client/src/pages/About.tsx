import { motion } from "framer-motion";
import { Award, Briefcase, GraduationCap } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen pt-32 pb-20 px-6 md:px-12 bg-background">
      <div className="max-w-4xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-serif mb-12"
        >
          About Me
        </motion.h1>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="prose prose-invert prose-lg max-w-none mb-20"
        >
          <p className="text-xl md:text-2xl font-light leading-relaxed text-muted-foreground">
            I am a Creative AI Engineer and Scholar at <span className="text-foreground font-medium">IIT BHU, Varanasi</span>. 
            My work sits at the intersection of rigorous research and creative application, focusing on 
            Artificial Intelligence, Competitive Programming, and Digital Logic Design.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Education */}
          <motion.div
             initial={{ opacity: 0, x: -20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.3 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <GraduationCap className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-serif">Education</h2>
            </div>
            <div className="space-y-8 pl-10 border-l border-white/10">
              <div className="relative">
                <div className="absolute -left-[45px] top-2 w-3 h-3 rounded-full bg-primary" />
                <h3 className="text-xl font-medium">IIT (BHU), Varanasi</h3>
                <p className="text-sm text-muted-foreground mb-2">Bachelor of Technology • 2021 - 2025</p>
                <p className="text-muted-foreground text-sm">Specialization in Computer Science & Engineering. Consistent academic performer.</p>
              </div>
            </div>
          </motion.div>

          {/* Experience */}
          <motion.div
             initial={{ opacity: 0, x: 20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.4 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <Briefcase className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-serif">Experience</h2>
            </div>
            <div className="space-y-8 pl-10 border-l border-white/10">
              <div className="relative">
                <div className="absolute -left-[45px] top-2 w-3 h-3 rounded-full bg-card border border-white/20" />
                <h3 className="text-xl font-medium">Microsoft Explore</h3>
                <p className="text-sm text-muted-foreground mb-2">Intern • Summer 2023</p>
                <p className="text-muted-foreground text-sm">Worked on Azure Cloud Infrastructure optimization.</p>
              </div>
              <div className="relative">
                <div className="absolute -left-[45px] top-2 w-3 h-3 rounded-full bg-card border border-white/20" />
                <h3 className="text-xl font-medium">Google STEP</h3>
                <p className="text-sm text-muted-foreground mb-2">Intern • Summer 2022</p>
                <p className="text-muted-foreground text-sm">Developed internal tools for the Maps team.</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Achievements */}
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ delay: 0.5 }}
           className="mt-20"
        >
          <div className="flex items-center gap-4 mb-8">
            <Award className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-serif">Achievements</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 border border-white/5 bg-card/30 rounded-lg hover:border-primary/30 transition-colors">
              <h3 className="text-lg font-medium mb-2">Google Intensive Certified</h3>
              <p className="text-sm text-muted-foreground">Certified specialist in AI Agents and Machine Learning architectures.</p>
            </div>
            <div className="p-6 border border-white/5 bg-card/30 rounded-lg hover:border-primary/30 transition-colors">
              <h3 className="text-lg font-medium mb-2">5-Star Coder</h3>
              <p className="text-sm text-muted-foreground">Top rated competitive programmer on CodeChef and CodeForces.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
