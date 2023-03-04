import Vue from 'vue'
import VueRouter from 'vue-router'
import { Message } from "view-design"

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        redirect: '/login',
    }, {
        path: '/login',
        component: () => import("@/views/base/login/Login.vue")
    }, {
        path: '/home',
        redirect: '/home/product',
        component: () => import('@/views/base/Home.vue'),
        children: [
            {
                path: 'product',
                name: 'product',
                meta: {
                    keepAlive: true,
                },
                component: () => import('@/views/base/product/Product.vue'),

            }, {
                path: 'cart',
                component: () => import('@/views/base/cart/Cart.vue')
            }
        ]
    },

]

const router = new VueRouter({
    history: 'hash',
    routes
})

// 前置路由守卫
router.beforeEach((to, from, next) => {
    const authorization = localStorage.getItem('authorization') || ""
    if (to.path != '/login' && !authorization) {
        Message.error('请先登录')
        next("/")
    } else {
        next()
    }
})

export default router

