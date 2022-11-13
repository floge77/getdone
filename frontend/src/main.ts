import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import './assets/main.css'

const app = createApp(App)
export const backendURL = "http://localhost:3000/api"

app.use(router)

app.mount('#app')
