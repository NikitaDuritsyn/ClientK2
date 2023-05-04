<template>
  <button :disabled="disabled" :class="['button', cls]">
    <slot />
  </button>
</template>

<script>
export default {
  name: "MyButton",
  props: {
    cls: {
      type: String,
      default: 'btn_second',
      validator: value => {
        return [
          'btn_second',
          'btn_white',
          'darknessButton',
          'close_btn',
        ].includes(value)
      }
    },
    disabled: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
.button {
  border-radius: 1rem;
  font-weight: 400;
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: #FFFFFF;
  padding: 0.5rem 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #E32289;
  border: 0.15rem solid #E32289;
  max-width: 28rem;
}

.darknessButton {
  border: 0.15rem solid rgb(20, 20, 20);
  background-color: rgb(20, 20, 20);
  color: rgb(120, 120, 120);
}

.darknessButton:disabled {
  border: 0.15rem solid rgb(60, 60, 60);
  background-color: rgb(35, 35, 35);
}

.darknessButton:focus {
  border-color: rgb(0, 255, 255);
}

.btn_second {
  background-color: black;
  border: 1px solid white;
  padding: 3px 5px;
  border-radius: 5px;
  cursor: pointer;
  min-width: 50px;
  text-align: center;
}

.btn_second:focus {
  border-color: rgb(0, 99, 136);
}

.btn_second:hover {
  border-color: rgb(0, 255, 255);
}

.btn_second:disabled {
  background-color: rgb(70, 70, 70);
}

.btn_white {
  background-color: whitesmoke;
  border: 1px solid whitesmoke;
  padding: 3px 5px;
  border-radius: 0px;
  border-bottom-left-radius: 50%;
  border-bottom-right-radius: 50%;

  cursor: pointer;
  min-width: 50px;
  text-align: center;
  color: black;
}

.btn_white:focus {
  border-color: rgb(0, 99, 136);
}

.btn_white:hover {
  border-color: rgb(0, 255, 255);
}

.btn_white:disabled {
  background-color: rgb(70, 70, 70);
}

.close_btn {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 25px;
  width: 25px;
  min-width: 25px;
  min-height: 25px;
  border-radius: 50%;
  border: 1px solid rgb(200, 200, 200);
  background-image: url('@/assets/X.svg');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  background-color: transparent;
  padding: 0;
  margin: 0;
  cursor: pointer;
  margin: 0 0 0 5px;
}
</style>