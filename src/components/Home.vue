<template>
  <main class="py-4">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-10">
          <div class="card">
            <div class="card-header">Dashboard</div>
            <div class="card-body">
              <h3 v-if="user">Hi {{ user.name }}</h3>
              <h3 v-if="!user">You are not logged in</h3>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container" v-if="user">
      <div class="row justify-content-center">
        <div class="col-md-10">
          <div class="card">
            <div class="card-header">Product List
              <router-link class="btn btn-info " to="/product-create">Product Create</router-link>
            </div>
            <div class="card-body">
              <div class="table-responsive">
                <table class="table">
                  <thead>
                  <tr>
                    <th>#SL</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Image</th>
                    <th>Created Date</th>
                    <th>Action</th>
                  </tr>
                  </thead>
                  <tbody v-if="productList !=''">
                  <tr v-for="(value,index) in productList" v-bind:key="index">
                    <td>{{ ++index }}</td>
                    <td>{{ value.title }}</td>
                    <td>{{ value.description }}</td>
                    <td>{{ value.price }}</td>
                    <td><img :src="value.image_path" class="imageSize"></td>
                    <td>{{ value.created_at }}</td>
                    <td>
                      <router-link class="btn btn-success" :to="{name:'product-edit',params:{id:value.id} }">Product Edit</router-link>
                      <a class="btn btn-danger" @click="deleteProduct(value.id)">Product Delete</a>
                      <button v-on:click="showAlertConfirm">Confirm Me</button>
                    </td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>


</template>

<script>
import {mapGetters} from 'vuex'
import axios from "axios";

export default {
  name: 'Home',

  data() {
    return {
      productList: null
    }
  },
  methods: {
    async deleteProduct(id) {
      try {
        const response = await axios.delete('products-delete/' + id);

        console.log(response);
      } catch (e) {
        console.log(e);
      }
    },

    showAlert(){

      this.$swal('Hello Vue world!!!');

    },

    showAlertConfirm(){

      this.$swal({

        title: 'Are you sure?',

        text: "You won't be able to revert this!",

        type: 'warning',

        showCancelButton: true,

        confirmButtonColor: '#3085d6',

        cancelButtonColor: '#d33',

        confirmButtonText: 'Yes, delete it!'

      }).then((result) => {

        if (result.value) {

          this.$swal(

              'Deleted!',

              'Your file has been deleted.',

              'success'

          )

        }

      });

    }


  },

  async created() {

    const response = await axios.get('products-list');

    this.productList = response.data.data;
    console.log(response)
  },

  computed: {
    ...mapGetters(['user'])
  }
}
</script>

<style scoped>
.imageSize {
  width: 60px;
  height: 60px;
}
</style>