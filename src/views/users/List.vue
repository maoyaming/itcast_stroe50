<template>
  <el-card class="card">
   <!-- /面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索 -->
    <el-row class="row">
        <el-col :span="24">
            <el-input 
                style="width:300px"
                placeholder="请输入内容" v-model="input5" class="input-with-select">
                <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
            <el-button plain>添加用户</el-button>
        </el-col>
    </el-row>
    <!-- 表格 -->
    <el-table
      :data="tableData"
       border
       stripe
      style="width: 100%">
      <!-- 序号列 -->
      <el-table-column
        type="index"
        width="50">
      </el-table-column>
      <!-- 姓名列 prop绑定对象的属性-->
      <el-table-column
        prop="username"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱"
        width="180">
      </el-table-column>
      <el-table-column
        prop="mobile"
        label="电话"
        width="180">
      </el-table-column>
       <el-table-column
        label="时间"
        width="180">
        <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.create_time | fmtDate('YYYY-MM-DD') }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="用户状态"
        width="80">
         <template slot-scope="scope">
            <el-switch
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949">
            </el-switch>
        </template>
      </el-table-column>
      <el-table-column
        label="操作">
         <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" size="mini" plain></el-button>
            <el-button type="success" icon="el-icon-check" size="mini" plain></el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini" plain></el-button>
      </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>
<script>
    export default {
        data() {
            return {
                tableData:[]
            }
        },
        created() {
            this.loadData()
        },
        methods: {
            //  设置token
            loadData() { 
                const token = sessionStorage.getItem('token')
                this.$http.defaults.headers.common['Authorization'] = token
                this.$http.get('users?pagenum=1&pagesize=10')
                .then((response)=>{
                    const {meta: {msg, status}} = response.data
                    if(status === 200){
                        this.tableData = response.data.data.users
                    }else {
                        this.$message.error(msg)
                    }
                })
                .catch((err)=>{
                    console.log(err);
                    
                })
            }
        }
    }
</script>
<style>
.card {
    height: 100%;
}
.row {
    margin-top: 15px;
    margin-bottom: 15px;

}
</style>
