<template>
    <div class="select-wrap">
        <select ref="select" @change="update" v-model="modelVal" :disabled="this.disabled" multiple>
            <option v-for="(option, index) in options" :key="index" :value="option.id">
                {{ option.title }} {{ option?.price }}
            </option>
        </select>
    </div>
</template>
    
<script>
export default {
    name: "VueMultiSelect",
    props: {
        disabled: {
            type: Boolean,
            default: false
        },
        modelValue: {
            type: Array,
            default: []
        },
        options: {},
        label: {},
    },
    data() {
        return {
            modelVal: this.modelValue
        }
    },
    methods: {
        update() {
            this.$emit('update:modelValue', this.modelVal)
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
    border-radius: 5px;
    border: 1px solid #fff;
    padding: 5px 10px;
    width: 100%;
    max-height: 100px;
}

select::-webkit-scrollbar {
    height: 0px;
    display: none;
}

select:focus-visible {
    border: none;
    outline: none;
}

select {
    -ms-overflow-style: none;
    scrollbar-width: none;

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

select option:checked {
    background-color: rgb(0, 3, 188);

}

select option {
    padding: 5px;
    background-color: none;
    color: rgb(255, 255, 255);
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