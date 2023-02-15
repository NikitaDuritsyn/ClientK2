<template>
    <div class="session" @click="$refs.session_modal.open()" :style="{ 
    width: session.timeline + 'px', 
    height: `calc((100%)/${Number(rooms)})`, 
    top: `calc((100%)/${Number(rooms)}*${session.index_room})`, 
    left: 1440 * session.index_day + session.time_booking + 60 + 'px' }">
        <!-- ВМЕСТО ROOM ID ДОЛЖЕН быть ИНДЕКС КОМНАТЫ -->
        <strong>
            {{ session.room_id }}
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
    props: ["session", "rooms"],
    data() {
        return {}
    },
    methods: {},
    mounted() {
        // console.log(this.session);
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