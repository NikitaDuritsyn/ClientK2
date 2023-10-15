<script setup>
import MyButton from "@/components/UI/MyButton.vue";
import MyModal from "@/components/UI/MyModal.vue";
import RoomForm from "@/components/RoomsComponents/RoomForm.vue";
import { API } from "@/api";
const props = defineProps(["room"]);
const emit = defineEmits(['updateTable'])

const deleteRoom = async () => {
  await API.deleteRoom(props.room.id);
  emit('updateTable')
};
</script>
<template>
  <tr>
    <th scope="row">{{ room?.title }}</th>
    <td>{{ room?.color }}</td>
    <td>
      <my-button @click="deleteRoom()" class="m-auto" :cls="'btn_second'">
        <i class="bi bi-dash"></i>
      </my-button>
    </td>
  </tr>
</template>