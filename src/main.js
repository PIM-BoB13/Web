import { createApp } from 'vue'
import { createPinia } from 'pinia'
import I18NextVue from 'i18next-vue'

import App from './App.vue'
import router from './router'
import i18next from './i18n.js'

import CoreuiVue from '@coreui/vue-pro'
import CIcon from '@coreui/icons-vue'
import { iconsSet as icons } from '@/assets/icons'
import DocsExample from '@/components/DocsExample'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(CoreuiVue)
app.use(I18NextVue, { i18next })
app.provide('icons', icons)
app.component('CIcon', CIcon)
app.component('DocsExample', DocsExample)

app.mount('#app')
