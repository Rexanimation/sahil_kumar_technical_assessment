import { memo, useState } from 'react';
import { NodeProps } from 'reactflow';
import { GitMerge } from 'lucide-react';
import BaseNode from './BaseNode';

const mergeStrategies = [
  { value: 'concat', label: 'Concatenate' },
  { value: 'object', label: 'Merge Object' },
  { value: 'array', label: 'Collect Array' },
];

function MergeNode({ data, selected }: NodeProps) {
  const [strategy, setStrategy] = useState(data.strategy || 'concat');

  return (
    <BaseNode
      title="Merge"
      icon={<GitMerge className="w-4 h-4 icon-merge" />}
      accentClass="node-accent-merge"
      inputs={[{ id: 'input1' }, { id: 'input2' }]}
      outputs={[{ id: 'merged' }]}
      selected={selected}
    >
      <div className="space-y-2">
        <label className="text-xs text-muted-foreground">Strategy</label>
        <select
          value={strategy}
          onChange={(e) => setStrategy(e.target.value)}
          className="w-full px-2 py-1.5 text-sm bg-secondary rounded border border-input focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        >
          {mergeStrategies.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </div>
    </BaseNode>
  );
}

export default memo(MergeNode);
