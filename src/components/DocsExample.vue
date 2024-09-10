<script setup>
const props = defineProps({
  href: String,
  tabContentClass: String,
})

const url = `https://coreui.io/vue/docs/${props.href}`
const addClass = props.tabContentClass
</script>

<template>
  <div class="example">
    <CNav variant="underline-border">
    </CNav>
    <CTabContent :class="['rounded-bottom', addClass]">
      <CTabPane class="p-3 preview" visible>
        <slot></slot>
      </CTabPane>
    </CTabContent>
  </div>
</template>
