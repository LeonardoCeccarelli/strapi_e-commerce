<template>
  <div class="container">
    <h1 class="text-center py-5">Il mio carrello</h1>
    <div
      v-if="productData.attributes"
      class="card position-relative"
    >
      <div class="card-body">
        <h5 class="card-title">{{ productData.attributes.name }}</h5>
        <h6 class="card-subtitle mb-2 text-muted">€ {{ productData.attributes.price }}</h6>
        <h6
          v-if="productData.attributes.scount"
          class="card-subtitle mb-2 text-muted"
        >Sconto: {{ productData.attributes.scount }}</h6>
        <p
          v-if="productData.attributes.description"
          class="card-text"
        >{{ productData.attributes.description }}</p>
      </div>
      <div class="position-absolute top-50 end-0 translate-middle-y mx-5">
        <router-link
          class="btn btn-outline-success"
          :to="{name: 'createOrders', params: {id: productData.id}}"
        >Acquista</router-link>
      </div>
    </div>
    <h3
      class="text-center text-secondary"
      v-else
    >Carrello vuoto</h3>
  </div>
</template>

<script>
export default {
  data() {
    return {
      productData: {},
    };
  },
  methods: {
    getData() {
      if (localStorage.getItem("chart")) {
        this.productData = JSON.parse(localStorage.getItem("chart"));
      }
    },
  },
  mounted() {
    this.getData();
  },
};
</script>

<style>
</style>