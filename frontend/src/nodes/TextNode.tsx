import { memo, useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { NodeProps, Handle, Position } from 'reactflow';
import { Type } from 'lucide-react';
import { cn } from '@/lib/utils';
import { extractVariables } from '@/utils/textParser';
import { NODE_STYLES } from './constants';

function TextNode({ data, selected }: NodeProps) {
  const [text, setText] = useState(data.text || 'Hello {{name}}, your score is {{score}}');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Extract dynamic variables from text - memoized for performance
  const variables = useMemo(() => extractVariables(text), [text]);

  // Debounced auto-resize for performance
  const resizeTextarea = useCallback(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.max(60, Math.min(textarea.scrollHeight, 200))}px`;
    }
  }, []);

  useEffect(() => {
    resizeTextarea();
  }, [text, resizeTextarea]);

  return (
    <div
      className={cn(
        `pipeline-node min-w-[240px] max-w-[320px] node-accent-text ${NODE_STYLES.GPU}`,
        selected && `selected ${NODE_STYLES.SELECTED_RING}`
      )}
    >
      {/* Header */}
      <div className="flex items-center gap-2.5 px-3.5 py-2.5 border-b border-border/50 bg-secondary/20">
        <Type className="w-4 h-4 icon-text flex-shrink-0" />
        <span className="font-display font-semibold text-sm">Text Template</span>
        {variables.length > 0 && (
          <span className="ml-auto text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full font-mono font-medium">
            {variables.length} var{variables.length > 1 ? 's' : ''}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-3.5">
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full px-3 py-2 text-sm font-code bg-secondary/50 rounded-lg border border-input focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none min-h-[60px] transition-all"
          placeholder="Enter text with {{variables}}"
          spellCheck={false}
        />

        {variables.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {variables.map((v) => (
              <span
                key={v}
                className="text-xs bg-primary/10 border border-primary/20 px-2 py-1 rounded-md text-primary font-mono font-medium"
              >
                {`{{${v}}}`}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Dynamic input handles for each variable */}
      {variables.map((variable, index) => (
        <Handle
          key={variable}
          type="target"
          position={Position.Left}
          id={variable}
          style={{
            top: `${((index + 1) / (variables.length + 1)) * 100}%`,
          }}
          className={`${NODE_STYLES.HANDLE_BASE} ${NODE_STYLES.HANDLE_HOVER}`}
          title={variable}
        />
      ))}

      {/* Output handle */}
      <Handle
        type="source"
        position={Position.Right}
        id="output"
        style={{ top: '50%' }}
        className={`${NODE_STYLES.HANDLE_BASE} ${NODE_STYLES.HANDLE_HOVER}`}
      />
    </div>
  );
}

export default memo(TextNode);