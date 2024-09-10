<script setup>
import { ref } from 'vue'
import data from './_data'


const columns = [
  {
    key: '문서명',
    _style: { width: '40%' },
  },
  '확장자',
  { key: '최종변경일자', _style: { width: '20%' } },
  { key: '크기', _style: { width: '20%' } },
  {
    key: 'show_details',
    label: '',
    _style: { width: '1%' },
    filter: false,
    sorter: false,
  },
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
  <template #show_details="{ item }">
    <td class="py-2">
      <CButton color="primary" variant="outline" square size="sm" @click="toggleDetails(item)">
        {{ details.includes(item.id) ? 'Hide' : 'Show' }}
      </CButton>
    </td>
  </template>
  <template #details="{ item }">
    <CCollapse :visible="details.includes(item.id)">
      <CCardBody>
        <p class="text-body-secondary"v-html="item.내용"></p>
      </CCardBody>
    </CCollapse>
  </template>
  </CSmartTable>
</template>
