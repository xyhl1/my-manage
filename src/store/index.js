import Vue from 'vue'
import Vuex from 'vuex'
import tab from './moudle/tab'
import menu from './moudle/menu'
Vue.use(Vuex)

export default new Vuex.Store({
 modules: {
  tab,
  menu
 }
})
