<template>
  <div id="app">
    <Mynav :alldata="alldata"></Mynav>
    <Mydefault v-if="this.$route.path === '/'"></Mydefault>
    <Mysearch :alldata="alldata" v-if="this.$route.path === '/search'"></Mysearch>
    <Myhome :alldata="alldata" v-if="this.$route.path === '/home'"></Myhome>
    <Myfavorites :alldata="alldata" v-if="this.$route.path === '/favorites'"></Myfavorites>
    <Mybottom v-if="this.$route.path !== '/'"></Mybottom>
  </div>
</template>

<script>
  import Vue from 'vue'
  import Mydefault from './components/default/default'
  import Mynav from './components/nav/nav'
  import Myfavorites from './components/favorites/favorites'
  import Myhome from './components/home/home'
  import Mybottom from './components/navbottom/navbottom'
  import Mysearch from './components/search/search'
  export default {
    name: 'App',
    data() {
      return {
        alldata: [],
      }
    },
    created(){
      const that = this
      this.$axios.get('./static/data/users.json')//this.$axios.get("/api/users")//this.$axios.get('./static/data/users.json')
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
        Mybottom,
        Mysearch
      },
  }
</script>

<style>
</style>