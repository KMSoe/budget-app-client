import { createApp } from 'vue'
import App from './App.vue'
import Breadcrumb from './components/partials/Breadcrumb.vue'
import router from './router/index'
import store from './store/store'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import './dom'
import Datepicker from 'vue3-date-time-picker'
import 'vue3-date-time-picker/dist/main.css'
import PrimeVue from 'primevue/config'
import { Modal } from "bootstrap";
import Toast from "vue-toastification";
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";


const app = createApp(App)
app.component('Breadcrumb', Breadcrumb)
app.component('Datepicker', Datepicker)
app.use(Toast, {});
app.use(store)
app.use(router)
app.use(PrimeVue)

app.mount('#app')