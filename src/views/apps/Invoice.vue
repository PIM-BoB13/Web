<template>
  <div>
    <CRow class="align-items-stretch">
      <!-- 왼쪽 화면 (문서 목록) -->
      <CCol :xs="3">
        <CCard class="mb-4 left-box" style="height: 80vh;">
          <CCardBody class="d-flex flex-column" style="height: 100%;">
            <div>
              <h5>문서 목록</h5>
              <CCard class="mb-3" style="height: auto; max-height: 72vh; overflow-y: auto;">
                <CCardBody>
                  <ul>
                    <li
                      v-for="doc in documents"
                      :key="doc.id"
                      @click="selectDocument(doc)"
                      :class="{ active: doc.id === selectedDocument?.id }"
                    >
                      {{ doc.title }}
                    </li>
                  </ul>
                </CCardBody>
              </CCard>
            </div>
          </CCardBody>
        </CCard>
      </CCol>

      <!-- 오른쪽 화면 (통계 및 선택된 문서 정보) -->
      <CCol :xs="9" class="d-flex flex-column">
        <CCard class="mb-4">
          <CCardBody>
            <CRow>
              <CCol md="6">
                <CCard>
                  <CCardBody class="chart-container" style="height: 250px; position: relative;">
                    <h5 style="position: absolute; top: 10px; left: 10px; margin-bottom: 20px;">컴플라이언스 준수 현황</h5>
                    <div class="d-flex justify-content-center align-items-center" style="height: 100%;">
                      <canvas id="doughnutChart" class="chart-canvas" width="400" height="400"></canvas>
                    </div>
                  </CCardBody>
                </CCard>
              </CCol>
              <CCol md="6">
                <CCard>
                  <CCardBody class="chart-container" style="height: 250px;">
                    <h5 style="position: absolute; top: 10px; left: 10px; margin-bottom: 20px;">우선 검토 조항 보고서</h5>
                    <div class="d-flex justify-content-center align-items-center" style="height: 100%;">
                      <canvas id="radarChart" class="chart-canvas1" width="500" height="500"></canvas>
                    </div>
                  </CCardBody>
                </CCard>
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>

        <!-- 오른쪽 화면 아래 리스트 테이블 -->
        <CCard class="document-details" v-if="selectedDocument">
          <CCardBody>
            <h5>{{ selectedDocument.title }}의 조항 별 컴플라이언스 준수 여부</h5>
            <CTable striped hover>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell style="width: 20%; text-align: left;">구분</CTableHeaderCell>
                  <CTableHeaderCell style="width: 50%; text-align: left;">관련 법률</CTableHeaderCell>
                  <CTableHeaderCell style="width: 20%; text-align: center; vertical-align: middle;">준수 여부</CTableHeaderCell>
                  <CTableHeaderCell style="width: 10%; text-align: center; vertical-align: middle;">상세보기</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                <CTableRow v-for="(item, index) in selectedDocument.toc" :key="index">
                  <!-- 좌측 정렬 -->
                  <CTableDataCell style="width: 20%; text-align: left;">{{ item.category }}</CTableDataCell>
                  <CTableDataCell style="width: 50%; text-align: left;">{{ item.law }}</CTableDataCell>

                  <!-- 가로 및 세로 중앙 정렬 -->
                  <CTableDataCell style="width: 20%; text-align: center; vertical-align: middle;">{{ item.compliance }}</CTableDataCell>
                  <CTableDataCell style="width: 10%; text-align: center; vertical-align: middle;">
                    <CButton class="btn-details" color="primary" @click="viewDetails(item)">상세보기</CButton>
                  </CTableDataCell>
                </CTableRow>
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>

        <CCard v-else class="d-flex justify-content-center align-items-center">
          <CCardBody>
            <p>문서 목록에서 컴플라이언스 분석을 진행할 문서를 선택하세요.</p>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>

    <!-- SlidePopup Component -->
    <SlidePopup v-if="isPopupVisible" :item="selectedItem" @close="closePopup" />
  </div>
</template>

<script>
import { ref } from "vue";
import Chart from "chart.js/auto";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import SlidePopup from "./SlidePopup.vue"; // SlidePopup 컴포넌트 임포트

Chart.register(ChartDataLabels);

export default {
  components: {
    SlidePopup, // 컴포넌트 등록
  },
  setup() {
    const documents = ref([
      {
        id: 1,
        title: "정보보호지침",
        toc: [
          { category: "제1조(목적)", law: "개인정보 보호법 제29조(안전조치의무), 제 31조(개인정보 보호책임자의 지정), 정보통신망법 제45조의3(정보보호 최고책임자의 지정 등), 개인정보의 안전성 확보조치 기준 제4조(내부 관리계획의 수립 및 시행 및 점검) ", compliance: "O" },
          { category: "제2조(적용 범위)", law: "정보통신망법 제45조의3(정보보호 최고책임자의 지정 등), 개인정보의 안전성 확보조치 기준 제4조(내부 관리계획의 수립 및 시행 및 점검)", compliance: "X" },
            { category: "제3조(용어 정의)", law: "개인정보 보호법 제29조(안전조치의무), 제 31조(개인정보 보호책임자의 지정) ", compliance: "O" },
            { category: "제4조(수립 및 공표)", law: "정보통신망법 제45조의3(정보보호 최고책임자의 지정 등), 개인정보의 안전성 확보조치 기준 제4조(내부 관리계획의 수립 및 시행 및 점검)", compliance: "X" },
            { category: "제5조(역할 및 책임)", law: "개인정보 보호법 제29조(안전조치의무)", compliance: "O" },
            { category: "제6조(접근 권한)", law: "정보통신망법 제45조의3(정보보호 최고책임자의 지정 등), 개인정보의 안전성 확보조치 기준 제4조(내부 관리계획의 수립 및 시행 및 점검)", compliance: "O" },
            { category: "제7조(암호화)", law: "개인정보 보호법 제29조(안전조치의무)", compliance: "O" },
            { category: "제8조(개인정보)", law: "정보통신망법 제45조의3(정보보호 최고책임자의 지정 등), 개인정보의 안전성 확보조치 기준 제4조(내부 관리계획의 수립 및 시행 및 점검)", compliance: "X" },
        ],
      },
      {
        id: 2,
        title: "개인정보보호 정책",
        toc: [
          { category: "2.1.1", law: "법률 C", compliance: "O" },
          { category: "2.1.2", law: "법률 D", compliance: "X" },
        ],
      },
      {
        id: 3,
        title: "내부 관리계획",
        toc: [
          { category: "1.1.1", law: "법률 A", compliance: "O" },
          { category: "1.1.2", law: "법률 B", compliance: "X" },
        ],
      },
      {
        id: 4,
        title: "개인정보 내부 관리계획",
        toc: [
          { category: "2.1.1", law: "법률 C", compliance: "O" },
          { category: "2.1.2", law: "법률 D", compliance: "X" },
        ],
      },
      {
        id: 5,
        title: "위험관리 지침",
        toc: [
          { category: "1.1.1", law: "법률 A", compliance: "O" },
          { category: "1.1.2", law: "법률 B", compliance: "X" },
        ],
      },
      {
        id: 6,
        title: "직무 분리 관련 지침",
        toc: [
          { category: "2.1.1", law: "법률 C", compliance: "O" },
          { category: "2.1.2", law: "법률 D", compliance: "X" },
        ],
      },
      {
        id: 7,
        title: "인적 보안 지침",
        toc: [
          { category: "1.1.1", law: "법률 A", compliance: "O" },
          { category: "1.1.2", law: "법률 B", compliance: "X" },
        ],
      },
      {
        id: 8,
        title: "위탁보안 관리 지침",
        toc: [
          { category: "2.1.1", law: "법률 C", compliance: "O" },
          { category: "2.1.2", law: "법률 D", compliance: "X" },
        ],
      },
        {
            id: 9,
            title: "위탁 내부관리 지침",
            toc: [
                { category: "2.1.1", law: "법률 C", compliance: "O" },
                { category: "2.1.2", law: "법률 D", compliance: "X" },
            ],
        },
        {
            id: 10,
            title: "외부자 계약 종료와 관련된 내부 정책",
            toc: [
                { category: "2.1.1", law: "법률 C", compliance: "O" },
                { category: "2.1.2", law: "법률 D", compliance: "X" },
            ],
        },
        {
            id: 11,
            title: "물리적 보안 지침",
            toc: [
                { category: "2.1.1", law: "법률 C", compliance: "O" },
                { category: "2.1.2", law: "법률 D", compliance: "X" },
            ],
        },
        {
            id: 12,
            title: "비밀번호 관리 정책 및 절차",
            toc: [
                { category: "2.1.1", law: "법률 C", compliance: "O" },
                { category: "2.1.2", law: "법률 D", compliance: "X" },
            ],
        },
        {
            id: 13,
            title: "특수권한 관련 지침",
            toc: [
                { category: "2.1.1", law: "법률 C", compliance: "O" },
                { category: "2.1.2", law: "법률 D", compliance: "X" },
            ],
        },
    ]);

    const selectedDocument = ref(null);
    let doughnutChartInstance = null;
    let radarChartInstance = null;
    const selectedItem = ref(null); // 선택된 항목 데이터
    const isPopupVisible = ref(false); // 팝업 표시 여부

    const selectDocument = (doc) => {
      selectedDocument.value = doc;
      updateCharts();
    };

    const updateCharts = () => {
      const doughnutCanvas = document.getElementById("doughnutChart").getContext("2d");
      const radarCanvas = document.getElementById("radarChart").getContext("2d");

      // 도넛 차트 업데이트 (ISMS 이행 현황)
      if (doughnutChartInstance) doughnutChartInstance.destroy();
      doughnutChartInstance = new Chart(doughnutCanvas, {
        type: "doughnut",
        data: {
          labels: ["준수", "미준수"],
          datasets: [
            {
              data: [70, 30],
              backgroundColor: ["#36A2EB", "#FF6384"],
            },
          ],
        },
        options: {
          maintainAspectRatio: false,
          responsive: true,
          plugins: {
            legend: {
              position: 'right',
              labels: {
                padding: 40,
                font: {
                  size: 18,
                },
                generateLabels: (chart) => {
                  const data = chart.data.datasets[0].data;
                  return chart.data.labels.map((label, i) => ({
                    text: `${label} (${data[i]}%)`,
                    fillStyle: chart.data.datasets[0].backgroundColor[i],
                    strokeStyle: chart.data.datasets[0].backgroundColor[i],
                    hidden: false,
                    index: i,
                  }));
                },
              },
            },
            datalabels: {
              color: '#000',
              formatter: (value) => `${value}%`,
              anchor: 'center',
              align: 'center',
              font: {
                weight: 'bold',
                size: 20,
              },
            },
          },
        },
      });

      // 레이더 차트 업데이트 (검토 필요 보고서)
      if (radarChartInstance) radarChartInstance.destroy();
      radarChartInstance = new Chart(radarCanvas, {
        type: "radar",
        data: {
          labels: ["제3조", "제2조", "제1조", "기타"],
          datasets: [
            {
              label: "검토 필요 보고서",
              data: [65, 59, 90, 81],
              backgroundColor: "rgba(179,181,198,0.2)",
              borderColor: "rgba(179,181,198,1)",
            },
          ],
        },
        options: {
          maintainAspectRatio: false,
          responsive: true,
          plugins: {
            legend: {
              position: 'right',
              labels: {
                padding: 20,
                font: {
                  size: 16,
                },
                generateLabels: (chart) => {
                  const data = chart.data.datasets[0].data;
                  return chart.data.labels.map((label, i) => ({
                    text: `${label} (${data[i]})`,
                    fontColor: '#000',
                    hidden: false,
                    index: i,
                  }));
                },
              },
            },
            datalabels: {
              color: '#000',
              formatter: (value) => `${value}%`,
              anchor: 'center',
              align: 'center',
              font: {
                weight: 'bold',
                size: 16,
              },
            },
          },
        },
      });
    };

    const viewDetails = (item) => {
      selectedItem.value = item;
      isPopupVisible.value = true; // 팝업 열기
    };

    const closePopup = () => {
      isPopupVisible.value = false; // 팝업 닫기
    };

    return {
      documents,
      selectedDocument,
      selectDocument,
      viewDetails,
      isPopupVisible,
      selectedItem,
      closePopup,
    };
  },
};
</script>

<style scoped>
/* 테이블 관련 스타일 추가 */
table th, table td {
  word-break: keep-all; /* 줄바꿈 방지 */
}

.container {
  display: flex;
  height: 100vh;
}

.left-box {
  height: 100vh;
}

.left-box ul {
  list-style: none;
  padding: 0;
}

.left-box ul li {
  padding: 10px;
  cursor: pointer;
  background-color: #fff;
  margin-bottom: 5px;
  border-radius: 4px;
}

.left-box ul li:hover {
  background-color: #e0e0e0;
}

.left-box ul li.active {
  background-color: #d0d0d0;
}

.chart-container {
  position: relative;
  height: 300px;
}

.chart-canvas {
  display: block;
  padding-top: 40px;
  width: 74% !important;
  height: 90% !important;
}

.chart-canvas1 {
  display: block;
  padding-top: 40px;
  width: 80% !important;
  height: 100% !important;
}

.d-flex {
  display: flex;
}

.styled-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 1rem;
}

.styled-table th,
.styled-table td {
  padding: 10px;
}

.styled-table th {
  text-align: center; /* 테이블 헤더는 중앙 정렬 */
}

.btn-details {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
}

.btn-details:hover {
  background-color: #0056b3;
}
</style>
