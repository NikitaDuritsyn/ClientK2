<template>
    <div class="p-2 w-100 h-100 payment_container">
        <div class="row justify-content-between">
            <div class="col-md-3"><strong>Депонент:</strong></div>
            <div class="col-md-9">
                <div class="d-flex">
                    <div class="p-1 text_block">{{ visitorsDeponent }}</div>
                </div>
            </div>
        </div>
        <div class="row mt-2 justify-content-between">
            <div class="col-md-3"><strong>Депозит:</strong></div>
            <div class="col-md-9">
                <div class="d-flex align-items-center">
                    <div class="p-1 me-1 text_block">{{ visitorsDeposit }}</div>
                    =
                    <div class="p-1 m-1 text_block">НАЛИЧКА</div>
                    +
                    <div class="p-1 m-1 text_block">ПЕРЕВОД</div>
                    +
                    <div class="p-1 m-1 text_block">ТЕРМИНАЛ</div>
                </div>
            </div>
        </div>
        <div class="row mt-2 justify-content-between">
            <div class="col-md-3"><strong>К оплате:</strong></div>
            <div class="col-md-9">
                <div class="d-flex align-items-center">
                    <div class="p-1 me-1 text_block">{{ toPay }}</div>
                    =
                    <div class="p-1 m-1 text_block">{{ paymentSumm }}</div>
                    -
                    <div class="p-1 m-1 text_block">{{ visitorsDeposit }}</div>
                </div>
            </div>
        </div>


    </div>
</template>

<script>
import MyInput from '@/components/UI/MyInput.vue';

export default {
    name: "session-payment",
    props: ['visitorList'],
    components: { MyInput },
    data() {
        return {
            visitorsDeposit: 0,
            visitorsDeponent: 0,
            toPay: 0,
            paymentSumm: 0,
        };
    },
    methods: {
        setVisitorsDepositDeponent(visitorList) {
            this.visitorsDeponent = visitorList.reduce((acc, visitor) => acc + Number(visitor.deponent_value), 0)
            this.visitorsDeposit = visitorList.reduce((acc, visitor) => acc + Number(visitor.deposit_value), 0)
        }
    },
    watch: {
        visitorList(value) {
            if (value.length > 0) {
                this.setVisitorsDepositDeponent(value)
            }
        }
    },
    mounted() {
        this.setVisitorsDepositDeponent(this.visitorList)
    },
}
</script>

<style scoped>
.payment_container {
    border: 1px solid white;
    border-radius: 5px;
    margin-top: 5px;
    max-height: 500px;
}
</style>