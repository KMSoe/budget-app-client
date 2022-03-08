import { createApp } from 'vue'
import App from './App.vue'
import Breadcrumb from './components/partials/Breadcrumb.vue'
import router from './router/index'
import store from './store/store'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import './dom'

const app = createApp(App)
app.component('Breadcrumb', Breadcrumb)
app.use(store)
app.use(router)

app.mount('#app')