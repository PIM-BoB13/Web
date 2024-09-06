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

const { t, i18next } = useTranslation()
const aside = useAsideStore()
const sidebar = useSidebarStore()
const headerClassNames = ref('mb-4 p-0')
const { colorMode, setColorMode } = useColorModes('coreui-pro-vue-admin-template-theme-modern')

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
        <CDropdown variant="nav-item" placement="bottom-end">
          <CDropdownToggle :caret="false">
            <CIcon icon="cil-language" size="lg" />
          </CDropdownToggle>
          <CDropdownMenu>
            <CDropdownItem
              :active="i18next.language === 'en'"
              as="button"
              class="d-flex align-items-center"
              @click="i18next.changeLanguage('en')"
            >
              <CIcon class="me-2" icon="cif-gb" size="lg" /> English
            </CDropdownItem>
            <CDropdownItem
              :active="i18next.language === 'es'"
              as="button"
              class="d-flex align-items-center"
              @click="i18next.changeLanguage('es')"
            >
              <CIcon class="me-2" icon="cif-es" size="lg" /> Español
            </CDropdownItem>
            <CDropdownItem
              :active="i18next.language === 'pl'"
              as="button"
              class="d-flex align-items-center"
              @click="i18next.changeLanguage('pl')"
            >
              <CIcon class="me-2" icon="cif-pl" size="lg" /> Polski
            </CDropdownItem>
          </CDropdownMenu>
        </CDropdown>
        <CDropdown variant="nav-item" placement="bottom-end">
          <CDropdownToggle :caret="false">
            <CIcon v-if="colorMode === 'dark'" icon="cil-moon" size="lg" />
            <CIcon v-else-if="colorMode === 'light'" icon="cil-sun" size="lg" />
            <CIcon v-else icon="cil-contrast" size="lg" />
          </CDropdownToggle>
          <CDropdownMenu>
            <CDropdownItem
              :active="colorMode === 'light'"
              as="button"
              class="d-flex align-items-center"
              type="button"
              @click="setColorMode('light')"
            >
              <CIcon class="me-2" icon="cil-sun" size="lg" /> Light
            </CDropdownItem>
            <CDropdownItem
              :active="colorMode === 'dark'"
              as="button"
              class="d-flex align-items-center"
              type="button"
              @click="setColorMode('dark')"
            >
              <CIcon class="me-2" icon="cil-moon" size="lg" /> Dark
            </CDropdownItem>
            <CDropdownItem
              :active="colorMode === 'auto'"
              as="button"
              class="d-flex align-items-center"
              type="button"
              @click="setColorMode('auto')"
            >
              <CIcon class="me-2" icon="cil-contrast" size="lg" /> Auto
            </CDropdownItem>
          </CDropdownMenu>
        </CDropdown>
        <li class="nav-item py-1">
          <div class="vr h-100 mx-2 text-body text-opacity-75"></div>
        </li>
      </CHeaderNav>
      <CHeaderNav>
        <AppHeaderDropdownAccnt />
      </CHeaderNav>
      <CHeaderToggler @click="aside.toggleVisible()" style="margin-inline-end: -12px">
        <CIcon icon="cil-applications-settings" size="lg" />
      </CHeaderToggler>
    </CContainer>
  </CHeader>
</template>
