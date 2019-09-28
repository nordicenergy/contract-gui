import Vue from 'vue'
import Router from 'vue-router'
import Welcome from './views/Welcome'
import RegisterChooseNetwork from './views/RegisterSideChain/ChooseNetwork'
import InteractWithSideChain from './views/InteractWithSideChain/InteractWithSideChain'
import MintTestTokens from './views/RegisterSideChain/MintTestTokens'
import MintTransactions from './views/RegisterSideChain/MintTransactions'
import ApproveSpender from './views/RegisterSideChain/ApproveSpender'
import RegisterChain from './views/RegisterSideChain/RegisterChain'
import RegistrationCompleted from './views/RegisterSideChain/RegistrationCompleted'

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
      path: '/register/networks/:network/mint-test-tokens',
      component: MintTestTokens,
      name: 'register.mint_test_tokens',
      props: true
    },
    {
      path: '/register/networks/:network/minted-test-tokens',
      component: MintTransactions,
      name: 'register.minted_test_tokens',
      props: true
    },
    {
      path: '/register/networks/:network/approve-spender',
      component: ApproveSpender,
      name: 'register.approve_spender',
      props: true
    },
    {
      path: '/register/networks/:network/new-chain',
      component: RegisterChain,
      name: 'register.new_chain',
      props: true
    },
    {
      path: '/register/networks/:network/chains/:chaindId/completed',
      component: RegistrationCompleted,
      name: 'register.completed',
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
