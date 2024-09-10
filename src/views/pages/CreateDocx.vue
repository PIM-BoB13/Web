<template>
  <div>
    <!-- 토글 바 -->
    <CRow>
      <CCol :xs="12">
        <CCard class="mb-4">
          <CCardBody>
            <!-- 토글 바 제목 -->
            <h5>문서를 생성할 ISMS 세부항목을 선택하세요</h5>
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

    <!-- 토글 아래 반으로 나뉜 화면 -->
    <CRow>
      <!-- 왼쪽 화면 -->
      <CCol :xs="12">
        <CCard class="mb-4">
          <CCardBody>
            <h5>기존에 작성하였던 항목 결함 내역을 바탕으로 AI가 기업 자료를 생성합니다.</h5>
            <h6>선택된 옵션: {{ selectedOption }}</h6>
            <div class="text-center">
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
    </CRow>

    <!-- PDF 뷰어 -->
    <CRow v-if="showPdf">
      <CCol :xs="12">
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
    // 생성하기 버튼 클릭 시 호출되는 메소드 (로딩 후 PDF 파일 표시)
    handleCreate() {
      if (!this.selectedOption) {
        alert("옵션을 선택해주세요.");
        return;
      }

      this.isLoading = true; // 로딩 상태로 변경

      // 2초 후 로딩 완료 및 PDF 파일 표시
      setTimeout(() => {
        this.isLoading = false;
        this.showPdf = true; // PDF 뷰어를 보여줌
        this.pdfUrl = '/pdf/gptfile.pdf'; // 프로젝트 내 PDF 파일 경로
      }, 2000);
    },
  }
};
</script>

<style scoped>
/* 토글 선택 길이를 조정하기 위한 스타일 */
.toggle-select {
  width: 50%; /* 토글의 선택 길이를 줄임 */
}

/* PDF 뷰어 */
.pdf-viewer {
  border: 1px solid #ccc;
  padding: 10px;
  margin-top: 20px;
}

/* 로딩 중일 때 버튼 스타일 변경 */
.loading-button {
  background-color: pink !important; /* 로딩 중일 때 버튼을 분홍색으로 변경 */
  color: white !important;
  cursor: not-allowed;
}

/* 로딩 중일 때 동그라미 회전 애니메이션 */
.spinner {
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s ease-in-out infinite;
  margin-right: 8px; /* 텍스트와 간격을 위해 오른쪽 여백 */
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* 버튼을 중앙 정렬 */
.text-center {
  text-align: center;
}
</style>
