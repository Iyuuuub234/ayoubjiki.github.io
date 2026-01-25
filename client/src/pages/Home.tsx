import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCreateContactMessage } from "@/hooks/use-contact";
import { ThreeBackground } from "@/components/ThreeBackground";
import { Navigation } from "@/components/Navigation";
import { ProjectCard } from "@/components/ProjectCard";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { api } from "@shared/routes";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowDown, Mail, MapPin, Linkedin, Github, FileText } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const mainRef = useRef<HTMLDivElement>(null);
  
  // Contact Form Setup
  const createMessage = useCreateContactMessage();
  const form = useForm({
    resolver: zodResolver(api.contact.submit.input),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = (data: z.infer<typeof api.contact.submit.input>) => {
    createMessage.mutate(data, {
      onSuccess: () => form.reset(),
    });
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Setup simple scroll animations
      gsap.utils.toArray('.reveal-text').forEach((el: any) => {
        gsap.fromTo(el,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            scrollTrigger: {
              trigger: el,
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });
    }, mainRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={mainRef} className="relative w-full text-white overflow-hidden">
      <ThreeBackground />
      <Navigation />

      {/* 1. HERO SECTION */}
      <section id="home" className="min-h-screen flex flex-col justify-center items-center relative px-6 pt-20">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/80 pointer-events-none" />
        
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-primary font-mono text-lg mb-4 tracking-widest uppercase"
          >
            Portfolio
          </motion.p>
          
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-6xl md:text-8xl lg:text-9xl font-display font-black tracking-tighter mb-6 text-glow"
          >
            AYOUB <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50">JIKI</span>
          </motion.h1>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col md:flex-row gap-6 justify-center items-center text-xl md:text-2xl font-light text-gray-300"
          >
            <span>Full-Stack Web Developer</span>
            <span className="hidden md:inline w-2 h-2 rounded-full bg-primary" />
            <span>React • PHP • MySQL</span>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce"
        >
          <ArrowDown className="text-white/50" />
        </motion.div>
      </section>

      {/* 2. PROFILE & VISION */}
      <section id="about" className="min-h-screen flex items-center py-20 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1 reveal-text">
            <h2 className="text-sm font-mono text-primary mb-4 uppercase tracking-widest">Profile & Vision</h2>
            <h3 className="text-4xl md:text-5xl font-display font-bold mb-8 leading-tight">
              Crafting digital experiences with <span className="text-primary">passion</span> and precision.
            </h3>
            <div className="space-y-6 text-lg text-gray-300 leading-relaxed font-light">
              <p>
                I am a passionate Full-Stack Developer with a Bac+2 in Web Full Stack Development. 
                My journey began with a curiosity for how things work, evolving into a career building 
                robust web applications.
              </p>
              <p>
                Currently expanding my expertise with a Bachelor's degree (Dacs), I combine academic 
                foundations with real-world startup agility, having spent 4 months at <strong className="text-white font-medium">Bewize</strong>.
              </p>
              <div className="pt-8 flex gap-4">
                <a 
                  href="/assets/resume.pdf" 
                  className="px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-colors"
                >
                  Download CV
                </a>
                <a 
                  href="#contact" 
                  className="px-8 py-3 border border-white/20 hover:bg-white/10 rounded-full transition-colors"
                >
                  Contact Me
                </a>
              </div>
            </div>
          </div>
          
          <div className="order-1 md:order-2 flex justify-center reveal-text">
            <div className="relative w-64 h-64 md:w-96 md:h-96">
              <div className="absolute inset-0 border-2 border-primary/30 rounded-full animate-spin-slow" />
              <div className="absolute inset-4 border border-white/10 rounded-full" />
              <div className="absolute inset-0 rounded-full overflow-hidden border-4 border-black/50 shadow-2xl">
                {/* Dynamic Image Handling */}
                <img 
                  src="/images/profile-pic.png" 
                  alt="Ayoub Jiki" 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. ACADEMIC PROJECTS */}
      <section id="projects" className="min-h-screen py-20 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 reveal-text">
            <h2 className="text-sm font-mono text-primary mb-4 uppercase tracking-widest">Selected Works</h2>
            <h3 className="text-5xl font-display font-bold">Featured Projects</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ProjectCard 
              title="Oufaris Drive Car" 
              description="A modern car rental platform designed for a seamless user experience. Allows browsing vehicles, selecting dates, and booking online easily. Visit: https://www.oufarisdrivecar.ma"
              tags={["TypeScript", "Responsive", "Modern UI"]}
              delay={0.05}
            />
            <ProjectCard 
              title="TICKETTIME" 
              description="A comprehensive ticketing platform allowing users to book events seamlessly. Built with a robust PHP backend and interactive React frontend."
              tags={["React.js", "PHP", "MySQL", "Tailwind"]}
              delay={0.1}
            />
            <ProjectCard 
              title="Bewize Store" 
              description="An innovative gamified e-commerce experience. Developed during my internship, featuring real-time inventory and rewards system."
              tags={["Express.js", "Node.js", "MongoDB", "Redux"]}
              delay={0.2}
            />
            <ProjectCard 
              title="TaskMaster Pro" 
              description="Project management dashboard with drag-and-drop capabilities and team collaboration features."
              tags={["TypeScript", "Next.js", "PostgreSQL", "Drizzle"]}
              delay={0.3}
            />
            <ProjectCard 
              title="Portfolio v1" 
              description="My first portfolio website exploring 3D web technologies and minimalist design principles."
              tags={["Three.js", "GSAP", "HTML/SCSS"]}
              delay={0.4}
            />
          </div>
        </div>
      </section>

      {/* 4. SKILLS UNIVERSE */}
      <section id="skills" className="py-20 px-6 bg-black/40 backdrop-blur-sm border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-display font-bold text-center mb-16 reveal-text">Technical Arsenal</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="space-y-6 reveal-text">
              <h3 className="text-xl font-mono text-primary border-b border-primary/20 pb-2">Frontend</h3>
              <ul className="space-y-4">
                {["React.js", "TypeScript", "TailwindCSS", "GSAP", "Three.js"].map(skill => (
                  <li key={skill} className="flex items-center gap-3 text-lg text-gray-300">
                    <span className="w-2 h-2 bg-blue-500 rounded-full" />
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="space-y-6 reveal-text">
              <h3 className="text-xl font-mono text-primary border-b border-primary/20 pb-2">Backend</h3>
              <ul className="space-y-4">
                {["Node.js", "PHP", "Laravel", "Express", "Python"].map(skill => (
                  <li key={skill} className="flex items-center gap-3 text-lg text-gray-300">
                    <span className="w-2 h-2 bg-purple-500 rounded-full" />
                    {skill}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6 reveal-text">
              <h3 className="text-xl font-mono text-primary border-b border-primary/20 pb-2">Database & Tools</h3>
              <ul className="space-y-4">
                {["MySQL", "PostgreSQL", "MongoDB", "Git/GitHub", "Figma"].map(skill => (
                  <li key={skill} className="flex items-center gap-3 text-lg text-gray-300">
                    <span className="w-2 h-2 bg-green-500 rounded-full" />
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 5. TIMELINE & EDUCATION */}
      <section id="timeline" className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            
            {/* Experience */}
            <div>
              <h3 className="text-3xl font-display font-bold mb-10 flex items-center gap-3">
                <FileText className="text-primary" /> Experience
              </h3>
              <div className="space-y-12 border-l border-white/10 pl-8 relative">
                {[
                  {
                    role: "Full Stack Developer",
                    company: "Bewize",
                    period: "4 Months",
                    desc: "Developed gamified store modules and optimized database queries."
                  },
                  {
                    role: "Intern",
                    company: "Guichet Maroc",
                    period: "15 Days",
                    desc: "Assisted in frontend bug fixes and UI improvements."
                  },
                  {
                    role: "Intern",
                    company: "Jewelry Secret",
                    period: "15 Days",
                    desc: "Managed e-commerce product listings and basic SEO."
                  }
                ].map((job, i) => (
                  <div key={i} className="relative reveal-text">
                    <span className="absolute -left-[37px] top-1 w-4 h-4 bg-black border-2 border-primary rounded-full" />
                    <h4 className="text-xl font-bold text-white">{job.role}</h4>
                    <p className="text-primary font-mono text-sm mb-2">{job.company} • {job.period}</p>
                    <p className="text-gray-400 text-sm leading-relaxed">{job.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div>
              <h3 className="text-3xl font-display font-bold mb-10 flex items-center gap-3">
                <FileText className="text-primary" /> Education
              </h3>
              <div className="space-y-12 border-l border-white/10 pl-8 relative">
                {[
                  {
                    degree: "Bachelor In Web Development",
                    school: "Upcoming",
                    period: "2025 - 2026",
                    desc: "Advanced specialization in modern web architectures."
                  },
                  {
                    degree: "Full-Stack Development",
                    school: "ISTA",
                    period: "2023 - 2025",
                    desc: "Comprehensive training in frontend and backend technologies."
                  },
                  {
                    degree: "Baccalaureate",
                    school: "High School",
                    period: "2022 - 2023",
                    desc: "Scientific stream with distinction."
                  }
                ].map((edu, i) => (
                  <div key={i} className="relative reveal-text">
                    <span className="absolute -left-[37px] top-1 w-4 h-4 bg-black border-2 border-white rounded-full" />
                    <h4 className="text-xl font-bold text-white">{edu.degree}</h4>
                    <p className="text-white/60 font-mono text-sm mb-2">{edu.school} • {edu.period}</p>
                    <p className="text-gray-400 text-sm leading-relaxed">{edu.desc}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 7. CONTACT */}
      <section id="contact" className="min-h-screen flex items-center py-20 px-6 bg-gradient-to-t from-primary/10 to-transparent">
        <div className="max-w-4xl mx-auto w-full">
          <div className="text-center mb-16 reveal-text">
            <h2 className="text-sm font-mono text-primary mb-4 uppercase tracking-widest">Get in Touch</h2>
            <h3 className="text-5xl font-display font-bold">Let's Create Together</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-8 reveal-text">
              <p className="text-xl text-gray-300 font-light">
                Have a project in mind or just want to say hello? I'm currently open for new opportunities and collaborations.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4 text-gray-300">
                  <Mail className="text-primary" />
                  <a href="mailto:ayoubjiki101@gmail.com" className="hover:text-white transition-colors">ayoubjiki101@gmail.com</a>
                </div>
                <div className="flex items-center gap-4 text-gray-300">
                  <MapPin className="text-primary" />
                  <span>Agadir, Morocco</span>
                </div>
              </div>

              <div className="flex gap-4">
                <a href="https://www.linkedin.com/in/ayoub-jiki-7b28072bb/" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors border border-white/10">
                  <Linkedin size={20} />
                </a>
                <a href="https://github.com/Iyuuuub234" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors border border-white/10">
                  <Github size={20} />
                </a>
              </div>
            </div>

            <div className="glass-card p-8 rounded-2xl reveal-text">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} className="bg-white/5 border-white/10 text-white focus:border-primary/50" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Email</FormLabel>
                        <FormControl>
                          <Input placeholder="john@example.com" {...field} className="bg-white/5 border-white/10 text-white focus:border-primary/50" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Message</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Tell me about your project..." 
                            className="min-h-[120px] bg-white/5 border-white/10 text-white focus:border-primary/50 resize-none" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-6 rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all duration-300"
                    disabled={createMessage.isPending}
                  >
                    {createMessage.isPending ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-white/30 text-sm border-t border-white/5 bg-black">
        <p>&copy; Ayoub Jiki. All rights reserved.</p>
        <p className="mt-2 text-xs font-mono">Designed & Built with React Three Fiber</p>
      </footer>
    </div>
  );
}
