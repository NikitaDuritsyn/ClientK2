<template>
    <div class="timeLine_container">
        <div class="row h-50 m-0 p-0">
            <div class="d-flex align-items-center col-6 m-0">Время начала:</div>
            <div class="d-flex align-items-center col-6 m-0">
                <div class="d-flex justify-content-between w-100">
                    <div class="show_time">{{ start_time }}</div>
                    <MyButton :cls="'btn_second'" @click="setStartTime">СТАРТ</MyButton>
                </div>
            </div>
        </div>
        <!-- {{ session }} -->
        <div class="row h-50 m-0 p-0">
            <div class="d-flex align-items-center col-6 m-0">Время окончания:</div>
            <div class="d-flex align-items-center col-6 m-0">
                <div class="d-flex justify-content-between w-100">
                    <div class="show_time">{{ end_time }}</div>
                    <MyButton :cls="'btn_second'" @click="setEndTime">СТОП</MyButton>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import MyButton from '@/components/UI/MyButton.vue'
export default {
    name: 'session-time-line',
    components: { MyButton },
    props: ['session', 'visitorList'],
    data() {
        return {
            start_time: this.session?.start_time_session || '__:__',
            end_time: this.session?.end_time_session || '__:__',
        }
    },
    methods: {
        async setStartTime() {
            let currentDateTime = new Date()
            this.start_time = currentDateTime.getHours() + ':' + currentDateTime.getMinutes()

            // visitorsId, sessionId, startTime
            await this.$api.setStartTime({ visitorsId: this.visitorList.map((item) => { return item.id }), sessionId: this.session.id, startTime: currentDateTime })
            // Зпрос на получение статуса, что бронь перешла в статус активной фазы (Status: "active") Изначально статус "booked" статус бронь установленна
        },
        async setEndTime() {
            let currentDateTime = new Date()
            this.end_time = currentDateTime.getHours() + ':' + currentDateTime.getMinutes()

            // visitorsId, sessionId, endTime
            await this.$api.setEndTime({ visitorsId: this.visitorList.map((item) => { return item.id }), sessionId: this.session.id, endTime: currentDateTime })
            // Тут же делать запрос для изменения статуса, что бронь перешла в статус закрытой фазы (Status: "close" напрмер)
        },
    },
    watch: {
        visitorList(value) {
            console.log(value);
        }
    },
    mounted() {
        //можно сделать запрос на получение данной брони по id и выводить ее данные
    }

}
</script>

<style scoped>
.show_time {
    border: 1px solid white;
    padding: 3px 5px;
    border-radius: 5px;
}

.timeLine_container {
    height: 100%;
    width: 100%;
    border: 1px solid white;
    border-radius: 5px;
}
</style>