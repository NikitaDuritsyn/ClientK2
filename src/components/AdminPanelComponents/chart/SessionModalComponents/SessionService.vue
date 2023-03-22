<template>
    <div class="service_block_container">

        <div class="sevices_block">
            <div class="d-flex align-items-center justify-content-between p-2">
                <div class="text">Тариф:</div>
                <div class="d-flex align-items-center justify-content-between w-100">
                    <div>
                        <MySelect v-model:modelValue="tariff" :options="$store.state.tariffs"></MySelect>
                    </div>
                    <MyButton :cls="'btn_second'" @click="updateVisitorTariff()" :disabled="tariffDisabled">СМЕНИТЬ
                    </MyButton>
                </div>
            </div>
            <div class="d-flex align-items-center justify-content-between p-2">
                <div class="text">Услуги:</div>
                <div class="d-flex align-items-center justify-content-between w-100">
                    <div>
                        <MySelect v-model:modelValue="service_selected" :options="services"></MySelect>
                    </div>
                    <div class="d-flex">
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
            <VisitorsServices class="ps-2 pe-2" :visitors-services-show="visitorsServicesShow"
                @delete-visitor-service="setVisitorsServices(visitorsId)" :visitors-services="visitorsServices"
                @close="$refs.visitors_service_modal.close()" v-model:payment-results="paymentByServices" />
        </div>
        <div class="results">
            <div class="text">
                <strong>
                    Итоги: {{ paymentByServices + paymentByTariffs }} ₽
                </strong>

                <!-- Тут {{  }} расчиттать сумму общую за время прошедшее и за услуги -->
            </div>
        </div>
    </div>
</template>

<script>
import MySelect from '@/components/UI/MySelect.vue';
import MyMultiSelect from '@/components/UI/MyMultiSelect.vue';
import MyButton from '@/components/UI/MyButton.vue';
import VisitorsServices from '@/components/AdminPanelComponents/chart/SessionModalComponents/VisitorsServices.vue';
import { mapState } from 'vuex';

export default {
    name: "session-service",
    props: ['visitorList', 'sessionTariff'],
    emits: ['visitorsUpdated'],
    components: {
        MySelect, MyMultiSelect, MyButton,
        VisitorsServices
    },
    data() {
        return {
            visitorsServicesShow: false,
            tariff: null,
            service_selected: null,
            visitorsServices: [],
            visitorsId: [],
            paymentByTariffs: 0,
            paymentByServices: 0,
            tariffDisabled: false,
        };
    },
    computed: { ...mapState(['services', 'tariffs']) },
    methods: {
        setTariff(firstVisitorTariff) {
            (firstVisitorTariff) ? this.tariff = firstVisitorTariff : 'Ошибка';
        },
        setDataByVisitorList(visitorList) {

            if (visitorList.find((visitor) => { return (visitor.start_time_visitor) ? true : false; })) {
                this.tariffDisabled = true
            } else {
                this.tariffDisabled = false
            }
            
            // console.log((startTimeVisitorIndicate) ? true : false);

            if (visitorList.length > 0) {
                this.visitorsId = visitorList.map((visitor) => { return visitor.id })
                this.setVisitorsServices(this.visitorsId)
                if (visitorList.length === 1) {
                    this.setTariff(visitorList[0].tariff_id)
                } else if (visitorList.length > 1) {
                    this.tariff = null
                    this.setTariff(this.sessionTariff)
                }
            } else {
                this.tariff = null
                this.visitorsId = []
                this.visitorsServices = []
                this.paymentByServices = 0
            }
        },
        setTimePayment(visitorList, tariffs) { // Можно вынести за пределы Компонента (GlobalFunction)
            let timeSum = null
            let tariffPayments = null
            // Tariff_points:{ title:"По минутам" | metric:"TimeBased"/"Fixed" | duration:null | cost:3 } 
            for (let i = 0; i < visitorList.length; i++) {
                const visitor = visitorList[i]
                if (visitor.start_time_visitor && visitor.end_time_visitor) {
                    const visitorTariff = tariffs.filter((item) => { return (item.id === visitor.tariff_id) ? true : false; })[0]

                    const deifferenceVisitorTime = Math.ceil((new Date(visitor.end_time_visitor).getTime() - new Date(visitor.start_time_visitor).getTime()) / 60000)

                    timeSum = timeSum + deifferenceVisitorTime;
                    // console.log(deifferenceVisitorTime);
                    if (visitorTariff.metric == 'TimeBased') {
                        const visitorTariffPayment = deifferenceVisitorTime * visitorTariff.cost;
                        tariffPayments = tariffPayments + visitorTariffPayment;
                        // console.log('visitorTariffPayment', visitorTariffPayment);
                    } else if (visitorTariff.metric == 'Fixed') {
                        const visitorTariffPayment = visitorTariff.cost
                        tariffPayments = tariffPayments + visitorTariffPayment;
                        // console.log('visitorTariffPayment', visitorTariffPayment);
                    }
                }
            }
            // console.log('Сумарное время', timeSum)
            // console.log('Сука БАБКИ: ', tariffPayments, '₽')
            // return tariffPayments
            this.paymentByTariffs = tariffPayments
        },
        async addVisitorService() {
            await this.$api.createVisitorService({ visitor_id: this.visitorList[0].id, service_id: this.service_selected })
            await this.setVisitorsServices(this.visitorsId)
        },
        async setVisitorsServices(visitorsId) {
            this.visitorsServices = await this.$api.getVisitorsServices(visitorsId)
            this.paymentByServices = this.visitorsServices.reduce((acc, service) => acc + Number(service.price), 0)

        },
        async updateVisitorTariff() {
            await this.$api.updateVisitors({ tariff_id: this.tariff }, this.visitorsId)
            this.$emit('visitorsUpdated')
        },
    },
    watch: {
        visitorList(value) {
            this.setDataByVisitorList(value)
            this.setTimePayment(value, this.tariffs)
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
    margin: 5px 0px;
}
</style>