# CLAUDE.md - VertexUI Codebase Guide

## Project Overview

VertexUI is a modern, node-based visual workflow editor inspired by Google's Vertex AI platform. It provides an intuitive drag-and-drop interface for building AI/ML workflows using a graph-based approach.

**Tech Stack:** React 19 + TypeScript + Vite + Tailwind CSS 4 + ReactFlow

---

## Project Structure

```
VertexUI/
├── src/
│   ├── components/          # React components
│   │   ├── Header.tsx       # Top navigation with workflow controls
│   │   ├── Sidebar.tsx      # Left panel with draggable node palette
│   │   ├── Flow.tsx         # Main canvas with ReactFlow graph editor
│   │   ├── DatasetNode.tsx  # Custom node for dataset sources
│   │   ├── PromptNode.tsx   # Custom node for AI prompts/models
│   │   └── GroupNode.tsx    # Collapsible container node
│   ├── App.tsx              # Root component with layout
│   ├── main.tsx             # React app entry point
│   ├── App.css              # App-level styles
│   └── index.css            # Global styles with Tailwind directives
├── public/                   # Static assets
├── .github/workflows/       # CI/CD configuration
├── vite.config.ts           # Vite bundler config
├── tailwind.config.js       # Tailwind CSS custom theme
├── tsconfig*.json           # TypeScript configurations
└── package.json             # Dependencies and scripts
```

---

## Key Technologies

### Core Framework
- **React 19.1.1** - Latest React with new features and improvements
- **TypeScript 5.9.3** - Strict type safety enabled
- **Vite 7.1.7** - Lightning-fast build tool and dev server

### UI & Styling
- **Tailwind CSS 4.1.16** - Utility-first CSS with custom theme
- **ReactFlow 11.11.4** - Node-based graph editing library
- **Material Symbols** - Google's icon system

### Data & Validation
- **Zod 4.1.12** - Runtime schema validation for postMessage API

### Code Quality
- **ESLint 9.36** - Linting with TypeScript support
- **TypeScript ESLint** - Strict linting rules for React and hooks

---

## Component Architecture

### Flow.tsx - Main Graph Editor
**Location:** `src/Flow.tsx`

**Purpose:** Central component managing the workflow graph

**Key Features:**
- ReactFlow canvas with pan, zoom, and minimap
- Custom node types (dataset, prompt, group)
- Drag-and-drop node creation from sidebar
- Zod-validated postMessage API for external control
- Initial workflow: dataset → prompt connection

**State Management:**
```typescript
const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)
```

**Custom Node Types:**
- `group` → GroupNode (collapsible containers)
- `dataset` → DatasetNode (data sources)
- `prompt` → PromptNode (AI models/templates)
- Standard: `input`, `default`, `output`

**External API:**
Listens for window.postMessage events:
- `UPDATE_NODES` - Replace all nodes
- `UPDATE_EDGES` - Replace all edges

Schemas validated with Zod at runtime.

---

### Sidebar.tsx - Node Palette
**Location:** `src/Sidebar.tsx`

**Purpose:** Draggable component library for workflow building

**Available Nodes:**
1. **Data Sources:**
   - Load Dataset (type: `dataset`)
   - Prompt Template (type: `prompt`)
   - Notebook LM (type: `default`)
   - Cloud Storage (type: `default`)
   - Upload (type: `output`)

2. **Special:**
   - Vertex AI Prompt Gallery (type: `default`)
   - Complex Node (type: `group`) - for nested workflows

**Drag Implementation:**
```typescript
const onDragStart = (event: DragEvent, nodeType: string) => {
  event.dataTransfer.setData('application/reactflow', nodeType)
  event.dataTransfer.effectAllowed = 'move'
}
```

---

### Header.tsx - Top Navigation
**Location:** `src/Header.tsx`

**Features:**
- Workflow title: "Untitled Workflow"
- **Actions:**
  - Run button (primary action)
  - Save button
  - Share button (icon only)
- **View Controls:**
  - Zoom In, Zoom Out, Fit Screen
- **User Profile:**
  - Google account avatar
- **Branding:**
  - Custom Vertex AI logo (SVG)

---

### Custom Node Components

#### DatasetNode.tsx
**Type:** `dataset`
**Purpose:** Represents data sources in the workflow

**Display:**
- Green status indicator
- Source: customers.csv
- Format: CSV
- Output handle (source position: bottom)

#### PromptNode.tsx
**Type:** `prompt`
**Purpose:** AI model configuration and prompt templates

**Display:**
- Blue status indicator
- Model: gemini-pro
- Temperature: 0.7
- Input handle (target: top)
- Output handle (source: bottom)

#### GroupNode.tsx
**Type:** `group`
**Purpose:** Collapsible container for organizing complex workflows

**Display:**
- Yellow status indicator/button
- Click to collapse/expand
- Uses postMessage to hide/show children
- Styled with primary color (Google Blue)

**Collapse Logic:**
```typescript
// Finds and hides all child nodes and connecting edges
const childNodeIds = nodes
  .filter(n => n.parentId === data.id)
  .map(n => n.id)
```

---

## Styling System

### Tailwind Configuration
**File:** `tailwind.config.js`

**Custom Theme:**
```javascript
colors: {
  primary: '#4285F4',              // Google Blue
  'background-light': '#f6f7f8',
  'background-dark': '#1A1D21',    // Dark theme bg
}

fontFamily: {
  display: ['Inter'],
}

borderRadius: {
  DEFAULT: '0.25rem',
  lg: '0.5rem',
  xl: '0.75rem',
  full: '9999px',
}
```

### Design System
- **Theme:** Dark mode with light text
- **Primary Color:** Google Blue (#4285F4)
- **Typography:** Inter font family
- **Icons:** Material Symbols Outlined
- **Layout:** Flexbox-based responsive design

---

## Development Workflow

### Commands
```bash
npm install      # Install dependencies
npm run dev      # Start dev server (http://localhost:5173)
npm run build    # Production build (TypeScript + Vite)
npm run lint     # Run ESLint
npm run preview  # Preview production build
```

### Build Process
1. **TypeScript compilation:** `tsc -b`
   - Validates types without emitting files
   - Uses project references for efficiency
2. **Vite bundling:** `vite build`
   - Bundles React + assets
   - Processes Tailwind via PostCSS
   - Output: `dist/` directory

### CI/CD
**File:** `.github/workflows/ci.yml`

**Pipeline:**
- Trigger: Push/PR to main branch
- Environment: Ubuntu + Node 20
- Steps: Install → Build → Lint

---

## TypeScript Configuration

### tsconfig.app.json (Application Code)
```json
{
  "target": "ES2022",
  "lib": ["ES2022", "DOM"],
  "jsx": "react-jsx",
  "strict": true,
  "moduleResolution": "bundler"
}
```

**Strict Rules:**
- `noUnusedLocals: true`
- `noUnusedParameters: true`
- `noFallthroughCasesInSwitch: true`
- All strict type checking enabled

### tsconfig.node.json (Build Tools)
- Separate config for `vite.config.ts`
- Target: ES2023
- Optimized for Node.js environment

---

## Data Flow & Architecture

### Workflow Creation Flow
1. User drags node from Sidebar
2. `onDragStart` stores node type in dataTransfer
3. User drops on Flow canvas
4. `onDrop` handler captures position and type
5. New node created with unique ID
6. Node added to ReactFlow state
7. User connects nodes via edges

### State Management
- **Local State:** React hooks (`useState`, `useNodesState`, `useEdgesChange`)
- **ReactFlow State:** Managed by library with callbacks
- **External Control:** postMessage API with Zod validation

### Type Safety Layers
1. **TypeScript:** Compile-time type checking
2. **Zod:** Runtime validation for external data
3. **ESLint:** Code quality and React best practices

---

## Key Files Reference

| File | Purpose | Important Sections |
|------|---------|-------------------|
| `src/Flow.tsx` | Main graph editor | Node types, postMessage handlers, initial nodes |
| `src/Sidebar.tsx` | Node palette | Available node types, drag handlers |
| `src/Header.tsx` | Top navigation | Action buttons, zoom controls |
| `src/App.tsx` | Root layout | Component composition, dark theme |
| `vite.config.ts` | Build config | React plugin setup |
| `tailwind.config.js` | Design system | Custom colors, fonts, spacing |
| `package.json` | Dependencies | Scripts, versions |

---

## Extending the Application

### Adding a New Node Type

1. **Create Component:** `src/components/MyNode.tsx`
   ```typescript
   import { Handle, Position } from 'reactflow'

   export function MyNode({ data }: { data: any }) {
     return (
       <div className="px-4 py-2 shadow-md rounded-md bg-white">
         <Handle type="target" position={Position.Top} />
         <div>{data.label}</div>
         <Handle type="source" position={Position.Bottom} />
       </div>
     )
   }
   ```

2. **Register in Flow.tsx:**
   ```typescript
   const nodeTypes = {
     mynode: MyNode,
     // ... other types
   }
   ```

3. **Add to Sidebar.tsx:**
   ```typescript
   <div
     onDragStart={(e) => onDragStart(e, 'mynode')}
     draggable
   >
     My New Node
   </div>
   ```

### Adding External Control

Send postMessage to update graph:
```typescript
window.postMessage({
  type: 'UPDATE_NODES',
  payload: [
    { id: '1', type: 'default', position: { x: 0, y: 0 }, data: {} }
  ]
}, '*')
```

---

## Performance Considerations

- **Vite:** Fast HMR and optimized builds
- **React Fast Refresh:** Instant component updates in dev
- **Tree Shaking:** ES modules enable dead code elimination
- **Tailwind Purging:** Unused CSS removed in production
- **Build Caching:** TypeScript incremental compilation

---

## Common Patterns

### Node Data Structure
```typescript
{
  id: string              // Unique identifier
  type: string            // Node type (dataset, prompt, group, etc.)
  position: { x, y }      // Canvas position
  data: any               // Custom node data
  parentId?: string       // For grouped nodes
}
```

### Edge Data Structure
```typescript
{
  id: string              // Unique identifier
  source: string          // Source node ID
  target: string          // Target node ID
  sourceHandle?: string   // Optional handle ID
  targetHandle?: string   // Optional handle ID
}
```

---

## Debugging Tips

1. **React DevTools:** Inspect component hierarchy and state
2. **Vite Network Tab:** Check HMR updates and asset loading
3. **ReactFlow DevTools:** Debug node/edge state
4. **Console Logs:** postMessage validation errors logged via Zod
5. **TypeScript Errors:** Check terminal output during `npm run build`

---

## Resources

- **ReactFlow Docs:** https://reactflow.dev/
- **Tailwind CSS v4:** https://tailwindcss.com/
- **Vite Guide:** https://vitejs.dev/guide/
- **Zod Documentation:** https://zod.dev/

---

## License & Credits

- **Framework:** React (MIT License)
- **Graph Library:** ReactFlow (MIT License)
- **Icons:** Material Symbols (Apache 2.0)
- **Inspiration:** Google Vertex AI platform

---

**Last Updated:** 2025-11-15
**Maintained by:** Claude Code
**Version:** 0.0.0 (Development)
