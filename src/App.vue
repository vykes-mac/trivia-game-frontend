<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <router-link
        to="/home"
        class="navbar-brand font-weight-normal"
        style="color:#24e0ae"
      >
        <img src="@/assets/logo.png" width="30" height="30" alt="" />
        Trivia
      </router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNav">
        <div class="nav navbar-nav ml-auto">
          <router-link to="/create-trivia" class="nav-item nav-link"
            >Create Trivia</router-link
          >
          <router-link to="/start-trivia" class="nav-item nav-link"
            >Start Trivia</router-link
          >
          <router-link to="/" @click.native="signOut" class="nav-item nav-link"
            >Sign out</router-link
          >
        </div>
      </div>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'App',
    methods: {
      signOut() {
        localStorage.clear()
      },
    },
  }
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    /*background-color: #f5f5f5;*/

    /*text-align: center;*/
    /*margin-top: 60px;*/
    height: 100%;
    width: 100%;
  }
</style>
