<template>
    <div class="todo_container d-flex flex-column w-100">
        <TodoList v-if="visible" class="m-auto" @close="visible = false" />
        <div class="m-auto">
            <div @click="visible = !visible">
                <i v-show="!visible" class="bi bi-caret-down-fill" style="font-size: 30px; color: whitesmoke;"></i>
                <i v-show="visible" class="bi bi-caret-up-fill" style="font-size: 30px; color: whitesmoke"></i>
            </div>
        </div>
    </div>
</template>

<script>
import MyButton from '../UI/MyButton.vue';
import TodoList from './TodoList.vue';

export default {
    name: "to-do-clue",
    components: { MyButton, TodoList },
    data() {
        return {
            visible: false,
        };
    },
}
</script>

<style scoped>
.todo_container {
    position: absolute;
    top: 0;
    z-index: 110;
}
</style>