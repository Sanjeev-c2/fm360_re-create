import React, { useCallback, useEffect, useState } from 'react';
import {
  ReactFlow,
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


const ViewPage = ()=>{

  const [nodes, setNodes] = useNodesState([]);
  const [edges, setEdges] = useEdgesState([]);
  const [name, setName] = useState('');
  const [flowNames, setFlowNames] = useState([]);

  // Fetch the list of flow names
  useEffect(() => {
    axios.get('http://localhost:8000/api/flow/names/')
      .then((res) => {
        setFlowNames(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Fetch data by name
  useEffect(() => {
    if (name) {
      axios.get(`http://localhost:8000/api/flow/${name}/`)
        .then((res) => {
          const transformedNodes = res.data.nodes.map(node => ({
            id: node.node_id,
            type: node.type,
            position: node.position,
            data: node.data,
            measured: node.measured,
          }));

          const transformedEdges = res.data.edges.map(edge => ({
            id: edge.edge_id,
            source: edge.source,
            target: edge.target,
            type: edge.type,
          }));

          setNodes(transformedNodes);
          setEdges(transformedEdges);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [name]);

  const onConnect = useCallback(
    (params) => {
      if (params.source && params.target) {
        setEdges((eds) => addEdge({ ...params, type: 'step' }, eds));
      }
    },
    [setEdges]
  );

  const handleNameClick = (flowName) => {
    setName(flowName);
  };

  return (
    <div className='viewcircuit' style={{ width: '100vw', height: '80vh' }}>
      <div className='savedcircuit'>
        <h4>Lists of saved circuits</h4>
        <ul>
          {flowNames.map((flowName, index) => (
            <button key={index} onClick={() => handleNameClick(flowName)}>
              {flowName}
            </button>
          ))}
        </ul>
      </div>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onConnect={onConnect}
        fitView
        nodeTypes={{ custom: CustomNode }}
      >
      </ReactFlow>
      
    </div>
  );

}
export default ViewPage;