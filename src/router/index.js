import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import Home from '../views/content/home.vue'
import Mall from '../views/content/mall.vue'
import User from '../views/content/user.vue'
import PageOne from '../views/content/pageOne.vue'
import PageTwo from '../views/content/pageTwo.vue'
import Login from '../views/content/login'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'main',
    component: Main,
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'home',
        meta: { title: '首页' },
        component: Home
      },
      {
        path: '/mall',
        name: 'mall',
        meta: { title: '商品管理' },
        component: Mall
      },
      {
        path: '/user',
        name: 'user',
        meta: { title: '用户管理' },
        component: User
      },
      {
        path: '/other',
        name: 'other',
        meta: { title: '其他' },
        redirect: '/other/page1',
        children: [
          {
            path: 'page1',
            name: 'page1',
            meta: { title: 'page' },
            component: PageOne
          },
          {
            path: 'page2',
            name: 'page2',
            meta: { title: 'page2' },
            component: PageTwo
          }
        ]
      },
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  }
]

const router = new VueRouter({
  routes
})

export default router
