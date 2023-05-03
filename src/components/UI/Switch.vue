<template>
  <div class="form-check form-switch" :class="computedClass">
    <input
      class="form-check-input"
      type="checkbox"
      @input="$emit('update:modelValue', $event.target.checked)"
      :checked="modelValue"
      :style="switchStyle"
    />
    <label v-if="label" class="form-check-label">
      {{ label }}
    </label>
  </div>
</template>

<script>
export default {
  name: "Switch",
  emits: ["update:modelValue"],
  data() {
    return {};
  },
  props: {
    cls: {
      type: String,
      default: null,
    },
    label: {
      type: String,
    },
    modelValue: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    computedClass() {
      if (this.cls === "black") {
        return "switch-black";
      }
      return "";
    },
    switchCircleFalse() {
      if (this.cls === "black") {
        return require("@/assets/switch_circle_false_black.svg");
      }
      return require("@/assets/switch_circle_false.svg");
    },
    switchCircleTrue() {
      if (this.cls === "black") {
        return require("@/assets/switch_circle_true_black.svg");
      }
      return require("@/assets/switch_circle_true.svg");
    },
    switchStyle() {
      const backgroundImage = this.modelValue
        ? this.switchCircleTrue
        : this.switchCircleFalse;

      return {
        backgroundImage: `url(${backgroundImage})`,
        backgroundPositionY: "center",
        backgroundPositionX: this.modelValue ? "16px" : "",
      };
    },
  },
};
</script>

<style scoped>
.form-check-input {
  background-color: transparent;
  border: 2px solid #fff;
  width: 38px;
  height: 22px;
}

.form-check-input:checked {
  background-color: transparent;
  border-color: #fff;
}

.form-check-input:focus {
  border-color: #fff;
  outline: 0;
  box-shadow: none;
}

.switch-black .form-check-input {
  border-color: #000;
}

.switch-black .form-check-input:checked {
  border-color: #000;
}
</style>