<template>
    <div class="p-0 d-flex flex-column h-100">
        <MenuBar :scroll-bar="true" :menu-bar-items="menuBarItems" />
        <div class="h-100 overflow-hidden">
            <router-view />
        </div>
    </div>
</template>
<script>
import MenuBar from '../UI/MenuBar.vue';
import MyButton from '../UI/MyButton.vue';

export default {
    name: "main-menu",
    data() {
        return {
            menuBarItems: [
                { title: 'Склад', name: 'stock' },
                { title: 'Касса', name: 'checkout' },
                { title: 'Поиск', name: 'search' },
                { title: 'Расчет', name: 'payment' },
            ]
        }
    },
    methods: {},
    mounted() {
        this.$router.push({ name: 'stock' })
    },
    components: { MyButton, MenuBar }
}
</script>