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
        <!-- {{ booking }} -->
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
    name: 'booking-time-line',
    components: { MyButton },
    props: ['booking'],
    data() {
        return {
            start_time: this.booking?.start_time || '__:__',
            end_time: this.booking?.end_time || '__:__',

        }
    },
    methods: {
        setStartTime() {
            let currentTime = new Date()
            this.start_time = currentTime.getHours() + ':' + currentTime.getMinutes()
            console.log(this.start_time);
            // Зпрос на получение статуса, что бронь перешла в статус активной фазы (Status:2 напрмер) Изначально статус 1 статус бронь установленна
        },
        setEndTime() {
            let currentTime = new Date()
            this.end_time = currentTime.getHours() + ':' + currentTime.getMinutes()
            // Тут же делать запрос для изменения статуса, что бронь перешла в статус закрытой фазы (Status:3 напрмер)
        },
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