<template>
    <div v-for="room in session.roomsByIndex" class="session" @click.stop.prevent="$refs.session_modal.open()" :style="{
        width: session.estimate_session_duration + 'px',
        height: `calc((100%)/${Number(roomsNumber)})`,
        top: `calc((100%)/${Number(roomsNumber)}*${room.index})`,
        left: 1440 * session.index_day + new Date(session.booked_date).getHours() * 60 + new Date(session.booked_date).getMinutes() + 60 + 'px',
        backgroundColor: `${room.color_room}`
    }">
        <strong>
            {{ session.estimate_visitors_num }}
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
    props: ["session", "roomsNumber"],
    data() {
        return {}
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