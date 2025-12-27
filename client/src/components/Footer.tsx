import { Link } from "wouter";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="py-20 px-6 md:px-12 border-t border-white/5 bg-background">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
        <div>
          <h2 className="text-2xl font-serif mb-2">Let's build something exceptional.</h2>
          <p className="text-muted-foreground max-w-sm">
            Based in Varanasi. Available for global collaborations.
          </p>
        </div>
        
        <div className="flex gap-6">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
            <Github className="w-6 h-6" />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
            <Linkedin className="w-6 h-6" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
            <Twitter className="w-6 h-6" />
          </a>
          <a href="mailto:hello@example.com" className="text-muted-foreground hover:text-primary transition-colors">
            <Mail className="w-6 h-6" />
          </a>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs text-muted-foreground uppercase tracking-widest">
        <span>© {new Date().getFullYear()} AI Engineer Portfolio</span>
        <div className="flex gap-8 mt-4 md:mt-0">
          <Link href="/privacy">Privacy</Link>
          <Link href="/imprint">Imprint</Link>
        </div>
      </div>
    </footer>
  );
}
