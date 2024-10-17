<template>
  <div v-if="isOpen" class="popup-overlay" @click="closePopup">
    <div class="sidebar-popup open" @click.stop>
      <div class="popup-content">
        <div class="popup-header">
          <h2>{{ item.id }}</h2>
          <button @click="closePopup" class="close-button">&times;</button>
        </div>
        <p>{{ item.question }}</p>
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

        <div class="tab-navigation">
          <button
            :class="['tab-button', { active: activeTab === 'recommendation' }]"
            @click="setActiveTab('recommendation')"
          >
            추천
          </button>
          <button
            :class="['tab-button', { active: activeTab === 'status' }]"
            @click="setActiveTab('status')"
          >
            현황
          </button>
          <div class="tab-indicator" :style="indicatorStyle"></div>
        </div>

        <div class="tab-content" :class="activeTab">
          <transition name="fade" mode="out-in">
            <div v-if="activeTab === 'recommendation'" key="recommendation">
              <CCard class="mapped-elements">
                <CCardHeader class="CCardHeader">

                  <div class="header-title-container">
                    <span class="header-title">정책/지침 자료 추천</span>
                    <span class="ai-badge-feedback1">AI</span>
                  </div>
                </CCardHeader>
                <CCardBody class="CCardBody">
                  <div class="ai-suggestion">
                    <CIcon class="icon-blue" icon="cil-Braille" size="xl" />
                    <div v-if="sourceDocuments && sourceDocuments.length > 0">
                      <span class="suggestion-text">PIM은 문서 적합도 기반으로 {{ sourceDocuments.length }}개의 정책/지침 문서를 추천드립니다.</span>
                    </div>
                  </div>
                  <ul class="recommendation-list">
                    <li v-for="(document, index) in sourceDocuments" :key="index" >
                      <div class="law-title" @click="toggleSuggestPolicy(index)">
                        <span class="law-text">{{ document.title }}</span>
                        <span class="similarity">{{ document.similarity }}</span>
                        <div class="action-buttons">
                          <button class="action-button add-button" @click="showAddConfirmation(index)">
                            <span class="button-icon">+</span>
                          </button>
                          <button class="action-button remove-button" @click="showRemoveConfirmation(index)">
                            X
                          </button>
                        </div>
                      </div>
                      <div v-if="isSuggestPolicyVisible(index)" class="feedback-content">
                        {{ document.content }}
                      </div>
                    </li>
                  </ul>
                  <button class="show-more">How To Use</button>
                </CCardBody>
              </CCard>

              <CCard class="mapped-elements">
                <CCardHeader class="CCardHeader">
                  <div class="header-title-container">
                    <span class="header-title">증적 자료 추천</span>
                    <span class="ai-badge-feedback1">AI</span>
                  </div>
                </CCardHeader>
                <CCardBody class="CCardBody">
                  <div class="ai-suggestion">
                    <CIcon class="icon-blue" icon="cil-Braille" size="xl" />
                    <span class="suggestion-text">PIM은 문서 적합도 기반으로 {{ aiSuggestions.evidence }}개의 증적 자료를 추천드립니다.</span>
                  </div>
                  <ul class="recommendation-list">
                    <li v-for="(evidence, index) in evidences" :key="index">
                      <div class="law-title" @click="toggleSuggestEvidence(index)">
                        <span class="law-text">{{ evidence.title }}</span>
                        <span class="similarity">{{ evidence.similarity }}</span>
                        <div class="action-buttons">
                          <button class="action-button add-button" @click="showAddConfirmation(index)">
                            <span class="button-icon">+</span>
                          </button>
                          <button class="action-button remove-button" @click="showRemoveConfirmation(index)">
                            X
                          </button>
                        </div>
                      </div>
                      <div v-if="isSuggestEvidenceVisible(index)" class="feedback-content">
                        {{ evidence.content }}
                      </div>
                    </li>
                  </ul>
                  <button class="show-more">How To Use</button>
                </CCardBody>
              </CCard>
            </div>

            <div v-else-if="activeTab === 'status'" key="status">

                <CCard class="mb-4">
                  <CCardHeader class="header-title">
                    정책/지침 운영 현황
                  </CCardHeader>
                  <CCBody>
                    <div v-for="(policy, index) in realpolicy" :key="index">
                      <div class="law-title" @click="toggleRealPolicy(index)">
                        <span class="law-text">{{ policy.title }}</span>
                        <button class="toggle-btn" @click.stop="toggleRealPolicy(index)">
                          <span v-if="isRealPolicyVisible(index)">▲</span>
                          <span v-else>▼</span>
                        </button>
                      </div>
                      <div v-if="isRealPolicyVisible(index)" class="feedback-content">
                        {{ policy.content }}
                      </div>
                    </div>
                  </CCBody>
                </CCard>

                <CCard class="mb-4">
                  <CCardHeader class="header-title">
                    증적 자료 운영 현황
                  </CCardHeader>
                  <CCBody>
                    <div v-for="(evidence, index) in realevidence" :key="index">
                      <div class="law-title" @click="toggleRealEvidence(index)">
                        <span class="law-text">{{ evidence.title }}</span>
                        <button class="toggle-btn" @click.stop="toggleRealEvidence(index)">
                          <span v-if="isRealEvidenceVisible(index)">▲</span>
                          <span v-else>▼</span>
                        </button>
                      </div>
                      <div v-if="isRealEvidenceVisible(index)" class="feedback-content">
                        {{ evidence.content }}
                      </div>
                    </div>
                  </CCBody>
                </CCard>


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
            </div>
          </transition>
        </div>

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
import { CCard, CCardBody } from '@coreui/vue-pro';
export default {
  name: 'GapSlide',
  components: {
    CCard, // CCBody 컴포넌트를 등록
    CCardBody
  },
  props: {
    item: {
      type: Object,
      required: true
    },
    isOpen: {
      type: Boolean,
      required: true
    },
    sourceDocuments: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      activeTab: 'recommendation',
      indicatorPosition: 0,
      indicatorWidth: 0,


      aiSuggestions: {
        policy: 3,
        evidence: 3
      },
      source_documents: [
        { title: '정보보호 의사소통계획', content: 'AA', similarity:'90%', selected: true },
        { title: '정보보호 및 개인정보보호 지침', content: 'BB', similarity:'80%', selected: true },
        { title: '내부 관리계획', content: 'CC', similarity:'70%', selected: true },
      ],
      evidences: [
        { title: '정보보호 보고체계', content: 'AA', similarity:'91%', selected: true },
        { title: '정책/지침 경영진 승인내역', content: 'BB', similarity:'82%', selected: true },
        { title: '정보보호 및 개인정보보호 조직도', content: 'CC', similarity:'73%', selected: true }
      ],

      realpolicy: [
        { title: '정보보호 지침1', content: '~~ 잘 운영되고 있음.' },
        { title: '정보보호 지침2', content: '~~ 내용이 포함되어 있지 않음.' },
      ],
      realevidence: [
        { title: '정보보호 임원 회의록', content: '~~ 잘 운영되고 있음.' },
        { title: '기업 조직도 구성도', content: '~~ 잘 운영되고 있음.' },
      ],


      realPolicyFault: '현재 정보보호 지침2에 대해 어떠어떠한 내용이 포함되어 있지 않습니다.',
      realEvidenceFault: '결함 없음',


      showAddPopup: false,
      showRemovePopup: false,
      currentIndex: null,
      detailsVisible: false,
      realPolicyVisible: [],
      realEvidenceVisible: [],
      suggestPolicyVisible: [],
      suggestEvidenceVisible: []
    }
  },
  computed: {
    indicatorStyle() {
      return {
        transform: `translateX(${this.indicatorPosition}px)`,
        width: `${this.indicatorWidth}px`
      };
    }
  },
  methods: {
    setActiveTab(tab) {
      this.activeTab = tab;
      this.$nextTick(() => {
        const activeButton = this.$el.querySelector('.tab-button.active');
        if (activeButton) {
          this.indicatorPosition = activeButton.offsetLeft;
          this.indicatorWidth = activeButton.offsetWidth;
        }
      });
    },
    closePopup() {
      this.$emit('close')
    },
    getReadinessClass(readiness) {
      if (readiness.total === 0) {
        return 'evidence-readiness incomplete';
      }
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
      this.showAddPopup = false;
    },
    cancelAdd() {
      this.showAddPopup = false;
    },
    confirmRemove() {
      this.source_documents.splice(this.currentIndex, 1);
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
    },

    toggleSuggestPolicy(index) {
      const policyIndex = this.suggestPolicyVisible.indexOf(index);
      if (policyIndex > -1) {
        this.suggestPolicyVisible.splice(policyIndex, 1);
      } else {
        this.suggestPolicyVisible.push(index);
      }
    },
    isSuggestPolicyVisible(index) {
      return this.suggestPolicyVisible.includes(index);
    },
    toggleSuggestEvidence(index) {
      const evidenceIndex = this.suggestEvidenceVisible.indexOf(index);
      if (evidenceIndex > -1) {
        this.suggestEvidenceVisible.splice(evidenceIndex, 1);
      } else {
        this.suggestEvidenceVisible.push(index);
      }
    },
    isSuggestEvidenceVisible(index) {
      return this.suggestEvidenceVisible.includes(index);
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.setActiveTab(this.activeTab);
    });
  }
}
</script>


<style scoped>

.tab-navigation {
  display: flex;
  position: relative;
  border-bottom: 1px solid #e0e0e0;
  margin-bottom: 20px;
}

.tab-button {
  padding: 10px 20px;
  border: none;
  background-color: transparent;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  color: #606060;
  transition: color 0.3s;
}

.tab-button.active {
  color: #1c25a9;
}

.tab-indicator {
  position: absolute;
  bottom: -1px;
  height: 2px;
  background-color: #1c25a9;
  transition: all 0.3s ease;
}

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
  width: 40%;
  height: calc(100% - 73px);
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
  font-size: 1.2em;
  display: flex;
  align-items: center;
}

.header-title-container {
  display: flex;
  align-items: center;
}

.ai-badge-feedback {
  background-color: #5e82f3;
  color: white;
  padding: 1px 9px;
  border-radius: 12px;
  font-size: 0.60em;
  margin-left: 5px;
  display: inline-block; /* Ensure the badge stays inline with the title */
  white-space: nowrap; /* Prevent the badge text from wrapping */
  vertical-align: center; /* Align the badge vertically in the middle */
}

.ai-badge-feedback1 {
  background-color: #5e82f3;
  color: white;
  padding: 2px 9px;
  border-radius: 12px;
  font-size: 0.70em;
  margin-left: 5px;
  display: inline-block; /* Ensure the badge stays inline with the title */
  white-space: nowrap; /* Prevent the badge text from wrapping */
  vertical-align: center; /* Align the badge vertically in the middle */
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

.policy-title {
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
  text-align: right; /* Ensure text inside the button is right-aligned */
  display: block; /* Make the button a block element */
  margin-left: auto; /* Push the button to the right */
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


.law-title:hover {
  text-decoration: underline;
}
.law-text {
  padding: 13px;
}

.law-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}

.law-text {
  flex: 1;
  font-weight: bold;
  padding-right: 30px; /* Add padding to the right */
  white-space: nowrap; /* Prevent text from wrapping */
  overflow: hidden; /* Hide overflow text */
  text-overflow: ellipsis; /* Add ellipsis for overflow text */
}

.similarity {
  margin-right: 23px; /* Adjust this value to move the similarity further to the left */
  font-weight: bold;
  color: #718ce1;
  white-space: nowrap; /* Prevent text from wrapping */
  font-size: 0.86em; /* Reduce the font size */
}

</style>
