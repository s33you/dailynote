<template>
    <el-card class="card">
        <div slot = "header" class="header">
            <img class= "header-img" :src= "src"/>
            <span class="header-name">{{name}}</span>

        </div>
        <span class="card-text">{{text}}</span>
    </el-card>
</template>
<script>
export default {
  name: 'base-card',
  props: {
    name: String,
    src: String,
    text: String
  }
}
</script>
<style lang="scss" scoped>
.card{
    width: 15rem;
    font-weight: lighter;
    font-size: 1rem;
     &-text{
        margin: 10px;
        line-height: 2rem;
        word-spacing: 5px;
    }
}
.header{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    &-img{
        border-radius:3rem;
        width: 3rem;
    }
    &-name{
        align-self: flex-end;
        color:brown
    }

}
</style>
