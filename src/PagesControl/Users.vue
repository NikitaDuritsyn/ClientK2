<template>
    <div class="d-flex h-100 flex-column ms-2 me-2">
        <div class="mt-2 mb-2">
            <my-button @click="$refs.create_user.open()" :cls="'btn_second'">
                Доб. Пользователя
            </my-button>
        </div>
        <div class="overflow-scroll h-100">
            <UsersTable @update-user-table="getUsers()" :users="users" />
        </div>
    </div>
    <MyModal :mode-flex-center="true" ref="create_user">
        <UserForm @update-user-table="getUsers()" @close="$refs.create_user.close()" />
    </MyModal>
</template>

<script>
import MyButton from '@/components/UI/MyButton.vue';
import MyModal from '@/components/UI/MyModal.vue';
import UserForm from '@/components/UsersComponents/UserForm.vue';
import UsersTable from '@/components/UsersComponents/UsersTable.vue';

export default {
    name: "Users",
    components: { UserForm, UsersTable, MyButton, MyModal },
    data() {
        return {
            users: []
        };
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