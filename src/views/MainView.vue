<template>
  <div class="main_view">
    <div v-for="(client, index ) in clientsArray" :key="index">
      {{ index }}{{ client }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'main-view',
  components: {},
  data() {
    return {
      clientsArray: [],
    }
  },
  methods: {
    getClientsAdwas() {
      const vm = this;
      vm.$api.getClients()
        .then(data => {
          console.log(data);
          vm.clientsArray = data
        })
        .catch(err => console.error(err))
    },
  },
  mounted() {
    this.getClientsAdwas()
  }

}
</script>
