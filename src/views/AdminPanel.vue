<template>
  <div class="admin_panel">
    <TodoClue />
    <div class="row h-50 m-0">
      <SessionChartView />
    </div>
    <div class="row h-50 m-0">
      <MainMenu />
    </div>
  </div>
</template>

<script>
import SessionChartView from '@/components/AdminPanelComponents/SessionChartView.vue';
import MainMenu from '@/components/AdminPanelComponents/MainMenu.vue';
import TodoClue from '@/components/Todo/TodoClue.vue';

export default {
  name: 'admin-panel',
  components: { MainMenu, SessionChartView, TodoClue },
  data() {
    return {
    }
  },

}
</script>