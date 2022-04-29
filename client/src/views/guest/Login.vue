<template>
  <div>
    <Spinner v-if="onLoad"></Spinner>

    <h1 class="text-center py-5">Log-in</h1>
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-10 col-sm-8 col-md-6">
          <form @submit.prevent="login($event)">
            <div class="mb-3">
              <label
                for="exampleInputEmail1"
                class="form-label"
              >Email</label>
              <input
                v-model="email"
                type="email"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              >
            </div>
            <div class="mb-3">
              <label
                for="exampleInputPassword1"
                class="form-label"
              >Password</label>
              <input
                v-model="password"
                type="password"
                class="form-control"
                id="exampleInputPassword1"
              >
            </div>
            <div class="form-text">
              Non hai un account? Registrati <router-link :to="{name: 'register'}">Qui</router-link>
            </div>
            <button
              type="submit"
              class="btn btn-outline-dark my-3"
            >Accedi</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Spinner from "../../components/Spinner.vue";

export default {
  data() {
    return {
      email: "",
      password: "",
      onLoad: false,
    };
  },
  methods: {
    login(e) {
      //Parte il loader
      this.onLoad = true;

      axios
        .post("http://localhost:1337/api/auth/local", {
          identifier: this.email,
          password: this.password,
        })
        .then((resp) => {
          const data = {
            id: resp.data.user.id,
            username: resp.data.user.username,
            email: resp.data.user.email,
          };
          localStorage.setItem("userData", JSON.stringify(data));
          localStorage.setItem("jwt", resp.data.jwt);

          //Fine loader
          this.onLoad = false;

          e.target.submit();
        })
        .catch((error) => {
          console.log("An error occurred:", error.response);
        });
    },
  },
  mounted() {
    if (localStorage.getItem("jwt")) this.$router.push({ name: "dashboard" });
  },
  components: { Spinner },
};
</script>

<style>
</style>