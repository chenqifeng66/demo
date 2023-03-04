const cart = {
    namespaced: true,
    state() {
        return {
            carts: JSON.parse(window.localStorage.getItem('carts')) || [],
        }
    },
    mutations: {
        saveCarts(state, carts) {
            state.carts = carts
        },
        // 添加商品到购物车
        addCart(state, good) {
            const goodIndex = state.carts.findIndex((item) => item.id === good.id);
            if (goodIndex == "-1") {
                good.count = 1
                state.carts.unshift(good);
            } else {
                state.carts[goodIndex].count++;
            }
            state.carts = JSON.parse(JSON.stringify(state.carts))
            window.localStorage.setItem('carts', JSON.stringify(state.carts))
        },

        // 删除购物车商品
        deleteCartProduct(state, id) {
            const index = state.carts.findIndex((item) => {
                return item.id = id
            })
            state.carts.splice(index, 1)
            window.localStorage.setItem('carts', JSON.stringify(state.carts))
        },

        // 清空购物车
        clearCart(state) {
            state.carts = []
            window.localStorage.removeItem('carts')
        }
    },
    getters: {
        count: (state) => {
            return state.carts.reduce((pre, cur) => {
                return pre + cur.count;
            }, 0);
        }
    }
}

export default cart