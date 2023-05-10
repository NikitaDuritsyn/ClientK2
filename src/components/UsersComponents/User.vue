<template>
    <div class="w-100 p-2 mt-1 mb-1">
        <div class="d-flex flex-wrap justify-content-between">
            <div class="d-flex flex-column">
                <div class="td p-1">
                    Имя
                </div>
                <div class="td p-1">
                    {{ user.name }}
                </div>
            </div>
            <div class="d-flex flex-column">
                <div class="td p-1">
                    Фамилиия
                </div>
                <div class="td p-1">
                    {{ user.lastname }}
                </div>
            </div>
            <div class="d-flex flex-column">
                <div class="td p-1">
                    Email
                </div>
                <div class="td p-1">
                    {{ user.email }}
                </div>
            </div>
            <div class="d-flex flex-column">
                <div class="td p-1">
                    Телефон
                </div>
                <div class="td p-1">
                    {{ user.phone }}
                </div>
            </div>

            <div class="td">
                <div>
                    <MyButton @click="$refs.update_visitor.open()" class="m-1 mt-0 mb-0" :cls="'btn_second'">
                        <i class="bi bi-pen"></i>
                    </MyButton>
                </div>
            </div>
            <div class="d-flex td">
                <div class="td d-flex justify-content-center align-items-center p-1">Роли </div>
                <user-role class="m-2" v-for="role in user.Roles" :key="role.id" :role="role" />
            </div>

        </div>

    </div>
</template>

<script>
import UserRole from '@/components/UsersComponents/UserRole.vue'
import MyButton from '../UI/MyButton.vue';

export default {
    name: 'user',
    props: ['user'],
    components: { UserRole, MyButton },
    data() {
        return {}
    },
    methods: {},
}
</script>
<style>
.td {
    color: white;
    border: 1px solid rgb(40, 40, 40);
}
</style>