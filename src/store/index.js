import { createStore } from 'vuex'
import { getItem, setItem } from '@/utiles/storage'

const USERKEY = 'userkey'

export default createStore({
  state: {
    user: getItem(USERKEY),
    // user: JSON.parse(window.localStorage.getItem('user'))
    // 档期那登陆状态（token等）
    cachePages: ['LayoutIndex']
  },
  getters: {
  },
  mutations: {
    setUser (state, data) {
      state.user = data
      // window.localStorage.setItem('user', JSON.stringify(state.user))
      setItem(USERKEY, state.user)
    },
    
    // 防止页面刷新丢失，要本地存储，持久化
    addCachePage (state, pageName) {
      if (!state.cachePages.includes(pageName)) {
        state.cachePages.push(pageName)
      }
    },

    // 移除缓存页面
    removeCachePage (state, pageName) {
      const index = state.cachePages.indexOf(pageName)
      if (index !== -1) {
        state.cachePages.splice(index, 1)
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
