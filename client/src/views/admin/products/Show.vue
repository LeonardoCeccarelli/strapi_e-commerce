<template>
  <div class="container pb-5">
    <!-- Modal  -->
    <div
      v-if="productData.attributes"
      class="modal"
      :class="modalShow ? 'd-block' : ''"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Attenzione</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              @click="onModalClose"
            ></button>
          </div>
          <div class="modal-body">
            <p>Sicuro di voler eliminare l'elemento <b>{{ productData.attributes.name }}</b> ?</p>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-danger"
              @click="onDelete"
            >Elimina</button>
          </div>
        </div>
      </div>
    </div>
    <!-- Fine modal -->
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
      <div class="d-flex justify-content-center">
        <router-link
          class="btn btn-outline-success mx-2"
          :to="{name: 'editProduct', params: {
            data: productData.id
          }}"
        >Modifica</router-link>
        <form @submit.prevent="onModalShow">
          <button class="btn btn-outline-danger mx-2">Elimina</button>
        </form>
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
      modalShow: false,
    };
  },
  methods: {
    checked() {
      if (
        JSON.parse(localStorage.getItem("userData")).id !=
        this.productData.attributes.user.data.id
      )
        this.$router.push({ name: "dashboard" });
    },

    getData() {
      this.onLoad = true;
      const url = `http://localhost:1337/api/products/${this.$route.params.id}?populate=*`;
      const defaultToken = localStorage.getItem("jwt");
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
          if (err) this.$router.push({ name: "dashboard" });
        });
    },
    onModalShow() {
      this.modalShow = true;
    },
    onModalClose() {
      this.modalShow = false;
    },
    onDelete() {
      this.onLoad = true;
      axios
        .delete(`http://localhost:1337/api/products/${this.productData.id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        })
        .then((resp) => {
          this.onLoad = false;
          this.$router.push({ name: "dashboard" });
        })
        .catch();
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