import { createApp } from 'vue'
import { createHead } from '@vueuse/head'
import App from './uranite.vue'
import router from './routing/router.js'
import store from './stores/index.js'

const app = createApp(App)
const head = createHead()

app.use(store)
app.use(router)
app.use(head)

app.mount('#root')
