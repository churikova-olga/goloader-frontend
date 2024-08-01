<template>
  <div class="main" >По дате
    <AButton @click="onClick" class="sorted" type="text" style="color: white; padding: 0 2px; font-size: 16px">
      <SortAscendingOutlined style="margin: 0"/><SortDescendingOutlined style="margin: 0" />
    </AButton>

    </div>
</template>

<script>
import {Button} from 'ant-design-vue'
import {
  SortAscendingOutlined,
SortDescendingOutlined
} from '@ant-design/icons-vue';
export default {
  props:['fillData'],
  name: "v-catalog-sorted",
  data(){
    return{
      checkSorted: 'desc'
    }
  },
  components: {
    SortAscendingOutlined,
    SortDescendingOutlined,
    AButton: Button
  },
  methods: {
    onClick(){
      if(this.checkSorted === 'desc') this.checkSorted = 'asc'
      else this.checkSorted = 'desc'


      this.fillData({checkSorted: this.checkSorted});
    }
  }
}
</script>

<style scoped>
.main{
  display: flex;
  color: white;
  width: fit-content;
  gap: 5px;
  align-content: center;
  align-items: center;
}
.sorted:hover{
  background-color: #a5a3a3;
}
</style>