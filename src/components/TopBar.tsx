import { motion } from 'framer-motion';
import { Play, RotateCcw, Workflow, Zap, FlaskConical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Link } from 'react-router-dom';

interface TopBarProps {
  onSubmit: () => void;
  onClear: () => void;
  onStressTest?: (count: number) => void;
  isValidating?: boolean;
  nodeCount?: number;
  edgeCount?: number;
  className?: string;
}

export default function TopBar({
  onSubmit,
  onClear,
  onStressTest,
  isValidating = false,
  nodeCount = 0,
  edgeCount = 0,
  className,
}: TopBarProps) {
  const stressTestCounts = [50, 100, 250, 500, 1000];

  return (
    <header
      className={cn(
        'h-16 bg-card/80 backdrop-blur-md border-b border-border flex items-center justify-between px-6',
        className
      )}
    >
      <div className="flex items-center gap-4">
        <Link to="/" className="flex items-center gap-3 group">

          <div>
            <h1 className="font-display font-bold text-foreground group-hover:text-primary transition-colors">
              Pipeline Builder
            </h1>
            <p className="text-xs text-muted-foreground font-mono">
              v2.0 • Industry Ready
            </p>
          </div>
        </Link>
      </div>

      <div className="flex items-center gap-3">
        {/* Stress Test Dropdown */}
        {onStressTest && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button variant="outline" size="sm" className="gap-2 font-mono">
                  <FlaskConical className="w-4 h-4" />
                  Stress Test
                </Button>
              </motion.div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              {stressTestCounts.map((count) => (
                <DropdownMenuItem
                  key={count}
                  onClick={() => onStressTest(count)}
                  className="font-mono"
                >
                  <Zap className="w-4 h-4 mr-2 text-warning" />
                  Generate {count} nodes
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )}

        {/* Clear Button */}
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            variant="outline"
            size="sm"
            onClick={onClear}
            className="gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Clear
          </Button>
        </motion.div>

        {/* Submit Button */}
        <motion.div
          whileHover={{ scale: 1.02, boxShadow: '0 0 20px hsl(265 89% 62% / 0.3)' }}
          whileTap={{ scale: 0.98 }}
          className="rounded-md"
        >
          <Button
            size="sm"
            onClick={onSubmit}
            disabled={isValidating}
            className="gap-2 font-semibold"
          >
            {isValidating ? (
              <>
                <motion.div
                  className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                />
                Validating...
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                Submit Pipeline
              </>
            )}
          </Button>
        </motion.div>
      </div>
    </header>
  );
}