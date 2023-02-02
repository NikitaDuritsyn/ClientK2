<template>
    <div class="main_menu ">
        <div class="overflow-scroll">
            <div class="d-flex justify-content-center" style="width: max-content; min-width: 100vw">
                <MyButton :cls="'darknessButton'" class="my_button">Склад</MyButton>
                <MyButton :cls="'darknessButton'" class="my_button">Касса</MyButton>
                <MyButton :cls="'darknessButton'" class="my_button">Бронь</MyButton>
                <MyButton :cls="'darknessButton'" class="my_button">Поиск</MyButton>
                <MyButton :cls="'darknessButton'" class="my_button">Расчет</MyButton>
            </div>
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
    },
    components: { MyButton }
}
</script>

<style scoped>
.my_button {
    margin: 5px;
}

.overflow-scroll {
    -ms-overflow-style: none;
    /* IE и Edge */
    scrollbar-width: none;
    /* Firefox */
}

.overflow-scroll::-webkit-scrollbar {
    display: none;
}
</style>