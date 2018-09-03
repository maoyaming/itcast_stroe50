<template>
 <el-container>
   <el-header>
       <el-row>
            <el-col :span="4">
                <img src="@/assets/logo.png">
            </el-col>
            <el-col class="middle" :span="19">
                <span>电商后台管理系统</span>
            </el-col>
            <el-col :span="1">
                <a class="loginLot" href="javascript:;">退出</a>
            </el-col>
        </el-row>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu
            :unique-opened="true"
            :router="true"
            style="height:100%"
            default-active="0">
            <el-submenu index="1">
                <template slot="title">
                <i class="el-icon-location"></i>
                <span>用户管理</span>
                </template>
                <el-menu-item-group>
                <el-menu-item index="/users">
                <i class="el-icon-search"></i>
                    用户列表
                </el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2">
                <template slot="title">
                <i class="el-icon-location"></i>
                <span>权限管理</span>
                </template>
                <el-menu-item-group>
                <el-menu-item index="/roles"> <i class="el-icon-search"></i>角色列表</el-menu-item>
                <el-menu-item index="/rights"> <i class="el-icon-search"></i>权限列表</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="3">
                <template slot="title">
                <i class="el-icon-location"></i>
                <span>商品管理</span>
                </template>
                <el-menu-item-group>
                <el-menu-item index="3-1"> <i class="el-icon-search"></i>商品列表</el-menu-item>
                <el-menu-item index="3-2"> <i class="el-icon-search"></i>分类参数</el-menu-item>
                <el-menu-item index="3-3"> <i class="el-icon-search"></i>商品分类</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="4">
                <template slot="title">
                <i class="el-icon-location"></i>
                <span>订单管理</span>
                </template>
                <el-menu-item-group>
                <el-menu-item index="4-1"> <i class="el-icon-search"></i>订单列表</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
        </el-menu>
    </el-aside>
      <el-main>Main</el-main>
    </el-container>
 </el-container>
</template>
<script>
    
</script>
<style>
.loginLot {
    text-decoration:none;
    color: orange
}
.middle {
    text-align: center;
    line-height: 60px; 
    font-size: 24px;
    color:#fff;
}
.el-container {
    height: 100%;
}
.el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px; 
    padding: 0;
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
  }
  
</style>
