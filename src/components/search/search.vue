<template>
    <div class="search">
        <div class="top-wrapper">
            <form class="search-wrapper">
                <font-awesome-icon class="search-icon" icon="search"></font-awesome-icon>
                <input list="input-list" id="input-with-list" class="search-bar" v-model="inputValue" v-on="searchFunc" v-on:keyup="" @click.stop="searchOn()"></input>
            </form>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                inputValue: '',
                searchContent: []
            }
        },
        props: {
            alldata: {
                type: Array,
                default: () => {}
            }
        },
        methods: {
            searchOn() {
                this.$emit('searchOn', 'search')
                this.$emit('searchEvent', this.searchContent) 
            }     
        },
        computed: {
            searchFunc() {
                const regex = new RegExp(this.inputValue, 'i')
                this.searchContent = this.alldata.filter(user => user.name.substring(0, this.inputValue.length).match(regex))
                this.$emit('searchEvent', this.searchContent)
            }
        }
    }
</script>
<style scoped>
    @import url('search.css');
</style>