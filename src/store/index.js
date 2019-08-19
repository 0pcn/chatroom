import Vue from 'vue'
import Vuex from 'vuex'
import Add from './add'
import user from './user'
Vue.use(Vuex)

const index = new Vuex.Store({
  modules: {
    Add,
    user
  }
})

export default index
