<template>
  <div class="container pb-5">
    <Spinner v-if="onLoad"></Spinner>
    <div v-if="productData.attributes">
      <h1 class="py-5">Pagina dettagli - {{ productData.attributes.name }}</h1>
      <h3>Prezzo: € {{ productData.attributes.price }}</h3>
      <div
        class="py-4"
        v-if="productData.attributes.scount"
      >
        <h4>Sconto: {{ productData.attributes.scount }}%</h4>
      </div>

      <div
        class="py-4"
        v-if="productData.attributes.description"
      >
        <h4>Descrizione</h4>
        <p>{{ productData.attributes.description }}</p>
      </div>

      <h4 class="py-4">Categoria: {{ productData.attributes.category.data.attributes.type }}</h4>
      <hr>
      <h2>Informazione venditore</h2>
      <h4 class="py-3">Nome: {{ productData.attributes.user.data.attributes.username }}</h4>
      <h4 class="py-3">E-mail: {{ productData.attributes.user.data.attributes.email }}</h4>
      <div class="text-center">
        <router-link
          class="btn btn-outline-success"
          :to="{name: 'createOrders', params: {
            data: productData.id
          }}"
        >Compra ora!</router-link>
      </div>
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
    };
  },
  methods: {
    checked() {
      if (
        JSON.parse(localStorage.getItem("userData")).id ===
        this.productData.attributes.user.data.id
      )
        this.$router.push({ name: "home" });
    },

    getData() {
      this.onLoad = true;
      const url = `http://localhost:1337/api/products/${this.$route.params.id}?populate=*`;
      const defaultToken =
        "800a456dc1f5701ed094dc11cfaf1898debcbb80486cfdf5505b3578885f690fb05e4a610bc30cc147392d653b083042eef8738514503f302aa1862fc80e101e400b30aabca443afc95c691a84440ce4ca2d518b5cb50947121a8b82ea35a26e9c2d7db3d90b8c46676719f62c6e1c208bf0bc8a03e62a7eb011d6a7e4038e6c";
      axios
        .get(url, {
          headers: {
            Authorization: `Bearer ${defaultToken}`,
          },
        })
        .then((resp) => {
          this.onLoad = false;
          this.productData = resp.data.data;
          this.checked();
        })
        .catch((err) => {
          if (err) this.$router.push({ name: "home" });
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