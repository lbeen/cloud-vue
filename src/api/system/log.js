import {ajaxGet} from '@/api/api'

export function queryLogPage(param, callback, errorCallback) {
    ajaxGet('system/log/queryLogPage', param, callback, errorCallback)
}

export function queryLogById(id, callback) {
    ajaxGet('system/log/queryLogById', {id}, callback)
}