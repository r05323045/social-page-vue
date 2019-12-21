<template>
  <div class="favorites" >
      <div class="no-favorite" v-if="favoritedata.length === 0">Your faovorites list is empty.</div>
      <div class="list-wrapper" ref="listScroll">
          <ul>
            <li class="list-item" v-for="(item, index) in favoritedata">
                <img class="avatar" :src="item.avatar" @click.stop="sendData(item)" v-b-modal.modal-fav-user />     
                <p class="name">{{item.name}} {{item.surname}}</p>
                <p class="age">{{item.age}}</p>
                <font-awesome-icon :class="`${item.gender}-icon`" :icon="item.gender"></font-awesome-icon>
                <img :src="`${item.flag}`" class="flag"/>
                <p class="region">{{item.region}}</p>
                <b-button variant="danger" class="remove-from-favorite" @click.stop="removeFavorites(item)">{{item.isLike}}</b-button>
            </li>
          </ul>
      </div>
      <b-modal id="modal-fav-user" centered v-model="modalShow">
        <User :userDetail="userDetail"></User>
        <div slot="modal-footer">
            <b-button variant="secondary" @click="modalShow = !modalShow">close</b-button>
            <b-button variant="danger" class="remove-from-favorite" @click.stop="removeFavorites(userDetail)" v-if="userDetail.isLike === 'unlike'">{{userDetail.isLike}}</b-button>
        </div>    
      </b-modal>
  </div>
</template>

<script>
    import BScroll from "better-scroll"
    import Vue from 'vue'
    import User from '../user/user'
    export default {
        created() {
            this.$nextTick(()=>{
                    //新增滾動
                    this.initScroll()
                }) 
        },
        updated : function() {
            this.$nextTick(()=>{
                this.initScroll()
            })
        },
        data(){
            return {
                listScroll: {},
                userDetail: {},
                modalShow: false,
                inFavorites: false 
            }
        },
        props: {
            alldata: {
                type: Array,
                default: () => {}
            }
        },
        computed: {
            favoritedata: function() {
                if (typeof(this.alldata) !== undefined) {
                    return this.alldata.filter(d => d.isLike === 'unlike')
                }
                return []
            },
        },
        methods: {
            initScroll() {
                this.listScroll = new BScroll(this.$refs.listScroll, {
                    click: true
                })
            },
            removeFavorites(item) {
                this.alldata[this.alldata.indexOf(item)].isLike = 'like'
            },
            sendData(item) {
                this.userDetail = item
            },
        },
        components: {
            BScroll,
            User,
        }
        
    }
</script>

<style>
    @import url(favorites.css);
</style>