<template>
  <div class="admin_panel" :style="{ height: windowVH + 'px' }">
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
      windowVH: Number(window.innerHeight) - 1,
    }
  },
  methods: {
    updateHeight() {
      this.windowVH = window.innerHeight;
    },
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