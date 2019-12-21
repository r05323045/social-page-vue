<template>
        <div>
            <b-navbar toggleable="lg" type="dark" variant="secondary">
                <b-navbar-brand href="#">Sofa</b-navbar-brand>
            
                <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

                <b-collapse id="nav-collapse" is-nav>
                    <b-navbar-nav>
                        <router-link class="nav-item" to="/home">
                            home
                        </router-link>
                        <router-link class="nav-item" to="/favorites">
                            favorites
                            <b-badge variant="light">{{alldata.filter(i => i.isLike === 'unlike').length}}</b-badge>
                        </router-link> 
                    </b-navbar-nav>
                </b-collapse>
            </b-navbar>
        </div>
        <!--
        <router-link class="nav-item" to="/home">
            home
            <i class="line"></i>
        </router-link>
        <router-link class="nav-item" to="/favorites">
            favorites
            <i class="line"></i>
        </router-link>
        -->
</template>
<script>
    export default { 
        props: {
            alldata: {
                type: Array,
                default: () => []
            }
        }
    }
</script>
<style scoped>
    @import url('nav.css');
</style>