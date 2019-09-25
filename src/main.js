import './styles/style.less'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import bootstrap from './bootstrap'
import { i18n } from './i18n'

Vue.config.productionTip = false

const app = () => {
  new Vue({
    el: '#app',
    render: createElement => createElement(App),
    router,
    store,
    i18n
  })
}

let hasEthereumClient = false

bootstrap()
  .then(async ethereum => {
    hasEthereumClient = true
  })
  .catch(async error => {
    hasEthereumClient = false
  })
  .finally(() => {
    app()
  })
