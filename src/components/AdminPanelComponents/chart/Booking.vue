<template>
    <div class="booking" @click="$refs.booking_modal.open()" :style="{ 
    width: booking.timeLine + 'px', 
    height: 'calc((100%)/6)', 
    top: `calc((100%)/6*${booking.room})`, 
    left: 1440 * booking.index_day + booking.time + 60 + 'px' }">
        <strong>
            {{ booking.index_day }}
            {{ booking.clients[0].name }}: {{ booking.peopleCount }} чел.
        </strong>
    </div>
    <MyModal ref="booking_modal">
        <BookingModal @close="$refs.booking_modal.close()" :booking="booking" />
    </MyModal>
</template>

<script>
import MyModal from '@/components/UI/MyModal.vue';
import BookingModal from './bookingModal.vue';

export default {
    name: "booking-vue",
    props: ["booking"],
    data() {
        return {}
    },
    methods: {},
    mounted() {
    },
    components: { MyModal, BookingModal }
}
</script>

<style scoped>
.booking {
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