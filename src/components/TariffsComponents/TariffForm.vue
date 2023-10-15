<script setup>
import MyButton from "@/components/UI/MyButton.vue";
import MyInput from "@/components/UI/MyInput.vue";
import MySelect from "@/components/UI/MySelect.vue";
import MyMultiSelect from "@/components/UI/MyMultiSelect.vue";
import { onMounted, ref } from "vue";
import { mapState } from "vuex";
import { API } from "@/api";
import { inject } from "vue";

const props = defineProps(["tariffData", "mode"]);
const emit = defineEmits(["close", "updateTable", "delete"]);

const tariff = ref({
  title: null,
  metric: 'TimeBased',
  duration: null,
  cost: null,
});

const metrics = ref([
  {
    id: "TimeBased",
    title: "TimeBased",
  },
  {
    id: "Fixed",
    title: "Fixed",
  },
]);

const createTariff = async () => {
  try {
    const res = await API.createTariff(tariff.value);
    // toast.info(res.massage);
    emit("updateTable");
    emit("close");
  } catch (e) {
    // toast.error(e.massage);
  }
};

const deleteTariff = async () => {
  try {
    const res = await API.deleteTariff(tariff.value.id);
    // toast.info(res.massage);
    emit("updateTable");
    emit("close");
  } catch (e) {
    // toast.error(e.massage);
  }
};

onMounted(() => {
  if (props.tariffData && props.mode === "update") {
    tariff.value = { ...this.tariffData };
  }
});
</script>
<template>
  <div class="tariff_form_container m-auto">
    <div class="d-flex justify-content-end">
      <my-button :cls="'close_btn'" @click="$emit('close')"></my-button>
    </div>
    <my-input
      class="mt-2"
      v-model:model-value="tariff.title"
      :label="'Название'"
    />
    <my-select
      class="mt-2 m-auto w-100"
      :label="'Метрика:'"
      v-model:modelValue="tariff.metric"
      :options="metrics"
    />
    <my-input
      class="mt-2"
      v-model:model-value="tariff.duration"
      :label="'Продолжительность в мин'"
    />
    <my-input class="mt-2" v-model:model-value="tariff.cost" :label="'Цена'" />
    <div v-if="mode !== 'update'" class="d-flex justify-content-end mt-2">
      <my-button @click="createTariff">СОЗДАТЬ</my-button>
    </div>
    <div v-else class="d-flex justify-content-end mt-2">
      <my-button class="ms-1" @click="deleteTariff">Удалить</my-button>
    </div>
  </div>
</template>
<style>
.tariff_form_container {
  width: 400px;
}
</style>