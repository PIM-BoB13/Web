<script setup>
import EmailSidebar from './EmailSidebar.vue'
import AppBreadcrumb from '@/components/AppBreadcrumb.vue'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import AppAside from '@/components/AppAside.vue'
</script>

<template>
  <div>
    <EmailSidebar />
    <div class="wrapper d-flex flex-column min-vh-100">
      <AppHeader />
      <div class="body flex-grow-1">
        <CContainer class="px-4" lg>
          <AppBreadcrumb />
          <CCard class="mb-4">
            <CCardBody>
              <router-view />
            </CCardBody>
          </CCard>
        </CContainer>
      </div>
      <AppFooter />
    </div>
    <AppAside />
  </div>
</template>
