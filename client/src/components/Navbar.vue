<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <router-link
        class="navbar-brand"
        :to="{name: 'home'}"
      >E-Commerce</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div
        class="collapse navbar-collapse"
        id="navbarNav"
      >
        <!-- Utente loggato -->
        <ul
          v-if="userData"
          class="navbar-nav"
        >
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdownMenuLink"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Ciao, {{ userData.username }}
            </a>
            <ul
              class="dropdown-menu"
              aria-labelledby="navbarDropdownMenuLink"
            >
              <li>
                <router-link
                  class="dropdown-item"
                  :to="{name: 'dashboard'}"
                >Dashboard</router-link>
              </li>
              <li>
                <router-link
                  class="dropdown-item"
                  :to="{name: 'orders'}"
                >I Miei rdini</router-link>
              </li>
              <li>
                <router-link
                  class="dropdown-item"
                  :to="{name: 'createProduct'}"
                >Nuovo prodotto</router-link>
              </li>
              <li>
                <hr class="dropdown-divider">
              </li>
              <li>
                <form @submit.prevent="logout($event)">
                  <button class="dropdown-item">Logout</button>
                </form>
              </li>
            </ul>
          </li>
        </ul>
        <!-- Utente non loggato -->
        <ul
          v-else
          class="navbar-nav"
        >
          <li class="nav-item">
            <router-link
              class="nav-link"
              aria-current="page"
              :to="{name: 'login'}"
            >Login</router-link>
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              :to="{name: 'register'}"
            >Register</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      userData: {},
    };
  },
  methods: {
    logout(e) {
      localStorage.clear();
      e.target.submit();
    },
  },
  mounted() {
    this.userData = JSON.parse(localStorage.getItem("userData"));
    this.jwt = localStorage.getItem("jwt");
  },
};
</script>

<style>
</style>