<template>
    <div class="d-flex flex-column">
        <div class="">
            <MenuBar :scroll-bar="true" :menu-bar-items="menuBarItems" />
        </div>
        <div class="h-100 overflow-hidden">
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