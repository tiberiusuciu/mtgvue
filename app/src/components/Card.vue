<template>
  <div :class="{'zoom': !isPressed, 'card': true}" :id="'card'+cardId" :style="{backgroundImage: 'url('+card.core_fallbackLinks[0]+')'}" @mousedown="mouseIsPressed" @mouseup="mouseIsReleased()">
    <!-- this is card -->
  </div>
</template>

<script>
export default {
  data () {
    return {
      interval: '',
      mouseX: window.innerWidth / 2,
      mouseY: window.innerHeight / 2,
      cardX: 0,
      cardY: 0,
      isPressed: false
    }
  },
  props: ['card', 'cardId'],
  methods: {
    mouseIsPressed (e) {
      this.isPressed = true
      this.cardX = e.clientX - 118
      this.cardY = e.clientY - 50
      this.$el.style.zIndex = 10

      window.addEventListener('mousemove', (e) => {
        this.mouseX = e.clientX
        this.mouseY = e.clientY
      })

      window.addEventListener('mouseup', (e) => {
        this.mouseIsReleased()
      })

      this.interval = setInterval(() => {
        this.$el.style.position = 'fixed'
        this.cardX = this.lerp(this.cardX, this.mouseX - 118, 0.05)
        this.cardY = this.lerp(this.cardY, this.mouseY - 50, 0.05)

        var rotateYAmt = 0
        var rotateXAmt = 0
        var shadowH = 0
        var shadowV = 11

        if (((this.mouseX - this.cardX) - 118) < -20) {
          rotateYAmt = -25
          shadowH = 17
        } else if (((this.mouseX - this.cardX) - 118) > 20) {
          rotateYAmt = 25
          shadowH = -17
        } else {
          rotateYAmt = 0
          shadowH = 0
        }

        if (((this.mouseY - this.cardY) - 50) > 20) {
          rotateXAmt = 25
          shadowV = -28
        } else if (((this.mouseY - this.cardY) - 50) < -20) {
          rotateXAmt = -25
          shadowV = 28
        } else {
          rotateXAmt = 0
          shadowV = 18
        }

        this.$el.style.transform = 'rotateX(' + rotateXAmt + 'deg) rotateY(' + rotateYAmt + 'deg)'
        this.$el.style.boxShadow = shadowH + 'px ' + shadowV + 'px 18px -2px rgba(0,0,0,0.75)'

        this.$el.style.left = this.cardX + 'px'
        this.$el.style.top = this.cardY + 'px'
      }, 60 / 1000)
    },
    mouseIsReleased () {
      clearInterval(this.interval)
      this.$el.style.position = 'relative'
      this.$el.style.left = 'inherit'
      this.$el.style.top = 'inherit'
      this.$el.style.zIndex = 'inherit'

      this.$el.style.transform = 'rotateY(0deg)'
      this.$el.style.boxShadow = '0px 11px 18px -2px rgba(0,0,0,0.75)'
      this.isPressed = false
    },
    lerp (start, end, amt) {
      return (1 - amt) * start + amt * end
    }
  }
}
</script>

<style scoped>
    .card {
        display: inline-block;
        width: 215px;
        height: 299px;
        cursor: pointer;
        text-align: left;
        margin: 0px 10px;
        background-color: black;
        background-size: contain;
        background-repeat: no-repeat;
        -webkit-box-shadow: 0px 11px 18px -2px rgba(0,0,0,0.75);
        -moz-box-shadow: 0px 11px 18px -2px rgba(0,0,0,0.75);
        box-shadow: 0px 11px 18px -2px rgba(0,0,0,0.75);
        bottom: 0px;
        transition: width .15s ease-in-out, height .15s ease-in-out, margin .25s ease-in-out, transform .25s ease-in-out, box-shadow .25s ease-in-out;
        /* position: absolute; */
        /* bottom: 0; */
        /* margin: 0px -30px; */
        margin-bottom: -137px;
        border-radius: 12px;
    }

    .zoom:hover {
        /* bottom: 146px; */
        width: 287px;
        height: 400px;
        margin: 0px 50px;
        margin-bottom: 15px;
    }

</style>
