<template>
    <div class="p-2 w-100 h-100 payment_container">
        <ResultsPayments :visitor-list="visitorList" :price-for-all="priceForAll"
            @visitor-updated="$emit('visitorUpdated')" />
        <hr class="m-2">
        <IntroductionPayments :visitor-list="visitorList" @visitor-updated="$emit('visitorUpdated')" />
    </div>
</template>

<script>
import ResultsPayments from '@/components/SessionPaymentConponents/ResultsPayments.vue';
import IntroductionPayments from '@/components/SessionPaymentConponents/IntroductionPayments.vue';

export default {
    name: "session-payment",
    emits: ['visitorUpdated'],
    props: ['visitorList', 'priceForAll'],
    components: { ResultsPayments, IntroductionPayments },
    data() {
        return {};
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