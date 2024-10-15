<template>
  <div class="popup-overlay" @click.self="closePopup">
    <div class="popup-content">
      <button class="close-btn" @click="closePopup">X</button>
      <div class="popup-body">

        <!-- 기존 카테고리 내용 -->
        <CCard class="mb-4">
          <CCardHeader class="header-title">
            {{ item.category }} 상세 내용
          </CCardHeader>
          <CCBody>
            <CTable>
              <CTableBody>
                <CTableRow>
                  <CTableDataCell class="text-start padded-cell wide-cell">
                    <strong>구분</strong>
                  </CTableDataCell>
                  <CTableDataCell class="text-start padded-cell">{{ item.category }}</CTableDataCell>
                </CTableRow>
                <CTableRow>
                  <CTableDataCell class="text-start padded-cell wide-cell">
                    <strong>관련 법률</strong>
                  </CTableDataCell>
                  <CTableDataCell class="text-start padded-cell">{{ item.law }}</CTableDataCell>
                </CTableRow>
                <CTableRow>
                  <CTableDataCell class="text-start padded-cell wide-cell">
                    <strong>준수 여부</strong>
                  </CTableDataCell>
                  <CTableDataCell class="text-start padded-cell align-middle">{{ item.compliance }}</CTableDataCell>
                </CTableRow>
              </CTableBody>
            </CTable>
          </CCBody>
        </CCard>

        <!-- 관련 법률 피드백 - AI 추천 섹션 -->
        <CCard class="mb-4">
          <CCardHeader class="header-title ai-section">
            관련 법률 피드백
            <span class="ai-badge-feedback">AI</span>
          </CCardHeader>
          <CCBody>
            <CTable>
              <CTableBody>
                <CTableRow v-for="(law, index) in item.law.split(',')" :key="index">
                  <CTableDataCell class="text-start padded-cell">
                    <div class="law-title" @click="toggleFeedback(index)">
                      <span class="law-text">- {{ law.trim() }}</span>
                      <button class="toggle-btn" @click.stop="toggleFeedback(index)">
                        <span v-if="isFeedbackVisible(index)">▲</span>
                        <span v-else>▼</span>
                      </button>
                    </div>
                    <div v-if="isFeedbackVisible(index)" class="feedback-content">
                      {{ item.feedback.split(',')[index].trim() }}
                    </div>
                  </CTableDataCell>
                </CTableRow>
              </CTableBody>
            </CTable>
          </CCBody>
        </CCard>

        <!-- 개정 전과 개정안 테이블을 나란히 배치 -->
        <div class="revision-tables">
          <!-- 개정 전 테이블 -->
          <CCard class="mb-5 revision-table">
            <CCardHeader class="header-title">개정 전</CCardHeader>
            <CCBody>
              <div class="text-left red-text padded-cell1">
                제1조(목적)
                이 지침은 물리적 보안 통제에 필요한 사항을 정함으로써 기업의 주요 정보자산을 보호함을 목적으로 한다.
              </div>
            </CCBody>
          </CCard>

          <!-- 개정안 테이블 -->
          <CCard class="mb-5 revision-table">
            <CCardHeader class="header-title ai-section">
              개정안
              <span class="ai-badge-revision">AI</span>
            </CCardHeader>
            <CCBody>
              <div class="text-left blue-text padded-cell1">
                제1조(목적)
                이 지침은 기업의 주요 정보자산을 물리적 및 기술적 위협으로부터 보호하기 위해 물리적, 기술적, 관리적 보안 통제 절차와 기준을 수립하고, 이를 효과적으로 운영 및 관리함으로써 기업의 정보 보호 수준을 강화하는 것을 목적으로 한다. 또한, 개인정보 보호법 제29조에 따라 최고정보보호책임자(CISO)를 지정하여, 정보보호 및 개인정보 보호 관리 체계를 총괄하고 이를 유지·개선하는 것을 목표로 한다.
              </div>
            </CCBody>
          </CCard>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 이미지 파일을 import
import aiIcon from '@/assets/images/ai.png';  // 절대 경로로 이미지 불러오기

export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      visibleFeedbacks: [],
      aiIcon,  // 불러온 이미지 aiIcon을 data에 추가
    };
  },
  methods: {
    closePopup() {
      this.$emit('close');
    },
    toggleFeedback(index) {
      const feedbackIndex = this.visibleFeedbacks.indexOf(index);
      if (feedbackIndex > -1) {
        this.visibleFeedbacks.splice(feedbackIndex, 1);
      } else {
        this.visibleFeedbacks.push(index);
      }
    },
    isFeedbackVisible(index) {
      return this.visibleFeedbacks.includes(index);
    },
  },
};
</script>

<style scoped>
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  z-index: 1000;
}

.popup-content {
  width: 50%;
  height: 90%;
  bottom: 14px;
  background-color: white;
  border-radius: 10px 0 0 10px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  position: relative;
  animation: slideIn 0.3s ease-in-out;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}

.popup-body {
  padding: 60px 20px 10px;
  overflow-y: auto;
  flex-grow: 1;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #333;
  z-index: 1001;
}

.close-btn:hover {
  color: #d50808;
}

.text-start {
  text-align: left;
}

.text-center {
  text-align: center;
}

.header-title {
  font-size: 1.5em;
  font-weight: bold;
}

.red-text {
  color: red;
}

.blue-text {
  color: blue;
}

.padded-cell {
  padding: 10px;
}

.padded-cell1 {
  padding: 20px;
}

.align-middle {
  vertical-align: middle;
}

.wide-cell {
  width: 15%;
}

.law-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}

.law-text {
  font-weight: bold;
}

.law-title:hover .law-text {
  text-decoration: underline;
}

.toggle-btn {
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
  color: #545454;
  transition: color 0.3s, transform 0.3s;
  padding: 5px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.toggle-btn:hover {
  color: #000000;
  transform: scale(1.1);
  background-color: #f0f0f0;
}

.feedback-content {
  margin-top: 10px;
  padding: 10px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 4px;
}

/* AI 추천 섹션 디자인 */
.ai-section {
  display: flex;
  align-items: center;  /* 세로 중앙 정렬 */
}

/* 관련 법률 피드백용 AI 뱃지 */
.ai-badge-feedback {
  background-color: #1c25a9;
  color: white;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 0.65em;
  margin-left: 10px;
  display: flex;
  align-items: center;  /* 뱃지 내부 텍스트 세로 중앙 정렬 */
}

/* 개정안용 AI 뱃지 */
.ai-badge-revision {
  background-color: #1c25a9;
  color: white;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 0.65em;
  margin-left: 10px;
  display: flex;
  align-items: center;  /* 뱃지 내부 텍스트 세로 중앙 정렬 */
}

/* 개정 전/개정안 테이블을 나란히 배치하기 위한 스타일 */
.revision-tables {
  display: flex;
  justify-content: space-between;  /* 테이블을 양쪽에 배치 */
}

.revision-table {
  width: 48%;  /* 각각의 테이블이 전체 화면의 절반 크기를 차지하도록 설정 */
}
</style>
