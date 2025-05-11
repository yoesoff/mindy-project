<template>
  <div id="app">
    <ChatGPTModule />
  </div>
</template>

<script>
import ChatGPTModule from "./components/chatgpt/ChatGPTModule.vue";

export default {
  name: "App",
  components: {
    ChatGPTModule,
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
