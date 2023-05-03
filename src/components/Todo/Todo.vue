<template>
    <div class="todo d-flex align-items-end justify-content-between">
        <div>
            <div class="title"><strong>{{ todo.title }}</strong></div>
            <div v-show="showDescription">{{ todo.description }}</div>
        </div>
        <div>
            <Switch v-model:model-value="done" :cls="'black'"/>
        </div>
    </div>
</template>

<script>
import Switch from '../UI/Switch.vue';

export default {
    name: "todo",
    props: ["todo"],
    emits: ['todoUpdated'],
    components: { Switch },
    data() {
        return {
            showDescription: !this.todo.done,
            done: this.todo.done
        };
    },
    methods: {
        async updateTodo() {
            try {
                const res = await this.$api.updateTodo({ ...this.todo, done: this.done })
                this.$toast.info(res.massage)
                this.$emit('todoUpdated')
            } catch (e) {
                this.$toast.info(e.massage)
            }
        }
    },
    watch: {
        'todo': {
            handler(value) {
                if (value.done === true) {
                    this.showDescription = false
                } else {
                    this.showDescription = true
                }
            },
            deep: true
        },
        done() {
            this.updateTodo()
        },
    }
}
</script>

<style scoped>
.todo {
    color: black;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.377);
    border-radius: 1rem;
    padding: 10px;
    margin: 10px;
}
</style>