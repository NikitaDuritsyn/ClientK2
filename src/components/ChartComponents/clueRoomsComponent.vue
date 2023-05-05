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
        <div class="d-flex align-items-center" @click="visible = !visible">
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
.clue_rooms {
    white-space: nowrap;
}

.clue_rooms_container {
    border-top-right-radius: 1rem;
    border-bottom-right-radius: 1rem;
    z-index: 101;
    display: flex;
    height: 100%;
}

.room_name {
    background-color: rgba(0, 0, 0, 0.342);
    border-top: 1px solid rgb(0, 0, 0);
    border-bottom: 1px solid rgb(0, 0, 0);
    padding: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>