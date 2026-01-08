import { memo, useState } from 'react';
import { NodeProps } from 'reactflow';
import { Download } from 'lucide-react';
import BaseNode from './BaseNode';

function OutputNode({ data, selected }: NodeProps) {
  const [outputName, setOutputName] = useState(data.outputName || 'result');

  return (
    <BaseNode
      title="Output"
      icon={<Download className="w-4 h-4 icon-output" />}
      accentClass="node-accent-output"
      inputs={[{ id: 'input' }]}
      selected={selected}
    >
      <div className="space-y-2">
        <label className="text-xs text-muted-foreground">Output Name</label>
        <input
          type="text"
          value={outputName}
          onChange={(e) => setOutputName(e.target.value)}
          className="w-full px-2 py-1.5 text-sm bg-secondary rounded border border-input focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          placeholder="result"
        />
      </div>
    </BaseNode>
  );
}

export default memo(OutputNode);
