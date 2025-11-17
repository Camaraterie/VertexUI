import { useState } from 'react'
import { useReactFlow } from 'reactflow'
import { useWorkflow } from './WorkflowContext'

export default function Header() {
  const { workflowTitle, setWorkflowTitle, saveWorkflow, loadWorkflow, shareWorkflow, runWorkflow } = useWorkflow()
  const [isEditingTitle, setIsEditingTitle] = useState(false)
  const { zoomIn, zoomOut, fitView } = useReactFlow()

  const handleTitleEdit = () => {
    setIsEditingTitle(true)
  }

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWorkflowTitle(e.target.value)
  }

  const handleTitleBlur = () => {
    setIsEditingTitle(false)
    if (workflowTitle.trim() === '') {
      setWorkflowTitle('Untitled Workflow')
    }
  }

  const handleTitleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleTitleBlur()
    } else if (e.key === 'Escape') {
      setWorkflowTitle('Untitled Workflow')
      setIsEditingTitle(false)
    }
  }

  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-[#2E333A] px-6 py-3 bg-[#1A1D21] z-20">
      <div className="flex items-center gap-4">
        <div className="size-6 text-primary">
          <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
            <path d="M42.4379 44C42.4379 44 36.0744 33.9038 41.1692 24C46.8624 12.9336 42.2078 4 42.2078 4L7.01134 4C7.01134 4 11.6577 12.932 5.96912 23.9969C0.876273 33.9029 7.27094 44 7.27094 44L42.4379 44Z" fill="currentColor"></path>
          </svg>
        </div>
        {isEditingTitle ? (
          <input
            type="text"
            value={workflowTitle}
            onChange={handleTitleChange}
            onBlur={handleTitleBlur}
            onKeyDown={handleTitleKeyDown}
            autoFocus
            className="bg-[#2E333A] text-white text-lg font-bold leading-tight tracking-[-0.015em] px-2 py-1 rounded border border-primary focus:outline-none focus:ring-2 focus:ring-primary"
          />
        ) : (
          <h2
            className="text-white text-lg font-bold leading-tight tracking-[-0.015em] cursor-pointer hover:text-primary transition-colors"
            onClick={handleTitleEdit}
            title="Click to edit workflow name"
          >
            {workflowTitle}
          </h2>
        )}
      </div>
      <div className="flex flex-1 justify-end gap-4">
        <div className="flex gap-2">
          <button
            onClick={loadWorkflow}
            className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#2E333A] text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-[#3a4049] transition-colors"
            title="Load Workflow"
          >
            <span className="truncate">Load</span>
          </button>
          <button
            onClick={runWorkflow}
            className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-primary/90 transition-colors"
            title="Run Workflow"
          >
            <span className="truncate">Run</span>
          </button>
          <button
            onClick={saveWorkflow}
            className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#2E333A] text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-[#3a4049] transition-colors"
            title="Save Workflow"
          >
            <span className="truncate">Save</span>
          </button>
          <button
            onClick={shareWorkflow}
            className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 bg-[#2E333A] text-white gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5 hover:bg-[#3a4049] transition-colors"
            title="Share Workflow"
          >
            <span className="material-symbols-outlined">share</span>
          </button>
        </div>
        <div className="flex items-center border-l border-[#2E333A] pl-4 gap-2">
          <button
            onClick={() => zoomIn()}
            className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 bg-[#2E333A] text-white gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5 hover:bg-[#3a4049] transition-colors"
            title="Zoom In"
          >
            <span className="material-symbols-outlined">zoom_in</span>
          </button>
          <button
            onClick={() => zoomOut()}
            className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 bg-[#2E333A] text-white gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5 hover:bg-[#3a4049] transition-colors"
            title="Zoom Out"
          >
            <span className="material-symbols-outlined">zoom_out</span>
          </button>
          <button
            onClick={() => fitView({ padding: 0.2 })}
            className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 bg-[#2E333A] text-white gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5 hover:bg-[#3a4049] transition-colors"
            title="Fit to Screen"
          >
            <span className="material-symbols-outlined">fit_screen</span>
          </button>
        </div>
        <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10" data-alt="User avatar image" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDsL1fl4tCmN6tC_ncbE8oco3M4kPdgQ0L8Z7vqmz-ffWqbYdRJsGkjNOM8EDZnPDe1j2QsLDMpu7xw-EiiEvxGhRb6CZ6p6X4do5YwH_OomOiJWyIlTc8KtJ9uPZVX7tN4uQ5FcYeZN7WmcDKbkHm-2C2gAha7rGnh4ZvEh5Ycw-Ge7D8GgRz2QEMFaB74xaGgFyhu_x5GPCd9e5P4ToWb2ex2eX5qKFL_oQ53SR4NXOpSMP4iMWLuBOPNjf9c4OQCWefkzrC-s-U")'}}></div>
      </div>
    </header>
  )
}
