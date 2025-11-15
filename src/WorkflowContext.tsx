import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'
import type { Node, Edge } from 'reactflow'

interface WorkflowContextType {
  workflowTitle: string
  setWorkflowTitle: (title: string) => void
  nodes: Node[]
  setNodes: (nodes: Node[]) => void
  edges: Edge[]
  setEdges: (edges: Edge[]) => void
  saveWorkflow: () => void
  loadWorkflow: () => void
  shareWorkflow: () => void
  runWorkflow: () => void
}

const WorkflowContext = createContext<WorkflowContextType | undefined>(undefined)

export function WorkflowProvider({ children }: { children: ReactNode }) {
  const [workflowTitle, setWorkflowTitle] = useState('Untitled Workflow')
  const [nodes, setNodes] = useState<Node[]>([])
  const [edges, setEdges] = useState<Edge[]>([])

  const saveWorkflow = () => {
    const workflow = {
      title: workflowTitle,
      nodes,
      edges,
      timestamp: new Date().toISOString(),
    }

    // Save to localStorage
    localStorage.setItem('vertex-workflow', JSON.stringify(workflow))

    // Also download as JSON file
    const blob = new Blob([JSON.stringify(workflow, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${workflowTitle.replace(/\s+/g, '_')}.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)

    alert('Workflow saved successfully!')
  }

  const loadWorkflow = () => {
    const saved = localStorage.getItem('vertex-workflow')
    if (saved) {
      try {
        const workflow = JSON.parse(saved)
        setWorkflowTitle(workflow.title || 'Untitled Workflow')
        setNodes(workflow.nodes || [])
        setEdges(workflow.edges || [])
        alert('Workflow loaded successfully!')
      } catch (error) {
        alert('Error loading workflow: ' + (error as Error).message)
      }
    } else {
      alert('No saved workflow found. You can also upload a workflow JSON file.')

      // Allow file upload
      const input = document.createElement('input')
      input.type = 'file'
      input.accept = '.json'
      input.onchange = (e) => {
        const file = (e.target as HTMLInputElement).files?.[0]
        if (file) {
          const reader = new FileReader()
          reader.onload = (event) => {
            try {
              const workflow = JSON.parse(event.target?.result as string)
              setWorkflowTitle(workflow.title || 'Untitled Workflow')
              setNodes(workflow.nodes || [])
              setEdges(workflow.edges || [])
              alert('Workflow loaded from file!')
            } catch (error) {
              alert('Error parsing workflow file: ' + (error as Error).message)
            }
          }
          reader.readAsText(file)
        }
      }
      input.click()
    }
  }

  const shareWorkflow = () => {
    const workflow = {
      title: workflowTitle,
      nodes,
      edges,
    }

    // Copy workflow JSON to clipboard
    const workflowJson = JSON.stringify(workflow, null, 2)
    navigator.clipboard.writeText(workflowJson).then(
      () => alert('Workflow copied to clipboard! Share this JSON with others.'),
      () => alert('Failed to copy to clipboard. Please try again.')
    )
  }

  const runWorkflow = () => {
    // Simulate workflow execution
    console.log('Running workflow:', workflowTitle)
    console.log('Nodes:', nodes)
    console.log('Edges:', edges)

    // Validate workflow has nodes
    if (nodes.length === 0) {
      alert('Cannot run empty workflow. Please add some nodes first.')
      return
    }

    // Simulate execution progress
    alert(`Starting workflow: ${workflowTitle}\n\nNodes: ${nodes.length}\nConnections: ${edges.length}\n\nCheck console for details.`)

    // Log execution plan
    console.log('Execution Plan:')
    nodes.forEach((node, index) => {
      console.log(`${index + 1}. ${node.data.label} (${node.type})`)
    })
  }

  return (
    <WorkflowContext.Provider
      value={{
        workflowTitle,
        setWorkflowTitle,
        nodes,
        setNodes,
        edges,
        setEdges,
        saveWorkflow,
        loadWorkflow,
        shareWorkflow,
        runWorkflow,
      }}
    >
      {children}
    </WorkflowContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useWorkflow() {
  const context = useContext(WorkflowContext)
  if (context === undefined) {
    throw new Error('useWorkflow must be used within a WorkflowProvider')
  }
  return context
}
