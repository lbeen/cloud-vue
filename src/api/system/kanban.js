import {ajaxGet, ajaxPost} from '@/api/api'

export function queryResourcePage(param, callback, errorCallback) {
    ajaxGet('system/kanban/queryResourcePage', param, callback, errorCallback)
}

export function saveResource(param, callback) {
    ajaxPost('system/kanban/saveResource', param, callback)
}