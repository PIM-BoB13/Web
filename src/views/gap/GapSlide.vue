<!--https://velog.io/@iepppop/vue-tab%EB%A9%94%EB%89%B4-->
<!--웹페이지 UI를 만드는 디자이너 입장으로 봐바. 이 팝업창에는 띄울 내용이 많아. 그래서 첨부한 사진처럼 Mapped elements랑 History로 나누어서 각각에 맞는 내용을 배치할거야. 그래서 Mapped elements를누르면 Mapped elements에 맞는 내용이 밑에 보이고, History를 누르면 History에 맞는 내용이 아래에 보여. 이러한 버튼? 기능?을 뭐라고 부르지? 첨부한 사진 바탕으로 vue.js에서 구현하려고해-->
<!--ChatGPT의 말:-->
<!--ChatGPT-->
<!--메모리 업데이트됨-->
<!--이 기능을 "탭 내비게이션(Tab Navigation)"이라고 부릅니다. 탭을 이용해서 Mapped elements와 History와 같은 각기 다른 내용을 보여주는 방식이죠. Vue.js에서는 이 기능을 구현하기 위해 v-if, v-show, 또는 Vue Router를 사용하여 각 탭의 내용을 전환하는 방식으로 구현할 수 있습니다. 또는 UI 프레임워크인 Vuetify나 Bootstrap-Vue를 사용하면 간편하게 탭 컴포넌트를 활용할 수도 있습니다.-->

<!--이렇게 구현하면 사용자가 클릭하는 탭에 따라 해당되는 컨텐츠가 보여지는 구조를 손쉽게 만들 수 있습니다.-->

<template>
  <div v-if="isOpen" class="popup-overlay" @click="closePopup">
    <div class="sidebar-popup open" @click.stop>
      <div class="popup-content">
        <div class="popup-header">
          <h2>{{ item.id }}</h2>
          <button @click="closePopup" class="close-button">&times;</button>
        </div>
        <p>{{ item.description }}</p>
        <table class="compact-table mb-4">
          <tbody>
          <tr>
            <td><span class="label">세부항목:</span></td>
            <td><span>{{ item.id }}</span></td>
            <td><span class="label">담당자:</span></td>
            <td><span>{{ item.owner }}</span></td>
          </tr>
          <tr>
            <td><span class="label">정책/지침:</span></td>
            <td class="spaced-td"><span :class="getReadinessClass(item.policyReadiness)">
                {{ item.policyReadiness.completed }}/{{ item.policyReadiness.total }}
              </span></td>
            <td><span class="label">증적 자료:</span></td>
            <td class="spaced-td"><span :class="getReadinessClass(item.evidenceReadiness)">
                {{ item.evidenceReadiness.completed }}/{{ item.evidenceReadiness.total }}
              </span></td>
          </tr>
          </tbody>
        </table>


        <!-- Flex container for side-by-side cards -->
        <div class="card-container">
          <CCard class="mb-4">
            <CCardHeader class="header-title">
              정책/지침 운영 현황
              <span class="ai-badge-feedback">AI</span>
            </CCardHeader>
            <CCBody>
              <div v-for="(policy, index) in realpolicy" :key="index">
                <div class="law-title" @click="toggleRealPolicy(index)">
                  <span class="law-text">{{ policy.name }}</span>
                  <button class="toggle-btn" @click.stop="toggleRealPolicy(index)">
                    <span v-if="isRealPolicyVisible(index)">▲</span>
                    <span v-else>▼</span>
                  </button>
                </div>
                <div v-if="isRealPolicyVisible(index)" class="feedback-content">
                  {{ policy.explain }}
                </div>
              </div>
            </CCBody>
          </CCard>


          <CCard class="mb-4">
            <CCardHeader class="header-title">
              증적 자료 운영 현황
              <span class="ai-badge-feedback">AI</span>
            </CCardHeader>
            <CCBody>
              <div v-for="(evidence, index) in realevidence" :key="index">
                <div class="law-title" @click="toggleRealEvidence(index)">
                  <span class="law-text">{{ evidence.name }}</span>
                  <button class="toggle-btn" @click.stop="toggleRealEvidence(index)">
                    <span v-if="isRealEvidenceVisible(index)">▲</span>
                    <span v-else>▼</span>
                  </button>
                </div>
                <div v-if="isRealEvidenceVisible(index)" class="feedback-content">
                  {{ evidence.explain }}
                </div>
              </div>
            </CCBody>
          </CCard>
        </div>


        <CCard class="mb-4">
          <CCardHeader class="header-title">
            결함 내역<span class="ai-badge-feedback">AI</span>
          </CCardHeader>
          <CCBody>
            <CTable>
              <CTableBody>
                <CTableRow>
                  <CTableDataCell class="text-start padded-cell wide-cell">
                    <strong>정책/지침 결함 내역</strong>
                  </CTableDataCell>
                  <CTableDataCell class="text-start padded-cell">{{ realPolicyFault }}</CTableDataCell>
                </CTableRow>
                <CTableRow>
                  <CTableDataCell class="text-start padded-cell wide-cell">
                    <strong>증적 자료 결함 내역</strong>
                  </CTableDataCell>
                  <CTableDataCell class="text-start padded-cell align-middle">{{ realEvidenceFault }}</CTableDataCell>
                </CTableRow>
              </CTableBody>
            </CTable>
          </CCBody>
        </CCard>



        <CCard>
          <CCardBody>
            <CCard class="mapped-elements">
              <CCardHeader class="CCardHeader">
                <span class="header-title">정책/지침 자료 추천
                </span>
              </CCardHeader>
              <CCardBody class="CCardBody">
                <div class="ai-suggestion">
                  <CIcon class="icon-blue" icon="cil-Braille" size="xl" />
                  <span class="suggestion-text">PIM은 {{ item.id }} 항목에 적합한 {{ aiSuggestions.policy }}개의 정책/지침 문서를 추천드립니다.</span>
                </div>
                <ul class="recommendation-list">
                  <li v-for="(policy, index) in policies" :key="index" class="recommendation-item">
                    <span class="policy-name">{{ policy.name }}</span>
                    <div class="action-buttons">
                      <button class="action-button add-button" @click="showAddConfirmation(index)">
                        <span class="button-icon">+</span>
                      </button>
                      <button class="action-button remove-button" @click="showRemoveConfirmation(index)">
                        X
                      </button>
                    </div>
                  </li>
                </ul>
                <button class="show-more">Show more</button>
              </CCardBody>
            </CCard>
            <CCard class="mapped-elements">
              <CCardHeader class="CCardHeader">
                <span class="header-title">증적 자료 추천
                </span>
              </CCardHeader>
              <CCardBody class="CCardBody">
                <div class="ai-suggestion">
                  <CIcon class="icon-blue" icon="cil-Braille" size="xl" />
                  <span class="suggestion-text">PIM은 {{ item.id }} 항목에 적합한 {{ aiSuggestions.evidence }}개의 증적 자료를 추천드립니다.</span>
                </div>
                <ul class="recommendation-list">
                  <li v-for="(evidence, index) in evidences" :key="index" class="recommendation-item">
                    <span class="policy-name">{{ evidence.name }}</span>
                    <div class="action-buttons">
                      <button class="action-button add-button" @click="showAddConfirmation(index)">
                        <span class="button-icon">+</span>
                      </button>
                      <button class="action-button remove-button" @click="showRemoveConfirmation(index)">
                        X
                      </button>
                    </div>
                  </li>
                </ul>
                <button class="show-more">Show more</button>
              </CCardBody>
            </CCard>
          </CCardBody>
        </CCard>

        <!-- Confirmation Popups -->
        <div v-if="showAddPopup" class="confirmation-popup">
          <div class="popup-content">
            <p>추가하시겠습니까?</p>
            <div class="popup-buttons">
              <button @click="confirmAdd">예</button>
              <button @click="cancelAdd">아니오</button>
            </div>
          </div>
        </div>

        <div v-if="showRemovePopup" class="confirmation-popup">
          <div class="popup-content">
            <p>삭제하시겠습니까?</p>
            <div class="popup-buttons">
              <button @click="confirmRemove">예</button>
              <button @click="cancelRemove">아니오</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GapSlide',
  props: {
    item: {
      type: Object,
      required: true
    },
    isOpen: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      realPolicyFault: '현재 정보보호 지침2에 대해 어떠어떠한 내용이 포함되어 있지 않습니다.',
      realEvidenceFault: '결함 없음',

      realpolicy: [
        { name: '정보보호 지침1', explain: '~~ 잘 운영되고 있음.' },
        { name: '정보보호 지침2', explain: '~~ 내용이 포함되어 있지 않음.' },
      ],
      realevidence: [
        { name: '정보보호 임원 회의록', explain: '~~ 잘 운영되고 있음.' },
        { name: '기업 조직도 구성도', explain: '~~ 잘 운영되고 있음.' },
      ],
      aiSuggestions: {
        policy: 4,
        evidence: 3
      },
      policies: [
        { name: '정보보호 의사소통계획', selected: true },
        { name: '정보보호 및 개인정보보호 지침', selected: true },
        { name: '내부 관리계획', selected: true },
      ],
      evidences: [
        { name: '정보보호 보고체계', selected: true },
        { name: '정책/지침 경영진 승인내역', selected: true },
        { name: '정보보호 및 개인정보보호 조직도', selected: true }
      ],
      showAddPopup: false,
      showRemovePopup: false,
      currentIndex: null,
      detailsVisible: false,
      realPolicyVisible: [],
      realEvidenceVisible: []
    }
  },
  methods: {
    closePopup() {
      this.$emit('close')
    },

    getReadinessClass(readiness) {
      return readiness.completed === readiness.total ? 'evidence-readiness complete' : 'evidence-readiness incomplete';
    },
    showAddConfirmation(index) {
      this.currentIndex = index;
      this.showAddPopup = true;
    },
    showRemoveConfirmation(index) {
      this.currentIndex = index;
      this.showRemovePopup = true;
    },
    confirmAdd() {
      // Implement the logic to add the item
      this.showAddPopup = false;
    },
    cancelAdd() {
      this.showAddPopup = false;
    },
    confirmRemove() {
      this.policies.splice(this.currentIndex, 1);
      this.showRemovePopup = false;
    },
    cancelRemove() {
      this.showRemovePopup = false;
    },
    toggleDetails() {
      this.detailsVisible = !this.detailsVisible;
    },
    toggleRealPolicy(index) {
      const policyIndex = this.realPolicyVisible.indexOf(index);
      if (policyIndex > -1) {
        this.realPolicyVisible.splice(policyIndex, 1);
      } else {
        this.realPolicyVisible.push(index);
      }
    },
    isRealPolicyVisible(index) {
      return this.realPolicyVisible.includes(index);
    },
    toggleRealEvidence(index) {
      const evidenceIndex = this.realEvidenceVisible.indexOf(index);
      if (evidenceIndex > -1) {
        this.realEvidenceVisible.splice(evidenceIndex, 1);
      } else {
        this.realEvidenceVisible.push(index);
      }
    },
    isRealEvidenceVisible(index) {
      return this.realEvidenceVisible.includes(index);
    }
  }
}
</script>


<style scoped>

.wide-cell {
  white-space: nowrap; /* Prevent the label from wrapping */
  width: 200px; /* Set a fixed width for the label cells */
}

.padded-cell {
  overflow-wrap: break-word; /* Allow the content to wrap within the cell */
  word-wrap: break-word; /* For older browsers */
  word-break: break-word; /* Ensure long words break correctly */
}

.card-container {
  display: flex;
  justify-content: space-between;
  gap: 20px; /* Adjust the gap as needed */
}

.card-container .mb-4 {
  flex: 1; /* Make each card take up equal space */
}

.spaced-td {
  margin-left: 10px; /* Adjust the value as needed */
}

.compact-table td:nth-child(3) {
  padding-left: 120px; /* Add space to the left of the "담당자" item */
}

.icon-blue {
  color: #1c25a9; /* Change the color of the icon to blue */
  margin-right: 5px; /* Adjust this value to increase or decrease the space */
}

.suggestion-text {
  margin-left: 7px; /* Adjust this value to increase or decrease the space */
  color: black;
  font-size: 13px;
}

.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 998;
}

.sidebar-popup {
  position: fixed;
  top: 80px;
  right: -50%;
  width: 75%;
  height: calc(100% - 90px);
  background-color: white;
  border-radius: 10px 0 0 10px;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
  transition: right 0.3s ease-in-out;
  overflow-y: auto;
  z-index: 999;
}

.sidebar-popup.open {
  right: 0;
}

.popup-content {
  padding: 20px;
}

.popup-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.close-button {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
}

.header-title {
  font-weight: bold;
  font-size: 1.4em;
  display: flex;
  align-items: center;
}

.ai-badge-feedback {
  background-color: #1c25a9;
  color: white;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 0.50em;
  margin-left: 10px;
  display: inline-block;
  white-space: nowrap;
  max-width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
}

.recommendation-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.recommendation-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #e0e0e0;
}

.policy-name {
  flex-grow: 1;
}

.action-buttons {
  display: flex;
  gap: 10px;
}

.action-button {
  border: none;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 12px;
  color: white;
}

.add-button {
  background-color: #1c25a9;
  color: white;
}

.remove-button {
  background-color: white;
  color: #606060;
  border-radius: 5px; /* Makes the border square */
  border: 0.8px solid #989898; /* Adds a black border */
}

.button-icon {
  font-size: 18px;
  line-height: 1;
}

.show-more {
  background: none;
  border: none;
  color: #1c25a9;
  cursor: pointer;
  margin-top: 10px;
}

.confirmation-popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.confirmation-popup .popup-content {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  text-align: center;
}

.confirmation-popup .popup-buttons {
  margin-top: 20px;
}

.confirmation-popup button {
  margin: 0 10px;
  padding: 5px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.mapped-elements .CCardHeader {
  background-color: #f3f3f3; /* Keep the header background color unchanged */
}

.mapped-elements .CCardBody {
  background-color: #fafcff; /* Change this to your desired background color */
}

.mapped-elements + .mapped-elements {
  margin-top: 25px; /* Adjust this value to increase or decrease the space */
}

.mapped-elements h3 {
  margin-top: 20px;
}

.evidence-readiness {
  background-color: #E8F5E9;
  color: #4CAF50;
  padding: 4px 9px 3px;
  border-radius: 12px;
  display: inline-block;
  font-size: 0.9em;
}
.evidence-readiness.complete {
  background-color: #E8F5E9;
  color: #4CAF50;
}
.evidence-readiness.incomplete {
  background-color: #FFEBEE;
  color: #F44336;
}
.label {
  font-weight: bold;
}

.item-details .detail-row, .note-section {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.ai-suggestion {
  display: flex;
  align-items: center;
  background-color: #c6dbea;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 4px;
}

.compact-table td {
  padding: 8px 12px; /* Adjust padding to reduce the space between items */
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
  padding: 13px;
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

.law-title:hover {
  text-decoration: underline;
}
.law-text {
  padding: 13px;
}
</style>
