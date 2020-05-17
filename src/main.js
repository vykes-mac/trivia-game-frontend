import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap/dist/css/bootstrap.css'
import Vue from 'vue'
import { VueTags } from 'vue-tags-component'
import App from './App.vue'
import './global.css'
import router from './routes/router'

Vue.config.productionTip = true
Vue.config.devtools = true

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.component('vue-tags', VueTags)
new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app')
