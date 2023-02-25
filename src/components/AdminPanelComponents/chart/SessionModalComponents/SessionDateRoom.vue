<template>
    <div class="d-flex justify-content-between align-items-center w-100">
        <div class="d-flex">
            <!-- // new Date(date).toLocaleDateString() -->
            Дата:
            <div>
                <div class="date_room_text">{{ new Date(date).toLocaleDateString() }}
                </div>
            </div>
        </div>
        <div class="d-flex  align-items-center m-auto">
            Комнаты:
            <div>
                <div v-for="room in rooms" :key="room.id" class="date_room_text mt-2">{{ room.title }}</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'session-date-room',
    props: ['date', 'sessionRooms'],
    data() {
        return {
            rooms: [],
        }
    },
    methods: {
        setRoom() {
            for (let i = 0; i < this.$store.state.rooms.length; i++) {
                for (let j = 0; j < this.sessionRooms.length; j++) {
                    if (this.$store.state.rooms[i].id === this.sessionRooms[j].room_id) {
                        this.rooms.push(this.$store.state.rooms[i])
                    }
                }
            }
        }
    },
    mounted() {
        this.setRoom()
    }

}
</script>

<style scoped>
.date_room_text {
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #fff;
    margin: 0px 0px 0px 5px;
    padding: 0 3px 0 3px;
    font-size: 14px;
    border-radius: 5px;
}
</style>