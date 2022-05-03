<template>
  <div class="container">
    <Spinner v-if="onLoad"></Spinner>
    <h1 class="text-center py-5">Prodotti</h1>
    <h4
      v-if="listProducts.length === 0"
      class="text-secondary"
    >Ancora nessun prodotto</h4>
    <div
      v-else
      class="row row-cols-5 g-3"
    >
      <div
        v-for="product in listProducts"
        :key="product.id"
        class="cols"
      >
        <div class="card h-100">
          <div class="card-body">
            <h5 class="card-title">{{ product.attributes.name }}</h5>
            <h6 class="card-subtitle mb-2 text-muted">€ {{ product.attributes.price }}</h6>
            <p
              v-if="product.attributes.description"
              class="card-text"
            >{{ product.attributes.description.substring(0,20) }}...</p>
            <router-link
              :to="{
                name: 'guestShowProduct', 
                params: {
                id: product.id
              }}"
              class="btn btn-outline-secondary"
            >Info</router-link>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import axios from "axios";
import Spinner from "../components/Spinner.vue";
export default {
  data() {
    return {
      listProducts: [],
      onLoad: false,
    };
  },
  methods: {
    getData() {
      this.onLoad = true;
      const user = JSON.parse(localStorage.getItem("userData"));
      const userToken = localStorage.getItem("jwt");
      let logUrl = "";
      if (user) {
        logUrl = `http://localhost:1337/api/products?populate=*&sort[0]=createdAt%3Adesc&pagination[pageSize]=20&filters[user][id][$ne]=${user.id}`;
      }
      const notLogUrl =
        "http://localhost:1337/api/products?populate=*&sort[0]=createdAt%3Adesc&pagination[pageSize]=20";
      const defaultToken =
        "800a456dc1f5701ed094dc11cfaf1898debcbb80486cfdf5505b3578885f690fb05e4a610bc30cc147392d653b083042eef8738514503f302aa1862fc80e101e400b30aabca443afc95c691a84440ce4ca2d518b5cb50947121a8b82ea35a26e9c2d7db3d90b8c46676719f62c6e1c208bf0bc8a03e62a7eb011d6a7e4038e6c";
      if (user) {
        axios
          .get(logUrl, {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          })
          .then((resp) => {
            this.listProducts = resp.data.data;
            this.onLoad = false;
          })
          .catch((err) => {});
      } else {
        axios
          .get(notLogUrl, {
            headers: {
              Authorization: `Bearer ${defaultToken}`,
            },
          })
          .then((resp) => {
            this.listProducts = resp.data.data;
            this.onLoad = false;
          })
          .catch((err) => {});
      }
    },
  },
  mounted() {
    this.getData();
  },
  components: { Spinner },
};
</script>

<style>
</style>