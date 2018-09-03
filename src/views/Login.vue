<template>
  <div class="login-wrap">
    <el-form
      label-position="top"
      
      label-width="80px">
      <h2>用户登录</h2>
      <el-form-item label="用户名" prop="username">
        <el-input></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="login-btn" type="primary">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  
};
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
