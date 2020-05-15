<template>
  <div
    class="container bg-white myrow h-100 justify-content-center align-items-center"
  >
    <div class="col-md-8 my-auto">
      <div class="mb-4">
        <span class="h2 mb-2 font-weight-normal" style="color:#24e0ae ">
          My Score: {{ points }} points
        </span>

        <span
          class="h2 mb-2 float-right font-weight-normal"
          style="color:#24e0ae "
        >
          Best Category: {{ bestCategory }}
        </span>
      </div>

      <h1 class="h2 mb-2 font-weight-normal">
        Highscores
      </h1>
      <table id="dtBasicExample" class="table table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">Rank</th>
            <th scope="col">User</th>
            <th scope="col">+ Streak</th>
            <th scope="col">- Streak</th>
            <th scope="col">Best Category</th>
            <th scope="col">Points</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(score, index) in scores" :key="score._id.$oid">
            <th scope="row">{{ index }}</th>
            <td>{{ score.username }}</td>
            <td>{{ score.correct_streak }}</td>
            <td>{{ score.incorrect_streak }}</td>
            <td>{{ score.best_category }}</td>
            <td>{{ score.score }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  import { getScores, getUserScore } from '@/apis/scores/scores'
  export default {
    name: 'highscore',
    data() {
      return { scores: [], points: 0, bestCategory: '' }
    },
    mounted: function() {
      this.getHighscores()
      this.getUserScore()
    },
    methods: {
      getHighscores() {
        getScores()
          .then((response) => {
            this.scores = response.data.highscores
          })
          .catch((error) => console.log(error))
      },
      getUserScore() {
        getUserScore()
          .then((response) => {
            this.points = response.data.highscore[0].score
            this.bestCategory = response.data.highscore[0].best_category
          })
          .catch((error) => console.log(error))
      },
    },
  }
</script>

<style></style>
