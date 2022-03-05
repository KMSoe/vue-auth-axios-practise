import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/store'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

const app = createApp(App)
app.use(store)
app.use(router)

app.mount('#app')
