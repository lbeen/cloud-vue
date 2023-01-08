import {ajaxGet, ajaxPost} from '@/api/axios'

export function queryResourcePage(param, callback) {
    ajaxGet('system/kanban/queryResourcePage', param, callback)
}

export function saveResource(param, callback) {
    ajaxPost('system/kanban/saveResource', param, callback)
}