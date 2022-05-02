<template>
  <div class="container">
    <Spinner v-if="onLoad"></Spinner>
    <h1 class="mt-5">Benvenuto {{ userData.username }},</h1>
    <h3 class="py-5">I tuoi prodotti</h3>
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
                name: 'showProduct', 
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
import Spinner from "../../components/Spinner.vue";
export default {
  data() {
    return {
      userData: {},
      jwt: "",
      listProducts: [],
      onLoad: false,
    };
  },
  methods: {
    getData() {
      this.onLoad = true;
      const url = `http://localhost:1337/api/products?populate=*&pagination[pageSize]=10&filters[user][id][$eq]=${this.userData.id}`;
      axios
        .get(url, {
          headers: {
            Authorization: `Bearer ${this.jwt}`,
          },
        })
        .then((resp) => {
          this.listProducts = resp.data.data;
          this.onLoad = false;
        })
        .catch((err) => {});
    },
  },
  mounted() {
    this.userData = JSON.parse(localStorage.getItem("userData"));
    this.jwt = localStorage.getItem("jwt");
    this.getData();
  },
  components: { Spinner },
};
</script>

<style>
</style>