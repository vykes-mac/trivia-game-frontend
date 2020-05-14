<template>
  <div class="container myrow h-100 justify-content-center align-items-center">
    <div class="col-md-8 my-auto">
      <h1 class="h2 mb-2 font-weight-normal" style="color:#24e0ae ">
        Create new Trivia
      </h1>
      <div class="card">
        <div class="card-header">
          <input
            type="name"
            class="form-control no-border"
            id="inputName"
            placeholder="Type a question"
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
              checked
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

          <button class="float-right btn btn-primary mr-4">
            Submit
          </button>
          <br />
          <br />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'create-question',

    data() {
      return {
        optionsInput: '',
        options: [],
        answer: '',
        activeTags: [],
        allTags: [],
      }
    },
    watch: {
      optionsInput: function() {
        const val = this.optionsInput.split(/\r?\n/)
        const rmBlanks = val.filter((e) => e != '')
        console.log(rmBlanks)
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
        tag.id = this.activeTags.length + 1
        this.activeTags.push(tag)
        this.allTags.push(tag)
      },
      onTagRemoved(tag) {
        this.activeTags = this.activeTags.filter((t) => t.id != tag.id)
      },
      onTagAdded(val) {
        this.activeTags.push(val)
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
</style>
