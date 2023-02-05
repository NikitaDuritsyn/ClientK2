<template>
    <div class="service_container">
        <div class="sevices">
            тариф
            усогуи
            усогуи
            усогуи
            усогуи
            усогуи
            усогуи
        </div>
        <div class="results">
            <div class="text">
                Итоги
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'booking-service',
    data() {
        return {
            
        }
    },
    methods: {
    },
    mounted() {
    }

}
</script>

<style scoped>
.sevices{
    height: 100%;
}
.results{
    border-top: 1px solid red;
}
.service_container{
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    border: 1px solid white;
    border-radius: 5px;
}
</style>