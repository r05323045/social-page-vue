<template>
    <div class="nav">
        <router-link class="nav-item" to="/home">
            home
            <i class="line"></i>
        </router-link>
        <router-link class="nav-item" to="/favorites">
            favorites
            <i class="line"></i>
        </router-link>
    </div>
</template>
<script>
    export default { 
    }
</script>
<style scoped>
    @import url('nav.css');
</style>