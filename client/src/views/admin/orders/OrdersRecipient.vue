<template>
  <div class="container">
    <Spinner v-if="onLoad"></Spinner>
    <h1 class="py-5 text-center">Sezione Ordini Ricevuti</h1>
    <div
      v-if="listOrdersData && listOrdersData.length"
      class="row row-cols-1"
    >
      <div
        v-for="order in listOrdersData"
        :key="order.id"
        class="col"
      >
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Prezzo pagato € {{ order.attributes.price_on_purchase }}</h5>
            <hr>
            <h6 class="card-subtitle mb-3">Prodotti acquistati</h6>
            <h6
              v-for="product in order.attributes.products.data"
              :key="product.id"
              class="card-subtitle mb-2 text-muted"
            >Articolo: {{ product.attributes.name }}</h6>
          </div>
        </div>
      </div>
    </div>
    <h4
      v-else
      class="text-center
      py-4 text-secondary"
    >Ancora nessun ordine ricevuto</h4>
  </div>
</template>

<script>
import axios from "axios";
import Spinner from "../../../components/Spinner.vue";
export default {
  data() {
    return {
      listOrdersData: [],
      onLoad: false,
    };
  },
  methods: {
    getData() {
      this.onLoad = true;
      const userLoggedId = JSON.parse(localStorage.getItem("userData")).id;
      const token = localStorage.getItem("jwt");
      axios
        .get(
          `http://localhost:1337/api/orders?populate=*&filters[user_recipient][id][$eq]=${userLoggedId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((resp) => {
          this.onLoad = false;
          this.listOrdersData = resp.data.data;
        })
        .catch((err) => {
          this.onLoad = false;
        });
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