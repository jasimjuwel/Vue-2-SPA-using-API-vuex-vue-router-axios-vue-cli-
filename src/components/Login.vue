<template>
  <main class="login-form">
    <div class="cotainer">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="card">
            <div class="card-header">Login</div>
            <div class="card-body">
              <Error v-if="error" :error="error" />
              <form @submit.prevent="handleSubmit">
                <div class="form-group row">
                  <label for="email_address" class="col-md-4 col-form-label text-md-right">E-Mail Address</label>
                  <div class="col-md-6">
                    <input type="text" id="email_address" class="form-control" v-model="email">
                  </div>
                </div>

                <div class="form-group row">
                  <label for="password" class="col-md-4 col-form-label text-md-right">Password</label>
                  <div class="col-md-6">
                    <input type="password" id="password" class="form-control" v-model="password">
                  </div>
                </div>

                <div class="col-md-6 offset-md-4">
                  <button type="submit" class="btn btn-primary">
                    Login
                  </button>
<!--                  <a href="#" class="btn btn-link"> Forgot Your Password? </a>-->
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>

  </main>
</template>

<script>
import axios from 'axios'
import Error from "./Error"

export default {
  name: 'Login',
  component: {
    Error
  },

  data() {
    return {
      email: '',
      password: '',
      error: '',
    }
  },
  methods: {
    async handleSubmit() {

      try {
        const response = await axios.post('login', {
          email: this.email,
          password: this.password,
        })

        localStorage.setItem('token', response.data.data.token);
        this.$store.dispatch('user', response.data.data.user)
        this.$router.push('/');
        console.log(response);
      }catch (e){
        this.error = 'Invalid username/password !';
      }
    }
  }
}

</script>