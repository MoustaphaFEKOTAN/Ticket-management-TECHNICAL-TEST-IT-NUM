<template>
    <div class="container mt-4">
        <h2>Modifier le ticket</h2>

        <p v-if="loading">Chargement...</p>
        <p v-if="error" class="text-danger">{{ error }}</p>

        <form v-if="!loading" @submit.prevent="handleUpdate">
            <div class="mb-3">
                <label>Titre</label>
                <input v-model="title" type="text" class="form-control" required />
            </div>

            <div class="mb-3">
                <label>Description</label>
                <textarea v-model="description" class="form-control" rows="4" required />
            </div>

            <button type="submit" class="btn btn-primary me-2">Enregistrer</button>
            <a href="/tickets" class="btn btn-secondary">Annuler</a>
        </form>
    </div>
</template>

<script setup>
import { useTicketService } from '~/services/ticket.service'

const route = useRoute()
const id = Number(route.params.id)

const title = ref('')
const description = ref('')
const loading = ref(true)
const error = ref('')

const { getById, update } = useTicketService()

onMounted(async () => {
    try {
        const ticket = await getById(id)
        title.value = ticket.title
        description.value = ticket.description
    } catch (e) {
        error.value = e.message
    } finally {
        loading.value = false
    }
})

async function handleUpdate() {
    try {
        await update(id, {
            title: title.value,
            description: description.value,
        })
        navigateTo('/tickets')
    } catch (e) {
        error.value = e.message
    }
}
</script>