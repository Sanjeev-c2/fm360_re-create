import React from 'react';
import '../Styles/Sidebar.css'
import anode from '../Images/anode.png'
import Resistor from '../Images/Resistor.png'
import Resistor1 from '../Images/Resistor1.png'
import Inductor from '../Images/Inductor.png'
import Switch from '../Images/Switch.png'
import Battery from '../Images/Battery.png'
import Earth from '../Images/Earth.png'

const Sidebar = () => {
  const onDragStart = (event, nodeType, imageUrl) => {

    event.dataTransfer.setData('application/reactflow',JSON.stringify({ type: nodeType, imageUrl }));
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside>
      
        <div className="description">You can drag these circuit symbol to the pane on the right to make custom circuits.</div>
        <div className='sidebar'>
        <div className="dndnode default" onDragStart={(event) => onDragStart(event, 'custom',`${anode}`)} draggable>
          <img
            src={anode}
            alt="Node Image"
            style={{ height: '30px', width: '30px', cursor: 'move' }}
          />
        </div>
        <div className="dndnode" onDragStart={(event) => onDragStart(event, 'custom',`${Resistor}`)} draggable>
          <img
            src={Resistor}
            alt="Node Image"
            style={{ height: '30px', width: '30px' }}
          />
        </div>
        <div className="dndnode default" onDragStart={(event) => onDragStart(event, 'custom',`${Switch}`)} draggable>
          <img
            src={Switch}
            alt="Node Image"
            style={{ height: '30px', width: '30px' }}
          />
        </div>
        <div className="dndnode default" onDragStart={(event) => onDragStart(event, 'custom',`${Inductor}`)} draggable>
          <img
            src={Inductor}
            alt="Node Image"
            style={{ height: '30px', width: '30px' }}
          />
        </div>
        <div className="dndnode default" onDragStart={(event) => onDragStart(event, 'custom',`${Battery}`)} draggable>
          <img
            src={Battery}
            alt="Node Image"
            style={{ height: '30px', width: '30px' }}
          />
        </div>
        <div className="dndnode default" onDragStart={(event) => onDragStart(event, 'custom',`${Resistor1}`)} draggable>
          <img
            src={Resistor1}
            alt="Node Image"
            style={{ height: '30px', width: '30px' }}
          />
        </div>
        <div className="dndnode default" onDragStart={(event) => onDragStart(event, 'custom',`${Earth}`)} draggable>
          <img
            src={Earth}
            alt="Node Image"
            style={{ height: '30px', width: '30px' }}
          />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;