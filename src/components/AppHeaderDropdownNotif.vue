<script setup>
import { useTranslation } from 'i18next-vue'

const { t } = useTranslation()
const itemsCount = 5
</script>

<template>
  <CDropdown placement="bottom-end" variant="nav-item">
    <CDropdownToggle :caret="false">
      <span class="d-inline-block my-1 mx-2 position-relative">
        <CIcon icon="cil-bell" size="lg" />
        <CBadge
          color="danger"
          position="top-end"
          shape="rounded-circle"
          class="p-1"
        >
          <span class="visually-hidden">{{ itemsCount }} new alerts</span>
        </CBadge>
      </span>
    </CDropdownToggle>
    <CDropdownMenu class="pt-0">
      <CDropdownHeader class="bg-body-secondary text-body-secondary fw-semibold rounded-top mb-2">
        {{ t('notificationsCounter', { counter: itemsCount }) }}
      </CDropdownHeader>
      <CDropdownItem>
        <CIcon icon="cil-user-follow" class="text-success" /> {{ t('newUserRegistered') }}
      </CDropdownItem>
      <CDropdownItem>
        <CIcon icon="cil-user-unfollow" class="text-danger" /> {{ t('userDeleted') }}
      </CDropdownItem>
      <CDropdownItem>
        <CIcon icon="cil-chart-pie" class="text-info" /> {{ t('salesReportIsReady') }}
      </CDropdownItem>
      <CDropdownItem>
        <CIcon icon="cil-basket" class="text-primary" /> {{ t('newClient') }}
      </CDropdownItem>
      <CDropdownItem>
        <CIcon icon="cil-speedometer" class="text-warning" /> {{ t('serverOverloaded') }}
      </CDropdownItem>
      <CDropdownHeader class="bg-body-secondary text-body-secondary fw-semibold my-2">
        {{ t('server') }}
      </CDropdownHeader>
      <CDropdownItem class="d-block">
        <div class="text-uppercase small fw-semibold mb-1 mt-2">{{ t('cpuUsage') }}</div>
        <CProgress color="info-gradient" thin :value="25" />
        <div class="text-body-secondary small">
          {{
            t('cpuUsageDescription', {
              number_of_processes: 348,
              number_of_cores: '1/4',
            })
          }}.
        </div>
      </CDropdownItem>
      <CDropdownItem class="d-block">
        <div class="text-uppercase small fw-semibold mb-1 mt-2">{{ t('memoryUsage') }}</div>
        <CProgress color="warning-gradient" thin :value="70" />
        <div class="text-body-secondary small">11444GB/16384MB</div>
      </CDropdownItem>
      <CDropdownItem class="d-block">
        <div class="text-uppercase small fw-semibold mb-1 mt-2">{{ t('ssdUsage') }}</div>
        <CProgress color="danger-gradient" thin :value="95" />
        <div class="text-body-secondary small">243GB/256GB</div>
      </CDropdownItem>
    </CDropdownMenu>
  </CDropdown>
</template>
