import { memo, useState } from 'react';
import { NodeProps } from 'reactflow';
import { GitBranch } from 'lucide-react';
import BaseNode from './BaseNode';

const conditions = [
  { value: 'equals', label: 'Equals (==)' },
  { value: 'not_equals', label: 'Not Equals (!=)' },
  { value: 'greater', label: 'Greater Than (>)' },
  { value: 'less', label: 'Less Than (<)' },
  { value: 'contains', label: 'Contains' },
  { value: 'empty', label: 'Is Empty' },
];

function ConditionNode({ data, selected }: NodeProps) {
  const [condition, setCondition] = useState(data.condition || 'equals');
  const [compareValue, setCompareValue] = useState(data.compareValue || '');

  return (
    <BaseNode
      title="Condition"
      icon={<GitBranch className="w-4 h-4 icon-condition" />}
      accentClass="node-accent-condition"
      inputs={[{ id: 'value' }]}
      outputs={[{ id: 'true' }, { id: 'false' }]}
      selected={selected}
    >
      <div className="space-y-2">
        <div>
          <label className="text-xs text-muted-foreground">Condition</label>
          <select
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
            className="w-full px-2 py-1.5 text-sm bg-secondary rounded border border-input focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          >
            {conditions.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
        </div>
        {condition !== 'empty' && (
          <div>
            <label className="text-xs text-muted-foreground">Compare To</label>
            <input
              type="text"
              value={compareValue}
              onChange={(e) => setCompareValue(e.target.value)}
              className="w-full px-2 py-1.5 text-sm bg-secondary rounded border border-input focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              placeholder="Value"
            />
          </div>
        )}
        <div className="flex items-center justify-between text-xs text-muted-foreground pt-1">
          <span className="text-success">✓ true</span>
          <span className="text-destructive">✗ false</span>
        </div>
      </div>
    </BaseNode>
  );
}

export default memo(ConditionNode);
