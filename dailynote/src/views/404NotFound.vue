<template>
  <div id="app-404">
		<base-img
      :circle = "true"
			:size = 100
			name ='404-img.jpg' />

    <h1>404 NOT FOUND</h1>
  </div>
</template>
<script>
export default {
  methods: {

    click () {
      alert('sss')
    }
  }
}
</script>
<style lang="scss" scoped>
#app-404 {
  position: absolute;
  width: 300px;
  height: 300px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  h1{
      font-size: 1rem;
  }
  flex-basis: 300px;
}
</style>>
