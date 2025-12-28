import { Link } from "wouter";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";
import { motion } from "framer-motion"; // Add this
import { ArrowRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="py-20 px-6 md:px-12 border-t border-white/5 bg-background">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
        <div>
          <h2 className="text-2xl font-serif mb-2">
            Happy to have you here ..
          </h2>
          <Link href="/Contact">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-2 inline-flex items-center gap-2 px-5 py-2 rounded-full border border-border/60 bg-card/30 backdrop-blur-sm text-[10px] font-mono tracking-[0.2em] text-muted-foreground hover:text-primary hover:border-primary/40 transition-all duration-300 uppercase"
            >
              Contact me here
              <ArrowRight className="w-3 h-3" />
            </motion.button>
          </Link>
        </div>

        <div className="flex gap-6">
          <a
            href="https://github.com/HARSHIT-hash-07"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <Github className="w-6 h-6" />
          </a>
          <a
            href="https://www.linkedin.com/in/harshit-vaghamshi-bb1ab1321/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <Linkedin className="w-6 h-6" />
          </a>
          <a
            href="mailto:vaghamshi.harshitv.cse24@itbhu.ac.in"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <Mail className="w-6 h-6" />
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs text-muted-foreground uppercase tracking-widest">
        <span>© {new Date().getFullYear()} Made with 🫶🏻 </span>
      </div>
    </footer>
  );
}
