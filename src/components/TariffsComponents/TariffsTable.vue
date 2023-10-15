<script setup>
import Tariff from "@/components/TariffsComponents/Tariff.vue";
import { ref } from "vue";

const props = defineProps(["tariffs"]);
const emit = defineEmits(["updateTable"]);
</script>
<template>
  <div class="table-responsive overflow-scroll">
    <table class="table .table-striped">
      <thead>
        <tr>
          <th>Название</th>
          <th>Метрика</th>
          <th>Продолжительность</th>
          <th>Цена</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tariff
          @update-table="$emit('updateTable')"
          v-for="tariff in tariffs"
          :key="tariff.id"
          :tariff="tariff"
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