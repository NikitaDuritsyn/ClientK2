<template>
    <!-- :style="{ height: windowVH - 69 + 'px' }" -->
    <div class="todo_lsit overflow-scroll h-100">
        <Todo @todo-updated="setTodos" v-for="todo in todoList" :key="todo.id" :todo="todo" />
    </div>
</template>

<script>
import MyButton from '../UI/MyButton.vue';
import Todo from '@/components/Todo/Todo.vue';

export default {
    name: "to-do-list",
    components: { MyButton, Todo },
    data() {
        return {
            visible: false,
            todoList: [],
            windowVH: Number(window.innerHeight) - 1,
        };
    },
    methods: {
        updateHeight() {
            this.windowVH = window.innerHeight;
        },
        async setTodos() {
            try {
                this.todoList = await this.$api.getTodos()
            } catch (e) {
                console.log(e.massage);
            }
        },
        listener(event) {
            if (event.code === 'Escape') {
                this.$emit('close')
            }
        }
    },
    mounted() {
        this.setTodos(),
            addEventListener('keyup', this.listener);
    },
    created() {
        window.addEventListener('resize', this.updateHeight);
    },
    beforeUnmount() {
        removeEventListener('keyup', this.listener);
        removeEventListener('resize', this.updateHeight)
    }
}
</script>

<style scoped>
.todo_lsit {
    background-color: whitesmoke;
    max-width: 500px;
    width: 100%;
}
</style>