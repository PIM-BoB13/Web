<template>
  <CChartRadar :data="data" />
</template>

<script setup>
import { CChartRadar } from '@coreui/vue-chartjs'

const data = {
  labels: ['1.1', '2.2', '1.3', '2.4.2', '1.5', '1.2.1', '2.6.1'],
  datasets: [
    {
      label: '현황',
      backgroundColor: 'rgba(179,181,198,0.2)',
      borderColor: 'rgba(179,181,198,1)',
      pointBackgroundColor: 'rgba(179,181,198,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(179,181,198,1)',
      tooltipLabelColor: 'rgba(179,181,198,1)',
      data: [15, 23, 37, 33, 24, 13, 33],
    },
    {
      label: '향후',
      backgroundColor: 'rgba(255,99,132,0.2)',
      borderColor: 'rgba(255,99,132,1)',
      pointBackgroundColor: 'rgba(255,99,132,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(255,99,132,1)',
      tooltipLabelColor: 'rgba(255,99,132,1)',
      data: [43, 66, 67, 50, 49, 46, 77],
    },
  ],
  options: {
    aspectRatio: 1.5,
  },
}
</script>
