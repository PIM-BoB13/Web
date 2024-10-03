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
      messages: ["안녕하세요! 어떤 항목의 보완방향이 \n궁금한 지 말씀해주세요."], // 첫 번째 챗봇 메시지
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
            this.messages.push("2.6.1.1에 대한 구체적인 보완방향뿐만 아니라 \n취해야 할 조치와 필요 추가 정보도 필요하신가요?");
          }
          // 세 번째 지정된 응답
          else if (this.messages.length === 4) {
            this.messages.push(
              this.messages.push(
                "AI 분석 결과 예시는 다음과 같습니다:\n" +
                "\n" +
                "1. 항목: 2.6.4.1 데이터베이스 접근 관리\n" +
                "\"요구 사항: 데이터베이스의 테이블 목록 등 저장, 관리되고 있는 정보를 식별하고 있는가?\"\n" +
                "\"이행률: 65% (2점)\"\n" +
                "\"데이터베이스 테이블 목록은 적절하게 작성되었으나, 접근자 계정 및 권한 목록에서 중요한 정보가 누락되었습니다.\"\n\n" +
                "2. AI 피드백: 미흡 항목 보완 방향\n" +
                "\"미흡 항목 1: 접근자 계정 및 권한 목록 불완전\"\n" +
                "\"판단 근거: 접근자 계정 목록에 포함된 계정 정보가 일부만 기록되어 있으며, 권한 정보가 빠진 계정이 존재합니다.\"\n" +
                "\"보완 방향: 접근자 계정 목록을 업데이트하여 모든 계정에 대한 권한 정보를 포함시키십시오. 특히, 관리자 권한을 가진 계정과 외부 접속 권한을 가진 계정에 대한 정보가 반드시 포함되어야 합니다.\"\n\n" +
                "\"미흡 항목 2: 테이블 접근 권한 정보 누락\"\n" +
                "\"판단 근거: 데이터베이스 테이블 목록에는 테이블명과 컬럼 정보는 기록되었으나, 해당 테이블에 대한 접근 권한 정보가 누락되었습니다.\"\n" +
                "\"보완 방향: 각 테이블에 접근할 수 있는 사용자 또는 사용자 그룹의 권한을 추가하여, 테이블마다 접근 권한이 명확하게 정의되도록 해야 합니다.\"\n\n" +
                "4. 최종 점수 및 권장 조치\n" +
                "\"현재 항목 점수: 2점 (이행률 65%)\"\n" +
                "\"권장 조치: 미흡한 부분을 보완하면 이 항목의 점수를 4점 이상으로 향상시킬 수 있습니다. 데이터베이스 접근자 권한 정보를 완전하게 포함하고, 테이블별 접근 권한을 명확히 기록하는 것이 핵심입니다.\"\n"
              )

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
