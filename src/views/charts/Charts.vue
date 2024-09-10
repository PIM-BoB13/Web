<script setup>
import {
  CChartBarExample,
  CChartDoughnutExample,
  CChartRadarExample,
} from './index.js'
</script>

<template>
  <CRow>
    <CCol :md="6" class="mb-4">
      <CCard>
        <CCardHeader>Bar Chart</CCardHeader>
        <CCardBody><CChartBarExample /></CCardBody>
      </CCard>
    </CCol>
    <CCol :md="6" class="mb-4">
      <CCard>
        <CCardHeader>Doughnut Chart</CCardHeader>
        <CCardBody><CChartDoughnutExample /></CCardBody>
      </CCard>
    </CCol>
    <CCol :md="6" class="mb-4">
      <CCard>
        <CCardHeader>Radar Chart</CCardHeader>
        <CCardBody><CChartRadarExample /></CCardBody>
      </CCard>
    </CCol>

  </CRow>
</template>
