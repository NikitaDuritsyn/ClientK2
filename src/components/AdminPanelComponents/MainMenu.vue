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
        <div class="class_setting">
            <slot></slot>
            asd
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
.main_menu{
    padding: 0;
    display: flex;
    flex-direction: column;
    height: 100%;
}
.class_setting{
    height: 100%;
    background-color: rgb(63, 63, 63);
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