<template>
<div class="main-review">
  <div style="display: flex; width: 100%; justify-content: space-between">
    <div style="display: flex; gap:0 10px; align-items: center">
      <span style="font-size: 16px; color: #808080">{{review_data.player_name}}</span>
      <span style="font-size: 12px; color: rgb(104 101 101)">{{dateTime}}</span>
    </div>

    <span style="font-size: 13px; color: #7a7878">{{review_data.created_at}}</span>
  </div>

  <div style="display: flex; flex-direction: column; max-width: 200px">
    <AButton target="_blank" type="link" style=" padding: 0; display: flex; text-decoration: none" v-if="review_data.review_link" :href="review_data.review_link">Ссылка на партию</AButton>
    <AButton  style="margin-top: 20px" v-if="review_data.sgf" @click="downloadSGF(review_data.sgf)" download><DownloadOutlined /> Скачать SGF</AButton>
  </div>

  <p>{{review_data.text}}</p>

  <ADivider style="background-color: #808080"/>
</div>
</template>

<script>
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ru';
import { Divider, Button } from "ant-design-vue";
import { DownloadOutlined } from '@ant-design/icons-vue';
export default {
  name: "v-card-review",
  props: ['review_data'],
  components: {
    ADivider: Divider,
    DownloadOutlined,
    AButton: Button
  },
  data(){
    return{
      dateTime: ''
    }
  },
  inject: ['downloadSGF'],
  created() {
    dayjs.extend(relativeTime);
    dayjs.locale('ru')
  },
  methods:{
    div(val, by){
      return (val - val % by) / by;
    }
  },
  mounted() {
    const parse = this.review_data.created_at.split(' ')
    const parseDate = parse[0].split('.')
    const parseTime = parse[1].split(':')

    const hourOffset = (Number(parseTime[0]) + this.div((new Date().getTimezoneOffset()),60)).toString()
    const minuteOffset = (Number(parseTime[1]) + (new Date().getTimezoneOffset()%60)).toString()
    parseTime[0] = hourOffset.length === 1 ? `0${hourOffset}` : hourOffset;
    parseTime[1] =  minuteOffset.length ===1 ? `0${minuteOffset}`: minuteOffset;

    let utcDate = new Date(`${parseDate[2]}-${parseDate[1]}-${parseDate[0]}T${parseTime[0]}:${parseTime[1]}:${parseTime[2]}Z`);

    this.dateTime = dayjs().to(dayjs(utcDate));
  }

}
</script>

<style scoped>
.main-review{
  color: white;
}
</style>