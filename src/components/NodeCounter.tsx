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
      className="flex items-center gap-3"
    >
      {/* Node count */}
      <div className="node-counter">
        <Layers className="w-4 h-4 text-muted-foreground" />
        <span className="text-muted-foreground">Nodes:</span>
        <span className="count">{nodeCount.toLocaleString()}</span>
      </div>
      
      {/* Edge count */}
      <div className="node-counter">
        <GitBranch className="w-4 h-4 text-muted-foreground" />
        <span className="text-muted-foreground">Edges:</span>
        <span className="count">{edgeCount.toLocaleString()}</span>
      </div>
      
      {/* Zoom level */}
      <div className="node-counter">
        <Eye className="w-4 h-4 text-muted-foreground" />
        <span className="count">{zoomPercent}%</span>
      </div>
      
      {/* Performance indicator */}
      {nodeCount >= 100 && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="node-counter"
        >
          <Zap className="w-4 h-4 text-warning" />
          <span className="text-warning text-xs font-semibold">
            {nodeCount >= 1000 ? 'Heavy Load' : 'Optimized'}
          </span>
        </motion.div>
      )}
    </motion.div>
  );
}

export default memo(NodeCounter);