<template>
    <div class="dateRoom_container">
        <div class="d-flex">
            Дата:<div class="date_room_text">{{ new Date(new Date().setDate(new Date().getDate() + index_day - 2)).toLocaleDateString()}}
            </div>
        </div>
        <div class="d-flex">Комната:
            <div class="date_room_text">{{ room }}</div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'booking-date-room',
    props: ['index_day', 'index_room'],
    data() {
        return {
            room: "",
        }
    },
    methods: {
        setRoom() {
            switch (this.index_room) {
                case 0:
                    this.room = "Окно в небо 1";
                    break;
                case 1:
                    this.room = "Окно в небо 2";
                    break;
                case 2:
                    this.room = "Светлая";
                    break;
                case 3:
                    this.room = "Мягкая";
                    break;
                case 4:
                    this.room = "Кинозал";
                    break;
                case 5:
                    this.room = "Кальянка";
                    break;
                default:
                    break;
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