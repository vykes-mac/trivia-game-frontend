import Signin from '@/components/auth/SignIn.vue'
import Signup from '@/components/auth/SignUp.vue'
import StartTrivia from '@/components/questions/StartTrivia.vue'
import Vue from 'vue'
import Router from 'vue-router'
import CreateQuestion from '../components/questions/CreateQuestion.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'signin',
      component: Signin,
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup,
    },
    {
      path: '/create-question',
      name: 'create',
      component: CreateQuestion,
    },
    {
      path: '/start-trivia',
      name: 'start',
      component: StartTrivia,
    },
  ],
})
