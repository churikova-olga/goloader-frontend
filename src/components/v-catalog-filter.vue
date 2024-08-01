<template>
  <AButton :ghost="true" @click="showDrawer">Фильтры <LeftOutlined /></AButton>
  <ADrawer
      v-model:open="open"
      class="custom-class"
      root-class-name="root-class-name"
      :root-style="{ color: 'blue' }"
      :closable="false"
      :style="{ color: 'white', backgroundColor: '#212121' }"
      title="Фильтры"
      headerStyle="background-color: rgb(133 133 133)"
      placement="right"

  >
    <!--      @after-open-change="afterOpenChange"-->

    <template #extra>
        <button class="but-clear" @click="clearAllForms">
          <CloseOutlined style="font-size: 16px; font-weight: bold"/> <span>Очистить</span>
        </button>

    </template>

<!--    form
player_name - фильтровать по имени игрока любого
player_rating - фильтровать по рейтингу игрока любого
name - фильтровать по названию партии
tag - фильтровать по тегу/тегам

-->
    <AForm layout="vertical">

      <AFormItem>

        <template #label>
          <span style="color: white">Поиск по названию партии</span>
        </template>

        <AInput :maxLength="50" :allowClear="true" v-model:value="nameGame">
          <template #clearIcon><CloseOutlined style="font-size: 16px; font-weight: bold"/></template>
        </AInput>
      </AFormItem>

        <AFormItem>

          <template #label>
            <span style="color: white">Поиск по имени игрока</span>
          </template>

          <AInput v-model:value="namePlayer" :maxLength="50" :allowClear="true">
          <template #clearIcon><CloseOutlined style="font-size: 16px; font-weight: bold"/></template>
          </AInput>
        </AFormItem>


        <AFormItem >
          <template #label>
            <span style="color: white">Ищите кю или дана?</span>
          </template>
          <div class="wrapper-switch">
            <span @click="switchKorD=false; changeSwitch()" style="cursor: pointer">Кю</span>
            <a-switch v-model:checked="switchKorD" @change="changeSwitch" />
            <span @click="switchKorD=true; changeSwitch()" style="cursor: pointer">Дан</span>
          </div>
        </AFormItem>
        <AFormItem >
          <template #label>
            <span style="color: white">Поиск по рейтингу игрока</span>
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

            <ARow  v-if="!switchKorD" >
              <ACol flex="1 1">
                <ASlider v-model:value="sliderK"

                               :min="0" :max="30" :marks="{0:{
                  style: { color: 'white', marginTop: '5px'},
                  label: 'любой'},30:{
                  style: { color: 'white', marginTop: '5px'},
                  label: '30K'}
                }"/>
              </ACol>
              <ACol flex="0 0">
                <AInputNumber v-model:value="sliderK" :min="0" :max="30" style="margin-left: 16px" />
              </ACol>
            </ARow>


            <ARow v-else  >
              <ACol flex="1 1">
                <ASlider v-model:value="sliderD" :min="0" :max="9" :marks="{0:{
                  style: { color: 'white', marginTop: '5px'},
                  label: 'любой'}, 9:{
                  style: { color: 'white', marginTop: '5px'},
                  label: '9D'}
                } "/>
              </ACol>
              <a-col flex="0 0">
                <AInputNumber v-model:value="sliderD" :min="0" :max="9" style="margin-left: 16px" />
              </a-col>
            </ARow>
          </AConfigProvider>
        </AFormItem>
            <AFormItem >


              <template #label>
                <span style="color: white">Поиск по тегу</span>
                <APopover trigger="click">
                  <button class="popover-tip-btn"><QuestionCircleOutlined style="color: white"/></button>
                  <template #content>
                    <div style="width: 200px">
                    <p>Чтобы применить теги необходимо их добавить.</p>
                      <p>Поиск осуществляется по совпадению хотя бы одного тега</p>
                    </div>
                  </template>
                </APopover>
              </template>


              <AInputSearch v-on:keyup.enter="submitTag" v-model:value="searchTag" :allowClear="true">
                <template #clearIcon><CloseOutlined style="font-size: 16px; font-weight: bold"/></template>
                <template #enterButton>
                  <AButton style="color: black" @click="submitTag">Добавить</AButton>
                </template>

              </AInputSearch>

              <div class="wrapper-tag" v-if="objectTags.length">
                <ATag closable  color="purple" @close="clearTag(tag.id)" v-for="tag in objectTags" :key="tag.id">{{tag.name}}</ATag>
              </div>
            </AFormItem>




      <AFormItem style="text-align: center">
          <AButton @click="onClick">Применить</AButton>
      </AFormItem>

    </AForm>


  </ADrawer>
</template>

<script >
import { ref } from 'vue';
import {
  Drawer,
  Button,
  InputSearch,
  Input,
  Form,
  FormItem,
  Slider,
  Switch,
  ConfigProvider,
  Row,
  Col,
  InputNumber,
  Tag, Popover
} from 'ant-design-vue'

import {
CloseOutlined,
  LeftOutlined,
QuestionCircleOutlined
} from '@ant-design/icons-vue';


export default {
  name: "v-catalog-filter",
  props: ['fillData'],
  components:{
    ADrawer: Drawer,
    AButton: Button,
    CloseOutlined,
    LeftOutlined,
    AInputSearch: InputSearch,
    AForm: Form,
    AInput: Input,
    AFormItem: FormItem,
    ASlider: Slider,
    ASwitch: Switch,
    AConfigProvider: ConfigProvider,
    ARow: Row,
    ACol: Col,
    AInputNumber: InputNumber,
    ATag: Tag,
   QuestionCircleOutlined,
    APopover: Popover
  },
  data(){
    return{
      open: ref(false),
      switchKorD: false, // false ky/true dan
      sliderK: 0,
      sliderD: 0,
      searchTag: '',
      objectTags: [],
      namePlayer: '',
      nameGame: ''



    }
  },
  methods:{

    showDrawer(){
      this.open = true;
    },
    changeSwitch(){
      this.sliderK = 0;
      this.sliderD = 0;
    },
    submitTag(){
      if(this.searchTag.length){
        const index = this.objectTags.findIndex(n => n.name.toLowerCase() === this.searchTag.toLowerCase());
        if(index === -1){
          const id = Date.now()
          this.objectTags.push({name: this.searchTag, id: id});
        }
        this.searchTag = ''
      }
    },
    clearTag(id){
      const index = this.objectTags.findIndex(n => n.id === id);
      if (index !== -1) {
        this.objectTags.splice(index, 1);
      }
    },
    clearAllForms(){
      this.switchKorD = false;
      this.sliderK = 0;
      this.sliderD = 0;
      this.searchTag = '';
      this.objectTags = [];
      this.namePlayer = '';
      this.nameGame = '';
    },

    onClick(){
      const array = []
      this.objectTags.forEach((el)=> array.push(el.name))
      const data = {
        nameGame: this.nameGame,
        namePlayer: this.namePlayer,
        playerRating: this.switchKorD === false ? this.sliderK !== 0 ? `${this.sliderK} кю` : '' : this.sliderD !== 0 ? `${this.sliderD} дан` : '',
        tag: array.join()
      }

      this.fillData(data)
      this.open=false;
    }

  }
}
</script>

<style >



.but-clear{
  display: flex;
  gap: 5px;
  font-size: 14px;
  border: none;
  background-color: transparent;
  cursor: pointer;
  padding: 5px;
  border-radius: 5px;
}
.but-clear:hover{
  background-color: #7a7878;
}
.wrapper-switch{
  display: flex;
  gap: 10px;
  color: white;
}

.wrapper-tag{
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  align-items: center;
  gap: 5px 0;
}
.popover-tip-btn{
  background-color: transparent;
  border: none;
  color: white;
  font-size: 14px;
  cursor: pointer;
}
@media screen and (max-width: 40.625em) {
  .ant-drawer-content-wrapper{
    width: 345px;
  }
}
/*width: 345px;*/
</style>

