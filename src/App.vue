<template>
  <div id="app">
    <div class="main-header">
      <h1>Upcoming Shows</h1>
    </div>
    
    <profile v-if="loggedIn" v-bind:token="token"></profile>
    <login v-else></login>
  </div>
</template>

<script>
//spotify api
var Spotify = require('spotify-web-api-js');
var s = new Spotify();

// setup local storage
var storage_key = 'spotify-api-example'
var authTokenStorage = {
  fetch: function () {
    var token = localStorage.getItem(storage_key) || 'undefined'
    return token
  },
  save: function (token) {
    var time = new Date();
    localStorage.setItem(storage_key, JSON.stringify({token: token, time: time}))
  }
}

export default {
  name: 'app',
  data () {
    return {
      token: authTokenStorage.fetch(),
      stateKey: 'spotify_auth_state',
      loggedIn: false
    }
  },
  created:function(){
    var params = this.getHashParams();
    //see if we have any url parameters
    if (Object.keys(params).length != 0){
      var access_token = params.access_token,
          state = params.state,
          storedState = localStorage.getItem(this.stateKey);

      this.token = access_token;
      this.loggedIn = true;
      window.location = '/'
    }else{
      var time_limit = 60 * 10 * 1000;

      if (this.token != 'undefined') {
        var token_data = JSON.parse(this.token);
      }

      if (this.token != 'undefined' && ((new Date) - new Date(token_data['time'])) < time_limit ) {
        this.loggedIn = true;
      } 
    }
  },
  methods: {
    getHashParams: function() {
      var hashParams = {};
      var e, r = /([^&;=]+)=?([^&;]*)/g,
          q = window.location.hash.substring(1);
      while ( e = r.exec(q)) {
         hashParams[e[1]] = decodeURIComponent(e[2]);
      }
      return hashParams;
    }
  },
  watch: {
    token: {
      handler: function (token) {
        authTokenStorage.save(token)
      },
      deep: true
    }
  }
}
</script>

<style lang="sass">
html
  margin: 0px
  padding: 0px
  height: 100%

body 
  padding: 0
  margin: 0
  background-color: #EEE
  padding-bottom: 60px

#app
  font-family: 'Avenir', Helvetica, Arial, sans-serif
  color: #333
  max-width: 1300px
  margin: 0 auto

h1, h2 
  font-weight: normal

ul
  list-style-type: none
  padding: 0

a 
  color: #62D36E

.cf:after
  content: ""
  display: table
  clear: both

.main-header
  padding: 2em 2rem
  border-bottom: 1px solid #EEE
  display: none

</style>