import {defineStore} from 'pinia'

export const useThemeConfig = defineStore('themeConfig', {
    state: () => {
        return {
            isCollapseMenu: false,
            activeTags:[]
        }
    },
    actions: {
        reset() {
            this.isCollapseMenu = false
            this.activeTags = []
        },
        addTag(tag){
            let exist = false
            for (const activeTag of this.activeTags) {
                if (activeTag.path === tag.path) {
                    activeTag.show = true
                    exist = true
                } else {
                    activeTag.show = false
                }
            }
            if (exist) {
                return
            }
            tag.show = true
            tag.closable = false
            this.activeTags.push(tag)
        }
    },
    persist: true
})
