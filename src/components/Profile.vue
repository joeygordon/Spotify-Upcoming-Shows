<template>
	<div id="form-container">
		<ul class="artist-list cf">
			<li class="artist-item" v-for="item in items">
	    	<artist :name="item.name" :artistImages="item.images"></artist>
	  	</li>
	  </ul>
	</div>
</template>

<script>
var Spotify = require('spotify-web-api-js');
export default {
	props: ['token'],
  data () {
    return {
      stateKey: 'spotify_auth_state',
      items: []
    }
  },
  created:function(){
    this.getMe()
  },
  methods: {
  	//look up the current user's info
    getMe: function (event) {
    	var that = this;
			var s = new Spotify();
      var token_data = JSON.parse(this.token);
			s.setAccessToken(token_data['token']);
			s.getMyTopArtists(null, function(err, data) {
			  if (err) console.error(err);
			  else that.items = data.items;
			});
    }
  }
}
</script>

<style lang="sass" scoped>
.artist-list
	margin: 0
	padding: 1%

.artist-item
	display: block
	float: left
	width: 48%
	margin: 1rem 1%
	list-style: none
	background: #FFF
	overflow: hidden
	border-bottom: 2px solid #E5E5E5
	padding-bottom: 1rem

.artist-item:nth-child(2n+1)
	clear: both

@media (max-width: 950px)
	.artist-item
		width: 95%
		float: none

</style>