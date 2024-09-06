<script setup>
import { logo } from '@/assets/brand/logo.js'
import { sygnet } from '@/assets/brand/sygnet.js'
import { useSidebarStore } from '@/stores/sidebar.js'

const sidebar = useSidebarStore()
</script>

<template>
  <CSidebar
    class="border-end"
    color-scheme="light"
    position="fixed"
    :unfoldable="sidebar.unfoldable"
    :visible="sidebar.visible"
    @visible-change="
      (value) =>
      sidebar.toggleVisible(value)
    "
  >
    <CSidebarHeader class="border-bottom">
      <CSidebarBrand>
        <CIcon custom-class-name="sidebar-brand-full" :icon="logo" :height="32" />
        <CIcon custom-class-name="sidebar-brand-narrow" :icon="sygnet" :height="32" />
      </CSidebarBrand>
      <CCloseButton class="d-lg-none" @click="sidebar.toggleVisible()" />
      <CSidebarToggler @click="sidebar.toggleUnfoldable()" />
    </CSidebarHeader>
    <CSidebarNav>
      <router-link v-slot="{ href, navigate, isActive }" to="./compose" custom>
        <CNavItem :active="isActive" :href="href" @click="navigate">
          <CIcon custom-class-name="nav-icon" icon="cil-pencil" />
          Compose
        </CNavItem>
      </router-link>
      <router-link v-slot="{ href, navigate, isActive }" to="./inbox" custom>
        <CNavItem :active="isActive" :href="href" @click="navigate">
          <CIcon custom-class-name="nav-icon" icon="cil-inbox" />
          Inbox
          <CBadge class="ms-auto" color="danger">4</CBadge>
        </CNavItem>
      </router-link>
      <CNavItem href="#">
        <CIcon custom-class-name="nav-icon" icon="cil-star" />
        Stared
      </CNavItem>
      <CNavItem href="#">
        <CIcon custom-class-name="nav-icon" icon="cil-paper-plane" />
        Sent
      </CNavItem>
      <CNavItem href="#">
        <CIcon custom-class-name="nav-icon" icon="cil-trash" />
        Trash
      </CNavItem>
      <CNavItem href="#">
        <CIcon custom-class-name="nav-icon" icon="cil-bookmark" />
        Important
        <CBadge class="ms-auto" color="info">5</CBadge>
      </CNavItem>
      <CNavItem href="#">
        <CIcon custom-class-name="nav-icon" icon="cil-inbox" />
        Spam
        <CBadge class="ms-auto" color="warning">25</CBadge>
      </CNavItem>
      <router-link v-slot="{ href, navigate, isActive }" to="/dashboard" custom>
        <CNavItem :active="isActive" class="mt-auto" :href="href" @click="navigate">
          <CIcon custom-class-name="nav-icon" icon="cil-speedometer" />
          Dashboard
          <CBadge class="ms-auto" color="info">NEW</CBadge>
        </CNavItem>
      </router-link>
    </CSidebarNav>
  </CSidebar>
</template>
