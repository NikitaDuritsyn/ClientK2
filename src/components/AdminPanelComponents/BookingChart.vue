<template>
    <div class="booking_chart">
        <!-- <BarChart /> -->
        <MyChartCanvas :days="Number(4)"/>
    </div>
</template>

<script>
import BarChart from '../UI/BarChart.vue';
import MyChartCanvas from '@/components/UI/MyChartCanvas.vue';

export default {
    name: "booking-chart",
    data() {
        return {};
    },
    methods: {},
    mounted() {
    },
    components: {
        BarChart,
        MyChartCanvas
    }
}
</script>

<style scoped>
.booking_chart {
    display: flex;
    justify-content: center;
    height: 100%;
    width: 100%;
    padding: 0;
}
</style>


