import { defineComponent, h, onMounted, ref, resolveComponent } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

import { CBadge, CSidebarNav, CNavItem, CNavGroup, CNavTitle } from '@coreui/vue-pro'
import { useTranslation } from 'i18next-vue'

import nav from '@/_nav.js'

import simplebar from 'simplebar-vue'
import 'simplebar-vue/dist/simplebar.min.css'

const normalizePath = (path) =>
  decodeURI(path)
    .replace(/#.*$/, '')
    .replace(/(index)?\.(html)$/, '')

const isActiveLink = (route, link) => {
  if (link === undefined) {
    return false
  }

  if (route.hash === link) {
    return true
  }

  const currentPath = normalizePath(route.path)
  const targetPath = normalizePath(link)

  return currentPath === targetPath
}

const isActiveItem = (route, item) => {
  if (isActiveLink(route, item.to)) {
    return true
  }

  if (item.items) {
    return item.items.some((child) => isActiveItem(route, child))
  }

  return false
}

const AppSidebarNav = defineComponent({
  name: 'AppSidebarNav',
  components: {
    CNavItem,
    CNavGroup,
    CNavTitle,
  },
  setup() {
    const route = useRoute()
    const firstRender = ref(true)
    const { i18next } = useTranslation()

    onMounted(() => {
      firstRender.value = false
    })

    const renderItem = (item) => {
      if (item.items) {
        return h(
          CNavGroup,
          {
            as: 'div',
            compact: true,
            ...(firstRender.value && {
              visible: item.items.some((child) => isActiveItem(route, child)),
            }),
          },
          {
            togglerContent: () => [
              h(resolveComponent('CIcon'), {
                customClassName: 'nav-icon',
                name: item.icon,
              }),
              typeof item.name === 'function' ? item.name() : item.name,
              // item.tname ? t(item.tname) : item.name,
            ],
            default: () => item.items.map((child) => renderItem(child)),
          },
        )
      }

      return item.to
        ? h(
            RouterLink,
            {
              to: item.to,
              custom: true,
            },
            {
              default: (props) =>
                h(
                  resolveComponent(item.component),
                  {
                    active: props.isActive,
                    as: 'div',
                    href: props.href,
                    onClick: () => props.navigate(),
                  },
                  {
                    default: () => [
                      item.icon
                        ? h(resolveComponent('CIcon'), {
                            customClassName: 'nav-icon',
                            name: item.icon,
                          })
                        : h('span', { class: 'nav-icon' }, h('span', { class: 'nav-icon-bullet' })),
                      typeof item.name === 'function' ? item.name() : item.name,
                      item.badge &&
                        h(
                          CBadge,
                          {
                            class: 'ms-auto',
                            color: item.badge.color,
                          },
                          {
                            default: () => item.badge.text,
                          },
                        ),
                    ],
                  },
                ),
            },
          )
        : h(
            resolveComponent(item.component),
            {
              as: 'div',
            },
            {
              default: () => (typeof item.name === 'function' ? item.name() : item.name),
            },
          )
    }

    return () =>
      h(
        CSidebarNav,
        {
          as: simplebar,
          lang: i18next.language,
        },
        {
          default: () => nav.map((item) => renderItem(item)),
        },
      )
  },
})
export { AppSidebarNav }
