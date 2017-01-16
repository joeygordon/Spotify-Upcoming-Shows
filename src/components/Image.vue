<template>
	<div id="image-container">
		<div class="feature-image" :style="imagelink">
    </div>
    <login name="Frank"></login>
	</div>
</template>

<script>
var Spotify = require('spotify-web-api-js');
var s = new Spotify();
// var spotifyApi = new SpotifyWebApi();

export default {
	props: ['name'],
  data () {
    return {
    	imagelink: 'background-image: url(https://unsplash.it/1920/1080/?random)'
    }
  },
  methods: {
    // put some methods if you need them, dork
  }
}
</script>

<style scoped>
	/*.feature-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    background-color: black;
  }*/
</style>