<template>
    <div class="service_block_container">
        <div class="sevices_block">
            <div class="tariff">
                <div class="text">Тариф:</div>
                <MySelect v-model:modelValue="tariff" :options="$store.state.tariffs"></MySelect>
            </div>
            <div class="sevices">
                <div class="d-flex flex-column">
                    <div class="text">Услуги:</div>
                    <div class="text">
                        ( {{ services_selected.length }} из {{ services.length }} )
                    </div>
                </div>
                <MyMultiSelect v-model:modelValue="services_selected" :options="services"></MyMultiSelect>
            </div>
        </div>
        <div class="results">
            <div class="text">
                Итоги:
            </div>
        </div>
    </div>
</template>

<script>
import MySelect from '@/components/UI/MySelect.vue';
import MyMultiSelect from '@/components/UI/MyMultiSelect.vue';
import { mapState } from 'vuex';

export default {
    name: "session-service",
    components: { MySelect, MyMultiSelect },
    data() {
        return {
            tariff: '',
            services_selected: [],
        };
    },
    computed: mapState(['services']),
    methods: {},
    mounted() {
        //придумать как считать итог (спросить уточнить у САШИ и как лучше сделать данный функционал)
    },
}
</script>

<style scoped>
.text {
    white-space:nowrap;
    font-size: 16px;
    margin: 0 10px 0 0;
}

.tariff {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px 10px;
}

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