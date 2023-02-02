<template>
  <div class="admin_panel" :style="{ height: windowVH + 'px' }">
    <div class="row h-50 m-0">
      <!-- Тут график с его доп функционалом -->
      <BookingChart />
    </div>
    <div class="row h-50 m-0">
      <!-- Тут главное меню-->
      <MainMenu />
      <!-- Тут компоненты меню в зависимости от выбранного отображать -->
    </div>
  </div>
</template>

<script>
import BookingChart from '@/components/AdminPanelComponents/BookingChart.vue';
import MainMenu from '@/components/AdminPanelComponents/MainMenu.vue';

export default {
  name: 'admin-panel',
  components: { MainMenu, BookingChart },
  data() {
    return {
      clientsArray: [],
      windowVH: window.innerHeight,
    }
  },
  computed: {
    getRealVh() {
      return this.windowVH
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
<style scoped>
.admin_panel {
  background-color: rgb(30, 30, 30);
  color: rgb(175, 175, 175);
}
</style>