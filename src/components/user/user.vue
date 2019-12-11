<template>
    <div class="user-card">
        <img class="avatar" :class="inFavorites(userDetail)" :src="userDetail.avatar"/>
        <b-list-group flush>
            <b-list-group-item >
                <font-awesome-icon icon="address-card"></font-awesome-icon>
                {{userDetail.name}} {{userDetail.surname}}
            </b-list-group-item>
            <b-list-group-item >
                <font-awesome-icon :class="`${userDetail.gender}-icon`" :icon="userDetail.gender"></font-awesome-icon>
                {{userDetail.age}}
            </b-list-group-item>
            <b-list-group-item >
                <font-awesome-icon icon="baby"></font-awesome-icon>
                {{userDetail.birthday}}
            </b-list-group-item>
            <b-list-group-item >
                <img class="flag" :src="userDetail.flag"/>
                {{userDetail.region}}
            </b-list-group-item>
            <b-list-group-item >
                <font-awesome-icon icon="envelope"></font-awesome-icon>
                {{userDetail.email}}
            </b-list-group-item> 
        </b-list-group>
    </div>
</template>
<script>
    export default {
        props: {
            userDetail: {}
        },
        methods: {
            inFavorites(item) {
            if (item.isLike === 'unlike') {
                return 'is-like'
            }
            return 'not-like'
            },
        },
    }
</script>
<style scoped>
    @import url(user.css);
</style>