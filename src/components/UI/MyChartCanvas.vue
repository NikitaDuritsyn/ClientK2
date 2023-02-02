<template>
    <div ref="scrollToDay" class="MyChartCanvas overflow-scroll">
        <div class="timeLine">
            <div class="time" v-for="time in timeArray">{{ time }}</div>
        </div>
        <div ref="canvas_container" class="canvas_container">
            <div class="currentLineTime" :style="{ left: 2940 + setTimeCurrent + 'px' }"></div>
            <canvas ref="canvasChart" class="canvas"></canvas>
            <div v-for="(item, index) in bookingsArray" :key="index">
                <div class="booking" @click="$refs.modal.open()"
                    :style="{ width: item.timeLine + 'px', height: 'calc((100%)/6)', top: `calc((100%)/6*${item.room})`, left: item.time + 60 + 'px' }">
                    <strong>
                        {{ item.day }}
                        {{ item.client.name }}: {{ item.client.peopleCount }} чел.
                    </strong>
                </div>
            </div>
        </div>
        <div class="dateLine" :style="{ width: 1440 * this.days + 'px' }">
            <div class="date" v-for="(date, index) in days">
                <div
                    v-if="today.toLocaleDateString() === new Date(new Date().setDate(new Date().getDate() + index - 2)).toLocaleDateString()">
                    Сегодня:_
                </div>
                {{ new Date(new Date().setDate(new Date().getDate() + index - 2)).toLocaleDateString() }}
                <!-- {{ hoursMinutesSeconds }} -->
                <!-- {{ setTimeCurrent }} -->
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "my-chart-canvas",
    props: ["days"],
    components: {},
    data() {
        return {
            timeArray: [
                "00:00",
                "01:00",
                "02:00",
                "03:00",
                "04:00",
                "05:00",
                "06:00",
                "07:00",
                "08:00",
                "09:00",
                "10:00",
                "11:00",
                "12:00",
                "13:00",
                "14:00",
                "15:00",
                "16:00",
                "17:00",
                "18:00",
                "19:00",
                "20:00",
                "21:00",
                "22:00",
                "23:00",
            ],
            today: new Date(),
            // hoursMinutesSeconds: new Date().getHours() + '.' + new Date().getMinutes() + '.' + new Date().getSeconds(),
            canv: null,
            ctx: null,
            bookingsArray: [
                { day: new Date(), time: 60, timeLine: 120, room: 0, client: { name: 'Тимофей', peopleCount: 6 } },
                { day: "Тут будет Дата", time: 120, timeLine: 120, room: 1, client: { name: 'Филип', peopleCount: 2 } },
                { day: "Тут будет Дата", time: 60, timeLine: 30, room: 2, client: { name: 'Александр', peopleCount: 10 } },
                { day: "Тут будет Дата", time: 840, timeLine: 180, room: 3, client: { name: 'Леонардо', peopleCount: 20 } },
                { day: "Тут будет Дата", time: 360, timeLine: 120, room: 4, client: { name: 'Акакий', peopleCount: 3 } },
                { day: "Тут будет Дата", time: 660, timeLine: 120, room: 5, client: { name: 'Сергей', peopleCount: 4 } },
            ]
        };
    },
    computed: {
        setTimeCurrent() {
            return Number(this.today.getHours()) * 60 + Number(this.today.getMinutes())
        }
    },
    methods: {
        setCanvasChartBlock(days) {
            const stepX = 60 // 1px 1 min
            let rooms = 6
            // let days = 2
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

            // ctx.strokeStyle = 'rgb(40, 40, 40)';
            // ctx.fillStyle = 'black'
            ctx.setLineDash([5, 2]);

            // const grafHeight = this.$refs.canvas_container.offsetHeight - 20
            const grafHeight = this.$refs.canvas_container.offsetHeight
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
                    ctx.lineWidth = 2;

                    // if (count < 10) {
                    //     ctx.fillText(`0${count}:00`, x - 12, 10);
                    // } else {
                    //     ctx.fillText(`${count}:00`, x - 12, 10);
                    // }

                    ctx.moveTo(x, y);
                    ctx.lineTo(x, canv.height);
                    x = x + stepX
                    count = count + 1
                    ctx.stroke();
                }
            }


            const stepY = grafHeight / 6
            let count2 = 0
            y = stepY - 0
            x = 0
            while (count2 < rooms) {
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
                this.timeArray.push(
                    "00:00",
                    "01:00",
                    "02:00",
                    "03:00",
                    "04:00",
                    "05:00",
                    "06:00",
                    "07:00",
                    "08:00",
                    "09:00",
                    "10:00",
                    "11:00",
                    "12:00",
                    "13:00",
                    "14:00",
                    "15:00",
                    "16:00",
                    "17:00",
                    "18:00",
                    "19:00",
                    "20:00",
                    "21:00",
                    "22:00",
                    "23:00",
                )
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
    background-color: rgb(59, 59, 59);
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

.MyChartCanvas {
    padding: 30px;
    width: 100%;
}

.canvas {
    /* padding-top: 20px; */
}

.canvas_container {
    position: relative;
    image-rendering: pixelated;
    background-color: transparent;
    height: calc(100% - 60px);
    /* height: calc(100% - 20px); */
    /* height: 100%; */
}

.MyChartCanvas {
    -ms-overflow-style: none;
    scrollbar-width: none;
}

.MyChartCanvas::-webkit-scrollbar {
    display: none;
}
</style>


