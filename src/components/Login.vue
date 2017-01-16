<template>
	<div id="form-container">
    <div class="login-container">
      <h2>Upcoming Shows</h2>
      <p>See all of your favorite Spotify artists' upcoming shows quickly in one place.</p>
      <button v-on:click="login">Login with Spotify</button>
    </div>
	</div>
</template>

<script>
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
    //log in...duh
    login: function (event) {
    	var that = this;
    	var client_id = '0b87eda5f39d43fc83f60dcf45fba484'; // Your client id
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

<style lang="sass" scoped>
#form-container
  position: absolute
  top: 0
  left: 0
  height: 100%
  width: 100%
  background-color: black
  background-size: cover
  background-image: url(https://unsplash.it/1920/1080?image=453)

  &:before
    content: ''
    position: absolute
    top: 0
    right: 0
    bottom: 0
    left: 0
    background-color: #000
    opacity: .6

.login-container
  position: absolute
  height: 270px
  width: 300px
  top: 50%
  margin-top: -150px
  left: 50%
  margin-left: -150px
  background-color: #FFF
  text-align: center

.login-container h2
  margin: 2rem
  font-size: 1.5em
  color: #62D36E
  font-weight: bold

.login-container p
  margin: 0 2rem 2rem

.login-container button
  background-color: #62D36E
  border: none
  outline: none
  color: #FFF
  width: 80%
  height: 34px
  border-radius: 17px
  font-size: .8em
  font-weight: bold
  text-transform: uppercase
  cursor: pointer

  &:hover
    background-color: #377D3E

</style>