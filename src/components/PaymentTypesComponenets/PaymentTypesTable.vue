<script setup>
import PaymentType from "@/components/PaymentTypesComponenets/PaymentType.vue";
import { ref } from "vue";

const props = defineProps(["paymentTypes"]);
const emit = defineEmits(["updateTable"]);
</script>
<template>
  <div class="table-responsive overflow-scroll">
    <table class="table .table-striped">
      <thead>
        <tr>
          <th>Название</th>
          <th>Тип</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <payment-type
          @update-table="$emit('updateTable')"
          v-for="paymentType in paymentTypes"
          :key="paymentType.id"
          :paymentType="paymentType"
        />
      </tbody>
    </table>
  </div>
</template>
<style scoped>
.table {
  color: rgb(255, 255, 255);
}
</style>