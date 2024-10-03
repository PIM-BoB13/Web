<script setup>
import { ref } from 'vue'
import SmartTableBasixExample from './SmartTableBasixExample.vue'


// 상태 관리
const selectedFile = ref(null) // 선택한 파일
const isLoading = ref(false) // 로딩 상태
const uploadMessage = ref('') // 업로드 메시지

// 파일 선택 시 처리 함수
const handleFileChange = (event) => {
  selectedFile.value = event.target.files[0]
  uploadMessage.value = '' // 메시지 초기화
}

</script>

<template>

  <div class="menu-name">
    <h4>기업 문서 업로드</h4>
  </div>

  <CRow>
    <CCol :xs="12">
      <CCard class="mb-4">
        <CCardBody>
          <!-- 파일 선택 바 -->
          <div class="mb-3">
            <CInputGroup class="mb-3">
              <CFormInput id="inputGroupFile02" type="file" @change="handleFileChange" />
            </CInputGroup>
          </div>

          <!-- 선택된 파일 이름과 업로드 버튼 -->
          <div class="d-flex align-items-center mb-3">
            <!-- 파일 이름이 들어가는 네모 박스 -->
            <div class="file-name-box p-2 me-3" style="flex-grow: 1; border: 1px solid #ced4da; border-radius: 0.25rem;">
              {{ selectedFile ? selectedFile.name : '선택된 파일이 없습니다.' }}
            </div>
            <!-- 업로드 버튼 -->
            <CButton color="primary" @click="uploadFile" :disabled="isLoading" style="color:white;">
              {{ isLoading ? '업로드 중...' : 'Upload' }}
            </CButton>
          </div>

          <!-- 로딩 스피너와 상태 메시지 -->
          <div v-if="isLoading" class="d-flex justify-content-center mb-3">
            <CSpinner color="primary" class="me-2" />
            <span> 업로드 중입니다...</span>
          </div>

          <!-- 업로드 완료 메시지 (가운데 정렬) -->
          <div v-if="uploadMessage" class="mt-3 text-center">
            <p>{{ uploadMessage }}</p>
          </div>

          <!-- SmartTable 예제 -->
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
