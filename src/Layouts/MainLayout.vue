<template>
    <div class="d-flex flex-column">
        <div class="d-flex justify-content-between align-items-center">
            <!-- <MenuBar :menu-bar-items="menuBarItems" /> -->
            <div v-if="linkAdminPanel">
                <my-button class="m-2" :cls="'link_btn'"
                    @click="$router.push({ name: 'control' }), linkAdminPanel = !linkAdminPanel">
                    Гл. панель
                </my-button>
            </div>
            <div v-else>
                <my-button class="m-2" :cls="'link_btn'"
                    @click="$router.push({ name: 'adminPanel' }), linkAdminPanel = !linkAdminPanel">
                    Админ. панель
                </my-button>
            </div>
            <my-button :cls="'log_out'" class="m-2" @click="logOut">
                <i class="bi bi-box-arrow-left"></i>
            </my-button>
        </div>
        <router-view class="h-100 overflow-hidden" />
    </div>
</template>

<script>
import MenuBar from '@/components/UI/MenuBar.vue';
import MyButton from '@/components/UI/MyButton.vue';

export default {
    name: "main-layout",
    components: { MyButton, MenuBar },
    data() {
        return {
            linkAdminPanel: true
            // menuBarItems: [
            //     { title: 'Гл. панель', name: 'control' },
            //     { title: 'Админ. панель', name: 'adminPanel' },
            // ]
        };
    },
    methods: {
        logOut() {
            this.$router.push({ name: 'login' })
        }
    },
    mounted() { },
}
</script>

<style scoped></style>