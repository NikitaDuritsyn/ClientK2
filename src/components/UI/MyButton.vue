<template>
  <button :disabled="disabled" :class="['button', cls]">
    <div v-if="icon_left" class="btnIconLeft" :style="{ 'background-image': 'url(' + icon_left + ')' }">
    </div>
    <span v-if="withMarginRight" style="margin-left: 0.5rem"></span>
    <slot />
    <span v-if="withMargin" style="margin-right: 0.5rem"></span>
    <div v-if="icon" class="btnIcon" :style="{ 'background-image': 'url(' + icon + ')' }">
    </div>
  </button>
</template>

<script>
export default {
  name: "MyButton",
  props: {
    withMargin: {
      type: Boolean,
      default: false
    },
    withMarginRight: {
      type: Boolean,
      default: false
    },
    cls: {
      type: String,
      default: 'pink',
      validator: value => {
        return [
          'btn_second',
          'btn_white',
          'pink',
          'hollow',
          'blue',
          'noText',
          'blank',
          'purple',
          'darknessButton',
          'close_btn'
        ].includes(value)
      }
    },
    icon: {
      type: String,
    },
    icon_left: {
      type: String,
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    btnClass() {
      if (this.cls === 'hollow') {
        return 'hollow'
      } else if (this.cls === 'blue') {
        return 'blue'
      } else if (this.cls === 'noText') {
        return 'noText'
      } else if (this.cls === 'blank') {
        return 'blank'
      } else if (this.cls === 'darknessButton') {
        return 'darknessButton'
      } else {
        return 'pink'
      }
    },
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
  /*max-width: 28rem;*/
}

.purple {
  background: #653E8B;
  border: 0.15rem solid #653E8B;
}

.pink {
  background: #E32289;
  border: 0.15rem solid #E32289;
}

.heartDisable,
.heartActive {
  margin-left: 4px;
}

.hollow {
  border: 0.15rem solid #E32289;
  background-color: transparent;
}

.withMargin {
  margin-right: 0.5rem;
}

.blue {
  border: 0.15rem solid #3B3C8D;
  background-color: #3B3C8D;
}

.darknessButton {
  border: 0.15rem solid rgb(20, 20, 20);
  background-color: rgb(20, 20, 20);
  color: rgb(120, 120, 120);
}

/* .darknessButton:hover {
  border: 0.15rem solid rgb(40, 0, 0);
  background-color: rgb(40, 0, 0);
} */
.darknessButton:disabled {
  border: 0.15rem solid rgb(60, 60, 60);
  background-color: rgb(35, 35, 35);
}

.noText {
  padding: 4px;
  width: 30px;
  height: 30px;
  border-radius: 12px;
}

.blank {
  background-color: transparent;
  border: none;
  cursor: default;
}

.backArrowIcon {
  transform: rotate(180deg);
  margin-right: 0.5rem;
}

.scrollLeft {
  transform: rotate(180deg);
}

.scrollLeft,
.scrollRight {
  height: 1.7rem;
}

.nextArrowIcon,
.logInIcon,
.logOutIcon {
  margin-left: 0.5rem;
}

.notificationsInnerCircle {
  width: 1.5rem;
  height: 1.5rem;
  background-color: #E32289;
}

.mailIcon {
  margin-left: 0.5rem;
  width: 1.25rem;
  height: 1.25rem;
}

.btnIcon {
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  height: 1.25rem;
  width: 1.25rem;
}

.btnIconLeft {
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  height: 1.25rem;
  width: 1.25rem;
  transform: rotate(180deg);
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
.btn_second:disabled{
  background-color: rgb(70, 70, 70);
}

.btn_white{
  background-color: whitesmoke;
  border: 1px solid whitesmoke;
  padding: 3px 5px;
  border-radius: 0px;
  /* border-top-left-radius: -50% !important; */
  /* border-top-right-radius: -50% !important; */
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
.btn_white:disabled{
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