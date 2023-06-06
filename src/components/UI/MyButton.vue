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
          'link_btn',
          'btn_second',
          'btn_white',
          'close_btn',
          'log_out',
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
  white-space: nowrap;
  border-radius: 1rem;
  font-weight: 400;
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: #FFFFFF;
  padding: 0.5rem 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background: black;
  border: 0.15rem solid black;
  max-width: 28rem;
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

.link_btn {
  text-transform: uppercase;
  white-space: nowrap;
  color: rgb(200, 200, 200);
  background-color: rgb(0, 0, 0);
  border: 1px solid rgb(0, 0, 0);
  box-shadow: 0px 0px 4px black;
  padding: 3px 5px;
  border-radius: 5px;
  cursor: pointer;
  min-width: 50px;
  text-align: center;
}

.link_btn:focus {
  border-color: rgb(0, 99, 136);
}

.link_btn:hover {
  border-color: rgb(0, 255, 255);
}

.link_btn:disabled {
  background-color: rgb(70, 70, 70);
}

.log_out {
  top: 5px;
  right: 10px;
  text-transform: uppercase;
  white-space: nowrap;
  color: rgb(200, 200, 200);
  background-color: rgb(0, 0, 0);
  border: 1px solid rgb(0, 0, 0);
  box-shadow: 0px 0px 4px black;
  padding: 3px 5px;
  border-radius: 5px;
  cursor: pointer;
  min-width: 50px;
  text-align: center;
}

.log_out:focus {
  border-color: rgb(0, 99, 136);
}

.log_out:hover {
  border-color: rgb(0, 255, 255);
}

.log_out:disabled {
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