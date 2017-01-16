<template>
  <div id="app">
    <h1>{{ msg }}</h1>
    <profile v-if="loggedin" v-bind:token="token"></profile>
    <login v-else></login>
  </div>
</template>

<script>
var Spotify = require('spotify-web-api-js');
var s = new Spotify();

// localStorage persistence
var STORAGE_KEY = 'spotify-api-example'
var authTokenStorage = {
  fetch: function () {
    var token = localStorage.getItem(STORAGE_KEY) || 'undefined'
    return token
  },
  save: function (token) {
    var time = new Date();
    localStorage.setItem(STORAGE_KEY, JSON.stringify({token: token, time: time}))
  }
}

export default {
  name: 'app',
  data () {
    return {
      token: authTokenStorage.fetch(),
      stateKey: 'spotify_auth_state',
      msg: 'Upcoming Shows',
      loggedin: false
    }
  },

  // created methods
  created:function(){
    var params = this.getHashParams();

    if (Object.keys(params).length != 0){
      var access_token = params.access_token,
          state = params.state,
          storedState = localStorage.getItem(this.stateKey);

      this.token = access_token;
      this.loggedin = true;
    }else{
      var ONE_HOUR = 60 * 60 * 1000;

      if (this.token != 'undefined') {
        var token_data = JSON.parse(this.token);
      }
      // console.log("HEY", new Date());
      // console.log("HEY", new Date(token_data['time']));
      // check for login
      if (this.token != 'undefined' && ((new Date) - new Date(token_data['time'])) < ONE_HOUR ) {
        this.loggedin = true;
      } 

    }
    // console.log("TOKEN", this.token)
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

<style>
html{
  margin: 0px;
  padding: 0px;
  height: 100%;
}
body {
  padding: 0;
  margin: 0;
  background-image: url(https://unsplash.it/1920/1080/?random);
  background-size: cover;
  background-attachment: fixed;
  background-repeat: no-repeat;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  /*-webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;*/
  text-align: center;
  color: #FFF;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

a {
  color: coral;
}
</style>
