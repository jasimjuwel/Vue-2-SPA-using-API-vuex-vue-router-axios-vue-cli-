<template>
  <main class="login-form">
    <div class="cotainer">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="card">
            <div class="card-header">Product Edit</div>
            <div class="card-body">
              <error v-if="error" :error="error" />
              <form @submit.prevent="handleSubmit(form.id)">
                <div class="form-group row">
                  <label for="title" class="col-md-4 col-form-label text-md-right">Title</label>
                  <div class="col-md-6">
                    <input type="text" id="title" class="form-control" v-model="form.title">
                  </div>
                </div>

                <div class="form-group row">
                  <label for="description" class="col-md-4 col-form-label text-md-right">Description</label>
                  <div class="col-md-6">
                    <input type="text" id="description" class="form-control" v-model="form.description">
                  </div>
                </div>

                <div class="form-group row">
                  <label for="price" class="col-md-4 col-form-label text-md-right">Price</label>
                  <div class="col-md-6">
                    <input type="text" id="price" class="form-control" v-model="form.price">
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
  name: 'ProductEdit',
  component: {
    Error
  },

  data() {
    return {
      form: {
        title: '',
        description: '',
        price: '',
        image: '',
        status: '',
      },
      error: '',
    }
  },

  async created(id) {
    const response = await axios.get('products-edit/' + id);
    console.log(response)
    this.form = response.data.data;
    console.log(response)
  },

  methods: {
    async handleSubmit(id) {

      try {
        const response = await axios.put('products-update/' + id, this.form)

        this.$router.push('/');
        console.log(response);
      }catch (e){
        this.error = 'Invalid username/password !';
      }
    }
  },

}

</script>