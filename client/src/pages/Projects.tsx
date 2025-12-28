import { useProjects } from "@/hooks/use-projects";
import { ProjectCard } from "@/components/ProjectCard";
import { motion } from "framer-motion";
import { Cpu } from "lucide-react";

export default function Projects() {
  const { data: projects, isLoading } = useProjects();

  return (
    /* Removed 'bg-background' to reveal the technical dot-matrix design */
    <div className="min-h-screen pt-32 pb-20 px-6 md:px-12 text-foreground transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-20 space-y-4"
        >
          {/* Technical Badge for IIT BHU Branding */}
          <div className="flex items-center gap-2 text-primary font-mono text-xs tracking-widest uppercase">
            <Cpu className="w-4 h-4" />
            System Architecture
          </div>

          <h1 className="text-5xl md:text-7xl font-serif tracking-tighter">
            Selected Projects.
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl font-light leading-relaxed">
            A curated collection of work in{" "}
            <span className="text-foreground">AI</span>, Computer Vision, and{" "}
            <span className="text-foreground">Digital Logic Systems</span>{" "}
            crafted at IIT BHU.
          </p>
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[1, 2, 3, 4].map((n) => (
              /* Skeleton loader now matches the glass aesthetic */
              <div
                key={n}
                className="aspect-[4/3] bg-card/10 backdrop-blur-sm border border-border/20 animate-pulse rounded-2xl"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24">
            {projects?.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}

            {(!projects || projects.length === 0) && (
              <div className="col-span-full py-32 text-center border border-dashed border-border/50 rounded-3xl">
                <p className="text-muted-foreground font-serif italic text-lg">
                  Deploying new innovations... Check back soon.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
