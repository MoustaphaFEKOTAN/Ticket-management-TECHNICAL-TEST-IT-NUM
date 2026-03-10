<template>
  <div>
    <h2>Login</h2>
    <input v-model="email" type="email" placeholder="email" />
    <input v-model="password" type="password" placeholder="mot de passe" />
    <button @click="handleLogin">Se connecter</button>
    <p>Pas encore de compte ? <a href="/register">Créer un compte</a></p>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script setup>
import { useAuthService } from '~/services/auth.service'
import { useAuthStore } from '~/stores/auth'

const email = ref('')
const password = ref('')
const error = ref('')

const { login } = useAuthService()
const auth = useAuthStore()

async function handleLogin() {
  try {
    const token = await login(email.value, password.value)
    auth.setToken(token)
    navigateTo('/tickets')
  } catch (e) {
    error.value = e.message
  }
}
</script>