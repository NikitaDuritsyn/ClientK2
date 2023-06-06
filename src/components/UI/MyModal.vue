<template>
  <transition name="fade">
    <div class="popup-modal p-2" :class="{ 'popup-modal-center': modeFlexCenter }" v-if="isVisible"
      @click.stop.pervent.self="close()">
      <div class="window">
        <slot></slot>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'MyModal',
  emits: ['close'],
  props: {
    modeFlexCenter: {
      type: Boolean,
      default: false
    },
  },
  data: () => ({
    isVisible: false,
  }),
  methods: {
    open() {
      this.isVisible = true
    },
    close() {
      this.isVisible = false
      this.$emit('close')
    },
  },

}
</script>

<style scoped>
.popup-modal::-webkit-scrollbar {
  height: 0px;
  display: none;
}

.popup-modal-center {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.popup-modal {
  overflow: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1100;
  height: 100%;
}

.window {
  background: rgb(20, 20, 20);
  max-width: 600px;
  width: 100%;
  border-radius: 10px;
  margin: auto;
  border: 1px solid rgb(0, 255, 0);
  padding: 10px;
}
</style>