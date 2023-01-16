import {ElMessage, ElMessageBox} from 'element-plus'

function success(message) {
    ElMessage({
        type: 'success',
        message: message,
        duration: 5000,
        showClose: true
    })
}

function error(message) {
    ElMessage({
        type: 'error',
        message: message,
        duration: 5000,
        showClose: true
    })
}

function alert(option) {
    ElMessageBox.alert(option.message, option.title || '提示', {
        confirmButtonText: option.confirmButtonText || '确定',
        type: option.type || 'warning',
    }).then(() => {
        if (option.okFun) {
            option.okFun()
        }
    }).catch(() => {
        if (option.okFun) {
            option.okFun()
        }
    })
}

function confirm(option) {
    ElMessageBox.confirm(option.message, option.title || '提示', {
        confirmButtonText: option.confirmButtonText || '确定',
        cancelButtonText: option.cancelButtonText || '取消',
        type: option.type || 'warning',
    }).then(() => {
        if (option.okFun) {
            option.okFun()
        }
    }).catch(() => {
        if (option.cancelFun) {
            option.cancelFun()
        }
    })
}

export default {
    success,
    error,
    alert,
    confirm
}