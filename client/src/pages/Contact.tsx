import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertMessageSchema, type InsertMessage } from "@shared/schema";
import { useSendMessage } from "@/hooks/use-messages";
import { useToast } from "@/hooks/use-toast";
import { MagneticButton } from "@/components/MagneticButton";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

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
    <div className="min-h-screen pt-32 pb-20 px-6 md:px-12 bg-background flex flex-col justify-center">
      <div className="max-w-4xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-20">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-7xl font-serif mb-8">Get in Touch</h1>
          <p className="text-xl text-muted-foreground mb-12 font-light leading-relaxed">
            Interested in collaboration or have a project in mind? Let's discuss how we can build intelligent solutions together.
          </p>
          
          <div className="space-y-6 text-sm font-mono uppercase tracking-widest text-muted-foreground">
            <div>
              <p className="text-primary mb-1">Email</p>
              <a href="mailto:hello@example.com" className="text-foreground hover:underline">hello@example.com</a>
            </div>
            <div>
              <p className="text-primary mb-1">Socials</p>
              <div className="flex gap-4">
                <a href="#" className="text-foreground hover:underline">LinkedIn</a>
                <a href="#" className="text-foreground hover:underline">GitHub</a>
                <a href="#" className="text-foreground hover:underline">Twitter</a>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-mono uppercase tracking-wider text-muted-foreground">Name</label>
              <input
                {...form.register("name")}
                className="w-full bg-transparent border-b border-white/20 py-4 text-lg focus:outline-none focus:border-primary transition-colors rounded-none placeholder:text-white/10"
                placeholder="Your Name"
              />
              {form.formState.errors.name && (
                <p className="text-red-500 text-xs">{form.formState.errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-mono uppercase tracking-wider text-muted-foreground">Email</label>
              <input
                {...form.register("email")}
                type="email"
                className="w-full bg-transparent border-b border-white/20 py-4 text-lg focus:outline-none focus:border-primary transition-colors rounded-none placeholder:text-white/10"
                placeholder="your@email.com"
              />
              {form.formState.errors.email && (
                <p className="text-red-500 text-xs">{form.formState.errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-mono uppercase tracking-wider text-muted-foreground">Message</label>
              <textarea
                {...form.register("message")}
                rows={4}
                className="w-full bg-transparent border-b border-white/20 py-4 text-lg focus:outline-none focus:border-primary transition-colors rounded-none placeholder:text-white/10 resize-none"
                placeholder="Tell me about your project..."
              />
              {form.formState.errors.message && (
                <p className="text-red-500 text-xs">{form.formState.errors.message.message}</p>
              )}
            </div>

            <div className="pt-4">
              <MagneticButton type="submit" disabled={sendMessage.isPending} className="w-full md:w-auto">
                {sendMessage.isPending ? (
                  <>Sending <Loader2 className="ml-2 w-4 h-4 animate-spin" /></>
                ) : (
                  "Send Message"
                )}
              </MagneticButton>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
