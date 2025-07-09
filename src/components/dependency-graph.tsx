'use client'

import { useMemo, useCallback, useState } from 'react'
import ReactFlow, {
  Node,
  Edge,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  MarkerType,
  NodeMouseHandler,
} from 'reactflow'
import 'reactflow/dist/style.css'
import { DependencyNode, Vulnerability } from '@/types'

interface DependencyGraphProps {
  dependencies: DependencyNode[]
  vulnerabilities: Vulnerability[]
}

// Custom node component
function DependencyNodeComponent({ data }: { data: any }) {
  const hasVulns = data.vulnerabilities.length > 0
  const vulnSeverity = hasVulns ? 
    data.vulnerabilities.reduce((max: string, vuln: Vulnerability) => {
      const severityOrder = { low: 1, medium: 2, high: 3, critical: 4 }
      return severityOrder[vuln.severity as keyof typeof severityOrder] > 
             severityOrder[max as keyof typeof severityOrder] ? vuln.severity : max
    }, 'low') : null

  const getNodeColor = () => {
    if (hasVulns) {
      switch (vulnSeverity) {
        case 'critical': return 'bg-red-600 text-white'
        case 'high': return 'bg-red-500 text-white'
        case 'medium': return 'bg-orange-500 text-white'
        case 'low': return 'bg-yellow-500 text-white'
        default: return 'bg-gray-100'
      }
    }
    
    switch (data.dependencyType) {
      case 'dependencies': return 'bg-blue-100 border-blue-300'
      case 'devDependencies': return 'bg-orange-100 border-orange-300'
      case 'peerDependencies': return 'bg-purple-100 border-purple-300'
      default: return 'bg-gray-100 border-gray-300'
    }
  }

  return (
    <div className={`px-3 py-2 shadow-md rounded-md border-2 min-w-[120px] ${getNodeColor()}`}>
      <div className="font-bold text-sm">{data.label}</div>
      <div className="text-xs opacity-80">{data.version}</div>
      {hasVulns && (
        <div className="text-xs mt-1">
          ⚠️ {data.vulnerabilities.length} vuln{data.vulnerabilities.length > 1 ? 's' : ''}
        </div>
      )}
    </div>
  )
}

const nodeTypes = {
  dependency: DependencyNodeComponent,
}

export function DependencyGraph({ dependencies, vulnerabilities }: DependencyGraphProps) {
  const [selectedNode, setSelectedNode] = useState<DependencyNode | null>(null)

  // Convert dependency tree to React Flow format
  const { nodes, edges } = useMemo(() => {
    const nodes: Node[] = []
    const edges: Edge[] = []
    const processedNodes = new Set<string>()

    // Helper function to convert dependency node to React Flow node
    const convertToReactFlowNode = (dep: DependencyNode, x: number, y: number): Node => {
      const nodeVulns = vulnerabilities.filter(v => 
        v.packageName === dep.name || v.id.includes(dep.name)
      )

      return {
        id: dep.id,
        type: 'dependency',
        position: { x, y },
        data: {
          label: dep.name,
          name: dep.name,
          version: dep.version,
          dependencyType: dep.type,
          vulnerabilities: nodeVulns,
          description: dep.description,
        },
      }
    }

    // Process dependencies in layers for better layout
    const processLayer = (deps: DependencyNode[], centerX: number, centerY: number, radius: number) => {
      const angleStep = deps.length > 1 ? (2 * Math.PI) / deps.length : 0
      
      deps.forEach((dep, index) => {
        if (processedNodes.has(dep.id)) return
        
        const angle = index * angleStep
        const x = centerX + radius * Math.cos(angle)
        const y = centerY + radius * Math.sin(angle)
        
        nodes.push(convertToReactFlowNode(dep, x, y))
        processedNodes.add(dep.id)
        
        // Add edges to children
        dep.children.forEach(child => {
          if (!processedNodes.has(child.id)) {
            edges.push({
              id: `${dep.id}-${child.id}`,
              source: dep.id,
              target: child.id,
              type: 'smoothstep',
              markerEnd: {
                type: MarkerType.ArrowClosed,
                width: 20,
                height: 20,
              },
              style: {
                stroke: dep.type === 'devDependencies' ? '#fb923c' : 
                        dep.type === 'peerDependencies' ? '#a855f7' : '#3b82f6',
                strokeWidth: 2,
              },
            })
          }
        })
        
        // Recursively process children in next layer
        if (dep.children.length > 0) {
          processLayer(dep.children, x, y, radius * 0.7)
        }
      })
    }

    // Start with root dependencies
    processLayer(dependencies, 400, 300, 200)

    return { nodes, edges }
  }, [dependencies, vulnerabilities])

  const [reactFlowNodes, setNodes, onNodesChange] = useNodesState(nodes)
  const [reactFlowEdges, setEdges, onEdgesChange] = useEdgesState(edges)

  const onNodeClick: NodeMouseHandler = useCallback((event, node) => {
    const depNode = dependencies.find(dep => dep.id === node.id) ||
                   dependencies.flatMap(dep => findNodeInTree(dep, node.id)).find(Boolean)
    setSelectedNode(depNode || null)
  }, [dependencies])

  // Helper function to find node in tree
  const findNodeInTree = (node: DependencyNode, targetId: string): DependencyNode | null => {
    if (node.id === targetId) return node
    
    for (const child of node.children) {
      const found = findNodeInTree(child, targetId)
      if (found) return found
    }
    
    return null
  }

  return (
    <div className="h-[600px] w-full relative">
      <ReactFlow
        nodes={reactFlowNodes}
        edges={reactFlowEdges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={onNodeClick}
        nodeTypes={nodeTypes}
        fitView
        minZoom={0.2}
        maxZoom={2}
      >
        <Controls />
        <Background />
      </ReactFlow>

      {/* Node Details Panel */}
      {selectedNode && (
        <div className="absolute top-4 right-4 w-80 bg-white rounded-lg shadow-lg border p-4 max-h-96 overflow-y-auto">
          <div className="flex justify-between items-start mb-3">
            <h3 className="font-bold text-lg">{selectedNode.name}</h3>
            <button
              onClick={() => setSelectedNode(null)}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>
          
          <div className="space-y-3 text-sm">
            <div>
              <span className="font-medium">Version:</span> {selectedNode.version}
            </div>
            <div>
              <span className="font-medium">Type:</span> {selectedNode.type}
            </div>
            <div>
              <span className="font-medium">Depth:</span> {selectedNode.depth}
            </div>
            
            {selectedNode.description && (
              <div>
                <span className="font-medium">Description:</span>
                <p className="text-gray-600 mt-1">{selectedNode.description}</p>
              </div>
            )}
            
            {selectedNode.license && (
              <div>
                <span className="font-medium">License:</span> {selectedNode.license}
              </div>
            )}
            
            {selectedNode.vulnerabilities.length > 0 && (
              <div>
                <span className="font-medium text-red-600">Vulnerabilities:</span>
                <div className="mt-2 space-y-2">
                  {selectedNode.vulnerabilities.map((vuln, index) => (
                    <div key={index} className="p-2 bg-red-50 border border-red-200 rounded">
                      <div className="font-medium text-red-800">{vuln.title}</div>
                      <div className="text-red-600 text-xs">
                        Severity: {vuln.severity.toUpperCase()}
                      </div>
                      {vuln.description && (
                        <div className="text-red-700 text-xs mt-1">{vuln.description}</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {selectedNode.children.length > 0 && (
              <div>
                <span className="font-medium">Dependencies ({selectedNode.children.length}):</span>
                <div className="mt-1 max-h-24 overflow-y-auto">
                  {selectedNode.children.map(child => (
                    <div key={child.id} className="text-xs text-gray-600 py-1">
                      {child.name}@{child.version}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg border p-3">
        <h4 className="font-medium text-sm mb-2">Legend</h4>
        <div className="space-y-1 text-xs">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-blue-100 border border-blue-300 rounded mr-2"></div>
            Production
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-orange-100 border border-orange-300 rounded mr-2"></div>
            Development
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-purple-100 border border-purple-300 rounded mr-2"></div>
            Peer
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-red-500 rounded mr-2"></div>
            Vulnerable
          </div>
        </div>
      </div>
    </div>
  )
} 