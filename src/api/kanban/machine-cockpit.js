import {ajaxGet} from '@/api/api'

export function getYieldByProcess(param, callback) {
    ajaxGet('kanban/cockpit/machine/yieldByProcess', param, callback)
}

export function getYieldByEquipment(param, callback) {
    ajaxGet('kanban/cockpit/machine/yieldByEquipment', param, callback)
}

export function getOnlineByProcess(param, callback) {
    ajaxGet('kanban/cockpit/machine/onlineByProcess', param, callback)
}

export function getOnlineBySpec(param, callback) {
    ajaxGet('kanban/cockpit/machine/onlineBySpec', param, callback)
}

export function getEquipmentByProcess(param, callback) {
    ajaxGet('kanban/cockpit/machine/equipmentByProcess', param, callback)
}

export function getMaintenanceTimeByEquipment(param, callback) {
    ajaxGet('kanban/cockpit/machine/maintenanceTimeByEquipment', param, callback)
}

export function getWaitingTimeByEquipment(param, callback) {
    ajaxGet('kanban/cockpit/machine/waitingTimeByEquipment', param, callback)
}

export function getPayLengthByProcess(param, callback) {
    ajaxGet('kanban/cockpit/machine/payLengthByProcess', param, callback)
}

export function getPayLengthByReason(param, callback) {
    ajaxGet('kanban/cockpit/machine/payLengthByReason', param, callback)
}