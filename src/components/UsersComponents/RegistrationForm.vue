<template>
    <div>
        <div class="text-center">РЕГИСТРАЦИЯ</div>
        <my-input class="mt-2 m-auto" v-model:model-value="user.name" :label="'Имя'" />
        <my-input class="mt-2 m-auto" v-model:model-value="user.lastname" :label="'Фамилиия'" />
        <my-input class="mt-2 m-auto" :type="'email'" v-model:model-value="user.email" :label="'Email'" />
        <my-input class="mt-2 m-auto" :type="'password'" v-model:model-value="user.password" :label="'Пароль'" />
        <my-input class="mt-2 m-auto w-100" :phone-input="true" v-model:model-value="user.phone"
            :label="'Номер телефона:'" />
        <my-multi-select class="mt-2 m-auto" :options="roles" v-model:model-value="user.roles_id" :label="'role_id'" />
        <div class="d-flex justify-content-center mt-2">
            <my-button @click="createUser">СОЗДАТЬ</my-button>
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
            } catch (e) {
                this.$toast.error(e.massage);
            }
        }
    }
}
</script>