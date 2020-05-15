<template>
  <div class="container myrow h-50 justify-content-center align-items-center">
    <div class="col-md-4 ">
      <h1 class="mb-5" style="color:#24e0ae ">Welcome to Trivia</h1>
      <router-link
        to="/create-trivia"
        type="button"
        class="btn btn-outline-info btn-lg btn-block"
      >
        <i class="fa fa-plus-circle pr-2" aria-hidden="true"></i>Create Trivia
      </router-link>

      <router-link
        to="/start-trivia"
        type="button"
        class="btn btn-outline-success btn-lg btn-block"
      >
        <i class="fa fa-play-circle pr-2" aria-hidden="true"></i>Start Trivia
      </router-link>
      <router-link
        to="highscores"
        type="button"
        class="btn btn-outline-warning btn-lg btn-block"
      >
        <i class="fa fa-play-circle pr-2" aria-hidden="true"></i>View Highscores
      </router-link>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'home',
  }
</script>

<style>
  .btn-label {
    position: relative;
    left: -12px;
    display: inline-block;
    padding: 6px 12px;
    background: rgba(0, 0, 0, 0.15);
    border-radius: 3px 0 0 3px;
  }
  .btn-labeled {
    padding-top: 0;
    padding-bottom: 0;
  }
  .btn {
    margin-bottom: 10px;
  }
</style>
