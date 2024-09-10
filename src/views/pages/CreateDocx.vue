<template>
  <div>
    <!-- 토글 바 -->
    <CRow>
      <CCol :xs="12">
        <CCard class="mb-4 toggle-card">
          <CCardBody>
            <!-- 토글 바 제목 -->
            <h5 class="toggle-title">문서를 생성할 ISMS 세부항목을 선택하세요</h5>
            <!-- 가로 토글 바 -->
            <div class="mb-3 d-flex justify-content-between align-items-center">
              <CFormSelect v-model="selectedOption" aria-label="Select option" class="toggle-select">
                <option disabled value="">Select an option</option>
                <option v-for="option in options" :key="option.value" :value="option.value">
                  {{ option.text }}
                </option>
              </CFormSelect>
            </div>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>

    <!-- 토글 아래 반으로 나뉜 화면, 세로 길이 맞춤 -->
    <CRow class="align-items-stretch">
      <!-- 왼쪽 화면 (설명 및 버튼) -->
      <CCol :xs="4">
        <CCard class="mb-4 left-box">
          <CCardBody class="d-flex flex-column justify-content-between">
            <div>
              <!-- 위아래 공백 추가 -->
              <h5 class="info-title">기존에 작성하였던 항목 결함 내역을 바탕으로 AI가 기업 자료를 생성합니다.</h5>
              <!-- 글씨 크기 키움 -->
              <h6 class="selected-option">선택된 옵션: {{ selectedOption }}</h6>
              <!-- 간격 추가 -->
              <div class="mb-4"></div>
              <!-- 결함 내역 추가 -->
              <CCard class="mb-3">
                <CCardBody>
                  <!-- 글씨 크기 키움 -->
                  <p class="defect-content"><strong>결함 내역:</strong> 증적 자료 부족</p>
                  <p class="defect-content"><strong>결함 세부 내역:</strong>
                    이 항목에 대해서는 실제로 이행된 증적 자료가 확인되지 않았습니다. 관련 작업이 수행되었는지 여부를 명확히 입증할 수 있는 자료가 제출되지 않았으며, 내부적으로도 증적 자료를 수집하고 관리하는 체계가 미흡한 상태입니다.

                    또한, 증적 자료를 준비하거나 유지하기 위한 문서화된 절차와 형식이 불명확하여, 이 항목이 규정된 요구사항을 적절하게 충족시키고 있는지 평가할 수 없는 상태입니다.

                  </p>
                </CCardBody>
              </CCard>
            </div>
            <div class="text-center mt-auto">
              <CButton
                  :class="{ 'loading-button': isLoading }"
                  @click="handleCreate"
                  :disabled="isLoading"
                  color="success"
              >
                <span v-if="isLoading">
                  <span class="spinner"></span> 로딩중...
                </span>
                <span v-else>문서 생성하기</span>
              </CButton>
            </div>
          </CCardBody>
        </CCard>
      </CCol>

      <!-- 오른쪽 화면 (PDF 뷰어) -->
      <CCol :xs="8">
        <CCard class="mb-4">
          <CCardBody>
            <h5>생성된 문서</h5>
            <!-- PDF를 보여줄 박스 -->
            <div class="pdf-viewer">
              <iframe :src="pdfUrl" width="100%" height="600px"></iframe>
            </div>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedOption: "1.1.1.2", // 기본값으로 1.1.1.2를 선택
      isLoading: false,   // 로딩 상태
      showPdf: false,     // PDF 뷰어를 보여줄지 여부
      pdfUrl: "",         // PDF 파일 경로
      options: [
        { value: '1.1.1.1', text: '1.1.1.1' },
        { value: '1.1.1.2', text: '1.1.1.2' },
        { value: '1.1.2.1', text: '1.1.2.1' },
        { value: '1.1.2.2', text: '1.1.2.2' },
      ],
    };
  },
  methods: {
    handleCreate() {
      if (!this.selectedOption) {
        alert("옵션을 선택해주세요.");
        return;
      }

      this.isLoading = true;

      setTimeout(() => {
        this.isLoading = false;
        this.showPdf = true;
        this.pdfUrl = '/pdf/gptfile.pdf';
      }, 2000);
    },
  }
};
</script>

<style scoped>
/* 토글 바 스타일 */
.toggle-card {
  background-color: #f8f9fa;
}

.toggle-title {
  font-weight: bold;
}

.toggle-select {
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  background-color: #f8f9fa;
}

/* 정보 문구 파란색 및 위아래 공백 */
.info-title {
  color: #4e85bd;
  font-weight: bold;
}

/* 선택된 옵션 글씨 크기 증가 */
.selected-option {
  font-size: 1.15rem;
}

/* 결함 내용 글씨 크기 증가 */
.defect-content {
  font-size: 1.2rem;
}

/* PDF 뷰어 스타일 */
.pdf-viewer {
  padding: 15px;
  margin-top: 20px;
}

/* 로딩 중일 때 버튼 스타일 */
.loading-button {
  background-color: #17a2b8 !important;
  color: white !important;
  cursor: not-allowed;
}

.spinner {
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s ease-in-out infinite;
  margin-right: 8px;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.text-center {
  text-align: center;
}

/* 왼쪽 박스 높이 맞추기 */
.left-box {
  height: 97%;
}

</style>
