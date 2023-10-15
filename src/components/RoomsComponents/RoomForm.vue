<script setup>
import MyButton from "@/components/UI/MyButton.vue";
import MyInput from "@/components/UI/MyInput.vue";
import MyMultiSelect from "@/components/UI/MyMultiSelect.vue";
import { onMounted, ref } from "vue";
import { mapState } from "vuex";
import { API } from "@/api";
import { inject } from 'vue'

const props = defineProps(["roomData", "mode"]);
const emit = defineEmits(["close", "updateTable", "delete"]);

const room = ref({ title: null, color: null });

const createRoom = async () => {
  try {
    const res = await API.createRoom(room.value);
    // toast.info(res.massage);
    emit("updateTable");
    emit("close");
  } catch (e) {
    // toast.error(e.massage);
  }
};

const deleteRoom = async () => {
  try {
    const res = await API.deleteRoom(room.value.id);
    // toast.info(res.massage);
    emit("updateTable");
    emit("close");
  } catch (e) {
    // toast.error(e.massage);
  }
};

onMounted(() => {
  if (props.roomData && props.mode === "update") {
    console.log(props.roomData);
    room.value = { ...this.roomData };
    console.log(room.value);
  }
});
</script>
<template>
  <div class="room_form_container m-auto">
    <div class="d-flex justify-content-end">
      <my-button :cls="'close_btn'" @click="$emit('close')"></my-button>
    </div>
    <my-input class="mt-2" v-model:model-value="room.title" :label="'Название'" />
    <my-input class="mt-2" v-model:model-value="room.color" :label="'Цвет'" />
    <div v-if="mode !== 'update'" class="d-flex justify-content-end mt-2">
      <my-button @click="createRoom">СОЗДАТЬ</my-button>
    </div>
    <div v-else class="d-flex justify-content-end mt-2">
      <my-button class="ms-1" @click="deleteRoom">Удалить</my-button>
    </div>
  </div>
</template>
<style>
.room_form_container {
  width: 400px;
}
</style>