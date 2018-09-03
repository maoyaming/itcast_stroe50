import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)
import Login from '@/views/Login.vue'
export default new Router({
    routes: [{
        name: 'login',
        path: '/login',
        component: Login
    }]
})