import {ajaxGet} from '@/api/api'

export function getMaoOnlineStatistics(param, callback) {
    ajaxGet('kanban/machine/maoOnlineStatistics', param, callback)
}

export function getMaoOnlineList(param, callback) {
    ajaxGet('kanban/machine/maoOnlineList', param, callback)
}