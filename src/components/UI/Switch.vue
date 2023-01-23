<template>
<div class="form-check form-switch">
  <input
    :class="{'form-check-input':1, 'form-check-input-lg': lg}"
    type="checkbox"
    @input="$emit('update:modelValue', $event.target.checked)"
    :checked="modelValue"
  >
  <label
    v-if="label"
    class="form-check-label"
  >
    {{ label }}
  </label>
</div>
</template>

<script>
export default {
name: "Switch",
  props: {
    label: {
      type: String,
    },
    modelValue: {
      type: Boolean,
      default: false
    },
    lg: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue']
}
</script>

<style scoped>
.form-switch .form-check-input {
  width: 38px;
  height: 22px;
  background-image: url("@/assets/switch_circle.svg");
  background-position-y: center;
}
.form-switch .form-check-input:checked {
  background-image: url("@/assets/switch_circle.svg");
  background-position-x: 16px;
}
.form-check-input {
  background-color: transparent;
  border: 2px solid #fff;
}
.form-check-input:checked {
  background-color: transparent;
  border-color: #FFf;
}
.form-check-input:focus {
  border-color: #fff;
  outline: 0;
  box-shadow: none;
}
.form-switch .form-check-input:focus {
  background-image: url("@/assets/switch_circle.svg");
}
.form-switch .form-check-input-lg{
  width: 18px;
  height: 18px;
  background-position-x: 4px;
}
.form-switch .form-check-input-lg:checked {
  background-position-x: 16px;
}

</style>
