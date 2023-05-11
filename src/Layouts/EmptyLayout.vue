<template>
    <div class="d-flex flex-column">
        <router-view class="h-100 overflow-hidden" />
    </div>
</template>

<script>
export default {
    name: "empty-layout",
    data() {
        return {};
    },
    methods: {},
    mounted() { },
}
</script>

<style scoped></style>