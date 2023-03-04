const product = {
    namespaced: true,
    state() {
        return {
            productList: [],
            categoryList: []
        }
    },
    actions: {
        getProductList({ commit }) {
            this.$api("/products").then(({ data }) => {
                const productList = data.products;
                const categoryList = productList.reduce((pre, cur) => {
                    pre.push(cur.category);
                    return pre;
                }, []);
                commit('saveProductList', productList)
                commit("saveCategoryList", categoryList)
            });
        }
    },
    mutations: {
        saveProductList(state, productList) {
            state.productList = productList
        },
        saveCategoryList(state, categoryList) {
            state.categoryList = categoryList
        }
    }
}

export default product