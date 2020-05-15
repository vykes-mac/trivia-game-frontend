import Signin from '@/components/auth/SignIn.vue'
import Signup from '@/components/auth/SignUp.vue'
import Home from '@/components/home/Home.vue'
import StartTrivia from '@/components/questions/StartTrivia.vue'
import Highscores from '@/components/scores/Highscores.vue'
import Vue from 'vue'
import Router from 'vue-router'
import CreateQuestion from '../components/questions/CreateQuestion.vue'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'signin',
      component: Signin,
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup,
    },
    {
      path: '/create-trivia',
      name: 'create',
      component: CreateQuestion,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/start-trivia',
      name: 'start',
      component: StartTrivia,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/highscores',
      name: 'highscores',
      component: Highscores,
      meta: {
        requiresAuth: true,
      },
    },
  ],
})

router.beforeEach((to, from, next) => {
  if (to.matched.some((route) => route.meta.requiresAuth)) {
    if (localStorage.getItem('token') == null) {
      next({
        path: '/',
        params: { nextUrl: to.fullPath },
      })
    }
  } else {
    next()
  }
})

export default router
