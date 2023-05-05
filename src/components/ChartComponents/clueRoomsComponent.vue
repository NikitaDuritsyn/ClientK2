<template>
    <div class="clue_rooms_container">
        <div v-show="visible" class="clue_rooms">
            <div v-for="(room, index_room) in $store.state.rooms" @click="visible = !visible" :key="index_room"
                class="room_name" :style="{ height: `calc(100%/${$store.state.rooms.length})` }">
                <div>
                    {{ room.title }}
                </div>
            </div>
        </div>
        <div class="clue_btn" @click="visible = !visible">
            <i v-show="!visible" class="bi bi-caret-right" style="font-size: 30px; color: cornflowerblue;"></i>
            <i v-show="visible" class="bi bi-caret-left" style="font-size: 30px; color: cornflowerblue;"></i>
        </div>
    </div>
</template>

<script>
export default {
    name: "clue-rooms",
    components: {},
    data() {
        return {
            visible: false,
        }
    }
}
</script>

<style scoped>
.clue_btn {
    height: 100%;
    min-width: 30px;
    border-radius: 0 20px 20px 0;
    background-color: rgb(20, 20, 20);
    display: flex;
    align-items: center;
}

.clue_rooms {
    white-space: nowrap;
    background-color: rgb(20, 20, 20);
}

.clue_rooms_container {
    z-index: 101;
    display: flex;
    height: 100%;
}

.room_name {
    border: 1px solid rgb(0, 0, 0);
    background-color: transparent;
    padding: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>