<template>
    <div class="clients_list_container">
        <div class="clients_block">
            <div v-for="client in clients_lsit">
                <Client ref="client" :select_all="setSelectedAll" :client="client" @selected="setSelectedArr"
                    @selected-or="updateSelectedArr" />
            </div>
        </div>
        <div class="all_clients">
            <Switch @click="updateSelectedAll('click')" v-model:modelValue="select_all" />
            <div class="d-flex justify-content-between align-items-center w-100">
                <div class="selected_counter">
                    Все ( {{ selected_counter }} из {{ clients_lsit.length }} )
                </div>
                <MyButton :cls="'btn_second'">ДОБАВИТЬ</MyButton>
            </div>
        </div>
    </div>

</template>

<script>
import MyButton from '@/components/UI/MyButton.vue';
import Switch from '@/components/UI/Switch.vue';
import Client from './Client.vue';

export default {
    name: "session-clients-list",
    props: ["clients_lsit"],
    data() {
        return {
            // clientList: this.clients_lsit,
            selected_counter: this.clients_lsit.length,
            select_all: true,
            setSelected: []
        };
    },
    // watch: {
    //     "setSelected": {
    //         handler(value) {
    //             console.log(value);
    //             this.$emit('clients-selected', value)
    //         }
    //     }
    // },
    methods: {
        logMassage() {
            console.log('Окно добавления пользователя');
        },
        setSelectedArr(value) {
            this.setSelected.push(value)
        },
        updateSelectedArr(value) {
            for (let i = 0; i < this.setSelected.length; i++) {
                const element = this.setSelected[i];
                if (element.client.id === value.client_id) {
                    element.select_status = value.select_status
                }
            }
        },
        updateSelectedAll(_value) {
            if (_value === 'click') {
                if (this.select_all === false) {
                    for (let i = 0; i < this.setSelected.length; i++) {
                        const element = this.setSelected[i];
                        if (element.select_status === false) {
                            element.select_status = true
                        }
                    }
                } else {
                    for (let i = 0; i < this.setSelected.length; i++) {
                        const element = this.setSelected[i];
                        if (element.select_status === true) {
                            element.select_status = false
                        }
                    }
                }
                this.emmitSelectedClients(this.setSelected)
                return { selected_counter: this.selected_counter, select_all: this.select_all }
            } else {
                let count_selected = 0
                for (let i = 0; i < this.setSelected.length; i++) {
                    const element = this.setSelected[i];
                    if (element.select_status === true) {
                        count_selected = count_selected + 1;
                    }
                }
                this.selected_counter = count_selected
                if (count_selected === this.setSelected.length) {
                    this.select_all = true
                } else {
                    this.select_all = false
                }
                this.emmitSelectedClients(this.setSelected)
                return { selected_counter: this.selected_counter, select_all: this.select_all }
            }
        },
        emmitSelectedClients() {
            let selected_clients = []
            for (let i = 0; i < this.setSelected.length; i++) {
                const element = this.setSelected[i];
                if (element.select_status === true) {
                    selected_clients.push(element.client)
                }
            }
            this.$emit('clients-selected', selected_clients)
        }
    },
    computed: {
        setSelectedAll() {
            return this.updateSelectedAll()
        }
    },
    mounted() {
    },
    components: { Switch, Client, MyButton }
}
</script>

<style scoped>
.all_clients {
    display: flex;
    font-size: 16px;
    align-items: center;
    padding: 5px 10px;
    border-top: 1px solid rgb(0, 255, 255);
}

.selected_counter {
    margin: 0 10px;
}

/* .add_new_btn {
    border: 1px solid rgb(0, 255, 238);
    padding: 5px;
    font-size: 14px;
    cursor: pointer;
    border-radius: 5px;
} */

.clients_list_container {
    display: flex;
    flex-direction: column;
    border: 1px solid whitesmoke;
    height: 100%;
    width: 100%;
    border-radius: 5px;
}

.clients_block {
    overflow: scroll;
    height: 100%;
    width: 100%;
    -ms-overflow-style: none;
    scrollbar-width: none;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.clients_block::-webkit-scrollbar {
    height: 0px;
    display: none;
}
</style>