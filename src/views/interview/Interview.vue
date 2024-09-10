<template>
  <div>
    <!-- 토글 바 -->
    <CRow>
      <CCol :xs="12">
        <CCard class="mb-4 toggle-card">
          <CCardBody>
            <!-- 토글 바 제목 -->
            <h5 class="toggle-title">선택하신 ISMS 세부항목에 대한 예상 인터뷰 질문을 생성해드립니다.</h5>

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

    <!-- 좌우로 나눈 화면 -->
    <CRow class="align-items-stretch">
      <!-- 왼쪽 화면 -->
      <CCol :xs="5">
        <CCard class="mb-4 left-box">
          <CCardBody class="d-flex flex-column justify-content-between">
            <div>
              <h5 class="info-title">
                기존에 작성하였던 항목 결함 내역을 바탕으로<br>
                AI가 예상 인터뷰 질문을 생성합니다.
              </h5>

              <h6 class="selected-option">선택된 옵션: {{ selectedOption }}</h6>
              <div class="mb-4"></div>
              <CCard class="mb-3">
                <CCardBody>
                  <p class="defect-content"><strong>결함 내역:</strong> 증적 자료 부족</p>
                  <p class="defect-content"><strong>결함 세부 내역:</strong> 이 항목에 대해서는 실제로 이행된 증적 자료가 확인되지 않았습니다. 관련 작업이 수행되었는지 여부를 명확히 입증할 수 있는 자료가 제출되지 않았으며, 내부적으로도 증적 자료를 수집하고 관리하는 체계가 미흡한 상태입니다.

                    또한, 증적 자료를 준비하거나 유지하기 위한 문서화된 절차와 형식이 불명확하여, 이 항목이 규정된 요구사항을 적절하게 충족시키고 있는지 평가할 수 없는 상태입니다.</p>
                </CCardBody>
              </CCard>
            </div>

          </CCardBody>
        </CCard>
      </CCol>

      <!-- 오른쪽 화면 (챗봇 대화창) -->
      <CCol :xs="7">
        <CCard class="mb-4 chat-box">
          <CCardBody>
            <div class="chat-window">
              <div
                  class="message-container"
                  v-for="(msg, index) in messages"
                  :key="index"
                  :class="{ 'bot-message-container': index % 2 === 0, 'user-message-container': index % 2 !== 0 }"
              >
                <img v-if="index % 2 === 0" :src="botImage" alt="avatar" class="avatar">
                <div class="message" :class="{ 'bot-message': index % 2 === 0, 'user-message': index % 2 !== 0 }">
                  {{ msg }}
                </div>
                <img v-if="index % 2 !== 0" :src="userImage" alt="avatar" class="avatar">
              </div>
              <!-- 로딩 스피너 -->
              <div v-if="isLoadingMessage" class="loading-spinner">
                <span class="spinner"></span> AI 답변 생성 중...
              </div>
            </div>
            <div class="chat-input">
              <input v-model="userInput" @keyup.enter="sendMessage" placeholder="메시지를 입력하세요" />
              <CButton @click="sendMessage">전송</CButton>
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
      selectedOption: "1.1.1.2",
      isLoading: false,
      userInput: '',
      isLoadingMessage: false, // 로딩 상태 변수 추가
      messages: ["안녕하세요! 어떤 항목의 예상 인터뷰 질문이 궁금한 지 말씀해주세요."], // 첫 번째 챗봇 메시지
      options: [
        { value: '1.1.1.1', text: '1.1.1.1' },
        { value: '1.1.1.2', text: '1.1.1.2' },
        { value: '1.1.2.1', text: '1.1.2.1' },
        { value: '1.1.2.2', text: '1.1.2.2' },
      ],
      botImage: '../src/assets/images/ai.png', // 챗봇 이미지 경로
      userImage: '../src/assets/images/user.png', // 사용자 이미지 경로
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
    sendMessage() {
      if (this.userInput.trim() !== '') {
        this.messages.push(this.userInput); // 사용자 메시지
        this.userInput = '';

        // 로딩 상태 시작
        this.isLoadingMessage = true;

        // 2초 후 AI 답변 표시
        setTimeout(() => {
          this.isLoadingMessage = false; // 로딩 상태 종료

          // 두 번째 챗봇 대답 설정
          if (this.messages.length === 2) {
            this.messages.push("1.1.1.2에 대해서 작성한 결함 내역과 결함 세부 내역을 말씀해주세요.");
          }
          // 세 번째 지정된 응답
          else if (this.messages.length === 4) {
            this.messages.push(
                "인터뷰 질문 예상 리스트는 다음과 같습니다:\n" +
                "1. 증적 자료 관리 현황에 대한 질문:\n" +
                "\"현재 이 항목에 대한 증적 자료가 제출되지 않았다고 했는데, 해당 작업이 실제로 이행되었음을 입증할 다른 자료가 있습니까?\"\n" +
                "\"증적 자료를 수집하고 관리하는 담당 부서나 담당자는 누구인가요?\"\n" +
                "\"증적 자료를 체계적으로 관리하기 위해 사용하고 있는 시스템이나 도구가 있습니까?\"\n\n" +
                "2. 문서화 절차와 형식에 대한 질문:\n" +
                "\"증적 자료를 문서화할 때 따르는 절차가 있나요? 있다면 그 절차는 어떻게 정의되어 있습니까?\"\n" +
                "\"현재 증적 자료를 준비하거나 유지하기 위한 문서화된 형식이 없는 상태인데, 이 부분을 개선하기 위해 어떤 계획이 있으신가요?\"\n\n" +
                "3. 내부적으로 증적 자료 수집 및 관리 체계의 개선 방향에 대한 질문:\n" +
                "\"증적 자료를 관리하는 체계가 미흡하다고 판단되었는데, 이를 개선하기 위한 구체적인 방안이 있습니까?\"\n" +
                "\"증적 자료가 미흡했던 이유는 무엇이라 생각하십니까? 인력, 시스템, 절차 중 어느 부분에 문제가 있다고 보십니까?\""
            );
          }
        }, 2000); // 2초 지연
      }
    }
  }
};
</script>

<style scoped>
.left-box {
  height: 95%;
}

.chat-box {
  height: 95%;
  display: flex;
  flex-direction: column;
}

.chat-window {
  flex: 1;
  overflow-y: auto;
  padding: 15px;
  border: 3px solid #ddd;
  background-color: #f9f9f9;
  height: 630px;
  white-space: pre-wrap; /* 줄바꿈 유지 */
}

.loading-spinner {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px;
}

.spinner {
  width: 24px;
  height: 24px;
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-top-color: #3498db;
  border-radius: 50%;
  animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* 메시지와 이미지를 묶는 컨테이너 */
.message-container {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.bot-message-container {
  justify-content: flex-start;
}

.user-message-container {
  justify-content: flex-end;
}

.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
}

.user-message-container .avatar {
  margin-left: 15px; /* 사용자 아이콘과 텍스트 사이 간격을 더 넓게 */
}

.message {
  padding: 10px;
  border-radius: 8px;
  max-width: 60%;
  word-wrap: break-word;
  font-size: 18px;
  white-space: pre-wrap; /* 줄바꿈 유지 */
}

.bot-message {
  background-color: #ffe3e3;
  text-align: left;
}

.user-message {
  background-color: #d1c4e9;
  text-align: right;
}

.chat-input {
  display: flex;
  align-items: center;
  margin-top: 15px;
  margin-bottom: 15px;
}

.chat-input input {
  flex: 1;
  padding: 8px;
  margin-right: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.toggle-title {
  font-weight: bold;
}

.info-title {
  color: #4e85bd;
  font-weight: bold;
}
</style>
