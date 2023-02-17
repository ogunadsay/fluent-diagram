import workflowService from "../../services/workflow.service";
import RulesetCard from "./ruleset-card.component";
import { useCallback, useEffect } from 'react';
import ReactFlow, {
    MiniMap,
    Controls,
    Background,
    useNodesState,
    useEdgesState,
    addEdge,
} from 'reactflow';

import 'reactflow/dist/style.css';


const initialEdges = [{ id: 'e1-2', source: 'CREATE', target: 'ActivateLocation' }];

const nodeTypes = {
    rulesetCard: RulesetCard,
};

const Rulesets = (props) => {
    const { workflow } = props

    const rulesets = JSON.parse(workflow).rulesets;
    const objects = rulesets.map(ruleset => workflowService.toCardObject(ruleset));

    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

    useEffect(() => {
        setNodes(objects.map((ruleset, i) => {
            const index = i + 1
            return {
                id: ruleset.name,
                position: { y: index * 1, x: index * 200 },
                data: { label: ruleset.name },
                type:"rulesetCard"
            }
        }));
    }, [objects, setNodes]);

    return (
        <div className="col-md-3" style={{ height: '500px', width: '10000px' }}>
            <ReactFlow
                nodeTypes={nodeTypes}
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                fitView
            >
                <MiniMap />
                <Controls />
                <Background />
            </ReactFlow>
        </div>

    );
}

export default Rulesets