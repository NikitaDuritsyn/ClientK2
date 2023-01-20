import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Toaster from "@meforma/vue-toaster";
import { API } from "@/api";

const app = createApp(App)

app.config.globalProperties.$api = API

app.use(store)
app.use(router)
app.use(Toaster)
app.mount('#app')
