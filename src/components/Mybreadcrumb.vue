<template>
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>{{ leavel1 }}</el-breadcrumb-item>
        <el-breadcrumb-item>{{ leavel2 }}</el-breadcrumb-item>
    </el-breadcrumb>
</template>
<script>
    export default {
        name:'my-breadcrumb',
        props:['leavel1','leavel2']
    }
</script>
<style>

</style>
