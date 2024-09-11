<script setup>
import { RouterLink } from 'vue-router'



import gasan1 from '@/assets/brand/gasan1.png'

import { AppSidebarNav } from '@/components/AppSidebarNav.js'
import { useSidebarStore } from '@/stores/sidebar.js'

const sidebar = useSidebarStore()
</script>

<template>
  <CSidebar
    class="bg-dark-gradient border-end"
    colorScheme="dark"
    position="fixed"
    :unfoldable="sidebar.unfoldable"
    :visible="sidebar.visible"
    @visible-change="(value) => sidebar.toggleVisible(value)"
  >
    <CSidebarHeader class="border-bottom">
      <RouterLink custom to="/" v-slot="{ href, navigate }">
        <CSidebarBrand v-bind="$attrs" as="a" :href="href" @click="navigate">



          <img :src="gasan1" alt="Gasan Logo" style="width: 130px; height: auto;" />

        </CSidebarBrand>
      </RouterLink>
      <CCloseButton class="d-lg-none" dark @click="sidebar.toggleVisible()" />
      <CSidebarToggler @click="sidebar.toggleUnfoldable()" />
    </CSidebarHeader>
    <AppSidebarNav />
  </CSidebar>
</template>
