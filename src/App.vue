<template>
  <router-view :style="{ height: windowVH + 'px' }" />
</template>

<script>
export default {
  name: "App",
  data: () => {
    return {
      windowVH: Number(window.innerHeight) - 1,
    }
  },
  methods: {
    updateHeight() {
      this.windowVH = window.innerHeight;
    },
  },
  mounted() {
    this.$store.dispatch('GET_ROOMS');
    this.$store.dispatch('GET_TARIFFS');
    this.$store.dispatch('GET_SERVICES');
    this.$store.dispatch('GET_PAYMENTTYPES');
    this.$store.dispatch('GET_ROLES');
  },
  created() {
    window.addEventListener('resize', this.updateHeight);
  },
  beforeUnmount() {
    removeEventListener('resize', this.updateHeight)
  }
}
</script>

<style>
.overflow-scroll {
  -ms-overflow-style: none;
  /* IE и Edge */
  scrollbar-width: none;
  /* scrollbar-height: none; */
  /* Firefox */
}

.overflow-scroll::-webkit-scrollbar {
  height: 0px;
  display: none;
}

body {
  overflow: hidden;
  background-color: rgb(15, 15, 15) !important;
}

.admin_panel {
  color: rgb(209, 209, 209)
}

.pointer {
  cursor: pointer;
}

.text_label_name {
  font-size: 16px;
  padding: 0 10px 0 0;
}

.h-fit-content {
  height: fit-content;
}


.timepicker {
  background: none;
  border-radius: 5px;
}

.text_block {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #fff;
  padding: 0 3px 0 3px;
  font-size: 14px;
  border-radius: 5px;
  line-height: 14px;
}

.vue__time-picker .dropdown ul li:not([disabled]).active,
.vue__time-picker .dropdown ul li:not([disabled]).active:focus,
.vue__time-picker .dropdown ul li:not([disabled]).active:hover {
  background-color: rgb(128, 0, 255);
}

.vue__time-picker .dropdown ul li {
  color: white;
}

.vue__time-picker .dropdown ul li:hover {
  color: rgb(255, 255, 255) !important;
  background-color: #0003c8 !important;
}

.vue__time-picker .dropdown .hint {
  color: white;
}

.vue__time-picker .dropdown {
  overflow: hidden;
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 500;
  border-radius: 1rem;
  line-height: 1.25rem;
  background: #732c2cd3;
  border: 1px solid #fff;
}

.vue__time-picker .controls {
  padding-right: 1rem;
}

.vue__time-picker input.vue__time-picker-input {
  background: none;
  color: rgb(180, 180, 180);
  border-radius: 5px;
  border: 1px solid #fff;
  line-height: 1.25rem;
  outline: none;
  width: 100%;
  padding: 1.1rem;
}
</style>