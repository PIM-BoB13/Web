<script setup>
import SmartTableBasixExample from './SmartTableBasixExample.vue'
import SmartTableDownloadableExample from './SmartTableDownloadableExample.vue'
import SmartTableSelectableExample from './SmartTableSelectableExample.vue'
</script>

<template>
  <CRow>
    <CCol :xs="12">
      <CCard class="mb-4">
        <CCardHeader>
          <strong>CoreUI Smart Table</strong> <small>Vue Table Component</small>
        </CCardHeader>
        <CCardBody>
          <DocsExample href="components/smart-table.html">
            <SmartTableBasixExample />
          </DocsExample>
        </CCardBody>
      </CCard>
      <CCard class="mb-4">
        <CCardHeader>
          <strong>CoreUI Smart Table</strong> <small>Vue Table Component</small>
        </CCardHeader>
        <CCardBody>
          <DocsExample href="components/smart-table.html">
            <SmartTableSelectableExample />
          </DocsExample>
        </CCardBody>
      </CCard>
      <CCard class="mb-4">
        <CCardHeader>
          <strong>CoreUI Smart Table</strong>
          <small>Table with selectable rows</small>
        </CCardHeader>
        <CCardBody>
          <DocsExample href="components/smart-table.html">
            <SmartTableDownloadableExample />
          </DocsExample>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>
