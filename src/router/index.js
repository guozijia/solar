import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: '首页', icon: 'home', affix: true }
      }
    ]
  },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index'),
        name: 'Profile',
        meta: { title: '个人中心', icon: 'user', noCache: true }
      }
    ]
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  // {
  //   path: '/permission',
  //   component: Layout,
  //   redirect: '/permission/page',
  //   alwaysShow: true, // will always show the root menu
  //   name: 'Permission',
  //   meta: {
  //     title: '权限',
  //     icon: 'lock',
  //     roles: ['admin', 'editor'] // you can set roles in root nav
  //   },
  //   children: [
  //     {
  //       path: 'page',
  //       component: () => import('@/views/permission/page'),
  //       name: 'PagePermission',
  //       meta: {
  //         title: '用户权限',
  //         roles: ['admin'] // or you can only set roles in sub nav
  //       }
  //     },
  //   ]
  // },

  {
    path: '/Station',
    component: Layout,
    redirect: '/Station/list',
    alwaysShow: true, // will always show the root menu
    name: 'Station',
    meta: {
      title: '电站',
      icon: 'pv',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/station/list'),
        name: 'StationList',
        meta: {
          title: '电站列表',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'details',
        component: () => import('@/views/station/details'),
        name: 'StationDetails',
        meta: {
          title: '电站详情'
          // if do not set roles, means: this page does not require permission
        }
      }
    ]
  },
  {
    path: '/Operation',
    component: Layout,
    redirect: '/Operation/question',
    alwaysShow: true, // will always show the root menu
    name: 'Operation',
    meta: {
      title: '运维',
      icon: 'ope',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'question',
        component: () => import('@/views/operation/question'),
        name: 'Question',
        meta: {
          title: '问题大厅',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'form',
        component: () => import('@/views/operation/form/index'),
        name: 'Form',
        meta: {
          title: '报表'
        }
      },
      {
        path: 'alarm',
        component: () => import('@/views/operation/alarm'),
        name: 'Alarm',
        meta: {
          title: '告警'
        }
      },
      {
        path: 'card',
        component: () => import('@/views/operation/card'),
        name: 'Card',
        meta: {
          title: '物理网卡'
        }
      },
      {
        path: 'update',
        component: () => import('@/views/operation/update'),
        name: 'Update',
        meta: {
          title: '设备升级'
        }
      },
      {
        path: 'diagnosis',
        component: () => import('@/views/operation/diagnosis'),
        name: 'Diagnosis',
        meta: {
          title: 'IV曲线诊断'
        }
      }
    ]
  },
  {
    path: '/Set',
    component: Layout,
    redirect: '/Set/businessman',
    alwaysShow: true, // will always show the root menu
    name: 'Set',
    meta: {
      title: '设置',
      icon: 'set',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'businessman',
        component: () => import('@/views/set/businessman/index'),
        name: 'Businessman',
        meta: {
          title: '代理商/安装商管理',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'deviceuser',
        component: () => import('@/views/set/deviceuser'),
        name: 'DeviceUser',
        meta: {
          title: '终端用户管理'
        }
      },
      {
        path: 'staff',
        component: () => import('@/views/set/staff/index'),
        name: 'Staff',
        meta: {
          title: '员工管理'
        }
      },
      {
        path: 'system',
        component: () => import('@/views/set/system/index'),
        name: 'System',
        meta: {
          title: '系统设置'
        }
      },
      {
        path: 'enterprise',
        component: () => import('@/views/set/enterprise'),
        name: 'Enterprise',
        meta: {
          title: '企业账号验证'
        }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
