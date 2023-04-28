<template>
    <div>
        Сместить время:
        <div class="d-flex  w-100">
            <vue-timepicker v-model="shiftTime" :minute-interval="5"></vue-timepicker>
            <!-- <MyInput :type="'number'" v-model:modelValue="shiftTimeByMinutes" /> -->
            <MyButton :cls="'btn_second'" @click="updateSessionBookedTime">сместить</MyButton>
        </div>
    </div>
</template>

<script>
import MyButton from '../UI/MyButton.vue';
import MyInput from '../UI/MyInput.vue';
import VueTimepicker, { data } from 'vue3-timepicker'

export default {
    name: "session-time-shift",
    props: ['session'],
    components: { MyInput, MyButton, VueTimepicker },
    data() {
        return {
            shiftTime: null,
            shiftTimeByMinutes: null,
        };
    },
    methods: {
        updateSessionBookedTime() {
            //Если нужно смещать по минутам
            // const newBookedDate = new Date(new Date(this.session.booked_date).setTime(new Date(this.session.booked_date).getTime() + this.shiftTimeByMinutes * 60000));
            //Если нужно менять время полностью
            const [hours, minutes] = this.shiftTime.split(':');
            const newBookedDate = new Date(new Date().setHours(hours, minutes, 0, 0));
            // console.log(newBookedDate.toLocaleTimeString());
            this.$api.updateSession({ ...this.session, booked_date: newBookedDate })
        },
        setShiftTime() {
            const hours = new Date(this.session.booked_date).getHours().toString().padStart(2, '0');
            const minutes = new Date(this.session.booked_date).getMinutes().toString().padStart(2, '0');
            this.shiftTime = `${hours}:${minutes}`;
        }
    },
    mounted() {
        this.setShiftTime()
    }
}
</script>

<style scoped></style>