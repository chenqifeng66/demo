import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 导入 iview 组件  
// import './utils/iView'
import ViewUI from 'view-design'
import 'view-design/dist/styles/iview.css';
import axios from "./api/"
import store from './store'

Vue.use(ViewUI)

Vue.config.productionTip = false

Vue.prototype.$Message = ViewUI.Message

Vue.prototype.$api = axios



// 分转元显示
Vue.filter('fenChange', (num) => {
  if (typeof num !== 'number' || isNaN(num)) {
    return null
  }
  return Number((num / 100).toFixed(2))
})

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
