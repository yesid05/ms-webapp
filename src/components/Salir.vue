<template>
    <div>
        <div class="container">
            <h1>Estas saliendo de la aplicacón</h1>
        </div>
    </div>
</template>
<script>
export default {
    created() {
        console.log('Saliendo de la cuenta')
        localStorage.clear()
        this.$router.push('/')
    },
}
</script>