import Signin from '@/components/auth/SignIn.vue'
import Signup from '@/components/auth/SignUp.vue'
import Vue from 'vue'
import Router from 'vue-router'
import CreateQuestion from '../components/questions/CreateQuestion.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/a',
      name: 'signin',
      component: Signin,
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup,
    },
    {
      //path: '/create-question',
      path: '/',
      name: 'create',
      component: CreateQuestion,
    },
  ],
})
