import { useState } from 'react';
import { Handle, Position, useNodes, useEdges } from 'reactflow';

type GroupData = { label: string }

export default function GroupNode({ id, data }: { id: string; data: GroupData }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const nodes = useNodes();
  const edges = useEdges();

  const handleCollapse = () => {
    const childNodes = nodes.filter((node) => node.parentNode === id);
    const childEdges = edges.filter((edge) => childNodes.some((node) => node.id === edge.source || node.id === edge.target));

    const updatedNodes = nodes.map((node) => {
      if (childNodes.some((childNode) => childNode.id === node.id)) {
        return { ...node, hidden: !isCollapsed };
      }
      return node;
    });

    const updatedEdges = edges.map((edge) => {
      if (childEdges.some((childEdge) => childEdge.id === edge.id)) {
        return { ...edge, hidden: !isCollapsed };
      }
      return edge;
    });

    // This is a workaround to update the nodes and edges in the parent component
    window.postMessage({ type: 'UPDATE_NODES', payload: updatedNodes }, '*');
    window.postMessage({ type: 'UPDATE_EDGES', payload: updatedEdges }, '*');

    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="w-64 rounded-xl bg-[#2E333A] border-2 border-primary shadow-lg ring-4 ring-primary/30">
      <div className="flex items-center justify-between p-3 border-b border-[#3a4049]">
        <div className="flex items-center gap-2">
          <button onClick={handleCollapse} className="w-4 h-4 rounded-full bg-[#FBBC04] cursor-pointer ring-2 ring-offset-2 ring-offset-[#2E333A] ring-[#FBBC04]/50"></button>
          <p className="text-sm font-medium text-white">{data.label}</p>
        </div>
      </div>
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}
