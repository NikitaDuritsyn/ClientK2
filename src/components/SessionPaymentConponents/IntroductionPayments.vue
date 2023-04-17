<template>
    <div>

        <div>
            <div><strong>Внесение:</strong></div>
            <div class="d-flex align-items-end justify-content-between">
                <div>
                    <MySelect :label="'Плательщик'" :model-value="visitorList[0]?.id" v-model:options="setPotentialPayer" />
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
    emits: ["visitorUpdated"],
    props: ["visitorList"],
    data() {
        return {
            dataCreationDeposits: [],
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
            const visitorDeposits = this.dataCreationDeposits.filter(item => (item.value && item.value > 0) ? true : false)
            await this.$api.createVisitorsDeposits({ visitors: this.visitorList.map(item => { return { id: item.id, client_id: item.client_id } }), deposits: visitorDeposits })
            this.$emit('visitorUpdated')
        }
    },
    watch: {
        visitorList() {
            this.setDataCreationDeposits()
        }
    },
    mounted() {
        this.setDataCreationDeposits()
    },
}
</script>