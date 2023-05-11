import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/admin_panel',
    name: 'adminPanel',
    component: () => import('@/views/AdminPanel.vue'),
    meta: { layout: 'main' },
    children: [
      { path: 'stock', name: 'stock', component: () => import('@/PagesAdminPanel/Stock.vue') },
      { path: 'checkout', name: 'checkout', component: () => import('@/PagesAdminPanel/Checkout.vue') },
      { path: 'booking', name: 'booking', component: () => import('@/PagesAdminPanel/Booking.vue') },
      { path: 'search', name: 'search', component: () => import('@/PagesAdminPanel/Search.vue') },
      { path: 'payment', name: 'payment', component: () => import('@/PagesAdminPanel/Payment.vue') },
    ]
  },
  {
    path: '/control',
    name: 'control',
    meta: { layout: 'main' },
    component: () => import('@/views/Control.vue'),
    children: [
      { path: 'users', name: 'users', component: () => import('@/PagesControl/Users.vue') },
      { path: 'payment_types', name: 'paymentTypes', component: () => import('@/PagesControl/PaymentTypes.vue') },
      { path: 'rooms', name: 'rooms', component: () => import('@/PagesControl/Rooms.vue') },
      { path: 'services', name: 'services', component: () => import('@/PagesControl/Services.vue') },
      { path: 'tariffs', name: 'tariffs', component: () => import('@/PagesControl/Tariffs.vue') },
    ]
  },
  {
    path: '/',
    name: 'login',
    meta: { layout: 'empty' },
    component: () => import('@/views/Login.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router