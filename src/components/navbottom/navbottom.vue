<template>
    <div class="nav-bottom">
        <router-link to="/search" class="link">
            <i :class="{searchbottm: this.$route.path === '/search'}"><font-awesome-icon icon="search"></font-awesome-icon></i>
        </router-link>
        <router-link to="/home" class="link">
            <i :class="{homebottm: this.$route.path === '/home'}"><font-awesome-icon icon="home" ></font-awesome-icon></i>
        </router-link>
        <router-link to="/favorites" class="link">
            <i :class="{favoritesbottm: this.$route.path === '/favorites'}"><font-awesome-icon icon="heart"></font-awesome-icon></i>
        </router-link>
    </div>
</template>
<script>
    export default {
    }
</script>
<style>
    @import url('navbottom.css');
</style>