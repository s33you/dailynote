<template>
<div>
  <img
      class="img"
      :style = "this.style"
      :src = "require(`@/assets/imgs/${this.name}`)"
      v-bind = "this.$attrs"
      v-on = "this.$listeners"
      >
</div>
</template>
<script>
export default {
  name: 'base-img',
  props: {
    name: {
      type: String,
      default: ''
    },
    size: {
      type: Number,
      default: 16
    },
    width: {
      type: Number,
      default: 0
    },
    height: {
      type: Number,
      default: 0
    },
    circle: {
      type: Boolean
    }
  },
  mounted () {
  },
  computed: {
    style () {
      return {
        width: this.width ? this.width + 'px' : this.size + 'px',
        height: this.height ? this.height + 'px' : this.size + 'px',
        borderRadius: this.circle ? (this.width ? this.width + 'px' : this.size + 'px') : 'none'
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  .img{
    display: block;

  }
</style>
