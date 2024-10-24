<template>
  <div class="isms-gap-analysis">
    <div class="completion-section">
      <div class="completion-header">
        <h2>GAP 분석 현황</h2>
        <div class="framework-name">{{ framework.name }}</div>
      </div>
      <div class="completion-content">
        <div class="main-progress">
          <h4>GAP 분석 이행률: {{ completion }}% </h4>
          <div class="progress-bar">
            <div class="progress" :style="{ width: completion + '%' }"></div>
          </div>
          <div class="stats">
            <span>전체 {{ totalControls }}개 세부 항목 중 </span>
            <span>{{ completedControls }}개 세부 항목 이행</span>
          </div>
        </div>
        <div class="sub-stats">
          <div class="mini-stat">
            <div class="mini-stat-header">
              <span>정책/지침 자료 현황</span>
              <span>{{ testCompleted }}/{{ testTotal }}</span>
            </div>
            <div class="mini-progress-bar">
              <div class="mini-progress" :style="{ width: testCompletion + '%' }"></div>
            </div>
          </div>
          <div class="mini-stat">
            <div class="mini-stat-header">
              <span>증적 자료 현황</span>
              <span>{{ documentCompleted }}/{{ documentTotal }}</span>
            </div>
            <div class="mini-progress-bar">
              <div class="mini-progress" :style="{ width: documentCompletion + '%' }"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Search Bar -->
    <div class="search-bar">
      <i class="fas fa-search search-icon"></i>
      <input type="text" v-model="searchQuery" placeholder="검색할 항목 번호를 입력하세요 (예: 1.1.1.1)" />
    </div>

    <div v-for="section in filteredSections" :key="section.id" class="section">
      <CCard class="mb-4">
        <CCardBody>
          <h2>{{ section.id }} {{ section.title }}</h2>
          <table>
            <thead>
            <tr>
              <th>세부항목</th>
              <th>정책/지침 현황</th>
              <th>증적자료 현황</th>
              <th>담당자</th>
              <th></th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="control in section.controls" :key="control.id"
                @mouseover="hoverControl(control.id)"
                @mouseleave="hoverControl(null)"
                @click="openPopup(control)"
                :class="{ 'hovered': hoveredControl === control.id }">
              <td>
                <div class="control-id">{{ control.id }}</div>
                <div class="control-question">{{ control.question }}</div>
              </td>
              <td class="center-align">
                <div :class="getReadinessClass(control.policyReadiness)">
                  {{ control.policyReadiness }}개
                </div>
              </td>
              <td class="center-align">
                <div :class="getReadinessClass(control.evidenceReadiness)">
                  {{ control.evidenceReadiness }}개
                </div>
              </td>
              <td>{{ control.owner }}</td>
            </tr>
            </tbody>
          </table>
        </CCardBody>
      </CCard>
    </div>

    <!-- GapSlide Popup -->
    <GapSlide
      v-if="isPopupVisible"
      :item="selectedItem"
      :isOpen="isPopupVisible"
      :sourceDocuments="sourceDocuments"
      :recommendations="recommendations"
      @close="closePopup"
    />
  </div>
</template>

<script>
import axios from 'axios';
import { CCard, CCardBody } from '@coreui/vue-pro';
import GapSlide from './GapSlide.vue'; // Import GapSlide component
import { sections} from '../../data/ISMS'; // Import data.js
export default {
  name: 'ISMSGapAnalysis',
  components: { CCard, CCardBody, GapSlide },
  data() {
    const currentDate = new Date().toISOString().split('T')[0];
    return {
      framework: {
        name: `이행 현황 (${currentDate} 기준)`,
        sections: sections
      },
      completion: 1,
      completedControls: 0,
      totalControls: 262,
      testCompleted: 0,
      testTotal: 262,
      documentCompleted: 0,
      documentTotal: 262,
      isPopupVisible: false, // Track popup visibility
      hoveredControl: null, // Track which control is being hovered
      selectedItem: null, // Track the selected item for the popup
      searchQuery: '', // Track the search query
      sourceDocuments: [], // Store the retrieved documents
      recommendations: [] // Store the retrieved recommendations
    };
  },
  computed: {
    testCompletion() {
      return (this.testCompleted / this.testTotal) * 100;
    },
    documentCompletion() {
      return (this.documentCompleted / this.documentTotal) * 100;
    },
    filteredSections() {
      if (!this.searchQuery) {
        return this.framework.sections;
      }
      const query = this.searchQuery.toLowerCase();
      return this.framework.sections.filter(section =>
        section.controls.some(control => control.id.toLowerCase().includes(query))
      );
    }
  },
  methods: {
    hoverControl(controlId) {
      this.hoveredControl = controlId; // Highlight the hovered row
    },

    async openPopup(control) {
      this.isPopupVisible = true; // Show popup
      this.selectedItem = control; // Pass the selected control to GapSlide
      this.$router.push({ path: this.$route.path, query: { id: control.id } }); // Update URL

      // Make an API call to retrieve data
      try {
        const response = await axios.post('http://43.202.210.72:5000/retrieval', {
          question: control.question
        });
        this.sourceDocuments = response.data.source_documents;
      } catch (error) {
        console.error('Error fetching data:', error);
        this.sourceDocuments = []; // 에러일 때는 빈배열로
      }

      try {
        const response = await axios.post('http://43.202.210.72:3001/evidence_recommend', {
          id: control.id
        });
        this.recommendations = response.data.recommendations.length ? response.data.recommendations : null;
      } catch (error) {
        console.error('Error fetching data:', error);
        this.recommendations = null; // Set to null on error
      }

    },
    closePopup() {
      this.isPopupVisible = false; // Close the popup
      // this.$router.push({ path: this.$route.path }); // Restore original URL
    },
    getReadinessClass(readiness) {
      return readiness === 0 ? 'evidence-readiness incomplete' : 'evidence-readiness complete';
    }
  },
};
</script>

<style scoped>
.isms-gap-analysis {
  font-family: Arial, sans-serif;
}

.completion-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.completion-section {
  background-color: #f3f9ff;
  border: 3px solid #e0e0e0;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 20px;
}

.completion-content {
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  gap: 50px;
}

.main-progress {
  flex: 1;
  margin-right: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.sub-stats {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.progress-bar{
  background-color: #e0e0e0;
  border-radius: 4px;
  height: 18px;
  margin: 16px 0;
}

.mini-progress-bar {
  background-color: #e0e0e0;
  border-radius: 4px;
  height: 8px;
  margin: 8px ;
}

.progress, .mini-progress {
  background-color: #1c25a9;
  border-radius: 4px;
  height: 100%;
}

.mini-stat {
  margin-bottom: 16px;
}

.mini-stat-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  text-align: left;
  padding: 12px;
  border-bottom: 1px solid #e0e0e0;
}

.center-align {
  text-align: center; /* 중앙정렬 */
}

.control-id {
  font-weight: bold;
}

.control-title {
  font-weight: bold;
  margin-top: 4px;
}

.control-question {
  font-size: 0.9em;
  color: #666;
  margin-top: 4px;
  max-width: 850px; /* Set the maximum width */


}

.evidence-readiness {
  background-color: #E8F5E9;
  color: #4CAF50;
  padding: 4px 8px;
  border-radius: 12px;
  display: inline-block;
}
.evidence-readiness.complete {
  background-color: #E8F5E9;
  color: #4CAF50;
}
.evidence-readiness.incomplete {
  background-color: #FFEBEE;
  color: #F44336;
}

.action-button {
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
}

.hovered {
  background-color: #f0f0f0; /* Light gray background for hovered row */
}

.search-bar {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
  position: relative;
}

.search-bar .search-icon {
  position: absolute;
  right: 368px; /* Align the icon to the right */
  top: 50%;
  transform: translateY(-50%);
  color: #ccc;
}

.search-bar input {
  padding: 8px 30px 8px 48px; /* Add padding to the right for the icon */
  font-size: 16px;
  border: 2px solid #ccc;
  border-radius: 20px;
  margin-right: 0px;
  width: 400px; /* Increase the width */
  text-align: left; /* Align text to the right */
}
</style>

