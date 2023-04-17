<template>
    <div>
        <div class="d-flex w-100 mb-2">
            <strong>
                ЗА УСЛУГИ: {{ paymentResults }} ₽
            </strong>
        </div>
        <div v-if="visitorsServicesShow" v-for="visitor in visitorsServices" class=" p-2 mt-2 mb-2 visitor_service">
            <div>Посетитель: {{ visitor.name }}</div>
            <div class="row justify-content-center align-items-center" v-for="visitorService in visitor.visitorServices">
                <!-- {{ visitorService.id }} -->
                <div class="col-6 d-flex justify-content-center">- Услуга: {{ visitorService.service.title }}</div>
                <div class="col-6 d-flex justify-content-center">Стоимость: {{ visitorService.service.price }}</div>

            </div>
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