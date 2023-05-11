<template>
    <div class="d-flex w-100 h-100" :style="{ whiteSpace: 'nowrap' }">
        <div v-for="role in roles" :key="role.id" class="ms-1 ps-1 pe-1" style="border: 1px solid red;">
            {{ role.title }}
        </div>
    </div>
</template>

<script>
export default {
    name: 'user-role',
    props: ['roles'],
    components: {},
    data() {
        return {}
    },
    methods: {},
}
</script>