import i18next from '@/i18n';

export default [
  {
    component: 'CNavItem',
    name: () => i18next.t('dashboard'),
    to: '/dashboard',
    icon: 'cil-speedometer',
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    component: 'CNavTitle',
    name: () => i18next.t('theme'),
  },
  {
    component: 'CNavItem',
    name: () => i18next.t('colors'),
    to: '/theme/colors',
    icon: 'cil-drop',
  },
  {
    component: 'CNavItem',
    name: () => i18next.t('typography'),
    to: '/theme/typography',
    icon: 'cil-pencil',
  },
  {
    component: 'CNavTitle',
    name: () => i18next.t('components'),
  },
  {
    component: 'CNavGroup',
    name: () => i18next.t('base'),
    to: '/base',
    icon: 'cil-puzzle',
    items: [
      {
        component: 'CNavItem',
        name: 'Accordion',
        to: '/base/accordion',
      },
      {
        component: 'CNavItem',
        name: 'Breadcrumbs',
        to: '/base/breadcrumbs',
      },
      {
        component: 'CNavItem',
        name: 'Cards',
        to: '/base/cards',
      },
      {
        component: 'CNavItem',
        name: 'Carousels',
        to: '/base/carousels',
      },
      {
        component: 'CNavItem',
        name: 'Collapses',
        to: '/base/collapses',
      },
      {
        component: 'CNavItem',
        name: 'List Groups',
        to: '/base/list-groups',
      },
      {
        component: 'CNavItem',
        name: 'Navs & Tabs',
        to: '/base/navs',
      },
      {
        component: 'CNavItem',
        name: 'Paginations',
        to: '/base/paginations',
      },
      {
        component: 'CNavItem',
        name: 'Placeholders',
        to: '/base/placeholders',
      },
      {
        component: 'CNavItem',
        name: 'Popovers',
        to: '/base/popovers',
      },
      {
        component: 'CNavItem',
        name: 'Progress',
        to: '/base/progress',
      },
      {
        component: 'CNavItem',
        name: 'Spinners',
        to: '/base/spinners',
      },
      {
        component: 'CNavItem',
        name: 'Tables',
        to: '/base/tables',
      },
      {
        component: 'CNavItem',
        name: 'Tabs',
        to: '/base/tabs',
      },
      {
        component: 'CNavItem',
        name: 'Tooltips',
        to: '/base/tooltips',
      },
    ],
  },
  {
    component: 'CNavGroup',
    name: () => i18next.t('buttons'),
    to: '/buttons',
    icon: 'cil-cursor',
    items: [
      {
        component: 'CNavItem',
        name: 'Buttons',
        to: '/buttons/standard-buttons',
      },
      {
        component: 'CNavItem',
        name: 'Button Groups',
        to: '/buttons/button-groups',
      },
      {
        component: 'CNavItem',
        name: 'Dropdowns',
        to: '/buttons/dropdowns',
      },
    ],
  },
  {
    component: 'CNavGroup',
    name: () => i18next.t('forms'),
    to: '/forms',
    icon: 'cil-notes',
    items: [
      {
        component: 'CNavItem',
        name: 'Form Control',
        to: '/forms/form-control',
      },
      {
        component: 'CNavItem',
        name: 'Select',
        to: '/forms/select',
      },
      {
        component: 'CNavItem',
        name: 'Multi Select',
        to: '/forms/multi-select',
        badge: {
          color: 'danger',
          text: 'PRO',
        },
      },
      {
        component: 'CNavItem',
        name: 'Checks & Radios',
        to: '/forms/checks-radios',
      },
      {
        component: 'CNavItem',
        name: 'Range',
        to: '/forms/range',
      },
      {
        component: 'CNavItem',
        name: 'Input Group',
        to: '/forms/input-group',
      },
      {
        component: 'CNavItem',
        name: 'Floating Labels',
        to: '/forms/floating-labels',
      },
      {
        component: 'CNavItem',
        name: 'Date Picker',
        to: '/forms/date-picker',
        badge: {
          color: 'danger',
          text: 'PRO',
        },
      },
      {
        component: 'CNavItem',
        name: 'Date Range Picker',
        to: '/forms/date-range-picker',
        badge: {
          color: 'danger',
          text: 'PRO',
        },
      },
      {
        component: 'CNavItem',
        name: 'Time Picker',
        to: '/forms/time-picker',
        badge: {
          color: 'danger',
          text: 'PRO',
        },
      },
      {
        component: 'CNavItem',
        name: 'Layout',
        to: '/forms/layout',
      },
      {
        component: 'CNavItem',
        name: 'Validation',
        to: '/forms/validation',
      },
    ],
  },
  {
    component: 'CNavGroup',
    name: 'Icons',
    to: '/icons',
    icon: 'cil-star',
    items: [
      {
        component: 'CNavItem',
        name: 'CoreUI Icons',
        to: '/icons/coreui-icons',
        badge: {
          color: 'info',
          text: 'NEW',
        },
      },
      {
        component: 'CNavItem',
        name: 'Brands',
        to: '/icons/brands',
      },
      {
        component: 'CNavItem',
        name: 'Flags',
        to: '/icons/flags',
      },
    ],
  },
  {
    component: 'CNavGroup',
    name: () => i18next.t('notifications'),
    to: '/notifications',
    icon: 'cil-bell',
    items: [
      {
        component: 'CNavItem',
        name: 'Alerts',
        to: '/notifications/alerts',
      },
      {
        component: 'CNavItem',
        name: 'Badges',
        to: '/notifications/badges',
      },
      {
        component: 'CNavItem',
        name: 'Modals',
        to: '/notifications/modals',
      },
      {
        component: 'CNavItem',
        name: 'Toasts',
        to: '/notifications/toasts',
      },
    ],
  },
  {
    component: 'CNavItem',
    name: () => i18next.t('widgets'),
    to: '/widgets',
    icon: 'cil-calculator',
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    component: 'CNavItem',
    name: 'Smart Table',
    to: '/smart-table',
    icon: 'cil-grid',
    badge: {
      color: 'danger',
      text: 'PRO',
    },
  },
  {
    component: 'CNavTitle',
    name: () => i18next.t('plugins'),
  },
  {
    component: 'CNavItem',
    name: () => i18next.t('calendar'),
    to: '/calendar',
    icon: 'cil-calendar',
    badge: {
      color: 'danger',
      text: 'PRO',
    },
  },
  {
    component: 'CNavItem',
    name: () => i18next.t('charts'),
    to: '/charts',
    icon: 'cil-chart-pie',
  },
  {
    component: 'CNavTitle',
    name: 'Extras',
  },
  {
    component: 'CNavGroup',
    name: () => i18next.t('pages'),
    to: '/pages',
    icon: 'cil-star',
    items: [
      {
        component: 'CNavItem',
        name: () => i18next.t('login'),
        to: '/pages/login',
      },
      {
        component: 'CNavItem',
        name: () => i18next.t('register'),
        to: '/pages/register',
      },
      {
        component: 'CNavItem',
        name: () => i18next.t('error404'),
        to: '/pages/404',
      },
      {
        component: 'CNavItem',
        name: () => i18next.t('error500'),
        to: '/pages/500',
      },
    ],
  },
  {
    component: 'CNavGroup',
    name: () => i18next.t('apps'),
    to: '/apps',
    icon: 'cil-layers',
    items: [
      {
        component: 'CNavGroup',
        name: 'Invoicing',
        to: '/apps/invoicing',
        icon: 'cil-spreadsheet',
        items: [
          {
            component: 'CNavItem',
            name: 'Invoice',
            to: '/apps/invoicing/invoice',
            badge: {
              color: 'danger',
              text: 'PRO',
            },
          },
        ],
      },
      {
        component: 'CNavGroup',
        name: 'Email',
        to: '/apps/email',
        icon: 'cil-envelope-closed',
        items: [
          {
            component: 'CNavItem',
            name: 'Inbox',
            to: '/apps/email/inbox',
            icon: 'cil-envelope-closed',
            badge: {
              color: 'danger',
              text: 'PRO',
            },
          },
          {
            component: 'CNavItem',
            name: 'Message',
            to: '/apps/email/message',
            icon: 'cil-envelope-open',
            badge: {
              color: 'danger',
              text: 'PRO',
            },
          },
          {
            component: 'CNavItem',
            name: 'Compose',
            to: '/apps/email/compose',
            icon: 'cil-envelope-letter',
            badge: {
              color: 'danger',
              text: 'PRO',
            },
          },
        ],
      },
    ],
  },
]
