<template>
  <main class="login-form">
    <div class="cotainer">
      <div class="row justify-content-center">
        <div class="col-md-8">
          <div class="card">
            <div class="card-header">Register</div>
            <div class="card-body">
              <error v-if="error" :error="error"/>
              <form @submit.prevent="handleSubmit">
                <div class="form-group row">
                  <label for="name" class="col-md-4 col-form-label text-md-right">Name</label>
                  <div class="col-md-6">
                    <input type="text" id="name" class="form-control" v-model="name">
                  </div>
                </div>

                <div class="form-group row">
                  <label for="email_address" class="col-md-4 col-form-label text-md-right">E-Mail</label>
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

                <div class="form-group row">
                  <label for="password_confirmation" class="col-md-4 col-form-label text-md-right">Confirm
                    Password</label>
                  <div class="col-md-6">
                    <input type="password" id="password_confirmation" class="form-control" v-model="password_confirmation">
                  </div>
                </div>

                <div class="col-md-6 offset-md-4">
                  <button type="submit" class="btn btn-primary">
                    Register
                  </button>
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
  name: 'Register',
  component: {
    Error
  },

  data() {
    return {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
      error: ''
    }
  },
  methods: {
    async handleSubmit() {
      try {
        const response = await axios.post('register', {
          name: this.name,
          email: this.email,
          password: this.password,
          password_confirmation: this.password_confirmation,
        })
        console.log(response);
        this.$router.push('/login');
      } catch (e) {
        this.error = 'Error occured';
      }
    }
  }
}
</script>