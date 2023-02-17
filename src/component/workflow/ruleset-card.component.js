import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';

export default memo(({ data, isConnectable }) => {
  return (
    <>
      <Handle
        type="target"
        position={Position.Left}
        style={{ background: '#555' }}
        onConnect={(params) => console.log('handle onConnect', params)}
        isConnectable={isConnectable}
      />
      <div>{data.label}</div>
      
      <Handle
        type="source"
        position={Position.Right}
        id="a"
        style={{  background: '#555' }}
        isConnectable={isConnectable}
      />
    </>
  );
});
