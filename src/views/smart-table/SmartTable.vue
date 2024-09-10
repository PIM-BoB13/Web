<script setup>
import SmartTableBasixExample from './SmartTableBasixExample.vue'
import SmartTableDownloadableExample from './SmartTableDownloadableExample.vue'
import SmartTableSelectableExample from './SmartTableSelectableExample.vue'
</script>

<template>
  <CRow>
    <CCol :xs="12">
      <CCard class="mb-4">
        <CCardBody>
          <div class="mb-3">
            <CFormSelect aria-label="Default select example">
              <option>파일 선택</option>
              <option v-for="option in options" :key="option.value" :value="option.value">
                {{ option.text }}
              </option>
            </CFormSelect>
          </div>
          <CInputGroup class="mb-3">
            <CFormInput id="inputGroupFile02" type="file" />
            <CButton color="primary" type="submit">Upload</CButton>
          </CInputGroup>
          <DocsExample href="">
            <SmartTableBasixExample />
          </DocsExample>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
export default {
  data() {
    return {
      options: [
        { value: '1', text: '정보보호 및 개인정보보호 보고 체계' },
        { value: '2', text: '정보보호 및 개인정보보호 정책·지침' },
        { value: '3', text: '정보보호계획 및 내부 관리계획' },
        { value: '4', text: '직무기술서' },
        { value: '5', text: '정보보호 및 개인정보보호 조직도' },
        { value: '6', text: '정보보호 및 개인정보보호 관리체계 범위 정의서' },
        { value: '7', text: '정보자산 및 개인정보 목록' },
        { value: '8', text: '문서 목록' },
        { value: '9', text: '정보보호 및 개인정보보호 정책·지침·절차서' },
        { value: '10', text: '정보보호 및 개인정보보호 활동 연간 추진계획서' },
        { value: '11', text: '정보자산 및 개인정보 자산분류 기준' },
        { value: '12', text: '정보자산 및 개인정보 보안등급' },
        { value: '13', text: '정보서비스 현황표' }
      ]
    }
  }
}
</script>