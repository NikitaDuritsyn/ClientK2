<template>
  <div class="visitors_list_container">
    <div class="visitors_block">
      <Visitor ref="visitor" v-for="(visitor, index) in visitors_lsit" :key="visitor.id" :visitor="visitor" :mode="mode"
        :select-all-click="selectAll.click" :select-all-value="selectAll.value" :visitorIndex="index"
        @update-visitor="updateVisitorByIndex" @delete-visitor="deleteVisitorByIndex"
        @visitor-deleted="deleteSelectedVisitorById" @status-switch="updateSelectedVisitors"
        @update-visitor-list="$emit('updateVisitorList')" />
    </div>
    <div class="select_menu">
      <div class="d-flex justify-content-between align-items-center w-100">
        <div v-if="mode != 'createBooking'" class="d-flex align-items-center">
          <Switch v-model:modelValue="selectAll.value" @click="selectAllSwitch" />
          <div class="select_counter">
            Все ( {{ selectedVisitors.length }} из {{ visitors_lsit.length }} )
          </div>
        </div>

        <div v-if="mode != 'createBooking'" class="d-flex">
          <MyButton class="me-1 ms-1" v-for="addVisitorBtn in addVisitorBtns" :cls="'btn_second'"
            :disabled="(sessionStatus === 'close') ? true : false" @click="addSomeVisitors(addVisitorBtn.visitorsNum)">
            {{ addVisitorBtn.title }}
          </MyButton>
        </div>

        <MyButton :cls="'btn_second'" :disabled="(sessionStatus === 'close') ? true : false"
          @click="$refs.create_visitor.open()">
          ДОБАВИТЬ
        </MyButton>
      </div>
    </div>
    <MyModal :mode-flex-center="true" ref="create_visitor">
      <VisitorForm :session-id="sessionId" :mode="mode" :session-tariff="sessionTariff" :visitor-object="{}"
        @visitor-created="updateVisitorList" @close="$refs.create_visitor.close()" />
    </MyModal>
  </div>
</template>

<script>
import MyButton from "@/components/UI/MyButton.vue";
import MyModal from "@/components/UI/MyModal.vue";
import Switch from "@/components/UI/Switch.vue";
import VisitorForm from "@/components/VisitorComponents/VisitorForm.vue";
import Visitor from "@/components/VisitorComponents/Visitor.vue";

export default {
  name: "session-visitors-list",
  emits: ["updateVisitorByIndex", "deleteVisitorByIndex", "updateVisitorList", "visitorsSelected"],
  props: ["visitors_lsit", "mode", "sessionId", "sessionTariff", "sessionStatus"],
  components: { Switch, Visitor, MyButton, MyModal, VisitorForm },
  data() {
    return {
      addVisitorBtns: [
        { title: '+1', visitorsNum: 1 },
        { title: '+3', visitorsNum: 3 },
        { title: '+5', visitorsNum: 5 },
      ],
      selected_counter: this.visitors_lsit.length,
      selectAll: { value: true, click: false },
      selectedVisitors: [],
    };
  },
  methods: {
    updateVisitorByIndex(updatedVisitor) {
      if (this.mode === "createBooking") {
        this.$emit("updateVisitorByIndex", updatedVisitor);
      }
    },
    deleteVisitorByIndex(visitor_index) {
      if (this.mode === "createBooking") {
        this.$emit("deleteVisitorByIndex", visitor_index);
      }
    },
    //ЗАПРОС Добавление АНАНИМУСОВ
    async addSomeVisitors(visitorsNum) {
      await this.$api.createSomeVisitors({ visitorsNum: visitorsNum, tariff_id: this.sessionTariff, session_id: this.sessionId })
      this.updateVisitorList()
    },
    //Обновление выбранных посетителей
    updateSelectedVisitors(event) {
      if (event.statusSwitch) {
        this.selectedVisitors.push(event.visitor)
      } else {
        this.selectedVisitors = this.selectedVisitors.filter(item => item.id !== event.visitor.id)
      }
      this.$emit("visitorsSelected", this.selectedVisitors);
    },
    deleteSelectedVisitorById(visitoriId) {
      this.selectedVisitors = this.selectedVisitors.filter(item => item.id !== visitoriId)
      this.selectAll.value = true
    },
    //Выбор всех посетителей
    selectAllSwitch() {
      this.selectAll.click = !this.selectAll.click
    },
    //ЗАПРОС на Обновление Листа посетителей через родительский комаонент
    updateVisitorList(visitor) {
      if (this.mode !== "createBooking") {
        this.$emit("updateVisitorList");
      } else {
        this.$emit("updateVisitorList", visitor);
      }
    },
  },
  watch: {
    selectedVisitors: {
      handler(value) {
        this.selectAll.value = (value.length === this.visitors_lsit.length) ? true : false;
      },
      deep: true
    },
    visitors_lsit: {
      handler(value) {
        this.selectAll.value = (value.length === this.selectedVisitors.length) ? true : false;
      },
      deep: true
    }
  }
};
</script>

<style scoped>
.select_counter {
  margin: 0 10px;
}

.select_menu {
  display: flex;
  font-size: 16px;
  align-items: center;
  padding: 5px 10px;
  border-top: 1px solid rgb(0, 255, 255);
}

.visitors_list_container {
  display: flex;
  flex-direction: column;
  border: 2px solid whitesmoke;
  width: 100%;
  border-radius: 5px;
  height: 100%;
  max-height: 250px;
  margin: 5px 0px;
}

.visitors_block {
  overflow: scroll;
  max-height: 100%;
  width: 100%;
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.visitors_block::-webkit-scrollbar {
  height: 0px;
  display: none;
}
</style>