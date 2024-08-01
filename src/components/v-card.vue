<template>

  <article :class="activeHover ? 'card card-hover' : 'card'">

    <router-link :to="{ name: 'game', params: { id: game_data.id }}" class="card-link"  @mouseenter="activeHover = true" @mouseleave="activeHover = false">
      <div class="card-wrapper-image"><img class="card-image" src="../assets/game.jpg"></div>
    </router-link>
    <div class="card-contain">

      <router-link :to="{ name: 'game', params: { id: game_data.id }}" style="text-decoration: none"  @mouseenter="activeHover=true" @mouseleave="activeHover=false">
        <div class="card-section section-between">
          <span class="name-cart">{{ game_data.name }}</span>
          <span class="created-cart">{{ game_data.created_at }}</span>
        </div> <!--name & created-->
        <div class="card-section">
          <span class="player-name">{{ game_data.player1_name }} - {{ game_data.player1_rating }}</span>
        </div> <!--player1 (name & rating)-->
        <div class="card-section">
          <span class="player-name">{{ game_data.player2_name }} - {{ game_data.player2_rating }}</span>
        </div> <!-- player2 (name & rating)-->
      </router-link>
      <div class="card-section">
        <button v-if="game_data.sgf" class="link sgf" @click="downloadSGF(game_data.sgf)" download><DownloadOutlined /> Скачать sgf</button>
        <a target="_blank" style="font-size: 14px" v-if="game_data.game_link" class="link online" :href="game_data.game_link" >Ссылка на партию</a>


      </div> <!-- sgf & link-->

      <div  class="card-section card-tags">
        <ATag v-for="tag in tags[0]" :key="tag.id" color="blue">{{tag.tag}}</ATag>
        <APopover trigger="click" v-if="game_data.tags.length > limitTagVisible">
          <button class="popover-click-btn">...</button>
          <template #content>
            <div style="width: 300px;"><ATag v-for="tag in tags[1]" :key="tag.id" color="blue">{{tag.tag}}</ATag></div>
          </template>
        </APopover>
      </div> <!-- tags ввести ограничение на теги-->

    </div>

    <div  :class="`${game_data.winner === 'чёрный' ? 'bc-black' : 'bc-white'} circle-winner` "></div>

  </article>

</template>

<script>
import {Popover, Tag} from 'ant-design-vue'
import { DownloadOutlined } from '@ant-design/icons-vue';
import {defineComponent} from "vue";


export default defineComponent({
  name: "v-card",
  components:{
    ATag: Tag,
    APopover: Popover,
    DownloadOutlined
  },
  props:{
    game_data:{
      type: Object,
      default(){
        return {}
      }
    }
  },
  inject: ['downloadSGF'],
  data(){
    return{
      activeHover: false,
      tags: [],
      limitTagVisible: 3
    }
  },
  methods:{

  },
  mounted() {

    if(this.game_data.tags.length > this.limitTagVisible){
      this.tags.push(this.game_data.tags.slice(0, this.limitTagVisible), this.game_data.tags.slice(3, this.game_data.tags.length))
    }
   else{
      this.tags.push(this.game_data.tags.slice(0,this.game_data.tags.length))
    }
    }
})
</script>

<style scoped>

.card{
  /*cursor: pointer;*/
  position: relative;
  width: 600px;
  height: 220px;
  display: flex;
  overflow: hidden;
  background-color: rgb(60, 62, 68);
  border-radius: 0.5rem;
  margin: 0.75rem;
  border: 1px solid rgb(117 164 188);
  box-sizing: border-box;
}
.card-hover{
  box-shadow: 0 0 10px rgba(255,255,255,0.8); /* Параметры тени */
}

.card-wrapper-image{
  flex: 2 1 0%;
  width: 100%;
}
.card-section{
  margin-bottom: 5px;
}
.card-image{
  width: 100%;
  height: 100%;
  margin: 0px;
  opacity: 1;
  transition: opacity 0.5s ease 0s;
  object-position: center center;
  object-fit: cover;
}
.card-contain{
  flex: 3 1 0%;
  position: relative;
  padding: 0.75rem;
  color: rgb(255, 255, 255);
  display: flex;
  flex-direction: column;
}
.section-between{
  display: flex;
  justify-content: space-between;
}

.created-cart{
  color: rgb(158, 158, 158);
  font-size: 14px;
}
.name-cart{
  color: white;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
}
.link{
  display: block;
  color: white;
  margin: 5px 0;
}
.online{
  text-decoration: underline  rgb(117 164 188);
  width: fit-content;
  text-decoration-thickness: 1px;
}
.online:hover{
  color:rgb(117 164 188);

}
.card-link{

  display: flex;
  text-decoration: none;
}
.sgf{
  text-decoration: black;
  border: 1px solid rgb(117 164 188);
  width: fit-content;
  padding: 3px 10px;
  border-radius: 5px;
  background-color:#0a406b;
  cursor: pointer;
}
.sgf:hover{
  background-color:#435f75;
}
.player-name{
  color: white;
}
.circle-winner{
  position: absolute;
  width: 100px;
  height: 100px;
  border-radius: 50%;

  top: 150px;
  right: -43px;
}
.bc-black{
  background-color: #191818;
}
.bc-white{
  background-color: #e0e0e0;
}
.popover-click-btn{
  background-color: transparent;
  border: none;
  color: white;
  font-size: 16px;
  cursor: pointer;
}
@media screen and (max-width: 40.625em) {
  .card {
    flex-direction: column;
    /*height: initial;*/
    width: 400px;
    height: 560px;
  }
  .circle-winner{
    top: 500px;
  }

}
</style>