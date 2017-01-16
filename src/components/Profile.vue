<template>
	<div id="form-container">
		<p>Get Your List</p>
		<button v-on:click="getMe">Get me</button>
		<li v-for="item in items">
    	<artist :name="item.name"></artist>
  	</li>
	</div>
</template>

<script>
var Spotify = require('spotify-web-api-js');
export default {
	props: ['token'],
  data () {
    return {
      msg: 'Login Fool',
      stateKey: 'spotify_auth_state',
      items: []
    }
  },
  methods: {
    getMe: function (event) {
    	var that = this;
			var s = new Spotify();
      var token_data = JSON.parse(this.token);
			s.setAccessToken(token_data['token']);
			s.getMyTopArtists(null, function(err, data) {
			  if (err) console.error(err);
			  // else console.log(data);
			  else that.items = data.items;
			});
    }
  }
}
</script>

<style scoped>
	p {
		color: white;
		font-weight: bold;
	}
	li {
		color: white;
	}
	#form-container {
		text-align: center;
	}
</style>