<template>
    <div>
        <div class="d-flex align-items-center">
            <div><strong>Депонент:</strong></div>
            <div class="d-flex m-2 flex-wrap w-100 justify-content-between">
                <div class="p-1 text_block">{{ deponentsSum }}</div>
                <MyButton :cls="'btn_second'" @click="addDeponentInDeposite">
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
            <div class="d-flex align-items-center justify-content-end">
                <div class="text-nowrap"><strong>Сдача:</strong></div>
                <div class="p-1 m-2 text_block h-fit-content">{{ (priceForAll - depositsSum < 0) ? priceForAll - depositsSum
                    : 0 }} </div>
                        <div class="text-nowrap">
                            <MyButton :cls="'btn_second'" @click="moneyToVisitor">
                                Выдать
                            </MyButton>
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
    props: ["visitorList", 'priceForAll', 'payer'],
    data() {
        return {
            depositsSum: 0,
            deponentsSum: 0,
            depositsByTypesSum: [],
            visitor: null,
            visitorsDeposits: null,
            visitorsDeponents: null,
        };
    },
    methods: {
        async addDeponentInDeposite() {
            await this.$api.useDeponents(this.visitorsDeponents)
            this.$emit('visitorUpdated')
        },
        async moneyToVisitor() {
            try {
                const paymentTypeId = this.$store.state.paymentTypes.filter(item => item.type === 'cash')[0].id
                const change = (this.priceForAll - this.depositsSum < 0) ? this.priceForAll - this.depositsSum : 0
                await this.$api.createVisitorDeposits([{
                    visitor_id: this.payer.id,
                    payment_type_id: paymentTypeId,
                    client_id: this.payer.client_id,
                    value: change
                }])
                this.$emit('visitorUpdated')
                this.$toast.info(`Посетителю ${this.payer.name}, выдано ${change * (-1)}₽`)
            } catch (e) {
                this.$toast.error(`${e.massage}`)
            }
        },
        async setVisitorsDepositDeponent(visitorList) {
            if (visitorList.length > 0) {
                // const visitorsDeposits = await this.$api.getVisitorsDeposit(visitorList.map((visitor) => { return visitor.id }))
                // const visitorsDeponents = await this.$api.getVisitorsDeponent(this.visitorList.map((visitor) => { return visitor.id }))
                this.visitorsDeposits = await this.$api.getVisitorsDeposit(visitorList.map((visitor) => { return visitor.id }))
                this.visitorsDeponents = await this.$api.getVisitorsDeponent(this.visitorList.map((visitor) => { return visitor.id }))

                this.depositsSum = this.visitorsDeposits.reduce((acc, deposit) => acc + deposit.value, 0)
                this.deponentsSum = this.visitorsDeponents
                    .filter(deponent => deponent.status === 'active')
                    .reduce((acc, deponent) => acc + deponent.value, 0)
                this.depositsByTypesSum = []
                for (let i = 0; i < this.$store.state.paymentTypes.length; i++) {
                    const paymentType = this.$store.state.paymentTypes[i]
                    this.depositsByTypesSum.push({
                        title: paymentType.title,
                        depositValue: this.visitorsDeposits
                            .filter(deposit => deposit.payment_type_id === paymentType.id && deposit.value > 0)
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
                    this.visitor = value[0]
                } else {
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