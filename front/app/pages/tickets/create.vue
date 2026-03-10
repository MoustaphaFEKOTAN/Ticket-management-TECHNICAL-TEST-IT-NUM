<template>
    <div class="container mt-4">
        <h2>Nouveau ticket</h2>

        <p v-if="error" class="text-danger">{{ error }}</p>

        <form @submit.prevent="handleCreate">
            <div class="mb-3">
                <label>Titre</label>
                <input v-model="title" type="text" class="form-control" required />
            </div>

            <div class="mb-3">
                <label>Description</label>
                <textarea v-model="description" class="form-control" rows="4" required />
            </div>

            <button type="submit" class="btn btn-primary me-2">Créer</button>
            <a href="/tickets" class="btn btn-secondary">Annuler</a>
        </form>
    </div>
</template>

<script setup>
import { useTicketService } from '~/services/ticket.service'

const title = ref('')
const description = ref('')
const error = ref('')

const { create } = useTicketService()

async function handleCreate() {
    try {
        await create(title.value, description.value)
        navigateTo('/tickets')
    } catch (e) {
        error.value = e.message
    }
}
</script>