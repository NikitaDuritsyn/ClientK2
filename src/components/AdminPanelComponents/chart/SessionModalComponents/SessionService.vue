<template>
    <div class="service_block_container">
        <div class="sevices_block">
            <div class="d-flex align-items-center justify-content-between p-2">
                <div class="text">Тариф:</div>
                <div class="d-flex align-items-center justify-content-between w-100">
                    <div>
                        <MySelect v-model:modelValue="tariff" :options="$store.state.tariffs"></MySelect>
                    </div>
                    <MyButton :cls="'btn_second'" @click="setTariff">СМЕНИТЬ</MyButton>
                </div>
            </div>
            <div class="d-flex align-items-center justify-content-between p-2">
                <div class="text">Услуги:</div>
                <div class="d-flex align-items-center justify-content-between w-100">
                    <div>
                        <MySelect v-model:modelValue="service_selected" :options="services"></MySelect>
                    </div>
                    <div class="d-flex">
                        <MyButton class="m-1 mt-0 mb-0" :cls="'btn_second'" @click="">ПОКАЗАТЬ ({{ visitorServices.length
                        }})
                        </MyButton>
                        <MyButton class="m-1 mt-0 mb-0" :cls="'btn_second'" @click="addVisitorService">ДОБАВИТЬ</MyButton>
                    </div>
                </div>
            </div>
        </div>
        <div class="results">
            <div class="text">
                Итоги:
                <!-- Тут {{  }} расчиттать сумму общую за время прошедшее и за услуги -->
            </div>
        </div>
    </div>
</template>

<script>
import MySelect from '@/components/UI/MySelect.vue';
import MyMultiSelect from '@/components/UI/MyMultiSelect.vue';
import { mapState } from 'vuex';
import MyButton from '@/components/UI/MyButton.vue';

export default {
    name: "session-service", // VisitorServices
    components: { MySelect, MyMultiSelect, MyButton },
    data() {
        return {
            tariff: '',
            service_selected: null,
            visitorServices: [],
        };
    },
    computed: mapState(['services']),
    methods: {
        setTariff() {
            console.log(this.tariff);
        },
        addVisitorService() {
            console.log(this.service_selected);
            //Запрос на добавление услуги посетителю
        },
        getVisitorServices() {
            //Запрос на получение всех услуг посетителя
        }
    },
    mounted() {
        //придумать как считать итог (спросить уточнить у САШИ и как лучше сделать данный функционал)
    },
}
</script>

<style scoped>
.text {
    white-space: nowrap;
    font-size: 16px;
    margin: 0 10px 0 0;
}

/* .tariff {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px 10px;
} */

.sevices {
    display: flex;
    padding: 5px 10px;
}

.sevices_block {
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    overflow: scroll;
    height: 100%;
    -ms-overflow-style: none;
    scrollbar-width: none;
}

.sevices_block::-webkit-scrollbar {
    height: 0px;
    display: none;
}

.results {
    border-top: 1px solid rgb(0, 255, 255);
    padding: 5px 10px;
}

.service_block_container {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    border: 1px solid white;
    border-radius: 5px;
}
</style>