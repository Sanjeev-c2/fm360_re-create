import React, { useEffect, useState } from 'react';
import { Handle ,NodeResizer} from '@xyflow/react';

const CustomNode = ({data,selected}) => {

          //   const [imageUrl, setImageUrl] = useState('');
        
          
          //   useEffect(() => {
    
          //     const storedImageUrl = localStorage.getItem('draggedImage');
          //     if (storedImageUrl) {
          //         setImageUrl(storedImageUrl);
          //     }
          // }, []);

          const imageUrl = data?.image || 'https://via.placeholder.com/50'; // Fallback image URL
// let selected=true;
  return (
    <div className="customnodes" >
      <div style={{
        // position:'relative',
        // right:"30px",
      width:"60px",height:"20px"}}> 
      <NodeResizer color="#ff0000"
        isVisible={selected} 
        // maxWidth={10} maxHeight={10} 
        style={{ 
          width: '100%', height: '100%',
          // position:"absolute"
        backgroundSize:"cover"
         }}/>
         
        <img
          src={imageUrl} // Fallback image URL
          alt="Node Image"
          style={{ width: '100%', height: '100%', borderRadius: '4px',
            right:"1px",
            position:"absolute",backgroundSize:"cover"}}
        />
        {/* </div> */}
        <Handle type="source" position="right"  style={{ background: '#555' }} />
        <Handle type="target" position="left" style={{ background: '#555' }} />
     
      </div>
    </div>
  );
};

export default CustomNode;

