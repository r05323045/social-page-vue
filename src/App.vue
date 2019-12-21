<template>
  <div id="app">
    <Mynav :alldata="alldata"></Mynav>
    <Mydefault v-if="this.$route.path === '/default'"></Mydefault>
    <Myhome :alldata="alldata" v-if="this.$route.path === '/home'"></Myhome>
    <Myfavorites :alldata="alldata" v-if="this.$route.path === '/favorites'"></Myfavorites>
  </div>
</template>

<script>
  import Vue from 'vue'
  import Mydefault from './components/default/default'
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
    components: {
        Mydefault,
        Mynav,
        Myhome,
        Myfavorites,
      },
  }
</script>

<style>
</style>