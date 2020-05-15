<template>
  <div class="container myrow h-50 justify-content-center align-items-center">
    <div class="col-md-8 my-auto">
      <h1 class="h2 mb-2 font-weight-normal" style="color:#24e0ae ">
        Create new Trivia
      </h1>
      <div class="card">
        <form class="needs-validation" novalidate @submit.prevent="addTrivia">
          <div class="card-header">
            <input
              type="name"
              v-model="question"
              @keydown.enter.prevent=""
              class="form-control"
              id="inputName"
              placeholder="Type a question"
              required
            />
          </div>
          <div class="card-block">
            <div class="mt-2 ml-3">Options</div>
            <div class="form-horizontal">
              <div class="form-group">
                <div class="col-md-6">
                  <textarea
                    v-model="optionsInput"
                    class="form-control"
                    rows="3"
                    placeholder="Enter options - press enter to separate"
                    required
                  ></textarea>
                </div>
              </div>
            </div>
            <div class="btn-group btn-group-toggle ml-3" data-toggle="buttons">
              <label
                class="btn btn-outline-secondary btn-toggle"
                v-for="value in options"
                v-bind:key="value"
                @click="answer = value"
              >
                <input
                  type="radio"
                  :id="value"
                  autocomplete="off"
                  name="options"
                />
                {{ value }}
              </label>
            </div>
            <span v-if="options.length > 1" class="mx-2"
              >select which is the correct answer</span
            >
            <div class="mt-2 ml-3">Tags</div>
            <vue-tags
              class="ml-3 mt-2"
              :active="activeTags"
              :all="allTags"
              :element-count-for-start-arrow-scrolling="3"
              :tab-index="1"
              :colorsEnabled="true"
              :placeholder="'add tags to this question'"
              :tagCreationEnabled="true"
              @on-tag-created="onTagCreated"
              @on-tag-removed="onTagRemoved"
              @on-tag-added="onTagAdded"
            />
            <div v-if="error" class="invalid-feedback ml-3">
              please add at least one tag.
            </div>

            <button class="float-right btn btn-primary mr-4">
              Submit
            </button>
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
        </form>
      </div>
      <h1
        v-if="saved"
        class="h5 mb-4 mt-2 font-weight-normal"
        style="color:#24e0ae "
      >
        Thank you!! your trivia was created, you can create more or start a
        trivia
      </h1>
    </div>
  </div>
</template>

<script>
  import { addQuestion, getCategories } from '@/apis/questions/questions'
  export default {
    name: 'create-question',

    data() {
      return {
        question: '',
        optionsInput: '',
        options: [],
        answer: '',
        activeTags: [],
        allTags: [],
        error: false,
        loading: false,
        saved: false,
      }
    },
    mounted: function() {
      const ele = document.getElementsByClassName('tags__search')
      ele[0].addEventListener('keydown', function(e) {
        if (e.keyCode == 13) {
          e.preventDefault()
          return
        }
      })
      getCategories()
        .then((response) => {
          if (response.data.categories) {
            response.data.categories.forEach((v, index) => {
              const tag = {
                id: index + 1,
                name: v,
                slug: v,
                color: this.getRandomColor(),
              }
              this.allTags.push(tag)
            })
          }
        })
        .catch((error) => console.log(error))
    },
    watch: {
      optionsInput: function() {
        const val = this.optionsInput.split(/\r?\n/)
        const rmBlanks = val.filter((e) => e != '')
        if (val[0].trim() == '' || val.length < 2) {
          this.options = []
          return
        }
        val.pop()
        this.options = val
      },
    },
    methods: {
      addOption(event) {
        val.pop()
        this.options = val
      },
      onTagCreated(tag) {
        tag.id = this.allTags.length + 1
        this.activeTags.push(tag)
        this.allTags.push(tag)
        this.error = false
      },
      onTagRemoved(tag) {
        this.activeTags = this.activeTags.filter((t) => t.id != tag.id)
      },
      onTagAdded(val) {
        this.activeTags.push(val)
        this.error = false
      },
      addTrivia() {
        if (this.invalidForm()) {
          return
        }
        const categories = this.activeTags.map((tag) => tag.name)
        addQuestion(this.question, this.answer, this.options, categories)
          .then((response) => this.successful(response))
          .catch((error) => this.failure(error))
      },
      successful(response) {
        this.loading = false
        if (response.data.error) {
          this.failure(response.data.error)
          return
        }
        this.saved = true
      },
      failure(error) {
        console.log(error)
        // this.error = error.user_found
      },
      invalidForm() {
        if (this.options.length == 0) {
          this.optionsInput.trim()
        }
        if (this.activeTags.length == 0) {
          this.error = true
        }

        var forms = document.getElementsByClassName('needs-validation')
        if (forms[0].checkValidity() === false) {
          forms[0].classList.add('was-validated')
        }
        return this.error || forms[0].checkValidity() === false
      },
      getRandomColor() {
        var letters = '0123456789ABCDEF'
        var color = '#'
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)]
        }
        return color
      },
    },
  }
</script>

<style>
  .no-border {
    border: 0;
    box-shadow: none;
  }
  .myrow {
    display: flex;
    flex-wrap: wrap;
  }

  .tags__search {
    display: block;
    width: 100%;
    height: calc(1.5em + 0.75rem + 2px);
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: none;
    border-radius: 0.25rem;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  }
  .tags__search:focus {
    color: #24e0ae;
    background-color: #fff;
    border-color: #24e0ae !important;
    outline: 0;
    box-shadow: 0 0 0 0.2rem rgba(41, 255, 198, 0.25);
  }
  .tags__list {
    width: 100% !important;
  }
  .invalid-feedback {
    /* display: none; */
    display: block;
    width: 100%;
    margin-top: 0.25rem;
    font-size: 80%;
    color: #dc3545;
  }
</style>
