<script setup>
import MyButton from "@/components/UI/MyButton.vue";
import MyModal from "@/components/UI/MyModal.vue";
import { API } from "@/api";
const props = defineProps(["tariff"]);
const emit = defineEmits(['updateTable'])

const deleteTariff = async () => {
  await API.deleteTariff(props.tariff.id);
  emit('updateTable')
};
</script>
<template>
  <tr>
    <th scope="row">{{ tariff?.title }}</th>
    <td>{{ tariff?.metric }}</td>
    <td>{{ tariff.duration || '-'}}</td>
    <td>{{ tariff?.cost }}</td>
    <td>
      <my-button @click="deleteTariff()" class="m-auto" :cls="'btn_second'">
        <i class="bi bi-dash"></i>
      </my-button>
    </td>
  </tr>
</template>