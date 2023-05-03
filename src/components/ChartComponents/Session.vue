<template>
    <div ref="session_blocks" v-for="room in session.roomsByIndex"
        :class="{ 'session': true, 'opacity-25': session.status === 'delete' }"
        @click.stop.prevent="$refs.session_modal.open()" :style="{
                borderColor: borderSessionColor,
                width: setWidthSessionBlock + 'px',
                height: `calc((100%)/${Number(roomsNumber)})`,
                top: `calc((100%)/${Number(roomsNumber)}*${room.index})`,
                left: startSessionBlock + 'px',
                backgroundColor: `${room.color_room}`
            }">
        <strong class="w-100 text-center">
            <div>
                {{ `${new Date(session.booked_date).getHours().toString().padStart(2, '0')}:${new
                    Date(session.booked_date).getMinutes().toString().padStart(2, '0')}` }}
            </div>
            <div>
                {{ session.visitors[0].name }}
            </div>
            <div>
                {{ (session.status === 'booked') ? session.estimate_visitors_num : session.visitors.length }}
            </div>
        </strong>
    </div>
    <MyModal @close="$emit('sessionUpdated')" ref="session_modal">
        <SessionModal v-model:startSession="startSession" @close="$refs.session_modal.close(), $emit('sessionUpdated')"
            :session-id="session.id" />
    </MyModal>
</template>

<script>
import MyModal from '@/components/UI/MyModal.vue';
import SessionModal from '@/components/ChartComponents/SessionModal.vue';

export default {
    name: "session-vue",
    emits: ['sessionUpdated'],
    props: ["session", "roomsNumber", "currentTime", 'today'],
    components: { MyModal, SessionModal },
    data() {
        return {
            borderSessionColor: '',
            startSessionBlock: 0,
            startSession: false
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
            return widthSessionBlock
        }
    },
    watch: {
        session(value) {
            this.setColorSession(value.status);
            this.setStartSession();
        },
        async today(value) {
            const currentHour = new Date(value).setMilliseconds(0);
            const bookedHour = new Date(this.session.booked_date).setMilliseconds(0);
            const estimateTimeEnd = new Date(new Date(this.session.start_time_session).setTime(new Date(this.session.start_time_session).getTime() + this.session.estimate_session_duration * 60000)).setMilliseconds(0);
            if (new Date(currentHour).toISOString() === new Date(bookedHour).toISOString()) {
                await this.updateStartTime()
                this.startSession = !this.startSession
                // Данное не реализовано, браузер блокирует уведомления и не дает вопроизвести музыку без действий пользователя
                // this.glb.sendNotificationAboutStartSession(date)
            } else if (new Date(currentHour).toISOString() === new Date(estimateTimeEnd).toISOString() && this.session.status === 'active') {
                this.$refs.session_modal.open()
                const audio = new Audio(require('@/assets/audioTriggers/alarm-clock.mp3'));
                audio.play();
                this.$toast.info('Сессия подошла к концу!')
                // Данное не реализовано, браузер блокирует уведомления и не дает вопроизвести музыку без действий пользователя
                // this.glb.sendNotificationAboutStartSession(date)
            }
        }
    },
    methods: {
        async updateStartTime() {
            let currentDateTime = new Date()
            await this.$api.updateStartTimeVisitors({
                visitorUpdateData: { start_time_visitor: currentDateTime },
                visitorsId: this.session.visitors.map((item) => { return item.id }),
            })
            await this.$api.updateStartTimeSession(this.session.id)
            this.$emit('sessionUpdated')
        },

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