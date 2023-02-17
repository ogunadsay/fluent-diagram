import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';

export default memo(({ data }) => {
    return (
        <>
            <Handle
                type="target"
                position={Position.Left}
                style={{ background: '#555' }}
            />
            <div style={{minHeight: '200px', border: '1px solid black', padding: '5px 10px'}}>
                <p>{data.name}</p>
                <hr />
                <div>
                    {data.rules.map(rule => (<p key={rule.name}>{rule.name}</p>))}
                </div>
                <hr />
                {data.availableStatuses.map(status => (<p key={status}>{status}</p>))}
            </div>

            <Handle
                type="source"
                position={Position.Right}
                style={{ background: '#555' }}
            />
        </>
    );
});
