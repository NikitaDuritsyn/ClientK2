<script setup>
import MyButton from "@/components/UI/MyButton.vue";
import MyModal from "@/components/UI/MyModal.vue";
import { API } from "@/api";
const props = defineProps(["service"]);
const emit = defineEmits(['updateTable'])

const deleteService = async () => {
  await API.deleteService(props.service.id);
  emit('updateTable')
};
</script>
<template>
  <tr>
    <th scope="row">{{ service?.title }}</th>
    <td>{{ service?.price }}</td>
    <td>
      <my-button @click="deleteService()" class="m-auto" :cls="'btn_second'">
        <i class="bi bi-dash"></i>
      </my-button>
    </td>
  </tr>
</template>