import {ajaxGet, ajaxPost, ajaxPostParam} from '@/api/api'

export function queryResourcePage(param, callback, errorCallback) {
    ajaxGet('system/kanban/queryResourcePage', param, callback, errorCallback)
}

export function saveResource(param, callback) {
    ajaxPost('system/kanban/saveResource', param, callback)
}

export function deleteResource(id, callback) {
    ajaxPostParam('system/kanban/deleteResource', {id: id}, callback)
}