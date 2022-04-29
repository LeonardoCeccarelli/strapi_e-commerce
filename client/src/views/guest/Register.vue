<template>
  <div>
    <h1 class="text-center py-5">Registrati</h1>
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-10 col-sm-8 col-md-6">
          <form>
            <div class="mb-3">
              <label
                for="exampleInputEmail1"
                class="form-label"
              >Username</label>
              <input
                v-model="username"
                type="email"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              >
            </div>
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
              Sei già registrato? Accedi <router-link :to="{name: 'login'}">Qui</router-link>
            </div>
            <button
              type="
                button"
              class="btn btn-outline-dark my-3"
              @click="register"
            >Accedi</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      username: "",
    };
  },
  methods: {
    register() {},
  },
  mounted() {
    if (localStorage.getItem("jwt")) this.$router.push({ name: "dashboard" });
  },
};
</script>

<style>
</style>