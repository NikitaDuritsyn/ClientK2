<template>
  <div class="wrapInput">
    <label v-show="label">{{ label }}</label>
    <div :class="{ 'd-flex': serch }">
      <input ref="input" :class="{ 'serch': serch }" :type="type" :maxlength="maxlength"
        :max="type === 'number' && max ? max : undefined" :min="type === 'number' && min ? min : undefined"
        :autocomplete="autocomplete" :placeholder=placeholder :pattern="pattern" @input="updateInput" :value="modelValue"
        :data-tel-input="phoneInput ? true : undefined" :disabled="disabled">
      <MyButton @click="$emit('serch')" v-if="serch" class="serch_btn"><i class="bi bi-search"></i>
      </MyButton>
    </div>
  </div>
</template>

<script>
import MyButton from './MyButton.vue'

export default {
  name: "MyInput",
  components: { MyButton },
  props: {
    label: { type: String, default: "", required: false },
    placeholder: { type: String, default: "", required: false },
    type: { type: String, default: "text" },
    max: { type: Number, default: undefined },
    min: { type: Number, default: undefined },
    maxlength: { type: String, default: undefined },
    autocomplete: { type: String, default: undefined },
    pattern: { type: String, default: undefined },
    required: { type: Boolean, default: false },
    modelValue: { required: true },
    withIcon: { type: Boolean, default: false },
    phoneInput: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    serch: { type: Boolean, default: false },
  },
  data: () => ({
    input: "",
    topRight: "250px",
    topLeft: "150px"
  }),
  methods: {
    updateInput(event) {
      if (this.type != "number" || this.type == "") {
        if (this.phoneInput) {
          this.$emit("update:modelValue", this.glb.formatPhone(event.target.value));
        }
        else {
          this.$emit("update:modelValue", event.target.value);
        }
      }
      else if (this.type === "number") {
        this.$emit("update:modelValue", Number(event.target.value));
      }
    },
    focus() {
      this.$refs.input.focus();
    }
  },
  mounted() {
    this.glb.phoneInputFormatter();
  },
}
</script>

<style scoped>
.serch_btn {
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
}

.serch {
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;
}

input {
  font-size: 16px;
  background: transparent;
  border-radius: 5px;
  border: 1px solid #fff;
  width: 100%;
  color: #fff;
  padding: 5px;
}

.wrapInput {
  max-width: 28rem;
  min-width: 14rem;
}

input:active,
:hover,
:focus {
  outline: 0;
  outline-offset: 0;
}

input::placeholder,
input::-webkit-input-placeholder {
  color: #fff;
}

label {
  color: rgb(0, 255, 0) !important;
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
</style>