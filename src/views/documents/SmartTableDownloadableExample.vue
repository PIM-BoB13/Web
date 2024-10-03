<script setup>
import { ref } from 'vue'
import data from './_data'

const items = ref(data)
const columns = ['name', 'registered', 'role', 'status']
const currentItems = ref(data)
const csvContent = currentItems.value.map((item) => Object.values(item).join(',')).join('\n')
const csvCode = 'data:text/csv;charset=utf-8,SEP=,%0A' + encodeURIComponent(csvContent)
</script>

<template>
  <CLink
    class="btn btn-primary mb-2"
    :href="csvCode"
    download="coreui-table-data.csv"
    target="_blank"
  >
    Download current items (.csv)
  </CLink>
  <CSmartTable
    :items="items"
    :columns="columns"
    column-filter
    table-filter
    cleaner
    :items-per-page="5"
    column-sorter
    pagination
    :table-props="{
      responsive: true,
    }"
  />
</template>
