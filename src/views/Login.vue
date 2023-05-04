<template>
    <div class="row justify-content-center vh-100 m-0 p-0">
        <div class="col-md-4 d-flex align-items-center">
            <div class="w-100">
                <MyInput class="m-3" :label="'login'" :model-value="login" />
                <MyInput class="m-3" :label="'password'" :model-value="password" />
                <MyButton class="m-3" :cls="'btn_second'">Войти</MyButton>
            </div>
        </div>
    </div>
</template>

<script>
import MyButton from '@/components/UI/MyButton.vue';
import MyInput from '@/components/UI/MyInput.vue';

export default {
    name: "Login",
    components: { MyInput, MyButton },
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

<style scoped></style>