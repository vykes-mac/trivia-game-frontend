<template>
  <div class="container">
    <form class="form-signin">
      <img class="mb-1" src="@/assets/logo.png" alt width="72" height="72" />
      <h1 class="h2 mb-4 font-weight-normal" style="color:#24e0ae ">Trivia</h1>
      <label for="inputEmail" class="sr-only">Email address</label>
      <input
        type="email"
        id="inputEmail"
        class="form-control"
        placeholder="Email address"
        required
        autofocus
      />
      <label for="inputPassword" class="sr-only">Password</label>
      <input
        type="password"
        id="inputPassword"
        class="form-control mb-3"
        placeholder="Password"
        required
      />

      <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
      <p class="mt-5 mb-3 text-muted">&copy; 2017-2018</p>
    </form>
  </div>
</template>

<script>
export default {
  name: "sigin"
};
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
.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
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
</style>