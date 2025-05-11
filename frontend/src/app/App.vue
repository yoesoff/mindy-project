<template>
  <div id="app">
    <ApaPropertyModule />
  </div>
</template>

<script>
// import ChatGPTModule from "./components/chatgpt/ChatGPTModule.vue";
import ApaPropertyModule from "./components/apaproperty/ApaPropertyModule.vue";

export default {
  name: "App",
  components: {
    ApaPropertyModule,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
