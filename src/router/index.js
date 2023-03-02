import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        component: () => import('@/components/Login/Login.vue')
    }, {
        path: '/home',
        component: () => import('@/components/Home/Home.vue')
    }, {
        path: '/cart',
        component: () => import('@/components/Cart/Cart.vue')
    }

]

const router = new VueRouter({
    history: 'hash',
    routes
})

// 前置路由守卫
router.beforeEach((to, from, next) => {
    const {token} = JSON.parse(localStorage.getItem('userInfo')) || {}
    if (to.path != '/' && !token) {
        // this.$Message.success('请先登录')
        next("/")
    } else {
        next()
    }
})

export default router

