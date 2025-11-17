import { ReactFlowProvider } from 'reactflow'
import { WorkflowProvider } from './WorkflowContext'
import Header from './Header'
import Sidebar from './Sidebar'
import Flow from './Flow'

export default function App() {
  return (
    <WorkflowProvider>
      <ReactFlowProvider>
        <div className="h-screen w-screen flex flex-col bg-[#0F1113] text-white">
          <Header />
          <div className="flex flex-1 h-0">
            <Sidebar />
            <main className="flex-1 h-full">
              <Flow />
            </main>
          </div>
        </div>
      </ReactFlowProvider>
    </WorkflowProvider>
  )
}
