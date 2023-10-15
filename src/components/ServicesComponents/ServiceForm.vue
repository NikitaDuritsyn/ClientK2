<script setup>
import MyButton from "@/components/UI/MyButton.vue";
import MyInput from "@/components/UI/MyInput.vue";
import MyMultiSelect from "@/components/UI/MyMultiSelect.vue";
import { onMounted, ref } from "vue";
import { mapState } from "vuex";
import { API } from "@/api";
import { inject } from 'vue'

const props = defineProps(["serviceData", "mode"]);
const emit = defineEmits(["close", "updateTable", "delete"]);

const service = ref({ title: null, price: null });

const createService = async () => {
  try {
    const res = await API.createService(service.value);
    // toast.info(res.massage);
    emit("updateTable");
    emit("close");
  } catch (e) {
    // toast.error(e.massage);
  }
};

const deleteService = async () => {
  try {
    const res = await API.deleteService(service.value.id);
    // toast.info(res.massage);
    emit("updateTable");
    emit("close");
  } catch (e) {
    // toast.error(e.massage);
  }
};

onMounted(() => {
  if (props.serviceData && props.mode === "update") {
    service.value = { ...this.serviceData };
  }
});
</script>
<template>
  <div class="service_form_container m-auto">
    <div class="d-flex justify-content-end">
      <my-button :cls="'close_btn'" @click="$emit('close')"></my-button>
    </div>
    <my-input class="mt-2" v-model:model-value="service.title" :label="'Название'" />
    <my-input class="p-0" :type="'number'" :min="0" :label="'Цена'" v-model:model-value="service.price" />
    <div v-if="mode !== 'update'" class="d-flex justify-content-end mt-2">
      <my-button @click="createService">СОЗДАТЬ</my-button>
    </div>
    <div v-else class="d-flex justify-content-end mt-2">
      <my-button class="ms-1" @click="deleteService">Удалить</my-button>
    </div>
  </div>
</template>
<style>
.service_form_container {
  width: 400px;
}
</style>