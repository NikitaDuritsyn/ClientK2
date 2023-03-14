<template>
  <div class="admin_panel" :style="{ height: windowVH + 'px' }">
    <div class="row h-50 m-0">
      <!-- Тут график с его доп функционалом -->
      <SessionChartView />
    </div>
    <div class="row h-50 m-0">
      <!-- Тут главное меню-->
      <MainMenu />
      <!-- Тут компоненты меню в зависимости от выбранного отображать -->
    </div>
  </div>
</template>

<script>
import SessionChartView from '@/components/AdminPanelComponents/SessionChartView.vue';
import MainMenu from '@/components/AdminPanelComponents/MainMenu.vue';

// РЕАЛИЗОВАТЬ ФУНКЦИЮ, КОТОРАЯ БУДЕТ БРАТЬ БРОНИ И ПЕРЕДАВАТЬ ИХ В CHART(график) 
// Каждые 00:00 часов запрос должен быть 2 даты назад и 10 дат вперед
// В БД СОЗДАТЬ СУЩНОСТЬ Sessions (id клиента, Дата, время начала, время конца(если нет то еще идет), длительность)

export default {
  name: 'admin-panel',
  components: { MainMenu, SessionChartView },
  data() {
    return {
      windowVH: Number(window.innerHeight) - 1,
    }
  },
  methods: {
    updateHeight() {
      this.windowVH = window.innerHeight;
    },
  },
  mounted() { },
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
  /* background-color: white; */
  /* color: rgb(30, 30, 175); */
  
}
</style>