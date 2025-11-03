import { useState, useCallback, useEffect } from 'react';
import ReactFlow, { MiniMap, Controls, Background, addEdge, applyNodeChanges, applyEdgeChanges, useReactFlow } from 'reactflow';
import 'reactflow/dist/style.css';
import GroupNode from './GroupNode';
import DatasetNode from './DatasetNode';
import PromptNode from './PromptNode';

const initialNodes = [
  { id: '1', type: 'dataset', position: { x: 250, y: 5 }, data: { label: 'Load Dataset' } },
  { id: '2', type: 'prompt', position: { x: 100, y: 100 }, data: { label: 'Prompt Template' } },
];

const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

let id = 3;
const getId = () => `${id++}`;

const nodeTypes = {
  group: GroupNode,
  dataset: DatasetNode,
  prompt: PromptNode,
};

export default function Flow() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const reactFlowInstance = useReactFlow();

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data.type === 'UPDATE_NODES') {
        setNodes(event.data.payload);
      }
      if (event.data.type === 'UPDATE_EDGES') {
        setEdges(event.data.payload);
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );
  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
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
            data: { label: 'Prompt' },
            position: { x: 10, y: 90 },
            parentNode: groupId,
            extent: 'parent',
          },
          {
            id: getId(),
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
        setNodes((nds) => nds.concat(newNodes));
      } else {
        const newNode = {
          id: getId(),
          type,
          position,
          data: { label: `${type} node` },
        };

        setNodes((nds) => nds.concat(newNode));
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
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}
