<script setup>
import { ref } from 'vue'
import { useTranslation } from 'i18next-vue'
// eslint-disable-next-line no-unused-vars
const { t, i18next } = useTranslation()

import {
  CChartBarExample,
  CChartDoughnutExample,
  CChartRadarExample,
} from './index.js'
import router from "../../router";

const isPopupVisible = ref(false)
const defectSummary = ref('')
const defectDetail = ref('')
const reasonForFailure = ref('') // 선택된 미이행 사유

function openPopup() {
  isPopupVisible.value = true
}

function closePopup() {
  isPopupVisible.value = false
}

function submitDefect() {
  console.log("Defect Summary:", defectSummary.value)
  console.log("Defect Detail:", defectDetail.value)
  console.log("Reason for Failure:", reasonForFailure.value)

  // 선택된 미이행 사유에 따라 메시지 및 동작 처리
  setTimeout(() => {
    if (reasonForFailure.value === '문서(정책 또는 지침) 부족') {
      alert("제출되었습니다.\n'문서(정책 또는 지침) 부족'을 선택하셨으므로 <문서 생성>으로 이동합니다.");
      router.push('/pages/ISMS'); // '/pages/createdocx'로 페이지 이동
    } else {
      alert("제출되었습니다.");
    }
    closePopup();
  }, 1000)
}
</script>

<template>
  <div class="container">
    <div class="search-section">
      <CForm class="d-flex mb-3">
        <CInputGroup>
          <CInputGroupText id="search-addon" class="bg-body-secondary border-0 px-1">
            <CIcon icon="cil-search" size="lg" class="my-1 mx-2 text-body-secondary" />
          </CInputGroupText>
          <CFormInput
              v-model="searchQuery"
              :placeholder="t('search')"
              ariaLabel="Search"
              ariaDescribedby="search-addon"
              class="bg-body-secondary border-0"
          />
        </CInputGroup>
      </CForm>
      <div class="search-results-1">
        <div class="title-section">
          <h5>2.6.1.1 세부 점검 항목</h5>
        </div>
        <div class="content-section">
          <p>{{ specificOutput }}</p>
        </div>
      </div>
      <div class="search-results-2">
        <h5 class="document-title">관련 문서 목록</h5>
        <div v-for="(result, index) in filteredResults" :key="result.id" @click="selectResult(result)" class="result-item">
          {{ index + 1 }}. {{ result.name }}
        </div>
      </div>
      <div class="button-container">
        <CButton color="info" class="me-2 flex-grow-1" style="color: white;">이행</CButton>
        <CButton color="danger" class="flex-grow-1" style="color: white;" @click="openPopup">결함</CButton>
      </div>
    </div>
    <div class="right-content">
      <div v-if="selectedResult" v-html="selectedResult.content"></div>
    </div>
    <!-- 팝업창 -->
    <div v-if="isPopupVisible" class="popup-overlay">
      <div class="popup-content">
        <h3>결함 입력</h3>
        <CForm>
          <!-- 미이행 사유 선택 -->
          <label for="reasonForFailure" class="form-label">미이행 사유</label>
          <CFormSelect id="reasonForFailure" v-model="reasonForFailure">
            <option value="">선택하세요</option>
            <option value="증적 부족">증적 부족</option>
            <option value="문서(정책 또는 지침) 부족">문서(정책 또는 지침) 부족</option>
          </CFormSelect>
          <!-- 입력칸 사이 거리 -->
          <div class="input-gap"></div>
          <!-- 결함 내역 요약 제목 -->
          <label for="defectSummary" class="form-label">결함 내역 요약</label>
          <CFormInput id="defectSummary" v-model="defectSummary" placeholder="결함 내역을 요약해 주세요" />
          <!-- 입력칸 사이 거리 -->
          <div class="input-gap"></div>
          <!-- 결함 상세 내역 제목 -->
          <label for="defectDetail" class="form-label">결함 상세 내역</label>
          <CFormTextarea id="defectDetail" v-model="defectDetail" placeholder="결함 상세 내역을 작성해 주세요" rows="5" />
          <!-- 제출 및 취소 버튼 -->
          <div class="popup-buttons">
            <CButton color="danger" @click="submitDefect" style="color: white;">제출</CButton>
            <CButton color="secondary" @click="closePopup">취소</CButton>
          </div>
        </CForm>
      </div>
    </div>
  </div>
</template>



<script>
const incidentResponse = `
<h3>기업의 암호통제 정책</h3>

<p>개인정보 및 주요정보의 안전한 관리를 위해 암호화 정책을 수립하고 이를 체계적으로 이행하고 있습니다. <mark>본 암호통제 정책은 저장, 전송, 전달 시 암호화 적용 방안을 규정하며, 주요 정보의 보안을 보장합니다.</mark></p>

<h4>1. 목적</h4>
<p>본 정책의 목적은 개인정보 및 주요정보가 무단으로 유출되거나 손상되지 않도록 암호화를 통해 보호하는 것입니다. 법적 요구사항을 준수하며, 정보의 기밀성, 무결성, 가용성을 유지하는 것을 목표로 합니다.</p>

<h4>2. 암호화 대상</h4>
<p>암호화는 다음의 정보에 대해 필수적으로 적용됩니다:</p>
<ul>
    <li>개인 식별 정보 (이름, 주민등록번호, 주소, 전화번호 등)</li>
    <li>금융 정보 (신용카드 번호, 은행 계좌 정보 등)</li>
    <li>기업의 주요 기밀 정보 (재무 정보, 경영 계획, 기술 자료 등)</li>
    <li>그 외 법적으로 보호가 요구되는 모든 정보</li>
</ul>

<h4>3. 암호화 강도</h4>
<p><mark>암호화는 데이터의 민감도에 따라 적절한 수준의 강도를 사용하여 적용됩니다:</mark></p>
<ul>
    <li>대칭키 암호화: AES-256 이상의 암호화 알고리즘 사용</li>
    <li>비대칭키 암호화: RSA 2048비트 이상의 강도 사용</li>
    <li>해시 알고리즘: SHA-256 이상의 해시 함수 사용</li>
</ul>

<h4>4. 암호 키 관리</h4>
<p>암호화에 사용되는 암호 키는 다음과 같은 절차에 따라 관리됩니다:</p>
<ul>
    <li>암호 키 생성: 안전한 환경에서 생성되며, 키는 무작위 값으로 생성됩니다.</li>
    <li>암호 키 보관: 암호 키는 안전한 키 관리 시스템에서 보관됩니다.</li>
    <li>암호 키 교체: 암호 키는 정기적으로 교체되며, 민감한 정보는 1년 이내에 키를 교체합니다.</li>
    <li>암호 키 폐기: 더 이상 사용되지 않는 키는 안전하게 폐기되며, 복구가 불가능하도록 처리됩니다.</li>
</ul>

<h4>5. 저장 시 암호화</h4>
<p>모든 개인정보 및 주요정보는 저장될 때 AES-256 암호화를 사용하여 보호됩니다. 데이터베이스, 파일 시스템 및 클라우드 스토리지 모두 해당 암호화를 적용받습니다.</p>

<h4>6. 전송 시 암호화</h4>
<p>네트워크를 통해 전송되는 개인정보 및 주요정보는 SSL/TLS 프로토콜을 사용하여 암호화됩니다. 내부 및 외부 네트워크에서 모두 암호화된 채널을 통해 전송됩니다.</p>

<h4>7. 전달 시 암호화</h4>
<p>개인정보 및 주요정보가 외부로 전달될 때는 암호화된 USB 드라이브, 이메일 암호화(PGP, S/MIME) 등을 사용합니다. 물리적 매체를 사용할 경우에도 데이터는 암호화된 상태로 전달되어야 합니다.</p>

<h4>8. 법적 준수</h4>
<p>본 암호통제 정책은 개인정보 보호법, 정보통신망법, GDPR 등의 법적 요구사항을 준수합니다. 암호화 대상과 강도는 법적 기준에 따라 주기적으로 검토되고 업데이트됩니다.</p>

<h4>9. 교육 및 훈련</h4>
<p>모든 직원은 정기적으로 암호화 절차와 관련된 교육을 받아야 하며, 암호화 적용 방법과 절차를 숙지해야 합니다. 또한, 암호 키 관리 및 정보 보호에 대한 모의 훈련을 정기적으로 실시합니다.</p>

`;

const securityPlan = `
<h3>암호화 관리 정책</h3>

<p><mark>암호화 관리 정책은 정보의 기밀성과 무결성을 보호하기 위해 암호화 기술을 효과적으로 적용, 운영, 관리하는 기준을 수립하고 이를 체계적으로 관리하는 것을 목적으로 합니다. 본 정책은 암호화 키 관리, 데이터 암호화 적용 절차, 관련 시스템 및 프로세스의 전반적인 관리 체계를 정의합니다.</mark></p>

<h4>1. 정책 목적</h4>
<p>본 암호화 관리 정책의 목적은 다음과 같습니다:</p>
<ul>
    <li>개인정보 및 주요정보의 기밀성을 보장하고 무단 접근을 방지</li>
    <li>암호화된 데이터의 무결성과 가용성을 유지하여 비인가된 수정이나 삭제를 방지</li>
    <li>암호화 절차 및 암호화 키 관리 시스템을 체계적으로 운영</li>
    <li>관련 법적 요구사항을 준수하고 보안 사고 발생 시 신속히 대응할 수 있도록 지원</li>
</ul>

<h4>2. 암호화 대상</h4>
<p>암호화는 다음과 같은 데이터를 대상으로 적용됩니다:</p>
<ul>
    <li>고객 개인정보: 이름, 주민등록번호, 주소, 전화번호 등</li>
    <li>내부 기밀정보: 경영계획, 재무 정보, 기술 문서 등</li>
    <li>금융 정보: 신용카드 정보, 은행 계좌 정보 등</li>
    <li>법적 요구사항에 따라 보호가 필요한 모든 정보</li>
</ul>

<h4>3. 암호화 적용 절차</h4>
<p><mark>암호화는 정보의 저장, 전송, 전달 등 모든 단계에서 적용되어야 하며, 다음 절차에 따라 진행됩니다:</mark></p>
<ul>
    <li><strong>저장 시 암호화</strong>: 데이터베이스, 파일 시스템 및 클라우드 스토리지에 저장되는 모든 개인정보 및 주요정보는 AES-256 암호화 알고리즘을 사용하여 암호화됩니다.</li>
    <li><strong>전송 시 암호화</strong>: 모든 네트워크 통신은 SSL/TLS 암호화 프로토콜을 통해 보호되며, 내부 및 외부 네트워크에서 동일한 수준의 보안을 유지합니다.</li>
    <li><strong>물리적 전달 시 암호화</strong>: 물리적 매체(USB, 외장하드 등)에 저장된 정보는 BitLocker와 같은 암호화 솔루션을 통해 암호화된 상태로 전달됩니다.</li>
</ul>

<h4>4. 암호화 키 관리</h4>
<p>암호화 키는 안전한 환경에서 생성, 저장, 관리되며, 다음과 같은 절차를 준수합니다:</p>
<ul>
    <li>암호화 키 생성: 키는 암호화 전용 하드웨어 보안 모듈(HSM)에서 안전하게 생성됩니다.</li>
    <li>암호화 키 저장: 암호화 키는 안전한 키 관리 시스템(KMS)에서 저장되며, 평문으로 저장되지 않습니다.</li>
    <li>암호화 키 배포: 키는 암호화된 통신 경로를 통해 전송되며, 비인가된 접근이 차단됩니다.</li>
    <li>암호화 키 교체: 민감한 정보는 최소 1년마다 암호화 키를 교체하며, 필요 시 더 자주 교체할 수 있습니다.</li>
    <li>암호화 키 폐기: 더 이상 사용되지 않는 키는 복구 불가능한 방식으로 안전하게 폐기됩니다.</li>
</ul>

<h4>5. 암호화 관리 책임</h4>
<p>암호화 시스템의 운영 및 관리 책임은 정보보호 담당자와 최고 정보보호 책임자(CISO)에 있으며, 암호화 시스템의 적절한 관리 여부는 정기적으로 감사됩니다. 관련 부서 및 인력은 암호화 정책을 숙지하고 이행해야 합니다.</p>

<h4>6. 법적 준수</h4>
<p>본 암호화 관리 정책은 개인정보 보호법, 정보통신망법, GDPR 등 국내외 법적 요구사항을 철저히 준수합니다. 모든 암호화 프로세스는 관련 규제 기준에 맞춰 검토되고 있으며, 법적 요구사항에 따라 주기적으로 갱신됩니다.</p>

<h4>7. 교육 및 모니터링</h4>
<p>모든 직원은 암호화 관리 절차에 대해 정기적인 교육을 받아야 하며, 암호화 시스템의 운영 및 관리에 대해 숙지해야 합니다. 암호화 적용 여부에 대한 주기적인 모니터링을 통해 암호화 절차가 정확히 이행되고 있는지 점검합니다.</p>

<h4>8. 사고 대응 및 복구</h4>
<p>암호화 관련 보안 사고 발생 시 즉각적인 대응 절차를 가동합니다. 사고 발생 시 신속한 키 교체 및 암호화 시스템 복구를 통해 피해를 최소화하며, 사고의 원인 분석 및 재발 방지 대책을 마련합니다.</p>

`;

export default {
  data() {
    return {
      searchQuery: '2.6.1.1',
      results: [],
      selectedResult: null,
    };
  },
  computed: {
    filteredResults() {
      if (this.searchQuery === '2.6.1.1') {
        return [
          { id: 1, name: '암호통제 정책', content: incidentResponse, percentage: 94 },
          { id: 2, name: '암호화 관리정책', content: securityPlan, percentage: 85 },
        ];
      }
      return this.results.filter(result =>
          result.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
    specificOutput() {
      const outputMap = {
        '2.6.1.1': '개인정보 및 주요정보의 보호를 위하여 법적 요구사항을 반영한 암호화 대상, 암호강도, 암호사용 등이 포함된 암호정책을 수립하고 있는가?'
      };
      return outputMap[this.searchQuery] || 'No specific output';
    },
  },
  methods: {
    selectResult(result) {
      this.selectedResult = result;
    },
  },
};
</script>

<style scoped>
/* 결과 항목 컨테이너 스타일 */
.search-results-2 {
  margin-top: 10px;
  height: 430px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* 항목들을 왼쪽 정렬 */
}
.document-title {
  text-align: center;
  padding-bottom: 20px;
  width: 100%;
  border-bottom: 1px solid #e6e6e6; /* 회색 구분선 추가 */
  padding-bottom: 10px; /* 구분선과 텍스트 사이의 간격을 조정 */
}

/* 결과 항목 스타일 */
.result-item {
  border: 1px solid #ccc;
  padding: 5px 10px;
  margin-top: 5px;
  margin-bottom: 5px;
  background-color: #fff;
  border-radius: 10px;  /* 둥근 모서리 */
  cursor: pointer;
  display: block; /* 각 항목을 블록 요소로 변경 */
  width: fit-content; /* 내용에 맞춰 너비 조정 */
  font-size: 0.9rem; /* 글씨 크기 감소 */
}

/* 기존 스타일 */
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.popup-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 500px;
  width: 100%;
}

.input-gap {
  margin-bottom: 20px;
}

.container {
  display: flex;
}

.search-section {
  flex: 0.5;
  margin-right: 20px;
}

.right-content {
  flex: 1;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  background-color: white;
  max-height: 760px;
  overflow-y: auto;
  overflow-x: hidden;
}

.search-results-1 {
  display: flex;
  flex-direction: column; /* 항목들을 세로로 나열 */
  align-items: center; /* 항목들을 가운데 정렬 */
  justify-content: center; /* 컨텐츠를 중앙 정렬 */
  margin-top: 10px;
  padding: 20px;
  background-color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  height: auto; /* 높이 자동 조절로 변경 */
}

.title-section {
  width: 100%; /* 전체 너비를 차지하도록 설정 */
  text-align: center; /* 텍스트 가운데 정렬 */
  border-bottom: 1px solid #e6e6e6; /* 회색 구분선 추가 */
  padding-bottom: 10px; /* 구분선 아래 패딩 추가 */
  margin-bottom: 20px; /* 내용과의 간격 추가 */
}

.popup-buttons {
  display: flex;
  gap: 10px; /* 제출과 취소 버튼 사이 간격 추가 */
  padding-top: 10px; /* 버튼 상단 패딩 추가 */
  justify-content: flex-end; /* 버튼들을 오른쪽으로 정렬 */
}


.button-container {
  display: flex;
  padding: 20px 0;
  width: 100%;
}

.flex-grow-1 {
  flex-grow: 1;
}
</style>
