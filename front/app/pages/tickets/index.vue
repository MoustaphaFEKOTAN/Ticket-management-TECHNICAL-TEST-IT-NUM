<template>
    <div class="container mt-4">
        <div class="d-flex justify-content-between align-items-center mb-3">
            <h2>Mes tickets</h2>
            <a href="" class="btn btn-primary">Nouveau ticket</a>
        </div>

        <p v-if="loading">Chargement...</p>
        <p v-if="error" class="text-danger">{{ error }}</p>

        <table v-if="tickets.length" class="table table-bordered">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Titre</th>
                    <th>Statut</th>
                    <th>Description</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="ticket in tickets" :key="ticket.id">
                    <td>{{ ticket.id }}</td>
                    <td>{{ ticket.title }}</td>
                    <td>{{ ticket.status }}</td>
                    <td>{{ ticket.description }}</td>
                    <td>
                        <a :href="`/tickets/${ticket.id}/edit`" class="btn btn-sm btn-warning me-2">Modifier</a>
                        <button @click="handleDelete(ticket.id)" class="btn btn-sm btn-danger">Supprimer</button>
                    </td>
                </tr>
            </tbody>
        </table>

        <p v-else-if="!loading">Aucun ticket trouvé.</p>
    </div>
</template>

<script setup>
import { useTicketService } from '~/services/ticket.service'

const tickets = ref([])
const loading = ref(true)
const error = ref('')

const { getAll, remove } = useTicketService()

onMounted(async () => {
    try {
        tickets.value = await getAll()
    } catch (e) {
        error.value = e.message
    } finally {
        loading.value = false
    }
})

async function handleDelete(id) {
    try {
        await remove(id)
        tickets.value = tickets.value.filter(t => t.id !== id)
    } catch (e) {
        error.value = e.message
    }
}
</script>