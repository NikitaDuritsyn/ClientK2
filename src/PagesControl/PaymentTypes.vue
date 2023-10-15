<script setup>
import MyButton from "@/components/UI/MyButton.vue";
import PaymentTypeTable from "@/components/PaymentTypesComponenets/PaymentTypesTable.vue";
import PaymentTypeForm from "@/components/PaymentTypesComponenets/PaymentTypeForm.vue";
import MyModal from "@/components/UI/MyModal.vue";
import { onMounted, ref } from "vue";
import { API } from "@/api";

const paymentTypes = ref(null);
const create_modal = ref(null);

const getPaymentTypes = async () => {
  paymentTypes.value = await API.getPaymentTypes();
};

onMounted(() => {
  getPaymentTypes();
});
</script>
<template>
  <div class="d-flex h-100 flex-column ms-2 me-2">
    <div class="mt-2 mb-2">
      <my-button @click="$refs.create_modal.open()" :cls="'btn_second'">
        Доб. тип оплаты
      </my-button>
    </div>
    <div class="overflow-scroll h-100">
      <payment-type-table @update-table="getPaymentTypes()" :paymentTypes="paymentTypes" />
    </div>
  </div>
  <my-modal :mode-flex-center="true" ref="create_modal">
    <payment-type-form @update-table="getPaymentTypes()" @close="create_modal.close()" />
  </my-modal>
</template>
