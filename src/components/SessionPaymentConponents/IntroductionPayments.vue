<template>
    <div>
        <div>
            <div><strong>Внесение:</strong></div>
            <div class="d-flex align-items-end justify-content-between">
                <div>
                    <MySelect :label="'Плательщик'" v-model:model-value="payerId" v-model:options="setPotentialPayer" />
                </div>
                <div>
                    <MyButton :cls="'btn_second'" @click="addDepositByVisitor">Внести</MyButton>
                </div>
            </div>
        </div>
        <div v-for="paymentType in dataCreationDeposits" :key="paymentType.id"
            class="d-flex mt-2 align-items-center justify-content-between w-100">
            <div class="text-nowrap"><strong>{{ paymentType.title }}:</strong></div>
            <div class="d-flex flex-wrap justify-content-between">
                <MyInput class="p-0" :type="'number'" :min="0" v-model:model-value="paymentType.value" />
            </div>
        </div>
    </div>
</template>

<script>
import MyButton from '@/components/UI/MyButton.vue';
import MyInput from '@/components/UI/MyInput.vue';
import MySelect from '../UI/MySelect.vue';

export default {
    name: "introduction-payments",
    components: { MyInput, MyButton, MySelect },
    emits: ["visitorUpdated", 'setPayer'],
    props: ["visitorList"],
    data() {
        return {
            dataCreationDeposits: [],
            payerId: null,
            payer: null
        };
    },
    computed: {
        setPotentialPayer() {
            const potentialPayer = this.visitorList.map(item => { return { id: item.id, title: item.name } })
            return potentialPayer
        }
    },
    methods: {
        setDataCreationDeposits() {
            this.dataCreationDeposits = this.$store.state.paymentTypes.map(item => {
                return {
                    title: item.title,
                    payment_type_id: item.id,
                    value: null
                }
            })
        },
        async addDepositByVisitor() {
            try {
                const visitorDeposits = this.dataCreationDeposits.filter(item => (item.value && item.value > 0) ? true : false)
                const payer = this.visitorList.find(item => item.id === this.payerId)
                const visitors = this.visitorList.map(item => { return { id: item.id, client_id: item.client_id } }).filter(item => item.id !== this.payerId)
                await this.$api.createVisitorsDeposits({
                    payer: payer,
                    visitors: visitors,
                    deposits: visitorDeposits,
                })
                this.$emit('visitorUpdated')
                this.$toast.info(`${visitorDeposits.reduce((acc, item) => acc + item.value, 0) + '₽'} внесено посетителю ${payer.name}`)

            } catch (e) {
                this.$toast.error(`${e.massage}`)
            }
        }
    },
    watch: {
        visitorList: {
            handler(value) {
                this.setDataCreationDeposits();
                this.payerId = (value[0]?.id) ? value[0].id : null
            },
            deep: true
        },
        payerId: {
            handler(value) {
                this.payer = this.visitorList.find(item => item.id === value)
                this.$emit('setPayer', this.payer)
            },
            deep: true
        }
    },
    mounted() {
        this.setDataCreationDeposits()
    },
}
</script>