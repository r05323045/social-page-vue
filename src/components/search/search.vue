<template>
    <div class="search">
        <div class="top-wrapper">
            <form class="search-wrapper">
                <font-awesome-icon class="search-icon" icon="search"></font-awesome-icon>
                <input list="input-list" id="input-with-list" class="search-bar" v-model="inputValue" v-on="searchFunc" v-on:summit.prevent=""></input>
            </form>
        </div>
        <div class="search-result">
            <div v-if="inputValue.trim() !== '' " class="list-wrapper" ref="listScroll">
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
    </div>
</template>
<script>
    import User from '../user/user'
    export default {
        data() {
            return {
                showdata: [],
                inputValue: '',
                searchContent: [],
                listScroll: {},
                userDetail: {},
                modalShow: false,
            }
        },
        props: {
            alldata: {
                type: Array,
                default: () => []
            }
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
        computed: {
            searchFunc() {
                const regex = new RegExp(this.inputValue, 'i')
                this.showdata = this.alldata.filter(user => user.name.substring(0, this.inputValue.length).match(regex))
            }
        },
        components: {
            User,
        }

    }
</script>
<style scoped>
    @import url('search.css');
</style>