<template>
  <div class="container">
    <form class="form-signin" @submit.prevent="signup">
      <img class="mb-1" src="@/assets/logo.png" alt width="72" height="72" />
      <h1 class="h2 mb-4 font-weight-normal" style="color:#24e0ae ">Trivia</h1>
      <input
        type="name"
        v-model="username"
        id="inputName"
        class="form-control"
        placeholder="Username"
        required
        autofocus
      />
      <label for="inputEmail" class="sr-only">Email address</label>
      <input
        type="email"
        v-model="email"
        id="inputEmail"
        class="form-control"
        placeholder="Email address"
        required
      />
      <label for="inputPassword" class="sr-only">Password</label>
      <input
        type="password"
        v-model="password"
        id="inputPassword"
        class="form-control mb-3"
        placeholder="Password"
        required
      />

      <button class="btn btn-lg btn-primary btn-block" type="submit">
        Sign Up
      </button>
      <div
        v-if="loading"
        class="mt-2 spinner-border text-secondary"
        role="status"
      >
        <span class="sr-only">Loading...</span>
      </div>
      <router-link to="/" class="btn">Sign In</router-link>
      <p v-if="error" class="mt-3 mb-3 text-danger">{{ error }}</p>
    </form>
  </div>
</template>

<script>
  import { signUp } from '@/apis/auth/auth'
  export default {
    name: 'sigin',
    data() {
      return {
        username: '',
        email: '',
        password: '',
        error: '',
        loading: false,
      }
    },
    updated() {
      //this.checkSignedIn()
    },
    methods: {
      signup() {
        this.loading = true
        signUp(this.username, this.email, this.password)
          .then((response) => this.signupSuccessful(response))
          .catch((error) => console.log(error))
      },
      signupSuccessful(response) {
        this.loading = false
        if (response.data.error) {
          this.signupFailure(response.data.error)
          return
        }
        console.log(response)

        localStorage.token = response.data.auth_token
        localStorage.signedIn = true
        this.error = ''
        // this.$router.replace('/home')
      },
      signupFailure(error) {
        this.error = error.user_found
      },
    },
  }
</script>

<style>
  .container {
    height: 100%;
    *display: -ms-flexbox;
    display: -webkit-box;
    display: flex;
    -ms-flex-align: center;
    -ms-flex-pack: center;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    padding-top: 40px;
    padding-bottom: 40px;
    text-align: center;
  }
  .form-signin {
    width: 100%;
    max-width: 330px;
    padding: 15px;
    margin: 0 auto;
  }
  .form-signin .checkbox {
    font-weight: 400;
  }
  .form-signin .form-control {
    position: relative;
    box-sizing: border-box;
    height: auto;
    padding: 10px;
    font-size: 16px;
  }
  .form-signin .form-control:focus {
    z-index: 2;
  }
  .form-signin input[type='name'] {
    margin-bottom: -1px;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
  }
  .form-signin input[type='email'] {
    margin-bottom: -1px;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
    border-top-right-radius: 0;
    border-top-left-radius: 0;
  }
  .form-signin input[type='password'] {
    margin-bottom: 10px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }

  .btn-primary {
    color: #fff;
    background-color: #24e0ae;
    border-color: #24e0ae;
  }

  .btn-primary:hover {
    color: #fff;
    background-color: #1ebd93;
    border-color: #1ebd93;
  }

  .form-control:focus {
    color: #24e0ae;
    background-color: #fff;
    border-color: #24e0ae !important;
    outline: 0;
    box-shadow: 0 0 0 0.2rem rgba(41, 255, 198, 0.25);
  }

  .btn-primary:focus {
    color: #fff;
    background-color: #1ebd93;
    border: none;
    box-shadow: none;
  }

  .btn-primary:not(:disabled):not(.disabled):active {
    color: #fff;
    background-color: #1ebd93;
    border-color: none;
    border: none;
    box-shadow: none;
  }
</style>
