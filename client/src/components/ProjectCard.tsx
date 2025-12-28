import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";

export function ProjectCard({
  project,
  index,
}: {
  project: any;
  index: number;
}) {
  const [imgError, setImgError] = useState(false);

  // Prevent internal redirection if link is missing
  const isValidLink = project.link && project.link !== "#";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group relative flex flex-col md:flex-row gap-6 bg-card/20 backdrop-blur-md border border-border/40 rounded-[2.5rem] overflow-hidden p-5 transition-all duration-500 shadow-xl h-auto md:h-72 w-[700px]"
    >
      <a
        href={isValidLink ? project.link : undefined}
        target="_blank"
        rel="noopener noreferrer"
        className={`w-full md:w-56 h-40 md:h-full shrink-0 ${
          !isValidLink && "pointer-events-none"
        }`}
      >
        <div className="w-full h-full rounded-[1.8rem] overflow-hidden bg-muted/20 border border-white/5">
          <img
            src={
              imgError || !project.imageUrl
                ? "https://images.unsplash.com/photo-1550751827-4bd374c3f58b"
                : project.imageUrl
            }
            alt={project.title}
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-110"
            onError={() => setImgError(true)}
          />
        </div>
      </a>

      <div className="flex flex-col flex-1 py-1 overflow-hidden">
        <div className="flex justify-between items-start mb-3">
          <a
            href={isValidLink ? project.link : undefined}
            target="_blank"
            rel="noopener noreferrer"
            className={!isValidLink ? "pointer-events-none" : ""}
          >
            <h3 className="text-3xl font-serif text-foreground group-hover:text-primary transition-colors pr-2 leading-tight">
              {project.title}
            </h3>
          </a>

          <a
            href={isValidLink ? project.link : undefined}
            target="_blank"
            rel="noopener noreferrer"
            className={`p-2 rounded-full bg-primary/5 border border-primary/10 group-hover:bg-primary/20 transition-all shrink-0 ${
              !isValidLink && "opacity-20 cursor-not-allowed"
            }`}
          >
            <ArrowUpRight className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-all" />
          </a>
        </div>

        <p className="text-muted-foreground text-base leading-relaxed mb-4 line-clamp-3">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mt-auto">
          {project.tags?.map((tag: string) => (
            <span
              key={tag}
              className="px-3 py-1 bg-primary/10 border border-primary/20 text-primary font-mono text-[11px] rounded-lg"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
