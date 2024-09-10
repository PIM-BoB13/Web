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
        path: '/charts',
        name: () => i18next.t('charts'),
        component: () => import('@/views/charts/Charts.vue'),
      },

      {
        path: '/smart-table',
        name: 'Smart Table',
        component: () => import('@/views/smart-table/SmartTable.vue'),
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
            path: 'login',
            name: 'Login',
            component: () => import('@/views/pages/Login'),
          },
          {
            path: 'register',
            name: 'Register',
            component: () => import('@/views/pages/Register'),
          },
        ],
      },

      {
        path: 'apps',
        name: () => i18next.t('apps'),
        redirect: '/apps/invoicing/invoice',
        component: {
          render() {
            return h(resolveComponent('router-view'))
          },
        },
        children: [
          {
            path: 'invoicing',
            redirect: '/apps/invoicing/invoice',
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
                component: () => import('@/views/apps/invoicing/Invoice.vue'),
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
