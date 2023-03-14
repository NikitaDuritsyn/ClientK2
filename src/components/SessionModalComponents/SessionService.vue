<template>
    <div class="service_block_container">
        <div class="sevices_block">
            <div class="d-flex align-items-center justify-content-between p-2">
                <div class="text">Тариф:</div>
                <div class="d-flex align-items-center justify-content-between w-100">
                    <div>
                        <MySelect v-model:modelValue="tariff" :options="$store.state.tariffs"></MySelect>
                    </div>
                    <MyButton :cls="'btn_second'" @click="setTariff(false)">СМЕНИТЬ</MyButton>
                </div>
            </div>
            <div class="d-flex align-items-center justify-content-between p-2">
                <div class="text">Услуги:</div>
                <div class="d-flex align-items-center justify-content-between w-100">
                    <div>
                        <MySelect v-model:modelValue="service_selected" :options="services"></MySelect>
                    </div>
                    <div class="d-flex">
                        <MyButton class="m-1 mt-0 mb-0" :cls="'btn_second'" @click="$refs.visitors_service_modal.open()"
                            :disabled="(visitorList.length === 0) ? true : false">
                            ПОКАЗАТЬ ({{ visitorServices.length }})
                        </MyButton>
                        <MyButton class="m-1 mt-0 mb-0" :cls="'btn_second'" @click="addVisitorService"
                            :disabled="(visitorList.length > 1 || visitorList.length === 0 || service_selected === null) ? true : false">
                            ДОБАВИТЬ
                        </MyButton>
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
        <MyModal :mode-flex-center="true" ref="visitors_service_modal">
            <visitorServicesModal :visitors-services="visitorServices" @close="$refs.visitors_service_modal.close()" />
        </MyModal>
    </div>
</template>

<script lang="js">
import MySelect from '@/components/UI/MySelect.vue';
import MyMultiSelect from '@/components/UI/MyMultiSelect.vue';
import MyButton from '@/components/UI/MyButton.vue';
import MyModal from '@/components/UI/MyModal.vue';
import visitorServicesModal from '@/components/AdminPanelComponents/chart/SessionModalComponents/VisitorsServicesModal.vue';
import { mapState } from 'vuex';

export default {
    name: "session-service", // VisitorServices
    props: ['visitorList', 'sessionTariff'],
    components: { MySelect, MyMultiSelect, MyButton, MyModal, visitorServicesModal },
    data() {
        return {
            tariff: null,
            service_selected: null,
            visitorServices: [],
        };
    },
    computed: mapState(['services']),
    methods: {
        setTariff(firstVisitorTariff) {
            (firstVisitorTariff) ? this.tariff = firstVisitorTariff : 'Ошибка';
        },

        async addVisitorService() {
            await this.$api.createVisitorService({ visitor_id: this.visitorList[0].id, service_id: this.service_selected })
            await this.setVisitorsServices(this.visitorList.map((visitor) => { return visitor.id }))
        },

        async setVisitorsServices(visitorsId) {
            this.visitorServices = await this.$api.getVisitorsServices(visitorsId)
        }
    },
    watch: {
        visitorList(value) {
            if (value) {
                if (value[0]) {
                    this.setTariff(value[0].tariff_id)
                    this.setVisitorsServices(value.map((visitor) => { return visitor.id }))
                } else {
                    this.tariff = null
                    this.visitorServices = []
                }
            }
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