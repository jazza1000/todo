import './assets/main.css'

import { inititalisePlugins } from './plugins'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

inititalisePlugins(app)
app.use(router)

app.mount('#app')
