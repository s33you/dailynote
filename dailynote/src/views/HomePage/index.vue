<template>
  <div class="home"  >
    <transition name="slide-fade" >
    <div class="home-loader" v-if="loading">
     <div class="home-loader-title">浮 生 | 日 記</div>
     <div class="home-loader-icon turn">🖋</div>
    </div>
    </transition>
    <transition name="slide-fade">
      <div  class= "home-container" v-if="!loading">
        <div class="home-container-title">
          <icon name = "shake-2" class="home-container-icon" />
          <span class="home-container-msg">摇一摇来获取日记</span>
        </div>
         <transition name = "el-zoom-in-center">
           <base-card
            :key="card.name"
            class="home-container-card"
            v-show="cardShow"
            :text = "card.text"
            :name = "''"
            :src = "card.src"/>
         </transition>
      </div>
    </transition>
  </div>
</template>
<script>
import throtte from '@/utils/throtte'
export default {
  name: 'Home',
  data () {
    return {
      count: 0,
      loading: true,
      devicemotion: Boolean,
      acceleration: {
        lastX: 0,
        lastY: 0,
        lastZ: 0
      },
      cardShow: true,
      card: {
        src: '',
        text: '',
        name: ''
      }
    }
  },
  mounted () {
    this.$api.Card.getRandomCard()
      .then(card => {
        this.getCard(card.data)
        this.loading = false
      })
    if (window.DeviceMotionEvent) {
      this.devicemotion = true
      window.addEventListener('devicemotion', this.shakeHandler)
    }
  },
  methods: {
    getCard (data) {
      for (let key in data) {
        this.card[key] = data[key]
      }
    },
    counter: throtte(object => {
      ++object.count
      navigator.vibrate([500, 100])
    }, 500),
    shakeHandler (event) {
      const speed = 15
      const acceleration = event.acceleration
      const cx = acceleration.x
      const cy = acceleration.y
      const cz = acceleration.z

      if (Math.abs(cx - this.acceleration.lastX) > speed ||
        Math.abs(cy - this.acceleration.lastY) > speed ||
        Math.abs(cz - this.acceleration.lastZ) > speed) {
        this.counter(this)
        if (this.count > 0) {
          this.$api.Card.getRandomCard()
            .then(card => {
              this.cardShow = false
              this.getCard(card.data)
              this.cardShow = true
            })
            .catch(err => {
              alert(err)
            })
          this.count = 0
        }
      }
    }
  },
  destroyed () {
    window.removeEventListener('devicemotion', this.shakeHandler)
  }
}
</script>
<style lang="scss" scoped>
@import './anime.scss';
.home{
  height: calc(100% - 70px);
  overflow: scroll;
  background-color: #f4f5f5
}
.home-loader{
  font-family: 'flower';
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  &-icon{
    padding: 0 auto;
    font-size: 1.5rem;
    margin-left:1rem;
    display: block;

  }
  &-title{
    font-size: 1.5rem;
  }
}
.home-container{
  width:100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start ;
  align-items: center;
  &-title{
    display: flex;
    align-items: center;
  }
  &-icon{
    width:3rem;
    margin-right:20px;
  }
  &-msg{
    line-height: 1rem;
    font-size: 1.5rem;

  }
  &-card{
    margin-bottom: 50px;
  }
}

</style>
