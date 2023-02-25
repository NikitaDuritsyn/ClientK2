<template>
    <div class="session_modal">
        <div class="head_line_container">
            <SessionDateRoom v-if="mode !== 'createBooking'" :date="session.booked_date" :session-rooms="session.session_rooms" />
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
        <div v-if="mode === 'createBooking'" class="time_picker">
            <div class="text_name">
                Продолжительность:
            </div>
            <vue-timepicker v-model="durationTime" :minute-interval="30"></vue-timepicker>
        </div>
        <div class="d-flex" v-if="mode === 'createBooking'">
            <MyInput :type="'number'" v-model:modelValue="estimate_visitors" :label="'Количество гостей:'" />
        </div>
        <div class="visitors">
            <SessionVisitorsList @delete-visitor-by-index="deleteVisitorByIndex" :mode="mode"
                @update-visitor-list="setVisitorsBySession" @visitors-selected="setSelectedVisitors"
                :visitors_lsit="visitors" :session-id="session.id" />
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
            <MyButton v-if="mode === 'createBooking'" :cls="'btn_second'" @click="createBooking">Сохранить</MyButton>
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
import MyInput from '@/components/UI/MyInput.vue';

export default {
    name: "session-modal-vue",
    components: { VueTimepicker, SessionVisitorsList, SessionTimeLine, SessionService, SessionPayment, SessionDateRoom, MyButton, MyInput },
    props: {
        session: {
            type: Object,
            default: {}
        },
        mode: {
            type: String,
            default: ''
        },
        bookingDay: {
            default: new Date()
        },
        room: {},
    },
    data() {
        return {
            selectedVisitors: [],
            simpleStringValue: '',
            durationTime: '00:30',
            estimate_visitors: null,
            visitors: []
        };
    },
    methods: {
        deleteVisitorByIndex(visitor_index) {
            // console.log(visitor_index);
            // console.log(this.visitors[visitor_index]);
            if (visitor_index > -1) {
                this.visitors.splice(visitor_index, 1);
            }
        },
        createBooking() {
            const vm = this
            const dateBooking = new Date(new Date(vm.bookingDay).setHours(vm.simpleStringValue.slice(0, 2), vm.simpleStringValue.slice(-2), 0, 0))
            const session = {
                room_id: vm.room.id,
                booked_date: dateBooking,
                estimate_session_duration: Number(vm.durationTime.slice(0, 2)) * 60 + Number(vm.durationTime.slice(-2)),
                estimate_visitors_num: this.estimate_visitors,
                // start_time_session: null, // в формате даты с временем
                // end_time_session: null, // в формате даты с временем
                status: 'booking',
                visitors: vm.visitors
            }
            console.log(session);
            vm.$api.createBookingSession(session).then(() => {
                console.log('$emit:bookingCreated');
                this.$emit('bookingCreated')
                this.$emit('close')
            })
        },
        setVisitorsBySession(visitor) {
            const vm = this
            if (vm.mode !== 'createBooking') {
                vm.$api.getVisitorsBySession(vm.session.id).then((data) => {
                    vm.visitors = data
                })
            } else {
                if (visitor) {
                    vm.visitors.push(visitor)
                }
            }
        },
        setSelectedVisitors(value) {
            this.selectedVisitors = value
        },
        setSimpleStringValue() {
            this.simpleStringValue = this.bookingDay.toLocaleTimeString()
        }
    },
    mounted() {
        this.setSimpleStringValue()
        this.setVisitorsBySession()
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
    /* height: 30px; */
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