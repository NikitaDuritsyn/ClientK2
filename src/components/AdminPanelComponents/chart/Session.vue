<template>
    <div class="session" @click="$refs.session_modal.open()" :style="{ 
    width: session.timeLine + 'px', 
    height: 'calc((100%)/6)', 
    top: `calc((100%)/6*${session.room})`, 
    left: 1440 * session.index_day + session.time + 60 + 'px' }">
        <strong>
            {{ session.index_day }}
            {{ session.clients[0].name }}: {{ session.peopleCount }} чел.
        </strong>
    </div>
    <MyModal ref="session_modal">
        <SessionModal @close="$refs.session_modal.close()" :session="session" />
    </MyModal>
</template>

<script>
import MyModal from '@/components/UI/MyModal.vue';
import SessionModal from './SessionModal.vue';

export default {
    name: "session-vue",
    props: ["session"],
    data() {
        return {}
    },
    methods: {},
    mounted() {
    },
    components: { MyModal, SessionModal }
}
</script>

<style scoped>
.session {
    overflow: hidden;
    background-color: rgb(100, 212, 205);
    position: absolute;
    box-sizing: border-box;
    border: 1px solid black;
    color: black;
    display: flex;
    align-items: center;
    font-size: 12px;
}
</style>