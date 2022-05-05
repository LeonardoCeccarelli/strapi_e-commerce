<template>
  <div class="container">
    <Spinner v-if="onLoad"></Spinner>
    <h1 class="text-center py-5">Il mio carrello</h1>
    <div
      v-if="listProductsData && listProductsData.length"
      class="row row-cols-1 g-3"
    >
      <div
        v-for="product in listProductsData"
        :key="product.data.id"
        class="col"
      >
        <!-- Inizio card -->

        <div class="card position-relative">
          <div class="card-body">
            <h5 class="card-title">{{ product.data.attributes.name }}</h5>
            <h6 class="card-subtitle mb-2 text-muted">€ {{ product.data.attributes.price }}</h6>
            <h6
              v-if="product.data.attributes.scount"
              class="card-subtitle mb-2 text-muted"
            >Sconto: {{ product.data.attributes.scount }}</h6>
            <p
              v-if="product.data.attributes.description"
              class="card-text"
            >{{ product.data.attributes.description.substring(0, 20) }}...</p>
          </div>
          <div class="position-absolute top-50 end-0 translate-middle-y mx-5">
            <div class="d-inline-block mx-2">
              <p>{{ product.quantity }} x</p>
            </div>
            <form
              class="d-inline-block mx-2"
              @submit.prevent="onRemoveEl($event, product.data.id)"
            >
              <button
                type="submit"
                class="btn btn-outline-danger"
              >Elimina</button>
            </form>
          </div>
        </div>
      </div>
      <div
        v-if="showBtn"
        class="text-center my-5"
      >
        <router-link
          class="btn btn-outline-success"
          :to="{name: 'createOrders', params: {listProductsData: JSON.stringify(listProductsData)}}"
        >Procedi con l'ordine</router-link>
      </div>
    </div>

    <!-- Fine card -->
    <h3
      class="text-center text-secondary"
      v-else
    >Carrello vuoto</h3>
  </div>
</template>

<script>
import axios from "axios";
import Spinner from "../../components/Spinner.vue";
export default {
  data() {
    return {
      listProductsData: [],
      onLoad: false,
      showBtn: false,
    };
  },
  methods: {
    getData() {
      if (localStorage.getItem("chart")) {
        const allId = [];
        const allIdString = localStorage.getItem("chart").split(",");
        allIdString.forEach((item) => {
          const number = parseInt(item);
          if (allId.some((e) => e.id === number)) {
            allId.forEach((el) => {
              if (el.id === number) {
                el.quantity++;
              }
            });
          } else {
            allId.push({
              id: number,
              quantity: 1,
            });
          }
        });
        this.onLoad = true;
        const finalArray = [];
        allId.forEach((item) => {
          axios
            .get(`http://localhost:1337/api/products/${item.id}?populate=*`, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt")}`,
              },
            })
            .then((resp) => {
              finalArray.push({
                data: resp.data.data,
                quantity: item.quantity,
              });
              if (finalArray.length === allId.length) {
                this.listProductsData = finalArray;
                this.onLoad = false;
                this.showBtn = true;
              }
            })
            .catch((err) => {
              this.onLoad = false;
            });
        });
      }
    },
    onRemoveEl(e, id) {
      if (localStorage.getItem("chart")) {
        const allId = [];
        const allIdString = localStorage.getItem("chart").split(",");
        allIdString.forEach((item) => {
          item = parseInt(item);
          allId.push(item);
        });
        const index = allId.indexOf(id);
        if (index > -1) {
          allId.splice(index, 1);
        }
        localStorage.setItem("chart", allId.join());
        e.target.submit();
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