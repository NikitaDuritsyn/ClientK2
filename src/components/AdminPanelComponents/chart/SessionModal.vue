<template>
    <div class="session_modal">
        <div class="head_line_container">
            <SessionDateRoom :date="session.date" :room_id="session.room_id" />
            <div class="close_btn" @click="$emit('close')"></div>
        </div>
        <div class="visitors">
            <SessionVisitorsList @visitors-selected="setSelectedVisitors" :visitors_lsit="session.visitors" />
        </div>
        <div class="time_line">
            <!-- ТУТ Я КАК ПОНЯЛ ВСЕГДА ОБЩЕЕ ПО ВЫБРАННЫМ КЛИЕНТАМ -->
            <SessionTimeLine :session="session" />
        </div>
        <div class="services">
            <SessionService />
        </div>
        <div class="payment">
            <SessionPayment />
        </div>
    </div>
</template>

<script>
import SessionVisitorsList from './SessionModalComponents/SessionVisitorsList.vue';
import SessionDateRoom from './SessionModalComponents/SessionDateRoom.vue';
import SessionPayment from './SessionModalComponents/SessionPayment.vue';
import SessionService from './SessionModalComponents/SessionService.vue';
import SessionTimeLine from './SessionModalComponents/SessionTimeLine.vue';

export default {
    name: "session-modal-vue",
    props: ["session"],
    components: { SessionVisitorsList, SessionTimeLine, SessionService, SessionPayment, SessionDateRoom },
    data() {
        return {
            selectedVisitors: []
        };
    },
    methods: {
        setSelectedVisitors(value) {
            this.selectedVisitors = value
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
    /* height: 150px; */
}

.payment {
    padding: 5px 0 0 0;
    height: 500px;
}
</style>