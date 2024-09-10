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
    badge: {
      color: 'danger',
      text: 'STEP1',
    },
  },
  {
    component: 'CNavItem',
    name: 'ISMS 이행 현황',
    to: '/apps/invoicing/invoice',
    icon: 'cil-spreadsheet',
    badge: {
      color: 'danger',
      text: 'STEP2',
    },
  },




  {
    component: 'CNavItem',
    name: () => i18next.t('이행 여부 판단'),
    to: '/charts',
    icon: 'cil-chart-pie',
    badge: {
      color: 'danger',
      text: 'STEP3',
    },
  },





  {
    component: 'CNavTitle',
    name: '사용자 설정 및 개인화',
  },
  {
    component: 'CNavItem',
    name: () => i18next.t('문서 생성'),
    to: '/pages/createdocx',
    icon: 'cil-star',
    badge: {
      color: 'info',
      text: 'AI',
    },
  },
  {
    component: 'CNavItem',
    name: () => i18next.t('인터뷰 질문 생성'),
    to: '/pages/interview',
    icon: 'cil-envelope-open',
    badge: {
      color: 'info',
      text: 'AI',
    },
  },
]
