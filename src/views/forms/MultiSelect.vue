<script setup>
const options = [
  {
    value: 0,
    label: 'Angular',
  },
  {
    value: 1,
    label: 'Bootstrap',
  },
  {
    value: 2,
    label: 'React.js',
  },
  {
    value: 3,
    label: 'Vue.js',
    selected: true,
  },
  {
    label: 'backend',
    options: [
      {
        value: 4,
        label: 'Django',
      },
      {
        value: 5,
        label: 'Laravel',
      },
      {
        value: 6,
        label: 'Node.js',
      },
    ],
  },
]
</script>

<template>
  <CRow>
    <CCol :xs="12">
      <CCard class="mb-4">
        <CCardHeader>
          <strong>CoreUI Vue Multi Select</strong>
          <small>with Checkbox (Default Style)</small>
        </CCardHeader>
        <CCardBody>
          <DocsExample href="forms/multi-select.html">
            <CRow>
              <CCol :md="3">
                <CMultiSelect :options="options" :multiple="false" />
              </CCol>
              <CCol :md="3">
                <CMultiSelect :options="options" selection-type="text" />
              </CCol>
              <CCol :md="3">
                <CMultiSelect :options="options" selection-type="tags" />
              </CCol>
              <CCol :md="3">
                <CMultiSelect :options="options" selection-type="counter" />
              </CCol>
            </CRow>
          </DocsExample>
        </CCardBody>
      </CCard>
    </CCol>
    <CCol :xs="12">
      <CCard class="mb-4">
        <CCardHeader>
          <strong>CoreUI Vue Multi Select</strong> <small>with Text</small>
        </CCardHeader>
        <CCardBody>
          <DocsExample href="forms/multi-select.html">
            <CRow>
              <CCol :md="3">
                <CMultiSelect :options="options" options-style="text" :multiple="false" />
              </CCol>
              <CCol :md="3">
                <CMultiSelect :options="options" options-style="text" selection-type="text" />
              </CCol>
              <CCol :md="3">
                <CMultiSelect :options="options" options-style="text" selection-type="tags" />
              </CCol>
              <CCol :md="3">
                <CMultiSelect :options="options" options-style="text" selection-type="counter" />
              </CCol>
            </CRow>
          </DocsExample>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>
