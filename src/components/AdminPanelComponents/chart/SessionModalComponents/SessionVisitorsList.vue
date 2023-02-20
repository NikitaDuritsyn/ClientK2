<template>
    <div class="visitors_list_container">
        <div class="visitors_block">
            <div v-for="visitor in visitors_lsit">
                <Visitor ref="visitor" :select_all="setSelectedAll" :visitor="visitor" @selected="setSelectedArr"
                    @selected-or="updateSelectedArr" />
            </div>
        </div>
        <div class="select_menu">
            <div class="d-flex justify-content-between align-items-center w-100">
                <div v-if="mode != 'createBooking'" class="d-flex align-items-center">
                    <Switch @click="updateSelectedAll('click')" v-model:modelValue="select_all" />
                    <div class="select_counter">
                        Все ( {{ selected_counter }} из {{ visitors_lsit.length }} )
                    </div>
                </div>
                <MyButton :cls="'btn_second'" @click="$refs.create_visitor.open()">ДОБАВИТЬ</MyButton>
            </div>
        </div>

        <MyModal :mode-flex-center="true" ref="create_visitor">
            <CreateVisitor @visitor-created="updateVisitorList" :session-id="sessionId" :mode="mode" @close="$refs.create_visitor.close()" />
        </MyModal>
</div>
</template>

<script>
import MyButton from '@/components/UI/MyButton.vue';
import MyModal from '@/components/UI/MyModal.vue';
import Switch from '@/components/UI/Switch.vue';
import CreateVisitor from './CreateVisitor.vue';
import Visitor from './Visitor.vue';

export default {
    name: "session-visitors-list",
    props: ["visitors_lsit", 'mode', 'sessionId'],
    components: { Switch, Visitor, MyButton, MyModal, CreateVisitor },
    data() {
        return {
            selected_counter: this.visitors_lsit.length,
            select_all: true,
            setSelected: []
        };
    },
    methods: {
        updateVisitorList(visitor){
            console.log(visitor);
            this.$emit('updateVisitorList')
        },
        logMassage() {
            console.log('Окно добавления пользователя');
        },
        setSelectedArr(value) {
            this.setSelected.push(value)
        },
        updateSelectedArr(value) {
            for (let i = 0; i < this.setSelected.length; i++) {
                const element = this.setSelected[i];
                if (element.visitor.id === value.visitor_id) {
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
                this.emmitSelectedVisitors(this.setSelected)
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
                this.emmitSelectedVisitors(this.setSelected)
                return { selected_counter: this.selected_counter, select_all: this.select_all }
            }
        },
        emmitSelectedVisitors() {
            let selected_visitors = []
            for (let i = 0; i < this.setSelected.length; i++) {
                const element = this.setSelected[i];
                if (element.select_status === true) {
                    selected_visitors.push(element.visitor)
                }
            }
            this.$emit('visitors-selected', selected_visitors)
        }
    },
    computed: {
        setSelectedAll() {
            return this.updateSelectedAll()
        }
    },
    mounted() {
    },
}
</script>

<style scoped>
.select_counter {
    margin: 0 10px;
}

.select_menu {
    display: flex;
    font-size: 16px;
    align-items: center;
    padding: 5px 10px;
    border-top: 1px solid rgb(0, 255, 255);
}

.visitors_list_container {
    display: flex;
    flex-direction: column;
    border: 1px solid whitesmoke;
    height: 100%;
    width: 100%;
    border-radius: 5px;
}

.visitors_block {
    overflow: scroll;
    height: 100%;
    width: 100%;
    -ms-overflow-style: none;
    scrollbar-width: none;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}

.visitors_block::-webkit-scrollbar {
    height: 0px;
    display: none;
}
</style>