<template>
    <div class="service_block_container">

        <div class="sevices_block">
            <div class="d-flex align-items-center justify-content-between p-2">
                <div class="text">Тариф:</div>
                <div class="d-flex align-items-center justify-content-between w-100">
                    <div>
                        <MySelect v-model:modelValue="tariff" :options="$store.state.tariffs"></MySelect>
                    </div>
                    <MyButton :cls="'btn_second'" @click="updateVisitorTariff()">СМЕНИТЬ</MyButton>
                </div>
            </div>
            <div class="d-flex align-items-center justify-content-between p-2">
                <div class="text">Услуги:</div>
                <div class="d-flex align-items-center justify-content-between w-100">
                    <div>
                        <MySelect v-model:modelValue="service_selected" :options="services"></MySelect>
                    </div>
                    <div class="d-flex">
                        <!-- $refs.visitors_service_modal.open() -->
                        <MyButton class="m-1 mt-0 mb-0" :cls="'btn_second'"
                            @click="visitorsServicesShow = !visitorsServicesShow"
                            :disabled="(visitorList.length === 0) ? true : false">
                            ПОКАЗАТЬ ({{ visitorsServices.length }})
                        </MyButton>
                        <MyButton class="m-1 mt-0 mb-0" :cls="'btn_second'" @click="addVisitorService"
                            :disabled="(visitorList.length > 1 || visitorList.length === 0 || service_selected === null) ? true : false">
                            ДОБАВИТЬ
                        </MyButton>
                    </div>
                </div>
            </div>
            <VisitorsServicesModal v-if="visitorsServicesShow" @delete-visitor-service="setVisitorsServices(visitorsId)"
                :visitors-services="visitorsServices" @close="$refs.visitors_service_modal.close()"
                v-model:payment-results="paymentResults" />
        </div>
        <div class="results">
            <div class="text">
                Итоги: {{ paymentResults }}
                <!-- Тут {{  }} расчиттать сумму общую за время прошедшее и за услуги -->
            </div>
        </div>
        <!-- <MyModal :mode-flex-center="true" ref="visitors_service_modal"> -->

        <!-- </MyModal> -->
    </div>
</template>

<script>
import MySelect from '@/components/UI/MySelect.vue';
import MyMultiSelect from '@/components/UI/MyMultiSelect.vue';
import MyButton from '@/components/UI/MyButton.vue';
// import MyModal from '@/components/UI/MyModal.vue';
import VisitorsServicesModal from '@/components/AdminPanelComponents/chart/SessionModalComponents/VisitorsServicesModal.vue';
import { mapState } from 'vuex';

export default {
    name: "session-service",
    props: ['visitorList', 'sessionTariff'],
    emits: ['visitorsUpdated'],
    components: {
        MySelect, MyMultiSelect, MyButton,
        // MyModal, 
        VisitorsServicesModal
    },
    data() {
        return {
            visitorsServicesShow: false,
            tariff: null,
            service_selected: null,
            visitorsServices: [],
            visitorsId: []
        };
    },
    computed: {
        paymentResults() {
            const result = this.visitorsServices.reduce((acc, service) => acc + Number(service.price), 0)
            return result
        },
        ...mapState(['services'])
    },
    methods: {
        setTariff(firstVisitorTariff) {
            (firstVisitorTariff) ? this.tariff = firstVisitorTariff : 'Ошибка';
        },
        setDataByVisitorList(visitorList) {
            if (visitorList) {
                if (visitorList[0]) {
                    this.setTariff(visitorList[0].tariff_id)
                    this.visitorsId = visitorList.map((visitor) => { return visitor.id })
                    this.setVisitorsServices(this.visitorsId)
                } else {
                    this.tariff = null
                    this.visitorsId = []
                    this.visitorsServices = []
                }
            }
        },
        async addVisitorService() {
            await this.$api.createVisitorService({ visitor_id: this.visitorList[0].id, service_id: this.service_selected })
            await this.setVisitorsServices(this.visitorsId)
        },
        async setVisitorsServices(visitorsId) {
            this.visitorsServices = await this.$api.getVisitorsServices(visitorsId)
        },
        async updateVisitorTariff() {
            await this.$api.updateVisitors({ tariff_id: this.tariff }, this.visitorsId)
            this.$emit('visitorsUpdated')
        },
    },
    watch: {
        visitorList(value) {
            this.setDataByVisitorList(value)
        }
    },
    mounted() {
        this.setDataByVisitorList(this.visitorList)
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