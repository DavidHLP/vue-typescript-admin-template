import { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'

const nouseroutes: RouteConfig[] = [
  {
    path: '/documentation',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/documentation/index.vue'),
        name: 'Documentation',
        meta: { title: 'documentation', icon: 'documentation', affix: true }
      }
    ]
  },
  {
    path: '/guide',
    component: Layout,
    redirect: '/guide/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/guide/index.vue'),
        name: 'Guide',
        meta: { title: 'guide', icon: 'guide', noCache: true }
      }
    ]
  },
  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/directive',
    meta: {
      title: 'permission',
      icon: 'lock',
      roles: ['admin', 'editor'],
      alwaysShow: true
    },
    children: [
      {
        path: 'page',
        component: () => import('@/views/permission/page.vue'),
        name: 'PagePermission',
        meta: { title: 'pagePermission', roles: ['admin'] }
      },
      {
        path: 'directive',
        component: () => import('@/views/permission/directive.vue'),
        name: 'DirectivePermission',
        meta: { title: 'directivePermission' }
      },
      {
        path: 'role',
        component: () => import('@/views/permission/role.vue'),
        name: 'RolePermission',
        meta: { title: 'rolePermission', roles: ['ADMIN'] }
      }
    ]
  },
  {
    path: '/icon',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/icons/index.vue'),
        name: 'Icons',
        meta: { title: 'icons', icon: 'icon', noCache: true }
      }
    ]
  },
  {
    path: '/tab',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/tab/index.vue'),
        name: 'Tab',
        meta: { title: 'tab', icon: 'tab', roles: ['ADMIN', 'GUEST', 'MANAGEMENT'] }
      }
    ]
  },
  {
    path: '/error',
    component: Layout,
    redirect: 'noredirect',
    meta: { title: 'errorPages', icon: '404' },
    children: [
      {
        path: '401',
        component: () => import('@/views/error-page/401.vue'),
        name: 'Page401',
        meta: { title: 'page401', noCache: true }
      },
      {
        path: '404',
        component: () => import('@/views/error-page/404.vue'),
        name: 'Page404',
        meta: { title: 'page404', noCache: true }
      }
    ]
  },
  {
    path: '/error-log',
    component: Layout,
    redirect: 'noredirect',
    children: [
      {
        path: 'log',
        component: () => import('@/views/error-log/index.vue'),
        name: 'ErrorLog',
        meta: { title: 'errorLog', icon: 'bug' }
      }
    ]
  },
  {
    path: '/excel',
    component: Layout,
    redirect: '/excel/export-excel',
    meta: { title: 'excel', icon: 'excel', roles: ['ADMIN', 'GUEST', 'MANAGEMENT'] },
    children: [
      {
        path: 'export-excel',
        component: () => import('@/views/excel/export-excel.vue'),
        name: 'ExportExcel',
        meta: { title: 'exportExcel', roles: ['ADMIN', 'GUEST', 'MANAGEMENT'] }
      },
      {
        path: 'export-selected-excel',
        component: () => import('@/views/excel/select-excel.vue'),
        name: 'SelectExcel',
        meta: { title: 'selectExcel', roles: ['ADMIN', 'GUEST', 'MANAGEMENT'] }
      },
      {
        path: 'export-merge-header',
        component: () => import('@/views/excel/merge-header.vue'),
        name: 'MergeHeader',
        meta: { title: 'mergeHeader', roles: ['ADMIN', 'GUEST', 'MANAGEMENT'] }
      },
      {
        path: 'upload-excel',
        component: () => import('@/views/excel/upload-excel.vue'),
        name: 'UploadExcel',
        meta: { title: 'uploadExcel', roles: ['ADMIN', 'GUEST', 'MANAGEMENT'] }
      }
    ]
  },
  {
    path: '/zip',
    component: Layout,
    redirect: '/zip/download',
    meta: { title: 'zip', icon: 'zip', alwaysShow: true, roles: ['ADMIN', 'GUEST', 'MANAGEMENT'] },
    children: [
      {
        path: 'download',
        component: () => import('@/views/zip/index.vue'),
        name: 'ExportZip',
        meta: { title: 'exportZip', roles: ['ADMIN', 'GUEST', 'MANAGEMENT'] }
      }
    ]
  },
  {
    path: '/pdf',
    component: Layout,
    redirect: '/pdf/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/pdf/index.vue'),
        name: 'PDF',
        meta: { title: 'pdf', icon: 'pdf' }
      }
    ]
  },
  {
    path: '/theme',
    component: Layout,
    redirect: 'noredirect',
    children: [
      {
        path: 'index',
        component: () => import('@/views/theme/index.vue'),
        name: 'Theme',
        meta: { title: 'theme', icon: 'theme' }
      }
    ]
  },
  {
    path: '/clipboard',
    component: Layout,
    redirect: 'noredirect',
    children: [
      {
        path: 'index',
        component: () => import('@/views/clipboard/index.vue'),
        name: 'Clipboard',
        meta: { title: 'clipboard', icon: 'clipboard', roles: ['ADMIN', 'GUEST', 'MANAGEMENT'] }
      }
    ]
  },
  {
    path: '/i18n',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/i18n-demo/index.vue'),
        name: 'I18n',
        meta: { title: 'i18n', icon: 'international' }
      }
    ]
  },
  {
    path: 'https://github.com/DavidHLP/vue-typescript-admin-template',
    meta: { title: 'externalLink', icon: 'link', roles: ['ADMIN', 'GUEST', 'MANAGEMENT'] }
  },
  {
    path: '/example',
    component: Layout,
    redirect: '/example/list',
    meta: {
      title: 'example',
      icon: 'example'
    },
    children: [
      {
        path: 'create',
        component: () =>
          import(
            /* webpackChunkName: "example-create" */ '@/views/example/create.vue'
          ),
        name: 'CreateArticle',
        meta: {
          title: 'createArticle',
          icon: 'edit',
          roles: ['ADMIN', 'GUEST', 'MANAGEMENT']
        }
      },
      {
        path: 'edit/:id(\\d+)',
        component: () =>
          import(
            /* webpackChunkName: "example-edit" */ '@/views/example/edit.vue'
          ),
        name: 'EditArticle',
        meta: {
          title: 'editArticle',
          noCache: true,
          activeMenu: '/example/list',
          hidden: true,
          roles: ['ADMIN', 'GUEST', 'MANAGEMENT']
        }
      },
      {
        path: 'list',
        component: () =>
          import(
            /* webpackChunkName: "example-list" */ '@/views/example/list.vue'
          ),
        name: 'ArticleList',
        meta: {
          title: 'articleList',
          icon: 'list',
          roles: ['ADMIN', 'GUEST', 'MANAGEMENT']
        }
      }
    ]
  }
]

export default nouseroutes
