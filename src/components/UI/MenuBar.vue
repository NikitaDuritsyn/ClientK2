<template>
    <div class="menu_wrapper">
        <MyButton :cls="'link_btn'" class="m-1 mt-2" v-for="item in menuBarItems" :key="item.name"
            @click="$router.push({ name: item.name })">
            {{ item.title }}
        </MyButton>
    </div>
</template>

<script>
import MyButton from '@/components/UI/MyButton.vue'

export default {
    name: "menu-bar",
    props: ['menuBarItems'],
    components: { MyButton },
    data() {
        return {}
    },
    methods: {
    }
}
</script>

<style scoped>
.menu_wrapper {
    display: flex;
    flex-wrap: wrap;
}
</style>


