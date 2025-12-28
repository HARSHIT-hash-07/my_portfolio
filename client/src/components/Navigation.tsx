import ThemeToggle from "./ThemeToggle";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export function Navigation() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { href: "/", label: "Work" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 md:px-12 bg-background/50 backdrop-blur-xl border-b border-foreground/5 transition-all duration-500 ease-in-out">
      <Link
        href="/"
        className="text-xl font-bold font-serif tracking-tighter hover:text-primary transition-colors"
      >
        {/* Replace AR with your initials or name */}
        Welcome to My Portfolio
      </Link>

      {/* Desktop Nav */}
      <div className="hidden md:flex items-center gap-8">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "text-sm font-medium tracking-wide transition-colors duration-200 uppercase",
              location === link.href
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {link.label}
          </Link>
        ))}
        {/* Desktop Theme Toggle Added Here */}
        <ThemeToggle />
      </div>

      {/* Mobile Nav Toggle */}
      <div className="flex items-center gap-4 md:hidden">
        {/* Mobile Theme Toggle (Visible even when menu is closed) */}
        <ThemeToggle />
        <button
          className="text-foreground p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-background border-b border-white/10 p-6 flex flex-col gap-4 md:hidden"
          >
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-lg font-serif font-medium",
                  location === link.href
                    ? "text-primary"
                    : "text-muted-foreground"
                )}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
