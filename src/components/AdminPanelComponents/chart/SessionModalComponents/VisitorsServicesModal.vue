<template>
    <div class="visitors_services">
        <div class="d-flex w-100 ">
            <strong>
                ЗА ВСЁ: {{ setPayment }} ₽
            </strong>
            <MyButton class="ms-auto" :cls="'close_btn'" @click="$emit('close')"></MyButton>
        </div>
        <div v-for="visitorService in visitorsServices"
            class="d-flex flex-wrap align-items-center justify-content-between p-2 mt-2 mb-2 visitor_service">
            <!-- VisitirService -->
            <div>Посетитель: {{ visitorService.name }}</div>
            <div>Услуга: {{ visitorService.title }}</div>
            <div>Цена: {{ visitorService.price }}</div>
            <MyButton @click="deleteVisitorService(visitorService.id)" class="m-1 mt-0 mb-0" :cls="'btn_second'">
                <i class="bi f bi-file-minus"></i>
            </MyButton>
        </div>
    </div>
</template>

<script>
import MyButton from '@/components/UI/MyButton.vue';
export default {
    name: "visitors-services",
    emit: ['deleteVisitorService'],
    props: ["visitorsServices"],
    components: { MyButton },
    data() {
        return {};
    },
    methods: {
        async deleteVisitorService(serviceId) {
            await this.$api.deleteVisitorService(serviceId)
            this.$emit('deleteVisitorService')
        }
    },
    computed: {
        setPayment() {
            return this.visitorsServices.reduce((acc, service) => acc + Number(service.price), 0)
        }
    },
}
</script>

<style scoped>
.visitor_service {
    font-weight: 700;
    background-color: black;
    border: 1px solid white;
    border-radius: 10px;
}
</style>