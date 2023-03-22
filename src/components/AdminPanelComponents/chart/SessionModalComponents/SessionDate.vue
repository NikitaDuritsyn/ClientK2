<template>
    <div class="d-flex justify-content-between align-items-center w-100">
        <div class="d-flex">
            Дата:
            <div class="ms-1 text_block">{{ new Date(date).toLocaleDateString() }}</div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'session-date',
    props: ['date'],
    data() {
        return {
            rooms: [],
        }
    }
}
</script>

<style scoped></style>