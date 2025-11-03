import { useState, useCallback, useEffect } from 'react';
import { z } from 'zod';
import type { DragEvent as ReactDragEvent } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  useReactFlow,
} from 'reactflow';
import type { Node, Edge, NodeChange, EdgeChange, Connection, BackgroundVariant } from 'reactflow';
import 'reactflow/dist/style.css';
import GroupNode from './GroupNode';
import DatasetNode from './DatasetNode';
import PromptNode from './PromptNode';


const initialNodes: Node<{ label: string }>[] = [
  { id: '1', type: 'dataset', position: { x: 250, y: 5 }, data: { label: 'Load Dataset' } },
  { id: '2', type: 'prompt', position: { x: 100, y: 100 }, data: { label: 'Prompt Template' } },
];

const initialEdges: Edge[] = [{ id: 'e1-2', source: '1', target: '2' }];

let id = 3;
const getId = () => `${id++}`;

const nodeTypes = {
  group: GroupNode,
  dataset: DatasetNode,
  prompt: PromptNode,
};

export default function Flow() {
  const [nodes, setNodes] = useState<Node<{ label: string }>[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);
  const reactFlowInstance = useReactFlow();

  useEffect(() => {
    const NodeItemSchema = z.object({
      id: z.string(),
      type: z.string().optional(),
      position: z.object({ x: z.number(), y: z.number() }).optional(),
      data: z.object({ label: z.string().optional() }).optional(),
    }).passthrough();

    const EdgeItemSchema = z.object({
      id: z.string(),
      source: z.string().optional(),
      target: z.string().optional(),
    }).passthrough();

    const handleMessage = (event: MessageEvent<unknown>) => {
      const parsed = z.object({ type: z.string(), payload: z.unknown() }).safeParse(event.data as unknown);
      if (!parsed.success) return;

      const { type, payload } = parsed.data;
      if (type === 'UPDATE_NODES') {
        const nodesParse = z.array(NodeItemSchema).safeParse(payload);
        if (nodesParse.success) {
          setNodes(nodesParse.data as Node<{ label: string }>[]);
        } else {
          // invalid payload; ignore or log
          console.warn('Invalid UPDATE_NODES payload received via postMessage', payload);
        }
      } else if (type === 'UPDATE_EDGES') {
        const edgesParse = z.array(EdgeItemSchema).safeParse(payload);
        if (edgesParse.success) {
          setEdges(edgesParse.data as Edge[]);
        } else {
          console.warn('Invalid UPDATE_EDGES payload received via postMessage', payload);
        }
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );
  const onConnect = useCallback(
    (connection: Connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  const onDragOver = useCallback((event: ReactDragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: ReactDragEvent<HTMLDivElement>) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow');

      // check if the dropped element is valid
      if (typeof type === 'undefined' || !type) {
        return;
      }

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      if (type === 'group') {
        const groupId = getId();
        const newNodes = [
          {
            id: groupId,
            type: 'group',
            position,
            data: { label: 'Image Editing' },
            style: {
              width: 400,
              height: 200,
            },
          },
          {
            id: getId(),
            type: 'input',
            data: { label: 'Input Image' },
            position: { x: 10, y: 10 },
            parentNode: groupId,
            extent: 'parent',
          },
          {
            id: getId(),
            type: 'default',
            data: { label: 'Prompt' },
            position: { x: 10, y: 90 },
            parentNode: groupId,
            extent: 'parent',
          },
          {
            id: getId(),
            type: 'default',
            data: { label: 'Gemini Model' },
            position: { x: 200, y: 50 },
            parentNode: groupId,
            extent: 'parent',
          },
          {
            id: getId(),
            type: 'output',
            data: { label: 'Output Image' },
            position: { x: 350, y: 90 },
            parentNode: groupId,
            extent: 'parent',
          },
        ];
        setNodes((nds) => nds.concat(newNodes as Node<{ label: string }>[]));
      } else {
        const newNode = {
          id: getId(),
          type,
          position,
          data: { label: `${type} node` },
        };

        setNodes((nds) => nds.concat(newNode as Node<{ label: string }>));
      }
    },
    [reactFlowInstance]
  );

  return (
    <div style={{ height: '100%' }} onDragOver={onDragOver} onDrop={onDrop}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
      >
        <Controls />
        <MiniMap />
          <Background variant={"dots" as unknown as BackgroundVariant} gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}
