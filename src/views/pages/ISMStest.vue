<template>
  <div>
    <CRow class="align-items-stretch">
      <CCol :xs="4">
        <CCard class="mb-4 left-box" style="height: 80vh;">
          <CCardBody class="d-flex flex-column" style="height: 100%;">
            <div>
              <h5>ISMS 인증기준 항목</h5>
              <input type="text" v-model="searchQuery" placeholder="항목 검색" class="form-control mb-3" />
              <CCard class="mb-3" style="height: auto; max-height: 65vh; overflow-y: auto;">
                <CCardBody>
                  <table class="small-table">
                    <thead>
                    <tr>
                      <th>항목</th>
                      <th class="center-align1">이행여부</th>
                      <th class="center-align1">운영명세서</th>
                    </tr>
                    </thead>
                    <tbody>
                    <template v-for="(section, sectionIndex) in filteredSections" :key="sectionIndex">
                      <tr>
                        <td colspan="3" class="title-cell">{{ section.title }}</td>
                      </tr>
                      <template v-for="(subSection, subSectionIndex) in section.subSections" :key="subSectionIndex">
                        <tr>
                          <td colspan="3" class="subtitle-cell">{{ subSection.title }}</td>
                        </tr>
                        <template v-for="(item, itemIndex) in subSection.items" :key="itemIndex">
                          <tr>
                            <td colspan="3" class="subtitle-cell">{{ item.title }}</td>
                          </tr>
                          <tr v-for="(subItem, subItemIndex) in item.subItems" :key="subItemIndex">
                            <td>{{ subItem.id }} {{ subItem.title }}</td>
                            <td class="center-align3">
                              <span :class="getStatusClass(subItem.status)">{{ subItem.status }}</span>
                            </td>
                            <td class="center-align4">
                              <button class="small-btn" @click="viewOperationalDetails(subItem)">확인하기</button>
                            </td>
                          </tr>
                        </template>
                      </template>
                    </template>
                    </tbody>
                  </table>
                </CCardBody>
              </CCard>
            </div>
          </CCardBody>
        </CCard>
      </CCol>

      <CCol :xs="8" class="d-flex flex-column">
        <CCard class="right-box" v-if="loading">
          <CCardBody class="d-flex justify-content-center align-items-center">
            <div class="spinner-border" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </CCardBody>
        </CCard>
        <CCard class="right-box" v-else-if="selectedOperationalDetails">
          <CCardBody>
            <div>
              <div class="d-flex justify-content-between align-items-center">
                <h5 class="center-align title-spacing flex-grow-1 text-center">운영명세서</h5>
              </div>
              <div class="button-container">
                <button class="btn-details" @click="toggleEditMode">
                  {{ isEditMode ? '수정 취소' : '수정하기' }}
                </button>
              </div>
            </div>

            <div>
              <div class="detail-box">
                <strong>{{ selectedOperationalDetails.description }}</strong>
                <p class="details-paragraph">{{ selectedOperationalDetails.Details }}</p>
              </div>

              <div class="detail-row">
                <div class="detail-box">
                  <strong>이행여부: </strong>
                  <div v-if="isEditMode" class="inline-display">
                    <select v-model="editForm.status" class="form-control inline-select">
                      <option value="이행">이행</option>
                      <option value="결함">결함</option>
                      <option value="판단 전">판단 전</option>
                    </select>
                  </div>
                  <div v-else class="inline-display">
                    {{ selectedOperationalDetails.status }}
                  </div>
                </div>
                <div class="detail-box">
                  <strong>인증 구분:</strong> ISMS
                </div>
              </div>

              <div class="detail-box">
                <strong>운영현황(또는 미선택사유)</strong>
                <div class="editor-container">
                  <textarea
                    v-if="isEditMode"
                    v-model="editForm.operationalStatus"
                    class="form-control custom-textarea"
                    :style="{ height: getTextareaHeight(editForm.operationalStatus) }"
                    @input="handleInput($event, 'operationalStatus')"
                  ></textarea>
                  <div v-else class="content-display" v-html="formatContent(selectedOperationalDetails.operationalStatus)"></div>
                </div>
              </div>

              <div class="detail-box">
                <strong>관련문서(정책, 지침 등 세부조항번호까지)</strong>
                <div class="editor-container">
                  <textarea
                    v-if="isEditMode"
                    v-model="editForm.relatedDocuments"
                    class="form-control custom-textarea"
                    :style="{ height: getTextareaHeight(editForm.relatedDocuments) }"
                    @input="handleInput($event, 'relatedDocuments')"
                  ></textarea>
                  <div v-else class="content-display" v-html="formatContent(selectedOperationalDetails.relatedDocuments)"></div>
                </div>
              </div>

              <div class="detail-box">
                <strong>기록(증적자료)</strong>
                <div class="editor-container">
                  <textarea
                    v-if="isEditMode"
                    v-model="editForm.records"
                    class="form-control custom-textarea"
                    :style="{ height: getTextareaHeight(editForm.records) }"
                    @input="handleInput($event, 'records')"
                  ></textarea>
                  <div v-else class="content-display" v-html="formatContent(selectedOperationalDetails.records)"></div>
                </div>
              </div>

              <div v-if="isEditMode" class="button-container">
                <button class="btn-details" @click="saveDetails">저장하기</button>
              </div>
            </div>
          </CCardBody>
        </CCard>
        <CCard v-else class="d-flex justify-content-center align-items-center right-box">
          <CCardBody class="centered-text">
            인증기준 항목을 선택해 주세요.
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
import { ref, computed, reactive } from 'vue';
import { CCardBody } from "@coreui/vue-pro/dist/esm/components/card";

export default {
  name: 'IsmsManagement',
  components: { CCardBody },

  setup() {
    const sections = ref([
      {
        title: "1. 관리체계 수립 및 운영",
        subSections: [
          {
            title: "1.1 관리체계 기반 마련",
            items: [
              {
                title: "1.1.1 경영진의 참여",
                subItems: [
                  {
                    id: "1.1.1.1",
                    title: "정보보호 및 개인정보보호 관리체계의 수립 및 운영활동 전반에 경영진의 참여가 이루어질 수 있도록 보고 및 의사결정 등의 책임과 역할을 문서화하고 있는가?",
                    status: "판단 전",
                    Details: "정보보호 및 개인정보보호 관리체계의 수립 및 운영활동 전반에 경영진의 참여가 이루어질 수 있도록 보고 및 의사결정 등의 책임과 역할을 문서화하고 있는가?",
                    operationalStatus: "운영현황 내용",
                    relatedDocuments: "관련문서 내용",
                    records: "기록 내용"
                  },
                  {
                    id: "1.1.1.2",
                    title: "경영진이 정보보호 및 개인정보보호 활동에 관한 의사결정에 적극적으로 참여할 수 있는 보고, 검토 및 승인 절차를 수립·이행하고 있는가?",
                    status: "판단 전",
                    Details: "경영진이 정보보호 및 개인정보보호 활동에 관한 의사결정에 적극적으로 참여할 수 있는 보고, 검토 및 승인 절차를 수립·이행하고 있는가?",
                    operationalStatus: "운영현황 내용",
                    relatedDocuments: "관련문서 내용",
                    records: "기록 내용"
                  },
                ]
              },
              {
                title: "1.1.2 최고책임자의 지정",
                subItems: [
                  { id: "1.1.2.1", status: "판단 전", operationalStatus: "운영현황 내용", relatedDocuments: "관련문서 내용", records: "기록 내용" },
                  { id: "1.1.2.2", status: "판단 전", operationalStatus: "운영현황 내용", relatedDocuments: "관련문서 내용", records: "기록 내용" },
                ]
              },
            ]
          },
        ]
      },
    ]);

    const searchQuery = ref("");
    const selectedOperationalDetails = ref(null);
    const isEditMode = ref(false);
    const loading = ref(false);

    // 편집 폼 상태 관리
    const editForm = reactive({
      status: '',
      operationalStatus: '',
      relatedDocuments: '',
      records: ''
    });

    // 필터링된 섹션 계산
    const filteredSections = computed(() => {
      if (!searchQuery.value) {
        return sections.value;
      }

      return sections.value.map(section => {
        const filteredSubSections = section.subSections.map(subSection => {
          const filteredItems = subSection.items.map(item => ({
            ...item,
            subItems: item.subItems.filter(subItem =>
              subItem.id?.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
              subItem.title?.toLowerCase().includes(searchQuery.value.toLowerCase())
            )
          })).filter(item => item.subItems.length > 0);

          return {
            ...subSection,
            items: filteredItems
          };
        }).filter(subSection => subSection.items.length > 0);

        return {
          ...section,
          subSections: filteredSubSections
        };
      }).filter(section => section.subSections.length > 0);
    });

    // Methods
    const getStatusClass = (status) => {
      if (status === '이행') return 'text-success';
      if (status === '결함') return 'text-danger';
      if (status === '판단 전') return 'text-pending';
      return '';
    };

    const formatContent = (content) => {
      if (!content) return '';
      return content.replace(/\n/g, '<br>');
    };

    const getTextareaHeight = (text) => {
      if (!text) return '100px';
      const lineCount = (text.match(/\n/g) || []).length + 1;
      return `${Math.max(100, lineCount * 24)}px`;
    };

    const handleInput = (event, field) => {
      editForm[field] = event.target.value;
    };

    const viewOperationalDetails = (subItem) => {
      selectedOperationalDetails.value = {
        description: `${subItem.id}의 세부설명`,
        status: subItem.status,
        Details: subItem.Details,
        operationalStatus: subItem.operationalStatus,
        relatedDocuments: subItem.relatedDocuments,
        records: subItem.records
      };
      isEditMode.value = false;
    };

    const toggleEditMode = () => {
      if (!isEditMode.value) {
        // 편집 모드 시작 시 현재 값으로 폼 초기화
        editForm.status = selectedOperationalDetails.value.status;
        editForm.operationalStatus = selectedOperationalDetails.value.operationalStatus;
        editForm.relatedDocuments = selectedOperationalDetails.value.relatedDocuments;
        editForm.records = selectedOperationalDetails.value.records;
      }
      isEditMode.value = !isEditMode.value;
    };

    const saveDetails = () => {
      selectedOperationalDetails.value = {
        ...selectedOperationalDetails.value,
        status: editForm.status,
        operationalStatus: editForm.operationalStatus,
        relatedDocuments: editForm.relatedDocuments,
        records: editForm.records
      };
      isEditMode.value = false;
    };

    return {
      sections,
      searchQuery,
      filteredSections,
      selectedOperationalDetails,
      isEditMode,
      loading,
      editForm,
      getStatusClass,
      formatContent,
      getTextareaHeight,
      handleInput,
      viewOperationalDetails,
      toggleEditMode,
      saveDetails
    };
  }
};
</script>

<style scoped>
.small-table {
  font-size: 14px;
  width: 100%;
  border-collapse: collapse;
}

.small-btn {
  font-size: 10px;
  padding: 2px 4px;
  background-color: transparent;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.title-cell {
  font-weight: bold;
  background-color: #f0f0f0;
}

.subtitle-cell {
  padding-left: 10px;
  font-weight: bold;
  background-color: #e0e0e0;
}

.text-success {
  font-weight: bold;
}

.text-pending {
  color: #000000;
  font-weight: bold;
}

table th,
table td {
  text-align: left;
  padding: 4px; /* 셀의 padding 줄이기 */
  font-size: 14px; /* 테이블 안의 글씨 크기 키우기 */
  border: 1px solid #ddd;
}

.right-align {
  text-align: right; /* 오른쪽 정렬 */
}

.center-align {
  text-align: center; /* 중앙 정렬 */
  font-size: 24px;
}
.center-align1 {
  text-align: center; /* 중앙 정렬 */
  font-size: 10px;
}

.center-align3 {
  text-align: center; /* 중앙 정렬 */
  padding: 8px 0; /* 셀의 padding 줄이기 */
  font-size: 13px;
}

.center-align4 {
  text-align: center; /* 중앙 정렬 */
  padding: 2px 0; /* 셀의 padding 줄이기 */
  font-size: 1px;
}

.centered-text {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  font-size: 20px; /* Adjust the value as needed */
}

/* 3단계 항목 기본 흰색, hover 시 회색 */
table tr td {
  background-color: white !important;
}

table tr:hover td {
  background-color: #f0f0f0 !important;
}

/* 오른쪽 화면 스타일링 */
.detail-box {
  border: 1px solid #ddd;
  padding: 15px;
  margin-bottom: 20px;
  background-color: #fff; /* White background for document feel */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* Add subtle shadow */
}

.detail-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.detail-row .detail-box {
  flex: 1;
  margin-right: 10px;
}

.detail-row .detail-box:last-child {
  margin-right: 0;
}

.details-paragraph {
  margin-top: 6px; /* Adjust the value as needed */
  margin-bottom: 0px; /* Reduce the bottom margin */
}

/* Match the height of the right screen to the left screen */
.right-box {
  height: 80vh;
  overflow-y: auto; /* Enable vertical scrolling */
}

.title-spacing {
  margin-bottom: 5px; /* Adjust the value as needed */
}

.operational-status-box {
  overflow: auto; /* Enable scrolling if content overflows */
  max-height: none; /* Remove any fixed height constraints */
  height: auto; /* Allow the box to grow with the content */
  white-space: pre-wrap; /* Preserve whitespace and wrap text */
}

.btn-details {
  font-size: 12px;
  margin-top: 5px; /* Adjust the value as needed */
  background-color: #007bff;
  color: white;
  border: none;
  padding: 4px 6px;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 11px;
}

.btn-details:hover {
  background-color: #0056b3;
}

.button-container {
  text-align: right; /* Right-align the button */
  margin-top: 0; /* Remove the top margin */
}

.inline-display {
  display: inline-block;
}

.inline-select {
  width: auto;
  display: inline-block;
  padding: 1px 15px; /* Adjust the padding to reduce the height */
  height: auto; /* Ensure the height is auto */
}

.detail-box textarea {
  margin-top: 8px; /* Adjust the value as needed */
  overflow: hidden; /* Hide the scrollbar */
  resize: none; /* Prevent manual resizing */
}

/* Adjust the width of the columns for "항목", "이행여부", and "운영명세서" */
.small-table th:nth-child(1), /* Assuming "항목" is the first column */
.small-table td:nth-child(1) {
  width: 200px; /* Increase the width as needed */
}

.small-table th:nth-child(3), /* Assuming "이행여부" is the second column */
.small-table td:nth-child(2),
.small-table th:nth-child(3), /* Assuming "운영명세서" is the third column */
.small-table td:nth-child(3) {
  width: 60px; /* Decrease the width as needed */
}

</style>
