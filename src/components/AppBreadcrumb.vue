<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useTranslation } from 'i18next-vue'

import router from '@/router'

const breadcrumbs = ref()
const currentBreadcrumb = ref()
const { i18next } = useTranslation()

const getBreadcrumbs = () => {
  return router.currentRoute.value.matched.map((route) => {
    return {
      active: route.path === router.currentRoute.value.fullPath,
      // @ts-expect-error We need to find a solution on how to pass the function.
      name: typeof route.name === 'function' ? route.name() : route.name,
      path: `${router.options.history.base}${route.path}`,
    }
  })
}

router.afterEach(() => {
  breadcrumbs.value = getBreadcrumbs()
  currentBreadcrumb.value = [...breadcrumbs.value].pop().name
})

onMounted(() => {
  breadcrumbs.value = getBreadcrumbs()
  currentBreadcrumb.value = [...breadcrumbs.value].pop().name
})

watch(
  () => i18next.language,
  () => {
    breadcrumbs.value = getBreadcrumbs()
    currentBreadcrumb.value = [...breadcrumbs.value].pop().name
  },
)
</script>

<template>
  <div className="fs-2 fw-semibold">{{ currentBreadcrumb }}</div>
  <CBreadcrumb class="mb-4">
    <CBreadcrumbItem
      v-for="item in breadcrumbs"
      :key="item"
      :href="item.active ? '' : item.path"
      :active="item.active"
    >
      {{ item.name }}
    </CBreadcrumbItem>
  </CBreadcrumb>
</template>
