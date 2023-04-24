<template>
  <div class="visitor_container">
    <Switch v-if="mode != 'createBooking'" v-model:modelValue="statusSwitch" />
    <div class="visitor" :class="{ 'text-decoration-line-through': visitor.status === 'close' }">
      <div>
        {{ visitor.name }}
      </div>
      <div>
        {{ glb.formatPhoneForShow(visitor?.number_phone) }}
      </div>
      <div class="d-flex">
        <MyButton v-if="mode == 'createBooking'" @click="$refs.update_visitor.open()" class="m-1 mt-0 mb-0"
          :cls="'btn_second'">
          <i class="bi bi-pen"></i>
        </MyButton>
        <MyButton :disabled="(visitor.start_time_visitor) ? true : false" @click="deleteVisitor" class="m-1 mt-0 mb-0"
          :cls="'btn_second'">
          <i class="bi f bi-file-minus"></i>
        </MyButton>
      </div>
    </div>
  </div>
  <MyModal :mode-flex-center="true" ref="update_visitor">
    <VisitorForm :mode="mode + 'Update'" :visitor-object="this.visitor" @visitor-updated="updateVisitorInList"
      @close="$refs.update_visitor.close()" />
  </MyModal>
</template>

<script>
import MyButton from "@/components/UI/MyButton.vue";
import MyModal from "@/components/UI/MyModal.vue";
import Switch from "@/components/UI/Switch.vue";
import VisitorForm from "@/components/VisitorComponents/VisitorForm.vue";

export default {
  name: "visitor-vue",
  emits: ["visitorDeleted", "statusSwitch", "deleteVisitor", "updateVisitor", 'updateVisitorList'],
  props: ["visitor", "mode", "visitorIndex", 'selectAllClick', 'selectAllValue'],
  components: { Switch, MyButton, MyModal, VisitorForm },
  data() {
    return {
      statusSwitch: true,
    };
  },
  methods: {
    updateVisitorInList(updatedVisitor) {
      if (this.mode == 'createBooking') {
        this.$emit("updateVisitor", { visitorData: updatedVisitor, visitorIndex: this.visitorIndex },);
      } else {
        this.$emit("statusSwitch", { statusSwitch: this.statusSwitch, visitor: this.visitor });
      }
    },
    async deleteVisitor() {
      if (this.mode == 'createBooking') {
        this.$emit("deleteVisitor", this.visitorIndex);
      } else {
        await this.$api.deleteVisitorById(this.visitor.id)
        this.$emit("visitorDeleted", this.visitor.id)
        this.$emit("updateVisitorList")
      }
    },
  },
  watch: {
    visitor: {
      handler(value) {
        this.updateVisitorInList(value)
      },
    },
    selectAllClick(value) {
      this.statusSwitch = !this.selectAllValue
    },
    statusSwitch: {
      handler(value) {
        this.$emit('statusSwitch', { statusSwitch: value, visitor: this.visitor })
      },
    },
  },
  mounted() {
    this.$emit('statusSwitch', { statusSwitch: this.statusSwitch, visitor: this.visitor })
  }
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