import React, { useEffect, useState } from 'react';
import { Handle } from '@xyflow/react';

const CustomNode = ({data}) => {

          //   const [imageUrl, setImageUrl] = useState('');
        
          
          //   useEffect(() => {
    
          //     const storedImageUrl = localStorage.getItem('draggedImage');
          //     if (storedImageUrl) {
          //         setImageUrl(storedImageUrl);
          //     }
          // }, []);

          const imageUrl = data?.image || 'https://via.placeholder.com/50'; // Fallback image URL

  return (
    <div className="customnodes">
      <div style={{ position: 'relative', width: 30, height: 30 }}>
        <img
          src={imageUrl} // Fallback image URL
          alt="Node Image"
          style={{ width: '100%', height: '100%', borderRadius: '4px' }}
        />
        <Handle type="source" position="right"  style={{ background: '#555' }} />
        <Handle type="target" position="left" style={{ background: '#555' }} />
      </div>
    </div>
  );
};

export default CustomNode;

