import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/AdminPanel.vue'),
    children: [
      { path: 'stock', name: 'stock', component: () => import('../components/AdminPanelComponents/Menu/StockComponent.vue') },
      { path: 'checkout', name: 'checkout', component: () => import('../components/AdminPanelComponents/Menu/CheckoutComponent.vue') },
      { path: 'booking', name: 'booking', component: () => import('../components/AdminPanelComponents/Menu/BookingComponent.vue') },
      { path: 'search', name: 'search', component: () => import('../components/AdminPanelComponents/Menu/SearchComponent.vue') },
      { path: 'payment', name: 'payment', component: () => import('../components/AdminPanelComponents/Menu/PaymentComponent.vue') },
    ]
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
