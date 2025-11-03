export default function Sidebar() {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside className="flex h-full w-80 flex-col bg-[#1A1D21] border-r border-[#2E333A] p-4 space-y-4">
      <div className="relative">
        <button className="flex w-full items-center justify-between rounded-lg bg-primary/20 px-4 py-2.5 text-sm font-medium text-white ring-2 ring-primary">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-primary" style={{fontVariationSettings: "'FILL' 1"}}>add_box</span>
            <span>Data Sources</span>
          </div>
          <span className="material-symbols-outlined text-white">expand_less</span>
        </button>
        <div className="mt-1 flex flex-col rounded-lg bg-[#2E333A] px-2 py-2 shadow-lg">
          <a className="flex cursor-pointer items-center gap-3 rounded-md px-3 py-2 text-sm text-[#E8EAED] hover:bg-[#3a4049]" href="#" onDragStart={(event) => onDragStart(event, 'dataset')} draggable>
            <span className="material-symbols-outlined text-[#9AA0A6]">folder</span>
            <span>Load Dataset</span>
          </a>
          <a className="flex cursor-pointer items-center gap-3 rounded-md px-3 py-2 text-sm text-[#E8EAED] hover:bg-[#3a4049]" href="#" onDragStart={(event) => onDragStart(event, 'prompt')} draggable>
            <span className="material-symbols-outlined text-[#9AA0A6]">code</span>
            <span>Prompt Template</span>
          </a>
          <a className="flex cursor-pointer items-center gap-3 rounded-md px-3 py-2 text-sm text-[#E8EAED] hover:bg-[#3a4049]" href="#" onDragStart={(event) => onDragStart(event, 'default')} draggable>
            <span className="material-symbols-outlined text-[#9AA0A6]">description</span>
            <span>Notebook LM</span>
          </a>
          <a className="flex cursor-pointer items-center gap-3 rounded-md px-3 py-2 text-sm text-[#E8EAED] hover:bg-[#3a4049]" href="#" onDragStart={(event) => onDragStart(event, 'default')} draggable>
            <span className="material-symbols-outlined text-[#9AA0A6]">cloud</span>
            <span>Cloud Storage</span>
          </a>
          <a className="flex cursor-pointer items-center gap-3 rounded-md px-3 py-2 text-sm text-[#E8EAED] hover:bg-[#3a4049]" href="#" onDragStart={(event) => onDragStart(event, 'output')} draggable>
            <span className="material-symbols-outlined text-[#9AA0A6]">upload_file</span>
            <span>Upload</span>
          </a>
        </div>
      </div>
      <button className="flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium text-white hover:bg-[#2E333A]" onDragStart={(event) => onDragStart(event, 'default')} draggable>
        <span className="material-symbols-outlined text-[#9AA0A6]">apps</span>
        <span>Vertex AI Prompt Gallery</span>
      </button>
      <button className="flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium text-white hover:bg-[#2E333A]" onDragStart={(event) => onDragStart(event, 'group')} draggable>
        <span className="material-symbols-outlined text-[#9AA0A6]">workspaces</span>
        <span>Complex Node</span>
      </button>
    </aside>
  )
}
