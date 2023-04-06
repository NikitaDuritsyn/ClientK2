<template>
    <div ref="session_blocks" v-for="room in session.roomsByIndex" class="session"
        @click.stop.prevent="$refs.session_modal.open()" :style="{
            borderColor: borderSessionColor,
            width: setWidthSessionBlock + 'px',
            height: `calc((100%)/${Number(roomsNumber)})`,
            top: `calc((100%)/${Number(roomsNumber)}*${room.index})`,
            left: startSessionBlock + 'px',
            backgroundColor: `${room.color_room}`
        }">
        <strong>
            {{ setWidthSessionBlock }}
            {{ (session.status === 'active') ? session.visitors.length : session.estimate_visitors_num }}
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
    props: ["session", "roomsNumber", "currentTime"],
    components: { MyModal, SessionModal },
    data() {
        return {
            borderSessionColor: '',
            startSessionBlock: 0            // endSessionBlock: 1440 * this.session.index_day + new Date((this.session.end_time_session) ? this.session.end_time_session : this.session.booked_date).getHours() * 60 + new Date((this.session.end_time_session) ? this.session.end_time_session : this.session.booked_date).getMinutes() + 60,
        }
    },
    computed: {
        setWidthSessionBlock() {
            let widthSessionBlock = 0

            if ((this.session.estimate_session_duration + this.startSessionBlock) < (2940 + this.currentTime) && this.session.status === 'active') {
                widthSessionBlock = 2940 + this.currentTime - this.startSessionBlock
            } else if (this.session.status === 'close') {
                widthSessionBlock = 1440 * this.session.index_day + new Date(this.session.end_time_session).getHours() * 60 + new Date(this.session.end_time_session).getMinutes() + 60 - this.startSessionBlock
            } else {
                widthSessionBlock = this.session.estimate_session_duration
            }

            console.log(widthSessionBlock);
            return widthSessionBlock
        }
    },
    watch: {
        session(value) {
            this.setColorSession(value.status);
            this.setStartSession();
        }
    },
    methods: {
        setStartSession() {
            this.startSessionBlock = 1440 * this.session.index_day + new Date((this.session.start_time_session) ? this.session.start_time_session : this.session.booked_date).getHours() * 60 + new Date((this.session.start_time_session) ? this.session.start_time_session : this.session.booked_date).getMinutes() + 60;
        },
        setColorSession(status) {
            switch (status) {
                case 'booked':
                    this.borderSessionColor = "yellow";
                    break;
                case 'active':
                    this.borderSessionColor = "green";
                    break;
                case 'close':
                    this.borderSessionColor = "black";
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
        this.setStartSession();
    }
}
</script>

<style scoped>
.session {
    overflow: hidden;
    background-color: rgba(255, 255, 255, 0.5);
    position: absolute;
    box-sizing: border-box;
    border-radius: 10px;
    border: 4px solid;
    color: black;
    display: flex;
    align-items: center;
    font-size: 12px;
}
</style>