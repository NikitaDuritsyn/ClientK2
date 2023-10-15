<script setup>
import MyButton from "@/components/UI/MyButton.vue";
import ServicesTable from "@/components/ServicesComponents/ServicesTable.vue";
import ServiceForm from "@/components/ServicesComponents/ServiceForm.vue";
import MyModal from "@/components/UI/MyModal.vue";
import { onMounted, ref } from "vue";
import { API } from "@/api";

const services = ref(null);
const create_modal = ref(null);

const getServices = async () => {
  services.value = await API.getServices();
};

onMounted(() => {
  getServices();
});
</script>
<template>
  <div class="d-flex h-100 flex-column ms-2 me-2">
    <div class="mt-2 mb-2">
      <my-button @click="$refs.create_modal.open()" :cls="'btn_second'">
        Доб. услугу
      </my-button>
    </div>
    <div class="overflow-scroll h-100">
      <services-table @update-table="getServices()" :services="services" />
    </div>
  </div>
  <my-modal :mode-flex-center="true" ref="create_modal">
    <service-form @update-table="getServices()" @close="create_modal.close()" />
  </my-modal>
</template>