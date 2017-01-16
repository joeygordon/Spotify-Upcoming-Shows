<template>
	<div class="artist-container">
    <div class="artist-head" :style="{ 'background-image': 'url(' + artistImage + ')' }">
      <h2>{{ artistName }}</h2>
    </div>
    <div class="artist-dates">
      <h3>{{ datesTitle }}</h3>
      <ul class="date-list">
        <div v-if="noDate" class="no-dates">Sorry, there aren't any upcoming shows.</div>
        <li class="date-item" v-for="date in dates">
          <date :formattedDate="date.formatted_datetime" :location="date.formatted_location" :ticketURL="date.ticket_url" :facebookURL="date.facebook_rsvp_url "></date>
        </li>
      </ul>
    </div>
	</div>
</template>

<script>
export default {
	props: ['name', 'artistImages'],
  data () {
    return {
    	artistName: this.name,
      artistImage: this.artistImages[0]['url'],
      datesTitle: "Upcoming Shows",
      noDate: false,
      encodedName: encodeURIComponent(this.artistName),
      dates: []
    }
  },
  created:function(){
    this.findTourDates()
  },
  methods: {
    //find the artist's tour dates
    findTourDates: function () {
      var jsonp = require('jsonp');
      var that = this;
      jsonp('http://api.bandsintown.com/artists/'+ this.artistName +'/events.json?api_version=2.0&app_id=spotifytestapp&callback=', null, function (err, data) {
        if (err) {
          console.error(err.message);
          that.datesTitle = "There was a problem getting this artist's shows. Please try again."
        } else {
          if (Object.keys(data).length === 0) {
            that.noDate = true;
          }
          that.dates = data;
        }
      });
    }
  }
}
</script>

<style lang="sass" scoped>
.artist-head
  background-color: #333
  background-size: cover
  background-repeat: no-repeat
  background-position: center top 
  height: 300px
  padding: 2em
  position: relative

  &:before
    content: ''
    position: absolute
    top: 0
    right: 0
    bottom: 0
    left: 0
    background-image: linear-gradient(180deg,transparent, #000 280px)
    opacity: .6

.artist-head h2
  color: #FFF
  margin: 0
  position: absolute
  left: 2rem
  bottom: 2rem

.artist-dates
  padding: 2em 2em

.artist-dates h3
  padding: 0 0 1rem 0
  margin: 0
  border-bottom: 1px solid #CCC

.date-item
  border-bottom: 1px solid #EEE
  padding: 1rem 0

.date-item:nth-child(n+6)
  display:none !important

.no-dates
  background-color: #EEE
  text-align: center
  margin-top: 1rem
  padding: 4rem 0
  color: #666
</style>