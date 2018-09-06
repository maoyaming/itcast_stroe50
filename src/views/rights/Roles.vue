<template>
    <el-card class="card"> 
        <!-- /面包屑 -->
        <my-breadcrumb leavel1='权限管理' leavel2='角色列表'></my-breadcrumb>
        <el-button
        style="margin-top:10px;margin-buttom:10px" 
        type="primary" plain>添加角色</el-button>
        <el-table border stripe :data="tableData" style="width: 100%">
            <el-table-column type="expand">
            <template slot-scope="scope">
                <!-- 一级权限 -->
                <el-row
                v-for="level1 in scope.row.children" :key="level1.id">
                    <el-col :span="4">
                        <!-- 一级权限名称 -->
                        <el-tag
                        @close="handleChose(scope.row,level1.id)"
                        closable>{{ level1.authName }}</el-tag>
                    </el-col>
                    <el-col :span="20">
                        <!-- 二级权限 -->
                        <el-row v-for="level2 in level1.children" :key="level2.id">
                            <el-col :span="4">
                                <!-- 二级权限名称 -->
                                <el-tag
                                @close="handleChose(scope.row,level2.id)"
                                type="success"
                                closable>{{ level2.authName }}</el-tag>
                            </el-col>
                            <el-col :span="20">
                                <!-- 三级权限 -->
                                <!-- 三级权限名称 -->
                                <el-tag
                                class="level3"
                                type="warning"
                                closable
                                v-for="level3 in level2.children" :key="level3.id"
                                @close="handleChose(scope.row,level3.id)"
                                >{{ level3.authName }}
                                </el-tag>
                            </el-col>
                        </el-row>
                    </el-col>
                </el-row>
                <el-row 
                v-if="scope.row.children.length === 0">
                    <el-col :span="24">没获得权限</el-col>
                </el-row>
            </template>
            </el-table-column>
            <el-table-column type="index" width="100">
            </el-table-column>
            <el-table-column label="角色名称" prop="roleName" width="300">
            </el-table-column>
            <el-table-column label="角色描述" prop="roleDesc" width="300">
            </el-table-column>
            <el-table-column label="操作">
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
          loadData() {
                this.$http.get('roles')
                    .then((response)=>{
                        const { meta: {msg, status}} = response.data
                        if(status === 200) {
                            this.tableData = response.data.data
                        }else {
                            this.$message.error(msg)
                        }
                    })
          },
          handleChose(role, rightId) {
              this.$http.delete(`roles/${role.id}/rights/${rightId}`)
                .then((response) => {
                    const { meta: {msg, status}} = response.data
                    if(status === 200) {
                        this.$message.success(msg)
                        role.children = response.data.data
                    }else {
                        this.$message.error(msg)
                    }
                })

          }
      }
    }
</script>
<style>
.level3{
    margin-right: 12px;
    margin-bottom: 5px
}

</style>
