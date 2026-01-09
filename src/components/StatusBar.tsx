import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, AlertCircle, Info, Cpu, Activity } from 'lucide-react';
import { ValidationResult } from '@/utils/dagHelpers';
import { cn } from '@/lib/utils';

interface StatusBarProps {
  result: ValidationResult | null;
  nodeCount?: number;
  className?: string;
}

export default function StatusBar({ result, nodeCount = 0, className }: StatusBarProps) {
  // Performance tier based on node count
  const getPerformanceTier = () => {
    if (nodeCount < 50) return { label: 'Optimal', color: 'text-success' };
    if (nodeCount < 200) return { label: 'Good', color: 'text-success' };
    if (nodeCount < 500) return { label: 'Moderate', color: 'text-warning' };
    if (nodeCount < 1000) return { label: 'Heavy', color: 'text-warning' };
    return { label: 'Extreme', color: 'text-destructive' };
  };

  const performanceTier = getPerformanceTier();

  if (!result) {
    return (
      <footer
        className={cn(
          'h-12 bg-card/80 backdrop-blur-md border-t border-border flex items-center justify-between px-6',
          className
        )}
      >
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Activity className="w-4 h-4" />
            <span className="text-sm">Ready</span>
          </div>
          <span className="text-xs text-muted-foreground">
            Drag nodes and connect them to build your pipeline
          </span>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-muted-foreground" />
            <span className={cn('text-xs font-mono font-medium', performanceTier.color)}>
              {performanceTier.label}
            </span>
          </div>
        </div>
      </footer>
    );
  }

  const getStatusConfig = () => {
    if (result.numNodes === 0) {
      return {
        icon: Info,
        bg: 'bg-muted',
        text: 'text-muted-foreground',
        label: 'Empty',
        glow: '',
      };
    }
    if (!result.isDAG) {
      return {
        icon: XCircle,
        bg: 'bg-destructive/15',
        text: 'text-destructive',
        label: 'Invalid',
        glow: 'shadow-[0_0_12px_-2px_hsl(0_84%_60%/0.5)]',
      };
    }
    if (result.numEdges === 0 && result.numNodes > 1) {
      return {
        icon: AlertCircle,
        bg: 'bg-warning/15',
        text: 'text-warning',
        label: 'Warning',
        glow: 'shadow-[0_0_12px_-2px_hsl(43_96%_56%/0.5)]',
      };
    }
    return {
      icon: CheckCircle,
      bg: 'bg-success/15',
      text: 'text-success',
      label: 'Valid',
      glow: 'shadow-[0_0_12px_-2px_hsl(152_76%_48%/0.5)]',
    };
  };

  const config = getStatusConfig();
  const Icon = config.icon;

  return (
    <footer
      className={cn(
        'h-12 bg-card/80 backdrop-blur-md border-t border-border flex items-center px-4 md:px-6 relative',
        className
      )}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={result.message}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="flex items-center justify-between w-full"
        >
          <div className="flex items-center gap-3 md:gap-6 flex-1 min-w-0">
            <motion.div
              className={cn('status-badge shrink-0', config.bg, config.text, config.glow)}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <Icon className="w-3.5 h-3.5" />
              {config.label}
            </motion.div>

            <p className="text-sm text-foreground flex-1 font-medium truncate">{result.message}</p>
          </div>

          <div className="flex items-center gap-3 md:gap-6 text-xs font-mono shrink-0 ml-2">
            <div className="hidden sm:flex items-center gap-2">
              <span className="text-muted-foreground">Nodes</span>
              <span className="text-primary font-bold">{result.numNodes.toLocaleString()}</span>
            </div>
            <div className="hidden sm:flex items-center gap-2">
              <span className="text-muted-foreground">Edges</span>
              <span className="text-primary font-bold">{result.numEdges.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground hidden sm:inline">DAG</span>
              <span className={cn(
                'font-bold',
                result.isDAG ? 'text-success' : 'text-destructive'
              )}>
                {result.isDAG ? 'VALID' : 'INVALID'}
              </span>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </footer>
  );
}