<template>
    <div class="vh-100 d-flex flex-column">
        <MenuBar :scroll-bar="true" :menu-bar-items="menuBarItems" />
        <div class="h-100" :style="{ color: 'red' }">
            <router-view />
        </div>
    </div>
</template>

<script>
import MenuBar from '@/components/UI/MenuBar.vue';


export default {
    name: "Control",
    components: { MenuBar },
    data() {
        return {
            menuBarItems: [
                { title: 'Админ. панель', name: 'adminPanel' },
                { title: 'Регистрация', name: 'users' },
                { title: 'Комнаты', name: 'rooms' },
                { title: 'Услуги', name: 'services' },
                { title: 'Тарифы', name: 'tariffs' },
                { title: 'Типы оплаты', name: 'paymentTypes' },
            ]
        };
    },
    mounted() {
        this.$router.push({ name: 'users' })
    },
}
</script>

<style scoped></style>