<template>
  <div class="container">
    <h1 class="text-center py-5">Aggiungi un nuovo prodotto</h1>
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
            >Invia</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
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
    };
  },
  methods: {
    onSubmit(e) {
      // Validazione
      axios
        .post(
          "http://localhost:1337/api/products",
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
          console.log(err);
        });
    },
    getData() {
      axios
        .get("http://localhost:1337/api/categories", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        })
        .then((resp) => {
          this.listCategories = resp.data.data;
        })
        .catch((err) => {});
    },
  },
  mounted() {
    this.getData();
  },
};
</script>

<style>
</style>