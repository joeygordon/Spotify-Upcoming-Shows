import Vue from 'vue'
import App from './App.vue'
import Profile from './components/Profile.vue'
import Login from './components/Login.vue'
import Artist from './components/Artist.vue'
import DateItem from './components/Date.vue'

Vue.component('login', Login)
Vue.component('profile', Profile)
Vue.component('artist', Artist)
Vue.component('date', DateItem)

new Vue({
  el: '#app',
  render: h => h(App)
})
