import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 1. 引入你需要的组件
import Vant from 'vant'
// 2. 引入组件样式
import '../node_modules/vant/lib/index.css'

// 自动设置rem基准值（html标签字体大小）
import 'amfe-flexible'
import './styles/index.less'
const app = createApp(App)

// 3. 注册你需要的组件
app.use(Vant)

// 创建vue根实例，以及配置router和vuex
// 最后渲染App根组件渲染到#app
app.use(store).use(router).mount('#app')
