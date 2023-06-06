<template>
    <div v-if="scrollBar" class="overflow-scroll">
        <div class="d-flex justify-content-center align-items-center h-100" style="width: max-content; min-width: 100vw">
            <div class="menu_wrapper">
                <MyButton :cls="'link_btn'" class="m-1 mt-2" v-for="item in menuBarItems" :key="item.name"
                    @click="$router.push({ name: item.name })">
                    {{ item.title }}
                </MyButton>
            </div>
        </div>
    </div>
    <div v-else class="menu_wrapper">
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
    props: {
        menuBarItems: { type: Array },
        scrollBar: { type: Boolean, defaoult: false }
    },
    components: { MyButton },
    data() {
        return {}
    },
}
</script>

<style scoped>
.menu_wrapper {
    display: flex;
    flex-wrap: wrap;
}

.overflow-scroll {
    height: calc(50px + 10px);
}
</style>