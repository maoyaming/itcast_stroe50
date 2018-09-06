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
                <a class="loginLot" href="javascript:;" @click.prevent="handleOut">退出</a>
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
            <el-submenu
            v-for="level1 in menus" :key="level1.id"
            :index="level1.path">
                <template slot="title">
                <i class="el-icon-location"></i>
                <span>{{ level1.authName }}</span>
                </template>
                <el-menu-item
                 v-for="level2 in level1.children" :key="level2.id"
                :index ="'/' + level2.path">
                <i class="el-icon-search"></i>
                    {{ level2.authName }}
                </el-menu-item>
            </el-submenu>
           
        </el-menu>
    </el-aside>
      <el-main>
          <router-view/>
      </el-main>
    </el-container>
 </el-container>
</template>
<script>
    export default {
        data() {
            return {
                menus: []
            }
        },
        created() {
            this.loadMenus()
        },
        //判断登录
        beforeCreate() {
            const token = sessionStorage.getItem('token')
        // 判断是否获取到token
            if(!token){
                this.$message.warning('请先登录')
                this.$router.push('/login')
            }
        },
        methods: {
            loadMenus() {
                this.$http.get('menus')
                    .then((response)=>{
                        const { meta: { msg, status }} = response.data
                        if(status === 200){
                            this.menus = response.data.data
                        }
                    })
            },
            handleOut(){
                sessionStorage.clear();
                this.$message.success('退出成功')
                this.$router.push('/login')
            },
            // async loadMenus() {
            //     const response = await this.$http.get('menus');
            //     const { meta: { msg, status } } = response.data;
            //     if (status === 200) {
            //         this.menus = response.data.data;
            //     }
            //     }
            // }
    }
    }
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
    /* text-align: center; */
  }
  
</style>
