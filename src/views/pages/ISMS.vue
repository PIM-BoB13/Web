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
        <CCard class="right-box" v-if="selectedOperationalDetails">
          <CCardBody>
            <div>
              <div class="d-flex justify-content-between align-items-center">
                <h5 class="center-align title-spacing flex-grow-1 text-center">운영명세서</h5>
              </div>
              <div class="button-container">
                <button class="btn-details" @click="toggleEditMode">{{ isEditMode ? '수정 취소' : '수정하기' }}</button>
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
                    <select v-model="editStatus" class="form-control inline-select">
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
              <div class="detail-box operational-status-box">
                <strong>운영현황(또는 미선택사유)</strong>
                <div v-if="isEditMode">
                  <textarea v-model="editOperationalStatus" class="form-control"></textarea>
                </div>
                <div v-else class="details-paragraph">
                  {{ selectedOperationalDetails.operationalStatus }}
                </div>
              </div>
              <div class="detail-row">
                <div class="detail-box">
                  <strong>관련문서(정책, 지침 등 세부조항번호까지)</strong>
                  <div v-if="isEditMode">
                    <textarea v-model="editRelatedDocuments" class="form-control"></textarea>
                  </div>
                  <div v-else class="details-paragraph">
                    {{ selectedOperationalDetails.relatedDocuments }}
                  </div>
                </div>
                <div class="detail-box">
                  <strong>기록(증적자료)</strong>
                  <div v-if="isEditMode">
                    <textarea v-model="editRecords" class="form-control"></textarea>
                  </div>
                  <div v-else class="details-paragraph">
                    {{ selectedOperationalDetails.records }}
                  </div>
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
            운영명세서를 선택해 주세요.
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { CCardBody } from "@coreui/vue-pro/dist/esm/components/card";

export default {
  methods: {
    getStatusClass(status) {
      if (status === '이행') return 'text-success';
      if (status === '결함') return 'text-danger';
      if (status === '판단 전') return 'text-pending';
      return '';
    },
    toggleEditMode() {
      this.isEditMode = !this.isEditMode;
      if (this.isEditMode) {
        this.editOperationalStatus = this.selectedOperationalDetails.operationalStatus;
        this.editRelatedDocuments = this.selectedOperationalDetails.relatedDocuments;
        this.editRecords = this.selectedOperationalDetails.records;
        this.editStatus = this.selectedOperationalDetails.status;
      }
    },
    saveDetails() {
      this.selectedOperationalDetails.operationalStatus = this.editOperationalStatus;
      this.selectedOperationalDetails.relatedDocuments = this.editRelatedDocuments;
      this.selectedOperationalDetails.records = this.editRecords;
      this.selectedOperationalDetails.status = this.editStatus;
      this.isEditMode = false;
    }
  },
  components: { CCardBody },
  setup() {
    // ISMS 항목 데이터 - 상위 제목, 중간 제목, 최하위 항목들 포함
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
                  { id: "1.1.1.1", title: "경영진의 참여 세부항목 1", status: "판단 전", Details: "세부항목 1의 상세내용", operationalStatus: "운영현황", relatedDocuments: "관련문서", records: "기록" },
                  { id: "1.1.1.2", title: "경영진의 참여 세부항목 2", status: "결함" },
                ]
              },
              {
                title: "1.1.2 최고책임자의 지정",
                subItems: [
                  { id: "1.1.2.1", title: "최고책임자의 지정 세부항목 1", status: "이행" },
                ]
              },
            ]
          },
          {
            title: "1.2 위험 관리",
            items: [
              {
                title: "1.2.1 정보자산 식별",
                subItems: [
                  { id: "1.2.1.1", title: "정보자산 식별 세부항목 1", status: "이행" },
                ]
              },
            ]
          }
        ]
      },
      {
        title: "2. 보호대책 수립 및 운영",
        subSections: [
          {
            title: "2.1 자산 관리",
            items: [
              {
                title: "2.1.1 자산 식별",
                subItems: [
                  { id: "2.1.1.1", title: "자산 식별 세부항목 1", status: "이행" },
                ]
              },
            ]
          }
        ]
      }
    ]);

    // 검색어 필터링
    const searchQuery = ref("");

    const filteredSections = computed(() => {
      if (!searchQuery.value) {
        return sections.value;
      }
      return sections.value.map((section) => {
        const filteredSubSections = section.subSections.map((subSection) => {
          const filteredItems = subSection.items.filter((item) =>
            item.title.includes(searchQuery.value)
          );
          return { ...subSection, items: filteredItems };
        }).filter(subSection => subSection.items.length > 0);
        return { ...section, subSections: filteredSubSections };
      }).filter(section => section.subSections.length > 0);
    });

    const selectedOperationalDetails = ref(null);
    const isEditMode = ref(false);
    const editOperationalStatus = ref("");
    const editRelatedDocuments = ref("");
    const editRecords = ref("");
    const editStatus = ref("");

    const viewOperationalDetails = (subItem) => {
      selectedOperationalDetails.value = {
        description: `${subItem.id} ${subItem.title}의 상세내용`,
        status: subItem.status,
        Details: subItem.Details,
        operationalStatus: subItem.operationalStatus,
        relatedDocuments: subItem.relatedDocuments,
        records: subItem.records
      };
      isEditMode.value = false;
    };

    return {
      sections,
      searchQuery,
      filteredSections,
      selectedOperationalDetails,
      viewOperationalDetails,
      isEditMode,
      editOperationalStatus,
      editRelatedDocuments,
      editRecords,
      editStatus,
    };
  },
};
</script>

<style scoped>
/* 테이블 및 버튼 크기 조정 */
.small-table {
  font-size: 14px; /* 글씨 크기 키우기 */
  width: 100%;
  border-collapse: collapse;
}

.small-btn {
  font-size: 10px; /* 버튼 글씨 크기 줄이기 */
  padding: 2px 4px; /* 버튼 패딩 줄이기 */
  background-color: transparent; /* 버튼 배경색 투명 */
  border: 1px solid #ccc; /* 버튼 테두리 두께 줄이기 */
  border-radius: 5px; /* 모서리 둥글게 */
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
  color: #0410c2;
  font-weight: bold;
}

.text-danger {
  color: red;
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
  height: 250px; /* Adjust the value as needed */
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

.detail-box textarea{
  margin-top: 8px; /* Adjust the value as needed */
}
</style>
