import { Project } from "@shared/schema";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "wouter";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative"
    >
      <Link href={`/project/${project.id}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden bg-card mb-6 group-hover:shadow-2xl group-hover:shadow-primary/10 transition-shadow duration-500">
          <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 mix-blend-overlay" />
          <img 
            src={project.imageUrl} 
            alt={project.title}
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-out transform group-hover:scale-105"
          />
          <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-black">
              <ArrowUpRight className="w-6 h-6" />
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-serif font-medium group-hover:text-primary transition-colors duration-300">
              {project.title}
            </h3>
            <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider border border-white/10 px-2 py-1">
              {project.category}
            </span>
          </div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-relaxed max-w-md">
            {project.description}
          </p>
          <div className="flex gap-2 mt-4 flex-wrap">
            {project.tags.slice(0, 3).map(tag => (
              <span key={tag} className="text-[10px] uppercase tracking-widest text-muted-foreground/60">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
