<template>
    <div>
        <div class="d-flex w-100 justify-content-between">
            <SessionDate :date="(mode !== 'createBooking') ? session.booked_date : bookingDay" />
            <SessionRooms v-if="mode !== 'createBooking'" v-model:session-rooms="session.session_rooms" />
            <MyButton :cls="'close_btn'" @click="$emit('close')"></MyButton>
        </div>
        <div v-if="mode === 'createBooking'" class="d-flex w-100 justify-content-between flex-wrap">
            <div class="">
                <div class="text_label_name">Время:</div>
                <vue-timepicker v-model="simpleStringValue" :minute-interval="15"></vue-timepicker>
            </div>
            <div class="">
                <div class="text_label_name">Продолжительность:</div>
                <vue-timepicker v-model="durationTime" :minute-interval="15"></vue-timepicker>
            </div>
        </div>
        <div v-if="mode === 'createBooking'" class="">
            <div class="w-100">Выбрать комнаты:</div>
            <div class="d-flex">
                <MyMultiSelect :options="$store.state.rooms" v-model:model-value="rooms" />
            </div>
        </div>
        <div class="d-flex justify-content-between" v-if="mode === 'createBooking'">
            <div>
                <MyInput :type="'number'" v-model:modelValue="estimate_visitors" :label="'Количество гостей:'" />
            </div>
            <div>
                <MySelect class="m-auto w-100" :label="'Тариф:'" v-model:modelValue="tariff_id"
                    :options="$store.state.tariffs" />
            </div>
        </div>
        <SessionVisitorsList v-model:session-status="session.status" :mode="mode" v-model:visitors_lsit="visitors"
            v-model:session-id="session.id" :session-tariff="session.tariff_id"
            @update-visitor-by-index="updateVisitorByIndex" @delete-visitor-by-index="deleteVisitorByIndex"
            @update-visitor-list="setVisitorsBySession($event), getSessionData()"
            @visitors-selected="setSelectedVisitors" />

        <SessionTimeLine v-if="mode !== 'createBooking'" @time-updated="setVisitorsBySession($event), getSessionData()"
            @session-updated="$emit('sessionUpdated')" v-model:visitor-list="selectedVisitors" :session="session" />

        <SessionService v-if="mode !== 'createBooking'" @price-for-all="setPriceForAll"
            @visitors-updated="setVisitorsBySession($event), getSessionData()" v-model:visitor-list="selectedVisitors"
            :session-tariff="session.tariff_id" />

        <SessionPayment v-model:price-for-all="priceForAll" :visitor-list="selectedVisitors"
            @visitor-updated="setVisitorsBySession($event), getSessionData()" v-if="mode !== 'createBooking'" />
        <div class="d-flex justify-content-end">
            <MyButton v-if="mode === 'createBooking'" :cls="'btn_second'" @click="createBooking">СОЗДАТЬ</MyButton>
        </div>
    </div>
</template>

<script>
import SessionVisitorsList from '@/components/SessionModalComponents/SessionVisitorsList.vue';
import SessionDate from '@/components/SessionModalComponents/SessionDate.vue';
import SessionRooms from '@/components/SessionModalComponents/SessionRooms.vue';
import SessionPayment from '@/components/SessionModalComponents/SessionPayment.vue';
import SessionService from '@/components/SessionModalComponents/SessionService.vue';
import SessionTimeLine from '@/components/SessionModalComponents/SessionTimeLine.vue';
import MyButton from '@/components/UI/MyButton.vue';
import MyInput from '@/components/UI/MyInput.vue';
import MyMultiSelect from '@/components/UI/MyMultiSelect.vue';
import MySelect from '@/components/UI/MySelect.vue';
import VueTimepicker from 'vue3-timepicker'
import 'vue3-timepicker/dist/VueTimepicker.css'

export default {
    name: "session-modal-vue",
    components: { VueTimepicker, SessionVisitorsList, SessionTimeLine, SessionService, SessionPayment, SessionDate, MyButton, MyInput, MyMultiSelect, SessionRooms, MySelect },
    emits: ['sessionUpdated', 'close'],
    props: {
        sessionId: { type: Number, default: null },
        mode: { type: String, default: '' },
        bookingDay: { default: new Date() },
        bookingRoom: { type: Object, default: {} },
    },
    data() {
        return {
            session: {
                booked_date: null,
                session_rooms: []
            },
            tariff_id: null,
            selectedVisitors: [],
            simpleStringValue: '',
            durationTime: '01:00',
            estimate_visitors: null,
            visitors: [],
            rooms: [],
            priceForAll: 0
        };
    },
    methods: {
        async getSessionData() {
            if (this.mode !== 'createBooking') {
                this.session = await this.$api.getSession(this.sessionId)
            }
        },
        async createBooking() {
            const vm = this
            const dateBooking = new Date(new Date(vm.bookingDay).setHours(vm.simpleStringValue.slice(0, 2), vm.simpleStringValue.slice(-2), 0, 0))
            const createBookingData = {
                session: {
                    booked_date: dateBooking,
                    estimate_session_duration: Number(vm.durationTime.slice(0, 2)) * 60 + Number(vm.durationTime.slice(-2)),
                    estimate_visitors_num: this.estimate_visitors,
                    tariff_id: this.tariff_id,
                    status: 'booked'
                },
                visitors: vm.visitors,
                rooms: vm.rooms
            }
            await vm.$api.createBookingSession(createBookingData).then(() => {
                this.$emit('bookingCreated')
                this.$emit('close')
            })
        },
        async setVisitorsBySession(visitor) {
            const vm = this
            if (vm.mode !== 'createBooking') {
                vm.visitors = await vm.$api.getVisitorsBySession(vm.session.id)
            } else {
                (visitor) ? vm.visitors.push(visitor) : false;
            }
        },
        setPriceForAll(value) {
            this.priceForAll = value
        },
        updateVisitorByIndex(updatedVisitor) {
            this.visitors[updatedVisitor.visitorIndex] = updatedVisitor.visitorData
        },
        deleteVisitorByIndex(visitor_index) {
            (visitor_index > -1) ? this.visitors.splice(visitor_index, 1) : false;
        },
        setSelectedVisitors(value) {
            this.selectedVisitors = value
        },
        setSimpleStringValue() {
            this.simpleStringValue = (this.bookingDay.getHours() < 10) ? '0' + this.bookingDay.getHours() + ':00' : this.bookingDay.getHours() + ':00'
        },
        setSessionRoomsSelected() {
            this.rooms.push(this.bookingRoom.id)
        },
        listener(event) {
            if (event.code === 'Escape') {
                this.$emit('close')
            }
        }

    },
    beforeMount() {
    },
    async mounted() {
        if (this.mode === 'createBooking') {
            this.setSessionRoomsSelected()
            this.setVisitorsBySession()
            this.setSimpleStringValue()
        } else {
            await this.getSessionData()
            await this.setVisitorsBySession()
        }
        addEventListener('keyup', this.listener);
    },
    beforeUnmount() {
        removeEventListener('keyup', this.listener);
    }
}
</script>

<style scoped></style>