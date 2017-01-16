import Vue from 'vue'
import App from './App.vue'
import Profile from './components/Profile.vue'
import Login from './components/Login.vue'
import Artist from './components/Artist.vue'


Vue.component('login', Login)
Vue.component('profile', Profile)
Vue.component('artist', Artist)

new Vue({
  el: '#app',
  render: h => h(App)
})
