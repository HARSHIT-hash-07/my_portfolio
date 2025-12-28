import { motion, useMotionValue, useTransform, animate } from "framer-motion";
// Removed useProjects hook import to eliminate API dependency
import { ProjectCard } from "@/components/ProjectCard";
import { MagneticButton } from "@/components/MagneticButton";
import {
  ChevronLeft,
  ChevronRight,
  Terminal as TerminalIcon,
  ArrowUpRight,
  ArrowRight,
} from "lucide-react";
import { Link } from "wouter";
import { useState, useRef, useEffect } from "react";

// Hardcoded project data to ensure 100% uptime on Vercel
const projectsData = [
  {
    id: 1,
    title: "Human-Pose Estimation",
    description:
      "Real-time pose tracking system using computer vision and deep learning techniques to analyze human movement patterns with high precision.",
    imageUrl:
      "https://images.unsplash.com/photo-1527430253228-e93688616381?auto=format&fit=crop&q=80&w=1000",
    tags: ["Python", "OpenCV"],
    category: "Visual Computing",
    featured: true,
    link: "https://github.com/HARSHIT-hash-07/Human-Pose-Estimation",
  },
  {
    id: 2,
    title: "Face-Recognition Door Lock",
    description:
      "Secure IoT-based access control system implementing FaceNet for biometric authentication on edge devices.",
    imageUrl:
      "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80&w=1000",
    tags: ["OpenCV", "Arduino UNO", "HaarCascade"],
    category: "AI/ML",
    featured: true,
    link: "https://github.com/HARSHIT-hash-07/Face-Recognition-Based-Door-Lock",
  },
  {
    id: 3,
    title: "Autonomous AI Agents",
    description:
      "Framework for deploying autonomous agents capable of complex task planning and execution in dynamic environments.",
    imageUrl:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1000",
    tags: ["Google ADK"],
    category: "AI Agents",
    featured: true,
    link: "https://github.com/HARSHIT-hash-07",
  },
];

const revealVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay: delay,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

// Terminal Animation Config
const typingContainer = {
  hidden: { opacity: 1 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
};

const typingLetter = {
  hidden: { display: "none" },
  visible: { display: "inline" },
};

const languagesContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { delayChildren: 1.8, staggerChildren: 0.1 },
  },
};

const languageTypingContainer = {
  hidden: { opacity: 1 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
};

export default function Home() {
  // Use local data instead of the API hook
  const projects = projectsData;
  const featuredProjects = projects.filter((p) => p.featured);

  const [imageLoaded, setImageLoaded] = useState(false);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const [maxScroll, setMaxScroll] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const x = useMotionValue(0);

  // Synchronize the scroll width based on static project count
  useEffect(() => {
    if (marqueeRef.current) {
      const contentWidth = marqueeRef.current.scrollWidth;
      const containerWidth = marqueeRef.current.offsetWidth;
      const scrollDistance = contentWidth - containerWidth;
      setMaxScroll(scrollDistance > 0 ? -scrollDistance : 0);
    }
  }, [featuredProjects]); // Removed loadingProjects dependency

  // Handle "Ping-Pong" Auto-Scroll Logic remains identical
  useEffect(() => {
    let controls: any;

    if (!isPaused && maxScroll !== 0) {
      const duration = featuredProjects.length * 8;

      controls = animate(x, [0, maxScroll], {
        duration: duration,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "reverse",
      });
    }

    return () => controls?.stop();
  }, [isPaused, maxScroll, featuredProjects.length]);

  const progressBarWidth = useTransform(
    x,
    [0, maxScroll || -1],
    ["0%", "100%"],
    { clamp: true }
  );

  const handleManualScroll = (direction: "left" | "right") => {
    setIsPaused(true);
    const shift = direction === "left" ? 500 : -500;
    let newX = x.get() + shift;

    // Keep scroll within bounds
    if (newX > 0) newX = 0;
    if (newX < maxScroll) newX = maxScroll;

    // FIX: Added 'x' as the first argument
    animate(x, newX, {
      type: "spring",
      stiffness: 60,
      damping: 15,
      onComplete: () => {
        // Resume auto-scroll after 3 seconds of inactivity
        setTimeout(() => setIsPaused(false), 3000);
      },
    });
  };

  return (
    <div className="min-h-screen text-foreground transition-colors duration-500 overflow-x-hidden">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center pt-28 sm:pt-0 px-6 md:px-12 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            <div className="space-y-4 mb-10">
              <span className="text-lg md:text-2xl font-mono tracking-[0.2em] uppercase text-muted-foreground font-medium block">
                Hello everyone, I am
              </span>
              <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-medium leading-[1.1] tracking-tighter sm:whitespace-nowrap">
                <span className="text-primary">Harshit Vaghamshi</span>
              </h1>
            </div>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-xl font-light leading-relaxed mb-12">
              A Computer Science student at{" "}
              <span className="text-foreground font-semibold">IIT BHU</span>,
              simply following his dreams.{" "}
              <span className="block mt-4 italic font-normal text-foreground/80">
                "I live for the quiet satisfaction of making things flow,
                turning messy ideas into something steady while always leaving
                room to learn a better way."
              </span>
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href="/about">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative"
                >
                  <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-primary/60 to-blue-600/60 opacity-20 blur group-hover:opacity-100 transition duration-500" />
                  <MagneticButton
                    variant="outline"
                    className="relative px-10 py-7 text-lg bg-card/50 backdrop-blur-xl border-white/10 rounded-full overflow-hidden transition-all duration-300 group-hover:border-primary/50"
                  >
                    <span className="flex items-center gap-3 font-mono tracking-wider">
                      ABOUT MY JOURNEY
                      <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </MagneticButton>
                </motion.div>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="lg:col-span-5 relative flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-md aspect-[4/5] p-3 border border-border/40 bg-card/10 backdrop-blur-md rounded-[2.5rem] overflow-hidden shadow-2xl transform-gpu group isolate">
              {!imageLoaded && (
                <div className="absolute inset-3 z-30 rounded-[1.8rem] bg-muted/40 overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-r from-transparent via-primary/5 to-transparent skeleton-shimmer" />
                </div>
              )}
              <div className="w-full h-full bg-muted/20 rounded-[1.8rem] overflow-hidden relative">
                <img
                  src="/harshit_hover.png"
                  alt="Creative"
                  className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-all duration-1000 ease-in-out scale-100 group-hover:scale-105 z-10"
                />
                <img
                  src="/harshit_profile.jpeg"
                  alt="Professional"
                  onLoad={() => setImageLoaded(true)}
                  className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-in-out z-0 ${
                    imageLoaded
                      ? "opacity-100 group-hover:opacity-0"
                      : "opacity-0"
                  }`}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Technical Skills Section - Exactly as before */}
      <section className="py-16 px-6 md:px-12 border-t border-border/10">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            variants={revealVariants}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start"
          >
            <div className="lg:col-span-5 space-y-10">
              <h2 className="text-5xl md:text-6xl font-serif">
                Technical Skills
              </h2>
              <p className="text-muted-foreground text-xl md:text-2xl font-light leading-relaxed tracking-wide max-w-lg">
                I strive to stay open to better ways of doing things by treating
                every gap in my knowledge not as a deficit, but as a deliberate
                trailhead for a new, humble deep dive into how things actually
                work.
              </p>
            </div>

            <div className="lg:col-span-7 bg-card/30 backdrop-blur-2xl border border-border/40 rounded-[3rem] p-8 md:p-14 shadow-2xl relative overflow-hidden group transform-gpu">
              <div className="bg-black/90 rounded-2xl overflow-hidden mb-16 border border-white/10 shadow-2xl">
                <div className="bg-white/5 px-6 py-3 flex items-center justify-between border-b border-white/10">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/40" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/40" />
                    <div className="w-3 h-3 rounded-full bg-green-500/40" />
                  </div>
                  <span className="text-[10px] font-mono text-muted-foreground/40 uppercase tracking-[0.3em]">
                    harshit — terminal
                  </span>
                </div>
                <div className="p-10 font-mono text-sm md:text-base leading-relaxed">
                  <div className="flex gap-3 mb-6">
                    <span className="text-green-400">➜</span>
                    <span className="text-blue-400">~</span>
                    <motion.div
                      variants={typingContainer}
                      className="text-white relative"
                    >
                      {"ls programming_languages/".split("").map((char, i) => (
                        <motion.span key={i} variants={typingLetter}>
                          {char}
                        </motion.span>
                      ))}
                      <motion.span
                        animate={{ opacity: [1, 0] }}
                        transition={{ repeat: Infinity, duration: 0.8 }}
                        className="inline-block w-2 h-5 bg-primary ml-1 align-middle"
                      />
                    </motion.div>
                  </div>
                  <motion.div
                    variants={languagesContainer}
                    className="flex flex-wrap gap-x-10 gap-y-4 text-white ml-8"
                  >
                    {["C++", "Python", "C", "TypeScript", "HTML/CSS"].map(
                      (lang) => (
                        <motion.span
                          key={lang}
                          variants={languageTypingContainer}
                          className="hover:text-primary transition-all duration-300 cursor-default inline-block"
                        >
                          {lang.split("").map((char, i) => (
                            <motion.span key={i} variants={typingLetter}>
                              {char}
                            </motion.span>
                          ))}
                        </motion.span>
                      )
                    )}
                  </motion.div>
                </div>
              </div>

              {/* Competitive Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16 px-4">
                <div className="space-y-8">
                  <span className="text-primary/90 block uppercase tracking-[0.25em] text-sm font-mono font-bold">
                    Environment & Stack
                  </span>
                  <div className="grid grid-cols-2 gap-y-4 text-foreground/90 font-mono text-sm">
                    {[
                      "React",
                      "OpenCV",
                      "NumPy",
                      "Pandas",
                      "Git",
                      "VS Code",
                      "Kaggle",
                      "Google ADK",
                    ].map((tool) => (
                      <div key={tool} className="flex items-center gap-3">
                        <div className="w-1.5 h-[1px] bg-primary/60" />
                        <span>{tool}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-6">
                  <span className="text-primary/90 block uppercase tracking-[0.25em] text-sm font-mono font-bold">
                    Competitive Statistics
                  </span>
                  <div className="space-y-3">
                    <a
                      href="https://codeforces.com/profile/HARSHIT_V_07"
                      target="_blank"
                      rel="noreferrer"
                      className="group/link flex items-center gap-2 text-2xl font-semibold tracking-tight text-foreground hover:text-primary transition-colors"
                    >
                      Codeforces{" "}
                      <ArrowUpRight className="w-5 h-5 opacity-50 group-hover/link:opacity-100 transition-all" />
                    </a>
                    <div className="flex items-center gap-2 font-mono text-base">
                      <span className="text-muted-foreground">
                        Peak rating :{" "}
                        <span className="text-foreground font-bold">1011</span>
                      </span>
                      <span className="text-muted-foreground">,</span>
                      <span className="text-[#808080] font-bold uppercase text-[10px] tracking-widest bg-[#808080]/5 px-2 py-0.5 rounded border border-[#808080]/20">
                        newbie
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Selected Works - Marquee logic preserved exactly */}
      <section className="py-32 px-6 md:px-12 relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-16 flex items-end justify-between">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false }}
              variants={revealVariants}
            >
              <h2 className="text-5xl md:text-6xl font-serif tracking-tight">
                Selected Works
              </h2>
              <p className="text-muted-foreground mt-4 font-mono text-xs uppercase tracking-[0.2em]">
                Engineering log
              </p>
            </motion.div>
            <div className="flex gap-4">
              <button
                onClick={() => handleManualScroll("left")}
                className="p-4 rounded-full border border-border hover:bg-primary/10 group/btn transition-all active:scale-95"
              >
                <ChevronLeft className="w-6 h-6 group-hover/btn:-translate-x-1" />
              </button>
              <button
                onClick={() => handleManualScroll("right")}
                className="p-4 rounded-full border border-border hover:bg-primary/10 group/btn transition-all active:scale-95"
              >
                <ChevronRight className="w-6 h-6 group-hover/btn:translate-x-1" />
              </button>
            </div>
          </div>

          <div
            className="relative group/marquee"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <motion.div
              ref={marqueeRef}
              style={{ x }}
              className="flex gap-8 px-4"
            >
              {featuredProjects.map((project, i) => (
                <div
                  key={project.id}
                  className="shrink-0 transform-gpu isolate"
                >
                  <ProjectCard project={project} index={i} />
                </div>
              ))}
            </motion.div>
          </div>

          <div className="mt-16 h-[2px] w-full bg-primary/10 rounded-full overflow-hidden relative">
            <motion.div
              style={{ scaleX: progressBarWidth, originX: 0 }}
              className="absolute inset-0 bg-primary shadow-[0_0_15px_rgba(var(--primary),0.3)]"
            />
          </div>
        </div>
      </section>
    </div>
  );
}


