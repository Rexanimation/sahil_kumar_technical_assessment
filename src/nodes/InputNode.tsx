import { memo, useState } from 'react';
import { NodeProps } from 'reactflow';
import { Upload } from 'lucide-react';
import BaseNode from './BaseNode';

function InputNode({ data, selected }: NodeProps) {
  const [inputName, setInputName] = useState(data.inputName || 'input_data');

  return (
    <BaseNode
      title="Input"
      icon={<Upload className="w-4 h-4 icon-input" />}
      accentClass="node-accent-input"
      outputs={[{ id: 'output' }]}
      selected={selected}
    >
      <div className="space-y-2">
        <label className="text-xs text-muted-foreground">Variable Name</label>
        <input
          type="text"
          value={inputName}
          onChange={(e) => setInputName(e.target.value)}
          className="w-full px-2 py-1.5 text-sm bg-secondary rounded border border-input focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          placeholder="input_data"
        />
      </div>
    </BaseNode>
  );
}

export default memo(InputNode);
