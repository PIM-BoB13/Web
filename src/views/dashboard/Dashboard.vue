<script setup>
import { computed, onMounted, ref } from 'vue'
import { CChart } from '@coreui/vue-chartjs'
import { getStyle } from '@coreui/utils'
import { useTranslation } from 'i18next-vue'

import avatar1 from '@/assets/images/avatars/1.jpg'
import avatar2 from '@/assets/images/avatars/2.jpg'
import avatar3 from '@/assets/images/avatars/3.jpg'
import avatar4 from '@/assets/images/avatars/4.jpg'
import avatar5 from '@/assets/images/avatars/5.jpg'
import avatar6 from '@/assets/images/avatars/6.jpg'

const { t } = useTranslation()
const chartBarRef = ref()
const chartLineRef = ref()

const mainChartLabel = (date) => {
  return t('date', {
    date,
    formatParams: { date: { month: 'short' } },
  })
}

const progressGroupExample1 = computed(() => [
  { title: t('monday'), value1: 34, value2: 78 },
  { title: t('tuesday'), value1: 56, value2: 94 },
  { title: t('wednesday'), value1: 12, value2: 67 },
  { title: t('thursday'), value1: 43, value2: 91 },
  { title: t('friday'), value1: 22, value2: 73 },
  { title: t('saturday'), value1: 53, value2: 82 },
  { title: t('sunday'), value1: 9, value2: 69 },
])

const progressGroupExample2 = computed(() => [
  { title: t('male'), icon: 'cil-user', value: 53 },
  { title: t('female'), icon: 'cil-user-female', value: 43 },
])

const progressGroupExample3 = computed(() => [
  { title: t('organicSearch'), icon: 'cib-google', percent: 56, value: '191,235' },
  { title: 'Facebook', icon: 'cib-facebook', percent: 15, value: '51,223' },
  { title: 'Twitter', icon: 'cib-twitter', percent: 11, value: '37,564' },
  { title: 'LinkedIn', icon: 'cib-linkedin', percent: 8, value: '27,319' },
])

const tableExampleUsagePeriod = (dateStart, dateEnd) => {
  const formatParams = { date: { year: 'numeric', month: 'short', day: 'numeric' } }
  return `${t('date', {
    date: dateStart,
    formatParams,
  })} - ${t('date', {
    date: dateEnd,
    formatParams,
  })}`
}

const tableExample = computed(() => [
  {
    avatar: { src: avatar1, status: 'success' },
    user: {
      name: 'Yiorgos Avraamu',
      new: true,
      registered: t('date', {
        date: new Date(2023, 0, 10),
        formatParams: { date: { year: 'numeric', month: 'short', day: 'numeric' } },
      }),
    },
    country: { name: 'USA', flag: 'cif-us' },
    usage: {
      value: 50,
      period: tableExampleUsagePeriod(new Date(2023, 5, 11), new Date(2023, 6, 10)),
      color: 'success',
    },
    payment: { name: 'Mastercard', icon: 'cib-cc-mastercard' },
    activity: t('relativeTime', { val: -10, range: 'seconds' }),
  },
  {
    avatar: { src: avatar2, status: 'danger' },
    user: {
      name: 'Avram Tarasios',
      new: false,
      registered: t('date', {
        date: new Date(2023, 0, 10),
        formatParams: { date: { year: 'numeric', month: 'short', day: 'numeric' } },
      }),
    },
    country: { name: 'Brazil', flag: 'cif-br' },
    usage: {
      value: 22,
      period: tableExampleUsagePeriod(new Date(2023, 5, 11), new Date(2023, 6, 10)),
      color: 'info',
    },
    payment: { name: 'Visa', icon: 'cib-cc-visa' },
    activity: t('relativeTime', { val: -5, range: 'minutes' }),
  },
  {
    avatar: { src: avatar3, status: 'warning' },
    user: {
      name: 'Quintin Ed',
      new: true,
      registered: t('date', {
        date: new Date(2023, 0, 10),
        formatParams: { date: { year: 'numeric', month: 'short', day: 'numeric' } },
      }),
    },
    country: { name: 'India', flag: 'cif-in' },
    usage: {
      value: 74,
      period: tableExampleUsagePeriod(new Date(2023, 5, 11), new Date(2023, 6, 10)),
      color: 'warning',
    },
    payment: { name: 'Stripe', icon: 'cib-cc-stripe' },
    activity: t('relativeTime', { val: -1, range: 'hours' }),
  },
  {
    avatar: { src: avatar4, status: 'secondary' },
    user: {
      name: 'Enéas Kwadwo',
      new: true,
      registered: t('date', {
        date: new Date(2023, 0, 10),
        formatParams: { date: { year: 'numeric', month: 'short', day: 'numeric' } },
      }),
    },
    country: { name: 'France', flag: 'cif-fr' },
    usage: {
      value: 98,
      period: tableExampleUsagePeriod(new Date(2023, 5, 11), new Date(2023, 6, 10)),
      color: 'danger',
    },
    payment: { name: 'PayPal', icon: 'cib-cc-paypal' },
    activity: t('relativeTime', { val: -1, range: 'weeks' }),
  },
  {
    avatar: { src: avatar5, status: 'success' },
    user: {
      name: 'Agapetus Tadeáš',
      new: true,
      registered: t('date', {
        date: new Date(2023, 0, 10),
        formatParams: { date: { year: 'numeric', month: 'short', day: 'numeric' } },
      }),
    },
    country: { name: 'Spain', flag: 'cif-es' },
    usage: {
      value: 22,
      period: tableExampleUsagePeriod(new Date(2023, 5, 11), new Date(2023, 6, 10)),
      color: 'primary',
    },
    payment: { name: 'Google Wallet', icon: 'cib-cc-apple-pay' },
    activity: t('relativeTime', { val: -3, range: 'months' }),
  },
  {
    avatar: { src: avatar6, status: 'danger' },
    user: {
      name: 'Friderik Dávid',
      new: true,
      registered: t('date', {
        date: new Date(2023, 0, 10),
        formatParams: { date: { year: 'numeric', month: 'short', day: 'numeric' } },
      }),
    },
    country: { name: 'Poland', flag: 'cif-pl' },
    usage: {
      value: 43,
      period: tableExampleUsagePeriod(new Date(2023, 5, 11), new Date(2023, 6, 10)),
      color: 'success',
    },
    payment: { name: 'Amex', icon: 'cib-cc-amex' },
    activity: t('relativeTime', { val: -1, range: 'years' }),
  },
])

onMounted(() => {
  document.documentElement.addEventListener('ColorSchemeChange', () => {
    if (chartBarRef.value) {
      chartBarRef.value.chart.options.scales.x.grid.color = getStyle(
        '--cui-border-color-translucent',
      )
      chartBarRef.value.chart.options.scales.x.ticks.color = getStyle('--cui-body-color')
      chartBarRef.value.chart.options.scales.y.grid.color = getStyle(
        '--cui-border-color-translucent',
      )
      chartBarRef.value.chart.options.scales.y.ticks.color = getStyle('--cui-body-color')
      chartBarRef.value.chart.update()
    }

    if (chartLineRef.value) {
      chartLineRef.value.chart.data.datasets[0].pointBackgroundColor = getStyle('--cui-primary')
      chartLineRef.value.chart.update()
    }
  })
})
</script>

<template>
  <CRow>
    <CCol :xl="4">
      <CRow>
        <CCol :lg="12">
          <CCard class="overflow-hidden mb-4">
            <CCardBody class="p-4">
              <CRow>
                <CCol>
                  <CCardTitle class="fs-4 fw-semibold">{{ t('sale') }}</CCardTitle>
                </CCol>
                <CCol class="text-end text-primary fs-4 fw-semibold">$613.200</CCol>
              </CRow>
              <CCardSubtitle class="fw-normal text-body-secondary">
                {{
                  t('date', {
                    date: new Date(2023, 0, 1),
                    formatParams: {
                      date: {
                        month: 'long',
                      },
                    },
                  })
                }}
                -
                {{
                  t('date', {
                    date: new Date(2023, 6, 1),
                    formatParams: {
                      date: {
                        year: 'numeric',
                        month: 'long',
                      },
                    },
                  })
                }}
              </CCardSubtitle>
            </CCardBody>
            <CChart
              type="line"
              class="mt-3"
              style="height: 150px"
              ref="chartLineRef"
              :data="{
                labels: [
                  t('january'),
                  t('february'),
                  t('march'),
                  t('april'),
                  t('may'),
                  t('june'),
                  t('july'),
                ],
                datasets: [
                  {
                    label: 'My First dataset',
                    backgroundColor: `rgba(${getStyle('--cui-primary-rgb')}, .1)`,
                    borderColor: getStyle('--cui-primary'),
                    borderWidth: 3,
                    data: [78, 81, 80, 45, 34, 22, 40],
                    fill: true,
                  },
                ],
              }"
              :options="{
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                maintainAspectRatio: false,
                scales: {
                  x: {
                    display: false,
                  },
                  y: {
                    beginAtZero: true,
                    display: false,
                  },
                },
                elements: {
                  line: {
                    borderWidth: 2,
                    tension: 0.4,
                  },
                  point: {
                    radius: 0,
                    hitRadius: 10,
                    hoverRadius: 4,
                  },
                },
              }"
            />
          </CCard>
        </CCol>
        <CCol :sm="6">
          <CCard class="mb-4">
            <CCardBody>
              <div class="d-flex justify-content-between">
                <CCardTitle component="h6" class="text-body-secondary text-truncate">{{
                  t('customers')
                }}</CCardTitle>
                <div class="bg-primary bg-opacity-25 text-primary rounded p-2 ms-2">
                  <CIcon icon="cil-people" size="xl" />
                </div>
              </div>
              <div class="fs-4 fw-semibold pb-3">44.725</div>
              <small class="text-danger"> (-12.4% <CIcon icon="cil-arrow-bottom" />) </small>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol :sm="6">
          <CCard class="mb-4">
            <CCardBody>
              <div class="d-flex justify-content-between">
                <CCardTitle component="h6" class="text-body-secondary text-truncate">{{
                  t('orders')
                }}</CCardTitle>
                <div class="bg-primary bg-opacity-25 text-primary rounded p-2 ms-2">
                  <CIcon icon="cil-cart" size="xl" />
                </div>
              </div>
              <div class="fs-4 fw-semibold pb-3">385</div>
              <small class="text-success"> (17.2% <CIcon icon="cil-arrow-top" />) </small>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CCol>
    <CCol :xl="8">
      <CCard class="mb-4">
        <CCardBody class="p-4">
          <CCardTitle class="fs-4 fw-semibold">{{ t('traffic') }}</CCardTitle>
          <CCardSubtitle class="fw-normal text-body-secondary">
            {{
              t('date', {
                date: new Date(2022, 0, 1),
                formatParams: {
                  date: { year: 'numeric', month: 'long', day: 'numeric' },
                },
              })
            }}
            -
            {{
              t('date', {
                date: new Date(2022, 11, 31),
                formatParams: {
                  date: { year: 'numeric', month: 'long', day: 'numeric' },
                },
              })
            }}
          </CCardSubtitle>
          <CChart
            type="bar"
            style="height: 300px; margin-top: 40px"
            ref="chartBarRef"
            :data="{
              labels: [
                mainChartLabel(new Date(Date.UTC(2022, 0, 1))),
                mainChartLabel(new Date(Date.UTC(2022, 1, 1))),
                mainChartLabel(new Date(Date.UTC(2022, 2, 1))),
                mainChartLabel(new Date(Date.UTC(2022, 3, 1))),
                mainChartLabel(new Date(Date.UTC(2022, 4, 1))),
                mainChartLabel(new Date(Date.UTC(2022, 5, 1))),
                mainChartLabel(new Date(Date.UTC(2022, 6, 1))),
                mainChartLabel(new Date(Date.UTC(2022, 7, 1))),
                mainChartLabel(new Date(Date.UTC(2022, 8, 1))),
                mainChartLabel(new Date(Date.UTC(2022, 9, 1))),
                mainChartLabel(new Date(Date.UTC(2022, 10, 1))),
                mainChartLabel(new Date(Date.UTC(2022, 11, 1))),
              ],
              datasets: [
                {
                  label: 'Users',
                  backgroundColor: getStyle('--cui-primary'),
                  borderRadius: 6,
                  borderSkipped: false,
                  data: [78, 81, 80, 45, 34, 12, 40, 85, 65, 23, 12, 98, 34, 84, 67, 82],
                  barPercentage: 0.6,
                  categoryPercentage: 0.5,
                },
                {
                  label: 'New users',
                  backgroundColor: getStyle('--cui-gray-200'),
                  borderRadius: 6,
                  borderSkipped: false,
                  data: [78, 81, 80, 45, 34, 12, 40, 85, 65, 23, 12, 98, 34, 84, 67, 82],
                  barPercentage: 0.6,
                  categoryPercentage: 0.5,
                },
              ],
            }"
            :options="{
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: false,
                },
              },
              scales: {
                x: {
                  border: {
                    display: false,
                  },
                  grid: {
                    color: getStyle('--cui-border-color-translucent'),
                    display: false,
                    drawTicks: false,
                  },
                  ticks: {
                    color: getStyle('--cui-body-color'),
                    font: {
                      size: 14,
                    },
                    padding: 16,
                  },
                },
                y: {
                  beginAtZero: true,
                  border: {
                    dash: [2, 4],
                    display: false,
                  },
                  grid: {
                    color: getStyle('--cui-border-color-translucent'),
                  },
                  ticks: {
                    color: getStyle('--cui-body-color'),
                    font: {
                      size: 14,
                    },
                    maxTicksLimit: 5,
                    padding: 16,
                    stepSize: Math.ceil(100 / 4),
                  },
                },
              },
            }"
          />
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
  <CRow>
    <CCol :xl="9">
      <CCard class="mb-4">
        <CCardBody class="p-4">
          <CRow>
            <CCol>
              <CCardTitle class="fs-4 fw-semibold">{{ t('users') }}</CCardTitle>
              <CCardSubtitle class="fw-normal text-body-secondary mb-4">
                {{
                  t('registeredUsersCounter', {
                    counter: '1.232.15',
                  })
                }}
              </CCardSubtitle>
            </CCol>
            <CCol xs="auto" class="ms-auto">
              <CButton color="secondary">
                <CIcon icon="cil-user-plus" class="me-2" />
                {{ t('addNewUser') }}
              </CButton>
            </CCol>
          </CRow>
          <CTable align="middle" class="mb-0" hover responsive>
            <CTableHead class="fw-semibold text-body-secondary">
              <CTableRow>
                <CTableHeaderCell class="text-center">
                  <CIcon name="cil-people" />
                </CTableHeaderCell>
                <CTableHeaderCell>{{ t('users') }}</CTableHeaderCell>
                <CTableHeaderCell class="text-center">{{ t('country') }}</CTableHeaderCell>
                <CTableHeaderCell>{{ t('usage') }}</CTableHeaderCell>
                <CTableHeaderCell>{{ t('activity') }}</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              <CTableRow v-for="item in tableExample" :key="item.user.name">
                <CTableDataCell class="text-center">
                  <CAvatar size="md" :src="item.avatar.src" :status="item.avatar.status" />
                </CTableDataCell>
                <CTableDataCell>
                  <div>{{ item.user.name }}</div>
                  <div class="small text-body-secondary text-nowrap">
                    <span>{{ item.user.new ? t('new') : t('recurring') }}</span> |
                    {{ t('registered') }}
                    {{ item.user.registered }}
                  </div>
                </CTableDataCell>
                <CTableDataCell class="text-center">
                  <CIcon size="xl" :name="item.country.flag" :title="item.country.name" />
                </CTableDataCell>
                <CTableDataCell>
                  <div class="d-flex justify-content-between align-items-baseline mb-1">
                    <div class="fw-semibold">{{ item.usage.value }}%</div>
                    <div class="small text-body-secondary ms-1 text-nowrap">
                      {{ item.usage.period }}
                    </div>
                  </div>
                  <CProgress thin :color="item.usage.color" :value="item.usage.value" />
                </CTableDataCell>
                <CTableDataCell>
                  <div class="small text-body-secondary">{{ t('lastLogin') }}</div>
                  <div class="fw-semibold text-nowrap">
                    {{ item.activity }}
                  </div>
                </CTableDataCell>
              </CTableRow>
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>
    </CCol>
    <CCol :xl="3">
      <CRow>
        <CCol :md="4" :xl="12">
          <CWidgetStatsA class="mb-4" color="primary-gradient">
            <template #value
              >26K
              <span class="fs-6 fw-normal"> (-12.4% <CIcon icon="cil-arrow-bottom" />) </span>
            </template>
            <template #title>{{ t('users') }}</template>
            <template #action>
              <CDropdown placement="bottom-end">
                <CDropdownToggle color="transparent" class="p-0 text-white" :caret="false">
                  <CIcon icon="cil-options" class="text-high-emphasis-inverse" />
                </CDropdownToggle>
                <CDropdownMenu>
                  <CDropdownItem href="#">{{ t('action') }}</CDropdownItem>
                  <CDropdownItem href="#">{{ t('anotherAction') }}</CDropdownItem>
                  <CDropdownItem href="#">{{ t('somethingElseHere') }}</CDropdownItem>
                  <CDropdownItem href="#" disabled>{{ t('disabledAction') }}</CDropdownItem>
                </CDropdownMenu>
              </CDropdown>
            </template>
            <template #chart>
              <CChart
                type="line"
                class="mt-3 mx-3"
                style="height: 85px"
                :data="{
                  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                  datasets: [
                    {
                      label: 'My First dataset',
                      backgroundColor: 'transparent',
                      borderColor: 'rgba(255,255,255,.55)',
                      pointBackgroundColor: getStyle('--cui-primary'),
                      data: [68, 59, 84, 84, 51, 55, 40],
                    },
                  ],
                }"
                :options="{
                  plugins: {
                    legend: {
                      display: false,
                    },
                  },
                  maintainAspectRatio: false,
                  scales: {
                    x: {
                      border: {
                        display: false,
                      },
                      grid: {
                        display: false,
                      },
                      ticks: {
                        display: false,
                      },
                    },
                    y: {
                      min: 30,
                      max: 89,
                      display: false,
                      grid: {
                        display: false,
                      },
                      ticks: {
                        display: false,
                      },
                    },
                  },
                  elements: {
                    line: {
                      borderWidth: 1,
                      tension: 0.4,
                    },
                    point: {
                      radius: 4,
                      hitRadius: 10,
                      hoverRadius: 4,
                    },
                  },
                }"
              />
            </template>
          </CWidgetStatsA>
        </CCol>
        <CCol :md="4" :xl="12">
          <CWidgetStatsA class="mb-4" color="warning-gradient">
            <template #value
              >2.49%
              <span class="fs-6 fw-normal"> (84.7% <CIcon icon="cil-arrow-top" />) </span>
            </template>
            <template #title>{{ t('conversionRate') }}</template>
            <template #action>
              <CDropdown placement="bottom-end">
                <CDropdownToggle color="transparent" class="p-0 text-white" :caret="false">
                  <CIcon icon="cil-options" class="text-high-emphasis-inverse" />
                </CDropdownToggle>
                <CDropdownMenu>
                  <CDropdownItem href="#">{{ t('action') }}</CDropdownItem>
                  <CDropdownItem href="#">{{ t('anotherAction') }}</CDropdownItem>
                  <CDropdownItem href="#">{{ t('somethingElseHere') }}</CDropdownItem>
                  <CDropdownItem href="#" disabled>{{ t('disabledAction') }}</CDropdownItem>
                </CDropdownMenu>
              </CDropdown>
            </template>
            <template #chart>
              <CChart
                type="line"
                class="mt-3"
                style="height: 85px"
                :data="{
                  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                  datasets: [
                    {
                      label: 'My First dataset',
                      backgroundColor: 'rgba(255,255,255,.2)',
                      borderColor: 'rgba(255,255,255,.55)',
                      data: [78, 81, 80, 45, 34, 12, 40],
                      fill: true,
                    },
                  ],
                }"
                :options="{
                  plugins: {
                    legend: {
                      display: false,
                    },
                  },
                  maintainAspectRatio: false,
                  scales: {
                    x: {
                      display: false,
                    },
                    y: {
                      display: false,
                    },
                  },
                  elements: {
                    line: {
                      borderWidth: 2,
                      tension: 0.4,
                    },
                    point: {
                      radius: 0,
                      hitRadius: 10,
                      hoverRadius: 4,
                    },
                  },
                }"
              />
            </template>
          </CWidgetStatsA>
        </CCol>
        <CCol :md="4" :xl="12">
          <CWidgetStatsA class="mb-4" color="danger-gradient">
            <template #value
              >44K
              <span class="fs-6 fw-normal"> (-23.6% <CIcon icon="cil-arrow-bottom" />) </span>
            </template>
            <template #title>{{ t('sessions') }}</template>
            <template #action>
              <CDropdown placement="bottom-end">
                <CDropdownToggle color="transparent" class="p-0 text-white" :caret="false">
                  <CIcon icon="cil-options" class="text-high-emphasis-inverse" />
                </CDropdownToggle>
                <CDropdownMenu>
                  <CDropdownItem href="#">{{ t('action') }}</CDropdownItem>
                  <CDropdownItem href="#">{{ t('anotherAction') }}</CDropdownItem>
                  <CDropdownItem href="#">{{ t('somethingElseHere') }}</CDropdownItem>
                  <CDropdownItem href="#" disabled>{{ t('disabledAction') }}</CDropdownItem>
                </CDropdownMenu>
              </CDropdown>
            </template>
            <template #chart>
              <CChart
                type="bar"
                class="mt-3 mx-3"
                style="height: 85px"
                :data="{
                  labels: [
                    'January',
                    'February',
                    'March',
                    'April',
                    'May',
                    'June',
                    'July',
                    'August',
                    'September',
                    'October',
                    'November',
                    'December',
                    'January',
                    'February',
                    'March',
                    'April',
                  ],
                  datasets: [
                    {
                      label: 'My First dataset',
                      backgroundColor: 'rgba(255,255,255,.2)',
                      borderColor: 'rgba(255,255,255,.55)',
                      data: [78, 81, 80, 45, 34, 12, 40, 85, 65, 23, 12, 98, 34, 84, 67, 82],
                      barPercentage: 0.6,
                    },
                  ],
                }"
                :options="{
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      display: false,
                    },
                  },
                  scales: {
                    x: {
                      grid: {
                        display: false,
                        drawTicks: false,
                      },
                      ticks: {
                        display: false,
                      },
                    },
                    y: {
                      border: {
                        display: false,
                      },
                      grid: {
                        display: false,
                        drawTicks: false,
                      },
                      ticks: {
                        display: false,
                      },
                    },
                  },
                }"
              />
            </template>
          </CWidgetStatsA>
        </CCol>
      </CRow>
    </CCol>
  </CRow>
  <div>
    <CRow>
      <CCol :md="12">
        <CCard class="mb-4">
          <CCardBody class="p-4">
            <CCardTitle class="fs-4 fw-semibold">{{ t('traffic') }}</CCardTitle>
            <CCardSubtitle class="fw-normal text-body-secondary border-bottom mb-3 pb-4">
              {{ t('lastWeek') }}
            </CCardSubtitle>
            <CRow>
              <CCol :sm="12" :lg="6">
                <CRow>
                  <CCol :xs="6">
                    <div class="border-start border-start-4 border-start-info py-1 px-3 mb-3">
                      <div class="text-body-secondary text-truncate small">
                        {{ t('newClients') }}
                      </div>
                      <div class="fs-5 fw-semibold">9,123</div>
                    </div>
                  </CCol>
                  <CCol :xs="6">
                    <div class="border-start border-start-4 border-start-danger py-1 px-3 mb-3">
                      <div class="text-body-secondary text-truncate small">
                        {{ t('recurringClients') }}
                      </div>
                      <div class="fs-5 fw-semibold">22,643</div>
                    </div>
                  </CCol>
                </CRow>
                <div class="border-top mb-4" />
                <div
                  v-for="item in progressGroupExample1"
                  :key="item.title"
                  class="progress-group mb-4"
                >
                  <div class="progress-group-prepend">
                    <span class="text-body-secondary small">{{ item.title }}</span>
                  </div>
                  <div class="progress-group-bars">
                    <CProgress thin color="info-gradient" :value="item.value1" />
                    <CProgress thin color="danger-gradient" :value="item.value2" />
                  </div>
                </div>
              </CCol>
              <CCol :sm="12" :lg="6">
                <CRow>
                  <CCol :xs="6">
                    <div class="border-start border-start-4 border-start-warning py-1 px-3 mb-3">
                      <div class="text-body-secondary text-truncate small">
                        {{ t('pageviews') }}
                      </div>
                      <div class="fs-5 fw-semibold">78,623</div>
                    </div>
                  </CCol>
                  <CCol :xs="6">
                    <div class="border-start border-start-4 border-start-success py-1 px-3 mb-3">
                      <div class="text-body-secondary text-truncate small">{{ t('organic') }}</div>
                      <div class="fs-5 fw-semibold">49,123</div>
                    </div>
                  </CCol>
                </CRow>
                <hr class="mt-0" />
                <div v-for="item in progressGroupExample2" :key="item.title" class="progress-group">
                  <div class="progress-group-header">
                    <CIcon :icon="item.icon" class="me-2" size="lg" />
                    <span class="title">{{ item.title }}</span>
                    <span class="ms-auto fw-semibold">{{ item.value }}%</span>
                  </div>
                  <div class="progress-group-bars">
                    <CProgress thin :value="item.value" color="warning-gradient" />
                  </div>
                </div>

                <div class="mb-5"></div>

                <div v-for="item in progressGroupExample3" :key="item.title" class="progress-group">
                  <div class="progress-group-header">
                    <CIcon :icon="item.icon" class="me-2" size="lg" />
                    <span class="title">{{ item.title }}</span>
                    <span class="ms-auto fw-semibold">
                      {{ item.value }}
                      <span class="text-body-secondary small">({{ item.percent }}%)</span>
                    </span>
                  </div>
                  <div class="progress-group-bars">
                    <CProgress thin :value="item.percent" color="success-gradient" />
                  </div>
                </div>
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>
