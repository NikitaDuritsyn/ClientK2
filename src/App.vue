<template>
  <router-view />
</template>
<style>
body {
  background-color: rgb(0, 0, 0) !important;
}
</style>
<script>
export default {
  name: "App",
  data: () => {
    return {}
  },
  mounted() {
      this.$store.dispatch('GET_ROOMS')
  }
}
</script>