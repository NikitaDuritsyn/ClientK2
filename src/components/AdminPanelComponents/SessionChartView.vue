<template>
    <div class="session_chart">
        <SessionChart :days="Number(12)" />
    </div>
</template>

<script>
import SessionChart from '@/components/AdminPanelComponents/chart/SessionChart.vue';

export default {
    name: "session-chart",
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

<style scoped>
.session_chart {
    display: flex;
    justify-content: center;
    height: 100%;
    width: 100%;
    padding: 0;
}
</style>


