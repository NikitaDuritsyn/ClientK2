<template>
    <div>
        <div class="d-flex w-100 mb-2">
            <strong>
                ЗА УСЛУГИ: {{ paymentResults }} ₽
            </strong>
        </div>
        <div v-if="visitorsServicesShow" v-for="visitorService in visitorsServices"
            class="d-flex flex-wrap align-items-center justify-content-between p-2 mt-2 mb-2 visitor_service">
            <div>Посетитель: {{ visitorService.name }}</div>
            <div>Услуга: {{ visitorService.title }}</div>
            <div>Стоимость: {{ visitorService.price }}</div>
        </div>
    </div>
</template>

<script>
import MyButton from '@/components/UI/MyButton.vue';
export default {
    name: "visitors-services",
    emit: ['deleteVisitorService'],
    props: ["visitorsServices", "visitorsServicesShow", "paymentResults"],
    components: { MyButton },
    data() {
        return {};
    },
    methods: {}
}
</script>

<style scoped>
.visitor_service {
    font-weight: 700;
    border: 1px solid white;
    border-radius: 10px;
}
</style>