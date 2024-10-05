<template>
  <div class="popup-overlay" @click.self="closePopup">
    <div class="popup-content">
      <button class="close-btn" @click="closePopup">X</button>
      <div class="popup-body">
        <CCard class="mb-4">
          <CCardHeader class="header-title">
            {{ item.category }} 상세 내용
          </CCardHeader>
          <CCBody>
            <CTable>
              <CTableBody>
                <CTableRow>
                  <CTableDataCell class="text-start padded-cell">
                    <strong>구분</strong>
                  </CTableDataCell>
                  <CTableDataCell class="text-start padded-cell">{{ item.category }}</CTableDataCell>
                </CTableRow>
                <CTableRow>
                  <CTableDataCell class="text-start padded-cell">
                    <strong>관련 법률</strong>
                  </CTableDataCell>
                  <CTableDataCell class="text-start padded-cell">{{ item.law }}</CTableDataCell>
                </CTableRow>
                <CTableRow>
                  <CTableDataCell class="text-start padded-cell">
                    <strong>준수 여부</strong>
                  </CTableDataCell>
                  <CTableDataCell class="text-start padded-cell align-middle">{{ item.compliance }}</CTableDataCell>
                </CTableRow>
              </CTableBody>
            </CTable>
          </CCBody>
        </CCard>

        <CCard class="mb-4">
          <CCardHeader class="header-title">
            관련 법률 내용
          </CCardHeader>
          <CCBody>
            <CTable>
              <CTableBody>
                <CTableRow>
                  <CTableDataCell class="text-start padded-cell">
                    제1항에도 불구하고 개인정보처리자는 다음 각호의 제1항에도 불구하고 개인정보처리자는 다음 각 호의 어느 하나에 해당하는 경우에는 정보주체 또는 제3자의 이익을 부당하게 침해할 우려가 있을 때를 제외하고는 개인정보를 목적 외의 용도로 이용하거나 이를 제3자에게 제공할 수 있다. 다만, 제5호부터 제9호까지에 따른 경우는 공공기관의 경우로 한정한다. (개정 2020. 2. 4., 2023. 3. 14.)
                    1. 정보주체로부터 별도의 동의를 받은 경우
                    2. 다른 법률에 특별한 규정이 있는 경우
                    3. 명백히 정보주체 또는 제3자의 급박한 생명, 신체, 재산의 이익을 위하여 필요하다고 인정되는 경우
                    4. 삭제 (2020. 2. 4.)
                    5. 개인정보를 목적 외의 용도로 이용하거나 이를 제3자에게 제공하지 아니하면 다른 법률에서 정하는 소관 업무를 수행할 수 없는 경우로서 보호위원회의 심의ㆍ의결을 거친 경우
                    6. 조약, 그 밖의 국제협정의 이행을 위하여 외국정부 또는 국제기구에 제공하기 위하여 필요한 경우
                    7. 범죄의 수사와 공소의 제기 및 유지를 위하여 필요한 경우
                    8. 법원의 재판업무 수행을 위하여 필요한 경우
                    9. 형(刑) 및 감호, 보호처분의 집행을 위하여 필요한 경우
                    10. 공중위생 등 공공의 안전과 안녕을 위하여 긴급히 필요한 경우
                  </CTableDataCell>
                </CTableRow>
              </CTableBody>
            </CTable>
          </CCBody>
        </CCard>

        <CCard class="mb-5">
          <CCardHeader class="header-title">
            <CRow>
              <CCol lg="6">개정 전</CCol>
              <CCol lg="6">개정안</CCol>
            </CRow>
          </CCardHeader>
          <CCBody>
            <CRow>
              <CCol lg="6" class="text-left red-text padded-cell1">
                <div>제1조(목적)
                  이 지침은 물리적 보안 통제에 필요한 사항을 정함으로써 기업의 주요 정보자산을 보호함을 목적으로 한다.</div>
              </CCol>
              <CCol lg="6" class="text-left blue-text padded-cell1">
                <div>제1조(목적)
                  이 지침은 기업의 주요 정보자산을 물리적 위협으로부터 보호하기 위해 필요한 물리적 보안 통제 절차와 기준을 수립하고, 이를 효과적으로 운영 및 관리하여 기업의 안정적 운영과 정보 보호 수준을 강화하는 것을 목적으로 한다.
                </div>
              </CCol>
            </CRow>
          </CCBody>
        </CCard>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  methods: {
    closePopup() {
      this.$emit('close');
    },
  },
};
</script>

<style scoped>
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  z-index: 1000;
}

.popup-content {
  width: 50%;
  height: 90%;
  bottom: 14px;
  background-color: white;
  border-radius: 10px 0 0 10px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  position: relative;
  animation: slideIn 0.3s ease-in-out;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}

.popup-body {
  padding: 60px 20px 10px; /* Add padding to the top */
  overflow-y: auto;
  flex-grow: 1;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #333;
  z-index: 1001; /* Ensure it stays above other content */
}

.close-btn:hover {
  color: #d50808;
}

.text-start {
  text-align: left;
}

.text-center {
  text-align: center;
}

.header-title {
  font-size: 1.5em; /* Increase font size */
  font-weight: bold; /* Make text bold */
}

.red-text {
  color: red;
}

.blue-text {
  color: blue;
}

.padded-cell {
  padding: 10px; /* Add padding to the table cells */
}

.padded-cell1 {
  padding: 20px; /* Add padding to the table cells */
}

.align-middle {
  vertical-align: middle; /* Vertically center-align the content */
}
</style>
