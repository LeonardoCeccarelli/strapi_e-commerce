<template>
  <div class="container">
    <Spinner v-if="onLoad"></Spinner>
    <h1 class="text-center">Riepilogo ordine</h1>
    <div v-if="productData.attributes">
      <h2 class="mb-5">Specifiche prodotto:</h2>
      <h4>Titolo: {{ productData.attributes.name }}</h4>
      <h4>Prezzo: {{ productData.attributes.price }}</h4>
      <h4 v-if="productData.attributes.scount">Sconto: {{ productData.attributes.scount }}</h4>
      <h4 v-if="productData.attributes.description">Descrizione: {{ productData.attributes.description }}</h4>
      <h4>Categoria: {{ productData.attributes.category.data.attributes.type }}</h4>
      <h2 class="my-5">Specifiche venditore:</h2>
      <h4>Username: {{ productData.attributes.user.data.attributes.username }}</h4>
      <h4>E-mail: {{ productData.attributes.user.data.attributes.email }}</h4>
    </div>
    <div class="text-center py-3">
      <button
        @click="onPrepareOrder"
        class="btn btn-outline-success"
      >Calcolo ordine</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Spinner from "../../../components/Spinner.vue";
export default {
  data() {
    return {
      productData: {},
      onLoad: false,
      priceOnPurchase: "",
      scountOnPurchase: "",
    };
  },
  methods: {
    getData() {
      this.onLoad = true;
      const url = `http://localhost:1337/api/products/${this.$route.params.id}?populate=*`;
      const token = localStorage.getItem("jwt");
      axios
        .get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((resp) => {
          this.onLoad = false;
          this.productData = resp.data.data;
        })
        .catch((err) => {
          this.onLoad = false;
        });
    },
    onPrepareOrder() {
      this.onLoad = true;
      const url = `http://localhost:1337/api/orders/check/${this.$route.params.id}`;
      const token = localStorage.getItem("jwt");

      axios
        .get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((resp) => {
          this.onLoad = false;
          this.priceOnPurchase = resp.data.priceOnPurchase;
          this.scountOnPurchase = resp.data.scountOnPurchase;
        })
        .catch((err) => {
          this.onLoad = false;
        });
    },
  },
  mounted() {
    if (!this.$route.params.id) this.$router.push({ name: "chart" });
    this.getData();
  },
  components: { Spinner },
};
</script>

<style>
</style>