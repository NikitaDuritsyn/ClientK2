import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Toaster from "@meforma/vue-toaster";
import { API } from "@/api";
import { global_objects } from "@/global_objects.js";


import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"


const app = createApp(App)

app.config.globalProperties.$api = API
app.config.globalProperties.glb = global_objects

app.use(store)
app.use(router)
app.use(Toaster, {
    // One of the options
    position: "top",
});

app.mount('#app')
