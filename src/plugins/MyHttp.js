import Axios from "axios"
const MyHttp = {}
    // vue插件 必须有一个公共的install方法
MyHttp.install = function() {
    Axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'
    Vue.prototype.$http = Axios
}

export default MyHttp