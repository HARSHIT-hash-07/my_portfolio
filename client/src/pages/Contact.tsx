import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertMessageSchema, type InsertMessage } from "@shared/schema";
import { useSendMessage } from "@/hooks/use-messages";
import { useToast } from "@/hooks/use-toast";
import { MagneticButton } from "@/components/MagneticButton";
import { motion } from "framer-motion";
import { Loader2, Mail, Github, Linkedin, MessageSquare } from "lucide-react";

export default function Contact() {
  const { toast } = useToast();
  const sendMessage = useSendMessage();

  const form = useForm<InsertMessage>({
    resolver: zodResolver(insertMessageSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = (data: InsertMessage) => {
    sendMessage.mutate(data, {
      onSuccess: () => {
        toast({
          title: "Message Sent",
          description: "Thank you for reaching out. I'll get back to you soon.",
        });
        form.reset();
      },
      onError: (error) => {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      },
    });
  };

  return (
    /* Removed 'bg-background' to show your 64px spread-out dots */
    <div className="min-h-screen pt-32 pb-20 px-6 md:px-12 flex flex-col justify-center transition-colors duration-500">
      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-20">
        {/* Left Side: Branding & Info */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-2 mb-6 text-primary font-mono text-xs tracking-widest uppercase">
            <MessageSquare className="w-4 h-4" />
            Collaboration
          </div>

          <h1 className="text-6xl md:text-8xl font-serif mb-8 tracking-tighter">
            Get in <br /> <span className="text-primary/80 italic">Touch.</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-12 font-light leading-relaxed max-w-md">
            Based in <span className="text-foreground">Varanasi, India</span>.
            I'm always open to fruitful discussion.
          </p>

          <div className="space-y-8">
            <div className="group">
              <p className="text-xs font-mono uppercase tracking-widest text-primary mb-2">
                Email
              </p>
              <a
                href="mailto:vaghamshi.harshitv.cse24@itbhu.ac.in"
                className="text-2xl font-serif hover:text-primary transition-colors"
              >
                vaghamshi.harshitv.cse24@itbhu.ac.in
              </a>
            </div>

            <div>
              <p className="text-xs font-mono uppercase tracking-widest text-primary mb-6">
                Network
              </p>
              <div className="flex gap-6">
                {[
                  {
                    icon: <Github className="w-5 h-5" />,
                    label: "GitHub",
                    href: "https://github.com/HARSHIT-hash-07",
                  },
                  {
                    icon: <Linkedin className="w-5 h-5" />,
                    label: "LinkedIn",
                    href: "https://www.linkedin.com/in/harshit-vaghamshi-bb1ab1321/",
                  },
                  {
                    icon: <Mail className="w-5 h-5" />,
                    label: "Email",
                    href: "mailto:vaghamshi.harshitv.cse24@itbhu.ac.in",
                  },
                ].map((social, i) => (
                  <a
                    key={i}
                    href={social.href}
                    className="p-3 rounded-full border border-border/50 bg-card/20 backdrop-blur-md hover:border-primary/50 hover:text-primary transition-all duration-300"
                    aria-label={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Side: Contact Form Card */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          {/* Subtle background glow for the form card */}
          <div className="absolute inset-0 bg-primary/5 blur-3xl -z-10 rounded-full" />

          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 p-8 md:p-12 border border-border/50 bg-card/20 backdrop-blur-xl rounded-3xl"
          >
            <div className="space-y-2">
              <label className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground">
                Name
              </label>
              <input
                {...form.register("name")}
                className="w-full bg-transparent border-b border-border/50 py-4 text-lg focus:outline-none focus:border-primary transition-all rounded-none placeholder:text-muted-foreground/20"
                placeholder="How should I call you?"
              />
              {form.formState.errors.name && (
                <p className="text-red-500 text-[10px] font-mono mt-1">
                  {form.formState.errors.name.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground">
                Email Address
              </label>
              <input
                {...form.register("email")}
                type="email"
                className="w-full bg-transparent border-b border-border/50 py-4 text-lg focus:outline-none focus:border-primary transition-all rounded-none placeholder:text-muted-foreground/20"
                placeholder="your@email.com"
              />
              {form.formState.errors.email && (
                <p className="text-red-500 text-[10px] font-mono mt-1">
                  {form.formState.errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground">
                Message
              </label>
              <textarea
                {...form.register("message")}
                rows={3}
                className="w-full bg-transparent border-b border-border/50 py-4 text-lg focus:outline-none focus:border-primary transition-all rounded-none placeholder:text-muted-foreground/20 resize-none"
                placeholder="Tell me about your project or opportunity..."
              />
              {form.formState.errors.message && (
                <p className="text-red-500 text-[10px] font-mono mt-1">
                  {form.formState.errors.message.message}
                </p>
              )}
            </div>

            <div className="pt-6">
              <MagneticButton
                type="submit"
                disabled={sendMessage.isPending}
                className="w-full group"
              >
                {sendMessage.isPending ? (
                  <span className="flex items-center">
                    Transmitting{" "}
                    <Loader2 className="ml-2 w-4 h-4 animate-spin" />
                  </span>
                ) : (
                  <span className="flex items-center">
                    Send Inquiry{" "}
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                )}
              </MagneticButton>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}

// Internal helper for the icon
function ArrowRight({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M14 5l7 7m0 0l-7 7m7-7H3"
      />
    </svg>
  );
}
