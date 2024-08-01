<template>
  <div class="header">
    <AButton ghost @click="this.$router.push('/') ">
      <div style="display: flex; align-items: flex-end">
        <BackwardOutlined style="font-size: 22px"/>
        Назад к партиям
      </div>
    </AButton>
    <div style="display: flex"><img style="height: 50px; width: 110px; "  src="../assets/logoGame.png" alt="logo" class="logo"></div>

  </div>
<div class="main">
  <vGame :Game="GAME"></vGame>
  <ACollapse style="background: rgb(43 44 47); margin: 30px 0" :bordered="false" v-model:activeKey="activeKey">
    <template #expandIcon="{ isActive }">
      <CaretRightOutlined style="color: white; font-size: 16px" :rotate="isActive ? 90 : 0" />
    </template>
    <ACollapsePanel key="1" >
      <template #header> <span style="color: white; font-size: 16px; font-weight: bold"> Теги </span></template>
      <ATag v-for="tag in GAME.tags" :key="tag.id" color="blue">{{tag.tag}}</ATag>
    </ACollapsePanel>

  </ACollapse>
  <ACollapse style="background: rgb(43 44 47); margin: 30px 0" :bordered="false" v-model:activeKey="activeKey">
    <template #expandIcon="{ isActive }">
      <CaretRightOutlined style="color: white; font-size: 16px" :rotate="isActive ? 90 : 0" />
    </template>
    <ACollapsePanel key="2" >
      <template #header> <span style="color: white; font-size: 16px; font-weight: bold"> Добавить обзор </span></template>


      <AForm layout="vertical" v-if="isLoading==='none'">
        <AAlert v-if="flagStatus" message="Необходимо добавить ссылку на обзор или разбор в формате .sgf файла" type="info" show-icon style="margin: 5px"/>
        <AAlert v-else message="Добавьте ссылку на обзор или разбор в формате .sgf файла" type="error" show-icon style="margin: 5px"/>

        <AFormItem>

          <template #label>
            <span style="color: white">Имя</span>
          </template>

          <AInput :maxLength="50" :allowClear="true" v-model:value="nameReviewer" placeholder="Аноним">
            <template #clearIcon><CloseOutlined style="font-size: 16px; font-weight: bold" /></template>
          </AInput>
        </AFormItem>

        <AFormItem>

          <template #label>
            <span style="color: white">Ссылка на обзор</span>
          </template>

          <AInput :maxLength="50" :allowClear="true" v-model:value="linkReview" placeholder="Ссылка...">
            <template #clearIcon><CloseOutlined style="font-size: 16px; font-weight: bold"/></template>
          </AInput>
        </AFormItem>

        <AFormItem >

          <span role="button">
          <input type="file" style="display: none;" id="uploadFile" @change="onAttachmentChange" accept=".sgf">
            <AButton @click="uploadSGF"><UploadOutlined /> Загрузить SGF</AButton>
           </span>
          <div v-if="fileList" style="color: white; display: flex; justify-content: space-between; margin-top: 5px">
            <div><PaperClipOutlined /> {{fileList.name}} </div>
            <AButton style="color:white;" type="text" @click="onClearAttachment"><DeleteOutlined /></AButton>
          </div>
        </AFormItem>

        <AFormItem>

          <template #label>
            <span style="color: white">Комментарий</span>
          </template>

          <ATextarea v-model:value="commentReview" placeholder="Текст..." :rows="4" />
        </AFormItem>



        <AFormItem style="text-align: center">
          <AButton @click="addReview">Добавить обзор</AButton>
        </AFormItem>




      </AForm>


      <AResult v-else-if="isLoading==='success'">
        <template #title>
          <span style="color: white">Вы успешно добавили обзор!</span>
        </template>
        <template #icon>
          <SmileTwoTone />
        </template>
        <template #extra>
          <AButton @click="clearForm" type="primary">Продолжить</AButton>
        </template>
      </AResult>

      <AResult status="error"  v-else-if="isLoading==='error'">
        <template #title>
          <span style="color: white">Упс! Произошла ошибка, попробуйте снова</span>
        </template>
        <template #extra>

          <AButton @click="this.isLoading = 'none'; this.flagStatus = true;" type="primary">Продолжить</AButton>
        </template>
      </AResult>




      <div v-else style="display:flex; justify-content: center; margin: 10px 0">
      <VLoading/>
      </div>


    </ACollapsePanel>

  </ACollapse>



  <VCatalogReviews :idGame="id"/>
</div>
</template>

<script>
import vGame from './v-game'
import {Collapse, Tag, Button, CollapsePanel, Form, FormItem, Input, Textarea, Alert, Result, } from "ant-design-vue";
import { CaretRightOutlined, BackwardOutlined, CloseOutlined, UploadOutlined, PaperClipOutlined, DeleteOutlined, SmileTwoTone  } from '@ant-design/icons-vue';
import {mapActions, mapGetters} from "vuex";
import VCatalogReviews from "@/components/v-catalog-reviews";
import axios from "axios";
import VLoading from "@/components/v-loading";
export default {
  name: "v-wrapper-game",
  props: ['id'],
  components: {
    VLoading,
    VCatalogReviews,
    vGame,
    ACollapse: Collapse,
    ACollapsePanel: CollapsePanel,
    CaretRightOutlined,
    ATag: Tag,
    AButton: Button,
    BackwardOutlined,
    AForm: Form,
    AFormItem: FormItem,
    AInput: Input,
    CloseOutlined,
    UploadOutlined,
    PaperClipOutlined,
    DeleteOutlined,
    ATextarea: Textarea,
    AAlert: Alert,
    SmileTwoTone,
    AResult: Result,

  },
  data(){
    return{
      activeKey: 1,
      nameReviewer: "",
      linkReview: "",
      fileList: "",
      commentReview: "",
      flagStatus: true,
      isLoading: "none"
    }
  },
  computed: {
    ...mapGetters([
      'GAME', 'REVIEWS'
    ])
  },
  methods: {
    ...mapActions([
      'GET_GAME_BY_ID', 'GET_REVIEWS_FROM_API'
    ]),
    uploadSGF(){
      document.getElementById("uploadFile").click()
    },
    onAttachmentChange(e){
      this.fileList = e.target.files[0]

    },
    onClearAttachment(){
      this.fileList = ""
      document.getElementById("uploadFile").value = ""
    },
    async addReview(){
      if(this.fileList === "" && this.linkReview === "" ){
        this.flagStatus = false;
      }
      else {
        this.isLoading = "loading";
        const config = { headers: {
            'Content-Type': 'multipart/form-data',
          }}
        const data = new FormData();

        data.append('game_id', this.id)
        data.append('sgf', this.fileList)
        data.append('review_link', this.linkReview)
        data.append('player_name', this.nameReviewer)
        data.append('text', this.commentReview)
        const limitSizeFile = 250000

        if(data.get('sgf').size > limitSizeFile){
          setTimeout(()=> {
                this.isLoading = "error";
              }
              , 2000)
        }
        else{
          await axios.post(`${process.env.VUE_APP_SERVER_URL}/review/create`, data, config)
              .then(response => {
                setTimeout(()=> {
                      this.isLoading = "success";

                      this.GET_REVIEWS_FROM_API({id: this.id})
                    }
                    , 2000)
                return response.data
              })
              .catch(error =>{
                  setTimeout(()=> {
                        this.isLoading = "error";
                      }
                      , 2000)

                    console.log(error)
                    return error
                  }


          )
        }


      }

    },
    clearForm(){
      this.isLoading = "none"
      this.flagStatus = true
      this.linkReview = ""
      this.nameReviewer = ""
      this.commentReview = ""
      this.fileList = ""

    }
  },
  created() {
    this.GET_GAME_BY_ID(this.id)
  },
  mounted() {

  }


}
</script>

<style scoped>
.main{
  margin: 20px 100px;
}
.header{
  width: 100%;
  height: 60px;
  background: rgb(43 44 47);
  margin-top: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 100px;
  box-sizing: border-box;
}
@media screen and (max-width: 40.625em) {
  .main{
    margin: 20px 10px;
  }
  .header{
    padding: 0 10px;
  }
}
</style>