import { Handle, Position } from 'reactflow';
import { ReactNode, memo } from 'react';
import { cn } from '@/lib/utils';
import { NODE_STYLES } from './constants';

interface HandleConfig {
  id: string;
  label?: string;
  type?: 'source' | 'target';
}

interface BaseNodeProps {
  title: string;
  icon?: ReactNode;
  accentClass?: string;
  inputs?: HandleConfig[];
  outputs?: HandleConfig[];
  children?: ReactNode;
  selected?: boolean;
}

function BaseNode({
  title,
  icon,
  accentClass = '',
  inputs = [],
  outputs = [],
  children,
  selected = false,
}: BaseNodeProps) {
  return (
    <div
      className={cn(
        `pipeline-node ${NODE_STYLES.MIN_WIDTH} ${NODE_STYLES.MAX_WIDTH} ${NODE_STYLES.GPU}`,
        accentClass,
        selected && `selected ${NODE_STYLES.SELECTED_RING}`
      )}
    >
      {/* Header */}
      <div className="flex items-center gap-2.5 px-3.5 py-2.5 border-b border-border/50 bg-secondary/20">
        {icon && <span className="flex-shrink-0">{icon}</span>}
        <span className="font-display font-semibold text-sm truncate">{title}</span>
      </div>

      {/* Content */}
      <div className="p-3.5 relative">
        {children}
      </div>

      {/* Input Handles */}
      {inputs.map((input, index) => (
        <Handle
          key={input.id}
          type="target"
          position={Position.Left}
          id={input.id}
          style={{
            top: `${((index + 1) / (inputs.length + 1)) * 100}%`,
          }}
          className={`${NODE_STYLES.HANDLE_BASE} ${NODE_STYLES.HANDLE_HOVER}`}
        />
      ))}

      {/* Output Handles */}
      {outputs.map((output, index) => (
        <Handle
          key={output.id}
          type="source"
          position={Position.Right}
          id={output.id}
          style={{
            top: `${((index + 1) / (outputs.length + 1)) * 100}%`,
          }}
          className={`${NODE_STYLES.HANDLE_BASE} ${NODE_STYLES.HANDLE_HOVER}`}
        />
      ))}
    </div>
  );
}

export default memo(BaseNode);