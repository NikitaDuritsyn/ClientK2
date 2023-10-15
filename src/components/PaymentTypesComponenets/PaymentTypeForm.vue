<script setup>
import MyButton from "@/components/UI/MyButton.vue";
import MyInput from "@/components/UI/MyInput.vue";
import MyMultiSelect from "@/components/UI/MyMultiSelect.vue";
import MySelect from "@/components/UI/MySelect.vue";
import { onMounted, ref } from "vue";
import { mapState } from "vuex";
import { API } from "@/api";
import { inject } from "vue";

const props = defineProps(["paymentTypeData", "mode"]);
const emit = defineEmits(["close", "updateTable", "delete"]);

const paymentType = ref({ title: null, type: null });
const types = ref([
  { id: "Наличная", title: "Наличная" },
  { id: "Перевод", title: "Перевод" },
  { id: "Терминал", title: "Терминал" },
]);

const createPaymentType = async () => {
  try {
    switch (paymentType.value.title) {
      case "Наличная":
        paymentType.value.type = "cash";
        break;
      case "Перевод":
        paymentType.value.type = "transfer";
        break;
      case "Терминал":
        paymentType.value.type = "terminal";
        break;
      default:
        break;
    }
    const res = await API.createPaymentType(paymentType.value);
    // toast.info(res.massage);
    emit("updateTable");
    emit("close");
  } catch (e) {
    // toast.error(e.massage);
  }
};

const deletePaymentType = async () => {
  try {
    const res = await API.deletePaymentType(paymentType.value.id);
    // toast.info(res.massage);
    emit("updateTable");
    emit("close");
  } catch (e) {
    // toast.error(e.massage);
  }
};

onMounted(() => {
  if (props.paymentTypeData && props.mode === "update") {
    paymentType.value = { ...this.paymentTypeData };
  }
});
</script>
<template>
  <div class="payments_type_form_container m-auto">
    <div class="d-flex justify-content-end">
      <my-button :cls="'close_btn'" @click="$emit('close')"></my-button>
    </div>
    <my-select
      class="mt-2 m-auto w-100"
      :label="'тип:'"
      v-model:modelValue="paymentType.title"
      :options="types"
    />
    <div v-if="mode !== 'update'" class="d-flex justify-content-end mt-2">
      <my-button @click="createPaymentType">СОЗДАТЬ</my-button>
    </div>
    <div v-else class="d-flex justify-content-end mt-2">
      <my-button class="ms-1" @click="deletePaymentType">Удалить</my-button>
    </div>
  </div>
</template>
<style>
.payments_type_form_container {
  width: 400px;
}
</style>