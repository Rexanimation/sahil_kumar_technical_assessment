import { cn } from '@/lib/utils';
import { Github, Linkedin, Instagram } from 'lucide-react';

interface FooterProps {
  className?: string;
}

export default function Footer({ className }: FooterProps) {
  return (
    <footer
      className={cn(
        'py-8 border-t border-border bg-card/50 backdrop-blur-sm',
        className
      )}
    >
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm text-muted-foreground font-mono">
          © 2026 All rights reserved — <span className="text-foreground font-semibold">SAHIL KUMAR</span>
        </p>

        <div className="flex justify-center gap-6 mt-4">
          <a
            href="https://github.com/Rexanimation"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href="https://www.linkedin.com/in/sahilkumar005/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a
            href="https://www.instagram.com/rexanimation.editz/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Instagram className="w-5 h-5" />
          </a>
        </div>

        <p className="text-xs text-muted-foreground mt-4">
          Built with React Flow • Industry Ready Pipeline Builder
        </p>
      </div>
    </footer>
  );
}