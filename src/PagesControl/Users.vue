<template>
    <div class="row justify-content-center h-100 m-0 p-0 registration">
        <div class="col-md-4">
            <RegistrationForm />
        </div>
        <div class="col-md-6">
            <UsersTable />
        </div>
    </div>
</template>

<script>
import RegistrationForm from '@/components/UsersComponents/RegistrationForm.vue';
import UsersTable from '@/components/UsersComponents/UsersTable.vue';

export default {
    name: "Registration",
    components: { RegistrationForm, UsersTable },
    data() {
        return {};
    },
}
</script>