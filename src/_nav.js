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
    name: () => i18next.t('프로젝트'),
  },
  {
    component: 'CNavItem',
    name: () => i18next.t('프로젝트 관리'),
    to: '/project',
    icon: 'cil-spreadsheet',

    items:[
      {
        component: 'CNavItem',
        name: () => i18next.t('사용자 계정 생성'),
        to: '/charts',

      },
      {
        component: 'CNavItem',
        name: () => i18next.t('사용자 계정 권한 설정'),
        to: '/project',
      },
    ]
  },


  {
    component: 'CNavTitle',
    name: () => i18next.t('DOCUMENTS'),
  },
  {
    component: 'CNavItem',
    name: '기업 자료 업로드',
    to: '/documents',
    icon: 'cil-grid',
    badge: {
      color: 'danger',
      text: 'STEP1',
    },
    items:[
      {
        component: 'CNavItem',
        name: () => i18next.t('정책 지침 test'),
        to: '/uploadtest'
      },
      {
        component: 'CNavItem',
        name: () => i18next.t('기업 자료 업로드'),
        to: '/fileupload',
      },
      {
        component: 'CNavItem',
        name: () => i18next.t('사내 클라우드 연동'),
        to: '/cloud',
      },
    ]
  },
  {
    component: 'CNavTitle',
    name: () => i18next.t('COMPLIANCE ANALYSIS'),
  },
  {
    component: 'CNavItem',
    name: '컴플라이언스 분석',
    to: '/apps/invoicing/invoice',
    icon: 'cil-chart-pie',
    badge: {
      color: 'info',
      text: 'AI',
    },
  },


  {
    component: 'CNavTitle',
    name: () => i18next.t('GAP ANALYSIS'),
  },
  {
    component: 'CNavItem',
    name: '기업 자료 GAP 분석',
    to: '/apps/invoicing/invoice',
    icon: 'cil-chart-pie',
    badge: {
      color: 'info',
      text: 'AI',
    },
  },



  {
    component: 'CNavTitle',
    name: 'ISMS 운영명세서',
  },
  {
    component: 'CNavItem',
    name: () => i18next.t('ISMS 운영명세서 확인'),
    to: '/pages/ISMS',
    icon: 'cil-star',
    // badge: {
    //   color: 'danger',
    //   text: 'AI',
    // },
  },

]
