<template>
	<div class="date-container cf">
    <div class="date-info">
      <span class="date-label">{{ location }}</span>
      {{ formattedDate }}
    </div>
    <div class="date-links">
      <a :href="ticketURL" >Tickets</a>&nbsp;&nbsp;<a :href="facebookURL" >RSVP</a>
    </div>
	</div>
</template>

<script>
export default {
	props: ['formattedDate', 'location', 'ticketURL', 'facebookURL'],
  data () {
    return {
    }
  }
}
</script>

<style lang="sass" scoped>
.date-info
  float: left
  width: 65%
  overflow: hidden

.date-label
  font-weight: bold
  display: block

.date-links
  float: right
  width: 35%
  overflow: hidden
  padding-top: .65rem
  text-align: right

.date-links a
  display: inline-block
  color: white
  text-decoration: none
  background-color: #62D36E
  font-size: 0.8em
  text-transform: uppercase
  font-weight: bold
  height: 1.4em
  padding: 3px 10px 2px
  border-radius: 0.9em

  &:hover
    background-color: #377D3E

@media (max-width: 750px)
  .date-info
    float: none
    width: 100%

  .date-links
    float: none
    width: 100%
    text-align: left
</style>