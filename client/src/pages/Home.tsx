import { motion } from "framer-motion";
import { useProjects } from "@/hooks/use-projects";
import { useInsights } from "@/hooks/use-insights";
import { ProjectCard } from "@/components/ProjectCard";
import { MagneticButton } from "@/components/MagneticButton";
import { ArrowRight, Code, Brain, Cpu, Terminal } from "lucide-react";
import { Link } from "wouter";

export default function Home() {
  const { data: projects, isLoading: loadingProjects } = useProjects();
  const { data: insights } = useInsights();

  const featuredProjects = projects?.filter(p => p.featured) || [];

  return (
    <div className="min-h-screen bg-background text-foreground grid-bg">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center px-6 md:px-12 max-w-8xl mx-auto pt-20">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-5xl"
        >
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif font-medium leading-[0.9] tracking-tight mb-8">
            Engineering <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/50">Intelligence</span> <br />
            with Precision.
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl font-light leading-relaxed mb-12">
            A Creative Engineer at the intersection of AI Research, Competitive Programming, and Digital Logic.
            IIT BHU Scholar crafting the future of autonomous systems.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <Link href="/contact">
              <MagneticButton>Start a Project</MagneticButton>
            </Link>
            <Link href="/about">
              <MagneticButton variant="outline">About Me</MagneticButton>
            </Link>
          </div>
        </motion.div>
        
        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 left-6 md:left-12 flex items-center gap-4 text-xs font-mono tracking-widest uppercase text-muted-foreground/60"
        >
          <div className="w-12 h-[1px] bg-current" />
          Scroll to explore
        </motion.div>
      </section>

      {/* Technical Edge / Expertise */}
      <section className="py-32 px-6 md:px-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20">
            <h2 className="text-4xl md:text-5xl font-serif">Technical Edge</h2>
            <p className="text-muted-foreground max-w-md mt-4 md:mt-0 text-right">
              Deep diving into the theoretical and practical aspects of modern computation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Brain className="w-8 h-8 text-primary" />,
                title: "AI Agents",
                desc: "Google Intensive certified specialist in autonomous agent architectures and reinforcement learning environments."
              },
              {
                icon: <Cpu className="w-8 h-8 text-primary" />,
                title: "Digital Logic",
                desc: "Designing efficient hardware-software interfaces and optimizing low-level computational logic."
              },
              {
                icon: <Terminal className="w-8 h-8 text-primary" />,
                title: "Competitive Programming",
                desc: "Solving complex algorithmic challenges with optimal time and space complexity. 5-star coder."
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 border border-white/5 hover:border-primary/50 transition-colors bg-card/30 backdrop-blur-sm group"
              >
                <div className="mb-6 opacity-70 group-hover:opacity-100 transition-opacity">{item.icon}</div>
                <h3 className="text-xl font-medium mb-3">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Selected Works */}
      <section className="py-32 px-6 md:px-12 bg-zinc-900/20">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-20">
            <h2 className="text-4xl md:text-5xl font-serif">Selected Works</h2>
            <Link href="/projects">
              <MagneticButton variant="ghost" className="hidden md:flex">View All Works <ArrowRight className="ml-2 w-4 h-4" /></MagneticButton>
            </Link>
          </div>

          {loadingProjects ? (
            <div className="text-center py-20 text-muted-foreground animate-pulse">Loading precision engineering...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24">
              {featuredProjects.length > 0 ? (
                featuredProjects.map((project, i) => (
                  <ProjectCard key={project.id} project={project} index={i} />
                ))
              ) : (
                <div className="col-span-2 py-20 text-center border border-dashed border-white/10 rounded-lg">
                  <p className="text-muted-foreground">Projects loading or none featured yet.</p>
                </div>
              )}
            </div>
          )}
          
          <div className="mt-12 text-center md:hidden">
            <Link href="/projects">
              <MagneticButton variant="outline">View All Works</MagneticButton>
            </Link>
          </div>
        </div>
      </section>

      {/* Insights / Writing */}
      <section className="py-32 px-6 md:px-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-serif mb-20">Insights</h2>
          
          <div className="space-y-8">
            {insights?.slice(0, 3).map((insight, i) => (
              <motion.div
                key={insight.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group border-b border-white/5 pb-8 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-white/5 p-4 rounded-lg transition-colors cursor-pointer"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-4 text-xs font-mono text-muted-foreground">
                    <span>{new Date(insight.publishedAt || "").toLocaleDateString()}</span>
                    <span>•</span>
                    <span>{insight.readTime}</span>
                  </div>
                  <h3 className="text-2xl font-serif group-hover:text-primary transition-colors">
                    {insight.title}
                  </h3>
                  <p className="text-muted-foreground text-sm max-w-2xl line-clamp-1">
                    {insight.summary}
                  </p>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity -translate-x-4 group-hover:translate-x-0 duration-300">
                   <ArrowRight className="w-6 h-6 text-primary" />
                </div>
              </motion.div>
            ))}
            
            {(!insights || insights.length === 0) && (
              <div className="text-muted-foreground italic">No insights published yet.</div>
            )}
          </div>
        </div>
      </section>

      {/* Education / IIT BHU Banner */}
      <section className="py-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto bg-card border border-white/5 p-12 md:p-20 relative overflow-hidden group">
          <div className="absolute inset-0 bg-primary/5 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-700 ease-out" />
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div>
              <span className="font-mono text-primary text-sm tracking-widest uppercase mb-2 block">Alma Mater</span>
              <h2 className="text-3xl md:text-4xl font-serif mb-4">Indian Institute of Technology<br/>(BHU), Varanasi</h2>
              <p className="text-muted-foreground max-w-lg">
                Pursuing excellence in engineering, backed by a legacy of technical innovation and rigorous academic standards.
              </p>
            </div>
            <Code className="w-24 h-24 text-white/5 group-hover:text-primary/20 transition-colors" />
          </div>
        </div>
      </section>
    </div>
  );
}
