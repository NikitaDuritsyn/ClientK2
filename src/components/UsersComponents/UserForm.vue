<template>
    <div class="user_form_container m-auto">
        <div class="d-flex justify-content-end">
            <my-button :cls="'close_btn'" @click="$emit('close')"></my-button>
        </div>
        <my-input class="mt-2" v-model:model-value="user.name" :label="'Имя'" />
        <my-input class="mt-2" v-model:model-value="user.lastname" :label="'Фамилиия'" />
        <my-input class="mt-2" :type="'email'" v-model:model-value="user.email" :label="'Email'" />
        <my-input class="mt-2" :type="'password'" v-model:model-value="user.password" :label="'Пароль'" />
        <my-input class="mt-2 w-100" :phone-input="true" v-model:model-value="user.phone" :label="'Номер телефона:'" />
        <my-multi-select class="mt-2" :options="roles" v-model:model-value="user.roles_id" :label="'role_id'" />
        <div v-if="mode !== 'update'" class="d-flex justify-content-end mt-2">
            <my-button @click="createUser">СОЗДАТЬ</my-button>
        </div>
        <div v-else class="d-flex justify-content-end mt-2">
            <my-button class="ms-1" @click="updateUser">Сохранить</my-button>
            <my-button class="ms-1" @click="deleteUser">Удалить</my-button>
        </div>
    </div>
</template>

<script>
import MyButton from '@/components/UI/MyButton.vue';
import MyInput from '@/components/UI/MyInput.vue';
import { mapState } from 'vuex';
import MyMultiSelect from '../UI/MyMultiSelect.vue';

export default {
    name: 'registration-form',
    components: { MyInput, MyButton, MyMultiSelect },
    props: ['userData', 'mode'],
    emits: ['close', 'updateUserTable', 'deleteUser'],
    data() {
        return {
            user: {
                name: null,
                lastname: null,
                email: null,
                password: null,
                phone: null,
                roles_id: [],
            }
        }
    },
    computed: {
        ...mapState(['roles']),
    },
    methods: {
        async createUser() {
            try {
                const res = await this.$api.createUser(this.user)
                this.$toast.info(res.massage);
                this.$emit('updateUserTable')
                this.$emit('close')
            } catch (e) {
                this.$toast.error(e.massage);
            }
        },
        async updateUser() {
            try {
                const res = await this.$api.updateUser(this.user)
                this.$toast.info(res.massage);
                this.$emit('updateUserTable')
                this.$emit('close')
            } catch (e) {
                this.$toast.error(e.massage);
            }
        },
        async deleteUser() {
            try {
                const res = await this.$api.deleteUser(this.user.id)
                this.$toast.info(res.massage);
                this.$emit('updateUserTable')
                this.$emit('close')
            } catch (e) {
                this.$toast.error(e.massage);
            }
        }
    },
    mounted() {
        if (this.userData && this.mode === 'update') {
            this.user = {
                ...this.userData,
                roles_id: this.userData.Roles.map(item => item.id)
            }
        }
    }
}
</script>
<style>
.user_form_container {
    width: 400px;
}
</style>