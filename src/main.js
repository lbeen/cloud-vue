import {createApp} from 'vue'
import App from './App.vue'

import {createPinia} from 'pinia'
import piniaPluginPersistedState from 'pinia-plugin-persistedstate'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import locale from 'element-plus/es/locale/lang/zh-cn'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import router from './router/index'

const app = createApp(App)

const store = createPinia()
store.use(piniaPluginPersistedState)
app.use(store)

app.use(ElementPlus, {
    locale
})
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.use(router)

app.mount('#app')