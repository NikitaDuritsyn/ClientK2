<script setup>
import Service from "@/components/ServicesComponents/Service.vue";
import { ref } from "vue";

const props = defineProps(["services"]);
const emit = defineEmits(["updateTable"]);
</script>
<template>
  <div class="table-responsive overflow-scroll">
    <table class="table .table-striped">
      <thead>
        <tr>
          <th>Название</th>
          <th>Цена</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <service
          @update-table="$emit('updateTable')"
          v-for="service in services"
          :key="service.id"
          :service="service"
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