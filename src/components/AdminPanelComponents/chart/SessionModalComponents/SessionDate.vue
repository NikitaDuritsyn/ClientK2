<template>
    <div class="d-flex justify-content-between align-items-center w-100">
        <div class="d-flex">
            Дата:
            <div>
                <div class="date_room_text">{{ new Date(date).toLocaleDateString() }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'session-date',
    props: ['date'],
    data() {
        return {
            rooms: [],
        }
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