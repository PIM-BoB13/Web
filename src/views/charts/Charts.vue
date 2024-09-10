<script setup>
import { ref } from 'vue'
import { useTranslation } from 'i18next-vue'
const { t, i18next } = useTranslation()

import {
  CChartBarExample,
  CChartDoughnutExample,
  CChartRadarExample,
} from './index.js'

const isPopupVisible = ref(false)
const defectSummary = ref('')
const defectDetail = ref('')

function openPopup() {
  isPopupVisible.value = true
}

function closePopup() {
  isPopupVisible.value = false
}

function submitDefect() {
  console.log("Defect Summary:", defectSummary.value)
  console.log("Defect Detail:", defectDetail.value)
  // 1초 후에 확인창을 띄우고 팝업을 닫음
  setTimeout(() => {
    alert("제출되었습니다.");
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
        <p>{{ specificOutput }}</p>
      </div>
      <div class="search-results-2">
        <ul v-for="(result, index) in filteredResults" :key="result.id" @click="selectResult(result)">
          {{ index + 1 }}. {{ result.name }}
        </ul>
      </div>
      <div class="button-container">
        <CButton color="info" class="me-2 flex-grow-1">이행</CButton>
        <CButton color="danger" class="flex-grow-1" @click="openPopup">결함</CButton>
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
            <CButton color="danger" @click="submitDefect">제출</CButton>
            <CButton color="secondary" @click="closePopup">취소</CButton>
          </div>
        </CForm>
      </div>
    </div>
  </div>
</template>

<script>
const incidentResponse = `
<h3>정보보호 및 개인정보보호 보고 체계</h3>

<p>[회사명]은 정보보호 및 개인정보보호 사고에 대한 신속한 대응과 체계적인 관리를 위해 아래와 같은 보고 체계를 운영합니다. 본 보고 체계는 개인정보 유출, 해킹, 내부 위협 등 정보보호 관련 사건의 보고 및 대응 절차를 규정하고 있습니다.</p>

<h4>1. 목적</h4>
<p>본 보고 체계의 목적은 정보보호 및 개인정보보호와 관련된 사고 발생 시, 이를 신속하고 정확하게 보고하여 피해를 최소화하고, 적절한 대응책을 강구하기 위함입니다.</p>

<h4>2. 보고 체계 구성</h4>
<p>정보보호 및 개인정보보호 관련 사고 발생 시, 다음과 같은 보고 라인을 통해 신속하게 보고가 이루어집니다:</p>
<ul>
    <li><strong>사고 인지 및 초기 보고</strong><br>
        사고 발생 시 이를 최초로 인지한 직원은 즉시 정보보호 담당자에게 사건을 구두 또는 서면으로 보고해야 합니다.<br>
        보고 대상: 정보보호 담당자, 개인정보보호 책임자(DPO)
    </li>
    <li><strong>정보보호 담당자 및 개인정보보호 책임자</strong><br>
        사고 발생 사실을 접수한 정보보호 담당자 및 개인정보보호 책임자는 사고의 심각성을 평가하고, 즉시 보안팀 및 경영진에 보고합니다.<br>
        보고 대상: 정보보안팀, IT팀, 법무팀, 경영진
    </li>
    <li><strong>경영진 및 최고 정보보호 책임자(CISO)</strong><br>
        심각한 사고의 경우 최고 정보보호 책임자(CISO)에게 보고되며, 경영진은 사고에 대한 의사 결정을 내리고 외부 기관에 대한 신고 여부를 판단합니다. 필요 시, 법적 대응팀과 협력하여 사고 처리 방안을 마련합니다.
    </li>
    <li><strong>외부 기관 보고 (필요 시)</strong><br>
        개인정보 유출이나 중대한 보안 사고의 경우, 법령에 따라 일정 기간 내에 관련 규제 기관(방통위, KISA 등)에 보고합니다.<br>
        외부 보고 대상: 한국인터넷진흥원(KISA), 방송통신위원회, 개인정보보호위원회 등
    </li>
</ul>

<h4>3. 보고 절차</h4>
<p>보고 체계는 사건 발생부터 대응 완료까지 다음과 같은 절차로 진행됩니다.</p>
<ul>
    <li><strong>사고 발생 인지</strong><br>
        내부 시스템, 네트워크 모니터링, 사용자 제보 등을 통해 정보보호 사고나 개인정보 유출 사고를 인지합니다.
    </li>
    <li><strong>초기 보고</strong><br>
        사고를 최초로 발견한 직원은 정보보호 담당자 또는 개인정보보호 책임자에게 즉시 사고를 알립니다.<br>
        보고 내용: 사고 발생 시각, 사고 유형, 영향을 받은 시스템 또는 데이터, 초기 대응 조치
    </li>
    <li><strong>사고 평가 및 중간 보고</strong><br>
        정보보호 담당자와 관련 부서는 사고의 규모와 피해 범위를 평가하여 중간 보고서를 작성하고 경영진에게 보고합니다.<br>
        중간 보고서 내용: 사고 원인, 피해 범위, 영향받은 데이터 또는 시스템, 잠정적인 대응 방안
    </li>
    <li><strong>최종 보고 및 대응</strong><br>
        사고에 대한 대응이 완료된 후 최종 보고서를 작성하여 경영진 및 규제 기관에 제출합니다.<br>
        최종 보고서 내용: 사고 원인 분석, 대응 조치 내역, 재발 방지 대책
    </li>
    <li><strong>사후 평가 및 재발 방지</strong><br>
        사고가 종료된 후, 사후 평가를 실시하여 보고 체계 및 대응 절차의 문제점을 점검하고, 재발 방지 대책을 수립합니다.
    </li>
</ul>

<h4>4. 보고서 형식</h4>
<p>보고는 표준화된 보고서 양식에 따라 작성되며, 보고서에는 다음과 같은 정보가 포함됩니다:</p>
<ul>
    <li>사고 발생 시각 및 장소</li>
    <li>사고 유형 및 발생 원인</li>
    <li>영향을 받은 시스템 및 데이터</li>
    <li>피해 규모 및 예상 손실</li>
    <li>대응 조치 및 경과</li>
    <li>재발 방지 대책</li>
</ul>

<h4>5. 대응팀 구성</h4>
<p>정보보호 및 개인정보보호 사고가 발생했을 때, 신속한 대응을 위해 전담 대응팀을 구성합니다. 대응팀은 다음과 같이 구성됩니다:</p>
<ul>
    <li>정보보호팀: 사고 조사 및 보안 시스템 복구</li>
    <li>IT팀: 시스템 복원 및 기술적 지원</li>
    <li>법무팀: 법적 대응 및 규제 기관 보고 지원</li>
    <li>홍보팀: 외부 커뮤니케이션 관리 (필요 시)</li>
</ul>

<h4>6. 사고 대응 훈련</h4>
<p>정기적인 보안 사고 대응 훈련을 통해 모든 직원이 보고 절차와 대응 방법을 숙지하도록 하고, 대응팀의 대응 능력을 강화합니다.</p>

<h4>7. 법적 준수</h4>
<p>본 보고 체계는 「개인정보 보호법」, 「정보통신망 이용촉진 및 정보보호 등에 관한 법률」 등 관련 법령을 준수하며, 사고 발생 시 규제 기관에 법정 기한 내에 보고를 준수합니다.</p>
`;

const securityPlan = `
<h3>정보보호계획 및 내부 관리계획</h3>

<p>[회사명]은 회사의 정보 자산을 보호하고, 개인정보보호법 및 관련 규정을 준수하기 위해 체계적인 정보보호 및 내부 관리계획을 수립합니다. 본 계획은 정보보호 목표를 달성하고, 잠재적인 보안 위협으로부터 회사의 정보 시스템 및 개인정보를 보호하는 데 목적이 있습니다.</p>

<h4>1. 목적</h4>
<p>이 계획의 목적은 정보보호에 대한 체계적인 방안을 수립하고, 정보보안 위험을 최소화하며, 개인정보 및 정보 자산의 기밀성, 무결성, 가용성을 유지하는 것입니다.</p>

<h4>2. 적용 범위</h4>
<p>본 계획은 회사의 모든 정보 자산, 개인정보 처리 시스템, 그리고 정보보호에 관련된 모든 임직원, 외부 계약자 및 파트너에게 적용됩니다.</p>

<h4>3. 정보보호 목표</h4>
<p>회사의 정보보호 목표는 다음과 같습니다:</p>
<ul>
    <li>기밀성: 회사의 정보는 적절한 권한을 가진 사람만 접근할 수 있도록 보호</li>
    <li>무결성: 정보가 정확하고 변조되지 않도록 보호</li>
    <li>가용성: 정보와 시스템이 필요할 때 적시에 접근 가능하도록 보장</li>
    <li>법적 준수: 관련 법령 및 규정을 준수하여 정보보호 및 개인정보 보호를 이행</li>
</ul>

<h4>4. 정보보호계획</h4>
<h5>4.1 정보보호 거버넌스</h5>
<ul>
    <li>정보보호 책임자(CISO): 정보보호 총괄 책임자는 정보보호 정책 수립 및 이행을 관리하며, 조직 내 정보보호 활동을 총괄합니다.</li>
    <li>정보보호위원회: 위원회를 구성하여 정보보호 전략 및 정책을 검토하고, 주요 보안 사안을 의논합니다.</li>
</ul>

<h5>4.2 정보 자산 관리</h5>
<ul>
    <li>정보 자산 분류 및 목록화: 회사의 모든 정보 자산을 식별하고, 기밀성 및 중요성에 따라 분류합니다.</li>
    <li>정보 자산 보호: 자산의 중요도에 따라 암호화, 접근 통제 등 필요한 보호 조치를 취합니다.</li>
</ul>

<h5>4.3 접근 통제</h5>
<ul>
    <li>권한 부여: 모든 시스템과 데이터에 대한 접근 권한은 최소 권한 원칙에 따라 부여됩니다.</li>
    <li>인증 및 인가: 사용자 인증을 통해 정당한 사용자인지 확인하며, 중요 시스템은 다중 인증을 적용합니다.</li>
</ul>

<h5>4.4 네트워크 보안</h5>
<ul>
    <li>방화벽 및 침입 탐지 시스템(IDS/IPS): 외부로부터의 불법 접근을 차단하고, 네트워크 상의 잠재적인 위협을 탐지 및 차단합니다.</li>
    <li>VPN 사용: 원격 근무 시 안전한 통신을 위해 가상 사설망(VPN)을 사용합니다.</li>
</ul>

<h5>4.5 시스템 및 애플리케이션 보안</h5>
<ul>
    <li>보안 패치 관리: 모든 시스템 및 애플리케이션은 최신 보안 패치가 적용되도록 정기적으로 관리합니다.</li>
    <li>취약점 점검: 외부로 노출된 시스템 및 애플리케이션에 대해 주기적인 취약점 점검을 실시하고, 발견된 취약점은 즉시 조치합니다.</li>
</ul>

<h5>4.6 암호화 정책</h5>
<ul>
    <li>데이터 암호화: 기밀 데이터는 저장 및 전송 시 암호화를 적용하여 보호합니다.</li>
    <li>암호 관리: 암호는 복잡성을 준수하고, 주기적인 변경을 의무화하며, 안전한 저장 방법을 사용합니다.</li>
</ul>

<h4>5. 개인정보보호 내부 관리계획</h4>
<h5>5.1 개인정보 보호 책임자(DPO)</h5>
<p>개인정보 보호 책임자는 회사의 개인정보 처리 활동에 대한 전반적인 관리를 담당하며, 관련 법규 준수를 보장합니다.</p>

<h5>5.2 개인정보의 수집 및 처리</h5>
<ul>
    <li>개인정보는 최소한의 범위에서 수집하며, 수집된 개인정보는 사전에 고지한 목적 내에서만 이용됩니다.</li>
    <li>개인정보 처리자는 개인정보 보호를 위한 법적, 기술적 조치를 취해야 합니다.</li>
</ul>

<h5>5.3 개인정보의 접근 통제</h5>
<ul>
    <li>개인정보 접근 권한은 최소 권한 원칙을 따르며, 개인정보에 접근하는 모든 사람은 정당한 권한을 가져야 합니다.</li>
    <li>개인정보 처리 시스템은 접근 기록을 남기고, 기록은 주기적으로 점검합니다.</li>
</ul>

<h5>5.4 개인정보의 안전한 저장 및 전송</h5>
<ul>
    <li>개인정보는 저장 시 안전한 암호화 기술을 사용하여 보호하며, 전송 시에도 암호화된 통신 방식을 사용합니다.</li>
    <li>외부에 개인정보를 전송할 때는 개인정보 보호법에 따라 적절한 동의를 받습니다.</li>
</ul>

<h5>5.5 개인정보 파기</h5>
<ul>
    <li>개인정보는 보유 기간이 경과하거나 처리 목적이 달성된 경우 지체 없이 안전하게 파기합니다.</li>
    <li>전자적 정보는 복구 불가능한 방식으로 삭제하며, 서면 자료는 파쇄기를 통해 물리적으로 파기합니다.</li>
</ul>

<h5>5.6 개인정보 처리 위탁 관리</h5>
<p>개인정보 처리 업무를 제3자에게 위탁하는 경우, 위탁 업체와 개인정보 보호 관련 계약을 체결하고, 위탁 업체가 개인정보 보호 의무를 준수하는지 관리·감독합니다.</p>

<h4>6. 보안 사고 대응 계획</h4>
<h5>6.1 사고 대응 체계</h5>
<ul>
    <li>정보보호 및 개인정보 유출 사고 발생 시 신속한 대응을 위해 사고 대응팀을 구성합니다.</li>
    <li>사고 발생 시 즉시 정보보호 및 개인정보보호 책임자에게 보고하며, 사고의 규모와 성격에 따라 대응 절차를 가동합니다.</li>
</ul>

<h5>6.2 사고 대응 절차</h5>
<ul>
    <li>사고 인지: 사고 발생을 인지한 직원은 즉시 관련 부서에 보고합니다.</li>
    <li>초기 대응: 사고 대응팀은 사고의 원인과 영향을 신속히 분석하고, 추가 피해를 방지하기 위한 긴급 조치를 취합니다.</li>
    <li>사고 평가 및 보고: 사고의 원인과 영향을 분석한 후, 경영진과 법적 요구사항에 따라 관련 기관에 보고합니다.</li>
    <li>사후 조치: 사고의 원인 제거 및 재발 방지 대책을 마련합니다.</li>
</ul>

<h4>7. 보안 교육 및 훈련</h4>
<p>모든 임직원은 정기적인 정보보호 및 개인정보보호 교육을 받아야 하며, 교육 내용에는 정보보호 정책, 보안 위협, 사고 대응 절차 등이 포함됩니다. 보안 인식 제고를 위해 실제 시나리오를 기반으로 한 모의 훈련을 정기적으로 실시합니다.</p>

<h4>8. 정책의 검토 및 개선</h4>
<p>본 계획은 정기적으로 검토되며, 법률 변경, 기술 발전, 내부 환경 변화에 따라 수정 및 보완됩니다. 정보보호 담당자는 정책의 실행 여부를 모니터링하고, 개선 사항을 반영하여 지속적으로 보안 수준을 향상시킵니다.</p>
`;

export default {
  data() {
    return {
      searchQuery: '1.1.1.1',
      results: [],
      selectedResult: null,
    };
  },
  computed: {
    filteredResults() {
      if (this.searchQuery === '1.1.1.1') {
        return [
          { id: 1, name: '정보보호 및 개인정보보호 보고 체계', content: incidentResponse },
          { id: 2, name: '정보보호계획 및 내부 관리계획', content: securityPlan }
        ];
      }
      return this.results.filter(result =>
          result.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
    specificOutput() {
      const outputMap = {
        '1.1.1.1': '정보보호 및 개인정보보호 관리체계의 수립 및 운영활동 전반에 경영진의 참여가 이루어질 수 있도록 보고 및 의사결정 등의 책임과 역할을 문서화하고 있는가?'
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

/* 팝업 크기 조정 */
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
/* 입력칸 사이 간격 */
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
  margin-top: 10px;
  height: 200px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  background-color: white;
}

.search-results-2 {
  margin-top: 10px;
  height: 430px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  background-color: white;
}

.button-container {
  display: flex;
  padding: 20px 0;
  width: 100%;
}

.flex-grow-1 {
  flex-grow: 1;
}

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

.popup-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}
</style>
