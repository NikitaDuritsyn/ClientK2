<template>
    <div class="main_menu ">
        <div class="overflow-scroll">
            <div class="d-flex justify-content-center align-items-center h-100"
                style="width: max-content; min-width: 100vw">
                <MenuBar :menu-bar-items="menuBarItems" />
            </div>
        </div>
        <div class="class_setting">
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
                { title: 'Гл. панель', name: 'control' },
                { title: 'Склад', name: 'stock' },
                { title: 'Касса', name: 'checkout' },
                { title: 'Бронь', name: 'booking' },
                { title: 'Поиск', name: 'search' },
                { title: 'Расчет', name: 'payment' },
            ]
        }
    },
    methods: {},
    mounted() {
        this.$router.push({ name: 'booking' })
    },
    components: { MyButton, MenuBar }
}
</script>

<style scoped>
.main_menu {
    padding: 0;
    display: flex;
    flex-direction: column;
    height: 100%;
}

.class_setting {
    height: 100%;
    background-color: rgb(20, 20, 20);
}

.overflow-scroll {
    height: calc(50px + 10px);
    -ms-overflow-style: none;
    /* IE и Edge */
    scrollbar-width: none;
    /* scrollbar-height: none; */
    /* Firefox */
}

.overflow-scroll::-webkit-scrollbar {
    height: 0px;
    display: none;
}
</style>