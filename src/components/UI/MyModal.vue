<template>
  <transition name="fade">
    <div class="popup-modal" v-if="isVisible" @click.self="close">
      <div class="window position-relative">
        <div class="window-content">
        <div
            class="position-absolute fs-3"
            style=" top: 0.3rem;right: 1rem; z-index: 150"
            @click="close"
        >
          <a><i class="bi bi-x"></i></a>
        </div>
        <div class="pt-4">
          <slot></slot>
        </div>
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
/* css class for the transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.popup-modal {
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 0.5rem;
  align-items: center;
  z-index: 1100;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
}

.window {
  position: relative;
  background: #33347E;
  border-radius: 1rem;
  box-shadow: 2px 4px 8px rgb(0 0 0 / 20%);
  max-width: max-content;
  /*margin-left: auto;*/
  /*margin-right: auto;*/
  padding: 0.75rem;
  margin: 1.75rem auto;
}

.window-content{
  height: 100%;
}

</style>