<template>
  <div class="visitors_list_container">
    <div class="visitors_block">
      <Visitor v-for="(visitor, index) in visitors_lsit" :key="index" @update-visitor="updateVisitorByIndex"
        @delete-visitor="deleteVisitorByIndex" :visitor-index="index" :mode="mode" ref="visitor"
        :select_all="setSelectedAll" :visitor="visitor" @selected="setSelectedArr" @status-switch="updateSelectedArr" />
    </div>
    <div class="select_menu">
      <div class="d-flex justify-content-between align-items-center w-100">
        <div v-if="mode != 'createBooking'" class="d-flex align-items-center">
          <Switch @click="updateSelectedAll('click')" v-model:modelValue="select_all" />
          <div class="select_counter">
            Все ( {{ selected_counter }} из {{ visitors_lsit.length }} )
          </div>
        </div>
        <MyButton :cls="'btn_second'" @click="$refs.create_visitor.open()"
          :disabled="(sessionStatus === 'active' || sessionStatus === 'booked') ? false : true">
          ДОБАВИТЬ
        </MyButton>
      </div>
    </div>
    <MyModal :mode-flex-center="true" ref="create_visitor">
      <VisitorForm @visitor-created="updateVisitorList" :session-id="sessionId" :mode="mode"
        @close="$refs.create_visitor.close()" :visitor-object="{}" :session-tariff="sessionTariff" />
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
      selected_counter: this.visitors_lsit.length, select_all: true, setSelected: [],
    };
  },
  methods: {
    updateVisitorByIndex(updatedVisitor) {
      this.$emit("updateVisitorByIndex", updatedVisitor);
    },
    deleteVisitorByIndex(visitor_index) {
      if (this.mode === "createBooking") {
        this.$emit("deleteVisitorByIndex", visitor_index);
      }
    },
    updateVisitorList(visitor) {
      if (this.mode !== "createBooking") {
        this.$emit("updateVisitorList");
      } else {
        this.$emit("updateVisitorList", visitor);
      }
    },
    setSelectedArr(value) {
      this.setSelected.push(value);
    },
    updateSelectedArr(value) {
      this.setSelected = this.setSelected.map((item) => { return (item.visitor.id === value.visitor_id) ? { ...item, select_status: value.select_status } : { ...item }; })
    },
    updateSelectedAll(_value) {
      if (_value === "click") {
        if (this.select_all === false) {
          this.setSelected = this.setSelected.map((item) => { return (item.select_status === false) ? { ...item, select_status: true } : { ...item }; })
        } else {
          this.setSelected = this.setSelected.map((item) => { return (item.select_status === true) ? { ...item, select_status: false } : { ...item }; })
        }
        return { selected_counter: this.selected_counter, select_all: this.select_all };
      } else {
        let count_selected = 0;
        for (let i = 0; i < this.setSelected.length; i++) {
          if (this.setSelected[i].select_status === true) {
            count_selected = count_selected + 1;
          }
        }
        this.selected_counter = count_selected;
        if (count_selected === this.setSelected.length) {
          this.select_all = true;
        } else {
          this.select_all = false;
        }
        this.emmitSelectedVisitors(this.setSelected);
        return {
          selected_counter: this.selected_counter,
          select_all: this.select_all,
        };
      }
    },
    emmitSelectedVisitors() {
      let selected_visitors = [];
      for (let i = 0; i < this.setSelected.length; i++) {
        const element = this.setSelected[i];
        if (element.select_status === true) {
          selected_visitors.push(element.visitor);
        }
      }
      this.$emit("visitorsSelected", selected_visitors);
    },
  },
  computed: {
    setSelectedAll() {
      return this.updateSelectedAll();
    },
  },
  watch: {
    visitors_lsit(value) {
      this.setSelected = []
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