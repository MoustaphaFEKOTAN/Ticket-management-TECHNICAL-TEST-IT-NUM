import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(null)

  const setToken = (jwt: string) => {
    token.value = jwt
    localStorage.setItem('token', jwt)
  }

  const logout = () => {
    token.value = null
    localStorage.removeItem('token')
  }

  const hydrate = () => {
    token.value = localStorage.getItem('token')
  }

  const isAuthenticated = computed(() => !!token.value)

  return { token, setToken, logout, hydrate, isAuthenticated }
})