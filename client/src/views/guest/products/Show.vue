<template>
  <div class="container pb-5">
    <Spinner v-if="onLoad"></Spinner>

    <!-- Modal  -->
    <div
      v-if="productData.attributes"
      class="modal"
      :class="modalShow ? 'd-block' : ''"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title text-success">Elemento aggiunto correttamente al carrello</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              @click="onModalClose"
            ></button>
          </div>
        </div>
      </div>
    </div>
    <!-- Fine modal -->

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
        <p
          v-if="!isLogged"
          class="text-secondary"
        >Per aggiungere i prodotti nel carrello è necessario autenticarsi</p>
        <p
          v-if="chartFull"
          class="text-secondary"
        >Carrello pieno, procedi con il <router-link
            class="link-secondary"
            :to="{name: 'chart'}"
          >Pagamento</router-link>
        </p>
        <button
          @click="addToChart"
          :disabled="!isLogged || chartFull"
          class="btn btn-outline-success"
        ><b>+</b> Aggiungi al carrello</button>
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
      isLogged: localStorage.getItem("userData") ? true : false,
      modalShow: false,
      chartFull: false,
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
      if (localStorage.getItem("chart")) this.chartFull = true;
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
          // if (err) this.$router.push({ name: "home" });
        });
    },
    addToChart() {
      if (!localStorage.getItem("userData")) {
        return;
      }
      if (!localStorage.getItem("chart")) {
        localStorage.setItem("chart", JSON.stringify(this.productData));
        this.modalShow = true;
        setTimeout(() => {
          this.modalShow = false;
        }, 2000);
      }
    },
    onModalClose() {
      this.modalShow = false;
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