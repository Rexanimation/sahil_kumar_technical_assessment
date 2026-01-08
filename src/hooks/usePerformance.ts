import { useCallback, useMemo } from 'react';
import { Node, Edge } from 'reactflow';

// Generate unique IDs efficiently
let nodeIdCounter = 0;
export const generateNodeId = () => `node-${Date.now()}-${++nodeIdCounter}`;

// Memoized node colors for performance
export const NODE_TYPE_COLORS: Record<string, string> = {
  inputNode: 'hsl(152, 76%, 48%)',
  outputNode: 'hsl(199, 89%, 52%)',
  llmNode: 'hsl(43, 96%, 56%)',
  textNode: 'hsl(265, 89%, 62%)',
  mathNode: 'hsl(0, 84%, 60%)',
  delayNode: 'hsl(185, 84%, 42%)',
  mergeNode: 'hsl(280, 72%, 58%)',
  conditionNode: 'hsl(35, 100%, 55%)',
} as const;

// Performance hook for virtualized node rendering
export function useVirtualizedNodes(
  nodes: Node[],
  viewport: { x: number; y: number; zoom: number },
  containerSize: { width: number; height: number }
) {
  return useMemo(() => {
    if (nodes.length < 100) return nodes; // Skip virtualization for small graphs
    
    const padding = 200; // Extra padding for smooth scrolling
    const viewBounds = {
      minX: -viewport.x / viewport.zoom - padding,
      maxX: (-viewport.x + containerSize.width) / viewport.zoom + padding,
      minY: -viewport.y / viewport.zoom - padding,
      maxY: (-viewport.y + containerSize.height) / viewport.zoom + padding,
    };
    
    return nodes.filter((node) => {
      const { x, y } = node.position;
      const nodeWidth = 280; // Max node width
      const nodeHeight = 150; // Estimated node height
      
      return (
        x + nodeWidth >= viewBounds.minX &&
        x <= viewBounds.maxX &&
        y + nodeHeight >= viewBounds.minY &&
        y <= viewBounds.maxY
      );
    });
  }, [nodes, viewport.x, viewport.y, viewport.zoom, containerSize.width, containerSize.height]);
}

// Debounce hook for performance
export function useDebounce<T extends (...args: unknown[]) => void>(
  callback: T,
  delay: number
): T {
  const timeoutRef = { current: null as NodeJS.Timeout | null };
  
  return useCallback(
    ((...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    }) as T,
    [callback, delay]
  );
}

// Throttle hook for high-frequency updates
export function useThrottle<T extends (...args: unknown[]) => void>(
  callback: T,
  limit: number
): T {
  const lastRun = { current: Date.now() };
  
  return useCallback(
    ((...args: Parameters<T>) => {
      if (Date.now() - lastRun.current >= limit) {
        callback(...args);
        lastRun.current = Date.now();
      }
    }) as T,
    [callback, limit]
  );
}

// Batch node generation for stress testing
export function generateTestNodes(count: number, startX = 0, startY = 0): Node[] {
  const nodeTypes = ['inputNode', 'outputNode', 'llmNode', 'textNode', 'mathNode', 'delayNode'];
  const cols = Math.ceil(Math.sqrt(count));
  const spacing = { x: 300, y: 200 };
  
  return Array.from({ length: count }, (_, i) => ({
    id: generateNodeId(),
    type: nodeTypes[i % nodeTypes.length],
    position: {
      x: startX + (i % cols) * spacing.x,
      y: startY + Math.floor(i / cols) * spacing.y,
    },
    data: {},
  }));
}

// Edge generation for test nodes
export function generateTestEdges(nodes: Node[]): Edge[] {
  const edges: Edge[] = [];
  
  for (let i = 0; i < nodes.length - 1; i++) {
    // Connect to next node in row
    if ((i + 1) % Math.ceil(Math.sqrt(nodes.length)) !== 0) {
      edges.push({
        id: `edge-${nodes[i].id}-${nodes[i + 1].id}`,
        source: nodes[i].id,
        target: nodes[i + 1].id,
        sourceHandle: 'output',
        targetHandle: 'input',
      });
    }
  }
  
  return edges;
}