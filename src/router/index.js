import { h, resolveComponent } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'

import i18next from '@/i18n';
import DefaultLayout from '@/layouts/DefaultLayout'

const routes = [
  {
    path: '/',
    name: () => i18next.t('home'),
    component: DefaultLayout,
    redirect: '/dashboard',
    children: [
      {
        path: '/dashboard',
        name: () => i18next.t('dashboard'),
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import(
                /* webpackChunkName: "dashboard" */ '@/views/dashboard/Dashboard.vue'
                ),
      },

      {
        path: '/project',
        name: () => i18next.t('project'),
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import(
                /* webpackChunkName: "dashboard" */ '@/views/project/Project.vue'
                ),
      },

      {
        path: '/uploadtest',
        name: () => i18next.t('uploadtest'),
        component: () => import('@/views/documents/UploadTest.vue'),
      },

      {
        path: '/charts',
        name: () => i18next.t('charts'),
        component: () => import('@/views/charts/Charts.vue'),
      },


      {
        path: '/fileupload',
        name: '증적 문서 업로드',
        component: () => import('@/views/documents/FileUpload.vue'),
      },

      {
        path: '/pages',
        redirect: '/pages/404',
        name: 'Pages',
        component: {
          render() {
            return h(resolveComponent('router-view'))
          },
        },
        children: [

          {
            path: 'createdocx',
            name: 'CreateDocx',
            component: () => import('@/views/pages/CreateDocx'),
          },
          {
            path: 'interview',
            name: 'Interview',
            component: () => import('@/views/interview/Interview'),
          },
        ],
      },

      {
        path: 'apps',
        name: () => i18next.t('apps'),
        redirect: '/apps/invoice',
        component: {
          render() {
            return h(resolveComponent('router-view'))
          },
        },
        children: [
          {
            path: 'invoicing',
            redirect: '/apps/invoice',
            name: 'Invoicing',
            component: {
              render() {
                return h(resolveComponent('router-view'))
              },
            },
            children: [
              {
                path: 'invoice',
                name: 'Invoice',
                component: () => import('@/views/apps/Invoice.vue'),
              },
            ],
          },
        ],
      },
    ],
  },

]

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    // always scroll to top
    return { top: 0 }
  },
})

export default router
