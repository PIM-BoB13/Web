<script setup>
import { ref } from 'vue'
import data from './_data'


const columns = [
  {
    key: 'name',
    _style: { width: '40%' },
  },
  'registered',
  { key: 'role', _style: { width: '20%' } },
  { key: 'status', _style: { width: '20%' } },
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

const getBadge = (status) => {
  switch (status) {
    case 'Active':
      return 'success'
    case 'Inactive':
      return 'secondary'
    case 'Pending':
      return 'warning'
    case 'Banned':
      return 'danger'
    default:
      'primary'
  }
}

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
    :active-page="3"
    cleaner
    column-filter
    column-sorter
    :columns="columns"
    clickable-rows
    footer
    header
    :items-per-page="5"
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
    <template #status="{ item }">
      <td>
        <CBadge :color="getBadge(item.status)">{{ item.status }}</CBadge>
      </td>
    </template>
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
          <h4>
            {{ item.username }}
          </h4>
          <p class="text-body-secondary">User since: {{ item.registered }}</p>
          <CButton size="sm" color="info" class=""> User Settings </CButton>
          <CButton size="sm" color="danger" class="ml-1"> Delete </CButton>
        </CCardBody>
      </CCollapse>
    </template>
  </CSmartTable>
</template>
