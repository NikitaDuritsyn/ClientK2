<template>
  <transition name="fade">
    <div class="popup-modal" v-if="isVisible" @click.self="close()">
      <div class="window position-relative">
        <div class="window-content">
          <!-- <div class="head_modal_line"> -->
          <!-- <div @click="close" class="close_button"></div> -->
          <!-- </div> -->
          <slot></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'MyModal',
  data: () => ({
    isVisible: false,
    isVoted: false
  }),
  methods: {
    open() {
      this.isVisible = true
      this.isVoted = true
    },

    close() {
      this.isVisible = false
    },
  },
}
</script>

<style scoped>
.popup-modal::-webkit-scrollbar {
  height: 0px;
  display: none;
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
  align-items: center;
  z-index: 1100;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
}

.window {
  margin: auto;
  background: rgb(20, 20, 20);
  max-width: 600px;
}

.window-content {
  height: 100%;
  padding: 10px 5px 10px 5px;

}
</style>