<template>
    <div>
        <div class="d-flex justify-content-between">
            <div><strong>Внесение:</strong></div>
            <div class="d-flex">
                <MyButton :cls="'btn_second'" @click="addDepositByVisitor" :disabled="addDepositDisabled">Внести</MyButton>
            </div>
        </div>

        <div v-for="paymentType in dataCreationDeposits" :key="paymentType.id"
            class="d-flex mt-2 align-items-center justify-content-between w-100">
            <div class="text-nowrap"><strong>{{ paymentType.title }}:</strong></div>
            <div class="d-flex flex-wrap justify-content-between">
                <MyInput class="p-0" :type="'number'" :min="0" v-model:model-value="paymentType.deposit_value" />
            </div>
        </div>
    </div>
</template>

<script>
import MyButton from '@/components/UI/MyButton.vue';
import MyInput from '@/components/UI/MyInput.vue';

export default {
    name: "introduction-payments",
    components: { MyInput, MyButton },
    emits: ["visitorUpdated"],
    props: ["visitorList"],
    data() {
        return {
            addDepositDisabled: true,
            dataCreationDeposits: [],
            visitor: null
        };
    },
    methods: {
        setDataCreationDeposits() {
            this.dataCreationDeposits = this.$store.state.paymentTypes.map(item => {
                return {
                    title: item.title,
                    payment_type_id: item.id,
                    deposit_value: null
                }
            })
        },
        async addDepositByVisitor() {
            const visitorDeposits = this.dataCreationDeposits.filter(item => (item.deposit_value && item.deposit_value > 0) ? true : false)
            if (visitorDeposits.length > 0) {
                await this.$api.createVisitorDeposits({ visitor: this.visitor, visitorDeposits: visitorDeposits })
                this.$emit('visitorUpdated')
            }
        }
    },
    watch: {
        visitorList(value) {
            if (value.length === 1) {
                this.visitor = value[0]
                this.addDepositDisabled = false
            } else {
                this.visitorId = null
                this.addDepositDisabled = true
            }
            this.setDataCreationDeposits()
        }
    },
    mounted() {
        this.setDataCreationDeposits()
    },
}
</script>

<style scoped></style>