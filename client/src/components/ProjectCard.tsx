import { ExternalLink, Github } from "lucide-react";
import { motion } from "framer-motion";

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  image?: string;
  delay?: number;
}

export function ProjectCard({ title, description, tags, image, delay = 0 }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="group relative rounded-2xl overflow-hidden glass-card border-white/5 bg-black/50 hover:bg-black/70 transition-colors"
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80 z-10" />
      
      {/* Abstract Gradient Background if no image */}
      <div className="h-48 w-full bg-gradient-to-br from-primary/20 via-blue-900/20 to-purple-900/20 group-hover:scale-105 transition-transform duration-500" />
      
      <div className="relative z-20 p-6 -mt-20">
        <div className="flex gap-2 mb-4 flex-wrap">
          {tags.map(tag => (
            <span key={tag} className="px-3 py-1 text-xs font-mono rounded-full bg-white/10 text-white/90 border border-white/5 backdrop-blur-sm">
              {tag}
            </span>
          ))}
        </div>
        
        <h3 className="text-2xl font-display font-bold text-white mb-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
        
        <p className="text-gray-400 mb-6 line-clamp-3">
          {description}
        </p>
        
        <div className="flex gap-4">
          <button className="flex items-center gap-2 text-sm text-white/80 hover:text-white font-medium transition-colors">
            <ExternalLink size={16} /> View Live
          </button>
          <button className="flex items-center gap-2 text-sm text-white/80 hover:text-white font-medium transition-colors">
            <Github size={16} /> Source Code
          </button>
        </div>
      </div>
    </motion.div>
  );
}
