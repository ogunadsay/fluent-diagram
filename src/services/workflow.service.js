class WorkflowService {
    constructor(){
        this.eventSenders = new Map()
        this.eventSenders.set("{{clientId}}.CLCommon.EmaSendEvent",["eventname"])
        this.eventSenders.set("{{clientId}}.CLEvents.EmaVerifyFulfilmentsAndSendEventToWave",["eventName"])
        this.eventSenders.set("FLUENTRETAIL.base.SendEventForAllFulfilments",["eventName"])
        this.eventSenders.set("{{clientId}}.CLEvents.EmaSendEventOnVerifyingIfAttributeExists",["eventName"])
        this.eventSenders.set("FLUENTRETAIL.base.SendEventForAllFulfilmentsFromWave",["eventName"])
        this.eventSenders.set("{{clientId}}.CLEvents.EmaSendEventOnBatchInventoryUpdate",["inventoryPositionCreateEvent","inventoryPositionUpdateEvent"])
        this.eventSenders.set("{{clientId}}.CLEvents.EmaSendEventToVirtualCatalogueOnNetworkChange",["eventName"])
        this.eventSenders.set("{{clientId}}.CLEvents.EmaSendEventToInventoryPosition",["eventName"])
        this.eventSenders.set("{{clientId}}.CLEvents.EmaSendEventToAllInventoryQuantities",["eventName"])
        this.eventSenders.set("{{clientId}}.CLEvents.EmaSendEventOnFulfilmentInventoryUpdateRule",["inventoryCancelEvent","inventoryReserveEvent","inventoryCorrectionEvent","inventoryConfirmationEvent"])
        this.eventSenders.set("{{clientId}}.CLEvents.EmaSendEventOnBatchInventoryQuantityUpdate",["inventoryPositionCreateEvent","inventoryPositionUpdateEvent"])
        this.eventSenders.set("{{clientId}}.CLEvents.EmaSendEventToAllInventoryQuantities",["eventName"])
        this.eventSenders.set("{{clientId}}.GMGCommon.EmaSendEventCompleteToOrderV2",["refundEvent","exchangeEvent"])
        this.eventSenders.set("{{clientId}}.GMGCommon.EmaVerifyIsExchangeOrderRejectedAndSendEvent",["failEvent"])
        this.eventSenders.set("{{clientId}}.GMGCommon.EmaSendEventBasedOnReturnItemTypeRule",["bigBoxEvent","superCareEvent","normalEvent","productCatalogueRef"])
        this.eventSenders.set("{{clientId}}.GMGCommon.EmaCheckIfReturnOrderItemsAreBigBoxAndSendEvent",["bigBoxEvent","nonBigBoxEvent","productCatalogueRef"])
        this.eventSenders.set("{{clientId}}.GMGCommon.EmaSendEventOrderUpdateReturnedQuantity",["updateEvent"])
        this.eventSenders.set("{{clientId}}.CLEvents.EmaSendEventForReturnToFulfilments",["eventName"])

        // todo add more events here
    }
    
    toCardObject(ruleset) {
        const name = ruleset.name;
        const rules = ruleset.rules
        const availableStatuses = ruleset.triggers.map(t => t.status)
        const linkedRuleset = this.getLinkedRulesets(rules)
        return { name, rules, availableStatuses, linkedRuleset }
    }
    getLinkedRulesets(rules) {
        return rules.map(rule => {
            const eventNameKey = this.eventSenders.get(rule.name)
            return rule.props[eventNameKey]
        })
        .filter(Boolean)
    }
    beautifyWorkflow(workflow) {
        try {
            var ugly = workflow;
            var obj = JSON.parse(ugly);
            return JSON.stringify(obj, undefined, 4);
        } catch {
            return workflow
        }
    }
}

export default new WorkflowService()