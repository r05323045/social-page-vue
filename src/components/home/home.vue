<template>
  <div class="main">  
    <div class="home">
        <!--user-list-->
        <div class="list-wrapper" ref="listScroll">
            <ul>
              <li class="list-item" v-for="(item, index) in showdata">
                  <img class="avatar" :class="inFavorites(item)" :src="item.avatar" @click.stop="sendData(item)" v-b-modal.modal-user />     
                  <p class="name">{{item.name}} {{item.surname}}</p>
                  <p class="age">{{item.age}}</p>
                  <font-awesome-icon :class="`${item.gender}-icon`" :icon="item.gender"></font-awesome-icon>
                  <img :src="`${item.flag}`" class="flag"/>
                  <p class="region">{{item.region}}</p>
                  <b-button variant="danger" class="add-to-favorite" @click.stop="favoriteEvent(item)" :class="inFavorites(item)">{{item.isLike}}</b-button>
              </li>
            </ul>
        </div>
        <b-modal id="modal-user" centered v-model="modalShow">
            <User :userDetail="userDetail"></User>
            <div slot="modal-footer">
              <b-button variant="secondary" @click="modalShow = !modalShow">close</b-button>
              <b-button variant="danger" class="add-to-favorite" @click.stop="favoriteEvent(userDetail)" :class="inFavorites(userDetail)">{{userDetail.isLike}}</b-button>
            </div>    
        </b-modal> 
    </div>
    <Myfilter :alldata="alldata" @filterEvent="showdata=$event"></Myfilter>
  </div>
</template>

<script>
  import BScroll from "better-scroll"
  import Vue from 'vue'
  import User from '../user/user'
  import Myfilter from '../filter/filter'
  export default {
    created() {
      this.$nextTick(()=>{
        this.initScroll()
      })
    },
    mounted() {
      this.showdata = this.alldata
    },
    data(){
      return {
        showdata: [],
        listScroll: {},
        userDetail: {},
        modalShow: false,
      }
    },
    watch: {
      alldata: function() {
          this.showdata = this.alldata
      },
    },
    props: {
      alldata: {
        type: Array,
        default: () => {}
      },
    },
    methods: {
        initScroll() {
          this.listScroll = new BScroll(this.$refs.listScroll, {
              click: true
          })
        },
        favoriteEvent(item) {
          if (this.alldata[this.alldata.indexOf(item)].isLike === 'like'){
            this.alldata[this.alldata.indexOf(item)].isLike = 'unlike'
          } else {
            this.alldata[this.alldata.indexOf(item)].isLike = 'like'
          }
        },
        inFavorites(item) {
          if (item.isLike === 'unlike') {
            return 'is-like'
          }
          return 'not-like'
        },
        sendData(item) {
          this.userDetail = item
        },
    },
    components: {
      BScroll,
      User,
      Myfilter,
    }
  }
</script>

<style>
    @import url('home.css');
</style>