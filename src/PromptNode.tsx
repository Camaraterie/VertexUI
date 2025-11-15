import { useState } from 'react';
import { Handle, Position, useNodes } from 'reactflow';
import { useWorkflow } from './WorkflowContext';

type PromptData = {
  label: string
  model?: string
  temperature?: number
}

export default function PromptNode({ id, data }: { id: string; data: PromptData }) {
  const [isEditing, setIsEditing] = useState(false);
  const [model, setModel] = useState(data.model || 'gemini-pro');
  const [temperature, setTemperature] = useState(data.temperature || 0.7);
  const nodes = useNodes();
  const { setNodes } = useWorkflow();

  const handleSave = () => {
    const updatedNodes = nodes.map((node) => {
      if (node.id === id) {
        return {
          ...node,
          data: { ...(node.data || {}), label: data.label, model, temperature },
        };
      }
      return node;
    });
    setNodes(updatedNodes);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setModel(data.model || 'gemini-pro');
    setTemperature(data.temperature || 0.7);
    setIsEditing(false);
  };

  return (
    <div className="w-64 rounded-xl bg-[#2E333A] border border-[#3a4049] shadow-lg">
      <div className="flex items-center justify-between p-3 border-b border-[#3a4049]">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-[#4285F4] cursor-pointer ring-2 ring-offset-2 ring-offset-[#2E333A] ring-[#4285F4]/50"></div>
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
          <span>Model</span>
          {isEditing ? (
            <select
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="text-white font-mono bg-[#1A1D21] px-2 py-0.5 rounded-md border border-primary focus:outline-none focus:ring-1 focus:ring-primary w-32 text-xs"
            >
              <option value="gemini-pro">gemini-pro</option>
              <option value="gemini-pro-vision">gemini-pro-vision</option>
              <option value="gemini-ultra">gemini-ultra</option>
              <option value="claude-3-opus">claude-3-opus</option>
              <option value="claude-3-sonnet">claude-3-sonnet</option>
              <option value="gpt-4">gpt-4</option>
              <option value="gpt-4-turbo">gpt-4-turbo</option>
            </select>
          ) : (
            <span className="text-white font-mono bg-[#24282F] px-2 py-0.5 rounded-md">{model}</span>
          )}
        </div>
        <div className="flex justify-between items-center">
          <span>Temperature</span>
          {isEditing ? (
            <input
              type="number"
              min="0"
              max="2"
              step="0.1"
              value={temperature}
              onChange={(e) => setTemperature(parseFloat(e.target.value))}
              className="text-white font-mono bg-[#1A1D21] px-2 py-0.5 rounded-md border border-primary focus:outline-none focus:ring-1 focus:ring-primary w-32 text-xs"
            />
          ) : (
            <span className="text-white font-mono bg-[#24282F] px-2 py-0.5 rounded-md">{temperature}</span>
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
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}
