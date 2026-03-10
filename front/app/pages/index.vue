<script setup>
onMounted(() => {
    const auth = useAuthStore()
    auth.hydrate()
    if (auth.isAuthenticated) {
        navigateTo('/tickets')
    } else {
        navigateTo('/login')
    }
})
</script>