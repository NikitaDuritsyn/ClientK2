<template>
    <div class="select-wrap">
        <select ref="select" @change="update" :value="modelValue" :disabled="this.disabled">
            <option v-for="(option, index) in options" :key="index" :value="option.id">{{ option.name }}</option>
        </select>
    </div>
</template>
    
<script>
export default {
    name: "VueSelect",
    props: {
        disabled: {
            type: Boolean,
            default: false
        },
        modelValue: {},
        placeholder: {},
        options: {},
        label: {},
    },
    methods: {
        update() {
            this.$emit('update:modelValue', this.$refs.select.value)
        }
    }
}
</script>
    
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;600;700&display=swap');

label {
    font-family: Montserrat;
    font-style: normal;
    font-weight: 500;
    font-size: 0.875rem;
    line-height: 1.25rem;
    text-transform: uppercase;
    display: flex;
    line-height: 1.25rem;
    color: #fff;
    font-weight: 500;
    font-size: 0.625rem;
    letter-spacing: 0.2em;
    top: -1rem;
    left: 1.5rem;
    text-transform: uppercase;
    /* padding: 0.375rem 0.625rem; */
}

.select-wrap {
    /* height: 3.125rem; */
    border-radius: 5px;
    border: 1px solid #fff;
    padding: 5px 10px;
    width: 100%;
}

/* .select-wrap select:focus-visible, */
/* .select-wrap select:hover {
    outline: -webkit-focus-ring-color auto 1px;
} */

select:focus-visible {
    border: none;
    outline: none;
}

select {
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 500;
    font-size: 0.875rem;
    line-height: 1.25rem;
    background: transparent;
    width: 100%;
    color: #fff;
    width: 100%;
    height: 100%;
    background: none;
    border: none;
}

option {
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 500;
    font-size: 0.875rem;
    background-color: none !important;
    color: black;
}
</style>