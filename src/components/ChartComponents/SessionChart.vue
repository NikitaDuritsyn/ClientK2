<template>
    <div class="w-100 h-100 position-relative d-flex align-items-center">
        <ClueRoomsComponent ref="clueRoomsComponent" />
        <div ref="scrollToDay" class="MyChartCanvas overflow-scroll">
            <div class="timeLine">
                <div class="time" v-for="time in timeArray">{{ time }}</div>
            </div>
            <div ref="canvas_container" class="canvas_container" @click="mouseСhipped">
                <div class="currentLineTime d-flex align-items-end" :style="{ left: 2940 + setTimeCurrent + 'px' }">
                    <div class="current_time">
                        {{ today.toLocaleTimeString() }}
                    </div>
                </div>
                <canvas ref="canvasChart" class="canvas"></canvas>
                <Session v-for="(item, index) in sessionsArray" :key="index" @session-updated="getSessions"
                    :rooms-number="rooms.length" :session="item" v-model:currentTime="setTimeCurrent"
                    v-model:today="today" />
            </div>
            <div class="dateLine" :style="{ width: 1440 * this.days + 'px' }">
                <div class="date" v-for="(date, index) in days">

                    <div class="date-content" ref="dateContents">
                        <div
                            v-if="today.toLocaleDateString() === new Date(new Date().setDate(new Date().getDate() + index - 2)).toLocaleDateString()">
                            Сегодня:_
                        </div>
                        {{ new Date(new Date().setDate(new Date().getDate() + index - 2)).toLocaleDateString() }}
                    </div>
                </div>
            </div>
        </div>
        <MyModal :mode-flex-center="true" ref="booking_create">
            <SessionModal @bookingCreated="getSessions" @close="$refs.booking_create.close()" :mode="'createBooking'"
                :booking-day="bookingDay" :booking-room="bookingRoom" />
        </MyModal>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import MyModal from '@/components/UI/MyModal.vue';
import ClueRoomsComponent from '@/components/ChartComponents/clueRoomsComponent.vue';
import Session from '@/components/ChartComponents/Session.vue'
import SessionModal from '@/components/ChartComponents/SessionModal.vue';
export default {
    name: "session-chart",
    props: ["days"],
    components: { MyModal, Session, ClueRoomsComponent, SessionModal },
    data() {
        return {
            chartHeight: null,
            timeArray: ["00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00",],
            today: new Date(),
            canv: null,
            ctx: null,
            sessionsArray: [],
            bookingDay: new Date(),
            bookingRoom: null,
        };
    },
    computed: {
        setTimeCurrent() {
            return Number(this.today.getHours()) * 60 + Number(this.today.getMinutes())
        },
        ...mapState(['rooms'])
    },
    watch: {
        rooms(value) {
            if (value) {
                this.setCanvasChartBlock()
                this.getSessions()
            }
        },
    },
    methods: {
        updateClueRoomsComponentHeight() {
            if (this.$refs.canvas_container && this.$refs.clueRoomsComponent) {
                this.$refs.clueRoomsComponent.$el.style.height = this.$refs.canvas_container.offsetHeight + 'px';
            }
        },
        updateDatesPosition() {
            if (!this.$refs.dateContents) return;

            const scrollLeft = this.$refs.scrollToDay.scrollLeft;
            const dateWidth = 1438;

            for (let i = 0; i < this.$refs.dateContents.length; i++) {
                const dateContent = this.$refs.dateContents[i];
                const dateStart = i * dateWidth;
                const dateEnd = dateStart + dateWidth;

                if (scrollLeft >= dateStart && scrollLeft <= dateEnd - dateContent.clientWidth) {
                    dateContent.style.left = `${scrollLeft - dateStart}px`;
                } else if (scrollLeft > dateEnd - dateContent.clientWidth && scrollLeft < dateEnd) {
                    dateContent.style.left = `${dateWidth - dateContent.clientWidth}px`;
                } else {
                    dateContent.style.left = '0px';
                }
            }
        },
        mouseСhipped(event) {
            const vm = this
            const currentMinutesToday = new Date().getHours() * 60 + new Date().getMinutes()
            let indexDay = (event.layerX - 60) / ((vm.$refs.canvas_container.offsetWidth - 60) / vm.days) - 2
            let indexRoom = event.layerY / ((vm.$refs.canvas_container.offsetHeight) / vm.rooms.length)
            vm.bookingDay = new Date()
            if (indexDay > 0 && currentMinutesToday < (((indexDay * 1440) / 60) * 60)) {
                if (indexRoom > vm.rooms.length) {
                    indexRoom = vm.rooms.length
                }
                for (let i = 0; i < vm.rooms.length; i++) {
                    if (Math.floor(indexRoom) === i) {
                        vm.bookingRoom = vm.rooms[i]
                    }
                }
                if (vm.bookingRoom) {
                    let bookingHours = Math.floor((indexDay * 1440) / 60 - (Math.floor(indexDay) * 24))
                    let bookingMinutes = Math.floor(((indexDay * 1440) % 60 / 60) * 60)
                    vm.bookingDay.setDate(vm.bookingDay.getDate() + Math.floor(indexDay));
                    vm.bookingDay.setHours(bookingHours, bookingMinutes, 0, 0)
                    vm.$refs.booking_create.open()
                } else {
                    alert('Комнаты не заданны. Для дальнейшего использования создайте их.')
                }
            }
        },
        getSessions() {
            const vm = this
            vm.$api.getSessionsByDays(vm.days).then((data) => {
                vm.sessionsArray = data
                for (let i = 0; i < vm.sessionsArray.length; i++) {
                    let session = vm.sessionsArray[i];
                    session.roomsByIndex = [];
                    for (let j = 0; j < vm.rooms.length; j++) {
                        const room = vm.rooms[j];
                        for (let g = 0; g < session.session_rooms.length; g++) {
                            const room_id = session.session_rooms[g].room_id;
                            if (room_id === room.id) {
                                session.roomsByIndex.push({ index: j, color_room: room.color })

                            }

                        }
                    }
                }
            })
        },
        setCanvasChartBlock(days) {
            const stepX = 60 // 1 min = 1px
            const contentWidth = 24 * 60 * days + 60
            this.$refs.canvas_container.style.width = contentWidth + 'px'
            const canv = this.$refs.canvasChart
            const ctx = canv.getContext('2d')
            canv.style.height = '100%'
            canv.style.width = '100%'

            if (canv.clientWidth != canv.width || canv.clientHeight != canv.height) {
                canv.width = canv.clientWidth
                canv.height = canv.clientHeight
            }
            ctx.setLineDash([3, 6]);
            const grafHeight = this.$refs.canvas_container.offsetHeight
            this.chartHeight = grafHeight
            let x = 60
            let y = 0
            for (let i = 0; i < days; i++) {
                let count = 0
                while (count < 24) {
                    if (count === 0) {
                        ctx.strokeStyle = 'yellow';
                    } else {
                        ctx.strokeStyle = 'rgb(100, 100, 100)';
                    }
                    ctx.beginPath();
                    ctx.lineWidth = Number(1);
                    ctx.moveTo(x, y);
                    ctx.lineTo(x, canv.height);
                    x = x + stepX
                    count = count + 1
                    ctx.stroke();
                }
            }
            const stepY = grafHeight / this.rooms.length
            let count2 = 0
            y = stepY - 0
            x = 0
            while (count2 < this.rooms.length) {
                ctx.lineWidth = 1;
                ctx.fillText(`${count2}`, x, y - 4);
                ctx.moveTo(x, y);
                ctx.lineTo(canv.width, y);
                y = y + stepY
                count2 = count2 + 1
                ctx.stroke();
            }
        },
        setToday() {
            this.today = new Date()
        },
        functionScrollToDay() {
            this.$refs.scrollToDay.scrollTo(2810 + Number(this.today.getHours()) * 60 + Number(this.today.getMinutes()), 0)
        },
        setTimeLine() {
            for (let i = 0; i < this.days - 1; i++) {
                this.timeArray.push("00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00",)
            }
        }
    },
    mounted() {
        this.$refs.scrollToDay.addEventListener('scroll', this.updateDatesPosition);
        window.addEventListener('resize', this.updateClueRoomsComponentHeight);
        this.setTimeLine()
        this.setCanvasChartBlock(this.days);
        setInterval(() => { this.setToday() }, 1000);
        this.functionScrollToDay();
        this.getSessions()
        this.updateClueRoomsComponentHeight();
    },
    beforeDestroy() {
        this.$refs.scrollToDay.removeEventListener('scroll', this.updateDatesPosition);
        window.removeEventListener('resize', this.updateClueRoomsComponentHeight);
        this.$refs.scrollToDay.removeEventListener('scroll', this.updateDatesPosition);
    }
}
</script>

<style scoped>
.date-content {
    display: flex;
    position: relative;
    white-space: nowrap;
}

.current_time {
    padding: 0 2px;
}

.currentLineTime {
    position: absolute;
    top: 0;
    background-color: rgb(255, 0, 0);
    height: 100%;
    width: 1px;
    z-index: 100;
}

.dateLine {
    display: flex;
    font-size: 15px;
    height: 30px;
    margin: 0 0 0 60px;
}

.date {
    display: flex;
    justify-content: left;
    align-items: center;
    font-size: 15px;
    color: rgb(175, 175, 175);
    font-weight: 600;
    width: 1440px;
    height: 100%;
    background-color: transparent;
    border-left: 1px solid black;
    border-right: 1px solid black;
    box-sizing: border-box;
}

.time {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 0;
    padding: 0px 0px 0px 60px;
}

.timeLine:first-child {
    padding: 0;
}

.timeLine {
    display: flex;
    font-size: 15px;
    padding-left: 60px;
    height: 30px;
}

.MyChartCanvas {
    position: absolute;
    width: 100%;
    height: 100%;
}

.canvas_container {
    position: relative;
    image-rendering: pixelated;
    background-color: transparent;
    height: calc(100% - 60px);
}

.MyChartCanvas {
    -ms-overflow-style: none;
    scrollbar-width: none;
}

.MyChartCanvas::-webkit-scrollbar {
    display: none;
}
</style>