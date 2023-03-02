import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 导入 iview 组件  
import './utils/iView'


Vue.config.productionTip = false


new Vue({
  render: h => h(App),
  router
}).$mount('#app')
