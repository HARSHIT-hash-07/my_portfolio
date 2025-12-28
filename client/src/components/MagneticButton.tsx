import React, { useRef, useState, forwardRef } from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

// 1. Define specific types to avoid conflicts
interface MagneticButtonProps extends HTMLMotionProps<"button"> {
  variant?: "primary" | "outline" | "ghost";
  children: React.ReactNode;
}

const variants = {
  primary: "bg-primary text-primary-foreground hover:bg-primary/90",
  outline: "border border-border bg-transparent hover:bg-accent",
  ghost: "hover:bg-accent hover:text-accent-foreground",
};

// 2. Wrap in forwardRef to fix the ref "squiggle"
export const MagneticButton = forwardRef<
  HTMLButtonElement,
  MagneticButtonProps
>(({ className, variant = "primary", children, ...props }, ref) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const localRef = useRef<HTMLButtonElement>(null);

  // Combine the forwarded ref with our local ref for mouse logic
  const buttonRef = (ref as React.RefObject<HTMLButtonElement>) || localRef;

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } =
      buttonRef.current.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    setPosition({ x: x * 0.3, y: y * 0.3 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.button
      ref={ref} // Now works correctly with forwardRef
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={cn(
        "px-8 py-4 text-sm font-medium uppercase tracking-wider",
        variants[variant], // Uses our local variants object, not Framer's
        className
      )}
      {...props} // Custom 'variant' is NOT in here anymore, so no conflict
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </motion.button>
  );
});

MagneticButton.displayName = "MagneticButton";
