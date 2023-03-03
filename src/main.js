import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 导入 iview 组件  
import './utils/iView'


Vue.config.productionTip = false

// 分转元显示
Vue.filter('fenChange',(num)=>{
  if(typeof num !== 'number' || isNaN(num)){
    return null
  }
  return Number((num / 100).toFixed(2))
})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
