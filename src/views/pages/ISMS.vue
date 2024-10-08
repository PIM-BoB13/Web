<template>
  <div>
    <CRow class="align-items-stretch">
      <!-- 왼쪽 화면 (ISMS 항목 목록) -->
      <CCol :xs="4">
        <CCard class="mb-4 left-box" style="height: 80vh;">
          <CCardBody class="d-flex flex-column" style="height: 100%;">
            <div>
              <h5>ISMS 인증기준 항목</h5>
              <input type="text" v-model="searchQuery" placeholder="항목 검색" class="form-control mb-3" />
              <CCard class="mb-3" style="height: auto; max-height: 72vh; overflow-y: auto;">
                <CCardBody>
                  <!-- 테이블에서 모든 항목과 하위 항목이 표시됨 -->
                  <CTable striped hover class="small-table">
                    <!-- 테이블 헤더 추가 -->
                    <CTableHead>
                      <CTableRow>
                        <CTableHeaderCell>항목</CTableHeaderCell>
                        <CTableHeaderCell class="center-align">이행여부</CTableHeaderCell>
                        <CTableHeaderCell class="center-align">운영명세서</CTableHeaderCell>
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                      <!-- 데이터 배열을 순회하여 상위 제목, 중간 제목, 최하위 항목 표시 -->
                      <template v-for="(section, sectionIndex) in filteredSections" :key="sectionIndex">
                        <CTableRow>
                          <!-- 상위 제목 -->
                          <CTableDataCell colspan="3" class="title-cell">{{ section.title }}</CTableDataCell>
                        </CTableRow>

                        <template v-for="(subSection, subSectionIndex) in section.subSections" :key="subSectionIndex">
                          <CTableRow>
                            <!-- 중간 제목 -->
                            <CTableDataCell colspan="3" class="subtitle-cell">{{ subSection.title }}</CTableDataCell>
                          </CTableRow>

                          <!-- 최하위 항목 -->
                          <CTableRow v-for="(item, itemIndex) in subSection.items" :key="itemIndex">
                            <CTableDataCell>{{ item.id }} {{ item.title }}</CTableDataCell>
                            <CTableDataCell class="center-align">
                              <!-- 이행여부는 서버에서 받아온 값을 대신해 미리 정의된 상태로 표시 -->
                              <span :class="item.status === '이행' ? 'text-success' : 'text-danger'">{{ item.status }}</span>
                            </CTableDataCell>
                            <CTableDataCell class="center-align">
                              <CButton color="primary" class="small-btn" @click="viewOperationalDetails(item)">확인하기</CButton>
                            </CTableDataCell>
                          </CTableRow>
                        </template>
                      </template>
                    </CTableBody>
                  </CTable>
                </CCardBody>
              </CCard>
            </div>
          </CCardBody>
        </CCard>
      </CCol>

      <!-- 오른쪽 화면 (선택된 항목의 운영명세서) -->
      <CCol :xs="8" class="d-flex flex-column">
        <CCard v-if="selectedOperationalDetails">
          <CCardBody>
            <h5>운영명세서: {{ selectedOperationalDetails.title }}</h5>
            <p>{{ selectedOperationalDetails.description }}</p>
          </CCardBody>
        </CCard>
        <CCard v-else class="d-flex justify-content-center align-items-center">
          <CCardBody>
            <p>운영명세서를 선택해 주세요.</p>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
import { ref, computed } from "vue";

export default {
  setup() {
    // ISMS 항목 데이터 - 상위 제목, 중간 제목, 최하위 항목들 포함
    const sections = ref([
      {
        title: "1. 관리체계 수립 및 운영",
        subSections: [
          {
            title: "1.1 관리체계 기반 마련",
            items: [
              { id: "1.1.1", title: "정보보호 정책 수립", status: "이행" },
              { id: "1.1.2", title: "정보보호 조직 구성", status: "결함" },
              { id: "1.1.3", title: "정보보호 역할 및 책임 정의", status: "이행" },
            ],
          },
          {
            title: "1.2 자산 관리",
            items: [
              { id: "1.2.1", title: "자산 식별", status: "이행" },
              { id: "1.2.2", title: "자산 관리 체계 수립", status: "결함" },
            ],
          },
        ],
      },
      {
        title: "2. 보호대책 수립 및 운영",
        subSections: [
          {
            title: "2.1 자산 관리",
            items: [
              { id: "2.1.1", title: "자산 식별", status: "이행" },
              { id: "2.1.2", title: "자산 관리 체계 수립", status: "이행" },
            ],
          },
        ],
      },
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

    const viewOperationalDetails = (item) => {
      selectedOperationalDetails.value = {
        title: `항목 ${item.id} 운영명세서`,
        description: `여기에 ${item.title}에 대한 운영명세서의 세부 정보가 표시됩니다.`,
      };
    };

    return {
      sections,
      searchQuery,
      filteredSections,
      selectedOperationalDetails,
      viewOperationalDetails,
    };
  },
};
</script>

<style scoped>
/* 테이블 및 버튼 크기 조정 */
.small-table {
  font-size: 12px; /* 글씨 크기 줄이기 */
}

.small-btn {
  font-size: 10px; /* 버튼 글씨 크기 줄이기 */
  padding: 4px 8px; /* 버튼 패딩 줄이기 */
  background-color: transparent; /* 버튼 배경색 투명 */
}

.small-header {
  font-size: 10px; /* 테이블 헤더 글씨 크기 줄이기 */
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
  color: green;
}

.text-danger {
  color: red;
}

table th,
table td {
  text-align: left;
  padding: 4px; /* 셀의 padding 줄이기 */
  font-size: 10px; /* 테이블 안의 글씨 크기 줄이기 */
}

.right-align {
  text-align: right; /* 오른쪽 정렬 */
}

.center-align {
  text-align: center; /* 중앙 정렬 */
}
</style>
