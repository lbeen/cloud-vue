<template>
    <div class="_tag">
        <el-scrollbar class="scrollbar" height="50px">
            <div class="tags">
                <el-tag
                    v-for="tag in tagsList"
                    :key="tag.title"
                    :closable="tag.closable"
                >{{ tag.title }}
<!--                    <router-link :to="tag.path" class="tag-title">{{ tag.title }}</router-link>-->
                </el-tag>
            </div>
        </el-scrollbar>

<!--        <el-tag v-for="tag in tags" effect="plain" :type="tag.selected ? 'info' : ''" :closable="tag.closable"-->
<!--                style="margin-right: 5px;">-->
<!--            {{ tag.title }}-->
<!--        </el-tag>-->
<!--        <el-dropdown @command="handleCloseBtn" class="_dropdown">-->
<!--            <el-button type="primary" size="small">-->
<!--                标签选项-->
<!--                <i class="el-icon-caret-bottom el-icon&#45;&#45;right"></i>-->
<!--            </el-button>-->
<!--            <el-dropdown-menu slot="dropdown">-->
<!--                <el-dropdown-item command="closeOther">关闭其它</el-dropdown-item>-->
<!--                <el-dropdown-item command="closeAll">关闭所有</el-dropdown-item>-->
<!--            </el-dropdown-menu>-->
<!--        </el-dropdown>-->
    </div>
</template>


<script setup>
import {reactive, ref} from 'vue'

const tagsList = reactive([])
for (let i = 0; i < 20; i++) {
    tagsList.push({
        title: 'tag' + (i + 1) + 'tag' + (i + 1),
        closable: false,
        selected: false
    })
}
</script>
<style lang="scss">
._tag {
    width: 500px;
    //display: flex;
    //align-items: center;
    //justify-content: space-between;
    //background-color: rgba(116, 116, 116, 0.281);

    .scrollbar {
        width: 100%;
        margin-right: 6px;
        .tags {
            display: flex;
            width: 1px; //这一行是关键，其值大小无所谓，但这个属性要有，且单位为px,不能是100%
            .el-tag {
                margin-left: 6px;
                .tag-title {
                    color: black;
                    padding: 8px 2px;
                    text-decoration: none;
                }
            }
        }
    }

    ._dropdown {
        height: 40px;

        display: flex;
        align-items: center;
        box-shadow: rgba(0, 0, 0, 0.1) -3px 0px 15px 3px;
        padding: 0 5px;
        background-color: rgba(116, 116, 116, 0.329);
        .el-button--primary {
            background-color: #00561f;
        }
        .el-button {
            border: #00561f;
        }
    }
}
</style>