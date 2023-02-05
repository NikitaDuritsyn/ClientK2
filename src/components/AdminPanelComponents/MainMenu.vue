<template>
    <div class="main_menu ">
        <div class="overflow-scroll">
            <div class="d-flex justify-content-center" style="width: max-content; min-width: 100vw">
                <MyButton :cls="'darknessButton'" class="my_button" @click="$router.push({ name: 'stock' })">Склад
                </MyButton>
                <MyButton :cls="'darknessButton'" class="my_button" @click="$router.push({ name: 'checkout' })">Касса
                </MyButton>
                <MyButton :cls="'darknessButton'" class="my_button" @click="$router.push({ name: 'booking' })">Бронь
                </MyButton>
                <MyButton :cls="'darknessButton'" class="my_button" @click="$router.push({ name: 'search' })">Поиск
                </MyButton>
                <MyButton :cls="'darknessButton'" class="my_button" @click="$router.push({ name: 'payment' })">Расчет
                </MyButton>
            </div>
        </div>
        <div class="class_setting">
            <router-view />
        </div>
    </div>
</template>
<script>
import MyButton from '../UI/MyButton.vue';

export default {
    name: "main-menu",
    data() {
        return {}
    },
    methods: {},
    mounted() {
        this.$router.push({ name: 'booking' })
    },
    components: { MyButton }
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

.my_button {
    margin: 5px;
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