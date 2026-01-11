import { memo, useState } from 'react';
import { NodeProps } from 'reactflow';
import { Bot } from 'lucide-react';
import BaseNode from './BaseNode';

const models = ['gpt-4', 'gpt-3.5-turbo', 'claude-3', 'llama-2'];

function LLMNode({ data, selected }: NodeProps) {
  const [model, setModel] = useState(data.model || 'gpt-4');

  return (
    <BaseNode
      title="LLM"
      icon={<Bot className="w-4 h-4 icon-llm" />}
      accentClass="node-accent-llm"
      inputs={[{ id: 'system' }, { id: 'prompt' }]}
      outputs={[{ id: 'response' }]}
      selected={selected}
    >
      <div className="space-y-3">
        <div className="space-y-1">
          <label className="text-xs text-muted-foreground">Model</label>
          <select
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="w-full px-2 py-1.5 text-sm bg-secondary rounded border border-input focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          >
            {models.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>system →</span>
          <span>← prompt</span>
        </div>
      </div>
    </BaseNode>
  );
}

export default memo(LLMNode);
