import InputNode from './InputNode';
import OutputNode from './OutputNode';
import LLMNode from './LLMNode';
import TextNode from './TextNode';
import MathNode from './MathNode';
import DelayNode from './DelayNode';
import MergeNode from './MergeNode';
import ConditionNode from './ConditionNode';

export const nodeTypes = {
  inputNode: InputNode,
  outputNode: OutputNode,
  llmNode: LLMNode,
  textNode: TextNode,
  mathNode: MathNode,
  delayNode: DelayNode,
  mergeNode: MergeNode,
  conditionNode: ConditionNode,
};

export interface NodeTypeConfig {
  type: string;
  label: string;
  description: string;
  icon: string;
  accentClass: string;
}

export const nodeTypeConfigs: NodeTypeConfig[] = [
  {
    type: 'inputNode',
    label: 'Input',
    description: 'Data entry point',
    icon: 'Upload',
    accentClass: 'icon-input',
  },
  {
    type: 'outputNode',
    label: 'Output',
    description: 'Data exit point',
    icon: 'Download',
    accentClass: 'icon-output',
  },
  {
    type: 'llmNode',
    label: 'LLM',
    description: 'Language model',
    icon: 'Bot',
    accentClass: 'icon-llm',
  },
  {
    type: 'textNode',
    label: 'Text',
    description: 'Template with variables',
    icon: 'Type',
    accentClass: 'icon-text',
  },
  {
    type: 'mathNode',
    label: 'Math',
    description: 'Arithmetic operations',
    icon: 'Calculator',
    accentClass: 'icon-math',
  },
  {
    type: 'delayNode',
    label: 'Delay',
    description: 'Wait before proceeding',
    icon: 'Clock',
    accentClass: 'icon-delay',
  },
  {
    type: 'mergeNode',
    label: 'Merge',
    description: 'Combine multiple inputs',
    icon: 'GitMerge',
    accentClass: 'icon-merge',
  },
  {
    type: 'conditionNode',
    label: 'Condition',
    description: 'Branch based on logic',
    icon: 'GitBranch',
    accentClass: 'icon-condition',
  },
];
