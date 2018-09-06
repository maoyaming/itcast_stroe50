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
            <el-button plain @click="addUserDialogFormVisible = true">添加用户</el-button>

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
            @change="handleChange(scope.row)"
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
            <el-button @click="handleOpenSetRole(scope.row)" type="success" icon="el-icon-check" size="mini" plain></el-button>
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
    <!-- 添加角色对话框   sync 语法糖 值是双向的-->
    <el-dialog 
        title="添加成员"
        :visible.sync="addUserDialogFormVisible">
        <el-form 
        label-width="80px"
        :rules="rules" 
        :model="formData">
            <el-form-item label="用户名" :rules="rules" prop="username">
                <el-input v-model="formData.username" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" >
                <el-input type="password" v-model="formData.password" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" >
                <el-input v-model="formData.email" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="电话" >
                <el-input v-model="formData.mobile" auto-complete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="addUserDialogFormVisible = false">取 消</el-button>
            <el-button @click="handleAdd" type="primary">确 定</el-button>
        </div>
    </el-dialog>
    
    <!-- 分配角色对话框 -->
    <el-dialog 
        title="分配角色"
        :visible.sync="setRoleDialogFormVisible">
        <el-form 
        label-width="80px"
        :model="formData">
            <el-form-item label="用户名">
                {{ formData.username }}
            </el-form-item>
             <el-form-item label="选择角色">
                 <el-select v-model="currentRoleId" placeholder="请选择">
                    <el-option
                    label="请选择"
                    :value="-1"
                    disabled>  
                    </el-option>
                    <el-option
                        v-for="item in options.data"
                        :key="item.id"
                        :label="item.roleName"
                        :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="setRoleDialogFormVisible = false">取 消</el-button>
            <el-button @click="handleSetRole" type="primary">确 定</el-button>
        </div>
    </el-dialog>
  </el-card>
</template>
<script>
    export default {
        data() {
            return {
                tableData: [],
                pagenum: 1,
                pagesize: 2,
                total: 0,
                searchValue: '',
                addUserDialogFormVisible:false,
                setRoleDialogFormVisible:false,
                formData: {
                    username:'',
                    password:'',
                    email:'',
                    mobile:''
                },
                rules: {
                    username: [
                        { required: true, message: '请输入用户名称', trigger: 'blur' },
                        { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }
                    ]
                },
                currentRoleId: -1,
                options:[]

            }
        },
        created() {
            this.loadData()
        },
        methods: {
            async handleAdd(){
                //添加用户
                const response = await this.$http.post('users', this.formData)
                const {meta: {status, msg}} = response.data
                if(status === 201){
                    //提示 刷新表格 关闭对话框 初始化表单
                    this.$message.success(msg)
                    this.loadData()
                    this.addUserDialogFormVisible = false
                    for(let key in this.formData){
                        this.formData[key] = ''
                    }
                }else {
                    this.$message.error(msg)
                }
            },
            handleClose(){
                for(let key in this.formData){
                    this.formData[key] = ''
                }
            },
            //  设置token
            loadData() { 
                this.$http.get(`users?pagenum=${this.pagenum}&pagesize=${this.pagesize}&query=${this.searchValue}`)
                .then((response)=>{
                    const {meta: {msg, status}} = response.data
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
            // 用户角色信息
            async handleOpenSetRole(user){
                this.setRoleDialogFormVisible = true
                this.formData.username = user.username
                const response = await this.$http.get('roles')      
                this.options = response.data  
                
                //当前用户默认角色
                const res = await this.$http.get(`users/${user.id}`)
                this.currentRoleId = res.data.data.rid
                this.formData.id = user.id
            },
            // 分页方法
            handleSizeChange(val){
                // 页容量发生变化
                this.pagesize = val
                this.loadData()
            },
            // 更改角色信息事件
            async handleSetRole(){
               const response = await this.$http.put(`users/${this.formData.id}/role`,{rid:this.currentRoleId})
               const {meta: {msg, status}} = response.data
               if(status === 200){
                   this.$message.success(msg)
                   this.setRoleDialogFormVisible = false
               }else{
                   this.$message.error(msg)
               }
            },
            handleCurrentChange(val){
                // 当页码发送改变执行
                this.pagenum = val
                this.loadData()
            },
            async handleChange(user){
            // id 和 状态 两个参数
                const response = await this.$http.put(`users/${user.id}/state/${user.mg_state}`)
                const {meta: {status, msg}} = response.data
                if(status === 200){
                    this.$message.success(msg)
                }else{
                    this.$message.error(msg)
                }
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
                            // 如果最后一页并只有一条数据  条件 ---> 如果不是第一页并只有一条数据
                            if(this.pagenum > 1 && this.tableData.length === 1){
                                this.pagenum--
                            }

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
