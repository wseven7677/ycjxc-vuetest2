import Vue from 'vue'
import Router from 'vue-router'

import IndexCom from '@/components/IndexCom'
import HistoryCom from '@/components/HistoryCom'
import PictureCom from '@/components/PictureCom'
import MemberCom from '@/components/MemberCom'
import ContactCom from '@/components/ContactCom'
import LoginCom from '@/components/LoginCom'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'IndexPage',
      component: IndexCom
    },
    {
    	path: '/history',
    	name: 'History',
    	component: HistoryCom
    },
    {
    	path: '/picture',
    	name: 'Picture',
    	component: PictureCom
    },
    {
    	path: '/member',
    	name: 'Member',
    	component: MemberCom
    },
    {
    	path: '/contact',
    	name: 'Contact',
    	component: ContactCom
    },
    {
        path: '/login',
        name: 'Login',
        component: LoginCom
    }
  ]
})
