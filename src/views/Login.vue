<template>
    <div class="row justify-content-center m-0 p-0">
        <div class="col-md-4 d-flex align-items-center">
            <div class="w-100">
                <MyInput class="m-3" :label="'Номер телефона'" v-model:model-value="login" />
                <MyInput class="m-3" :type="'password'" v-model:model-value="password" :label="'Пароль'" />
                <MySelect class="m-3 maxw-fit role_select" :options="$store.state.roles" :label="'Роль'" />
                <MyButton class="m-3" :cls="'btn_second'" @click="$router.push({ name: 'adminPanel' })">Войти</MyButton>
            </div>
        </div>
    </div>
</template>

<script>
import MyButton from '@/components/UI/MyButton.vue';
import MyInput from '@/components/UI/MyInput.vue';
import MySelect from '@/components/UI/MySelect.vue';

export default {
    name: "Login",
    components: { MyInput, MyButton, MySelect },
    data() {
        return {
            login: null,
            password: null,
        };
    },
    methods: {},
    mounted() { },
}
</script>