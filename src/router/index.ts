import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

/* Layout */
import Layout from '@/layout/index.vue'

/* Router modules */
// import componentsRouter from './modules/components'
import chartsRouter from './modules/charts'
import tableRouter from './modules/table'
// import nestedRouter from './modules/nested'

Vue.use(VueRouter)

/*
  Note: sub-menu only appear when children.length>=1
  Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
*/

/*
  name:'router-name'             the name field is required when using <keep-alive>, it should also match its component's name property
                                 detail see : https://vuejs.org/v2/guide/components-dynamic-async.html#keep-alive-with-Dynamic-Components
  redirect:                      if set to 'noredirect', no redirect action will be trigger when clicking the breadcrumb
  meta: {
    roles: ['admin', 'editor']   will control the page roles (allow setting multiple roles)
    title: 'title'               the name showed in subMenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon showed in the sidebar
    hidden: true                 if true, this route will not show in the sidebar (default is false)
    alwaysShow: true             if true, will always show the root menu (default is false)
                                 if false, hide the root menu when has less or equal than one children route
    breadcrumb: false            if false, the item will be hidden in breadcrumb (default is true)
    noCache: true                if true, the page will not be cached (default is false)
    affix: true                  if true, the tag will affix in the tags-view
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
*/

/**
  ConstantRoutes
  a base page that does not have permission requirements
  all roles can be accessed
*/
export const constantRoutes: RouteConfig[] = [
  {
    path: '/home',
    component: () =>
      import(/* webpackChunkName: "login" */ '@/views/home/index.vue'),
    name: 'home',
    meta: {
      title: 'home',
      hidden: true
    }
  },
  {
    path: '/redirect',
    component: Layout,
    meta: { hidden: true },
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () =>
          import(
            /* webpackChunkName: "redirect" */ '@/views/redirect/index.vue'
          )
      }
    ]
  },
  {
    path: '/login',
    component: () =>
      import(/* webpackChunkName: "login" */ '@/views/login/index.vue'),
    meta: { hidden: true }
  },
  {
    path: '/register',
    component: () =>
      import(/* webpackChunkName: "register" */ '@/views/register/index.vue'),
    meta: { hidden: true }
  },
  {
    path: '/auth-redirect',
    component: () =>
      import(
        /* webpackChunkName: "auth-redirect" */ '@/views/login/auth-redirect.vue'
      ),
    meta: { hidden: true }
  },
  {
    path: '/404',
    component: () =>
      import(/* webpackChunkName: "404" */ '@/views/error-page/404.vue'),
    meta: { hidden: true }
  },
  {
    path: '/401',
    component: () =>
      import(/* webpackChunkName: "401" */ '@/views/error-page/401.vue'),
    meta: { hidden: true }
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */ '@/views/dashboard/index.vue'
          ),
        name: 'Dashboard',
        meta: {
          title: 'dashboard',
          icon: 'dashboard',
          affix: true,
          roles: ['ADMIN', 'GUEST', 'MANAGEMENT']
        }
      }
    ]
  },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    meta: { hidden: true },
    children: [
      {
        path: 'index',
        component: () =>
          import(/* webpackChunkName: "profile" */ '@/views/profile/index.vue'),
        name: 'Profile',
        meta: {
          title: 'profile',
          icon: 'user',
          noCache: true,
          roles: ['ADMIN', 'GUEST', 'MANAGEMENT']
        }
      }
    ]
  },
  {
    path: '/about',
    component: () =>
      import(/* webpackChunkName: "profile" */ '@/views/about/index.vue'),
    name: 'about',
    meta: { hidden: true, title: 'about' }
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes: RouteConfig[] = [
  /** when your routing map is too long, you can split it into small modules **/
  {
    path: '/article',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () =>
          import(/* webpackChunkName: "profile" */ '@/views/article/index.vue'),
        name: 'article',
        meta: { icon: 'edit', title: 'article' }
      },
      {
        path: 'edit',
        component: () =>
          import(
            /* webpackChunkName: "example-create" */ '@/views/article/edit.vue'
          ),
        name: 'edit',
        meta: {
          title: 'edit',
          icon: 'edit',
          hidden: true
        }
      }
    ]
  },
  {
    path: '/usermanage',
    component: Layout,
    meta: {
      title: 'user',
      icon: 'user'
    },
    children: [
      {
        path: 'user',
        component: () =>
          import(/* webpackChunkName: "usermanage" */ '@/views/usermanage/index.vue'),
        name: 'usermanage',
        meta: {
          title: 'usermanage',
          icon: 'user',
          roles: ['MANAGEMENT', 'ADMIN']
        }
      },
      {
        path: 'role',
        component: () =>
          import(/* webpackChunkName: "rolemanage" */ '@/views/rolemanage/index.vue'),
        name: 'rolemanage',
        meta: {
          title: 'rolemanage',
          icon: 'user',
          roles: ['ADMIN']
        }
      }
    ]
  },
  // componentsRouter,
  chartsRouter,
  // nestedRouter,
  tableRouter,
  {
    path: '/pdf-download-example',
    component: () =>
      import(
        /* webpackChunkName: "pdf-download-example" */ '@/views/pdf/download.vue'
      ),
    meta: { hidden: true, roles: ['ADMIN', 'GUEST', 'MANAGEMENT'] }
  },
  {
    path: '*',
    redirect: '/404',
    meta: { hidden: true, roles: ['ADMIN', 'GUEST', 'MANAGEMENT'] }
  }
]

const createRouter = () =>
  new VueRouter({
    // mode: 'history',  // Disabled due to Github Pages doesn't support this, enable this if you need.
    scrollBehavior: (to, from, savedPosition) => {
      if (savedPosition) {
        return savedPosition
      } else {
        return { x: 0, y: 0 }
      }
    },
    base: process.env.BASE_URL,
    routes: constantRoutes
  })

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  ;(router as any).matcher = (newRouter as any).matcher // reset router
}

export default router
