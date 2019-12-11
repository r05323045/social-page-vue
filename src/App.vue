<template>
  <div id="app">
    <Myheader></Myheader>
    <Mynav @goToPage="goToPage=$event"></Mynav>
    <Myhome :alldata="alldata" v-if="atHome"></Myhome>
    <Myfavorites :alldata="alldata" v-if="!atHome"></Myfavorites>
  </div>
</template>

<script>
  import Vue from 'vue'
  import Myheader from './components/header/header'
  import Mynav from './components/nav/nav'
  import Myfavorites from './components/favorites/favorites'
  import Myhome from './components/home/home'

  export default {
    name: 'App',
    data() {
      return {
        alldata: [],
      }
    },
    created(){
      const that = this
      this.$axios.get("/api/users")
          .then(function(response){
              const dataSource = response.data
              that.alldata = dataSource.results
          })
          .catch(function(error){
              console.log(error)
          })
    },
    computed: {
        atHome() {
          if(this.$route.name === 'Home') {
            return true
          } else {
            return false
          }
      }
    },
    components: {
        Myheader,
        Mynav,
        Myhome,
        Myfavorites,
      },
  }
</script>

<style>
</style>
