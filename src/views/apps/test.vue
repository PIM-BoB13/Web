<template>
  <div>
    <CRow class="align-items-stretch">
      <!-- 왼쪽 화면 (설명 및 버튼) -->
      <CCol :xs="4">
        <CCard class="mb-4 left-box">
          <CCardBody class="d-flex flex-column justify-content-between">
            <div>
              <h3>문서 목록</h3>

              <CCard class="mb-3">
                <CCardBody>
                  <ul>
                    <li v-for="doc in documents" :key="doc.id" @click="selectDocument(doc)" :class="{ active: doc.id === selectedDocument?.id }">
                      {{ doc.title }}
                    </li>
                  </ul>
                </CCardBody>
              </CCard>
            </div>
          </CCardBody>
        </CCard>
      </CCol>

      <!-- 오른쪽 화면 (PDF 뷰어) -->
      <CCol :xs="8">
        <CCard class="mb-4 right-box">
          <CCardBody>
            <div class="content">
              <!-- 차트 섹션 -->
              <div class="charts">
                <div class="chart-card">
                  <h4>ISMS 이행 현황</h4>
                  <canvas id="doughnutChart"></canvas>
                </div>
                <div class="chart-card">
                  <h4>검토 필요 보고서</h4>
                  <canvas id="radarChart"></canvas>
                </div>
                <div class="chart-card">
                  <h4>검토 필요 항목</h4>
                  <canvas id="barChart"></canvas>
                </div>
              </div>

              <!-- 선택된 문서의 목차 테이블 -->
              <div v-if="selectedDocument" class="document-details">
                <h3>{{ selectedDocument.title }}의 상세 목차</h3>
                <table>
                  <thead>
                  <tr>
                    <th>구분</th>
                    <th>관련 법률</th>
                    <th>반영 여부</th>
                    <th>상세보기</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="(item, index) in selectedDocument.toc" :key="index">
                    <td>{{ item.category }}</td>
                    <td>{{ item.law }}</td>
                    <td>{{ item.compliance }}</td>
                    <td><button @click="viewDetails(item)">상세보기</button></td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import Chart from "chart.js/auto";

export default {
  setup() {
    const documents = ref([
      {
        id: 1,
        title: "문서 A",
        toc: [
          { category: "1.1.1", law: "법률 A", compliance: "O" },
          { category: "1.1.2", law: "법률 B", compliance: "X" },
        ],
      },
      {
        id: 2,
        title: "문서 B",
        toc: [
          { category: "2.1.1", law: "법률 C", compliance: "O" },
          { category: "2.1.2", law: "법률 D", compliance: "X" },
        ],
      },
    ]);

    const selectedDocument = ref(null);

    const selectDocument = (doc) => {
      selectedDocument.value = doc;
    };

    const viewDetails = (item) => {
      alert(`${item.category}의 상세 내용`);
    };

    // 차트 생성
    onMounted(() => {
      createCharts();
    });

    const createCharts = () => {
      // 도넛 차트
      const ctxDoughnut = document.getElementById("doughnutChart").getContext("2d");
      new Chart(ctxDoughnut, {
        type: "doughnut",
        data: {
          labels: ["완료", "미완료"],
          datasets: [
            {
              data: [70, 30],
              backgroundColor: ["#36A2EB", "#FF6384"],
            },
          ],
        },
      });

      // 레이더 차트
      const ctxRadar = document.getElementById("radarChart").getContext("2d");
      new Chart(ctxRadar, {
        type: "radar",
        data: {
          labels: ["항목 1", "항목 2", "항목 3", "항목 4"],
          datasets: [
            {
              label: "검토 필요 보고서",
              data: [65, 59, 90, 81],
              backgroundColor: "rgba(179,181,198,0.2)",
              borderColor: "rgba(179,181,198,1)",
            },
          ],
        },
      });

      // 막대 차트
      const ctxBar = document.getElementById("barChart").getContext("2d");
      new Chart(ctxBar, {
        type: "bar",
        data: {
          labels: ["항목 1", "항목 2", "항목 3", "항목 4"],
          datasets: [
            {
              label: "검토 필요 항목",
              data: [12, 19, 3, 5],
              backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
            },
          ],
        },
      });
    };

    return {
      documents,
      selectedDocument,
      selectDocument,
      viewDetails,
    };
  },
};
</script>

<style scoped>
.container {
  display: flex;
  height: 100vh;
}

.sidebar {
  width: 20%;
  background-color: #f0f0f0;
  padding: 20px;
}

.sidebar h3 {
  margin-bottom: 10px;
}

.sidebar ul {
  list-style: none;
  padding: 0;
}

.sidebar ul li {
  padding: 10px;
  cursor: pointer;
  background-color: #fff;
  margin-bottom: 5px;
  border-radius: 4px;
}

.sidebar ul li:hover {
  background-color: #e0e0e0;
}

.sidebar ul li.active {
  background-color: #d0d0d0;
}

.content {
  width: 80%;
  padding: 20px;
}

.charts {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.chart-card {
  width: 30%;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
}

.document-details table {
  width: 100%;
  border-collapse: collapse;
}

.document-details table th,
.document-details table td {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: left;
}
</style>
