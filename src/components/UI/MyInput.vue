<template>
  <div class="wrapInput position-relative">
    <label class="position-absolute" v-show="label" ref="labelEl">{{ label }}</label>
    <div class="position-relative" ref="divEl">
      <div class="nameBorderTopRight" :style="{width: topRight}"></div>
      <div class="nameBorderTopLeft" :style="{width: topLeft}"></div>
      <input
          ref="input"
          :type="type"
          :maxlength="maxlength"
          :max="type==='number'&& max ? max : undefined"
          :autocomplete="autocomplete"
          :placeholder=placeholder
          :pattern="pattern"
          @input="updateInput"
          :value="modelValue"
          :data-tel-input="phoneInput?true:undefined"
      >
    </div>
  </div>

</template>

<script>
export default {
  name: "MyInput",
  props: {
    label: {
      type: String,
      default: "",
      required: false
    },
    placeholder: {
      type: String,
      default: "",
      required: false
    },
    type: {
      type: String,
      default: "text"
    },
    max:{
      type: String,
      default: undefined
    },
    maxlength: {
      type: String,
      default: undefined
    },
    autocomplete: {
      type: String,
      default: undefined
    },
    pattern:{
      type: String,
      default: undefined
    },
    required: {
      type: Boolean,
      default: false
    },
    modelValue: {
      type: String,
      required: true
    },
    withIcon: {
      type: Boolean,
      default: false
    },
    phoneInput: {
      type: Boolean,
      default: false
    }
  },

  data:() =>({
      input: '',
      topRight: '250px',
      topLeft: '150px'
  }),
  methods: {
    handleBorders: function() {
      this.topRight = this.$refs.divEl.clientWidth*0.90 - this.$refs.labelEl.clientWidth + 'px'
      this.topLeft = this.$refs.divEl.clientWidth*0.08 + 'px'
    },
    updateInput(event) {
      this.$emit('update:modelValue', event.target.value)
    },
    focus(){
      this.$refs.input.focus()
    }
  },
  mounted() {
    this.$nextTick(()=>{
        this.handleBorders()
    })
    window.addEventListener('resize', this.handleBorders)
    window.addEventListener('scroll', this.handleBorders)
    window.addEventListener('click', this.handleBorders)
  },
  unmounted() {
    window.removeEventListener('resize', this.handleBorders)
    window.removeEventListener('scroll', this.handleBorders)
    window.removeEventListener('click', this.handleBorders)
  }
}
</script>

<style scoped>
.inputHeader {
  align-items: center;
  position: relative;
}
input {
  position: relative;
  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 1.25rem;
  background: transparent;
  border-radius: 1.25rem;
  border: 0.094rem solid #fff;
  border-top: none;
  align-items: center;
  width: 100%;
  color: #fff;
  padding: 1rem 1.875rem;
  z-index: 2;
}
input:autofill,
input:-internal-autofill-selected,
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus {
  color: #fff !important;
  background: transparent !important;
  border: 0.094rem solid #fff !important;
}
.nameBorderTopRight {
  position: absolute;
  border-top: 0.094rem solid #fff;
  /*border-right: 0.094rem solid #fff;*/
  height: 100%;
  border-top-right-radius: 1.25rem;
  border-bottom-right-radius: 1.25rem;
  right: 0;
  z-index: 0;
}
.nameBorderTopLeft {
  min-width: 1.2rem;
  position: absolute;
  border-top: 0.094rem solid #fff;
  /*border-left: 0.094rem solid #fff;*/
  height: 100%;
  border-top-left-radius: 1.25rem;
  border-bottom-left-radius: 1.25rem;
  left: 0;
}
.wrapInput {
  margin: 0 auto 1.75rem;
  max-width: 28rem;
}
input:active, :hover, :focus {
  outline: 0;
  outline-offset: 0;
}
input::placeholder,
input::-webkit-input-placeholder {
  color: #fff;
}
label {
  display: flex;
  line-height: 1.25rem;
  color: #fff;
  font-weight: 500;
  font-size: 0.625rem;
  letter-spacing: 0.2em;
  top: -1rem;
  left: 1.5rem;
  text-transform: uppercase;
  padding: 0.375rem 0.625rem;
}
input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>