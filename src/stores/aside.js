import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAsideStore = defineStore('aside', () => {
  const visible = ref(undefined)

  const toggleVisible = (value) => {
    visible.value = value !== undefined ? value : !visible.value
  }

  return { visible, toggleVisible }
})
