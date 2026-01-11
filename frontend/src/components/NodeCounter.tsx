import { memo } from 'react';
import { motion } from 'framer-motion';
import { Layers, GitBranch, Zap, Eye } from 'lucide-react';
import { Viewport } from 'reactflow';

interface NodeCounterProps {
  nodeCount: number;
  edgeCount: number;
  viewport: Viewport;
}

function NodeCounter({ nodeCount, edgeCount, viewport }: NodeCounterProps) {
  const zoomPercent = Math.round(viewport.zoom * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-2 md:gap-3 bg-card/80 backdrop-blur-md p-2 rounded-lg border border-border shadow-sm"
    >
      {/* Node count */}
      <div className="flex items-center gap-1.5 md:gap-2">
        <Layers className="w-3.5 h-3.5 md:w-4 md:h-4 text-muted-foreground" />
        <span className="text-muted-foreground hidden md:inline text-xs">Nodes:</span>
        <span className="text-xs font-mono font-medium">{nodeCount.toLocaleString()}</span>
      </div>

      {/* Edge count */}
      <div className="flex items-center gap-1.5 md:gap-2 border-l border-border pl-2 md:pl-3">
        <GitBranch className="w-3.5 h-3.5 md:w-4 md:h-4 text-muted-foreground" />
        <span className="text-muted-foreground hidden md:inline text-xs">Edges:</span>
        <span className="text-xs font-mono font-medium">{edgeCount.toLocaleString()}</span>
      </div>

      {/* Zoom level */}
      <div className="flex items-center gap-1.5 md:gap-2 border-l border-border pl-2 md:pl-3 min-w-[3rem] justify-center">
        <Eye className="w-3.5 h-3.5 md:w-4 md:h-4 text-muted-foreground" />
        <span className="text-xs font-mono font-medium">{zoomPercent}%</span>
      </div>

      {/* Performance indicator */}
      {nodeCount >= 100 && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="flex items-center gap-1.5 md:gap-2 border-l border-border pl-2 md:pl-3"
        >
          <Zap className="w-3.5 h-3.5 md:w-4 md:h-4 text-warning" />
          <span className="text-warning text-[10px] md:text-xs font-semibold whitespace-nowrap">
            {nodeCount >= 1000 ? 'Heavy' : 'Optimized'}
          </span>
        </motion.div>
      )}
    </motion.div>
  );
}

export default memo(NodeCounter);