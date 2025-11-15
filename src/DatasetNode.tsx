import { useState } from 'react';
import { Handle, Position, useNodes } from 'reactflow';
import { useWorkflow } from './WorkflowContext';

type DatasetData = {
  label: string
  source?: string
  format?: string
}

export default function DatasetNode({ id, data }: { id: string; data: DatasetData }) {
  const [isEditing, setIsEditing] = useState(false);
  const [source, setSource] = useState(data.source || 'customers.csv');
  const [format, setFormat] = useState(data.format || 'CSV');
  const nodes = useNodes();
  const { setNodes } = useWorkflow();

  const handleSave = () => {
    const updatedNodes = nodes.map((node) => {
      if (node.id === id) {
        return {
          ...node,
          data: { ...(node.data || {}), label: data.label, source, format },
        };
      }
      return node;
    });
    setNodes(updatedNodes);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setSource(data.source || 'customers.csv');
    setFormat(data.format || 'CSV');
    setIsEditing(false);
  };

  return (
    <div className="w-64 rounded-xl bg-[#2E333A] border border-[#3a4049] shadow-lg">
      <div className="flex items-center justify-between p-3 border-b border-[#3a4049]">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-[#34A853] cursor-pointer ring-2 ring-offset-2 ring-offset-[#2E333A] ring-[#34A853]/50"></div>
          <p className="text-sm font-medium text-white">{data.label}</p>
        </div>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="text-xs text-[#9AA0A6] hover:text-white transition-colors"
          title={isEditing ? 'Cancel editing' : 'Edit properties'}
        >
          <span className="material-symbols-outlined text-sm">{isEditing ? 'close' : 'edit'}</span>
        </button>
      </div>
      <div className="p-3 text-xs text-[#9AA0A6] space-y-2">
        <div className="flex justify-between items-center">
          <span>Source</span>
          {isEditing ? (
            <input
              type="text"
              value={source}
              onChange={(e) => setSource(e.target.value)}
              className="text-white font-mono bg-[#1A1D21] px-2 py-0.5 rounded-md border border-primary focus:outline-none focus:ring-1 focus:ring-primary w-32 text-xs"
            />
          ) : (
            <span className="text-white font-mono bg-[#24282F] px-2 py-0.5 rounded-md">{source}</span>
          )}
        </div>
        <div className="flex justify-between items-center">
          <span>Format</span>
          {isEditing ? (
            <select
              value={format}
              onChange={(e) => setFormat(e.target.value)}
              className="text-white font-mono bg-[#1A1D21] px-2 py-0.5 rounded-md border border-primary focus:outline-none focus:ring-1 focus:ring-primary w-32 text-xs"
            >
              <option value="CSV">CSV</option>
              <option value="JSON">JSON</option>
              <option value="Parquet">Parquet</option>
              <option value="BigQuery">BigQuery</option>
            </select>
          ) : (
            <span className="text-white font-mono bg-[#24282F] px-2 py-0.5 rounded-md">{format}</span>
          )}
        </div>
        {isEditing && (
          <div className="flex gap-2 pt-2">
            <button
              onClick={handleSave}
              className="flex-1 bg-primary text-white px-2 py-1 rounded text-xs font-medium hover:bg-primary/90 transition-colors"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="flex-1 bg-[#3a4049] text-white px-2 py-1 rounded text-xs font-medium hover:bg-[#4a5059] transition-colors"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}
