<template>
    <div class="session_modal">
        <div class="head_line_container">
            <SessionDateRoom v-if="mode !== 'createBooking'" :date="session.date" :room_id="session.room_id" />
            <SessionDateRoom v-if="mode === 'createBooking'" :date="bookingDay" :room_id="room.id" />
            <div class="close_btn" @click="$emit('close')"></div>
        </div>
        <div v-if="mode === 'createBooking'" class="time_picker">
            <!-- :hour-range="[10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]" -->
            <div class="text_name">
                Время:
            </div>
            <vue-timepicker v-model="simpleStringValue" :minute-interval="15"></vue-timepicker>
        </div>
        <div class="visitors">
            <SessionVisitorsList :mode="mode" @update-visitor-list="$emit('update')" @visitors-selected="setSelectedVisitors" :visitors_lsit="session.visitors"
                :session-id="session.id" />
        </div>
        <div v-if="mode !== 'createBooking'" class="time_line">
            <!-- ТУТ Я КАК ПОНЯЛ ВСЕГДА ОБЩЕЕ ПО ВЫБРАННЫМ КЛИЕНТАМ -->
            <SessionTimeLine :session="session" />
        </div>
        <div v-if="mode !== 'createBooking'" class="services">
            <SessionService />
        </div>
        <div v-if="mode !== 'createBooking'" class="payment">
            <SessionPayment />
        </div>
        <div class="d-flex justify-content-end">
            <MyButton v-if="mode === 'createBooking'" :cls="'btn_second'">Сохранить</MyButton>
        </div>
</div>
</template>

<script>
import SessionVisitorsList from './SessionModalComponents/SessionVisitorsList.vue';
import SessionDateRoom from './SessionModalComponents/SessionDateRoom.vue';
import SessionPayment from './SessionModalComponents/SessionPayment.vue';
import SessionService from './SessionModalComponents/SessionService.vue';
import SessionTimeLine from './SessionModalComponents/SessionTimeLine.vue';
import VueTimepicker from 'vue3-timepicker'
import 'vue3-timepicker/dist/VueTimepicker.css'
import MyButton from '@/components/UI/MyButton.vue';

export default {
    name: "session-modal-vue",
    components: { VueTimepicker, SessionVisitorsList, SessionTimeLine, SessionService, SessionPayment, SessionDateRoom, MyButton },
    props: {
        session: {
            type: Object,
            default: { visitors: [] }
        },
        mode: {
            type: String,
            default: ''
        },
        bookingDay: {
            default: new Date()
        },
        room: {},
        bookingHours: {
            default: null
        },
        bookingMinutes: {
            default: null
        },
    },
    data() {
        return {
            selectedVisitors: [],
            simpleStringValue: ''
        };
    },
    methods: {
        updateSessions(){
            console.log('updateSessions');
            this.$emit('updateSessions');
        },
        setSelectedVisitors(value) {
            this.selectedVisitors = value
        },
        setSimpleStringValue() {
            if (this.bookingHours < 10) {
                if (this.bookingMinutes < 10) {
                    this.simpleStringValue = `0${this.bookingHours}:0${this.bookingMinutes}`
                } else {
                    this.simpleStringValue = `0${this.bookingHours}:${this.bookingMinutes}`
                }
            } else {
                if (this.bookingMinutes < 10) {
                    this.simpleStringValue = `${this.bookingHours}:0${this.bookingMinutes}`
                } else {
                    this.simpleStringValue = `${this.bookingHours}:${this.bookingMinutes}`
                }
            }
        }
    },
    mounted() {
        this.setSimpleStringValue()
    },
}
</script>

<style scoped>
.text_name {
    font-size: 16px;
    padding: 0 10px 0 0;
}

.time_picker {
    width: 100%;
    display: flex;
    align-items: center;
    padding: 10px 0;
}

.close_btn {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 25px;
    width: 25px;
    border-radius: 50%;
    border: 1px solid rgb(200, 200, 200);
    background-image: url('../../../assets/X.svg');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    cursor: pointer;
    margin: 0 0 0 5px;
}

.head_line_container {
    display: flex;
    justify-content: space-between;
    flex-wrap: nowrap;
    padding: 0 0 5px 0;
    height: 30px;
}

.visitors {
    padding: 5px 0;
    height: 250px;
}

.time_line {
    padding: 5px 0;
    height: 100px;
}

.services {
    padding: 5px 0;
}

.payment {
    padding: 5px 0 0 0;
    height: 500px;
}
</style>