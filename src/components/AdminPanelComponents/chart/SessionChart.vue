<template>
    <div class="w-100 h-100 position-relative d-flex align-items-center">
        <div :style="{ height: this.chartHeight + 'px' }" class="clue">
            <ClueRoomsComponent />
        </div>
        <div ref="scrollToDay" class="MyChartCanvas overflow-scroll">
            <div class="timeLine">
                <div class="time" v-for="time in timeArray">{{ time }}</div>
            </div>
            <div ref="canvas_container" class="canvas_container">
                <div class="currentLineTime" :style="{ left: 2940 + setTimeCurrent + 'px' }"></div>
                <canvas ref="canvasChart" class="canvas"></canvas>
                <div v-for="(item, index) in sessionsArray" :key="index">
                    <Session :rooms="$store.state.rooms.length" :session="item" />
                </div>
            </div>
            <div class="dateLine" :style="{ width: 1440 * this.days + 'px' }">
                <div class="date" v-for="(date, index) in days">
                    <div
                        v-if="today.toLocaleDateString() === new Date(new Date().setDate(new Date().getDate() + index - 2)).toLocaleDateString()">
                        Сегодня:_
                    </div>
                    {{ new Date(new Date().setDate(new Date().getDate() + index - 2)).toLocaleDateString() }}
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import MyModal from '../../UI/MyModal.vue';
import ClueRoomsComponent from './clueRoomsComponent.vue';
import Session from './Session.vue'
export default {
    name: "my-chart-canvas",
    props: ["days"],
    components: { MyModal, Session, ClueRoomsComponent },
    data() {
        return {
            chartHeight: null,
            timeArray: ["00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00",],
            today: new Date(),
            canv: null,
            ctx: null,
            sessionsArray: []
        };
    },
    computed: {
        setTimeCurrent() {
            return Number(this.today.getHours()) * 60 + Number(this.today.getMinutes())
        },
    },
    methods: {
        getSessions() {
            this.$api.getSessionsByDays(this.days).then((data) => {
                this.sessionsArray = data
                for (let i = 0; i < this.sessionsArray.length; i++) {
                    let session = this.sessionsArray[i];
                    for (let j = 0; j < this.$store.state.rooms.length; j++) {
                        const room = this.$store.state.rooms[j];
                        if (session.room_id === room.id) {
                            session.index_room = j
                        }
                    }
                }
                // console.log(this.sessionsArray);
            })
        },
        //СДЕЛАТЬ Запрос на получение СЕССИЙ В Текущие дни
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
            const stepY = grafHeight / this.$store.state.rooms.length
            let count2 = 0
            y = stepY - 0
            x = 0
            while (count2 < this.$store.state.rooms.length) {
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
        this.setTimeLine()
        this.setCanvasChartBlock(this.days);
        setInterval(() => {
            this.setToday()
        }, 1000);
        this.functionScrollToDay();
        this.getSessions()
    }
}
</script>

<style scoped>
.currentLineTime {
    position: absolute;
    top: 0;
    height: 100%;
    width: 1px;
    background-color: rgb(255, 0, 0);
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
    justify-content: center;
    align-items: center;
    font-size: 15px;
    color: rgb(175, 175, 175);
    font-weight: 600;
    width: 1440px;
    height: 100%;
    background-color: rgb(20, 20, 20);
    border: 1px solid black;
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

.clue {
    position: absolute;
    z-index: 101;
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


