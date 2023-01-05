import { createPinia } from 'pinia'
import piniaPluginPersistedState from 'pinia-plugin-persistedstate'

debugger
const store = createPinia()
store.use(piniaPluginPersistedState)
export default store