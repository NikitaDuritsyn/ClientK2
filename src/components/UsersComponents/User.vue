<template>
    <tr>
        <th scope="row">{{ user.name }}</th>
        <td>{{ user.lastname }}</td>
        <td>{{ user.email }}</td>
        <td>{{ user.phone }}</td>
        <td><user-roles :roles="user.Roles" /></td>
        <td>
            <MyButton @click="$refs.update_user.open()" class="m-auto" :cls="'btn_second'">
                <i class="bi bi-pen"></i>
            </MyButton>
        </td>
    </tr>
    <MyModal :mode-flex-center="true" ref="update_user">
        <UserForm @close="$refs.update_user.close()" @update-user-table="$emit('updateUserTable')" :user-data="user"
            :mode="'update'" />
    </MyModal>
</template>

<script>
import UserRoles from '@/components/UsersComponents/UserRoles.vue'
import MyButton from '@/components/UI/MyButton.vue';
import MyModal from '@/components/UI/MyModal.vue';
import UserForm from '@/components/UsersComponents/UserForm.vue';

export default {
    name: 'user',
    props: ['user'],
    emits: ['updateUserTable'],
    components: { UserRoles, MyButton, MyModal, UserForm },
    data() { return {} },
}
</script>