import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/AdminPanel.vue'),
    children: [
      { path: 'stock', name: 'stock', component: () => import('@/views/Stock.vue') },
      { path: 'checkout', name: 'checkout', component: () => import('@/views/Checkout.vue') },
      { path: 'booking', name: 'booking', component: () => import('@/views/Booking.vue') },
      { path: 'search', name: 'search', component: () => import('@/views/Search.vue') },
      { path: 'payment', name: 'payment', component: () => import('@/views/Payment.vue') },
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue'),
  },
  {
    path: '/Control',
    name: 'Control',
    component: () => import('@/views/Control.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
