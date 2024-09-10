<script setup>
import { ref } from 'vue';
import {CChartBarExample, CChartDoughnutExample, CChartRadarExample} from "../../charts";

const print = () => {
  window.print();
};

// 체크박스 상태 관리
const selectAll = ref(false);
const selectedItems = ref([false, false, false, false]);

// 전체 체크박스 클릭 시 모든 항목 체크/해제
const toggleSelectAll = () => {
  selectAll.value = !selectAll.value;
  selectedItems.value = selectedItems.value.map(() => selectAll.value);
};

// 개별 항목 체크박스 클릭 시 상태 변경
const toggleItem = (index) => {
  selectedItems.value[index] = !selectedItems.value[index];
  selectAll.value = selectedItems.value.every(item => item);
};
</script>

<template>
  <CRow>
  <CCol :md="3" class="mb-5">
    <CCard style="min-height: 367px;">
      <CCardHeader>ISMS 이행 현황 통계</CCardHeader>
      <CCardBody><CChartDoughnutExample /></CCardBody>
    </CCard>
  </CCol>

  <CCol :md="3" class="mb-4">
    <CCard style="min-height: 367px;">
      <CCardHeader>중분류 검토 필요 보고서</CCardHeader>
      <CCardBody><CChartRadarExample /></CCardBody>
    </CCard>
  </CCol>

  <CCol :md="6" class="mb-5">
    <CCard style="min-height: 300px;">
      <CCardHeader>검토 필요 Count</CCardHeader>
      <CCardBody><CChartBarExample /></CCardBody>
    </CCard>
  </CCol>
  </CRow>

  <CCard>
    <CCardHeader>
      ISMS 이행현황 <strong>(간편인증 기준)</strong>
      <CButton class="me-1 float-end" color="secondary" size="sm" @click.prevent="print">
        <CIcon icon="cil-print" /> Print
      </CButton>
      <CButton class="me-1 float-end" color="info" size="sm">
        <CIcon icon="cil-save" /> Save
      </CButton>
    </CCardHeader>
    <CCardBody>
      <CRow class="mb-4">
        <CCol :sm="4">
          <h6 class="mb-3">회사 정보</h6>
          <div>
            <strong>Gasan Company Inc.</strong>
          </div>
          <div>대표이사: 진현준</div>
          <div>Seoul, Gasandong 95014</div>
          <div>Email: hjj@gasancompany.com</div>
          <div>Phone: 02-465-7980</div>
        </CCol>
        <CCol :sm="4">
          <h6 class="mb-3">ISMS 인증 현황</h6>
          <div>
            <strong>최초심사 완료</strong>
          </div>
          <div>최초심사 완료일: 2023.12.10</div>
          <div>사후심사 예정일: 2024.12.10</div>
          <div>갱신심사 예정일: 2026.12.10</div>
          <div>ISMS-P 인증 유형: 정보보호관리체계 인증(ISMS)</div>
        </CCol>
        <CCol :sm="4">
          <h6 class="mb-3">담당자 정보</h6>
          <div>이동수 <strong>정보보호최고책임자(CISO)</strong></div>
          <div>지정일자: 2022.02.05</div>
          <div>Email: lds@gasancompany.com</div>
          <div>Phone: 02-543-1293</div>
        </CCol>
      </CRow>
      <CTable striped>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell class="text-center">
              <input type="checkbox" v-model="selectAll" @change="toggleSelectAll" />
            </CTableHeaderCell>
            <CTableHeaderCell>항목</CTableHeaderCell>
            <CTableHeaderCell>상세 내용</CTableHeaderCell>
            <CTableHeaderCell class="text-center">주요 확인사항</CTableHeaderCell>
            <CTableHeaderCell class="text-center" style="font-size: 14.2px;">근거 자료</CTableHeaderCell>
            <CTableHeaderCell class="text-end" style="font-size: 12px;">이행 여부</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          <CTableRow>
            <CTableDataCell class="text-center" style="vertical-align: middle;">
              <input type="checkbox" v-model="selectedItems[0]" @change="toggleItem(0)" />
            </CTableDataCell>
            <CTableDataCell class="text-start">1.1.1 경영진의 참여</CTableDataCell>
            <CTableDataCell class="text-start">최고경영자는 정보보호 및 개인정보보호 관리체계의 수립과 운영활동 전반에 경영진의 참여가 이루어질 수 있도록 보고 및 의사결정 체계를 수립하여 운영하여야 한다.</CTableDataCell>
            <CTableDataCell class="text-center">1.1.1.1
              정보보호 및 개인정보보호 관리체계의 수립 및 운영활동 전반에 경영진의 참여가 이루어질 수 있도록 보고 및 의사결정 등의 책임과 역할을 문서화하고 있는가?</CTableDataCell>
            <CTableDataCell class="text-center" style="vertical-align: middle;">
              정보처리방침
              </CTableDataCell>
            <CTableDataCell class="text-end" style="vertical-align: middle;">O</CTableDataCell>

          </CTableRow>
          <CTableRow>
            <CTableDataCell class="text-center" style="vertical-align: middle;">
              <input type="checkbox" v-model="selectedItems[1]" @change="toggleItem(1)" />
            </CTableDataCell>
            <CTableDataCell class="text-start"></CTableDataCell>
            <CTableDataCell class="text-start"></CTableDataCell>
            <CTableDataCell class="text-center">1.1.1.2
              정보보호 및 개인정보보호 관리체계의 수립 및 운영활동 전반에 경영진의 참여가 이루어질 수 있도록 보고 및 의사결정 등의 책임과 역할을 문서화하고 있는가?</CTableDataCell>
            <CTableDataCell class="text-center" style="vertical-align: middle;">

            </CTableDataCell>
            <CTableDataCell class="text-end" style="vertical-align: middle;"></CTableDataCell>

          </CTableRow>
          <CTableRow>
            <CTableDataCell class="text-center" style="vertical-align: middle;">
              <input type="checkbox" v-model="selectedItems[2]" @change="toggleItem(2)" />
            </CTableDataCell>
            <CTableDataCell class="text-start">1.1.2 최고 책임자의 경영</CTableDataCell>
            <CTableDataCell class="text-start">최고경영자는 정보보호 업무를 총괄하는 정보보호 최고책임자와 개인정보보호 업무를 총괄하는 개인정보보호 책임자를 예산, 인력 등 자원을 할당할 수 있는 임원급으로 지정하여야 한다.</CTableDataCell>
            <CTableDataCell class="text-center">1.1.2.1
              최고경영자는 정보보호 및 개인정보보호 처리에 관한 업무를 총괄하여 책임질 최고책임자를 공식적으로 지정하고 있는가?</CTableDataCell>
            <CTableDataCell class="text-center" style="vertical-align: middle;">
              내부정보처리방침
            </CTableDataCell>
            <CTableDataCell class="text-end" style="vertical-align: middle;">O</CTableDataCell>
          </CTableRow>


          <CTableRow>
            <CTableDataCell class="text-center" style="vertical-align: middle;">
              <input type="checkbox" v-model="selectedItems[3]" @change="toggleItem(3)" />
            </CTableDataCell>
            <CTableDataCell class="text-start"></CTableDataCell>
            <CTableDataCell class="text-start"></CTableDataCell>
            <CTableDataCell class="text-center">1.1.2.2
              정보보호 및 개인정보보호 관리체계의 수립 및 운영활동 전반에 경영진의 참여가 이루어질 수 있도록 보고 및 의사결정 등의 책임과 역할을 문서화하고 있는가?</CTableDataCell>
            <CTableDataCell class="text-center" style="vertical-align: middle;">
              정보처리방침
            </CTableDataCell>
            <CTableDataCell class="text-end" style="vertical-align: middle;">O</CTableDataCell>
          </CTableRow>



          <CTableRow>
            <CTableDataCell class="text-center" style="vertical-align: middle;">
              <input type="checkbox" v-model="selectedItems[3]" @change="toggleItem(3)" />
            </CTableDataCell>
            <CTableDataCell class="text-start">1.1.3 조직 구성</CTableDataCell>
            <CTableDataCell class="text-start">최고경영자는 정보보호의 효과적 구현을 위한 실무조직을 구성하여 운영하여야 한다.</CTableDataCell>
            <CTableDataCell class="text-center">1.1.3.1
              조직의 정보보호 활동을 체계적으로 이행하기 위해 전문성을 갖춘 실무조직을 구성하여 운영하고 있는가?</CTableDataCell>
            <CTableDataCell class="text-center" style="vertical-align: middle;">
              정보처리방침
            </CTableDataCell>
            <CTableDataCell class="text-end" style="vertical-align: middle;">O</CTableDataCell>
          </CTableRow>



          <CTableRow>
            <CTableDataCell class="text-center" style="vertical-align: middle;">
              <input type="checkbox" v-model="selectedItems[3]" @change="toggleItem(3)" />
            </CTableDataCell>
            <CTableDataCell class="text-start">1.1.4 범위 설정</CTableDataCell>
            <CTableDataCell class="text-start">조직의 핵심 서비스를 고려하여 관리체계 범위를 설정하고, 관련된 서비스를 비롯하여 조직, 자산, 물리적 위치 등을 문서화하여야 한다.</CTableDataCell>
            <CTableDataCell class="text-center">1.1.4.1
              조직의 핵심 서비스에 영향을 줄 수 있는 핵심자산을 포함하도록 관리체꼐 범위를 설정하고 있는가?</CTableDataCell>
            <CTableDataCell class="text-center" style="vertical-align: middle;">
              정보처리방침
            </CTableDataCell>
            <CTableDataCell class="text-end" style="vertical-align: middle;">O</CTableDataCell>
          </CTableRow>


        </CTableBody>
      </CTable>
      <CRow>
        <CCol lg="{4}" sm="{5}" class="ms-auto">
          <CTable>
            <CTableBody>
              <CTableRow>
                <CTableDataCell class="text-start">
                  <strong>전체 항목</strong>
                </CTableDataCell>
                <CTableDataCell class="text-end">6개</CTableDataCell>
              </CTableRow>
              <CTableRow>
                <CTableDataCell class="text-start">
                  <strong>이행 항목</strong>
                </CTableDataCell>
                <CTableDataCell class="text-end">5개</CTableDataCell>
              </CTableRow>
              <CTableRow>
                <CTableDataCell class="text-start">
                  <strong>미이행 항목</strong>
                </CTableDataCell>
                <CTableDataCell class="text-end">1개</CTableDataCell>
              </CTableRow>
              <CTableRow>
                <CTableDataCell class="text-start">
                  <strong>총 이행률</strong>
                </CTableDataCell>
                <CTableDataCell class="text-end">
                  <strong>83%</strong>
                </CTableDataCell>
              </CTableRow>
            </CTableBody>
          </CTable>
        </CCol>
      </CRow>
    </CCardBody>
  </CCard>
</template>

