import { memo, useState } from 'react';
import { NodeProps } from 'reactflow';
import { Clock } from 'lucide-react';
import BaseNode from './BaseNode';

function DelayNode({ data, selected }: NodeProps) {
  const [delay, setDelay] = useState(data.delay || 1000);

  return (
    <BaseNode
      title="Delay"
      icon={<Clock className="w-4 h-4 icon-delay" />}
      accentClass="node-accent-delay"
      inputs={[{ id: 'input' }]}
      outputs={[{ id: 'output' }]}
      selected={selected}
    >
      <div className="space-y-2">
        <label className="text-xs text-muted-foreground">Delay (ms)</label>
        <input
          type="number"
          value={delay}
          onChange={(e) => setDelay(Number(e.target.value))}
          min={0}
          step={100}
          className="w-full px-2 py-1.5 text-sm bg-secondary rounded border border-input focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
        <p className="text-xs text-muted-foreground">
          Waits {delay}ms before passing data
        </p>
      </div>
    </BaseNode>
  );
}

export default memo(DelayNode);
