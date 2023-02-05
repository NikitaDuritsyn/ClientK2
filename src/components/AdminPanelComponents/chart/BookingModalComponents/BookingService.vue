<template>
    <div class="service_container">
        <div class="sevices">
            <div class="text">Тариф</div>
            <div>Услуги</div>
            <div>Услуги</div>
            <div>Услуги</div>
            <div>Услуги</div>
            <div>Услуги</div>
            <div>Услуги</div>
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
.sevices {
    overflow: scroll;
    height: 100%;
    -ms-overflow-style: none;
    scrollbar-width: none;
}

.sevices::-webkit-scrollbar {
    height: 0px;
    display: none;
}

.results {
    border-top: 1px solid red;
}

.service_container {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    border: 1px solid white;
    border-radius: 5px;
}
</style>