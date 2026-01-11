import { memo, useState } from 'react';
import { NodeProps } from 'reactflow';
import { Calculator } from 'lucide-react';
import BaseNode from './BaseNode';

const operations = [
  { value: 'add', label: 'Add (+)' },
  { value: 'subtract', label: 'Subtract (-)' },
  { value: 'multiply', label: 'Multiply (×)' },
  { value: 'divide', label: 'Divide (÷)' },
];

function MathNode({ data, selected }: NodeProps) {
  const [operation, setOperation] = useState(data.operation || 'add');

  return (
    <BaseNode
      title="Math"
      icon={<Calculator className="w-4 h-4 icon-math" />}
      accentClass="node-accent-math"
      inputs={[{ id: 'a' }, { id: 'b' }]}
      outputs={[{ id: 'result' }]}
      selected={selected}
    >
      <div className="space-y-2">
        <label className="text-xs text-muted-foreground">Operation</label>
        <select
          value={operation}
          onChange={(e) => setOperation(e.target.value)}
          className="w-full px-2 py-1.5 text-sm bg-secondary rounded border border-input focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        >
          {operations.map((op) => (
            <option key={op.value} value={op.value}>
              {op.label}
            </option>
          ))}
        </select>
        <div className="flex items-center justify-between text-xs text-muted-foreground pt-1">
          <span>a →</span>
          <span>← b</span>
        </div>
      </div>
    </BaseNode>
  );
}

export default memo(MathNode);
