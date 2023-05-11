<template>
    <div class="table-responsive overflow-scroll">
        <table class="table .table-striped">
            <thead>
                <tr>
                    <th>Имя</th>
                    <th>Фамилиия</th>
                    <th>Email</th>
                    <th>Телефон</th>
                    <th>Роли</th>
                    <th>Редактировать/+</th>
                </tr>
            </thead>
            <tbody>
                <User @update-user-table="$emit('updateUserTable')" v-for="user in users" :key="user.id" :user="user" />
            </tbody>
        </table>
    </div>
</template>

<script>
import User from './User.vue';

export default {
    name: 'users-table',
    emits: ['updateUserTable'],
    props: ['users'],
    components: { User },
    data() {
        return {}
    }
}
</script>
<style scoped>
.table {
    color: rgb(255, 255, 255);
}
</style>