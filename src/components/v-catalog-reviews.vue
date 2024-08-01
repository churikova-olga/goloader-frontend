<template>
<div style="background: rgb(43 44 47); padding: 24px; border-radius: 8px;" v-if="REVIEWS.results">
<!--{{REVIEWS.results.length}}-->

  <div style="display: flex; justify-content: space-between;">
    <vCatalogSorted :fillData="fillData"/>
    <div style="display: flex; justify-content: flex-end; flex: 1 0; gap: 0 10px"><vCatalogSearch :fillData="fillData" :placeholder="'Искать обзор по автору...'"/></div>

  </div>
  <ADivider style="background-color: #808080; margin-bottom: 40px; margin-top: 10px"/>
  <div v-if="REVIEWS.results.length">
  <vCardReview   v-for="review in REVIEWS.results"
                 :key="review.id"
                 v-bind:review_data="review"/>
    <div style="display: flex; justify-content: center; margin: 20px 0; width: 100%">
      <aPagination @change="onChangePagination" style=" padding: 5px 10px; background-color: rgba(255,255,255,0.7); border-radius: 5px"
                   v-model:current="current" simple :total="countPage" :defaultPageSize="20"/>
    </div>
  </div>
  <div style="color: white" v-else>
    Нет обзоров
  </div>
</div>
</template>

<script>
import vCardReview from "./v-card-review"
import vCatalogSorted from "./v-catalog-sorted"
import {mapActions, mapGetters} from "vuex";
import VCatalogSearch from "@/components/v-catalog-search";
import {Divider, Pagination} from "ant-design-vue";
export default {
  name: "v-catalog-reviews",
  props:['idGame'],
  components: {
    VCatalogSearch,
    vCardReview,
    vCatalogSorted,
    ADivider: Divider,
    APagination: Pagination,

  },
  data(){
    return{
      data: {id: this.idGame},
      current: 1,
      countPage: 1,
    }
  },
  computed: {
    ...mapGetters([
       'REVIEWS'
    ])
  },
  methods: {
    ...mapActions([
      'GET_REVIEWS_FROM_API'
    ]),
    async onChangePagination(){
      this.data['page'] = this.current
      await this.GET_REVIEWS_FROM_API(this.data)
    },

    async fillData(elem){

      if(typeof elem.checkSorted !== "undefined"){
        this.data['sort_date'] = elem.checkSorted;
      }
      if(typeof elem.search !== "undefined"){
        this.data['player_name'] = elem.search;
      }

      await this.GET_REVIEWS_FROM_API(this.data);
    },

  },
  watch:{
    REVIEWS(){
      this.countPage = this.REVIEWS.info.count
    }
  },
  created(){
    this.data['page'] = this.current
    this.GET_REVIEWS_FROM_API(this.data).then(()=>{
      console.log("REVIEWS", this.REVIEWS)
      this.countPage = this.REVIEWS.info.count
    });
  }
}
</script>

<style scoped>

</style>