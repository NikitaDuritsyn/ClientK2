<template>
    <div class="timeLine_container">
        <div class="row h-50 m-0 p-0">
            <div class="d-flex align-items-center col-6 m-0">Время начала:</div>
            <div class="d-flex align-items-center col-6 m-0">
                <div class="d-flex justify-content-between w-100">
                    <div class="show_time">{{ start_time }}</div>
                    <MyButton :cls="'btn_second'" @click="updateStartTime" :disabled="startTimeDisabled">СТАРТ</MyButton>
                </div>
            </div>
        </div>
        <!-- {{ session }} -->
        <div class="row h-50 m-0 p-0">
            <div class="d-flex align-items-center col-6 m-0">Время окончания:</div>
            <div class="d-flex align-items-center col-6 m-0">
                <div class="d-flex justify-content-between w-100">
                    <div class="show_time">{{ end_time }}</div>
                    <MyButton :cls="'btn_second'" @click="updateEndTime">СТОП</MyButton>
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
            start_time: '__:__',
            end_time: '__:__',
            startTimeDisabled: false
        }
    },
    methods: {
        setEndStartTimeVisitor(_mode) {
            this.start_time = '__:__';
            this.end_time = '__:__';
            if (_mode === 'start_time_identical') {
                (this.visitorList[0].start_time_visitor) ? this.start_time = new Date(this.visitorList[0].start_time_visitor).toLocaleTimeString() : '__:__';
            } else if (_mode === 'end_time_identical') {
                (this.visitorList[0].end_time_visitor) ? this.end_time = new Date(this.visitorList[0].end_time_visitor).toLocaleTimeString() : '__:__';
            } else {
                (this.visitorList[0].start_time_visitor) ? this.start_time = new Date(this.visitorList[0].start_time_visitor).toLocaleTimeString() : '__:__';
                (this.visitorList[0].end_time_visitor) ? this.end_time = new Date(this.visitorList[0].end_time_visitor).toLocaleTimeString() : '__:__';
            }
        },
        async updateStartTime() {
            let currentDateTime = new Date()
            this.start_time = currentDateTime.getHours() + ':' + currentDateTime.getMinutes()
            await this.$api.updateStartTime({
                visitorsId: this.visitorList.map((item) => { return item.id }),
                sessionId: this.session.id,
                startTime: currentDateTime
            })
            this.$emit('timeUpdated')
        },
        async updateEndTime() {
            let currentDateTime = new Date()
            this.end_time = currentDateTime.getHours() + ':' + currentDateTime.getMinutes()
            await this.$api.updateEndTime({
                visitorsId: this.visitorList.map((item) => { return item.id }),
                sessionId: this.session.id,
                endTime: currentDateTime
            })
            this.$emit('timeUpdated')
        },
    },
    watch: {
        visitorList(value) {

            if (value.find((visitor) => { return (visitor.start_time_visitor) ? true : false; })) {
                this.startTimeDisabled = true
            } else {
                this.startTimeDisabled = false
            }

            if (value.length === 1) {
                this.setEndStartTimeVisitor()
            } else if (value.length != 0) {
                let start_time_identical = true
                let end_time_identical = true

                for (let i = 0; i < value.length; i++) {
                    if (value[0].start_time_visitor != value[i].start_time_visitor) {
                        start_time_identical = false
                    }
                    if (value[0].end_time_visitor != value[i].end_time_visitor) {
                        end_time_identical = false
                    }
                }

                if (start_time_identical && end_time_identical) {
                    this.setEndStartTimeVisitor()
                } else if (start_time_identical) {
                    this.setEndStartTimeVisitor('start_time_identical')
                } else if (end_time_identical) {
                    this.setEndStartTimeVisitor('end_time_identical')
                } else {
                    this.start_time = '__:__';
                    this.end_time = '__:__';
                }
            } else {
                this.start_time = '__:__';
                this.end_time = '__:__';
            }
        }
    },
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