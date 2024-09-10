import i18next from '@/i18n';

export default [
  {
    component: 'CNavTitle',
    name: () => i18next.t('Main'),
  },
  {
    component: 'CNavItem',
    name: () => i18next.t('메인 정보 패널'),
    to: '/dashboard',
    icon: 'cil-speedometer',
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },

  {
    component: 'CNavTitle',
    name: () => i18next.t('components'),
  },
  {
    component: 'CNavItem',
    name: '증적 문서 업로드',
    to: '/smart-table',
    icon: 'cil-grid',
  },
  {
    component: 'CNavItem',
    name: 'ISMS 이행 현황',
    to: '/apps/invoicing/invoice',
    icon: 'cil-spreadsheet',
    badge: {
      color: 'danger',
      text: 'PRO',
    },
  },
  {
    component: 'CNavItem',
    name: () => i18next.t('현황 차트'),
    to: '/charts',
    icon: 'cil-chart-pie',
  },
  {
    component: 'CNavGroup',
    name: () => i18next.t('문서 및 자산 관리'),
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
    name: () => i18next.t('리얼타임 알림 및 메시지'),
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
    name: () => i18next.t('그래프'),
    to: '/graphs',
    icon: 'cil-calculator',
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },

  {
    component: 'CNavItem',
    name: () => i18next.t('일정'),
    to: '/calendar',
    icon: 'cil-calendar',
    badge: {
      color: 'danger',
      text: 'PRO',
    },
  },

  {
    component: 'CNavTitle',
    name: '사용자 설정 및 개인화',
  },
  {
    component: 'CNavItem',
    name: () => i18next.t('login'),
    to: '/pages/login',
    icon: 'cil-star',
  },
  {
    component: 'CNavGroup',
    name: () => i18next.t('pages'),
    to: '/pages',
    icon: 'cil-layers',

    items: [
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
    name: () => i18next.t('라이브 챗 지원'),
    to: '/apps',
    icon: 'cil-envelope-open',
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
    ],
  },
  {
    component: 'CNavItem',
    name: () => i18next.t('라이브 챗 지원'),
    to: '/pages/login',
    icon: 'cil-envelope-open',
  },
]
