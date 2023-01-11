<template>
    <page-table :data-fun="queryResourcePage" :param-fun="paramFun" query-on-load>
        <template #query="scope">
            <el-form inline class="demo-form-inline" size="small">
                <el-form-item label="工厂">
                    <m-select v-model="param.factory" placeholder="请选择工厂" clearable :items="factories"/>
                </el-form-item>
                <el-form-item label="资源类型">
                    <m-select v-model="param.type" placeholder="请选择资源类型" clearable :items="types"/>
                </el-form-item>
                <el-form-item label="资源名称">
                    <el-input v-model="param.name" placeholder="请输入资源名称" clearable/>
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
import {queryResourcePage} from '@/api/system/kanban'
import MSelect from '@/components/common/m-select.vue'

const factories = {
    'BS': '保山',
    'TC': '腾冲'
}
const types = ['HTML', 'PPT', 'VIDEO']
const param = reactive({
    factory: '',
    type: '',
    name: ''
})
const paramFun = () => param

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