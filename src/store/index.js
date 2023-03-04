import Vue from 'vue'
import Vuex from 'vuex'
import cart from './cart'
import product from './product'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        cart,
        product
    }
})

export default store