<template>
  <div id="app">
    <sign-in />
  </div>
</template>

<script>
import SignIn from "./components/auth/SignIn.vue";

export default {
  name: "App",
  components: {
    SignIn
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #f5f5f5;

  /*text-align: center;*/
  /*margin-top: 60px;*/
  height: 100vh;
  width: 100vw;
}
</style>
