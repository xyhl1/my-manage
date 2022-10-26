import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Cookies from 'js-cookie';

Vue.config.productionTip = false

Vue.use(ElementUI);
//添加全局前置导航守卫
router.beforeEach((to, from, next) => {
  const token = Cookies.get('token')
  if (!token && to.name !== 'login') {//token不存在，说明用户未登录，跳转至登录页
    next({ name: 'login' })
  } else if (token && to.name === 'login') {//token存在，用户登录，跳转首页
    next({ name: 'home' })
  }
  else {
    next()
  }
})


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
