<script setup>
import { CChartBar } from '@coreui/vue-chartjs'

const data = {
  labels: [
    '2.3.2',
    '1.1.2',
    '1.3.1',
    '1.1.4',
    '2.6.1',
      '1.2.1',
      '2.2.1',
      '1.4.1'

  ],
  datasets: [
    {
      label: '검토 필요 Count',
      backgroundColor: '#f87979',
      data: [2, 4, 3, 5, 10, 4, 8, 5],
    },
  ],
}
</script>

<template>
  <CChartBar :data="data" />
</template>
