import {createApp} from 'vue'
import App from './App.vue'
import router from './router/index'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import locale from 'element-plus/es/locale/lang/zh-cn'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedState from 'pinia-plugin-persistedstate'

const app = createApp(App)
app.use(router)

app.use(ElementPlus, {
    locale
})
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}


const pinia = createPinia();
pinia.use(piniaPluginPersistedState);
app.use(pinia);

app.mount('#app')