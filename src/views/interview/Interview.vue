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
                  <p class="defec-content"><strong>결함 내역: </strong>암호화 대상과 암호 정책 수립 과정에서 법적 요구사항을 충분히 반영하지 않아 개인정보 및 주요정보 보호에 미흡함이 발견되었습니다.</p>
                  <p class="defec-content"><strong>결함 세부 내역: </strong>현 기업의 개인정보 및 주요정보 보호를 위한 암호화 정책이 법적 요구사항에 맞춰 적절히 수립되지 않은 것으로 확인되었습니다. 구체적으로는, 암호화 대상이 불명확하거나 누락된 부분이 있었으며, 암호 강도나 암호 사용 정책이 현행 법적 기준에 미달했습니다. 특히, 개인정보 및 주요정보를 저장하거나 전송할 때 일관된 암호화 절차가 적용되지 않았고, 데이터 전달 시에도 보호되지 않은 채 전송되는 사례가 발견되었습니다. 이는 기업이 요구되는 법적 기준에 따라 보호 대상을 명확하게 정의하지 않았으며, 암호화 기술 적용이 일관성 있게 이루어지지 않았음을 의미합니다.</p>
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
      selectedOption: "2.6.1.2",
      isLoading: false,
      userInput: '',
      isLoadingMessage: false, // 로딩 상태 변수 추가
      messages: ["안녕하세요! 어떤 항목의 예상 인터뷰 질문이 \n궁금한 지 말씀해주세요."], // 첫 번째 챗봇 메시지
      options: [
        { value: '1.1.1.1', text: '1.1.1.1' },
        { value: '1.1.1.2', text: '1.1.1.2' },
        { value: '1.1.2.1', text: '1.1.2.1' },
        { value: '1.1.2.2', text: '1.1.2.2' },
        { value: '1.1.3.1', text: '1.1.3.1' },
        { value: '1.1.3.2', text: '1.1.3.2' },
        { value: '1.1.4.1', text: '1.1.4.1' },
        { value: '1.1.4.2', text: '1.1.4.2' },
        { value: '2.6.1.2', text: '2.6.1.2' },
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
            this.messages.push("2.6.1.2에 대해서 작성한 결함 내역과 결함 세부 내역을 말씀해주세요.");
          }
          // 세 번째 지정된 응답
          else if (this.messages.length === 4) {
            this.messages.push(
                "인터뷰 질문 예상 리스트는 다음과 같습니다:\n" +
                "1. 암호화 정책 관련 질문:\n" +
                "\"개인정보 및 주요정보의 암호화 정책은 문서화되어 있습니까? 이 정책은 누가 승인하고 관리하고 있습니까?\"\n" +
                "\"암호화 정책은 얼마나 자주 검토되고 업데이트되며, 최신 법적 요구사항을 반영하고 있습니까?\"\n" +
                "\"암호화 대상(개인정보 및 주요정보)을 어떻게 정의하고 있습니까? 암호화 대상이 명확하게 구분되고 있습니까?\"\n\n" +
                "2. 저장 시 암호화 관련 질문:\n" +
                "\"개인정보 및 주요정보가 저장될 때 암호화는 어떻게 적용되고 있습니까?\"\n" +
                "\"데이터베이스 및 파일 시스템에 저장된 개인정보가 암호화되고 있는지 확인할 수 있는 로그나 증빙 자료가 있습니까?\"\n" +
                "\"저장된 민감 데이터(예: 비밀번호)는 어떤 방식으로 암호화되고 있습니까? AES-256과 같은 강력한 암호화 알고리즘을 사용하고 있습니까?\"\n" +
                "\"암호화되지 않은 상태로 저장된 개인정보가 있는지 점검하는 절차가 있습니까?\"\n\n" +
                "3. 전송 시 암호화 관련 질문:\n" +
                "\"개인정보 및 주요정보가 내부 또는 외부 네트워크로 전송될 때, 어떤 암호화 프로토콜(예: SSL/TLS)이 적용되고 있습니까?\"\n" +
                "\"전송 중 암호화를 적용하는 구체적인 방안이 무엇입니까? 모든 전송 구간에서 일관되게 적용되고 있습니까?\"\n" +
                "\"외부로 데이터가 전송될 때 이를 모니터링하고 암호화 여부를 확인하는 절차가 있습니까?\"\n\n" +
                "4. 전달 시 암호화 관련 질문:\n" +
                "\"개인정보 및 주요정보를 외부 파트너나 고객에게 전달할 때, 물리적 매체(USB, 외장하드) 및 전자적 파일의 암호화는 어떻게 적용되고 있습니까?\"\n" +
                "\"이메일이나 클라우드 서비스를 통해 전달할 때, PGP, S/MIME 등과 같은 암호화 기술을 사용하고 있습니까?\"\n" +
                "\"물리적 매체를 사용할 경우 암호화된 USB, 암호화된 디스크 등을 사용하고 있습니까? 그 절차는 어떻게 관리되고 있습니까?\"\n\n" +
                "5. 암호화 키 관리 관련 질문:\n" +
                "\"암호화 키는 어떤 방식으로 생성되고 관리되고 있습니까? HSM(하드웨어 보안 모듈)과 같은 안전한 키 관리 시스템을 사용하고 있습니까?\"\n" +
                "\"암호화 키의 사용 주기와 교체 주기는 어떻게 관리되고 있습니까?\"\n" +
                "\"암호화 키가 유출되거나 잘못 사용되는 것을 방지하기 위한 모니터링 및 통제 절차가 있습니까?\"\n\n" +
                "6. 암호화 절차 준수 여부 확인 질문:\n" +
                "\"암호화 절차가 실제로 일관되게 적용되고 있는지 확인하기 위한 내부 감사 절차가 있습니까?\"\n" +
                "\"암호화 적용 여부에 대한 주기적인 점검 또는 테스트를 진행하고 있습니까?\"\n" +
                "\"암호화 정책이 모든 관련 부서 및 직원들에게 명확히 전달되고 있으며, 관련 교육이 이루어지고 있습니까?\"\n\n" +
                "7. 법적 요구사항 준수 여부 관련 질문:\n" +
                "\"개인정보 보호법, GDPR 등 관련 법적 요구사항에 따른 암호화 의무 사항을 어떻게 반영하고 있습니까?\"\n" +
                "\"법적 요구사항에 따라 암호화 대상과 강도가 적절하게 설정되었는지 확인하는 절차가 있습니까?\"\n"

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

.defec-content {
  font-size: 1.3rem;
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
