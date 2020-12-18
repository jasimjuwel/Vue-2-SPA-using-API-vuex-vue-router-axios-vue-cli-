<template>
  <main class="login-form">
    <div class="cotainer">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="card">
            <div class="card-header">Product Create</div>
            <div class="card-body">
              <error v-if="error" :error="error" />
              <form @submit.prevent="handleSubmit">
                <div class="form-group row">
                  <label for="title" class="col-md-4 col-form-label text-md-right">Title</label>
                  <div class="col-md-6">
                    <input type="text" id="title" class="form-control" v-model="title">
                  </div>
                </div>

                <div class="form-group row">
                  <label for="description" class="col-md-4 col-form-label text-md-right">Description</label>
                  <div class="col-md-6">
                    <input type="text" id="description" class="form-control" v-model="description">
                  </div>
                </div>

                <div class="form-group row">
                  <label for="price" class="col-md-4 col-form-label text-md-right">Price</label>
                  <div class="col-md-6">
                    <input type="text" id="price" class="form-control" v-model="price">
                  </div>
                </div>

                <div class="form-group row">
                  <label for="image" class="col-md-4 col-form-label text-md-right">Image</label>
                  <div class="col-md-6">
                    <input type="file" id="image" class="form-control">
                  </div>
                </div>

                <div class="col-md-6 offset-md-4">
                  <button type="submit" class="btn btn-primary">Save</button>
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

export default {
  name: 'ProductCreate',
  component: {
    Error
  },

  data() {
    return {
      title: '',
      description: '',
      price: '',
      image: '',
      error: '',
    }
  },
  methods: {
    async handleSubmit() {

      try {
        const response = await axios.post('products-save', {
          title: this.title,
          description: this.description,
          price: this.price,
          image: this.image,
        })

        this.$router.push('/');
        console.log(response);
      }catch (e){
        this.error = 'Invalid username/password !';
      }
    }
  }
}

</script>