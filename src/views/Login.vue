<template>
  <div class="login-wrap">
    <el-form
      label-position="top"
      :model="formData"
      label-width="80px">
      <h2>用户登录</h2>
      <el-form-item label="用户名" prop="username">
        <el-input v-model="formData.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input @keyup.enter.native="handleLogin" type="password" v-model="formData.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="login-btn" type="primary" @click="handleLogin">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  // 绑定文本框
  // 按钮注册事件

  data() {
      return {
          formData: {
              username:'',
              password:'',
          }
      }
  },
  methods: {
      handleLogin(){
          this.$http.post('login',this.formData)
            .then((response)=>{
                const {meta:{msg, status}} = response.data
                if(status === 200){
                    this.$message.success(msg)
                    sessionStorage.setItem('token',response.data.data.token)
                    this.$router.push('/')
                }else{
                    this.$message.error(msg)
                }
            })
            .catch((err)=>{
                console.log(err)
                
            })
      }
  }

}
</script>

<style scoped>
  .login-wrap {
    background-color: #324152;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .el-form.el-form--label-top {
    padding: 40px;
    width: 500px;
    border-radius: 5px;
    background-color: #fff;
  }
  .el-form .login-btn {
    width: 100%;
  }
</style>
