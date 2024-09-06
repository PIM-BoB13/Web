<script setup>
import { CContainer } from '@coreui/vue-pro'
import AppAside from '@/components/AppAside.vue'
import AppBreadcrumb from '@/components/AppBreadcrumb.vue'
import AppFooter from '@/components/AppFooter.vue'
import AppHeader from '@/components/AppHeader.vue'
import AppSidebar from '@/components/AppSidebar.vue'
</script>

<template>
  <div>
    <AppSidebar />
    <div class="wrapper d-flex flex-column min-vh-100">
      <AppHeader />
      <div class="body flex-grow-1">
        <CContainer class="px-4" lg>
          <AppBreadcrumb />
          <router-view />
        </CContainer>
      </div>
      <AppFooter />
    </div>
  </div>
  <AppAside />
</template>
