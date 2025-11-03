import { Handle, Position } from 'reactflow';

export default function DatasetNode({ data }) {
  return (
    <div className="w-64 rounded-xl bg-[#2E333A] border border-[#3a4049] shadow-lg">
      <div className="flex items-center justify-between p-3 border-b border-[#3a4049]">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-[#34A853] cursor-pointer ring-2 ring-offset-2 ring-offset-[#2E333A] ring-[#34A853]/50"></div>
          <p className="text-sm font-medium text-white">{data.label}</p>
        </div>
      </div>
      <div className="p-3 text-xs text-[#9AA0A6] space-y-2">
        <div className="flex justify-between items-center">
          <span>Source</span>
          <span className="text-white font-mono bg-[#24282F] px-2 py-0.5 rounded-md">customers.csv</span>
        </div>
        <div className="flex justify-between items-center">
          <span>Format</span>
          <span className="text-white font-mono bg-[#24282F] px-2 py-0.5 rounded-md">CSV</span>
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}
