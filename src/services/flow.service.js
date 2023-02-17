import workflowService from "./workflow.service";
import { getTextWidth } from 'get-text-width';

class FlowService {
    toNodes(rulesets) {
        let previousPosition = 0
        return rulesets.map((ruleset, i) => {
            const name = ruleset.name;
            const rules = ruleset.rules
            const availableStatuses = ruleset.triggers.map(t => t.status)

            const textWidth = this.getCardWidth({name:ruleset.name}, ...rules)
            const node = {
                id: ruleset.name,
                position: { y: 0, x: previousPosition},
                data: { name, rules, availableStatuses },
                type: "rulesetNode"
            }
            previousPosition = previousPosition + textWidth + 50
            return node
        })
    }
    toEdges(rulesets) {
        return rulesets.flatMap((ruleset) => {
            const linkedRulesets = workflowService.getLinkedRulesets(ruleset.rules)
            return linkedRulesets.map(linkedRuleset => {
                return {
                    id: `${ruleset.name}-${linkedRuleset}`,
                    source: ruleset.name,
                    target: linkedRuleset
                }
            })
        })
    }
    getCardWidth(...strings) {
        const widths = strings.map(str => {
            return getTextWidth(str.name)
        })
        return Math.max(...widths)
    }
}

export default new FlowService()