import { Node, Edge } from 'reactflow';
import { ValidationResult } from '@/utils/dagHelpers';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

export const pipelineApi = {
  async parsePipeline(nodes: Node[], edges: Edge[]): Promise<ValidationResult> {
    try {
      const response = await fetch(`${API_URL}/pipelines/parse`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nodes, edges }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }

      const data = await response.json();
      return {
        numNodes: data.num_nodes,
        numEdges: data.num_edges,
        isDAG: data.is_dag,
        message: data.message,
      };
    } catch (error) {
      console.error('Pipeline validation error:', error);
      return {
        numNodes: nodes.length,
        numEdges: edges.length,
        isDAG: false,
        message: 'Failed to connect to validation server. Is the backend running?',
      };
    }
  }
};
