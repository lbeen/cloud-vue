<template>
    <page-table :data-fun="dataFun" :param-fun="paramFun" query-on-load :row-click="rowClick">
        <template #query="scope">
            <el-form inline class="demo-form-inline" size="small">
                <el-form-item label="时间">
                    <el-date-picker v-model="param.time" type="datetimerange" unlink-panels
                                    value-format="YYYY-MM-DD HH:mm:ss" range-separator="至"
                                    start-placeholder="开始时间" end-placeholder="结束时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="级别">
                    <el-select v-model="param.level" placeholder="请选择级别" clearable>
                        <el-option v-for="item in levels" :key="item.value" :label="item.label"
                                   :value="item.value"/>
                    </el-select>
                </el-form-item>
                <el-form-item label="用户">
                    <el-input v-model="param.user" placeholder="请输入用户" clearable/>
                </el-form-item>
                <el-form-item label="内容">
                    <el-input v-model="param.content" placeholder="请输入内容" clearable/>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="scope.query">查询</el-button>
                </el-form-item>
            </el-form>
        </template>
        <template #column>
            <el-table-column label="序号" prop="rn" align="center" width="60px"></el-table-column>
            <el-table-column label="时间" prop="create_time" align="center" width="165px"></el-table-column>
            <el-table-column label="服务" prop="server" align="center" width="75px"></el-table-column>
            <el-table-column label="用户" prop="operate_user" align="center" width="90px"></el-table-column>
            <el-table-column label="级别" align="center" width="70px">
                <template v-slot="scope">
                    {{ scope.row.log_level === 0 ? '信息' : '错误' }}
                </template>
            </el-table-column>
            <el-table-column label="内容" align="center" prop="log_content"></el-table-column>
        </template>
    </page-table>

    <el-drawer v-model="isShowDetail" :with-header="false" size="60%">
        <el-descriptions title="日志详情" direction="vertical" :column="4" border>
            <el-descriptions-item label="级别" label-align="center" align="center">
                <el-tag v-if="logDetail.logLevel === 0" effect="dark">信息</el-tag>
                <el-tag v-else effect="dark" type="danger">错误</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="服务" label-align="center" align="center">
                {{ logDetail.server }}
            </el-descriptions-item>
            <el-descriptions-item label="服务IP" label-align="center" align="center">
                {{ logDetail.serverIP }}
            </el-descriptions-item>
            <el-descriptions-item label="服务端口" label-align="center" align="center">
                {{ logDetail.serverPort }}
            </el-descriptions-item>
            <el-descriptions-item label="用户" label-align="center" align="center">
                {{ logDetail.operateUser }}
            </el-descriptions-item>
            <el-descriptions-item label="客户端IP" label-align="center" align="center">
                {{ logDetail.clientIP }}
            </el-descriptions-item>
            <el-descriptions-item label="时间" label-align="center" align="center" :span="2">
                {{ formatDateTime(new Date(logDetail.createTime)) }}
            </el-descriptions-item>
            <el-descriptions-item label="内容" label-align="center" :span="4">
                {{ logDetail.logContent }}
            </el-descriptions-item>
        </el-descriptions>
    </el-drawer>
</template>

<script setup>
import PageTable from '@/components/common/page-table.vue'
import {queryLogById, queryLogPage} from '@/api/system/log'
import {reactive, ref} from 'vue'
import Tips from '@/utils/Tips'
import {format0OClock, formatDateTime} from '@/utils/date'

const factories = [{

}]
const param = reactive({
    level: '',
    user: '',
    content: '',
    time: [format0OClock(new Date('2022-01-01')), formatDateTime(new Date())]
})

const levels = [{
    value: 0,
    label: '信息',
}, {
    value: 1,
    label: '错误',
}]

const dataFun = queryLogPage
const paramFun = () => {
    if (!param.time[0] || !param.time[1]) {
        Tips.error('开始结束时间不能为空')
        return
    }
    return {
        startTime: param.time[0],
        endTime: param.time[1],
        level: param.level,
        user: param.user,
        content: param.content
    }
}

const isShowDetail = ref(false)
const logDetail = ref({
    createTime: '',
    logLevel: '',
    server: '',
    serverPort: '',
    serverIP: '',
    clientIP: '',
    operateUser: '',
    logContent: ''
})
const rowClick = row => queryLogById(row.id, data => {
    logDetail.value = data
    isShowDetail.value = true
})
</script>