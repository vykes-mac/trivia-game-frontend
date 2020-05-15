<template>
  <div class="container myrow h-100 justify-content-center align-items-center">
    <div class="col-md-8 my-auto">
      <div class="dropdown mb-4">
        <button
          class="btn btn-secondary dropdown-toggle"
          type="button"
          id="dropdownMenuButton"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          Select category to play
        </button>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <a
            v-for="category in categories"
            :key="category"
            class="dropdown-item"
            @click="getQuestions([category])"
            >{{ category }}</a
          >
        </div>
      </div>
      <h1 class="h2 mb-2 font-weight-normal">
        {{ selectedCategory }}
      </h1>

      <h1 class="h2 mb-2 font-weight-normal" style="color:#24e0ae ">
        {{ 'Points: ' + score }}
      </h1>

      <div class="progress mb-2" style="height: 12px">
        <div
          id="progressBar"
          class="progress-bar 
        progress-bar-success  active"
          role="progressbar"
          aria-valuemin="0"
          aria-valuemax="100"
          :style="{ width: progress + '%' }"
        >
          {{ progress + '%' }}
        </div>
      </div>
      <div class="card">
        <div class="card-header">
          {{ question }}
        </div>
        <div class="card-block">
          <div class="mt-2 ml-3 mb-2">Options</div>

          <div class="btn-group btn-group-toggle ml-3 " data-toggle="buttons">
            <label
              class="btn btn-outline-secondary btn-toggle"
              v-for="value in choices"
              v-bind:key="value"
              :id="value"
              @click="answer = value"
            >
              <input type="radio" autocomplete="off" name="options" />
              {{ value }}
            </label>
            <div v-if="error" class="invalid-feedback ml-3">
              please choose an answer.
            </div>
          </div>
          <button class="float-right btn btn-info mr-3" @click="endGame">
            End
          </button>

          <button
            class="float-right btn btn-warning mr-3"
            @click="answerQuestion"
            :disabled="correctAnswer != ''"
          >
            Submit
          </button>
          <!-- <button
            class="float-right btn btn-light mr-2"
            @click="nextQuestion"
            :disabled="correctAnswer == ''"
          >
            Next
          </button> !-->
          <div
            v-if="loading"
            class="mt-2 spinner-border text-secondary float-right mr-2"
            role="status"
          >
            <span class="sr-only">Loading...</span>
          </div>
          <br />
          <br />
        </div>
      </div>
      <div
        v-bind:class="{
          'alert alert-success': isCorrect && message != '',
          'alert alert-danger': !isCorrect && message != '',
        }"
        class="mt-3"
      >
        <h5>{{ message }}</h5>
      </div>
      <div class="alert alert-info" role="alert" v-if="end">
        Thank you for playing! You have answered all questions.
        <a href="#" class="alert-link">create trivia??</a>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    getQuestions,
    answerQuestion,
    getCategories,
  } from '@/apis/questions/questions'
  import { addScore } from '@/apis/scores/scores'
  export default {
    name: 'start-trivia',
    data() {
      return {
        index: 0,
        question: '',
        categories: [],
        choices: [],
        selectedCategory: '',
        trivia: [],
        answer: '',
        score: 0,
        progress: 0,
        loading: false,
        error: false,
        correctAnswer: '',
        isCorrect: false,
        message: '',
        end: false,
        correctStreak: 0,
        incorrectStreak: 0,
        ocStreak: 0,
        oiStreak: 0,
      }
    },
    mounted: function() {
      getCategories()
        .then((response) => {
          if (response.data.categories) {
            this.categories = ['All', ...response.data.categories]
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    methods: {
      getQuestions(cat) {
        var reset = false
        if (this.index > 0 && !this.end) {
          reset = confirm(
            'Choosing a new category will reset your points. Are you sure?'
          )

          if (!reset) {
            return
          }
        }

        this.selectedCategory = cat[0]
        if (cat[0] == 'All') {
          cat = []
        }
        this.score = 0
        this.reset()
        this.error = false
        this.progress = 0
        this.end = false
        this.index = 0
        getQuestions(cat)
          .then((response) => this.successful(response))
          .catch((error) => this.failure(error))
      },
      successful(response) {
        //this.loading = false
        if (response.data.error) {
          this.failure(response.data.error)

          return
        }
        this.trivia = response.data.questions
        this.question = this.trivia[this.index].question
        this.choices = this.trivia[this.index].choices
        this.setProgress()
      },
      setProgress() {
        this.progress = Math.ceil(((this.index + 1) / this.trivia.length) * 100)
      },
      failure(error) {
        console.log(error)
      },
      answerQuestion() {
        if (this.answer == '') {
          this.error = true
          return
        }
        answerQuestion(this.trivia[this.index]._id.$oid, this.answer)
          .then((response) => this.processAnswer(response))
          .catch((error) => this.failure(error))
      },
      processAnswer(response) {
        this.isCorrect = response.data.answer.is_correct
        this.correctAnswer = response.data.answer.correct_answer

        this.score += response.data.answer.change_score_by
        if (this.score < 0) {
          this.score = 0
        }

        if (this.isCorrect) {
          this.setCorrectStreak()
          this.message = 'You are correct!! 😀'
        } else {
          this.setIncorrectStreak()
          this.message = 'Sorry! better luck next time 😞'
          this.showCorrectAnswer()
        }

        if (this.index >= this.trivia.length - 1) {
          this.end = true
          this.addScore()
        }
        setTimeout(() => this.nextQuestion(), 2000)
        clearTimeout()
      },
      showCorrectAnswer() {
        const ele = document.getElementById(this.correctAnswer)

        ele.classList.add('btn-success')
        ele.classList.remove('btn-outline-secondary')
        ele.focus()
      },
      nextQuestion() {
        this.index++
        if (this.index > this.trivia.length - 1) {
          return
        }
        this.setProgress()

        this.reset()
        this.question = this.trivia[this.index].question
        this.choices = this.trivia[this.index].choices

        const ele = document.getElementsByClassName('btn-toggle')
        for (var i = 0; i < ele.length; i++) {
          ele[i].classList.remove('active')
          ele[i].blur()
        }
      },
      reset() {
        this.correctAnswer = ''
        this.message = ''
        this.answer = ''
      },
      setCorrectStreak() {
        this.incorrectStreak = 0
        this.correctStreak++
        if (this.correctStreak >= this.ocStreak) {
          this.ocStreak = this.correctStreak
        }
      },
      setIncorrectStreak() {
        this.correctStreak = 0
        this.incorrectStreak++
        if (this.incorrectStreak >= this.oiStreak) {
          this.oiStreak = this.incorrectStreak
        }
      },
      addScore() {
        addScore(
          this.score,
          this.ocStreak,
          this.oiStreak,
          this.selectedCategory
        )
          .then((response) => console.log(response.data))
          .catch((error) => console.log(error))
      },
      endGame() {
        if (this.score > 0) {
          if (confirm('Your current points will be persisted')) {
            this.addScore()
            this.$router.push({ path: '/home' })
          } else {
            return
          }
        } else {
          this.$router.push({ path: '/home' })
        }
      },
    },
  }
</script>

<style>
  .btn-primary:disabled {
    color: #fff;
    background-color: #aaa;
    border-color: #ddd;
  }
</style>
