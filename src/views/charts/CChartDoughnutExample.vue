<script setup>
import { CChartDoughnut } from '@coreui/vue-chartjs'

const data = {
  labels: ['이행', '미이행'],
  datasets: [
    {
      backgroundColor: ['#41B883', '#DD1B16'],
      data: [88, 12],
    },
  ],
}
</script>

<template>
  <CChartDoughnut :data="data" />
</template>
