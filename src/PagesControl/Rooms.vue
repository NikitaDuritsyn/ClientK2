<script setup>
import MyButton from "@/components/UI/MyButton.vue";
import RoomsTable from "@/components/RoomsComponents/RoomsTable.vue";
import RoomForm from "@/components/RoomsComponents/RoomForm.vue";
import MyModal from "@/components/UI/MyModal.vue";
import { onMounted, ref } from "vue";
import { API } from "@/api";

const rooms = ref(null);
const create_modal = ref(null);

const getRooms = async () => {
  rooms.value = await API.getRooms();
};

onMounted(() => {
  getRooms()
})
</script>
<template>
  <div class="d-flex h-100 flex-column ms-2 me-2">
    <div class="mt-2 mb-2">
      <my-button @click="$refs.create_modal.open()" :cls="'btn_second'">
        Доб. комнату
      </my-button>
    </div>
    <div class="overflow-scroll h-100">
      <rooms-table @update-table="getRooms()" :rooms="rooms" />
    </div>
  </div>
  <my-modal :mode-flex-center="true" ref="create_modal">
    <room-form @update-table="getRooms()" @close="create_modal.close()" />
  </my-modal>
</template>