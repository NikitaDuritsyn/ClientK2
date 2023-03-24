<template>
    <div>
        <div class="d-flex align-items-center">
            <div><strong>Депонент:</strong></div>
            <div class="d-flex m-2 flex-wrap w-100 justify-content-between">
                <div class="p-1 text_block">{{ deponentsSum }}</div>
                <MyButton :cls="'btn_second'" @click="addDeponentInDeposite" :disabled="addDeponentInDisabled">
                    Использовать
                </MyButton>
            </div>
        </div>
        <div class="d-flex align-items-end">
            <div class="mb-2"><strong>Депозит:</strong></div>
            <div class="d-flex m-2 align-items-end">
                <div class="p-1 me-1 text_block h-fit-content">{{ depositsSum }}</div>=
                <div class="d-flex w-100 flex-wrap">
                    <div v-for="deposit in depositsByTypesSum" :key="deposit.title"
                        class="d-flex align-items-end me-1 ms-1 ">
                        <div>+</div>
                        <div>
                            <div>{{ deposit.title }}</div>
                            <div class="me-1 ms-1 p-1 text_block">{{ deposit.depositValue }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="d-flex align-items-center">
            <div class="text-nowrap"><strong>К оплате:</strong></div>
            <div class="d-flex m-2 align-items-center">
                <div class="p-1 me-1 text_block h-fit-content">{{ priceForAll - depositsSum }}</div>
                =
                <div class="d-flex w-100 flex-wrap">
                    <div class="p-1 me-1 ms-1 text_block">{{ priceForAll }}</div>
                    -
                    <div class="p-1 me-1 ms-1 text_block">{{ depositsSum }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import MyButton from '../UI/MyButton.vue'

export default {
    name: "results-paymetnts",
    emits: ['visitorUpdated'],
    props: ["visitorList", 'priceForAll'],
    data() {
        return {
            depositsSum: 0,
            deponentsSum: 0,
            depositsByTypesSum: [],
            addDeponentInDisabled: true
        };
    },
    methods: {
        addDeponentInDeposite() {
            // запрос на добавление депонента к депозиту по id пользователей или одногоо пользователя (нужно будет уточнить)
            this.$emit('visitorUpdated')
        },
        async setVisitorsDepositDeponent(visitorList) {
            if (visitorList.length > 0) {
                const visitorsDeposits = await this.$api.getVisitorsDeposit(visitorList.map((visitor) => { return visitor.id }))
                const visitorsDeponents = await this.$api.getVisitorsDeponent(this.visitorList.map((visitor) => { return visitor.id }))
                this.depositsSum = visitorsDeposits.reduce((acc, deposit) => acc + deposit.deposit_value, 0)
                this.deponentsSum = visitorsDeponents.reduce((acc, deponent) => acc + deponent.deponent_value, 0)
                this.depositsByTypesSum = []
                for (let i = 0; i < this.$store.state.paymentTypes.length; i++) {
                    const paymentType = this.$store.state.paymentTypes[i]
                    this.depositsByTypesSum.push({
                        title: paymentType.type,
                        depositValue: visitorsDeposits
                            .filter(deposit => deposit.payment_type_id === paymentType.id)
                            .reduce((acc, deposit) => acc + deposit.deposit_value, 0)
                    })
                }
            } else {
                this.depositsSum = 0
                this.deponentsSum = 0
                this.depositsByTypesSum = []
            }
        }
    },
    watch: {
        visitorList(value) {
            this.setVisitorsDepositDeponent(value);
            if (value.length === 1) {
                this.addDeponentInDisabled = false
            } else {
                this.addDeponentInDisabled = true
            }
        }
    },
    mounted() { this.setVisitorsDepositDeponent(this.visitorList); },
    components: { MyButton }
}
</script>
<style scoped></style>