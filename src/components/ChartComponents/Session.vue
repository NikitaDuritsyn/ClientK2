<template>
    <div ref="session_blocks" v-for="room in session.roomsByIndex" class="session"
        @click.stop.prevent="$refs.session_modal.open()" :style="{
            borderColor: borderSessionColor,
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
        <SessionModal @session-updated="$emit('sessionUpdated')" @close="$refs.session_modal.close()" :session="session" />
    </MyModal>
</template>

<script>
import MyModal from '@/components/UI/MyModal.vue';
import SessionModal from '@/components/ChartComponents/SessionModal.vue';

export default {
    name: "session-vue",
    emits: ['sessionUpdated'],
    props: ["session", "roomsNumber"],
    components: { MyModal, SessionModal },
    data() {
        return {
            borderSessionColor: ''
        }
    },
    watch: {
        session(value) {
            this.setColorSession(value.status)
        }
    },
    methods: {
        setColorSession(status) {
            switch (status) {
                case 'booked':
                    this.borderSessionColor = "yellow";
                    break;
                case 'active':
                    this.borderSessionColor = "green";
                    break;
                case 'close':
                    this.borderSessionColor = "blue";
                    break;
                case 'canceled':
                    this.borderSessionColor = "red";
                    break;
                default:
                    break;
            }
        }
    },
    mounted() {
        this.setColorSession(this.session.status)
    }
}
</script>

<style scoped>
.session {
    overflow: hidden;
    background-color: rgba(255, 255, 255, 0.5);
    position: absolute;
    box-sizing: border-box;
    border: 2px solid;
    color: black;
    display: flex;
    align-items: center;
    font-size: 12px;
}
</style>