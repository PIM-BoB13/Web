<script setup>
import { onMounted, ref } from 'vue'
import { useTranslation } from 'i18next-vue'
import { useColorModes } from '@coreui/vue-pro'

import AppHeaderDropdownAccnt from '@/components/AppHeaderDropdownAccnt.vue'
import AppHeaderDropdownMssgs from '@/components/AppHeaderDropdownMssgs.vue'
import AppHeaderDropdownNotif from '@/components/AppHeaderDropdownNotif.vue'
import AppHeaderDropdownTasks from '@/components/AppHeaderDropdownTasks.vue'
import { useAsideStore } from '@/stores/aside.js'
import { useSidebarStore } from '@/stores/sidebar.js'

// eslint-disable-next-line no-unused-vars
const { t, i18next } = useTranslation()
// eslint-disable-next-line no-unused-vars
const { colorMode, setColorMode } = useColorModes('coreui-pro-vue-admin-template-theme-modern')
const aside = useAsideStore()
const sidebar = useSidebarStore()
const headerClassNames = ref('mb-4 p-0')


onMounted(() => {
  document.addEventListener('scroll', () => {
    if (document.documentElement.scrollTop > 0) {
      headerClassNames.value = 'mb-4 p-0 shadow-sm'
    } else {
      headerClassNames.value = 'mb-4 p-0'
    }
  })
})
</script>

<template>
  <CHeader position="sticky" :class="headerClassNames">
    <CContainer class="px-4" fluid>
      <CHeaderToggler
        :class="['d-lg-none', { 'prevent-hide': !sidebar.visible }]"
        @click="sidebar.toggleVisible()"
        style="margin-inline-start: -14px"
      >
        <CIcon icon="cil-menu" size="lg" />
      </CHeaderToggler>
      <CForm class="d-none d-sm-flex">
        <CInputGroup>
          <CInputGroupText id="search-addon" class="bg-body-secondary border-0 px-1">
            <CIcon icon="cil-search" size="lg" class="my-1 mx-2 text-body-secondary" />
          </CInputGroupText>
          <CFormInput
            :placeholder="t('search')"
            ariaLabel="Search"
            ariaDescribedby="search-addon"
            class="bg-body-secondary border-0"
          />
        </CInputGroup>
      </CForm>
      <CHeaderNav class="d-none d-md-flex ms-auto">
        <AppHeaderDropdownNotif />
        <AppHeaderDropdownTasks />
        <AppHeaderDropdownMssgs />
      </CHeaderNav>
      <CHeaderNav class="ms-auto ms-md-0">
        <li class="nav-item py-1">
          <div class="vr h-100 mx-2 text-body text-opacity-75"></div>
        </li>
      </CHeaderNav>
      <CHeaderNav>
        <AppHeaderDropdownAccnt />
      </CHeaderNav>
      <CHeaderToggler @click="aside.toggleVisible()" style="margin-inline-end: -14px">
        <CIcon icon="cil-applications-settings" size="lg" />
      </CHeaderToggler>
    </CContainer>
  </CHeader>
</template>
