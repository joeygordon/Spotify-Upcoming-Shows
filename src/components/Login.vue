<template>
	<div id="form-container">
		<p>Please Log In</p>
		<button v-on:click="login">Login</button>
	</div>
</template>

<script>
var Spotify = require('spotify-web-api-js');
var s = new Spotify();

export default {
  data () {
    return {
    	//data props
    }
  },
  methods: {
    generateRandomString: function (length) {
      var text = '';
      var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

      for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      }
      return text;
    },
    login: function (event) {
    	var that = this;
    	var client_id = '0b87eda5f39d43fc83f60dcf45fba484'; // Your client id
      // var redirect_uri = 'http://www.joeygordon.com/spotify/'; // Your redirect uri
      var redirect_uri = 'http://localhost:8080/'; // Your redirect uri
      var state = this.generateRandomString(16);
      var scope = 'user-top-read';
      var url = 'https://accounts.spotify.com/authorize';
      url += '?response_type=token';
      url += '&client_id=' + encodeURIComponent(client_id);
      url += '&scope=' + encodeURIComponent(scope);
      url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
      url += '&state=' + encodeURIComponent(state);
      window.location = url;
    }
  }
}
</script>

<style scoped>
	#form-container {
		position: absolute;
		top: 0;
		left: 0;
		text-align: center;
		width: 100%;
		height: 100%;
	}
</style>