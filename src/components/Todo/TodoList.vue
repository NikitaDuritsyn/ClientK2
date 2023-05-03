<template>
    <div class="todo_lsit">
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
            todoList: []
        };
    },
    methods: {
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
    beforeUnmount() {
        removeEventListener('keyup', this.listener);
    },
}
</script>

<style scoped>
.todo_lsit {
    height: 50vh;
    background-color: whitesmoke;
    max-width: 500px;
    width: 100%;
    border-bottom-left-radius: 1rem;
    border-bottom-right-radius: 1rem;
}
</style>