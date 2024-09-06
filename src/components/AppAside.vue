<script setup>
import { ref } from 'vue'
import { useTranslation } from 'i18next-vue'

import avatar2 from '@/assets/images/avatars/2.jpg'
import avatar3 from '@/assets/images/avatars/3.jpg'
import avatar4 from '@/assets/images/avatars/4.jpg'
import avatar5 from '@/assets/images/avatars/5.jpg'
import avatar6 from '@/assets/images/avatars/6.jpg'
import avatar7 from '@/assets/images/avatars/7.jpg'
import avatar8 from '@/assets/images/avatars/8.jpg'
import { useAsideStore } from '@/stores/aside.js'

const aside = useAsideStore()
const { t } = useTranslation()
const activeKey = ref(1)
const updateActiveKey = (key) => {
  activeKey.value = key
}
</script>

<template>
  <CSidebar
    class="border-start"
    color-scheme="light"
    size="lg"
    overlaid
    placement="end"
    :visible="aside.visible"
    @visible-change="(value) => aside.toggleVisible(value)"
  >
    <CSidebarHeader class="p-0 position-relative">
      <CNav class="w-100" variant="underline-border">
        <CNavItem>
          <CNavLink href="#" :active="activeKey === 1" @click="updateActiveKey(1)">
            <CIcon icon="cil-List" alt="CoreUI Icons List" />
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink href="#" :active="activeKey === 2" @click="updateActiveKey(2)">
            <CIcon icon="cil-speech" alt="CoreUI Icons Speech" />
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink href="#" :active="activeKey === 3" @click="updateActiveKey(3)">
            <CIcon icon="cil-settings" alt="CoreUI Icons Settings" />
          </CNavLink>
        </CNavItem>
      </CNav>
      <CCloseButton
        class="position-absolute top-50 end-0 translate-middle my-0"
        @click="aside.toggleVisible()"
      />
    </CSidebarHeader>
    <CTabContent>
      <CTabPane :visible="activeKey == 1">
        <CListGroup flush>
          <CListGroupItem
            class="border-start-4 border-start-secondary bg-body-secondary text-center fw-semibold text-body-secondary text-uppercase small"
          >
            {{ t('today') }}
          </CListGroupItem>
          <CListGroupItem href="#" class="border-start-4 border-start-warning">
            <CAvatar :src="avatar7" size="lg" class="float-end" />
            <div>Meeting with <strong>Lucas</strong></div>
            <small class="text-body-secondary me-3"> <CIcon icon="cil-calendar" /> 1 - 3pm </small>
            <small class="text-body-secondary">
              <CIcon icon="cil-location-pin" /> Palo Alto, CA
            </small>
          </CListGroupItem>
          <CListGroupItem href="#" class="border-start-4 border-start-info">
            <CAvatar :src="avatar4" size="lg" class="float-end" />
            <div>Skype with <strong>Megan</strong></div>
            <small class="text-body-secondary me-3"> <CIcon icon="cil-calendar" /> 4 - 5pm </small>
            <small class="text-body-secondary"> <CIcon icon="cib-skype" /> On-line </small>
          </CListGroupItem>
          <CListGroupItem
            class="border-start-4 border-start-secondary bg-body-secondary text-center fw-semibold text-body-secondary text-uppercase small"
          >
            {{ t('tomorrow') }}
          </CListGroupItem>
          <CListGroupItem accent="danger" href="#" class="border-start-4 border-start-danger">
            <div>New UI Project - <strong>deadline</strong></div>
            <small class="text-body-secondary me-3">
              <CIcon icon="cil-calendar" /> 10 - 11pm
            </small>
            <small class="text-body-secondary"> <CIcon icon="cil-home" /> creativeLabs HQ </small>
            <div class="avatars-stack mt-2">
              <CAvatar :src="avatar2" size="sm" />
              <CAvatar :src="avatar3" size="sm" />
              <CAvatar :src="avatar4" size="sm" />
              <CAvatar :src="avatar5" size="sm" />
              <CAvatar :src="avatar6" size="sm" />
            </div>
          </CListGroupItem>
          <CListGroupItem href="#" class="border-start-4 border-start-success">
            <div><strong>#10 Startups.Garden</strong> Meetup</div>
            <small class="text-body-secondary me-3"> <CIcon icon="cil-calendar" /> 1 - 3pm </small>
            <small class="text-body-secondary">
              <CIcon icon="cil-location-pin" /> Palo Alto, CA
            </small>
          </CListGroupItem>
          <CListGroupItem href="#" class="border-start-4 border-start-primary border-bottom">
            <div>
              <strong>Team meeting</strong>
            </div>
            <small class="text-body-secondary me-3"> <CIcon icon="cil-calendar" /> 4 - 6pm </small>
            <small class="text-body-secondary"> <CIcon icon="cil-home" /> creativeLabs HQ </small>
            <div class="/avatars-stack mt-2">
              <CAvatar :src="avatar2" size="sm" />
              <CAvatar :src="avatar3" size="sm" />
              <CAvatar :src="avatar4" size="sm" />
              <CAvatar :src="avatar5" size="sm" />
              <CAvatar :src="avatar6" size="sm" />
              <CAvatar :src="avatar7" size="sm" />
              <CAvatar :src="avatar8" size="sm" />
            </div>
          </CListGroupItem>
        </CListGroup>
      </CTabPane>
      <CTabPane class="p-3" :visible="activeKey == 2">
        <div class="message">
          <div class="py-3 pb-5 me-3 float-start">
            <CAvatar :src="avatar7" status="success" size="md" />
          </div>
          <div>
            <small class="text-body-secondary">Lukasz Holeczek</small>
            <small class="text-body-secondary float-end mt-1">1:52 PM</small>
          </div>
          <div class="text-truncate fw-semibold">Lorem ipsum dolor sit amet</div>
          <small class="text-body-secondary">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
            incididunt...
          </small>
        </div>
        <hr />
        <div class="message">
          <div class="py-3 pb-5 me-3 float-start">
            <CAvatar :src="avatar7" status="success" size="md" />
          </div>
          <div>
            <small class="text-body-secondary">Lukasz Holeczek</small>
            <small class="text-body-secondary float-end mt-1">1:52 PM</small>
          </div>
          <div class="text-truncate fw-semibold">Lorem ipsum dolor sit amet</div>
          <small class="text-body-secondary">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
            incididunt...
          </small>
        </div>
        <hr />
        <div class="message">
          <div class="py-3 pb-5 me-3 float-start">
            <CAvatar :src="avatar7" status="success" size="md" />
          </div>
          <div>
            <small class="text-body-secondary">Lukasz Holeczek</small>
            <small class="text-body-secondary float-end mt-1">1:52 PM</small>
          </div>
          <div class="text-truncate fw-semibold">Lorem ipsum dolor sit amet</div>
          <small class="text-body-secondary">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
            incididunt...
          </small>
        </div>
        <hr />
        <div class="message">
          <div class="py-3 pb-5 me-3 float-start">
            <CAvatar :src="avatar7" status="success" size="md" />
          </div>
          <div>
            <small class="text-body-secondary">Lukasz Holeczek</small>
            <small class="text-body-secondary float-end mt-1">1:52 PM</small>
          </div>
          <div class="text-truncate fw-semibold">Lorem ipsum dolor sit amet</div>
          <small class="text-body-secondary">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
            incididunt...
          </small>
        </div>
        <hr />
        <div class="message">
          <div class="py-3 pb-5 me-3 float-start">
            <CAvatar :src="avatar7" status="success" size="md" />
          </div>
          <div>
            <small class="text-body-secondary">Lukasz Holeczek</small>
            <small class="text-body-secondary float-end mt-1">1:52 PM</small>
          </div>
          <div class="text-truncate fw-semibold">Lorem ipsum dolor sit amet</div>
          <small class="text-body-secondary">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
            incididunt...
          </small>
        </div>
      </CTabPane>
      <CTabPane class="p-3" :visible="activeKey == 3">
        <h6>{{ t('settings') }}</h6>
        <div>
          <div class="clearfix mt-4">
            <CFormSwitch id="Option1" size="lg" label="Option 1" checked />
          </div>
          <div>
            <small class="text-body-secondary">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua.
            </small>
          </div>
        </div>
        <div>
          <div class="clearfix mt-3">
            <CFormSwitch id="fOption2" size="lg" label="Option 2" />
          </div>
          <div>
            <small class="text-body-secondary">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua.
            </small>
          </div>
        </div>
        <div>
          <div class="clearfix mt-3">
            <CFormSwitch id="Option3" size="lg" label="Option 3" />
          </div>
        </div>
        <div>
          <div class="clearfix mt-3">
            <CFormSwitch id="Option4" size="lg" label="Option 4" checked />
          </div>
        </div>
        <hr />
        <h6>{{ t('systemUtilization') }}</h6>
        <div class="text-uppercase small fw-semibold mb-1 mt-2">{{ t('cpuUsage') }}</div>
        <CProgress color="info-gradient" thin :value="25" />
        <div class="text-body-secondary small">
          {{
            t('cpuUsageDescription', {
              number_of_processes: 348,
              number_of_cores: '1/4',
            })
          }}
        </div>
        <div class="text-uppercase small fw-semibold mb-1 mt-2">{{ t('memoryUsage') }}</div>
        <CProgress color="warning-gradient" thin :value="70" />
        <div class="text-body-secondary small">11444GB/16384MB</div>
        <div class="text-uppercase small fw-semibold mb-1 mt-2">{{ t('ssdUsage') }}</div>
        <CProgress color="danger-gradient" thin :value="95" />
        <div class="text-body-secondary small">243GB/256GB</div>
        <div class="text-uppercase small fw-semibold mb-1 mt-2">{{ t('ssdUsage') }}</div>
        <CProgress color="success-gradient" thin :value="10" />
        <div class="text-body-secondary small">25GB/256GB</div>
      </CTabPane>
    </CTabContent>
  </CSidebar>
</template>
