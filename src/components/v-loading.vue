<template>
  <ASpin>
    <template #indicator>
      <LoadingOutlined  style="font-size: 48px"/>
    </template>
  </ASpin>
</template>

<script>
import {
  LoadingOutlined

} from '@ant-design/icons-vue';
import {Spin} from "ant-design-vue";


export default {
  name: "v-loading",
  components: {
    LoadingOutlined,
    ASpin: Spin,
  },
}
</script>

<style scoped>

</style>