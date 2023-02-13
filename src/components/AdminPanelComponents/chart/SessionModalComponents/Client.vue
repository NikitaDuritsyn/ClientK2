<template>
    <div class="client_container">
        <Switch v-model:modelValue="status_switch" />
        <div class="client">
            <div>
                {{ client.name }}
            </div>
            <div>
                {{ client.number_phone }}
            </div>
        </div>
    </div>

</template>

<script>
import Switch from '@/components/UI/Switch.vue';

export default {
    name: "client-vue",
    props: ["client", 'select_all'],
    data() {
        return {
            status_switch: true
        };
    },
    watch: {
        "select_all": {
            handler(value) {
                if (value.select_all === true) {
                    this.status_switch = true
                } else if (value.select_all === false && value.selected_counter === 0) {
                    this.status_switch = false
                }
            }
        },
        "status_switch": {
            handler(value) {
                this.$emit('selectedOr', { select_status: value, client_id: this.client.id })
            }
        }
    },
    methods: {},
    mounted() {
        this.$emit('selected', { select_status: this.status_switch, client: this.client })
    },
    components: { Switch }
}
</script>

<style scoped>
.client_container {
    display: flex;
    padding: 5px 10px;
}

.client {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
    font-size: 16px;
}

.timeLine_container {
    height: 100%;
    width: 100%;
    border: 1px solid white;
}
</style>