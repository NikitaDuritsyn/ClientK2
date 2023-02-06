<template>
    <div class="booking_modal">
        <div class="head_line_container">
            <BookingDateRoom :index_day="booking.index_day" :index_room="booking.room" />
            <div class="close_btn" @click="$emit('close')"></div>
        </div>
        <div class="clients">
            <BookingClientsList @clients-selected="setSelectedClients" :clients_lsit="booking.clients" />
        </div>
        <div class="time_line">
            <!-- ТУТ Я КАК ПОНЯЛ ВСЕГДА ОБЩЕЕ ПО ВЫБРАННЫМ КЛИЕНТАМ -->
            <BookingTimeLine :booking="booking" />
        </div>
        <div class="services">
            <BookingService />
        </div>
        <div class="payment">
            <BookingPayment />
        </div>
    </div>
</template>

<script>
import BookingClientsList from './BookingModalComponents/BookingClientsList.vue';
import BookingDateRoom from './BookingModalComponents/BookingDateRoom.vue';
import BookingPayment from './BookingModalComponents/BookingPayment.vue';
import BookingService from './BookingModalComponents/BookingService.vue';
import BookingTimeLine from './BookingModalComponents/BookingTimeLine.vue';

export default {
    name: "booking-modal-vue",
    props: ["booking"],
    components: { BookingClientsList, BookingTimeLine, BookingService, BookingPayment, BookingDateRoom },
    data() {
        return {
            selectedClients: []
        };
    },
    methods: {
        setSelectedClients(value) {
            this.selectedClients = value
        },
    },
    mounted() { },
}
</script>

<style scoped>
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

.clients {
    padding: 5px 0;
    height: 250px;
}

.time_line {
    padding: 5px 0;
    height: 100px;
}

.services {
    padding: 5px 0;
    /* height: 150px; */
}

.payment {
    padding: 5px 0 0 0;
    height: 500px;
}
</style>