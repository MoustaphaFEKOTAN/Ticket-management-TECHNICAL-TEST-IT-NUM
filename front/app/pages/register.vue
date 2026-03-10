<template>
    <div>
        <h2>Register</h2>
        <input v-model="username" placeholder="username" />
        <input v-model="email" type="email" placeholder="email" />
        <input v-model="password" type="password" placeholder="mot de passe" />
        <input v-model="confirmPassword" type="password" placeholder="confirmer mot de passe" />
        <button @click="handleRegister">Créer un compte</button>
        <p v-if="error">{{ error }}</p>
        <p v-if="success">Compte créé ! <a href="/login">Se connecter</a></p>
    </div>
</template>

<script setup>
import { useAuthService } from '~/services/auth.service'

const username = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const error = ref('')
const success = ref(false)

const { register } = useAuthService()

async function handleRegister() {
    error.value = ''

    if (password.value !== confirmPassword.value) {
        error.value = 'Les mots de passe ne correspondent pas'
        return
    }

    try {
        await register(username.value, email.value, password.value, confirmPassword.value)
        success.value = true
    } catch (e) {
        error.value = e.message
    }
}
</script>