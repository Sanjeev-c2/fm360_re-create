import React, { useCallback, useEffect } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  // Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from '@xyflow/react';

import CustomNode from './CustomNodes'; 
import '@xyflow/react/dist/style.css';

import '../Styles/ViewCircuit.css'
import axios from 'axios';
 
// const initialNodes = [
//   { id: '1', position: { x: 0, y: 0 }, data: { label: '1' } },
//   { id: '2', position: { x: 0, y: 100 }, data: { label: '2' } },
// ];
// const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];
 
export default function ViewCircuit() {
  const [nodes, setNodes] = useNodesState([]);
  const [edges, setEdges] = useEdgesState([]);

  // Load state from local storage or initialize
  // useEffect(() => {
  //   const savedNodes = localStorage.getItem('nodes');
  //   const savedEdges = localStorage.getItem('edges');
  //   if (savedNodes) {
  //     setNodes(JSON.parse(savedNodes));
  //   }
  //   if (savedEdges) {
  //     setEdges(JSON.parse(savedEdges));
  //   }
  // }, [setNodes, setEdges]);

   useEffect(() => {
        // Load data from localStorage when the component mounts
        function load() {
            // const data = localStorage.getItem('data');
            axios.get('http://localhost:8000/api/flow/')
            .then((res)=> {
              // const parsedData = JSON.parse(res.data);
              // setNodes(parsedData.nodes);
              setNodes(res.data.nodes);
              setEdges(res.data.edges);
          })
           .catch((err)=>{
            console.log(err);
            
           })
        }
        load();
    }, []); // Empty dependency array means this effect runs once on mount

 
  const onConnect = useCallback(
    (params) => {
      if (params.source && params.target) {
        setEdges((eds) => addEdge({ ...params, type: 'step' }, eds));
      }
    },
    [setEdges]
  );
 
  return (
    <div style={{ width: '100vw', height: '80vh' }} >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        // onNodesChange={onNodesChange}
        // onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        nodeTypes={{ custom: CustomNode }}
      >
        {/* <Controls /> */}
        {/* <MiniMap /> */}
        {/* <Background variant="dots" gap={12} size={1} /> */}
      </ReactFlow>
      
    </div>
  );
}