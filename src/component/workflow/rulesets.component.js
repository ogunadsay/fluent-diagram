import workflowService from "../../services/workflow.service";
import RulesetCard from "./ruleset-card.component";

const Rulesets = (props) => {
    const { workflow } = props

    const rulesets = JSON.parse(workflow).rulesets;
    const objects = rulesets.map(ruleset => workflowService.toCardObject(ruleset));

    return (
        <div className="col-md-3">
            {objects.map(card => <RulesetCard key={card.name} obj={card} />)}
        </div>
    )
}

export default Rulesets