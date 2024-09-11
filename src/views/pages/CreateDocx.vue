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
                  <p class="defect-content"><strong>결함 내역: </strong>암호화 대상과 암호 정책 수립 과정에서 법적 요구사항을 충분히 반영하지 않아 개인정보 및 주요정보 보호에 미흡함이 발견되었습니다.

                  </p>
                  <p class="defect-content"><strong>결함 세부 내역:</strong>
                    현 기업의 개인정보 및 주요정보 보호를 위한 암호화 정책이 법적 요구사항에 맞춰 적절히 수립되지 않은 것으로 확인되었습니다. 구체적으로는, 암호화 대상이 불명확하거나 누락된 부분이 있었으며, 암호 강도나 암호 사용 정책이 현행 법적 기준에 미달했습니다. 특히, 개인정보 및 주요정보를 저장하거나 전송할 때 일관된 암호화 절차가 적용되지 않았고, 데이터 전달 시에도 보호되지 않은 채 전송되는 사례가 발견되었습니다. 이는 기업이 요구되는 법적 기준에 따라 보호 대상을 명확하게 정의하지 않았으며, 암호화 기술 적용이 일관성 있게 이루어지지 않았음을 의미합니다.
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
        <CCard class="mb-4 right-box">
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
      selectedOption: "2.6.1.1", // 기본값으로 1.1.1.2를 선택
      isLoading: false,   // 로딩 상태
      showPdf: false,     // PDF 뷰어를 보여줄지 여부
      pdfUrl: "",         // PDF 파일 경로
      options: [
        { value: '1.1.1.1', text: '1.1.1.1' },
        { value: '1.1.1.2', text: '1.1.1.2' },
        { value: '1.1.2.1', text: '1.1.2.1' },
        { value: '1.1.2.2', text: '1.1.2.2' },
        { value: '1.1.3.1', text: '1.1.3.1' },
        { value: '1.1.3.2', text: '1.1.3.2' },
        { value: '1.1.4.1', text: '1.1.4.1' },
        { value: '1.1.4.2', text: '1.1.4.2' },
        { value: '2.6.1.1', text: '2.6.1.1' },
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
        this.pdfUrl = '/pdf/Gpt-make-file.pdf';
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
  margin-top: 10px;
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
.right-box{
  height: 97%;
}
</style>
