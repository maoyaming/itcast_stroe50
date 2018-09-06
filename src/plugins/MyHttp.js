import axios from "axios"
import Vue from 'vue'
import { Loading } from 'element-ui'
const MyHttp = {}
let loadingInstance = ''
    // vue插件 必须有一个公共的install方法
MyHttp.install = function() {
    axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'

    //在请求里设置token

    //请求拦截器

    axios.interceptors.request.use(function (config) {
        // 在发送请求前 添加请求头token
        // 如果当前请求地址是login时 不加token
        if(config.url !== 'login'){
            const token = sessionStorage.getItem('token')
            config.headers.Authorization = token
        }
        // this.$loading()
        loadingInstance = Loading.service()
        return config;
    }, function (error) {
    // Do something with request error
        return Promise.reject(error);
    });

    // 响应拦截器
    // Add a response interceptor
    axios.interceptors.response.use(function (response) {
    // 隐藏加载提示
        loadingInstance.close()
        return response;
    }, function (error) {
    // Do something with response error
        return Promise.reject(error);
    })
    Vue.prototype.$http = axios
}

export default MyHttp