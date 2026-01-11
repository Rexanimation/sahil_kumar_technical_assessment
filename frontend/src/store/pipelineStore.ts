import { create } from 'zustand';
import { Node, Edge } from 'reactflow';

interface PipelineState {
  nodes: Node[];
  edges: Edge[];
  selectedNodeId: string | null;
  isValidating: boolean;
  nodeCount: number;
  edgeCount: number;
  
  // Actions
  setNodes: (nodes: Node[] | ((prev: Node[]) => Node[])) => void;
  setEdges: (edges: Edge[] | ((prev: Edge[]) => Edge[])) => void;
  addNode: (node: Node) => void;
  removeNode: (nodeId: string) => void;
  updateNodeData: (nodeId: string, data: Partial<Node['data']>) => void;
  setSelectedNodeId: (id: string | null) => void;
  setIsValidating: (isValidating: boolean) => void;
  clearPipeline: () => void;
  
  // Batch operations for performance
  batchAddNodes: (nodes: Node[]) => void;
  batchRemoveNodes: (nodeIds: string[]) => void;
}

export const usePipelineStore = create<PipelineState>((set, get) => ({
  nodes: [],
  edges: [],
  selectedNodeId: null,
  isValidating: false,
  nodeCount: 0,
  edgeCount: 0,
  
  setNodes: (nodesOrUpdater) => {
    set((state) => {
      const newNodes = typeof nodesOrUpdater === 'function' 
        ? nodesOrUpdater(state.nodes) 
        : nodesOrUpdater;
      return { nodes: newNodes, nodeCount: newNodes.length };
    });
  },
  
  setEdges: (edgesOrUpdater) => {
    set((state) => {
      const newEdges = typeof edgesOrUpdater === 'function'
        ? edgesOrUpdater(state.edges)
        : edgesOrUpdater;
      return { edges: newEdges, edgeCount: newEdges.length };
    });
  },
  
  addNode: (node) => {
    set((state) => ({
      nodes: [...state.nodes, node],
      nodeCount: state.nodeCount + 1,
    }));
  },
  
  removeNode: (nodeId) => {
    set((state) => ({
      nodes: state.nodes.filter((n) => n.id !== nodeId),
      edges: state.edges.filter((e) => e.source !== nodeId && e.target !== nodeId),
      nodeCount: state.nodeCount - 1,
    }));
  },
  
  updateNodeData: (nodeId, data) => {
    set((state) => ({
      nodes: state.nodes.map((node) =>
        node.id === nodeId ? { ...node, data: { ...node.data, ...data } } : node
      ),
    }));
  },
  
  setSelectedNodeId: (id) => set({ selectedNodeId: id }),
  
  setIsValidating: (isValidating) => set({ isValidating }),
  
  clearPipeline: () => set({ 
    nodes: [], 
    edges: [], 
    nodeCount: 0, 
    edgeCount: 0,
    selectedNodeId: null,
  }),
  
  // Batch operations for handling thousands of nodes efficiently
  batchAddNodes: (nodes) => {
    set((state) => ({
      nodes: [...state.nodes, ...nodes],
      nodeCount: state.nodeCount + nodes.length,
    }));
  },
  
  batchRemoveNodes: (nodeIds) => {
    const nodeIdSet = new Set(nodeIds);
    set((state) => ({
      nodes: state.nodes.filter((n) => !nodeIdSet.has(n.id)),
      edges: state.edges.filter((e) => !nodeIdSet.has(e.source) && !nodeIdSet.has(e.target)),
      nodeCount: state.nodeCount - nodeIds.length,
    }));
  },
}));

// Selector hooks for performance optimization
export const useNodeCount = () => usePipelineStore((state) => state.nodeCount);
export const useEdgeCount = () => usePipelineStore((state) => state.edgeCount);
export const useIsValidating = () => usePipelineStore((state) => state.isValidating);