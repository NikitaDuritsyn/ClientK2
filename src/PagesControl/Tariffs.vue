<script setup>
import MyButton from "@/components/UI/MyButton.vue";
import TariffsTable from "@/components/TariffsComponents/TariffsTable.vue";
import TariffForm from "@/components/TariffsComponents/TariffForm.vue";
import MyModal from "@/components/UI/MyModal.vue";
import { onMounted, ref } from "vue";
import { API } from "@/api";

const tariffs = ref(null);
const create_modal = ref(null);

const getTariffs = async () => {
  tariffs.value = await API.getTariffs();
};

onMounted(() => {
  getTariffs()
})
</script>
<template>
  <div class="d-flex h-100 flex-column ms-2 me-2">
    <div class="mt-2 mb-2">
      <my-button @click="$refs.create_modal.open()" :cls="'btn_second'">
        Доб. тариф
      </my-button>
    </div>
    <div class="overflow-scroll h-100">
      <tariffs-table @update-table="getTariffs()" :tariffs="tariffs" />
    </div>
  </div>
  <my-modal :mode-flex-center="true" ref="create_modal">
    <tariff-form @update-table="getTariffs()" @close="create_modal.close()" />
  </my-modal>
</template>