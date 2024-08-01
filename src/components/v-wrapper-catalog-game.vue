<template>
  <div class="game">
    <div style="max-height: 258px; max-width: 565px; margin: auto"><img height="258" width="565" src="../assets/logoGame.png" alt="logo" class="logo"></div>

    <div class="wrapper-catalog">
      <vCatalogCard />
    </div>
  </div>
</template>

<script>
import vCatalogCard from './v-catalog-card'
export default {
  name: 'v-wrapper-catalog-game',
  components:{
    vCatalogCard
  },


}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.wrapper-catalog{
  background-color: rgb(43 44 47);
  margin: 40px 0;
}

.logo{
  width: 100%;
  height: 100%;
  object-fit: contain;
}


</style>
