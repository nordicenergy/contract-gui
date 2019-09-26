import Vue from 'vue'
import Router from 'vue-router'
import Welcome from './views/Welcome'
import RegisterChooseNetwork from './views/RegisterSideChain/ChooseNetwork'
import InteractWithSideChain from './views/InteractWithSideChain/InteractWithSideChain'
import MintTestTokens from './views/RegisterSideChain/MintTestTokens'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'welcome',
      component: Welcome
    },
    {
      path: '/register/choose-network',
      component: RegisterChooseNetwork,
      name: 'register.network'
    },
    {
      path: '/register/:network/mint-test-tokens',
      component: MintTestTokens,
      name: 'register.mint_test_tokens',
      props: true
    },
    {
      path: '/interact-with-sidechain',
      name: 'interact',
      component: InteractWithSideChain
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ]
})
