<template>
    <div class="select-wrap">
        <label v-show="label">{{ label }}</label>
        <select ref="select" @change="update" :value="modelValue" :disabled="this.disabled">
            <option v-for="(option, index) in options" :key="index" :value="option.id">{{ option.title }}</option>
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
        label: {
            type: String,
            default: "",
            required: false
        },
    },
    methods: {
        update() {
            this.$emit('update:modelValue', Number(this.$refs.select.value))
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
}

.select-wrap {
    width: 100%;
    max-width: 28rem;
}

select:focus-visible {
    outline: none;
}

select {
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 500;
    font-size: 0.875rem;
    background: transparent;
    width: 100%;
    color: #fff;
    width: 100%;
    height: 100%;
    min-height: 35px;
    background: none;
    border: none;
    border: 1px solid white;
    border-radius: 5px;
    width: 100%;
}

option {
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 500;
    font-size: 1rem;
    color: #000000;
}
</style>