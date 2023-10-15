<script setup>
import Room from "@/components/RoomsComponents/Room.vue";
import { ref } from "vue";

const props = defineProps(["rooms"]);
const emit = defineEmits(["updateTable"]);
</script>
<template>
  <div class="table-responsive overflow-scroll">
    <table class="table .table-striped">
      <thead>
        <tr>
          <th>Цвет</th>
          <th>Название</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <room
          @update-table="$emit('updateTable')"
          v-for="room in rooms"
          :key="room.id"
          :room="room"
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