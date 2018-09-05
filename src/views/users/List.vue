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
                clearable
                v-model="searchValue"
                style="width:300px"
                placeholder="请输入内容" class="input-with-select">
                <el-button @click="handleSerach" slot="append" icon="el-icon-search"></el-button>
            </el-input>
            <el-button plain>添加用户</el-button>
        </el-col>
    </el-row>
    <!-- 表格 -->
    <el-table
      v-loading="loading"
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
            <el-button @click="handleDelete(scope.row.id)" type="danger" icon="el-icon-delete" size="mini" plain></el-button>
      </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
     <el-pagination
      style="margin-top:15px"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[ 2, 3, 4, 5]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </el-card>
</template>
<script>
    export default {
        data() {
            return {
                tableData: [],
                loading: true,
                pagenum: 1,
                pagesize: 2,
                total: 0,
                searchValue: ''

            }
        },
        created() {
            this.loadData()
        },
        methods: {
            //  设置token
            loadData() { 
                this.loading=true
                const token = sessionStorage.getItem('token')
                this.$http.defaults.headers.common['Authorization'] = token
                this.$http.get(`users?pagenum=${this.pagenum}&pagesize=${this.pagesize}&query=${this.searchValue}`)
                .then((response)=>{
                    const {meta: {msg, status}} = response.data
                    this.loading = false
                    if(status === 200){
                        this.tableData = response.data.data.users
                        //设置总条数
                        this.total = response.data.data.total
                        
                    }else {
                        this.$message.error(msg)
                    }
                })
                .catch((err)=>{
                    console.log(err);
                    
                })
            },
            // 分页方法
            handleSizeChange(val){
                // 页容量发生变化
                this.pagesize = val
                this.loadData()
            },
            handleCurrentChange(val){
                // 当页码发送改变执行
                this.pagenum = val
                this.loadData()
            },
            handleSerach(){
                //搜索功能
               
                this.loadData()
            },
            handleDelete(id){
                //删除功能
                this.$confirm('确认删除?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                    }).then( async () => {
                        const response = await this.$http.delete(`users/${id}`)
                        const {meta: {status, msg}} = response.data
                        if(status === 200){
                            // 成功提示并刷新表格
                            this.$message.success(msg)
                            this.loadData()
                        }else{
                            this.$message.error(msg)
                        }
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        });          
                    });
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
