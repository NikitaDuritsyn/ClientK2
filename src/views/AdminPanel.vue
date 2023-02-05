<template>
  <div class="admin_panel" :style="{ height: windowVH + 'px' }">
    <div class="row h-50 m-0">
      <!-- Тут график с его доп функционалом -->
      <BookingChartView />
    </div>
    <div class="row h-50 m-0">
      <!-- Тут главное меню-->
      <MainMenu />
      <!-- Тут компоненты меню в зависимости от выбранного отображать -->
    </div>
  </div>
</template>

<script>
import BookingChartView from '@/components/AdminPanelComponents/BookingChartView.vue';
import MainMenu from '@/components/AdminPanelComponents/MainMenu.vue';

// РЕАЛИЗОВАТЬ ФУНКЦИЮ, КОТОРАЯ БУДЕТ БРАТЬ БРОНИ И ПЕРЕДАВАТЬ ИХ В CHART(график) 
// Каждые 00:00 часов запрос должен быть 2 даты назад и 10 дат вперед
// В БД СОЗДАТЬ СУЩНОСТЬ Bookings (id клиента, Дата, время начала, время конца(если нет то еще идет), длительность)

export default {
  name: 'admin-panel',
  components: { MainMenu, BookingChartView },
  data() {
    return {
      clientsArray: [],
      windowVH: Number(window.innerHeight) - 1,
    }
  },
  methods: {
    updateHeight() {
      this.windowVH = window.innerHeight;
    },
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
  },
  created() {
    window.addEventListener('resize', this.updateHeight);
  },
  beforeUnmount() {
    removeEventListener('resize', this.updateHeight)
  }
}
</script>
<style scoped>
.admin_panel {
  background-color: rgb(30, 30, 30);
  color: rgb(175, 175, 175);
}
</style>