import {defineStore} from 'pinia'

export const useThemeConfig = defineStore('themeConfig', {
    persist: true,
    state: () =>  {
        return {
            isCollapseMenu: false
        }
    },
    actions:{
        reset(){
            this.isCollapseMenu = false
        }
    }
})
