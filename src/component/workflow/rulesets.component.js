import ReactFlow, {
    Background, Controls, MiniMap
} from 'reactflow';
import RulesetCard from "./ruleset-card.component";

import 'reactflow/dist/style.css';
import flowService from "../../services/flow.service";



const nodeTypes = {
    rulesetNode: RulesetCard,
};

const parseJSON = (str) => {
    try {
       return JSON.parse(str);
    }
    catch (e) {
       console.log(e);
       return {}
    }
 }

const Rulesets = (props) => {
    const { workflow } = props

    const rulesets = parseJSON(workflow).rulesets;
    if(!rulesets) return;
    const nodes = flowService.toNodes(rulesets);
    const edges = flowService.toEdges(rulesets);
    return (
        <div className="col-md-3" style={{ height: '500px', width: '10000px' }}>
            <ReactFlow
                nodeTypes={nodeTypes}
                nodes={nodes}
                edges={edges}
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