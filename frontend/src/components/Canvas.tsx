import { memo, useMemo, useCallback, useRef, DragEvent, useState, useEffect } from 'react';
import ReactFlow, {
  Node,
  Edge,
  Connection,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  BackgroundVariant,
  MiniMap,
  ReactFlowProvider,
  ReactFlowInstance,
  Panel,
  useReactFlow,
  Viewport,
} from 'reactflow';
import 'reactflow/dist/style.css';

import { nodeTypes } from '@/nodes';
import { validatePipeline, ValidationResult } from '@/utils/dagHelpers';
import { pipelineApi } from '@/services/api';
import Sidebar from '@/components/Sidebar';
import TopBar from '@/components/TopBar';
import StatusBar from '@/components/StatusBar';
import NodeCounter from '@/components/NodeCounter';
import { NODE_TYPE_COLORS, generateNodeId, generateTestNodes, generateTestEdges } from '@/hooks/usePerformance';

// Initial nodes for demo
const initialNodes: Node[] = [
  {
    id: 'input-1',
    type: 'inputNode',
    position: { x: 100, y: 150 },
    data: { inputName: 'user_query' },
  },
  {
    id: 'text-1',
    type: 'textNode',
    position: { x: 400, y: 100 },
    data: { text: 'Process {{user_query}} with context: {{context}}' },
  },
  {
    id: 'llm-1',
    type: 'llmNode',
    position: { x: 700, y: 150 },
    data: { model: 'gpt-4' },
  },
  {
    id: 'output-1',
    type: 'outputNode',
    position: { x: 1000, y: 180 },
    data: { outputName: 'response' },
  },
];

const initialEdges: Edge[] = [
  { id: 'e1-2', source: 'input-1', target: 'text-1', sourceHandle: 'output', targetHandle: 'user_query' },
  { id: 'e2-3', source: 'text-1', target: 'llm-1', sourceHandle: 'output', targetHandle: 'prompt' },
  { id: 'e3-4', source: 'llm-1', target: 'output-1', sourceHandle: 'response', targetHandle: 'input' },
];

// Memoized MiniMap for performance
const MemoizedMiniMap = memo(function MemoizedMiniMap() {
  return (
    <MiniMap
      className="!bg-card/90 !border-border !rounded-xl !backdrop-blur-sm"
      nodeColor={(node) => NODE_TYPE_COLORS[node.type || ''] || 'hsl(230, 25%, 14%)'}
      maskColor="hsla(230, 25%, 5%, 0.8)"
      pannable
      zoomable
    />
  );
});

// Performance-optimized Canvas
function PipelineCanvas() {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);
  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null);
  const [isValidating, setIsValidating] = useState(false);
  const [viewport, setViewport] = useState<Viewport>({ x: 0, y: 0, zoom: 1 });

  // Memoize node types to prevent re-renders
  const memoizedNodeTypes = useMemo(() => nodeTypes, []);

  // Memoize edge options
  const defaultEdgeOptions = useMemo(() => ({
    type: 'smoothstep',
    animated: false,
    style: {
      strokeWidth: 2.5,
      stroke: 'hsl(265, 89%, 62%)',
    },
  }), []);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge({
      ...params,
      ...defaultEdgeOptions,
    }, eds)),
    [setEdges, defaultEdgeOptions]
  );

  const onDragOver = useCallback((event: DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: DragEvent) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow');
      if (!type || !reactFlowInstance) return;

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode: Node = {
        id: generateNodeId(),
        type,
        position,
        data: {},
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes]
  );

  // Optimized validation with Web Worker potential
  const handleSubmit = useCallback(async () => {
    setIsValidating(true);

    try {
      const result = await pipelineApi.parsePipeline(nodes, edges);
      setValidationResult(result);
    } catch (error) {
      console.error("Validation failed", error);
    } finally {
      setIsValidating(false);
    }
  }, [nodes, edges]);

  const handleClear = useCallback(() => {
    setNodes([]);
    setEdges([]);
    setValidationResult(null);
  }, [setNodes, setEdges]);

  // Stress test function
  const handleStressTest = useCallback((count: number) => {
    const testNodes = generateTestNodes(count);
    const testEdges = generateTestEdges(testNodes);
    setNodes(testNodes);
    setEdges(testEdges);
    setValidationResult(null);
  }, [setNodes, setEdges]);

  // Track viewport changes for virtualization
  const onMoveEnd = useCallback((_: unknown, vp: Viewport) => {
    setViewport(vp);
  }, []);

  return (
    <div className="flex flex-col h-screen w-full bg-background">
      <TopBar
        onSubmit={handleSubmit}
        onClear={handleClear}
        onStressTest={handleStressTest}
        isValidating={isValidating}
        nodeCount={nodes.length}
        edgeCount={edges.length}
      />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar />

        <div className="flex-1 relative gpu-accelerated" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onMoveEnd={onMoveEnd}
            nodeTypes={memoizedNodeTypes}
            defaultEdgeOptions={defaultEdgeOptions}
            fitView
            snapToGrid
            snapGrid={[16, 16]}
            minZoom={0.1}
            maxZoom={2}
            nodesDraggable
            nodesConnectable
            elementsSelectable
            // Performance optimizations
            deleteKeyCode="Delete"
            selectionKeyCode="Shift"
            multiSelectionKeyCode="Meta"
            panOnDrag
            panOnScroll={false}
            zoomOnScroll
            zoomOnPinch
            preventScrolling
          >
            <Controls
              className="!bg-card/90 !border-border !rounded-xl !shadow-lg !backdrop-blur-sm"
              showZoom
              showFitView
              showInteractive
            />
            <MemoizedMiniMap />
            <Background
              variant={BackgroundVariant.Dots}
              gap={24}
              size={1.5}
              color="hsl(230, 25%, 15%)"
            />

            {/* Node counter panel */}
            <Panel position="top-right" className="!m-4">
              <NodeCounter
                nodeCount={nodes.length}
                edgeCount={edges.length}
                viewport={viewport}
              />
            </Panel>
          </ReactFlow>
        </div>
      </div>

      <StatusBar result={validationResult} nodeCount={nodes.length} />
    </div>
  );
}

export default function Canvas() {
  return (
    <ReactFlowProvider>
      <PipelineCanvas />
    </ReactFlowProvider>
  );
}