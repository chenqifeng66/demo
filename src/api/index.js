import axios from 'axios'
import { LoadingBar } from 'view-design'

const defaultConfig = {
    baseURL: 'http://127.0.0.1:4523/m1/2384704-0-default',
    timeout: 3000,

}

const _axios = axios.create(defaultConfig)

_axios.interceptors.request.use((config) => {
    LoadingBar.start()
    // 获取登录令牌
    const authorization = window.localStorage.getItem('authorization')
    // 有令牌则将令牌添加到请求头中
    authorization && (config.headers.authorization = authorization)
    return config
}, () => {
    LoadingBar.error()
    return Promise.reject()
})

_axios.interceptors.response.use((config) => {
    LoadingBar.finish()
    return config
})


export default _axios