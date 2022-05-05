<template>
  <div class="container">
    <Spinner v-if="onLoad"></Spinner>
    <!-- Modal  -->
    <div
      v-if="listProductsData && listProductsData.length"
      class="modal"
      :class="modalShow ? 'd-block' : ''"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Conferma ordine</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              @click="onModalClose"
            ></button>
          </div>
          <div class="modal-body">
            <div class="data_container">
              <div
                v-for="(item, i) in dataOnModal"
                :key="i"
                class="single_data"
              >
                <p><b>{{ item.title }}</b> <small class="ms-2">{{ item.quantity }}x</small></p>
                <p><small class="text-secondary me-2">Prezzo base:</small>€ {{ item.normalPrice }}</p>
                <p><small class="text-secondary me-2">Sconto:</small>{{ item.scount }}<template v-if="item.scount">%</template></p>
                <p><small class="text-secondary me-2">Prezzo scontato:</small>€ {{ item.finalPrice }}</p>
                <hr class="mb-5">
              </div>
            </div>
          </div>
          <div class="modal-footer position-relative">
            <div class="position-absolute top-50 start-50 translate-middle">
              <h5>Totale: € {{ totPrice }}</h5>
            </div>
            <button
              type="button"
              class="btn btn-outline-success"
              @click="onCreateOrder"
            >Acquista</button>
          </div>
        </div>
      </div>
    </div>
    <!-- Fine modal -->
    <h1 class="text-center py-5">Riepilogo ordine</h1>
    <div
      v-if="listProductsData && listProductsData.length"
      class="row row-cols-1 g-3"
    >
      <div
        v-for="product in listProductsData"
        :key="product.data.id"
        class="col"
      >
        <h3 class="text-center">{{ product.quantity }}x</h3>
        <h4>Titolo: {{ product.data.attributes.name }}</h4>
        <h4>Prezzo: € {{ product.data.attributes.price }}</h4>
        <h4 v-if="product.data.attributes.scount">Sconto: {{ product.data.attributes.scount }}%</h4>
        <h4 v-if="product.data.attributes.description">Descrizione: {{ product.data.attributes.description.substring(0, 20) }}...</h4>
        <h4>Categoria: {{ product.data.attributes.category.data.attributes.type }}</h4>
        <h2 class="my-5">Specifiche venditore:</h2>
        <h4>Username: {{ product.data.attributes.user.data.attributes.username }}</h4>
        <h4>E-mail: {{ product.data.attributes.user.data.attributes.email }}</h4>
        <hr class="mb-5">
      </div>

    </div>
    <div class="text-center py-3 mb-5">
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
      listProductsData: [],
      onLoad: false,
      dataOnModal: [],
      totPrice: "",
      modalShow: false,
    };
  },
  methods: {
    getData() {
      this.onLoad = true;
      this.listProductsData = this.$route.params.listProductsData;
      this.listProductsData = JSON.parse(this.listProductsData);
      this.onLoad = false;
    },
    onPrepareOrder() {
      if (this.totPrice && this.dataOnModal) {
        this.modalShow = true;
        return;
      }
      const arrayIdToSent = [];
      this.listProductsData.forEach((product) => {
        arrayIdToSent.push(product.data.id);
      });

      const arrayQuantityToSent = [];
      this.listProductsData.forEach((product) => {
        arrayQuantityToSent.push(product.quantity);
      });

      axios
        .get(
          `http://localhost:1337/api/orders/check/${JSON.stringify(
            arrayIdToSent
          )}/${JSON.stringify(arrayQuantityToSent)}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
          }
        )
        .then((resp) => {
          this.dataOnModal = resp.data.data;
          this.totPrice = resp.data.totPrice;
          this.modalShow = true;
          console.log(resp.data);
        })
        .catch((err) => {
          this.onLoad = false;
        });
    },

    onModalClose() {
      this.modalShow = false;
    },
    onCreateOrder() {
      this.onLoad = true;
      const productsToServer = [];
      this.listProductsData.forEach((product) => {
        if (!productsToServer.includes(product.data.id)) {
          productsToServer.push(product.data.id);
        }
      });
      const usersToServer = [];
      this.listProductsData.forEach((product) => {
        if (!usersToServer.includes(product.data.attributes.user.data.id)) {
          usersToServer.push(product.data.attributes.user.data.id);
        }
      });
      axios
        .post(
          "http://localhost:1337/api/orders",
          {
            data: {
              products: productsToServer,
              state: 1,
              user_senders: usersToServer,
              user_recipient: JSON.parse(localStorage.getItem("userData")).id,
              price_on_purchase: this.totPrice,
            },
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
          }
        )
        .then((resp) => {
          this.onLoad = false;
          localStorage.removeItem("chart");
          this.$router.push({ name: "ordersRecipient" });
        })
        .catch((err) => {
          this.onLoad = false;
        });
    },
  },
  mounted() {
    if (!this.$route.params.listProductsData) {
      this.$router.push({ name: "chart" });
      return;
    }
    this.getData();
  },
  components: { Spinner },
};
</script>

<style lang="scss" scoped>
.data_container {
  max-height: 50vh;
  overflow-y: auto;
}
</style>