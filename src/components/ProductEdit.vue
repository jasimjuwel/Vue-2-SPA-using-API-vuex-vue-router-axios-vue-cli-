<template>
  <main class="login-form">
    <div class="cotainer">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="card">
            <div class="card-header">
              <h3>Product Edit</h3>
            </div>
            <div class="card-body">
              <error v-if="error" :error="error"/>
              <form @submit.prevent="handleSubmit()">
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
                  <label for="file" class="col-md-4 col-form-label text-md-right">Image</label>
                  <div class="col-md-6">
                    <input type="file" class="form-control" id="file" ref="file" @change="onChangeFileUpload()"
                           accept="image/*">
                  </div>
                </div>

                <div class="col-md-6 offset-md-4">
                  <button type="submit" class="btn btn-primary">Update</button>
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
      },
      error: '',
    }
  },
  methods: {
    onChangeFileUpload() {
      this.file = this.$refs.file.files[0];
    },
    async handleSubmit() {

      let formData = new FormData();
      formData.append('image', this.file);
      formData.append('title', this.form.title);
      formData.append('description', this.form.description);
      formData.append('price', this.form.price);
      formData.append('_method', 'PUT')

      try {
        const response = await axios.post(`products-update/${this.$route.params.id}`, formData)

        this.$router.push('/');
        console.log(response);
      } catch (e) {
        this.error = 'Something error found !';
      }
    }
  },

  async created() {
    const response = await axios.get(`products-edit/${this.$route.params.id}`);
    this.form = response.data.data;
    console.log(response)
  },
}

</script>