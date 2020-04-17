<template>
    <div class="header">

        <span class="header-title">浮 生 日 記 </span>
        <span  @click="toGithub">
            <icon
            name = "github"
            class="header-icon" />
        </span>

    </div>
</template>
<script>
export default {
  name: 'app-header',
  methods: {
    toGithub () {
      window.open('https://github.com/s33you', '_blank')
    }
  }
}
</script>
<style lang="scss" scoped>
.header{
    display: flex;
    justify-content: center;
	align-items: center;
	background-color: #ffffff;
	height: 70px;
	border-bottom: 2px solid #f1f1f1;
	color: #778899;
    width: 100%;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    &-icon{
        margin-left:10px;
        margin-right:30px;
        width:40px;
        cursor: pointer;
    }
    &-title{
        font-family: 'flower';
        font-size:  30px;

    }
}
</style>
