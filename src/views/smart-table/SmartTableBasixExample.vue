<script setup>
import { ref } from 'vue'
import data from './_data'


const columns = [
  {
    key: '문서명',
    _style: { width: '40%' },
  },
  '확장자',
  { key: '시간', _style: { width: '20%' } },
  { key: '크기', _style: { width: '20%' } },
]

const items = ref(data)
const details = ref([])

const toggleDetails = (item) => {
  if (details.value.includes(item.id)) {
    details.value = details.value.filter((_item) => _item !== item.id)
    return
  }

  details.value.push(item.id)
}
</script>

<template>
  <CSmartTable
    column-sorter
    :columns="columns"
    clickable-rows
    items-per-page-select
    :items="items"
    pagination
    table-filter
    :table-props="{
      hover: true,
      striped: true,
      responsive: true,
    }"
  >
  </CSmartTable>
</template>
