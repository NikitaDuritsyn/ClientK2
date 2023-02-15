<template>
    <div class="dateRoom_container">
        <div class="d-flex">
            <!-- // new Date(date).toLocaleDateString() -->
            Дата:<div class="date_room_text">{{ new Date(date).toISOString().split('T')[0] }}
            </div>
        </div>
        <div class="d-flex">Комната:
            <div class="date_room_text">{{ room.name }}</div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'session-date-room',
    props: ['date', 'room_id'],
    data() {
        return {
            room: "",
        }
    },
    methods: {
        setRoom() {
            for (let i = 0; i < this.$store.state.rooms.length; i++) {
                if (this.$store.state.rooms[i].id === this.room_id) {
                    this.room = this.$store.state.rooms[i];
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
.dateRoom_container {
    height: 100%;
    width: 100%;
    max-width: 400px;
    display: flex;
    justify-content: space-between;
    width: 100%;
}

.date_room_text {
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #fff;
    margin: 0px 0px 0px 5px;
    padding: 0 3px 0 3px;
    font-size: 14px;
    height: 100%;
    border-radius: 5px;
}
</style>