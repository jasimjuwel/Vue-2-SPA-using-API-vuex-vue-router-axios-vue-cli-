<template>
  <main class="py-4">
    <div class="container" v-if="!user">
      <div class="row justify-content-center">
        <div class="col-md-10">
          <div class="card">
            <div class="card-header">Dashboard</div>
            <div class="card-body">
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
            <div class="card-header">
              <h3 class="header-title mt-0 mb-4">
                Product List
                <router-link class="btn btn-info btn-sm waves-effect waves-light px-4 d-inline-block float-right mr-3" to="/product-create">Add</router-link>
              </h3>

            </div>
            <div class="card-body">
              <div class="table-responsive">
                <table class="table table table-bordered">
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
                      <router-link class="btn btn-success btn-sm" :to="{name:'product-edit',params:{id:value.id} }">Edit</router-link>
                      <a class="btn btn-danger btn-sm" @click="deleteProduct(value.id)">Delete</a>
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
        const response = await axios.delete(`products-delete/${id}`)

          let i = this.productList.map(item => item.id).indexOf(id);
          this.productList.splice(i, 1)

        console.log(response);
      } catch (e) {
        console.log(e);
      }
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