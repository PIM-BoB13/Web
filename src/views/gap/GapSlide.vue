<template>
  <div>
    <div class="popup-overlay" v-if="isOpen" @click="closePopup"></div>
    <div class="sidebar-popup" :class="{ 'open': isOpen }">
      <div class="popup-content">
        <div class="popup-header">
          <h2>{{ item.id }}</h2>
          <button @click="closePopup" class="close-button">&times;</button>
        </div>
        <p>{{ item.description }}</p>
        <CTable class="compact-table">
          <CTableBody>
            <CTableRow>
              <CTableDataCell>
                <span class="label">세부항목</span>
              </CTableDataCell>
              <CTableDataCell>
                <span>{{ item.id }}</span>
              </CTableDataCell>
            </CTableRow>
            <CTableRow>
              <CTableDataCell>
                <span class="label">담당자</span>
              </CTableDataCell>
              <CTableDataCell>
                <span>{{ item.owner }}</span>
              </CTableDataCell>
            </CTableRow>
            <CTableRow>
              <CTableDataCell>
                <span class="label">정책/지침 현황</span>
              </CTableDataCell>
              <CTableDataCell>
                <span :class="getReadinessClass(item.policyReadiness)">
                  {{ item.policyReadiness.completed }}/{{ item.policyReadiness.total }}
                </span>
              </CTableDataCell>
            </CTableRow>
            <CTableRow>
              <CTableDataCell>
                <span class="label">증적 자료 현황</span>
              </CTableDataCell>
              <CTableDataCell>
                <span :class="getReadinessClass(item.evidenceReadiness)">
                  {{ item.evidenceReadiness.completed }}/{{ item.evidenceReadiness.total }}
                </span>
              </CTableDataCell>
            </CTableRow>
          </CTableBody>
        </CTable>
        <CCard>
          <CCardBody>
        <CCard class="mapped-elements">
          <CCardHeader>
            <span class="header-title">정책/지침 자료 추천
              <span class="ai-badge-feedback">AI</span>
            </span>
          </CCardHeader>
          <CCardBody>
            <div class="ai-suggestion">
              <span>PIM AI는 {{ item.id }} 항목에 맞는 {{ aiSuggestions.policy }}개의 정책/지침 문서를 추천드립니다.</span>
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
            <CCardHeader>
            <span class="header-title">증적 자료 추천
              <span class="ai-badge-feedback">AI</span>
            </span>
            </CCardHeader>
            <CCardBody>
              <div class="ai-suggestion">
                <span>PIM AI는 {{ item.id }} 항목에 맞는 {{ aiSuggestions.evidence }}개의 증적 자료를 추천드립니다.</span>
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
      aiSuggestions: {
        policy: 4,
        evidence: 3
      },
      policies: [
        { name: '정보보호 뭐시기 정책', selected: true },
        { name: '정보보호 지침', selected: true },
        { name: '정보보호 가이드', selected: true },
        { name: '정보보호 레전드 해설서', selected: false }
      ],
      evidences: [
        { name: 'Privacy compliance policy', selected: true },
        { name: 'Inventory of designated data is maintained', selected: true },
        { name: 'Critical Infrastructure Check', selected: true }
      ],
      showAddPopup: false,
      showRemovePopup: false,
      currentIndex: null,
    }
  },
  methods: {
    closePopup() {
      this.$emit('close')
    },
    togglePolicy(index) {
      this.policies[index].selected = !this.policies[index].selected
    },
    removePolicy(index) {
      this.policies.splice(index, 1)
    },
    toggleEvidence(index) {
      this.evidences[index].selected = !this.evidences[index].selected
    },
    removeEvidence(index) {
      this.evidences.splice(index, 1)
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
  }
}
</script>

<style scoped>
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
  width: 50%;
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
  background-color: #747af2;
  color: white;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 0.65em;
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
  background-color: #747af2;
  color: white;
}

.remove-button {
  background-color: white;
  color: black;
  border-radius: 0; /* Makes the border square */
  border: 1px solid black; /* Adds a black border */
}

.button-icon {
  font-size: 18px;
  line-height: 1;
}

.show-more {
  background: none;
  border: none;
  color: #8a2be2;
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

.mapped-elements {
  margin-bottom: 20px; /* Adjust this value to increase or decrease the space */
}

.mapped-elements h3 {
  margin-top: 20px;
}


.evidence-readiness {
  background-color: #E8F5E9;
  color: #4CAF50;
  padding: 4px 9px;
  border-radius: 12px;
  display: inline-block;
  font-size: 0.85em;
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
  background-color: #f0e6ff;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 4px;
}


</style>
