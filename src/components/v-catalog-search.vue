<template>
  <Transition name="search">
    <AInputSearch
        v-if="show"
        v-model:value="valueSearch"
        :allowClear="true"
        :size="middle"
        class="search-input"
        @search="onSearch"
        :placeholder="placeholder"
        >
    <template #clearIcon><CloseOutlined style="font-size: 16px; font-weight: bold"/></template>
    </AInputSearch>
  </Transition>
  <ATooltip title="Поиск">
    <AButton @click="show = !show" shape="circle" :icon="nodeSearch" />
  </ATooltip>

</template>

<script>
import { h } from 'vue';
import { SearchOutlined, CloseOutlined } from '@ant-design/icons-vue';
import { Button, InputSearch, Tooltip } from 'ant-design-vue'
import { ref } from "vue";
export default {
  name: "v-catalog-search",
  props:['fillData', 'placeholder'],
  components: {
    AInputSearch: InputSearch,
    AButton: Button,
    ATooltip: Tooltip,
    CloseOutlined
  },
  data(){
    return{
      show: ref(false),
      valueSearch: '',
      nodeSearch: h(SearchOutlined),

    }
  },
  methods:{
    onSearch(){

      this.fillData({search: this.valueSearch});
      this.valueSearch = "";
    }
  }
}
</script>

<style scoped>

.search-input{
  width:50%
}

.search-enter-from,
.search-leave-to {
  transform: translateY(100px);
  opacity: 0;
}

.search-enter-active, .search-leave-active {
  transition: all 1s ease-in-out;
}
/* delay leave of parent element */
.search-leave-active {
  transition-delay: 0.25s;
}


/* delay enter of nested element */
.search-enter-active  {
  transition-delay: 0.25s;
}

.search-enter-from , .search-leave-to  {
  transform: translateX(100px);
  opacity: 0.001;
}
</style>