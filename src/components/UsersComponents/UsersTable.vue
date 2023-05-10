<template>
    <div class="">
        <div class="text-center">ТАБЛИЦА ПОЛЬЗОВАТЕЛЕЙ</div>
        <User v-for="user in users" :key="user.id" :user="user" />
    </div>
</template>

<script>
import User from './User.vue';

export default {
    name: 'users-table',
    components: { User },
    data() {
        return {
            users: []
        }
    },
    methods: {
        async getUsers() {
            this.users = await this.$api.getUsers()
        }
    },
    mounted() {
        this.getUsers()
    }
}
</script>