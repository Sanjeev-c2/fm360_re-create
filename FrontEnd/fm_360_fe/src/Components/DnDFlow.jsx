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
// import CustomStepEdge from './CustomstepEdge'; // Import your custom edge component
import '../Styles/DnDFlow.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const initialNodes = [];
let id = 0;
const getId = () => `dndnode_${id++}`;

const DnDFlow = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { screenToFlowPosition } = useReactFlow();

  let data = {
    nodes: nodes,
    edges: edges
};


  const onConnect = useCallback(
    (params) => {
      // Create a new edge with the custom type property
      const newEdge = {
        ...params,
        type: 'step', // Add your custom property here
      };

      // Update the edges state with the new edge
      setEdges((eds) => addEdge(newEdge, eds));
    },
    [] // Dependencies array, empty means it doesn't depend on any external variables
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  // const [imageUrl, setImageUrl] = useState('');
               
  //     useEffect(() => {

  //       const storedImageUrl = localStorage.getItem('draggedImage');
  //       if (storedImageUrl) {
  //           setImageUrl(storedImageUrl);
  //       }
  //   }, []);

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

   // Load state from local storage or initialize
  //  useEffect(() => {
  //   const savedNodes = localStorage.getItem('nodes');
  //   const savedEdges = localStorage.getItem('edges');
  //   if (savedNodes) {
  //     setNodes(JSON.parse(savedNodes));
  //   }
  //   if (savedEdges) {
  //     setEdges(JSON.parse(savedEdges));
  //   }
  // }, [setNodes, setEdges]);

  let navigate = useNavigate('')

  function save() {
      // // localStorage.setItem('nodes', JSON.stringify(nodes));
      // // localStorage.setItem('edges', JSON.stringify(edges));
      //  localStorage.setItem('data', JSON.stringify(data));
      console.log(JSON.stringify(data));
      

      axios.post('http://localhost:8000/api/flow/save/',JSON.stringify(data))
      .then((res)=>{
        console.log(res.data);
        navigate('/admindashboard/view')
        alert("Data Saved!!!")
      })
      .catch((err)=>{
        console.log(err);
        alert('Not Saved!!!')
      })
      
  }


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
        {/* <MiniMap /> */}
      </ReactFlow>
      <div id='btn'><button onClick={save}>Save</button></div>
    </div>

  </div>
);
};

export default () => (
  <ReactFlowProvider>
    <DnDFlow />
  </ReactFlowProvider>
);
