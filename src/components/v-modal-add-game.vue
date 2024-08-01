<template>
  <AModal
      okText="Добавить"
      cancelText="Отменить"
      v-model:open="open"
      wrapClassName="addGame"
      :onCancel="hideModal"
      :onOk="submitAddGame"
      style="top: 20px"
      :cancelButtonProps="{ghost: true, danger: true}"
      :okButtonProps="{ghost: true, type: 'default'}"
  >

    <template #title>
      <span style="color: white">Добавить партию</span>
    </template>

    <AForm layout="vertical"  >
      <div id="failedSubmitForm" >
      <AAlert v-if="flagStatus.status === true" :message="flagStatus.message" type="info" show-icon style="margin: 5px"/>
      <AAlert v-else-if="flagStatus.status === false" :message="flagStatus.message" type="error" show-icon style="margin: 5px"/>
      </div>
        <AFormItem>

        <template #label>
          <span style="color: white">Название</span>
        </template>


        <AInput :maxLength="50" :allowClear="true" v-model:value="titleGame" placeholder="Название...">
          <template #clearIcon><CloseOutlined style="font-size: 16px; font-weight: bold" /></template>
        </AInput>
      </AFormItem>


      <ACollapse  v-model:activeKey="activeKeyCollapseModal" ghost>
        <template #expandIcon="{ isActive }">
          <CaretRightOutlined :style="{color: 'black' }" :rotate="isActive ? 90 : 0" />
        </template>

        <ACollapsePanel key="1" >
          <template #header><span style="color: white">Чёрный игрок</span></template>

          <fieldset style="  border-radius: 5px;  border: solid 2px black; margin-bottom: 20px">

            <legend style="border: none; color: white; padding: 3px 6px; width: fit-content; font-weight: bold; margin-bottom: 5px" >
              Черный игрок
            </legend>
            <AFormItem>
              <template #label>
                <span style="color: white">Имя игрока</span>
              </template>
              <AInput :maxLength="50" :allowClear="true" v-model:value="player1Name" placeholder="Имя игрока...">
                <template #clearIcon><CloseOutlined style="font-size: 16px; font-weight: bold"/></template>
              </AInput>
            </AFormItem>


            <AFormItem >
              <template #label>
                <span style="color: white">Кю или дан</span>
              </template>
              <div class="wrapper-switch-modal" style="color: white">
                <span @click="switchKorD1=false; sliderRating1 = 0" style="cursor: pointer">Кю</span>
                <a-switch v-model:checked="switchKorD1" @change="sliderRating1 = 0" />
                <span @click="switchKorD1=true; sliderRating1 = 0" style="cursor: pointer">Дан</span>
              </div>
            </AFormItem>
            <AFormItem >
              <template #label>
                <span style="color: white">Рейтинг игрока</span>
              </template>
              <AConfigProvider
                  :theme="{
               components: {
                Slider: {
                  colorFillSecondary	:	'rgba(255, 255, 255, 0.2)'	,
                  colorFillTertiary	:	'rgba(255, 255, 255, 0.5)'	,
                },
            },
          }"
              >

                <ARow  v-if="!switchKorD1" >
                  <ACol flex="1 1">
                    <ASlider v-model:value="sliderRating1"

                             :min="0" :max="30" :marks="{0:{
                  style: { color: 'white', marginTop: '5px', marginLeft: '12px'},
                  label: 'любой'},30:{
                  style: { color: 'white', marginTop: '5px'},
                  label: '30K'}
                }"/>
                  </ACol>
                  <ACol flex="0 0">
                    <AInputNumber v-model:value="sliderRating1" :min="0" :max="30" style="margin-left: 16px" />
                  </ACol>
                </ARow>


                <ARow v-else  >
                  <ACol flex="1 1">
                    <ASlider v-model:value="sliderRating1" :min="0" :max="9" :marks="{0:{
                  style: { color: 'white', marginTop: '5px', marginLeft: '12px'},
                  label: 'любой'}, 9:{
                  style: { color: 'white', marginTop: '5px'},
                  label: '9D'}
                } "/>
                  </ACol>
                  <a-col flex="0 0">
                    <AInputNumber v-model:value="sliderRating1" :min="0" :max="9" style="margin-left: 16px" />
                  </a-col>
                </ARow>
              </AConfigProvider>
            </AFormItem>

          </fieldset>

        </ACollapsePanel>
      </ACollapse>

      <ACollapse  v-model:activeKey="activeKeyCollapseModal" ghost>
        <template #expandIcon="{ isActive }">
          <CaretRightOutlined :style="{color:  'white' }" :rotate="isActive ? 90 : 0" />
        </template>

        <ACollapsePanel key="2" >
          <template #header><span style="color: white">Белый игрок</span></template>
          <fieldset style="border-radius: 5px;  border: solid 2px white; margin-bottom: 20px">
            <legend style="border: none; color: white; padding: 3px 6px; width: fit-content; font-weight: bold; margin-bottom: 5px" >
              Белый игрок
            </legend>
            <AFormItem>
              <template #label>
                <span style="color: white">Имя игрока</span>
              </template>
              <AInput :maxLength="50" :allowClear="true" v-model:value="player2Name" placeholder="Имя игрока...">
                <template #clearIcon><CloseOutlined style="font-size: 16px; font-weight: bold"/></template>
              </AInput>
            </AFormItem>

            <AFormItem >
              <template #label>
                <span style="color: white">Кю или дан</span>
              </template>
              <div class="wrapper-switch-modal" style="color: white">
                <span @click="switchKorD2=false; sliderRating2 = 0" style="cursor: pointer">Кю</span>
                <a-switch v-model:checked="switchKorD2" @change="sliderRating2 = 0" />
                <span @click="switchKorD2=true; sliderRating2 = 0" style="cursor: pointer">Дан</span>
              </div>
            </AFormItem>
            <AFormItem >
              <template #label>
                <span style="color: white">Рейтинг игрока</span>
              </template>
              <AConfigProvider
                  :theme="{
               components: {
                Slider: {
                  colorFillSecondary	:	'rgba(255, 255, 255, 0.2)'	,
                  colorFillTertiary	:	'rgba(255, 255, 255, 0.5)'	,
                },
            },
          }"
              >

                <ARow  v-if="!switchKorD2" >
                  <ACol flex="1 1">
                    <ASlider v-model:value="sliderRating2"

                             :min="0" :max="30" :marks="{0:{
                  style: { color: 'white', marginTop: '5px', marginLeft: '12px'},
                  label: 'любой'},30:{
                  style: { color: 'white', marginTop: '5px'},
                  label: '30K'}
                }"/>
                  </ACol>
                  <ACol flex="0 0">
                    <AInputNumber v-model:value="sliderRating2" :min="0" :max="30" style="margin-left: 16px" />
                  </ACol>
                </ARow>


                <ARow v-else  >
                  <ACol flex="1 1">
                    <ASlider v-model:value="sliderRating2" :min="0" :max="9" :marks="{0:{
                  style: { color: 'white', marginTop: '5px', marginLeft: '12px'},
                  label: 'любой'}, 9:{
                  style: { color: 'white', marginTop: '5px'},
                  label: '9D'}
                } "/>
                  </ACol>
                  <a-col flex="0 0">
                    <AInputNumber v-model:value="sliderRating2" :min="0" :max="9" style="margin-left: 16px" />
                  </a-col>
                </ARow>
              </AConfigProvider>
            </AFormItem>

          </fieldset>
        </ACollapsePanel>
      </ACollapse>



      <AFormItem  :rules="[{ required: true}]" >

        <template #label>
          <span style="color: white">Победитель</span>
        </template>


        <ARadioGroup v-model:value="winnerGame">
          <ARadio style="color: white" class="radioStyle" :value="1">чёрный</ARadio>
          <ARadio style="color: white" class="radioStyle" :value="2">белый</ARadio>
        </ARadioGroup>

      </AFormItem>


      <AFormItem>

        <template #label>
          <span style="color: white">Ссылка на партию</span>
        </template>

        <AInput :maxLength="50" :allowClear="true" v-model:value="linkGame" placeholder="Ссылка...">
          <template #clearIcon><CloseOutlined style="font-size: 16px; font-weight: bold"/></template>
        </AInput>
      </AFormItem>

      <AFormItem >

        <span role="button">
          <input type="file" style="display: none;" id="uploadFileAddGame" @change="onAttachmentChange" accept=".sgf">
          <AButton @click="uploadSGF"><UploadOutlined /> Загрузить SGF</AButton>
         </span>
        <div v-if="fileGame" style="color: white; display: flex; justify-content: space-between; margin-top: 5px">
          <div><PaperClipOutlined /> {{fileGame.name}} </div>
          <AButton style="color:white;" type="text" @click="onClearAttachment"><DeleteOutlined /></AButton>
        </div>
      </AFormItem>


      <AFormItem >
        <template #label>
          <span style="color: white">Теги</span>
          <APopover trigger="click">
            <button class="popover-tip-btn"><QuestionCircleOutlined style="color: white"/></button>
            <template #content>
              <div style="width: 200px">
                <p>Каждый тег добавьте отдельно. </p>
                <p>И не забудьте добавить, прежде чем отправить партию</p>
              </div>
            </template>
          </APopover>
        </template>


        <AInputSearch v-on:keyup.enter="submitTag" v-model:value="currentTag" :allowClear="true">
          <template #clearIcon><CloseOutlined style="font-size: 16px; font-weight: bold"/></template>
          <template #enterButton>
            <AButton style="color: black" @click="submitTag">Добавить</AButton>
          </template>

        </AInputSearch>

        <div class="wrapper-tag" v-if="objectTags.length">
          <ATag closable  color="purple" @close="clearTag(tag.id)" v-for="tag in objectTags" :key="tag.id">{{tag.name}}</ATag>
        </div>
      </AFormItem>

      <AFormItem>

        <template #label>
          <span style="color: white">Описание</span>
        </template>

        <ATextarea v-model:value="descriptionGame" placeholder="Описание..." :rows="4" />
      </AFormItem>


    </AForm>

  </AModal>

  <AModal  v-model:open="isLoadingModal" :footer="null" :maskClosable="false" :closable="false" width="100px" wrapClassName="loadingModal">
  <VLoading />
  </AModal>

  <AModal  v-model:open="openSuccess" wrapClassName="addGame" :maskClosable="false" :onCancel="closeSuccessModal">
    <template #footer>
      <router-link :to="{ name: 'game', params: { id: idGame }}" style="text-decoration: none"  ><AButton key="submit" @click="closeAndClearAll" ghost >Продолжить</AButton></router-link>
    </template>
    <AResult >
      <template #title>
        <span style="color:white">Поздравляю, вы успешно добавили партию!</span>
      </template>
      <template #subTitle>
        <span style="color:white">Нажмите кнопку продолжить, чтобы перейти к страницы партии</span>
      </template>
      <template #icon>
        <SmileTwoTone />
      </template>

    </AResult>
  </AModal>

  <AModal  v-model:open="openError" wrapClassName="addGame" :onCancel="scrollUp"  >
    <template #footer>
      <AButton key="back" @click="openError = false; scrollUp()" danger ghost>Вернуться</AButton>
    </template>
    <AResult status="error">
      <template #title>
        <span style="color: white">Упс! Произошла ошибка, попробуйте снова</span>
      </template>
    </AResult>
  </AModal>
</template>

<script>
import {
  Form,
  FormItem,
  Modal,
  Button,
  Input,
  Textarea,
  Slider,
  Switch,
  ConfigProvider,
  Row,
  Col,
  Radio,
  InputNumber,
  RadioGroup, CollapsePanel, Collapse, Tag, Popover, InputSearch, Alert, Result
} from "ant-design-vue";
import { CloseOutlined, UploadOutlined, PaperClipOutlined, DeleteOutlined, CaretRightOutlined,QuestionCircleOutlined, SmileTwoTone } from "@ant-design/icons-vue"
import axios from "axios";
import VLoading from "./v-loading"
import {mapActions} from "vuex";
export default {
  name: "v-modal-add-game",
  props: ['openModal','closeModal'],
  components:{
    AModal: Modal,
    AForm: Form,
    AFormItem: FormItem,
    CloseOutlined,
    UploadOutlined,
    PaperClipOutlined,
    DeleteOutlined,
    AButton: Button,
    AInput: Input,
    ATextarea: Textarea,
    ASlider: Slider,
    ASwitch: Switch,
    AConfigProvider: ConfigProvider,
    ARow: Row,
    ACol: Col,
    AInputNumber: InputNumber,
    ARadio: Radio,
    ARadioGroup: RadioGroup,
    ACollapsePanel: CollapsePanel,
    ACollapse: Collapse,
    CaretRightOutlined,
    ATag:Tag,
    APopover: Popover,
    AInputSearch: InputSearch,
    QuestionCircleOutlined,
    AAlert: Alert,
    VLoading,
    AResult: Result,
    SmileTwoTone

  },
  data(){
    return{
      open: false,
      fileGame: "",
      titleGame: "",
      linkGame: "",
      descriptionGame: "",
      player1Name: "",
      player2Name: "",
      switchKorD1: false,
      sliderRating1: 0,
      switchKorD2: false,
      sliderRating2: 0,
      winnerGame: 0,
      activeKeyCollapseModal: 0,
      currentTag: '',
      objectTags: [],
      flagStatus: {status: true, message: "Необходимо добавить ссылку на обзор или разбор в формате .sgf файла"},
      openSuccess: false,
      openError: false,
      isLoadingModal: false,
      idGame: ''
    }
  },
  watch:{
    openModal(){
      this.open = this.openModal;
    }
  },
  methods: {
    ...mapActions([
      'GET_GAMES_FROM_API'
    ]),
    hideModal(){
      this.closeModal(this.open)
    },
    uploadSGF(){
      document.getElementById("uploadFileAddGame").click()
    },
    onAttachmentChange(e){

      this.fileGame = e.target.files[0]
    },
    onClearAttachment(){
      this.fileGame = ""
      document.getElementById("uploadFileAddGame").value = ""
    },
    submitTag(){
      if(this.currentTag.length){
        const index = this.objectTags.findIndex(n => n.name.toLowerCase() === this.currentTag.toLowerCase());
        if(index === -1){
          const id = Date.now()
          this.objectTags.push({name: this.currentTag, id: id});
        }
        this.currentTag = ''
      }
    },
    clearTag(id){
      const index = this.objectTags.findIndex(n => n.id === id);
      if (index !== -1) {
        this.objectTags.splice(index, 1);
      }
    },
    scrollUp(){
      document.getElementById('failedSubmitForm').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    },
    async submitAddGame(){

      // this.openError = true;

      if(this.fileGame === "" && this.linkGame === "" ){
        this.flagStatus.status = false;
        this.flagStatus.message = "Добавьте ссылку на обзор или разбор в формате .sgf файла";
        this.scrollUp()
      }
      else if(this.winnerGame === 0){
        this.flagStatus.status = false;
        this.flagStatus.message = "Выберите победителя";
        this.scrollUp()
      }
      else {
        this.isLoadingModal = true;
        this.flagStatus.status = true;
        this.flagStatus.message = "Необходимо добавить ссылку на обзор или разбор в формате .sgf файла"

        const config = { headers: {
            'Content-Type': 'multipart/form-data',
          }}
        const data = new FormData();
        const rating1Player = this.sliderRating1 === 0 ? "": this.switchKorD1 === false ? `${this.sliderRating1} кю` : `${this.sliderRating1} дан`
        const rating2Player = this.sliderRating2 === 0 ? "": this.switchKorD2 === false ? `${this.sliderRating2} кю` : `${this.sliderRating2} дан`
        const winnerGamePlayer = this.winnerGame === 1 ? "чёрный" : "белый"
        let tag = []
        this.objectTags.forEach((el)=> tag.push(el.name))
        tag = tag.join(" ")

        data.append('name', this.titleGame )
        data.append('player1_name', this.player1Name )
        data.append('player1_rating',  rating1Player)
        data.append('player2_name', this.player2Name )
        data.append('player2_rating', rating2Player )
        data.append('game_link',  this.linkGame)
        data.append('winner',  winnerGamePlayer)
        data.append('description',  this.descriptionGame)
        data.append('sgf',  this.fileGame)
        data.append('tags',  tag)

        const limitSizeFile = 250000

        if(data.get('sgf').size > limitSizeFile){
          setTimeout(()=> {
                this.openError = true;
              }
              , 2000)
        }
        else{
          await axios.post(`api/game/create`, data, config)
              .then(response => {
                setTimeout(()=> {
                      this.isLoadingModal = false;
                      this.openSuccess = true;
                    }
                    , 2000)
                console.log(response);
                this.idGame = response.data._id
                return response.data
              })
              .catch(error =>{
                    setTimeout(()=> {
                          this.isLoadingModal = false;
                          this.openError = true;
                          // this.isLoading = "error";
                        }
                        , 2000)

                    console.log(error)
                    return error
                  }


              )
        }


      }

    },
    closeAndClearAll(){
      this.open = false
      this.hideModal()
      this.openSuccess = false
      this.clearAll()
    },
    clearAll(){
      this.onClearAttachment()
      this.titleGame = ""
      this.player1Name = ""
      this.sliderRating1 = 0
      this.sliderRating2 = 0
      this.player2Name = ""
      this.linkGame = ""
      this.winnerGame = 0
      this.descriptionGame = ""
      this.objectTags = []

    },
    async closeSuccessModal(){
      this.clearAll()
      this.scrollUp()
      await this.GET_GAMES_FROM_API({});
    }


  },
  mounted() {


  }
}
</script>

<style >
.addGame .ant-modal-content, .loadingModal .ant-modal-content{
  background-color: rgb(60, 62, 68);
}
.addGame .ant-modal-header, .loadingModal .ant-modal-header{
  background-color: rgb(60, 62, 68);
}
.loadingModal .ant-modal-content{
  border-radius: 50%;
  padding: 24px;
}

.addGame .ant-modal-close-x{
  color: white;
}
.addGame .ant-modal-close-x:hover{
  color: grey;
}
.radioStyle{
  display: flex;
  height: 30px;
  line-height: 30px;

}
.wrapper-switch-modal{
  display: flex;
  gap: 10px;

}

</style>