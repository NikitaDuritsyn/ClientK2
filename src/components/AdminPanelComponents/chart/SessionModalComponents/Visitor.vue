<template>
  <div class="visitor_container">
    <Switch v-if="mode != 'createBooking'" v-model:modelValue="status_switch" />
    <div class="visitor">
      <div>
        {{ visitor.name }}
      </div>
      <div>
        {{ glb.formatPhoneForShow(visitor?.number_phone) }}
      </div>
      <div v-if="mode == 'createBooking'" class="d-flex">
        <MyButton @click="$refs.update_visitor.open()" class="m-1 mt-0 mb-0" :cls="'btn_second'">
          <i class="bi bi-pen"></i>
        </MyButton>
        <MyButton @click="deleteVisitor" class="m-1 mt-0 mb-0" :cls="'btn_second'">
          <i class="bi f bi-file-minus"></i>
        </MyButton>
      </div>
    </div>
  </div>
  <MyModal :mode-flex-center="true" ref="update_visitor">
    <VisitorForm @visitor-updated="updateVisitorInList" :mode="mode + 'Update'" :visitor-object="this.visitor"
      @close="$refs.update_visitor.close()" />
  </MyModal>
</template>

<script>
import MyButton from "@/components/UI/MyButton.vue";
import MyModal from "@/components/UI/MyModal.vue";
import Switch from "@/components/UI/Switch.vue";
import VisitorForm from "./VisitorForm.vue";

export default {
  name: "visitor-vue",
  emits: ["statusSwitch", "deleteVisitor", "selected", "updateVisitor"],
  props: ["visitor", "select_all", "mode", "visitorIndex"],
  data() {
    return {
      status_switch: true,
    };
  },
  watch: {
    visitor: {
      handler(value) {
        this.updateVisitorInList(value)
      },
    },
    select_all: {
      handler(value) {
        if (value.select_all === true) {
          this.status_switch = true;
        } else if (value.select_all === false && value.selected_counter === 0) {
          this.status_switch = false;
        }
      },
    },
    status_switch: {
      handler(value) {
        this.$emit("statusSwitch", {
          select_status: value,
          visitor_id: this.visitor.id,
        });
      },
    },
  },
  methods: {
    updateVisitorInList(updatedVisitor) {
      this.$emit("updateVisitor", { visitorData: updatedVisitor, visitorIndex: this.visitorIndex },);
    },
    deleteVisitor() {
      this.$emit("deleteVisitor", this.visitorIndex);
    },
    emitSelected() {
      this.$emit("selected", { select_status: this.status_switch, visitor: this.visitor });
    }
  },
  mounted() {
    this.emitSelected()
  },
  components: { Switch, MyButton, MyModal, VisitorForm },
};
</script>

<style scoped>
.bi {
  font-size: 16px;
}

.visitor_container {
  display: flex;
  padding: 5px 10px;
}

.visitor {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  font-size: 16px;
}

.timeLine_container {
  height: 100%;
  width: 100%;
  border: 1px solid white;
}
</style>