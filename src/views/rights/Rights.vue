<template>
    <el-card class="card"> 
        <!-- /面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>权限管理</el-breadcrumb-item>
        <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-table
      border
      stripe
      :data="tableData"
      style="width: 100%; margin-top:10px">
      <el-table-column
        type="index"
        label="#"
        width="60">
      </el-table-column>
      <el-table-column
        prop="authName"
        label="权限名称"
        width="300">
      </el-table-column>
      <el-table-column
        prop="path"
        label="路径"
        width="300">
      </el-table-column>
      <el-table-column
        prop="level"
        label="层级">
        <template slot-scope="scope">
            <span v-if="scope.row.level === '0'">一级</span>
            <span v-else-if="scope.row.level === '1'">二级</span>
            <span v-else-if="scope.row.level === '2'">三级</span>
        </template>
      </el-table-column>
    </el-table>

    </el-card>
</template>
<script>
    export default {
        data(){
            return {
                tableData:[]
            }
        },
        created(){
            this.loadData()
        },
        methods: {
            loadData() {
                this.$http.get('rights/list')
                    .then((response)=>{
                        const { meta: {status, msg}} = response.data
                        if(status === 200){
                            this.$message.success(msg)
                            this.tableData = response.data.data
                            
                        }
                        
                    })
            }
        }
    }
</script>
<style>
.card {
    width: 100%;
    overflow: auto;
}
</style>
