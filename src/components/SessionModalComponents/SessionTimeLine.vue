<template>
    <div class="timeLine_container">
        <div class="row h-50 m-2 p-0">
            <div class="d-flex align-items-center col-6 m-0">Время начала:</div>
            <div class="d-flex align-items-center col-6 m-0">
                <div class="d-flex justify-content-between w-100">
                    <div class="show_time">{{ start_time }}</div>
                    <MyButton :cls="'btn_second'" @click="updateStartTime" :disabled="startTimeDisabled">СТАРТ</MyButton>
                </div>
            </div>
        </div>
        <div class="row h-50 m-2 p-0">
            <div class="d-flex align-items-center col-6 m-0">Время окончания:</div>
            <div class="d-flex align-items-center col-6 m-0">
                <div class="d-flex justify-content-between w-100">
                    <div class="show_time">{{ end_time }}</div>
                    <MyButton :cls="'btn_second'" @click="updateEndTime" :disabled="endTimeDisabled">СТОП</MyButton>
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
    emits: ['sessionUpdated', 'timeUpdated'],
    props: ['session', 'visitorList'],
    data() {
        return {
            start_time: '__:__',
            end_time: '__:__',
            startTimeDisabled: false,
            endTimeDisabled: false,
        }
    },
    methods: {
        setEndStartTimeVisitorsBySelected(visitorList) {
            if (visitorList.length === 1) {
                this.setEndStartTimeVisitor(visitorList)
            } else if (visitorList.length != 0) {
                let start_time_identical = true
                let end_time_identical = true
                for (let i = 0; i < visitorList.length; i++) {
                    if (visitorList[0].start_time_visitor != visitorList[i].start_time_visitor) {
                        start_time_identical = false
                    }
                    if (visitorList[0].end_time_visitor != visitorList[i].end_time_visitor) {
                        end_time_identical = false
                    }
                }
                if (start_time_identical && end_time_identical) {
                    this.setEndStartTimeVisitor(visitorList)
                } else if (start_time_identical) {
                    this.setEndStartTimeVisitor(visitorList, 'start_time_identical')
                } else if (end_time_identical) {
                    this.setEndStartTimeVisitor(visitorList, 'end_time_identical')
                } else {
                    this.start_time = '__:__';
                    this.end_time = '__:__';
                }
            } else {
                this.start_time = '__:__';
                this.end_time = '__:__';
            }
        },
        setEndStartTimeVisitor(visitorList, _mode) {
            this.start_time = '__:__';
            this.end_time = '__:__';
            if (_mode === 'start_time_identical') {
                (visitorList[0].start_time_visitor) ? this.start_time = new Date(visitorList[0].start_time_visitor).toLocaleTimeString() : '__:__';
            } else if (_mode === 'end_time_identical') {
                (visitorList[0].end_time_visitor) ? this.end_time = new Date(visitorList[0].end_time_visitor).toLocaleTimeString() : '__:__';
            } else {
                (visitorList[0].start_time_visitor) ? this.start_time = new Date(visitorList[0].start_time_visitor).toLocaleTimeString() : '__:__';
                (visitorList[0].end_time_visitor) ? this.end_time = new Date(visitorList[0].end_time_visitor).toLocaleTimeString() : '__:__';
            }
        },
        setStartEndDisavleds(visitorList) {
            if (visitorList.find((visitor) => { return (visitor.start_time_visitor) ? true : false; })) {
                this.startTimeDisabled = true
            } else {
                this.startTimeDisabled = false
            }
            if (visitorList.find((visitor) => { return (visitor.end_time_visitor) ? true : false; })) {
                this.endTimeDisabled = true
            } else {
                this.endTimeDisabled = false
            }
        },
        async updateStartTime() {
            let currentDateTime = new Date()
            this.start_time = currentDateTime.getHours() + ':' + currentDateTime.getMinutes()
            await this.$api.updateStartTimeVisitors({
                // sessionId: this.session.id,//возможно не нужно отправлять, но есил и отправить то что тогда делать
                visitorUpdateData: { start_time_visitor: currentDateTime },
                visitorsId: this.visitorList.map((item) => { return item.id }),
            })
            await this.$api.updateStartTimeSession(this.session.id)


            this.$emit('sessionUpdated')
            this.$emit('timeUpdated')
        },
        async updateEndTime() {
            let currentDateTime = new Date()
            this.end_time = currentDateTime.getHours() + ':' + currentDateTime.getMinutes()
            await this.$api.updateEndTimeVisitors({
                // sessionId: this.session.id,
                visitorsId: this.visitorList.map((item) => { return item.id }),
                visitorUpdateData: { end_time_visitor: currentDateTime },
            })
            await this.$api.updateEndTimeSession(this.session.id)

            this.$emit('sessionUpdated')
            this.$emit('timeUpdated')
        },
    },
    watch: {
        visitorList: {
            handler(value) {
                this.setStartEndDisavleds(value)
                this.setEndStartTimeVisitorsBySelected(value)
            },
            deep: true
        },
    },
    mounted() {
        this.setStartEndDisavleds(this.visitorList)
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
    max-height: 100px;
    margin: 5px 0px;
    width: 100%;
    border: 1px solid white;
    border-radius: 5px;
}
</style>