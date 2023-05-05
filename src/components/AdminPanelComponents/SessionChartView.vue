<template>
    <div class="d-flex justify-content-center h-100 w-100 p-0">
        <SessionChart :days="Number(12)" />
    </div>
</template>

<script>
import SessionChart from '@/components/ChartComponents/SessionChart.vue';

export default {
    name: "session-chart-view",
    data() {
        return {};
    },
    methods: {},
    mounted() {
    },
    components: {
        SessionChart
    }
}
</script>