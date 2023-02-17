import { useEffect, useState } from "react"
import workflowService from "../../services/workflow.service"
import Rulesets from "./rulesets.component"
import { ReactFlowProvider } from 'reactflow';
const WorkflowInput = () => {
    const initialState = {
        "retailerId": "",
        "version": "",
        "entityType": "",
        "entitySubtype": "",
        "description": "",
        "versionComment": "",
        "createdBy": " ",
        "createdOn": "",
        "id": 0,
        "name": "",
        "rulesets": []
    }

    const [workflow, setWorkflow] = useState(workflowService.beautifyWorkflow(JSON.stringify(initialState)))

    const handleInputChange = (event) => {
        setWorkflow(event.target.value)
    }

    const beautifyWorkflow = () => {
        setWorkflow(workflowService.beautifyWorkflow(workflow))
    }

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-3">
                    <button className="form-control" id="beutify-button" onClick={beautifyWorkflow}>Beautify</button>
                </div>
                <div className="col-md-9"><textarea rows={10} className="form-control" aria-label="With textarea" value={workflow} onChange={handleInputChange}></textarea></div>
            </div>

            <div className="row">
            <ReactFlowProvider>
                <Rulesets workflow={workflow}/>
            </ReactFlowProvider>
            </div>
        </div>
    )
}

export default WorkflowInput