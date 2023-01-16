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
                    <el-button type="primary" @click="scope.query" id="queryButton">查询</el-button>
                    <el-button type="success" @click="openEdit('')">新增</el-button>
                </el-form-item>
            </el-form>
        </template>
        <template #column>
            <el-table-column label="序号" type="rn" width="60px"/>
            <el-table-column label="工厂" align="center" width="60px">
                <template v-slot="scope">{{ factories[scope.row.factory] }}</template>
            </el-table-column>
            <el-table-column label="名称" align="center" width="200px">
                <template v-slot="scope">
                    <el-link type="primary" target="_blank" :href="scope.row.resource_location">
                        {{ scope.row.resource_name }}
                    </el-link>
                </template>
            </el-table-column>
            <el-table-column label="类型" prop="resource_type" align="center" width="100px"/>
            <el-table-column label="位置" prop="resource_location" align="center"/>
            <el-table-column label="数量" prop="resource_count" align="center" width="100px"/>
            <el-table-column label="时长" prop="resource_duration" align="center" width="100px"/>
            <el-table-column label="操作" align="center" width="180px">
                <template v-slot="scope">
                    <el-button type="primary" @click="openEdit(scope.row)">编辑</el-button>
                    <el-button type="danger" @click="deleteItem(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </template>
    </page-table>

    <el-dialog :title="editTitle" v-model="isShowEdit" :close-on-click-modal="false" width="600px">
        <el-form :model="formData.data" :rules="formData.rules" label-width="80px" ref="form">
            <el-row :gutter="20">
                <el-col :span="12">
                    <el-form-item label="工厂" prop="factory">
                        <m-select v-model="formData.data.factory" placeholder="请选择工厂" :items="factories"/>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="12">
                    <el-form-item label="资源名称" prop="name">
                        <el-input v-model="formData.data.name" placeholder="资源名称"/>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="资源类型" prop="type">
                        <m-select v-model="formData.data.type" placeholder="请选择资源类型" clearable :items="types"/>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row v-if="formData.data.type === 'HTML'" :gutter="20">
                <el-col :span="24">
                    <el-form-item label="资源位置" prop="location">
                        <el-input type="textarea" v-model="formData.data.location"
                                  placeholder="内部链接或是外部链接"/>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row v-if="formData.data.type === 'PPT' || formData.data.type === 'VIDEO'" :gutter="20">
                <el-col :span="12">
                    <el-form-item label="资源位置" prop="location">
                        <m-select v-model="formData.data.location" placeholder="视频或PPT目录" :items="locations"/>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row v-if="formData.data.type === 'PPT' || formData.data.type === 'VIDEO'" :gutter="20">
                <el-col :span="12">
                    <el-form-item label="资源数量" prop="count">
                        <el-input-number v-model="formData.data.count" :min="0" :step="1" step-strictly/>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="资源时长" prop="duration">
                        <el-input-number v-model="formData.data.duration" :min="0" :step="1" step-strictly/>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <template #footer>
            <el-button @click="isShowEdit = false">取 消</el-button>
            <el-button type="primary" @click="save">保 存</el-button>
        </template>
    </el-dialog>
</template>

<script setup>
import PageTable from '@/components/common/page-table.vue'
import {reactive, ref} from 'vue'
import {deleteResource, queryResourcePage, saveResource} from '@/api/system/kanban'
import MSelect from '@/components/common/m-select.vue'
import Tips from '@/utils/Tips'

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
const getResourceLink2 = () => ''

const formData = reactive({
    data: {
        id: '',
        factory: '',
        type: '',
        name: '',
        location: '',
        count: 0,
        duration: 0
    },
    rules: {
        factory: [{
            required: true,
            message: '请选择工厂',
            trigger: 'blur'
        }],
        name: [{
            required: true,
            message: '请输入资源名称',
            trigger: 'blur'
        }],
        type: [{
            required: true,
            message: '请选择资源类型',
            trigger: 'blur'
        }],
        location: [{
            required: true,
            message: '请选择或输入资源类型',
            trigger: 'blur'
        }],
        count: [{
            trigger: 'blur',
            validator: (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('请输入资源数量'))
                }
                callback()
            }
        }],
        duration: [{
            trigger: 'blur',
            validator: (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('请输入资源时长'))
                }
                callback()
            }
        }]
    }
})

const isShowEdit = ref(false)
const locations = ref([])
const editTitle = ref('')
const openEdit = item => {
    if (item) {
        editTitle.value = '修改'
        formData.data = {
            id: item.id,
            factory: item.factory,
            type: item.resource_type,
            name: item.resource_name,
            location: item.resource_location,
            count: item.resource_count,
            duration: item.resource_duration
        }
    } else {
        editTitle.value = '新增'
        formData.data = {
            id: '',
            factory: '',
            type: '',
            name: '',
            location: '',
            count: 0,
            duration: 0
        }
    }
    isShowEdit.value = true
}

const form = ref(null)
const save = () => {
    form.value.validate(valid => {
        if (valid) {
            saveResource(formData.data, () => {
                document.getElementById('queryButton').click()
                isShowEdit.value = false
            })
        }
    })
}
const deleteItem = row => {
    Tips.confirm({
        message:'确定删除【' + row.resource_name + '】？',
        confirmButtonText:'删除',
        okFun:() => deleteResource(row.id, () => document.getElementById('queryButton').click())
    })
}
</script>