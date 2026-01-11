import { Node, Edge } from 'reactflow';

interface AdjacencyList {
  [key: string]: string[];
}

/**
 * Build adjacency list from edges
 */
function buildAdjacencyList(nodes: Node[], edges: Edge[]): AdjacencyList {
  const adj: AdjacencyList = {};
  
  // Initialize all nodes
  nodes.forEach(node => {
    adj[node.id] = [];
  });
  
  // Add edges
  edges.forEach(edge => {
    if (adj[edge.source]) {
      adj[edge.source].push(edge.target);
    }
  });
  
  return adj;
}

/**
 * Check if the graph is a DAG (Directed Acyclic Graph)
 * Uses DFS with cycle detection
 */
export function isDAG(nodes: Node[], edges: Edge[]): boolean {
  if (nodes.length === 0) return true;
  
  const adj = buildAdjacencyList(nodes, edges);
  const visited = new Set<string>();
  const recStack = new Set<string>();
  
  function hasCycle(nodeId: string): boolean {
    visited.add(nodeId);
    recStack.add(nodeId);
    
    const neighbors = adj[nodeId] || [];
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        if (hasCycle(neighbor)) return true;
      } else if (recStack.has(neighbor)) {
        return true;
      }
    }
    
    recStack.delete(nodeId);
    return false;
  }
  
  // Check all nodes (handles disconnected components)
  for (const node of nodes) {
    if (!visited.has(node.id)) {
      if (hasCycle(node.id)) return false;
    }
  }
  
  return true;
}

/**
 * Validate pipeline and return structured result
 */
export interface ValidationResult {
  numNodes: number;
  numEdges: number;
  isDAG: boolean;
  message: string;
}

export function validatePipeline(nodes: Node[], edges: Edge[]): ValidationResult {
  const numNodes = nodes.length;
  const numEdges = edges.length;
  const dagValid = isDAG(nodes, edges);
  
  let message: string;
  if (numNodes === 0) {
    message = "Pipeline is empty. Add some nodes to get started.";
  } else if (!dagValid) {
    message = "Pipeline contains a cycle! Please remove circular connections.";
  } else if (numEdges === 0 && numNodes > 1) {
    message = "Pipeline is valid but nodes are not connected.";
  } else {
    message = `Pipeline is valid! ${numNodes} nodes, ${numEdges} edges.`;
  }
  
  return { numNodes, numEdges, isDAG: dagValid, message };
}
