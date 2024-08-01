<template>
  <ACard :title="Game.name" :bordered="false"
         :headStyle="{borderBottom: '1px solid rgb(60, 62, 68)', color: 'white', fontSize: '24px', fontWeight: 'bold'}"
         style="width: 100%; background-color: rgb(43 44 47); color: white">
    <template #extra><span style="color: #7a7878; font-size: 13px" >{{Game.created_at}}</span></template>
    <div style="font-size: 17px; display: flex; align-items: center; gap: 0 5px; flex-wrap: wrap;">
     <div style=" display: flex; align-items: center; gap: 0 5px; flex-wrap: nowrap;">
       <div style="width: 15px; height: 15px; background-color: black; border-radius: 50%"></div>
       {{Game.player1_name}} - {{Game.player1_rating}}</div>
      <ThunderboltFilled style="margin: 0 10px"/>
      <div style=" display: flex; align-items: center; gap: 0 5px; flex-wrap: nowrap;">
        <div style="width: 15px; height: 15px; background-color: white; border-radius: 50%"></div>
      {{Game.player2_name}} - {{Game.player2_rating}}</div>
    </div>
    <div   style="margin: 20px 0 15px 0; font-size: 14px; display: flex; align-items: center; gap: 0 5px">
      Победитель:
      <div v-if="Game.winner ==='белый'" style="width: 20px; height: 20px; background-color: white; border-radius: 50%"></div>
      <div v-else-if="Game.winner ==='чёрный'" style="width: 20px; height: 20px; background-color: black; border-radius: 50%"></div>
    </div>


    <div style="display: flex; flex-direction: column; max-width: 200px">
    <a style="margin-bottom: 10px" v-if="Game.game_link" :href="Game.game_link">Ссылка на партию</a>
    <AButton  v-if="Game.sgf" @click="downloadSGF(Game.sgf)" download><DownloadOutlined /> Скачать SGF</AButton>
    </div>
<p v-if="Game.description">{{Game.description}}</p>
  </ACard>

</template>

<script>



import { Card, Button } from "ant-design-vue";
import { ThunderboltFilled, DownloadOutlined } from '@ant-design/icons-vue';
export default {
  name: "v-game",
  props:['Game'],
  components:{
    ACard: Card,
    AButton: Button,
    ThunderboltFilled,
    DownloadOutlined
  },
  data(){
    return{

    }
  },
  inject: ['downloadSGF'],

  mounted() {

  }
}
</script>

<style scoped>

</style>