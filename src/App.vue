<template>
  <router-view />
</template>

<script>
export default {
  name: "App",
  data: () => {
    return {}
  },
  mounted() {
    this.$store.dispatch('GET_ROOMS');
    this.$store.dispatch('GET_TARIFFS');
    this.$store.dispatch('GET_SERVICES');
    this.$store.dispatch('GET_PAYMENTTYPES');
  }
}
</script>

<style>
body {
  background-color: rgb(0, 0, 0) !important;
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