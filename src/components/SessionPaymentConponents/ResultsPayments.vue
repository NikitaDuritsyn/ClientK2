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
                    <div v-for="deposit in depositsByTypesSum" :key="deposit.title" class="d-flex align-items-end">
                        <div class="me-2 ms-2">+</div>
                        <div class="d-flex flex-column align-items-center">
                            <div>{{ deposit.title }}</div>
                            <div class="p-1 w-100 text_block">{{ deposit.depositValue }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="d-flex justify-content-between">
            <div class="d-flex align-items-center">
                <div class="text-nowrap"><strong>К оплате:</strong></div>
                <div class="d-flex m-2 align-items-center">
                    <div class="p-1 me-1 text_block h-fit-content">
                        {{ (priceForAll - depositsSum > 0 || priceForAll - depositsSum === 0) ? priceForAll - depositsSum :
                            0
                        }}
                    </div>
                    =
                    <div class="d-flex w-100 flex-wrap">
                        <div class="p-1 me-1 ms-1 text_block">{{ priceForAll }}</div>
                        -
                        <div class="p-1 me-1 ms-1 text_block">{{ depositsSum }}</div>
                    </div>
                </div>

            </div>
            <div class="d-flex align-items-center">
                <div class="text-nowrap"><strong>Сдача:</strong></div>
                <div class="p-1 m-2 text_block h-fit-content">
                    {{ (priceForAll - depositsSum < 0) ? priceForAll - depositsSum : 0 }} </div>
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
            addDeponentInDisabled: true,
            visitor: null
        };
    },
    methods: {
        async addDeponentInDeposite() {
            if (this.visitorList.length === 1 && this.deponentsSum > 0) {
                await this.$api.useDeponent({ visitor: this.visitor, value: this.deponentsSum })
                this.$emit('visitorUpdated')
            }
        },
        async setVisitorsDepositDeponent(visitorList) {
            if (visitorList.length > 0) {
                const visitorsDeposits = await this.$api.getVisitorsDeposit(visitorList.map((visitor) => { return visitor.id }))
                const visitorsDeponents = await this.$api.getVisitorsDeponent(this.visitorList.map((visitor) => { return visitor.id }))

                this.depositsSum = visitorsDeposits.reduce((acc, deposit) => acc + deposit.value, 0)
                this.deponentsSum = visitorsDeponents
                    .filter(deponent => deponent.status === 'active')
                    .reduce((acc, deponent) => acc + deponent.value, 0)
                this.depositsByTypesSum = []
                for (let i = 0; i < this.$store.state.paymentTypes.length; i++) {
                    const paymentType = this.$store.state.paymentTypes[i]
                    this.depositsByTypesSum.push({
                        title: paymentType.title,
                        depositValue: visitorsDeposits
                            .filter(deposit => deposit.payment_type_id === paymentType.id)
                            .reduce((acc, deposit) => acc + deposit.value, 0)
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
        visitorList: {
            handler(value) {
                this.setVisitorsDepositDeponent(value);
                if (value.length === 1) {
                    this.addDeponentInDisabled = false
                    this.visitor = value[0]
                } else {
                    this.addDeponentInDisabled = true
                    this.visitor = null
                }
            },
            deep: true
        },
    },
    mounted() { this.setVisitorsDepositDeponent(this.visitorList); },
    components: { MyButton }
}
</script>
<style scoped></style>