<template>
  <div class="container">
    <Spinner v-if="onLoad"></Spinner>
    <h1 class="text-center py-5">Modifica prodotto - {{ data.name }}</h1>
    <div class="row justify-content-center">
      <div class="col-10 col-sm-8 col-md-6">
        <form @submit.prevent="onSubmit($event)">
          <div class="mb-3">
            <label
              for="name"
              class="form-label"
            >Nome</label>
            <input
              type="text"
              class="form-control"
              id="name"
              placeholder="Es. Nome"
              v-model="data.name"
            >
          </div>
          <div class="mb-3">
            <label
              for="price"
              class="form-label"
            >Prezzo</label>
            <input
              type="number"
              step="0.01"
              class="form-control"
              id="price"
              placeholder="Es. 9.99€"
              v-model="data.price"
            >
          </div>
          <div class="mb-3">
            <label
              for="scount"
              class="form-label"
            >Sconto</label>
            <input
              type="number"
              class="form-control"
              id="scount"
              placeholder="Es. 10%"
              v-model="data.scount"
            >
          </div>
          <div class="mb-3">
            <label
              for="description"
              class="form-label"
            >Descrizione</label>
            <textarea
              class="form-control"
              id="description"
              rows="3"
              placeholder="Es. Descrizione"
              v-model="data.description"
            ></textarea>
          </div>
          <div class="form-floating mb-3">
            <select
              class="form-select"
              id="floatingSelect"
              aria-label="Floating label select example"
              v-model="data.category"
            >
              <option
                v-for="category in listCategories"
                :key="category.id"
                :value="category.id"
              >{{ category.attributes.type }}</option>
            </select>
            <label for="floatingSelect">Scegli una categoria</label>
          </div>
          <div class="mb-3">
            <label
              for="author"
              class="form-label"
            >Autore</label>
            <input
              type="text"
              class="form-control"
              id="author"
              :value="author"
              readonly
            >
          </div>

          <div class="text-center">
            <button
              type="submit"
              class="btn btn-outline-success my-3"
            >Modifica</button>
          </div>
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
      onLoad: false,
      listCategories: {},
      author: JSON.parse(localStorage.getItem("userData")).username,
      data: {
        name: "",
        price: "",
        scount: 0,
        description: "",
        category: "",
        user: JSON.parse(localStorage.getItem("userData")).id,
      },
      productUserId: "",
    };
  },
  methods: {
    onSubmit(e) {
      // Validazione
      this.onLoad = true;
      axios
        .put(
          `http://localhost:1337/api/products/${this.$route.params.id}`,
          {
            data: this.data,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
          }
        )
        .then((resp) => {
          this.$router.push({ name: "dashboard" });
        })
        .catch((err) => {
          this.onLoad = false;
          console.log(err);
        });
    },
    checked() {
      if (JSON.parse(localStorage.getItem("userData")).id != this.productUserId)
        this.$router.push({ name: "dashboard" });
    },
    getData() {
      // Ricevo categorie
      this.onLoad = true;
      axios
        .get("http://localhost:1337/api/categories", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        })
        .then((resp) => {
          this.onload = false;
          this.listCategories = resp.data.data;
        })
        .catch((err) => {
          this.onload = false;
        });

      //  Ricevo dati prodotto da modificare
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
          this.productUserId = resp.data.data.attributes.user.data.id;
          this.data.name = resp.data.data.attributes.name;
          this.data.price = resp.data.data.attributes.price;
          this.data.scount = resp.data.data.attributes.scount;
          this.data.description = resp.data.data.attributes.description;
          this.data.category = resp.data.data.attributes.category.data.id;
          this.checked();
        })
        .catch((err) => {
          this.onLoad = false;
          if (err) this.$router.push("dashboard");
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