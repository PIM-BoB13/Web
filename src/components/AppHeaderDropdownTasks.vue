<script setup>
import { useTranslation } from 'i18next-vue'

const { t } = useTranslation()
const itemsCount = 15
</script>

<template>
  <CDropdown placement="bottom-end" variant="nav-item">
    <CDropdownToggle :caret="false">
      <span class="d-inline-block my-1 mx-2 position-relative">
        <CIcon icon="cil-list-rich" size="lg" />
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
    <CDropdownMenu class="py-0">
      <CDropdownHeader class="bg-body-secondary text-body-secondary fw-semibold rounded-top mb-2">
        {{ t('taskCounter', { counter: itemsCount }) }}
      </CDropdownHeader>
      <CDropdownItem class="d-block">
        <div class="d-flex justify-content-between mb-1">
          <div class="small">Upgrade NPM</div>
          <div class="fw-semibold">0%</div>
        </div>
        <CProgress thin color="info-gradient" />
      </CDropdownItem>
      <CDropdownItem class="d-block">
        <div class="d-flex justify-content-between mb-1">
          <div class="small">ReactJS Version</div>
          <div class="fw-semibold">25%</div>
        </div>
        <CProgress thin color="danger-gradient" :value="25" />
      </CDropdownItem>
      <CDropdownItem class="d-block">
        <div class="d-flex justify-content-between mb-1">
          <div class="small">VueJS Version</div>
          <div class="fw-semibold">50%</div>
        </div>
        <CProgress thin color="warning-gradient" :value="50" />
      </CDropdownItem>
      <CDropdownItem class="d-block">
        <div class="d-flex justify-content-between mb-1">
          <div class="small">Add new layouts</div>
          <div class="fw-semibold">75%</div>
        </div>
        <CProgress thin color="info-gradient" :value="75" />
      </CDropdownItem>
      <CDropdownItem class="d-block">
        <div class="d-flex justify-content-between mb-1">
          <div class="small">Angular Version</div>
          <div class="fw-semibold">100%</div>
        </div>
        <CProgress thin color="success-gradient" :value="100" />
      </CDropdownItem>
      <div class="p-2">
        <CButton color="primary" variant="outline" class="w-100">
          {{t('viewAllTasks')}}
        </CButton>
      </div>
    </CDropdownMenu>
  </CDropdown>
</template>
