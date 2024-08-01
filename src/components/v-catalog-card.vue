<template>
  <div class="catalog" v-if="GAMES.results">

    <div class="menu-filter" >
      <vCatalogSorted :fillData="fillData" :placeholder="'Искать партию по названию...'"/>
      <div class="wrapper-filter">
        <vCatalogSearch :fillData="fillData"/>
      <vCatalogFilter :fillData="fillData"/>
      </div>

    </div>
    <div class="wrapper-new-game">  <AButton :ghost="true" @click="showModal">Добавить партию<PlusOutlined /></AButton></div>

    <vModalAddGame :openModal="openModal" :closeModal="closeModal"/>
    <div v-if="GAMES.results.length" style="display: flex; width: 100%; flex-wrap: wrap; ">
    <vCard
        v-for="game in GAMES.results"
           :key="game.id"
           v-bind:game_data="game"/>

      <div style="display: flex; justify-content: center; margin: 20px 0; width: 100%">
          <aPagination @change="onChangePagination" style=" padding: 5px 10px; background-color: rgba(255,255,255,0.7); border-radius: 5px"
                       v-model:current="current" simple :total="countPage" :defaultPageSize="20"/>
      </div>
    </div>
    <div v-else style="margin: 0.75rem;">
      <span style="color: white; ">Нет партий</span>
    </div>
  </div>
  <div v-else style="display: flex; justify-content: center; padding: 20px"><VLoading /></div>
</template>

<script>
import vCard from './v-card'
import vCatalogFilter from './v-catalog-filter'
import vCatalogSorted from './v-catalog-sorted'
import vCatalogSearch from './v-catalog-search'
import vModalAddGame from './v-modal-add-game'
import {mapActions, mapGetters} from 'vuex'
import {Button, Pagination} from 'ant-design-vue'
import { PlusOutlined } from '@ant-design/icons-vue';
import VLoading from "@/components/v-loading";
export default {
  name: "v-catalog-card",
  components: {
    VLoading,
    vCard,
    vCatalogFilter,
    vCatalogSorted,
    vCatalogSearch,
    AButton: Button,
    PlusOutlined,
    APagination: Pagination,
    vModalAddGame
  },
  data(){
    return{
      page: '1',
      data: {},
      current: 1,
      countPage: 1,
      openModal: false
    }
  },
  inject: ['showModal', 'closeModal'],
  computed: {
    ...mapGetters([
        'GAMES'
    ])
  },
  methods: {
    ...mapActions([
        'GET_GAMES_FROM_API'
    ]),
    async fillData(elem){

      if(typeof elem.checkSorted !== "undefined"){
        this.data['sort_date'] = elem.checkSorted;
      }

      if(typeof elem.search !== "undefined"){
        this.data['name'] = elem.search;
      }

      if(typeof elem.nameGame !== "undefined"){
        this.data['name'] = elem.nameGame;
      }

      if(typeof elem.tag !== "undefined"){
        this.data['tag'] = elem.tag;
      }

      if(typeof elem.namePlayer !== "undefined"){
        this.data['player_name'] = elem.namePlayer;
      }

      if(typeof elem.playerRating !== "undefined"){
        this.data['player_rating'] = elem.playerRating;
      }

      await this.GET_GAMES_FROM_API(this.data);
    },
    async onChangePagination(){
      this.data['page'] = this.current
      await this.GET_GAMES_FROM_API(this.data)
    },
  },
  watch:{
    GAMES(){
      this.countPage = this.GAMES.info.count
    }
  },
   created() {
    this.data['page'] = this.current
    this.GET_GAMES_FROM_API(this.data).then(()=>{
      this.countPage = this.GAMES.info.count
    });
  },

  async mounted(){

  }
}
</script>

<style scoped>
.catalog{
  display: flex;
  /*-webkit-box-pack: center;*/
  /*justify-content: center;*/
  /*-webkit-box-align: center;*/

  align-items: center;
  flex-wrap: wrap;
  max-width: 1248px;
  margin: auto;
}
.menu-filter{
  margin: 0.75rem;
  display: flex;
  width: 100%;
  gap: 10px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.wrapper-filter{
  display: flex;
  gap: 10px;
  flex-direction: row;
  flex-grow: 1;
  align-items: center;
  /*flex-wrap: wrap;*/
  justify-content: flex-end;
}
.wrapper-new-game{
  display: flex;
  justify-content: end;
  width: 100%;
  margin-right: 0.75rem;
  margin-bottom: 0.3rem;
}
@media screen and (max-width: 40.625em) {
  .catalog{
    justify-content: center;
  }
}
</style>