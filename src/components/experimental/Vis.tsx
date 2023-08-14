import { useState, useEffect, useRef } from 'react'
import { Network } from 'vis-network'

export default function Vis() {
  const container = useRef(null)

  const [nodes] = useState([
    { id: 1, label: 'Node 1', title: 'node 1 tootip text' },
    { id: 2, label: 'Node 2', title: 'node 2 tootip text' },
    { id: 3, label: 'Node 3', title: 'node 3 tootip text' },
    { id: 4, label: 'Node 4', title: 'node 4 tootip text' },
    { id: 5, label: 'Node 5', title: 'node 5 tootip text' }
  ])

  const [edges] = useState([
    { from: 1, to: 3 },
    { from: 1, to: 2 },
    { from: 2, to: 4 },
    { from: 2, to: 5 },
    { from: 3, to: 3 }
  ])

  useEffect(() => {
    const options = {
      layout: {
        hierarchical: true
      },
      edges: {
        color: '#000000'
      },
      height: '500px'
    }
    const network = container.current && new Network(container.current, { nodes, edges }, options)
    console.log(network)
  }, [container, nodes, edges])

  return <div ref={container} style={{ height: '500px', width: '800px' }} />
}
