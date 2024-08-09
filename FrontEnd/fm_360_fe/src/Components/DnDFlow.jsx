import React, { useRef, useCallback, useState, useEffect } from 'react';
import {
  ReactFlow,
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  useReactFlow,
  MiniMap,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import Sidebar from './Sidebar';
import CustomNode from './CustomNodes'; // Import the custom node component
import '../Styles/DnDFlow.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const initialNodes = [];
let id = 0;
const getId = () => generateUUID();

function generateUUID() {
  // Create a UUID based on version 4 (random)
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0,
        v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

const DnDFlow = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { screenToFlowPosition } = useReactFlow();
  const [name, setName] = useState(''); // State to store the name for saving
  const navigate = useNavigate();

  const onConnect = useCallback(
    (params) => {
      const newEdge = {
        ...params,
        type: 'step', // Add your custom property here
      };
      setEdges((eds) => addEdge(newEdge, eds));
    },
    [] // Dependencies array, empty means it doesn't depend on any external variables
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      const data = JSON.parse(event.dataTransfer.getData('application/reactflow'));
      if (!data || !data.type) {
        return;
      }
      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const newNode = {
        id: getId(),
        type: data.type,
        position,
        data: { image: data.imageUrl }, // Default image if none provided
      };
      setNodes((nds) => nds.concat(newNode));
    },
    [screenToFlowPosition]
  );

  const save = () => {
    // Validate that the name field is not empty
    if (!name.trim()) {
      alert('Please enter a name for the data.');
      return;
    }

    // Transform nodes and edges to the required format
    const transformedNodes = nodes.map(node => ({
      node_id: node.id,
      data: node.data,
      measured: node.measured,
      position: node.position,
      type: node.type,
    }));

    const transformedEdges = edges.map(edge => ({
      edge_id: edge.id,
      source: edge.source,
      target: edge.target,
      type: edge.type,
    }));

    // Construct the data object in the required format
    const formattedData = {
      name: name, // Include the name in the data
      nodes: transformedNodes,
      edges: transformedEdges,
    };
    console.log(formattedData);
    

    axios.post('http://localhost:8000/api/flow/save/', formattedData)
      .then((res) => {
        console.log(res.data);
        navigate('/admindashboard/view');
        alert('Data Saved!!!');
      })
      .catch((err) => {
        console.log(err);
        alert('Not Saved!!!');
      });
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  return (
    <div className="dndflow">
      <Sidebar />
      <div className="reactflow-wrapper" ref={reactFlowWrapper} style={{ height: 500 }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={onDragOver}
          fitView
          nodeTypes={{ custom: CustomNode }} // Register the custom node type
        >
          <Controls />
          <MiniMap />
        </ReactFlow>
        <div id='btn'>
          <form action="/admindashboard/view" onSubmit={save}>
          <input
            type="text"
            placeholder="Enter circuit name"
            value={name}
            onChange={handleNameChange}
            required
          />
          <button >Save</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default () => (
  <ReactFlowProvider>
    <DnDFlow />
  </ReactFlowProvider>
);
