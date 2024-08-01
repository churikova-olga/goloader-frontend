<template>
  <div id="app">
    <router-view/>
    <button @click="showModal" class="circle-add-game"><PlusOutlined :style="{ fontSize: '32px' }" /></button>
    <vModalAddGame :openModal="openModal" :closeModal="closeModal"/>
  </div>
</template>

<script>

import {
  PlusOutlined
} from '@ant-design/icons-vue';
import axios from "axios";
import vModalAddGame from "@/components/v-modal-add-game";
export default {
  name: 'App',
  data(){
    return{
      openModal: false
    }
  },
  components:{
    vModalAddGame,
    PlusOutlined
  },
  provide() {
    return {
      downloadSGF: this.download,
      showModal: this.showModal,
      closeModal: this.closeModal

    }
  },
  methods:{
    showModal(){
      this.openModal = true;
    },
    closeModal(data){
      this.openModal = data;
    },
    download(sgf){
      const parse = sgf.split("/");


      const type = parse[0];
      const file = parse[1];

      return axios(`${process.env.VUE_APP_SERVER_URL}/game/uploads/${file}?type=${type}`, {
        method: "GET",
        responseType: 'arraybuffer',
      })
          .then((response)=>{
            return response.data
          }).then(data => {
            const url = window.URL.createObjectURL(new Blob([data]));
            const link = document.createElement('a');
            link.href = url;
            link.download = `game${Date.now()}.sgf`;
            document.body.appendChild(link);
            link.style.display = "none";
            link.click();
            link.remove();
          } )
          .catch((error)=>{
            console.log(error)
            return error;
          })

    },


  },

}
</script>

<style>
body{
  background-color: #212121;
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.circle-add-game{
  width: 60px;
  height: 60px;
  background-color: white;
  border-radius: 50%;
  cursor: pointer;
  position: fixed;
  right: 80px;
  bottom: 30px;
  border: none;
}

.circle-add-game:hover {
  background-color: #c1c0c0;
  width: 63px;
  height: 63px;
}

@media screen and (max-width: 40.625em) {
  .circle-add-game{
    width: 50px;
    height: 50px;
    right: 30px;
    bottom: 30px;
  }
  .circle-add-game:hover {
    width: 53px;
    height: 53px;
  }
}

</style>
