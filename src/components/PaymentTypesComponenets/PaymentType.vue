<script setup>
import MyButton from "@/components/UI/MyButton.vue";
import MyModal from "@/components/UI/MyModal.vue";
import { API } from "@/api";
const props = defineProps(["paymentType"]);
const emit = defineEmits(['updateTable'])

const deletePaymentType = async () => {
  await API.deletePaymentType(props.paymentType.id);
  emit('updateTable')
};
</script>
<template>
  <tr>
    <th scope="row">{{ paymentType?.title }}</th>
    <td>{{ paymentType?.type }}</td>
    <td>
      <my-button @click="deletePaymentType()" class="m-auto" :cls="'btn_second'">
        <i class="bi bi-dash"></i>
      </my-button>
    </td>
  </tr>
</template>