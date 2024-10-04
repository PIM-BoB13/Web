<template>
  <div>
    <CRow class="align-items-stretch">
      <!-- 왼쪽 화면 (설명 및 버튼) -->
      <CCol :xs="4">
        <CCard class="mb-4 left-box">
          <CCardBody class="d-flex flex-column justify-content-between">
            <div>
              <h5 class="info-title">기존에 작성하였던 항목 결함 내역을 바탕으로 AI가 기업 자료를 생성합니다.</h5>
              <h6 class="selected-option">선택된 옵션: {{ selectedOption }}</h6>

              <div class="mb-4"></div>

              <!-- 결함 내역 추가 -->
              <CCard class="mb-3">
                <CCardBody>
                  <p class="defect-content"><strong>결함 내역:</strong> 암호화.</p>
                  <p class="defect-content"><strong>결함 세부 내역:</strong>
                    현 기업의
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
                style="color: white; width: 100%;"
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
            <h5 class="pdf-viewer-title" v-show="showPdf">AI를 사용해 생성된 문서</h5>
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
      selectedOption: "",
      isLoading: false,
      showPdf: false,
      pdfUrl: "https://example.com/sample.pdf",
    };
  },
  methods: {
    handleCreate() {
      this.isLoading = true;
      // 문서 생성 로직
      setTimeout(() => {
        this.isLoading = false;
        this.showPdf = true;
      }, 2000); // 2초 후 로딩 상태 종료 및 PDF 표시
    },
  },
};
</script>

<style scoped>
.info-title {
  font-size: 1.2rem;
  font-weight: bold;
}

.selected-option {
  font-size: 1rem;
  margin-top: 1rem;
}

.defect-content {
  font-size: 1rem;
  margin-bottom: 1rem;
}

.pdf-viewer-title {
  font-size: 1.2rem;
  margin-bottom: 1rem;
}

.left-box {
  height: 100%;
}

.right-box {
  height: 100%;
}

.loading-button .spinner {
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s infinite linear;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.pdf-viewer iframe {
  border: none;
}
</style>
