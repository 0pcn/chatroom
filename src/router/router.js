
import Router from 'vue-router'
import Home from '../view/Home'
import Chat from '../view/Chat'
import Post from '../view/Post'
import Friend from '../view/Friend'
import Add from '../view/Add'
import Login from '../view/Login'
import Vue from 'vue';

Vue.use(Router)

export default new Router({
mode: 'hash',
  routes:[
    {
      path: '/Home',
      name: 'Home',
      component: Home,
      meta: {title: 'Home', requiresAuth: true},
      children: [
        {
          path: '/Friend',
          name: 'Friend',
          component: Friend,
        },
        {
          path: '/Chat',
          name: 'Chat',
          component: Chat,
        },
        {
          path: '/Post',
          name: 'Post',
          component: Post,
        },
        {
          path: '/Add',
          name: 'Add',
          component: Add,
        },
      ]
    },
    {
      path: '/',
      name: 'Login',
      component: Login,
    },
  ]
})
