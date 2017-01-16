<template>
	<div class="artist-container">
    <div class="artist-head">
      <h2>{{ artistName }}</h2>
    </div>
    <div class="artist-dates">
      <!-- tour dates -->
    </div>
	</div>
</template>

<script>
var Axios = require('axios/dist/axios.min.js');
export default {
	props: ['name'],
  data () {
    return {
    	artistName: this.name,
      encodedName: encodeURIComponent(this.artistName),
      dates: []
    }
  },
  created:function(){
    this.findTourDates()
  },
  methods: {
    findTourDates: function () {
      // find the tour dates
      // Axios.defaults.headers.post["Access-Control-Allow-Origin"] = '*';
      // var config = {
      //  withCredentials: true
      // };
      // Axios.get('http://api.bandsintown.com/artists/Sleigh%20Bells/events.json?api_version=2.0&app_id=spotifytestapp&callback=',config)
      //   .then(function (response) {
      //     console.log(response);
      //   })
      //   .catch(function (error) {
      //     console.log(error);
      //   });
      var jsonp = require('jsonp');
      var that = this;
      jsonp('http://api.bandsintown.com/artists/'+ this.artistName +'/events.json?api_version=2.0&app_id=spotifytestapp&callback=', null, function (err, data) {
        if (err) {
          console.error(err.message);
        } else {
          // console.log(data);
          that.dates = data;
        }
      });
    }
  }
}
</script>

<style scoped>
</style>